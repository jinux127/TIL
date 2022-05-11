## ✨ 클린 코드

클린 코드란 개끗하게 작성된 코드를 의미합니다. 이러한 코드는 누가 보더라도 의도가 명확히 드러나 가독성이 좋고, 의존성을 줄여 유지보수가 쉬운 특징이 있습니다.

타입스크립트는 타입을 추가함으로써 클린코드를 작성하는 데 도움을 줄 수 있습니다.

## 타입이 필요한 이유

```jsx
let text = 'elice';
console.log(text.charAt(0)); /// 'e' 출력
```

자바스크립트는 알다시피 동적 타이핑을 지원합니다. 위의 예제에서 문자열 타입의 변수가 문자형으로 변하는 것을 볼 수 있습니다.

이 동적 타이핑은 얼핏보면 편리할 수 있다. 하지만 다음 예제 코드를 보자

```jsx
text = 12345;
console.log(text.charAt(0));
```

위의 예제를 실행하면 **TypeError: text.charAt is not a function** 에러가 발생하는 것을 볼 수 있다. 이처럼 자바스크립트는 타입이기 때문에 실행 후에 타입 에러를 확인할 수 있다. 반면 타입스크립트는 같은 코드에 대해 미리 에러를 확인할 수 있다. 즉, 컴파일 단계에서 미리 확인하고 고칠 수 있다는 것이다.

위처럼 타입을 정의함으로써 개발자의 실수를 줄이고, 명시된 타입을 보고 자료형이 무엇인지 쉽게 이해할 수 있는 타입스크립트를 사용하지 않을 이유는 없는 것 같다.

타입스크립트는 변수나 함수 등 Type을 정의할 수 있는데, 타입 표기를 사용한다.

타입스크립트의 Type은 기본자료형, 참조 자료형, 추가 제공 자료형 이 있다.

-   기본 자료형
    -   object와 reference 형태가 아닌 실제 값을 저장하는 자료형, 기본자료형 내장 함수를 사용 가능 → 이는 JS 처리 방식 덕분
    -   종류
        -   string
        -   boolean
        -   number
        -   null
        -   undefined
        -   symbol (ES6 추가)

```tsx
let str: string = 'test';

let isSucceeded: boolean = true;

let num: number = 3;

let n: null = null;

let u: undefined = undefined;
```

-   참조 자료형
    -   객체, 배열, 함수 등과 같은 Object형식의 타입, 메모리에 값을 주소로 저장, 출력 시 메모리 주소와 일치하는 값을 출력
    -   종류
        -   object
        -   array
        -   function

```tsx
//object
// 기본자료형에 해당하지 않는 타입
function create(o: object): void {}

create({ prop: 0 }); // 성공
create([1, 2, 3]); // 성공
create('string'); // error

// array
// 배열
let arr: number[] = [1, 2, 3];

let arr: Array<number> = [1, 2, 3]; // 위와 같다.
```

-   추가 제공 자료형
    -   타입스크립트에서 개발자의 편의를 위해 추가로 제공하는 타입이다.
    -   종류
        -   tuple
        -   enum
        -   any
        -   void
        -   never

```tsx
// tuple
// 길이와 각 요소의 타입이 정해진 배열을 저장하는 타입
let arr: [string, number] = ['Hi', 6];

arr[1].concat('!'); // ERror, 'number' does not have 'concat'

// enum
// 특정 상수들의 집합을 저장하는 타입

enum Car {
    BUS,
    TAXI,
    SUV,
}

let bus: Car = Car.BUS;
let bus: Car = Car[0]; // 인덱스 번호로 접근

enum Car {
    BUS = 1,
    TAXI = 2,
    SUV = 3,
} // 인덱스 번호를 임의로 지정할 수 도 있다.

// 위의 TAXI의 인덱스는 2 호출
let taxi: String = Car[2];

// any
// 모든 타입을 저장 가능
// 컴파일 중 타입 검사 x
let str: any = 'hi';
let num: any = 10;
let arr: any = ['a', 2, true];

// void
// any 의 반대 타입, 보통 함수에서 반환 값이 없을 경우 사용한다.
// 변수에서는 undefined와 null 만 할당 가능하다.

let unknown: void = undefined;

function sayHi(): void {
    console.log('hi');
}

// never
// 발생할 수 없는 타입
// 항상 오류를 발생시키거나, 절대 반환하지 않는 반환 또는 종료되지 않는 함수이다.
function neverEnd(): never {
    while (true) {}
}
```

## Utility types

타입스크립트는 공통 타입 변환을 용이하게 하기 위해 전역으로 사용 가능한 유틸리티 타입을 제공한다.

-   종류
    -   Partial<T>, Readonly<T>
    -   Record<T>, Pick<T,K>
    -   Omit<T,K>, Exclude<T, U>, Extract<T, U>
    -   NonNullabel<T>, Parameters<T>, ConstreuctorParameters<T>
    -   ReturnType<T>, Required<T>

### 일반적으로 많이 사용하는 Utility type

-   Partial<T>
    -   프로퍼티를 선택적으로 만드는 타입을 구성한다.
    -   주어진 타입의 모든 하위 타입 집합을 나타내는 타입을 반환한다.
-   Readonly<T>
    -   프로퍼티를 읽기 전용으로 설정한 타입을 구성한다.
-   Record<T>
    -   프로퍼티의 집합 K로 타입을 구성한다.
    -   타입의 프로퍼티들을 다른 타입에 매핑시키는 데 사용한다.
-   Pick<T,K>
    -   프로퍼티 K의 집합을 선택해 타입을 구성한다.
-   Omit<T,K>
    -   모든 프로퍼티를 선택한 다음 K를 제거한 타입을 구성한다.
-   Exclude<T,U>
    -   T에서 U에 할당할 수 있는 모든 속성을 제외한 타입을 구성한다.
-   Extract<T,U>
    -   T에서 U에 할당할 수 있는 모든 속성을 추출하여 타입을 구성한다.
-   NonNullable<T>
    -   null과 undefined를 제외한 타입이다.
-   Parameters<T>
    -   함수 타입 T의 매개변수 타입들의 튜플 타입을 구성한다.
-   ConstructorParameters<T>
    -   생성자 함수 타입의 모든 매개변수 타입을 추출한다.
    -   모든 매개변수 타입을 가지는 튜플 타입(T가 함수가 아닌 경우 never)을 생성한다.
-   ReturnType<T>
    -   함수 T의 반환 타입으로 구성된 타입을 생성한다.
-   Required<T>

    -   T의 모든 프로퍼티가 필수로 설정된 타입을 구성한다.

    JavaScript와 TypeScript의 함수는 일급 객체이다. 일급 객체란 다른객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 일급 객체라고 한다.

일급 객체의 조건으로 다른 함수에 매개변수로 제공할 수 있고, 함수에서 반환, 변수에 할당이 가능한 것이 조건이다.

함수 선언 방법엔 5가지가 있다.

1. 함수 선언식

    ```tsx
    function world(name) {
        return 'hello${name}';
    }
    ```

2. 함수 표현식

    ```tsx
    let world2 = function (name) {
        return `hello${name}`;
    };
    ```

3. 화살표 함수 표현식

    ```tsx
    let world3 = (name) => {
        return `hello${name}`;
    };
    ```

4. 단축형 화살표 함수 표현식

    ```tsx
    let world4 = (name) => `hello${name}`;
    ```

5. 함수 생성자 ( 사용 권장 X)

    ```tsx
    let world5 = new Function('name', 'return "hello"+ name');
    ```

타입스크립트에서 함수 작성 시 반환 타입을 추론 하도록 하는 걸 권장한다.

함수의 매개변수와 인수의 타입이 호환가능하게 작성한다.

1. 함수 선언식

```tsx
function world(name: string): string {
    return 'hello${name}';
}
```

1. 함수 표현식

```tsx
let world2 = function (name: string): string {
    return `hello${name}`;
};
```

1. 화살표 함수 표현식

```tsx
let world3 = (name: string): string => {
    return `hello${name}`;
};
```

1. 단축형 화살표 함수 표현식

```tsx
let world4 = (name: string): string => `hello${name}`;
```

타입스크립트 컴파일러는 방정식의 한쪽에만 타입이 있더라도 타입을 추론할 수 있다. 이러한 타입 추론 형태를 contextual typing이라고 한다.

```tsx
let f12: (baseValue: number, increment: number) => number = function (x, y) {
    return x + y;
};
```

### 함수의 매개변수

함수에 주어진인자의 수는 함수가 기대하는 매개변수의 수와 일치해야 한다.

```tsx
function buildName(firstName: string, lastName: string) {
    return forstName + ' ' + lastName;
}
```

### 선택적 매개변수

JavaScript에서는 모든 매개변수가 선택적으로 인수가 없다면 undefined가 된다. TypeScript에서는 선택적 매개변수는 변수명 뒤에 ‘?’를 붙여 사용할 수 있다.

```tsx
function buildName(firstName: string, lastName?: string) {
    if (lastName) return firstName + ' ' + lastName;
    else return firstName;
}
```

### 기본 초기화 매개변수

값을 제공하지 않거나, undefined로 했을 대에 매개변수의 값 할당을 할 수 있다.

```tsx
function buildName(firstName: string, lastName = 'Smith') {
    return firstName + ' ' + lastName;
}
```

### 나머지 매개변수

컴파일러는 생략 부호 뒤에 인자 배열을 빌드해 함수에서 사용할 수 있다. 나머지 매개변수는 매개변수의 수를 무한으로 취급한다. 이 때 아무것도 넘겨주지 않을 수도 있다.

```tsx
function buildName(firstName: string, ...restOfName: string[]){
	return forstName + " " + restOfName.join(' ;
}
```
