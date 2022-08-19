핵심 용어: Virtual DOM, 렌더링, DOM

# React에서 렌더링

## DOM

HTML 문서를 파싱하여 문서의 구성요소들을 객체로 구조화하여 나타낸 것

## 렌더링이란?

궁극적으로 이미지를 생성하는 과정. 즉, 브라우저가 화면에 생성된 DOM 요소들을 그리는 것을 말한다.

## Virtual DOM

DOM을 추상화한 계층,
애플리케이션의 상태 변경시 Virtual DOM에 업데이트된다. React는 이전의 Virtual DOM 스냅샷과 비교한 뒤 변경된 내용만 업데이트합니다.
[재조정 과정](https://ko.reactjs.org/docs/reconciliation.html#gatsby-focus-wrapper)

## React는 언제 리렌더링 될까?

React의 컴포넌트 상태가 변경될 때 렌더링을 "예약"합니다.

렌더링 예약은 즉시 수행되는 것이 아닌 걸 의미합니다. React는 렌더링 하기에 적합한 순간을 찾기 시작합니다.
