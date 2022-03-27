# 프로미스
JS는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용한다. 하지만 전통적인 콜백 패턴은 콜백 헬로 인해 가동성이 나쁘고 비동기 처리 중 발생한 에러의 처리가 곤란하며 여러 개의 비동기 처리를 한번에 처리하는 데도 한계가 있다.

ES6에서는 비동기 처리를 위한 또 다른 패턴으로 프로미스를 도입했다. 프로미스는 전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리시점을 명확하게 표현할 수 있다는 장점이 있다.

## 45.1 비동기 처리를 위한 콜백 패턴의 단점
### 45.1.1 콜백 헬
```jsx
const get = url =>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.send();

    xhr.onload = () =>{
        if(xhr.status === 200){
            console.log(JSON.parse(xhr.response));
        } else {
            console.log(`${xhr.status} ${xhr.statusText}`);
        }
    };
};

get('https://jsonplaceholder.typicode.com/posts/1');
```
위 예제의 get 함수는 서버의 응답 결과를 콘솔에 출력한다. get 함수가 서버의 응답 결과를 반환하게 하려면 어떻게 하면 될까?

get 함수는 비동기 함수다. 비동기 함수는 함수 내부에 비동기로 동작하는 코드를 포함한 함수를 말한다. 비동기 함수를 호출하면 함수 내부의 비동기로 동작하는 코드가 완료되지 않았다 해도 기다리지 않고 즉시 종료된다. 즉, 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 이후에 완료된다. 따라서 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.
```jsx
let g= 0;
setTimeout(()=> { g = 100;}, 0);

console.log(g); // 0
```
get 함수가 비동기 함수인 이유는 get 함수 내부의 onload 이벤트 핸들러가 비동기로 동작하기 때문이다. get 함수를 호출하면 GET 요청을 전송하고 onload 이벤트 핸들러를 등록한 다음 undefined를 반환하고 즉시 종료된다.따라서 onload 이벤트 핸들러에서 서버의 응답 결과를 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.
```jsx
const get = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.send();

    xhr.onload = () =>{
        if(xhr.status === 200){
            // 서버의 응답을 반환
            return JSON.parse(xhr.response);
        }
        console.log(error(`${xhr.status} ${shr.statusText}`);
    };
};

const response = get ('https://jsonplaceholder.typicode.com/posts/1');
console.log(response)l // undefined
```

위 예제는 서버의 응답을 반환하기 위해 onload 이벤트 핸들러에서 return을 통해 출력을 하고자 했다. 하지만 의도와는 다른 undefined가 출력된다. 왜 그럴까? 그 이유는 xhr.onload 이벤트 핸들러 플퍼티에 바인딩한 이벤트 핸들러의 반환문은 get함수의 반환문이 아니다. 

천천히 살펴보자. 

1. get 함수 호출
2. XHMLHttpRequest 객체 생성
3. HTTP 요청 초기화 및 요청 전송
4. onload 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩하고 종료
5. get 함수에 return(반환문)이 명시안되어 있으니 undefined를 반환 (console.log(response) 부분)

onload 이벤트 핸들러가 get 함수를 호출한다면 반환할 수 있겠지만 호출하지 않기 떄문에 그럴 수도 없다. 따라서 onload 이벤트 핸들러의 반환값은 캐치할 수 없다.

서버로부터 응답이 도착하면 xhr 객체에서 load 이벤트가 발생한다. 이때 xhr.onload 핸들러 프로퍼티에 바인딩한 이벤트 핸들러가 즉시 실행되는 것이 아니다. load 이벤트가 발생하면 일단 태스크 큐에 저장되어 대기하다가, 콜 스택이 비면 이벤트 루프에 의해 콜 스택으로 푸시되어 실행된다.

1. 이벤트 핸들러의 평가
2. 이벤트 핸들러의 실행 컨텍스트 생성
3. 콜 스택에 푸시
4. 이벤트 핸들러 실행

따라서 이벤트 핸들러가 실행되는 시점에는 콜 스택이 빈 상태여야한다.

이처럼 비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없고, 상위 스코프의 변수에 할당할 수도 없다. 이는 비동기 함수의 처리 결과(서버의 응답 등)에 대한 후속 처리는 비동기 함수 내부에서 수행해야 함을 나타낸다. 이 때 비동기 함수를 범용적으로 사용하기 위해 비동기 함수에 비동기 처리 결과에 대한 후속 처리를 수행하는 콜백 함수를 전달하는 것이 일반적이다. 필요에 따라 성공, 실패에 따라 호출될 콜백 함수를 전달할 수 있다.

콜백 함수를 통해 비동기 처리 결과에 대한 후속 처리를 수행하는 비동기 함수가 비동기 처리 결과를 가지고 또 다시 비동기 함수를 호출해야 한다면 콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상이 발생한다. 이를 콜백 헬이라 한다.

```jsx
const get = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.send();

    xhr.onload = () =>{
        if(xhr.status === 200){
            callback(JSON.parse(xhr.response));
        } else {
            console.log(error(`${xhr.status} ${shr.statusText}`);
        }
    };
};

const url = 'https://jsonplaceholder.typicode.com';

// id가 1인 post의 userId를 조회
get(`${url}/posts/1`, ({userId}) =>{
    console.log(userId); // 1
    // post의 userId를 사용하여 정보를 획득
    get(`${url}/users/${userId}`,userInfo =>{
        console.log(userInfo);
    });
});
```
### 45.1.2 에러 처리의 한계
비동기 처리를 위한 콜백 패턴의 문제점 중 하나는 에러 처리가 곤란하다는 것이다. 
```jsx
try {
    setTimeout(()=>{throw new Error('Error!');}, 1000);
} catch(e){
    console.error('캐치한 에러',e);
}
```
먼저 예제의 코드는 콜백 함수를 통해 에러를 발생해 catch 코드 블록에서 캐치하고자 했지만 캐치되지 않는다. 그 이유를 알아보자. 

1. 비동기 함수 setTimeout이 호출되면 실행 컨텍스트 생성 -> 콜스택 푸시 -> 실행된다.
2. 비동기 함수이므로 콜백 함수가 호출되는 것을 기다리지 않고 즉시 종료, 콜 스택에서 제거된다.
3. 이후 타이머가 만료되면 setTimeout 함수의 콜백 함수는 태스크 큐로 푸시되고 콜 스택이 비어졌을 때 이벤트 루프에 의해 콜 스택으로 푸시되어 실행된다.

setTimeout의 콜백함수가 실행 될 때 setTimeout은 이미 콜 스택에서 제거된 상태다. 이것은 콜백 함수를 호출한 것이 setTimeout이 아니라는 것을 의미한다. 

에러는 호출자 방향으로 전파된다. 즉, 콜 스택의 아래 방향(실행 중인 실행 컨텍스트가 푸시되기 직전에 푸시된 실행 컨텍스트 방향)으로 전파된다. 하지만 앞에서 살펴본 바와 같이 setTimeout 함수의 콜백 함수를 호출한 것은 setTimeout 함수가 아니다. 따라서 setTimeout 함수의 콜백 함수가 발생시킨 에러는 catch 블록에서 캐치되지 않는다.

이를 극복하기 위해 ES6에서 프로미스가 도입되었다.

## 45.2 프로미스의 생성
Promise 생성자 함수를 new 연산자와 함께 호출하면 프로미스를 생성한다. Promise는 호스트 객체가 아닌 ECMAScript 사양에 정의된 표준 빌트인 객체다.

Promise 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달 받는다. 이 콜백 함수는 resolve와 reject 함수를 인수로 전달받는다.

```jsx
//프로미스 생성
const promise = const promise = new Promise((resolve, reject)=>{
    if(/* 비동기 처리 성공*/){
        resolve('result');
    } else {
        // 비동기 처리 실패
        reject('failure reason');
    }
});
```
Promise 생성자 함수가 전달받은 콜백 함수 내부에서 비동기 처리를 수행한다. 앞에서 살펴본 비동기 함수 get을 프로미스를 사용해 다시 구현해 보자.

```jsx
const promiseGet = url =>{
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.send();

        xhr.onload = () =>{
            if(xhr.status === 200){
                callback(JSON.parse(xhr.response));
            } else {
                console.log(error(`${xhr.status} ${shr.statusText}`);
            }
        };

    });
};
const response = get ('https://jsonplaceholder.typicode.com/posts/1');
```
비동기 함수인 promiseGet은 함수 내부에서 프로미스를 생성하고 반환한다. 

프로미스는 비동기 처리가 어떻게 진행되고 있는지를 나타내는 상태 정보를 갖는다.

- pending : 비동기 처리가 아직 수행되지 않은 상태 // 프로미스가 생성된 직후 기본 상태
- fulfilled : 수행된 상태 (성공) // resolve 함수 호출
- rejected : 수행된 상태 (실패) // reject 함수 호출

비동기 처리가 수행된 상태를 settled라고 한다. 즉, fulfilled, rejected가 settled의 상태라고 말할 수 있다.

프로미스는 pending 상태에서 settled 상태로 변화할 수 있는 데 settled 상태가 되면 더는 다른 상태로 변화할 수 없다.

프로미스는 비동기 처리결과도 상태로 갖는다. 

즉, 프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체다.

## 45.3 프로미스의 후속 처리 메서드
프로미스의 비동기 처리 상태가 변화하면 이에 따른 후속 처리를 해야한다. 이를 위해 프로미스는 후속 메서드 then, catch, finally를 제공한다.

프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백 함수가 선택적으로 호출된다.

모든 후속 처리 메서드는 프로미스를 반환하며 비동기로 동작한다.

### 45.3.1 Promise.prototype.then
then 메서드는 두 개의 콜백 함수를 인수로 전달받는다.
- 첫 번째 콜백 함수 : fulfilled 상태가 되면 호출, 이때 프로미스의 비동기 처리 결과를 인수로 전달받는다.
- 두 번째 콜백 함수 : rejected 상태가 되면 호출, 이때 프로미스의 에러를 인수로 전달받는다.

```jsx
new Promise(resolve => resolve('fulfilled'))
    .then(v=>console.log(v), e => console.error(e)); // fulfilled

new Promise((_, resolve) => reject(new Error('rejected')))
    .then(v=>console.log(v), e => console.error(e)); // Error: rejected
```
then 메서드는 언제나 프로미스를 반환한다. then 메서드의 콜백 함수가 프로미스를 반환하면 그 프로미스를 그대로 반환하고, 콜백 함수가 다른 값을 반환하면 그 값을 암묵적으로 resolve 또는 rejected하여 프로미스를 생성해 반환한다.

### 45.3.2 Promise.prototype.catch
catch 메서드는 한 개의 콜백 함수를 인수로 전달 받는다. 이 때 프로미스가 rejected인 경우만 호출된다.

### 45.3.3 Primise.prototype.finally
finally 메서드는 한 개의 콜백 함수를 인수로 전달받는다. 성공 여부와 상관없이 무조건 한 번 호출된다.

## 45.4 프로미스의 에러 처리
비동기 처리에서 발생한 에러는 then 메서드의 두 번째 콜백 함수로 처리할 수 있다.
에러 처리는 then 메서드 내부에서 인자를 두번째 콜백함수를 주어서 처리하는 방법과 catch 메서드를 사용하는 방법이 있다. 가독성을 위해 catch 메서드에서 하는 것을 권장한다.

## 45.5 프로미스 체이닝
```jsx
const url = 'https://jsonplaceholder.typicode.com';

promiseGet(`${url}/posts/1`)
    .then(({userId})=>promiseGet(`${url}/users/${userId}`))
    .then(userInfo => console.log(userInfo))
    .catch(err => console.error(err));
```
위 예제에서 then -> then -> catch 순서로 후속 처리 메서드를 호출했다. then, catch,finally 후속 처리 메서드는 언제나 프로미스를 반환하므로 연속적으로 호출할 수 있다. 이를 프로미스 체이닝이라고 한다.

후속처리 메서드는 콜백 함수가 반환한 프로미스를 반환한다. 만약 후속 처리 메서드의 콜백 함수가 플미스가 아닌 값을 반환하더라도 그 값을 암묵적으로 resolve 또는 reject하여 프로미스를 생성해 반환한다.

프로미스 체이닝을 통해 비동기 처리 결과를 전달 받아 후속처리를 하므로 콜백 헬이 발생하지 않는다. 다만 프로미스도 콜백 패턴을 사용하므로 콜백 함수를 사용하지 않는 것은 아니다.

콜백 패턴은 가독성이 좋지 않다. 이를 해결하기 위해 ES8에서 async/await가 도입되었다. 이를 사용하면 후속 처리 메서드 없이 마치 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현할 수 있다.
```jsx
const url = 'https://jsonplaceholder.typicode.com';

(async () =>{
    const { userId } = await pormiseGet(`${url}/posts/1`);

    const userInfo = await pormiseGet(`${url}/users/${userId}`);
    
    console.log(userInfo);
})();
```
async/await 도 프로미스를 기반으로 동작한다. 

## 45.6 프로미스의 정적 메서드
Promise는 5가지 정적 메서드를 제공한다.
### 45.6.1 Primise.resolve / Promise.reject
resolve 와 reject 메서드는 프로미스를 생성하기 위해 이미 존재하는 값을 래핑한다.

```jsx
// 배열을 resolve하는 프로미스를 생성
const resolvedPromise = Promise.resolve([1,2,3]);
resolvedPromise.then(console.log); // [1,2,3]

//위와 같은 동작
const resolveNewPromise = new Promise(resolve => resolve([1,2,3]));
resolveNewPromise.then(console.log); // [1,2,3]
```
### 45.6.2 Promise.all
여러 개의 비동기 처리를 모두 병렬 처리할 때 사용한다.
모든 프로미스가 fulfilled 상태가 되면 종료한다. 만약 하나라도 rejected 상태가 되면 나머지 프로미스가 fulfilled 상태가 되는 것을 기다리지 않고 즉시 종료한다.
### 45.6.3 Promise.race
여러개의 프로미스 중 가장 먼저 fulfilled 상태가 된 프로미스의 처리 결과를 반환한다. 만약 rejected 상태가 되면 전달된 프로미스가 하나라도 rejected 상태가 되면 에러를 reject하는 새로운 프로미스를 반환한다.

### 45.6.4 Promise.allSettled
전달받은 프로미스가 모두 settled 상태가 되면 처리 결과를 배열로 반환한다. ES11에 도입된 메서드이고 IE를 제외한 대부분의 모던 브라우저에서 지원한다.

## 45.7 마이크로태스크 큐
```jsx
setTimeout(()=> console.log(1),0);

Promise.resolve()
    .then(()=>console.log(2))
    .then(()=>console.log(3));
```
위 예제는 어떻게 동작할까? 1->2->3의 순으로 출력할 것 같지만 2->3->1의 순으로 출력된다. 그 이유는 프로미스의 후속 처리 메서드의 콜백함수는 태스크 큐가 아니라 마이크로태스크 큐에 저장되기 떄문이다.

둘은 별도의 큐이다. 마이크로태스크 큐에는 프로미스의 후속 처리 메서드의 콜백 함수가 일시 저장된다. 그 외의 비도익 함수의 콜백 함수나 이벤트 핸들로는 태스크 큐에 일시 저장된다. 

콜백 함수나 이벤트 핸들러를 일시 저장한다는 점에서 태스크 큐와 동일하지만 마이크로태스크 큐는 태스크 큐보다 우선순위가 높다. 즉, 이벤트 루프는 콜 스택이 비면 먼저 마이크로태스크 큐에서 대기하고 있는 함수를 가져와 실행한다. 이후 마이크로태스크 큐가 비면 태스크 큐에서 대기하고 있는 함수를 가져와 실행한다.
## 45.8 fetch
HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API이다. XMLHttpRequest 객체보다 사용법이 간단하고 프로미스를 지원하기 때문에 비동기 처리를 위한 콜백 패턴의 단점에서 자유롭다. IE를 제외한 대부분의 모던 브라우저에서 제공한다.

fetch 함수에는 HTTP 요청을 전송할 URL, HTTP 요청 메서드, HTTP 요청 헤더, 페이로드 등을 설정한 객체를 전달한다.
```jsx
const promise = fetch(url [, options]);
```
HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환한다. 첫 번째 인수로 HTTP 요청을 전송할 URL만 전달하면 GET 요청을 전송한다.

fetch 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 프로미스를 반환하므로 후속 처리 메서드 tehn을 통해 프로미스가 resolve한 Response 객체를 전달받을 수 있다. Response 객체는 HTTP 응답을 나타내는 다양한 프로퍼티를 제공한다.

Response.prototype에는 Response 객체에 포함되어 있는 HTTP 응답 몸체를 위한 다양한 메서드를 제공한다.
```jsx
fetch('https://jsonplaceholder.typicode.com/todos/1')
    // response는 HTTP 응답을 나타내는 Response 객체이다.
    .then(response => response.json())
    // json은 역직렬화된 HTTP 응답 몸체이다.
    .then(json => console.log(json));
```

fetch 함수를 사용할 때는 에러 처리에 주의해야 한다.
```jsx
const wrongUrl = 'https://jsonplaceholder.typicode.com/xxx/1';
fetch(wrongUrl)
    // response는 HTTP 응답을 나타내는 Response 객체이다.
    .then(() => console.log('ok'))
    // json은 역직렬화된 HTTP 응답 몸체이다.
    .then(() => console.log('error'));
```
부적절한 URL을 지정했기 떄문에 404 에러가 발생한다. catch 후속 처리 메서드에 의해 error가 출력될 것처럼 보이지만 ok 가 출력된다.

fetch 함수가 반환하는 프로미스는 기본적으로 404, 500과 같은 HTTP 에러가 발생해도 에러를 reject하지 않고 불리언 타입의 ok 상태를 false로 설정한 Response 객체를 resolve한다. 오프라인 등의 네트워크 장애나 CORS 에러에 의해 요청이 완료되지 못한 경우에만 프로미스를 reject한다.

따라서 fetch 함수를 사용할 때는 다음과 같이 fetch 함수가 반환한 프로미스가 resolve한 불리언 타입의 ok상태를 확인해 명시적으로 에러를 처리해야 한다.

```jsx
const wrongUrl = 'https://jsonplaceholder.typicode.com/xxx/1';
fetch(wrongUrl)
    // response는 HTTP 응답을 나타내는 Response 객체이다.
    .then(response => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    })
    .then(todo => console.log(todo))
    .catch(err => console.error(err));
```
참고로 axios 는 모든 HTTP 에러를 reject한느 프로미스를 반환한다. 따라서 모든 에러를 catch에서 처리할 수 있어 편리하다. 또한 fetch 보다 인터셉터, 요청 설정등에서 다양한 기능을 지원한다.

fetch 함수를 통해 HTTP 요청을 전송해보자

![MDN Using Fetch](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)