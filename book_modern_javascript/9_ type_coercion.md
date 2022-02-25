# 9. 타입 변환과 단축 평가

## 9.1 타입 변환이란?

자바스크립트의 모든 값은 타입이 있다. 값의 타입은 개발자의 의도에 따라 다른 타입으로 변환할 수 있다. 개발자가 의도적으로 타입을 변환하는 것을 **명시적 타입 변환** 또는 **타입 캐스팅**이라고 한다. 개발자의 의도와는 상관없이 자바스크립트 엔진에 의해 암묵적으로 자동 변환되는 것을 **암묵적 타입 변환** 또는 **타입 강제 변환**이라고 한다.

## 9.2 암묵적 타입 변환

### 9.2.1 문자열 타입으로 변환

```jsx
0+'' //"0"
NaN+'' // "NaN"
true+'' // "true"
({})+'' //"[object Object]"
Math + '' //"[object Math]"
```

### 9.2.2 숫자 타입으로 변환

```jsx
+'' //0
+'0' // 0
+'string' // NaN
+true // 1
+false // 0
+null // 0
+{} // NaN
+[] // 0
+[10, 20] // NaN
```

### 9.4.2 옵셔녈 체이닝 연산자

```jsx
// ?.

let elem = null;

//elem이 null 도는 undefineddlaus undefined 반환, 그렇지않다면 우항의 프로퍼티 참조
let value = elem?.value;
console.log(value); //undefined
```

옵셔널 체이닝 연산자가 도입되기 전에는 논리 연산자 &&를 사용했다. 좌항 피연산자가 false로 평가되는 falsy 값이면 좌항 피연산자를 그대로 반환한다. 하지만 옵셔널 체이닝 연산자는 좌항 피연산자가 falsy값이라도 null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.

```jsx
// &&
let str ='';

let length = str && str.length;

console.log(length); //''

// ?.

let str2 ='';

// null 또는 undefine가 아니면 우항의 프로퍼티 참조를 이어간다.
let length2 = str2?.length;
console.log(length2); // 0
```

### 9.4.3 null 병합 연산자
ES11에서 도입된 null 병합 연산자 ??는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.

```jsx
//좌항의 피연산자가 null 또는 undefined이니깐 우항의 피연산자 저장
var foo = null ?? "defaul str";
console.log(foo); // "default str
```

null 병합 연산자 ?? 가 도입되기 전에는 논리연산자 ||를 사용한 단축 평가를 통해 변수에 기본값을 설정했다. 만약 falsy값인 0이나 ''도 기본값으로서 유효하다면 예기치 않은 동작이 발생할 수 있다.

```jsx
var foo = '' || "default"
console.log(foo); // "default"
```
하지만 ?? 는 falsy값이라도 null 또는 undefined가 아니면 좌항의 피연산자를 그대로 반환한다.
```jsx
var foo = '' ?? 'default';
console.log(foo); // ''
```

