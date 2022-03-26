# 프로퍼티 어트리뷰트
## 16.1 내부 슬롯과 내부 메서드
프로퍼티 어트리뷰트를 이해하기 위해 먼저 내부 슬롯과 내부 메서드의 개념에 대해 알아야 한다.

내부 슬롯과 내부 메서드 => 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드다.

이중 대괄호 [[]]로 감싼 이름들이 내부 슬롯과 내부 메서드이다.

내부 슬롯과 내부 메서드는 개발자가 직접 접근할 수 있도록 외부로 공개된 객체의 프로퍼티는 아니다. 단, 일부는 간접적으로 접근할 수 있는 수단을 제공하기는 한다.

예를 들어, 모든 객체는 [[Prototupe]]이라는 내부 슬롯을 갖는다. 이 내부 슬롯은 __proto__를 통해 간접적으로 접근할 수 있다.
```jsx
const o ={};

// 접근 X
o.[[prototype]] // -> Uncaught SyntaxError: Unexpected token '['
// 일부는 간접적으로 접근할 수 있는 수단을 제공한다.
o.__proto__ // -> Object.prototype
```

## 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체
자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.

>프로퍼티 상태
> - 프로퍼티의 값
> - 값의 갱신 가능 여부
> - 열거 가능 여부
> - 재정의 가능 여부

프로퍼티 어트리뷰트: JS엔진이 관리하는 내부 상태 값인 내부 슬롯 4가지
 - [[Value]]
 - [[Writable]]
 - [[Enumerable]]
 - [[Configurable]]

프로퍼티 어트리뷰트에 직접 접근할 수 없지만 Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인할 수 있다.

Object.getOwnPropertyDescriptor(갹체의 참조, '프로퍼티 키')로 호출하고, 이때 프로퍼티 디스크립터 객체(프로퍼티 어트리뷰트 정보)를 반환한다. 만약 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 호출일 경우 undefined가 반환된다.

Object.getOwnPropertyDescriptor 메서드는 하나의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환하지만 ES8에서 도입된 Object.getOwnPropertyDescriptor 메서드는 모든 프로퍼티의 디스크립터 객체들을 반환한다.

```jsx 
const person = {
    name: 'Lee'
};

person.age = 20; // 프로퍼티 동적 생성

console.log(Object.getOwnPropertyDescriptor(person, 'name'));

// 모든 프로퍼티의 디스크립터 객체들을 반환한다.
console.log(Object.getOwnPropertyDescriptor(person));
```

## 16.3 데이터 프로퍼티와 접근자 프로퍼티

**데이터 프로퍼티**
- 키와 값으로 구성된 일반적인 프로퍼티

**접근자 프로퍼티**
- 자체적으로는 값을 갖지 않고 다른 데이터 의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티

### 16.3.1 데이터 프로퍼티
데이터 프로퍼티는
 - [[Value]]: value, 프로퍼티 키를 통해 프로퍼티 값을 변경하면 [[Value]]에 값을 재할당, 이때 없으면 동적 생성하고 생선된 프로퍼티의 [[Value]]에 값을 저장
 - [[Writable]]: writable, false인 경우 [[Value]]의 값을 변경할 수 없는 읽기 전용 프로퍼티가 된다.
 - [[Enumerable]]: enumerable, false인 경우 for ... in 문이나 Object.keys 메서드 등으로 열거할 수 없다.
 - [[Configurable]]: configurable, false인 경우 삭제, 변경이 금지된다. 단, [[Writable]]이 true인 경우 [[Value]]의 변경과 [[Writable]]을 false로 변경하는 것은 허용된다.
 
 와 같은 프로퍼티 어트리뷰트를 갖는다.

### 16.3.2 접근자 프로퍼티
접근자 프로퍼티는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티이다.

- [[Get]]: get, 프로퍼티의 값을 읽을 때 호출되는 접근자 함수이다.
- [[Set]]: set, 프로퍼티의 값을 저장할 때 홏ㄹ되는 접근자 함수이다.
- [[Enumerable]]: enumerable, 데이터 프로퍼티와 같다.
- [[Configurable]]: configurable, 데이터 프로퍼티와 같다.

위와 같은 프로퍼티 어트리뷰트를 갖는다.

접근자 함수는 getter/setter 함수라고도 부른다.

```jsx
const person ={
    // 데이터 프로퍼티
    firstName: 'jinwoo',
    lastName: 'Jeong',

    // getter
    get fullName(){
        return `${this.firstName} ${this.lastName}`;
    },

    // setter
    set fullName(name){
        [this.firstName, this.lastName] = name.split(' ');
    }
};

console.log(person.firstName + ' ' + person.lastName);

// setter 함수 호출
person.fullName = 'New Name';
console.log(person);

// getter 함수 호출
console.log(person.fullName);

// firstName은 데이터 프로퍼티이다.
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);

// fullName은 접근자 프로퍼티이다.
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
```

접근자 프로퍼티 fullName으로 프로퍼티 값에 접근하면 내부적으로 [[Get]]메서드가 호출되어 다음과 같이 동작한다.

1. 프로퍼티 키 유효 확인(문자열 또는 심벌)
2. 프로토타입 체인에서 프로퍼티 검색한다.
3. 검색된 프로퍼티가 (데이터 / 접근자) 프로퍼티 판단한다.
4. 접근자 프로퍼티의 [[Get]]의 값, 즉 getter 함수를 호출하여 그 결과를 반환한다.

> 프로토타입
> - 어떤 객체의 상위 객체의 역할을 하는 객체이다. 하위 객체에게 자신의 프로퍼티와 메서드를 상속한다. 상속받은 하위 객체는 자신의 프로퍼티 또는 메서드인 것처럼 자유롭게 사용한다.
> - 프로토타입 체인은 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조를 말한다. 객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 체인을 따라 프로퍼티나 메서드를 차례대로 검색한다.

접근자/데이터 프로퍼티 구별하는 방법
```jsx
// 일반 객체의 __proto__는 접근자 프로퍼티
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

// 함수 객체의 prototype은 데이터 프로퍼티
Object.getOwnPropertyDescriptor(function() {}, 'prototype');
```
## 16.4 프로퍼티 정의
Object.defineProperty(객체의 참조, '프로퍼티의 키', 프로퍼티 디스크립터 객체) -> 프로퍼티의 어트리뷰트를 정의할 수 있다.

프로퍼티 디스크립터 객체의 일부 생략 할 수 있다. 이때는 기본값이 적용된다.
- value -> undefined
- get -> undefined
- set -> undefined
- writable -> false
- enumerable -> false
- configurable -> false

Object.definedProperties -> 여러 개의 프로퍼티를 한번에 정의할 수 있다.

## 16.5 객체 변경 방지
객체는 변경 가능한 값이므로 재할당 없이 직접 변경할 수 있다. JS는 객체의 변경을 방지하는 다양한 메서드를 제공한다. 객체 변경 방지 메서드들은 객체의 변경을 금지하는 강도가 다르다.

- 객체 확장 금지: Object.preventExtensions 메서드 / 프로퍼티 추가 X, 삭제 O, 읽기 O, 쓰기 O, 어트리뷰트 재정의 O
- 객체 밀봉: Object.seal 메서드 / 추가 X, 삭제 X, 읽기 O, 쓰기 O, 어트리뷰트 재정의 X
- 객체 동결: Object.freeze 메서드 / 추가 X, 삭제 X, 읽기 O, 쓰기 X, 어트리뷰트 재정의 X

### 16.5.4 불변 객체
변경 방지 메서드들은 얕은 변경 방지로 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지는 못한다. 따라서 Object.freeze 메서드로 객체를 동결하여도 중접 객체까지 동결할 수 없다.

객체의 중첩 객체까지 동결하려면 재귀적으로 Object.freeze메서드를 호출해야 한다.
