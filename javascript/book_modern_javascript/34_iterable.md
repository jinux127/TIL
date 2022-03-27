# 이터러블
## 34.1 이터레이션 프로토콜
ES6에서 도입된 이터레이션 프로토콜은 순회 가능한 데이터 컬렉션을 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙이다.

ES6 이전의 순회 가능한 데이터 컬렉션, 즉 배열, 문열, 유사 배열 객체, DOM 컬렉션 등은 통일된 규약없이 각자 나름의 구조를 가지고 다양한 방법으로 순회할 수 있었다.

ES6에서는 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일하여 for...of 문, 스프레드 문법, 배열 디스트럭처링 할당의 대상으로 사용할 수 있도록 일원화했다.

이터레이션 프로토콜에는 이터러블 프로토콜과 이터레이터 프로토콜이 있다.
 - 이터러블 프로토콜: Well-known Symbol인 Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이러한 규약을 이터러블 프로토콜이라 한다.
 - 이터레이터 프로토콜: 이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이터레이터는 next 메서드를 소유하며 next 메서드를 호출하면 이터러블을 순회하며 value와 done 프로퍼티를 갖는 iterator result object를 반환한다. 이러한 규약을 이터레이터 프로토콜이라 한다.

 - 이터러블 : 이터러블 프로토콜을 준수한 객체, for ... of 문으로 순회할 수 있으며 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.

 - 이터레이터 : 이터레이터 프로토콜을 준수한 객체, 이터러블의 요소를 탐색하기 위한 포인터 역할을 한다.

### 34.1.1 이터러블
```jsx
const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';

// 배열, 문자열, Map, Set 등은 이터러블이다.
isIterable([]); // true
isIterable(''); // true
isIterable(new Map()); // true
isIterable(new Set()); // true
isIterable({}); // false
```

### 34.1.2 이터레이터
```jsx
const array = [1,2,3];
const iterator = array[Symbol.iterator]();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

### 34.2 빌트인 이터러블
### 34.3 for ... of 문
### 34.4 이터러블과 유사 배열 객체
### 34.5 이터레이션 프로토콜의 필요성
### 34.6 사용자 정의 이터러블