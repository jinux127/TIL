# 나만의 React 빌드

[참고사이트](https://pomb.us/build-your-own-react/)

React의 코드를 제거하고 바닐라 Javascript로 교체해보며 React의 이해도를 키워보자

## 0. JSX 정의된 요소 변경

### JSX 변환

```jsx
const element = <h1 title='foo'>Hello</h1>;
const container = document.getElementById('root');
ReactDOM.render(element, container);
```

첫 번째 줄의 JSX로 정의된 요소는 Babel과 같은 빌드 도구에 의해 JS로 변환된다. 변환은 태그 내부의 코드를 createElement 태그이름에 대한 호출로 교체하고, 자식을 매개변수로 전달한다.

```jsx
// const element = <h1 title="foo">Hello</h1>
const element = React.createElement('h1', { title: 'foo' }, 'Hello');
const container = document.getElementById('root');
ReactDOM.render(element, container);
```

바꿈으로써 Javascript로써 Babel을 대체한다.

```jsx
const element = {
  type: 'h1',
  props: {
    title: 'foo',
    children: 'hello',
  },
};
const container = document.getElementById('root');
ReactDOM.render(element, container);
```

js로 사용하려면 createElement로 대체되고 이는 type과 props로 이루어져 있다.(사실은 더 많이) type은 dom의 타입을 나타내며, 함수가 될 수 도 있다. props는 jsx의 어트리뷰트로 받은 키와 값들이다. children은 이번엔 문자열이지만, 보통은 또 다른 엘리먼트들의 배열이다.

### 리액트의 render 변환

리액트의 render는 실제 dom을 바꾸는 함수이다. 이를 JS로 바꾸면

```jsx
const element = {
  type: 'h1',
  props: {
    title: 'foo',
    children: 'hello',
  },
};

const container = document.getElementById('root');
// ReactDOM.render(element, container)을 아래와 같이 바꿀 수 있다.
const node = document.createElement(element.type);
node['title'] = element.props.title;

const text = document.createTextNode('');
text['nodeValue'] = element.props.children;

node.appendChild(text);
container.appendChild(node);
```

## 1.createElement

JSX를 변환했으니 이제 createElement를 부를 수 있다. 그리고 전에 봤듯이 element들은 type과 props를 갖는데 우리 함수가 해야할 유일한 일은 그 객체를 생성하는 것이다.

우리는 이에 대해 스프레드 연산자를 사용하고 props에 대해 나머지 매개변수 구문을 사용합니다.

```jsx
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}
```

예를 들어 createElement('div')는

```jsx
{
  "type": "div",
  "props": {"children":[]},
}
```

createElement("div", null, a)

```jsx
{
  "type": "div",
  "props": { "children": [a] }
}
```

createElement("div", null, a, b)

```jsx
{
  "type": "div",
  "props": { "children": [a, b] }
}
```

다시 아래 코드를 살펴보자.

```jsx
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}
```

children 배열에는 문자열, 숫자같은 기본 값도 포함될 수 있다. children이 원시값일 때 처리하는 wrap함수를 만든다. React에서는 빈 children에 원시값이나 빈 배열을 할당하지는 않는다.

```jsx
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => (typeof child === 'object' ? child : createTextElement(child))),
    },
  };
}
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
```

아직 React의 createElement이므로 이를 대체하기 위해 라이브러리에 이름을 지정해본다.

```jsx
// const element = React.createElement(
//   "div",
//   { id: "foo" },
//   React.createElement("a", null, "bar"),
//   React.createElement("b")
// )

const Didact = {
  createElement,
}
​
const element = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
)
```

우리는 여기서 Didact라고 부를것이고 또, JSX를 사용하고 싶다. 어떻게 babel에게 React의 createElement 대신 우리의 Didact를 사용하라고 할 수 있을까?

```jsx
// const element = Didact.createElement(
//   "div",
//   { id: "foo" },
//   Didact.createElement("a", null, "bar"),
//   Didact.createElement("b")
// )

/** @jsx Didact.createElement */
const element = (
  <div id='foo'>
    <a>bar</a>
    <b />
  </div>
);
```

위와 같은 주석으로 babel은 JSX를 변환할 때 우리가 정의한 함수를 사용할 것 이다.

## 2. render

ReactDOM.render 함수를 만들어보자
우선, 업데이트와 삭제는 추후에 처리하기로하고 DOM에 항목을 추가하는 것에만 집중해보자.

```jsx
// ReactDOM.render(element, container) 가 아래로 대체된다.

function render(element, container) {
  // TODO create dom nodes
}
​
const Didact = {
  createElement,
  render,
}
​
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
const container = document.getElementById("root")
Didact.render(element, container)

```
