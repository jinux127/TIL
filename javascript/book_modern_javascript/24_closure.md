# 클로저
클로저는 JS고유의 개념이 아니므로 정의가 ECMAScript 사양에 등장하지 않는다. MDN에서 클로저에 대해 다음과 같이 정의한다.
> 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

함수가 선언된 렉시컬 환경
```jsx
const x = 1;

function outerFunc(){
    const x = 10;

    function innerFunc(){
        console.log(x);
    }

    innerFunc();
}

outerFunc();
```

outerFunc 함수 내부에서 중첩 함수 innerFunc가 정의되고 호출되었다. 이때 중첩 함수 innerFunc의 상위 스코프는 외부 함수 outerFunc의 스코프다. 따라서 중첩 함수 innerFunc 내부에서 자신을 포함하고 있는 외부 함수 outerFunc의 x변수에 접근할 수 있다.

만약 innerFunc 함수가 outerFunc 함수 내부의 중첩함수가 아니라면 outerFunc에 접근할 수 없다.

이같은 현상이 발생하는 이유는 JS가 렉시컬 스코프를 따르는 프로그래밍 언어이기 때문이다.

## 24.1 렉시컬 스코프
JS엔진은 함수를 어디에 정의했는지에 따라 상위 스코프를 결정한다. 이를 렉시컬 스코프(정적 스코프)라 한다. // 13.5 렉시컬 스코프 참고

