# 제너레이터와 async/await
## 46.1 제너레이터란?
ES6에서 도입된 제너레이터는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수이다.

> 제너레이터와 일반 함수의 차이
1. 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
2. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.

## 46.2 제너레이터 함수의 정의
제너레이터 함수는 function* 키워드로 선언한다. 그리고 하나 이상의 yield 표현식을 포함한다. 이것을 제외하면 일반 함수를 정의하는 방법과 같다.

```jsx
// 제너레이터 함수 선언문
function* getDecFunc(){
    yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* (){
    yield 1;
};

// 제너레이터 메서드
const obj = {
    * genObjMethod(){
        yield 1;
    }
};

// 제너레이터 클래스 메서드
class MyClass{
    * genClsMethod() {
        yield 1;
    }
}
```

에스터리스크(*)의 위치는 function 키워드와 함수 이름 사이라면 어디든지 상관없다. 하지만 일관성을 위해 function 키워드 바로 뒤에 붙이는 것을 권장한다고 한다.

제너레이터 함수는 화살표 함수로 정의할 수 없다.
또, new 연산자와 함께 생성자 함수로 호출할 수 없다.

## 46.3 제너레이터 객체
제너레이터 함수를 호출하면 일반 함수처럼 함수 코드 블록을 실행하는 것이 아니라 제너레이터 객체를 생성해 반환한다. 제너레이터 객체는 이터러블이면서 이터레이터이다. 

제너레이터 객체
 - Symbol.iterator 메서드를 상속받는 이터러블
 - value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 next 메서드를 소유하는 이터레이터이다. 제너레이터 객체는 next 메서드를 가지는 이터레이터이므로 Symbol.iterator 메서드를 호출해서 별도로 이터레이터를 생성할 필요가 없다.
 ```jsx
//  제너레이터 함수
function* genFunc(){
    yield 1;
    yield 2;
    yield 3;
}

const generator = genFunc();
// 제너레이터 객체는 이터러블 이면서 동시에 이터레이터이다.
// 이터러블
console.log(Symbol.iterator in generator) // true
// 이터레이터 
console.log('next' in generator); // true
```
## 46.4 제너레이터의 일시 중지와 재개
제너레이터는 yield 키워드와 next 메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재개할 수 있다. yield 키워드는 제너레이터 함수의 실행을 일시 중지시키거나 yield 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환한다. 
```jsx
function* getFunc(){
    const x = yield 1;
    const y = yield (x + 10);
    return x + y; // 제너레이터에서의 반환값은 의미가 없다, 종료의 의미
}

const generator = getFunc(0);

let res = generator.next();
console.log(res); // value: 1, done: false

res = generator.next(10);
console.log(res); // value: 20, done: false

res = generator.next(30);
console.log(res); // value: 40, done: true
```

## 46.6 async/await
제너레이터를 사용해 비동기 처리를 동기 처리처럼 구현할 수 있지만 코드가 장황해져 가독성이 나빠진다. 이를 해결할 방법인 async/await이 ES8에서 도입되었다.

async/await은 프로미스를 기반으로 동작한다. 프로미스의 then/ catch/ finally 를 사용해 후속처리 할 필요 없이 마치 동기 처리처럼 사용할 수 있다.
```jsx
const fetch = require('node-fetch');

async function fetchTodo(){
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    const response = await fetch(url);
    const todo = await response.json();
    console.log(todo);
}

fetchTodo();
```

### 46.6.1 async 키워드
await 키워드는 반드시 async 함수 내부에서 사용한다. async 함수 는 언제나 프로미스를 반환한다. 만약 명시적으로 프로미스를 반환하지 않더라도 async 함수는 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.
### 46.6.2 await 키워드
await 키워드는 프로미스가 settled 상태가 될 때까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다. 
```jsx
const fetch = require('node-fetch');

const getGithubUserName = aysnc id =>{
    const res = await fetch(`https://api.github.com/users/${id}`); // 1
    const { name } = await res.json(); // 2
    console.log(name);
}

getGithubUserName('jinux127');
```

1에서 fetch 함수가 수행한 HTTP 요청에 대한 서버의 응답이 도착해서 fetch 함수가 반환한 프로미스가 settled 상태가 될 때까지 대기한다. 이후 프로미스가 settled 상태가 되면 프로미스가 resolve한 처리 결과가 res변수에 할당된다.

```jsx
async function foo(){
    const a = await new Promise(resolve => setTimeout(()=>resolve(1),3000));
    const b = await new Promise(resolve => setTimeout(()=>resolve(2),2000));
    const c = await new Promise(resolve => setTimeout(()=>resolve(3),1000));

    console.log([a,b,c]); // [1,2,3]
}

foo();
```
위 예제의 foo 함수는 약 6초가 소요된다. 하지만 서로 연관이 없이 개별적으로 수행되는 비동기 처리이므로 순차적으로 처리할 필요가 없다.
```jsx
async function foo(){
    const res = await Promise.all([
        new Promise(resolve => setTimeout(()=>resolve(1), 3000)),
        new Promise(resolve => setTimeout(()=>resolve(2), 2000)),
        new Promise(resolve => setTimeout(()=>resolve(3), 1000))
    ]);

    console.log(res); // [1,2,3]
}

foo();
```

### 46.6.3 에러 처리
비동기 처리를 위한 콜백 패턴의 단점 중 가장 심각한 것은 에러 처리가 곤란하다는 것이다. 에러는 호출자 방향으로 전파된다. 즉, 콜 스택의 아래 방향으로 전파된다. 하지만 비동기 함수의 콜백 함수를 호출한 것은 비동기 함수가 아니기 때문에 try ... catch 문을 사용해 에러를 캐치할 수 없다.

하지만 async/await에서는 가능하다. 그 이유는 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하기 때문이다.

```jsx
const fetch = require('node-fetch');

const foo = async () =>{
    try{
        const wrongUrl = 'https://worng.url';

        const response = await fetch(wrongUrl);
        const data = await response.json();
        console.log(data);
    } catch (err){
        console.error(err);
    }
};

foo();
```
위 예제에서 foo 함수의 catch문은 HTTP 통신에서 발생한 네트워크 에러뿐 아니라 try 코드 블록 내의 모든 문에서 발생한 일반적인 에러까지 모두 캐치할 수 있다.

async 함수 내에서 catch 문을 사용해서 에러 처리를 하지 않으면 async 함수는 발생한 에러를 reject하는 프로미스를 반환한다.

```jsx
const fetch = require('node-fetch');

const foo = async () =>{

    const wrongUrl = 'https://worng.url';

    const response = await fetch(wrongUrl);
    const data = await response.json();
    return data;
};

foo()
    .then(console.log)
    .catch(console.error);
```
async 함수를 호출하고 Promise.prototype.catch 후속 처리 메서드를 사용해 에러를 캐치할 수도 있다.