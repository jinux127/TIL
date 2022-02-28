# 객체 리터럴
## 10.1 객체란?
자바스크립트는 객체 기반의 프로그래밍 언어, 자바스크립트를 구성하는 거의 모든 것이 객체이다. 원시값을 제외한 모든 것이 객체!

원시 타입은 단 하나의 값만 나타내지만 객체 타입은 다양한 타입의 값을 하나의 단위로 구성한 복합적인 자료구조이다. 
- 원시 타입의 값, 즉 원시 값은 변경 불가능한 값 
- 객체는 변경 가능한 값이다.

## 10.2 객체 생성
C++나 자바 같은 클래스 기반 객체지향 언어는 new 연산자와 함께 생성자를 호출하여 인스턴스를 생성한다. 자바스크립트는 프로토타입 기반 객체지향 언어로서 클래스 기반 객체 지향 언어와는 달리 다양한 객체 생성 방법을 지원한다.
- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

이중 객체 리터럴을 사용하는 방법이 가장 일반적이다.
객체 리터럴은 중괄호 내에 0개 이상의 프로퍼티를 정의한다. 만약 정의 하지 않으면 빈 객체가 정의된다.
```jsx
var empty = {}; //빈 객체
console.log(typeof empty); // object
```

객체 리터럴의 중괄호는 코드 블록을 의미하지 않는다.
코드 블록의 뒤에는 세미콜론을 붙이지 않는다. 하지만 객체 리터럴은 값으로 평가되는 표현식이기 때문에 세미콜론을 붙인다.

#### 참고
중복된 키를 선언하면 나중에 선언한 프로퍼티가 덮어쓴다.
```jsx
var foo ={
    name:'Lee',
    name:'Kim'
};
console.log(foo); // name:"Kim"
```
## 10.4 메서드
자바스크립트에서 함수는 객체다. => 값으로 취급할 수 있기 떄문에 프로퍼티 값으로 사용할 수 있다.

프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드라 부른다. 즉, 메서드는 객체에 묶여 있는 함수를 의미한다.
```jsx
let circle ={
    radius: 5,
    getDiameter:()=> 2 * this.radius; //메서드이다.
};

console.log(circle.getDiamete()); //10
```
## 10.5 프로퍼티 접근
접근법 2가지 
- 마침표 프로퍼티 접근 연산자
- 대괄호 프로퍼티 접근 연산자
```jsx
let person ={
    name:'Lee'
};

console.log(person.name); // 마침표 표기법
console.log(person['name']); // 대괄호 표기법
```
#### 예제
```jsx
let person = {
    'last-name':'Lee',
    1:10
};
```
위 예제에서 person.last-name의 실행 겨로가는 Node.js환경에서는 name is not defined 이고 브라우저 환경에서는 NaN이다. 그 이유는 무엇일까?
자바스크립트 엔진은 먼저 person.last를 평가한다. person 객체에는 프로퍼티 키가 last인 프로퍼티가 없기 떄문에 person.last는 undefined로 평가된다. 따라서 person.last-name은 undefined -name과 같다. 다음으로 엔진은 name이라는 식별자를 찾는다. 이때 name은 프로퍼티 키가 아니라 식별자로 해석된다.

Nods.js환경에서는 현재 어디에도 name이라는 식별자 선언이 없으므로 ReferenceError:name is not defined라는 에러가 발생한다. 하지만 브라우저에서는 name이라는 전역 변수가 암묵적으로 존재한다. 전역 변수 name은 window의 이름을 가리킨다.

따라서 person.last-name은 undefined-''과 같으므로 NaN이 된다.

Node.js 
> person.last-name => undefined-name (person.last를 undefined로 평가) => name이라는 식별자를 찾을 수 없음 => ReferenceError

브라우저
> person.last-name => undefined-name (person.last를 undefined로 평가) => name이라는 전역변수 존재(빈 문자열) => undefined - '' => NaN

## 10.9 ES6에서 추가된 객체 리터럴의 확장기능
```jsx
let x=1,y=2;

const obj ={x,y};
console.log(obj); //{x:1, y:2}
```
### 10.9.3 메서드 축약 표현
ES5에서 메서드를 정의하려면 프로퍼티 값으로 함수를 할당한다.
```jsx
//ES5
var obj = {
    name:'Lee',
    sayHi: function(){
        console.log('Hi! ' + this.name);
    }
};
obj.sayHi();
```
ES6에서는 메서드를 정의할 때 function 키워드를 생략한 축약 표현을 사용할 수 있다.
```jsx
// ES6
var obj = {
    name:'Lee',
    sayHi(){
        console.log('Hi! ' + this.name);
    }
};
obj.sayHi();
```
ES6의 메서드 축약 표현으로정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다.