# this
객체는 상태를 나타내는 프로퍼티와 동작을 나타내는 메서드를 하나의 논리적인 단위로 묶은 복합적인 자료구조이다 -> 19.1절 객체지향 프로그래밍

동작을 나타내는 메서드는 프로퍼티를 참조하고 변경할 수 있어야 한다. 이때 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.

객체 리터럴 방식으로 생성한 객체의 경우 메서드 내부에서 메서드 자신이 속한 객체를 가리키는 식별자를 재귀적으로 참조할 수 있다.

하지만 자기 자신이 속한 객체를 재귀적으로 참조하는 방식은 일반적이지 않으며 바람직하지도 않다.

this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수이다. this를 통해 자신이 속한 객체 또는 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.

this가 가리키는 값, this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.

```jsx
const circle = {
    radius : 5,
    getDiameter(){
        return 2 * this.radius;
    }
};

console.log(circle.getDiameter());
```
객체 리터럴의 메서드 내부에서의 this는 메서드를 호출한 객체를 가리킨다.

```jsx
function Circle(radius){
    this.radius = radius;
}

Circle.prototype.getDiameter = function(){
    return 2 * this.radius;
};

const circle = new Circle(5);
console.log(circle.getDiameter());
```

생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.

위의 예시처럼 this는 상황에 따라 가리키는 대상이 다르다. JAVA나 C++같은 클래스 기반 언어에서 this는 언제나 클래스가 생성하는 인스턴스를 가리킨다. 

하지만 JS의 this는 함수가 호출되는 방식에 따라 this 바인딩이 동적으로 결정된다. 또한 strict mode 역시 this 바인딩에 영향을 준다.

this는 코드 어디에서든 참조 가능하다.

```jsx

console.log(this);

function square(number){
    // 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.
    console.log(this);
    return number * number;
}

square(2);

const person = {
    name: 'Jeong',
    getName() {
        // 메서드 내부에서 this는 메서드를 호출한 객체를 키리킨다.
        console.log(this);
        return this.name;
    }
};
console.log(person.getName());

function Person(name){
    this.name = name;
    // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    console.log(this);
}

const me = new Person('Jeong');
```

하지만 일반적으로 객체의 메서드 내부 또는 생성자 함수 내부에서만 의미가 있다. 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이기 때문이다.

따라서 strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다.
## 22.2 함수 호출 방식과 this 바인딩
this 바인딩은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다. 
> 렉시컬 스코프와 this 바인딩은 결정시기가 다르다. 렉시컬 스코프는 함수 정의가 평가되어 객체가 생성되는 시점에 상위 스코프를 결정, this 바인딩은 함수 호출 시점에 결정한다.

주의할 것은 동일한 함수도 다양한 방식으로 호출할 수 있다.
1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

### 22.2.1 일반 함수 호출
기본적으로 전역객체가 바인딩된다.
### 22.2.2 메서드 호출
메서드 내부의 this에는 메서드를 호출한 객체가 바인딩된다.
### 22.2.3 생성자 함수 호출
생성자 함수가 (미래에) 생성할 인스턴스가 바인딩된다.
### 22.2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출
apply, call 메서드는 this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.
```jsx
function getThisBinding(){
    return this;
}

const thisArg = { a: 1};

console.log(getThisBinding()); // window

console.log(getThisBinding.apply(thisArg)); // {a: 1}
console.log(getThisBinding.call(thisArg)); // {a: 1}
```

apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다. 함수를 호출하려면 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩한다.

두 메서드는 전달하는 방식만 다를 분 동일하게 동작한다. 

bind 메서드는 apply와 call 메서드와 달리 함수를 호출하지 않는다. 다만 첫 번째 인수로 전달한 값으로 this 바인딩이 교체된 함수를 새롭게 생성해 반환한다.

bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.