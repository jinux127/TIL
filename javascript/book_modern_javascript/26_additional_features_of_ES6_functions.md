# ES6 함수의 추가 기능
## 26.1 함수의 구분
ES6 이전가지 JS의 함수는 별다른 구분 없이 다양한 목적으로 사용되었다. 일반적인 함수, new 연산자와 함께 호출하여 인스턴스를 생성할 수 있는 생성자 함수와 객체에 바인딩되어 메서드로서 호출할 수도 있다. 이는 편리한 것 같지만 실수를 유발시킬 수 있으며 성능 면에서도 손해라고 한다.

```jsx
var foo =function () {
    return 1;
}
// 일반적인 함수
foo();

// 생성자 함수로서 호출
new foo(); 

// 메서드로서 호출
var obj = { foo: foo};
obj.foo();
```
이는 사용 목적에 따라 명확히 구분되지 않는다.

ES6 이전의 모든 함수는 일반 함수로서 호출할 수 있는것은 물론 생성자 함수로서 호출할 수 있다.
다시 말해, ES6 이전의 모든 함수는 callable이면서 constructor 이다.

>17.2.4 내부메서드[[Call]]과 [[Construct]]에서 살펴보았듯이 호출할 수 있는 함수 객체를 callable이라 하며, 인스턴스를 생성할 수 있는 함수 객체를 constructor, 인스턴스를 생성할 수 없는 함수를 non-constructor라고 한다.

주의할 점 : ES6 이전에 객체에 바인딩된 함수(메서드)도 callable이며 constructor이다.

메서드가 constructor라는 것은 prototype 프로퍼티를 가지며 프로토타입 객체도 생성한다는 것을 의미한다. 이는 함수에 전달되어 보조 함수의 역할을 수행하는 콜백 함수도 마찬가지다.
```jsx
// 콜백 함수를 사용하는 고차 함수 map, 콜백 함수도 constructor이며 프로토타입을 생성한다.
[1,2,3].map(function (item){
    return item * 2;
});
```
이처럼 ES6 이전의 모든 함수는 사용 목적에 따라 명확한 구분이 없으므로 호출 방식에 특별한 제약이 없고 생성자 함수로 호출되지 않아도 프로토타입 객체를 생성한다. 이는 혼란스럽고 실수를 유발할 가능성, 또 성능에도 좋지 않다.

이러한 문제를 해결하기 위해 ES6에서 함수를 사용 목적에 따라 세 가지 종류로 명확히 구분하였다.
---------
|ES6 함수의 구분|constructor|prototype|super|arguments|
|---|:---:|:-:|:-:|:-:|
일반 함수|O |O|X|O
메서드|X|X|O|O
화살표 함수|X|X|X|X

일반 함수는 함수 선언문이나 표현식으로 정의된 함수를 말하며, ES6 이전의 함수와 차이가 없다. 하지만 ES6의 메서드와 화살표 함수는 ES6 이전의 함수와 명확한 차이가 있다.

## 26.2 메서드
ES6 이전에는 메서드의 명확한 정의가 없었다. 일반적으로 객체에 바인딩된 함수를 일컫는 의미였다. 

ES6에서 메서드에 대한 정의가 규정되었다. 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다.

```jsx
const obj = {
    x:1,

    foo(){ // 메서드
        return this.x;
    },
    bar: function(){ //bar에 바인딩된 함수는 메서드가 아닌 일반 함수이다.
        return this.x;
    }
};

console.log(obj.foo());
console.log(obj.bar());
```
ES6 사양에서 메서드는 인스턴스틀 생성할 수 없는 non-constructor이다.

```jsx
new obj.foo(); // TypeError
new obj.bar(); // bar {}
```

ES6 메서드는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.

자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 갖는다. 그러하여 super 키워드를 사용할 수 있다. 

super 참조는 내부 슬롯 [[HomeObject]]를 사용하여 수퍼클래스의 메서드를 참조한다.

```jsx
const base ={
    name:'Lee',
    sayHi(){
        return `Hi ${this.name}`;
    }
};

const derived ={
    __proto__:base,
    // ES6 메서드인 sayHi는 [[HomeObject]]를 갖는다.
    // sayHi의 [[HomeObject]]는 sayHi가 바인딩된 객체인 derived를 가리키고
    // super는 sayHi의 [[HomeObject]]의 프로토타입인 base를 가리킨다.
    sayHi(){
        return `${super.sayHi()}. how are you doing?`;
    }
};

console.log(derived.sayHi()); // Hi Lee. how are you doing?
```

ES6 메서드가 아닌 함수는 super 키워드를 사용할 수 없는데, 메서드가 아닌 함수는 내부 슬롯 [[HomeObject]]를 갖지 않기 때문이다.

ES6 메서드는 본연의 기능(super)을 추가하고 의미적으로 맞지 않는 기능은 제거했다. 따라서 메서드를 정의할 때 프로퍼티 값으로 익명 함수 표현식을 할당하는 이전의 방식은 사용하지 않는 것이 좋다.

## 26.3 화살표 함수
### 26.3.2 화살표 함수와 일반 함수의 차이
1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor이다.
2. 중복된 매개변수 이름을 선언할 수 없다.
3. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.
### 26.3.3 this

## 26.4 Rest 파라미터