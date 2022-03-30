# strict mode
## 20.1 strict mode란?
```jsx
function foo(){
    x=10;
}
foo();
console.log(x);
```

위의 예제를 살펴보면 x 변수의 선언이 존재하지 않기 때문에 ReferenceError를 발생시킬 것 같지만 JS 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성한다. 이러한 현상을 암묵적 전역이라고 한다.

암묵적 전역은 오류를 발생시키는 원인이 될 가능성이 크다. 다라서 반드시 var, let, const 키워드를 사용하여 변수를 성넝ㄴ한 다음 사용해야 한다.

하지만 실수는 언제나 발생하기에 잠재적인 오류를 발생시키기 어려운 개발 환경을 만드는 해결책이 ES5부터 추가되었다.

## 20.2 strict mode의 적용
전역의 선두 또는 함수 몸체의 선두에 'use strict';를 추가한다.

## 20.3 전역에 strict mode를 적용하는 것은 피하자.
전역에 적용한 strict mode는 스크립트 단위로 적용된다. strict mode 스크립트와 아닌 스크립트의 혼용은 오류를 발생시킬 수 있다.

## 20.4 함수 단위로 strict mode를 적용하는 것도 피하자.
어떤 함수는 적용, 어떤 함수는 적용하지 않는 것은 바람직하지 않으며, 번거로운 일이다. 또 strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제가 발생할 수 있다.

## 20.5 strict mode가 발생시키는 에러
1. 암묵적 전역
```jsx
(function (){
    'use strict';

    x = 1;
    console.log(x);
}());
```
2. 변수, 함수, 매개변수의 삭제
```jsx
(function (){
    'use strict';

    var x = 1;
    delete x;

    function foo(a){
        delete a;
    }

    delete foo;
}());
```
3. 매개변수 이름의 중복
4. with 문의 사용

## 20.6 strict mode 적용에 의한 변화
1. 일반 함수의 this

strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다.
```jsx
(function (){
    'use strict';

    function foo(){
        console.log(this); // undefined
    }
    foo();
    
    
    function foo2(){
        console.log(this); // foo2 {}
    }
    new foo2();

    
}());
```

2. arguments 객체
매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.
```jsx
(function (a){
    'use strict';
    a = 2;

    console.log(arguments);
}(1))
```