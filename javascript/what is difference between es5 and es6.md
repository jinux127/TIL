# ES5 vs ES6

## 1. let, const 키워드 추가
기존의 var 키워드는 함수 레벨 스코프를 가지며 암묵적 재할당이 가능하였다. 이를 보완하기 위해 블록 레벨 스코프를 가지며 재할당이 가능한 let, const 키워드가 추가되었습니다.

## 2. Arrow function 추가
화살표 함수가 추가되어 함수를 간결하게 나타낼 수 있다. 이에 따라서 가독성이 올라갔다고 판단된다. 단, 기존의 함수와 this 바인딩이 다르다.

## 3. Default parameter 추가
기존에 함수의 매개변수에 초깃값을 작성하려면 함수 내부에서 로직이 필요했으나, default parameter가 추가되었습니다.
```jsx
// es5
var bmi = function(height, weight){
    var height = height || 184;
    var weight = weight || 84;
    return weight / (height * height / 10000);
}

// es6
const bmi = function(height = 184, weight = 84){
    return weight / (height * height / 10000);
}
```
## 4.Template literal 추가
백틱 사용 `` 
백틱의 기능은 줄바꿈과 ${}를 사용해 자바스크립트 표현식 삽입가능

## 5. 클래스
자바스크립트는 프로토타입 기반의 객체 지향 프로그래밍인이다. 자바스크립트에서 클래스는 객체를 생성하는 함수라고 생각된다.

단 생성자 함수와 동일하게 동작하지 않으며, 클래스가 엄격하며 호이스팅이 발생하지 않는 것처럼 let, const 키워드처럼 동작하게 됩니다.

## 6. 모듈
모듈이란 재사용하기 위한 코드 조각을 뜻하며, 세부사항은 캡슐화 시키고, API 부분만 외부에 노출시킨 코드들입니다.


사용법은 type에 module을 추가하고, 파일 확장자를 mjs로 변경시키는 것입니다.
```jsx
<script type="module" src="lib.mjs"></script>
```
모듈은 모듈 스코프를 가지며, export, import 키워드로 사용합니다.

## 7.디스트럭처링할당
디스트럭처링이란, 비구조화, 파괴를 뜻하는 단어이며 크게 객체나 배열에서 사용해서 개별 변수에 할당하는 것입니다.
```jsx
// array 디스트럭처링
const arr = [1,2,3];
const [one, two, three] = arr;

//object 디스트럭처링
const obj = { firstName: 'Jung', lastName: 'Jinwoo'};
const { lastName, firstName } = obj;
```
위의 예제에서 배열은 순서를 중여하게 여기게 되고, 객체는 키값을 중요하게 여겨 순서를 바꾸어도 동일하게 동작합니다.

## 8. 프로미스
비동기통신에 있어 기존에 콜백 함수를 사용한 콜백 패턴을 사용하였습니다.

이를 해결하기 위해 프로미스가 도입되었고, 프로미스 후속처리 메서드를 통해 에러 처리를 효과적으로 할 수 있게 됬다.
## 9. string 메서드(includes, startsWith, endsWith)

```jsx
const text = "Hello world jin woo";
text.includes("world"); // true
text.startsWith("Hello"); // true
text.endWith("woo"); // true
```
문자열 메서드가 추가되었습니다. 

- 포함 : includes
- 시작 : startsWith
- 끝 : endWith

## 마무리
위 내용을 포함한 많은 것들이 ES6(2015년)에 추가 되었습니다. 이후 JS의 발전과 함께 프론트 시장이 커졌습니다.