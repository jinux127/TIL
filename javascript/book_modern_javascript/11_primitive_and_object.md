# 원시 값과 객체의 비교

자바스크립트가 제공하는 7가지 데이터 타입은 원시 타입과 객체 타입으로 구분할 수 있다.
데이터 타입을 원시 타입과 객체 타입으로 구분하는 이유는 무엇일까?

1. - 원시 값은 변경 불가능한 값이다.
    - 객체 타입의 값, 즉 객체는 변경 가능한 값이다.
2. - 원시 값ㄹ 변수에 할당하면 변수에는 실제 값이 저장된다. 
    - 객체를 변수에 할당하면 변수에는 참조 값이 저장된다.
3. - 원시 값을 갖는 변수를 다른 변수에 할당되면 원본의 원시 값이 복사되어 전달된다. 이를 값에 의한 전달이라 한다.
    - 객체를 가리키는 변수를 다른 변수에 할당하면 원본의 참조 값이 복사되어 전달된다. 이를 참조에 의한 전달이라 한다.

## 11.1 원시 값
### 11.1.1 변경 불가능한 값
먼저 변수와 값은 구분해서 생각해야 한다. 

> 변수는 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 동간을 식별하기 위해 붙인 이름 

> 값은 변수에 저장딘 데이터로서 표현식이 평가되어 생성된 결과이다.

따라서 변경 불가능하다는 것은 변수가 아니라 값에 대한 얘기이다.

즉 원시 값은 변경 불가능하다는 원시값을 변경할 수 없다는 것이다. 변수는 재할당을 통해 변수 값을 변경(교체) 할 수 있다. cf) 변수의 상대 개념인 상수 => 재할당이 금지된 변수

원시 값은 변경 불가능한 값이다. 따라서 변수 값을 변경하기 위해 원시 값을 재할당하면 새로운 메모리 공간을 확보하고 재할당한 값을 저장한 후, 변수가 참조하던 메모리 공간의 주소를 변경한다. => 이를 **불변성**이라 한다.

원시 값을 할당한 변수는 재할당 이외에 변수 값을 변경할 수 있는 방법이 없다.
> 이유: 예기치 않게 변수 값이 변경될 수 있다 -> 상태 변경을 추적하기 어렵다.
### 11.1.2 문자열과 불변성
원시 값인 문자열은 다른 원시 값과 다른 특징이 있다. 문자열은 0개 이상의 문자로 이뤄진 집합을 말하며, 1개의 문자는 2바이트의 메모리 공간에 저장된다. 따라서 문자열은 몇 개의 문자로 이뤄졌느냐에 따라 필요한 메모리 공간의 크기가 결정된다.

> ex) 숫자 값 1과 1000000은 동일한 8바이트, 문자열의 경우 1개의 문자로 이뤄진 문자열은 2바이트 10개의 문자로 이뤄진 문자열은 20바이트가 필요하다

자바스크립트는 개발자의 편의를 위해 원시타입인 문자열 타입을 제공한다. 이는 변경 불가능하다는 뜻
```jsx
var str = 'string';

//문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용해 각 문자 접근
// 문자열은 원시값 -> 변경 x, 이때 에러는 발생하지 않는다.
str[0] = 'S';

console.log(str); // string
```
원시 값은 어떤 일이 있어도 불변한다. 이는 데이터의 신뢰성을 보장한다.

### 11.1.3 값에 의한 전달
원시 값을 갖는 변수가 다른 변수에 할당되면 원본의 원시 값이 복사되어 할당된다. "값에 의한 전달"은 값을 전달하는 것이 아니라 메모리 주소를 전달한다. 단, 전달된 메모리 주소를 통해 메모리 공간에 접근하면 값을 참조할 수 있다.

결국 두 변수의 원시 값은 서로 다른 메모리 공간에 저장된 별개의 값이 되어 어느 한쪽에서 재할당을 통해 값을 변경하더라도 서로 간섭할 수 없다.

## 객체

객체는 프로퍼티의 개수가 정해져 있지 않으며, 동적으로 추가되고 삭제할 수 있다. 또한 프러퍼티의 값에도 제약이 없다. 따라서 확보해야 할 메모리 공간의 크기를 사전에 정해 둘 수 없다.

### 11.2.1 변경 가능한 값
객체는 변경 가능한 값이다. 따라서 객체를 할당한 변수는 재할당 없이 객체를 직접 변경할 수 있다. 즉, 재할당 없이 프로퍼티를 동적으로 추가할 수도 있고 프로퍼티 값을 갱신할 수도 있으며 프로퍼티 자체를 삭제할 수도있다.
```jsx
// 프로퍼티 값 갱신
person.name = "Kim";

// 프로퍼티 동적 생성
persone.address = "Seoul";

console.log(person); {name: "Kim", address: "Seoul"};
```
원시 값은 변경 불가능한 값이므로 원시 값을 갖는 변수의 값을 변경하려면 재할당을 통해 메모리에 원시 값을 새롭게 생성하지만 객체는 변경 가능한 값이므로 메모리에 저장된 객체를 직접 수정할 수 있다. 이때 변수는 재할당 하지 않았으므로 객체를 할당한 변수의 참조 값은 변경되지 않는다.

객체를 변경할 때마다 원시 값처럼 이전 값을 복사해서 새롭게 생성한다면 명확하고 신뢰성이 확보되겠지만 객체는 크기가 매우 클 수도 있고, 원시 값처럼 크기가 일정하지 않으며, 프로퍼티 값이 객체일 수도 있어서 복사해서 생성하는 비용이 많이 든다. => **메모리의 효율적 소비가 어렵고 성능이 나빠진다.**

따라서 효율적인 메모리 사용을 위해 객체를 변경 가능한 값으로 설계되어 있다. 이에 따르는 구조적 단점이 있다. 그것은 **여러 개의 식별자가 하나의 객체를 공유할 수 있다는 것**이다.

### 얕은 복사와 깊은 복사
 - 얕은 복사 : 객체를 프로퍼티 값으로 갖는 객체의 경우 한 단계까지만 복사한다.
 - 깊은 복사 : 객체에 중첩되어 있는 모든 객체까지 모두 복사한다.

 ```jsx
 const o= {x:{y:1}};

 //얕은 복사
 const c1 = {...o};
 console.log(c1 === o); // false
 console.log(c1.x === o.x); // true

 //lodash의 cloneDeep을 사용한 깊은 복사
const _ = require('lodash');
//깊은 복사
const c2 = _.cloneDeep(o);
console.log(c2 === o); // false
console.log(c2.x === o.x); // false
```
얕은 복사와 깊은 복사로 생성된 객체는 원본과는 다른 객체다. 즉, 원본과 복사본은 참조 값이 다른 별개의 객체.
하지만 객체에 중첩되어 있는 객체의 경우 얕은 복사는 참조 값을 복사하고 깊은 복사는 객체에 중첩되어 있는 객체까지 모두 복사해서 원시 값처럼 완전한 복사본을 만든다는 차이가 있다.

### 추가 설명
원시값은 값을 복사 할 때 복사된 값을 다른 메모리에 할당 하기 때문에 원래의 값과 복사된 값이 서로에게 영향을 미치지 않는다

```jsx
const a = 1;
let b = a;

b = 2
```
console.log(a); //1
console.log(b); //2
하지만 참조값은 변수가 객체의 주소를 가리키는 값이기 때문에 복사된 값(주소)이 같은 값을 가리킨다.

```jsx
const a = {number: 1};
let b = a;

b.number = 2

console.log(a); // {number: 2}
console.log(b); // {number: 2}
```
