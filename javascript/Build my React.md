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

​// 우리의 라이브러리 Didact
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

요소 유형을 사용하여 DOM노드를 생성하는 것으로 시작한다음 컨테이너에 새 노드를 추가합니다.

```jsx
function render(element, container) {
  const dom = document.createElement(element.type);

  container.appendChild(dom);
}
```

각 children에 대해 재귀적으로 동일한 작업을 수행합니다.

```jsx
function render(element, container) {
  const dom = document.createElement(element.type);
  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
}
```

또한 요소 유형이 TEXT_ELEMENT인 경우 일반 노드 대신 텍스트 노드를 생성하므로 이를 처리해야 합니다.

```jsx
function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);
  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
}
```

이제 마지막으로 해야할 일은 노드에 props 요소를 할당하는 것입니다.

```jsx
function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);
  const isProperty = (key) => key !== 'children';

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
}
```

끝!!

### 지금까지의 코드

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

function render(element, container) {
  const dom = element.type == 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);
  const isProperty = (key) => key !== 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });
  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
}

const Didact = {
  createElement,
  render,
};

/** @jsx Didact.createElement */
const element = (
  <div style='background: salmon'>
    <h1>Hello World</h1>
    <h2 style='text-align:right'>from Didact</h2>
  </div>
);
const container = document.getElementById('root');
Didact.render(element, container);
```

## 3. Concurrent Mode

시작하기에 앞서 리팩터링이 필요하다. 우선 앞선 코드에서 자식을 재귀적으로 만드는 호출에서 문제가 있다. 이는 렌더링을 시작하면 시작한 요소 트리를 렌더링할 떄까지 멈추지 않을 것이기 때문이다. 만약 그 요소 트리가 크다면 메인 스레드를 오래 차단할 것 이다.

따라서 작업을 작은 단위로 나누고 각 단위를 마친 후 수행해야 할 다른 작업이 있다면 브라우저가 렌더링을 중단하도록 한다.

```jsx
let nextUnitOfWork = null
​
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
​
requestIdleCallback(workLoop)
​
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}
```

우리는 requestIdleCallback으로 루프를 만들건데 requestIdleCallback은 브라우저가 쓰레드에 작업이 없을 때 실행시키도록 하는 함수이다. 실제 React는 이를 더 이상 사용하지 않고 스제줄러를 사용하지만 우리는 대체해서 사용하기로 하자.

또한, requestIdleCallback은 deadline 파라미터를 제공한다. 이를 통해 브라우저가 제어권을 가져갈떄까지 얼마나 남았는지 알 수 있다.

앞으로 이 루프를 완성시킬 것이다. performUnitOfWork라는 다음 작업 단위를 리턴하는 함수를 완성해 나갈 것이다.

## 4.fibers

이 실행 단위를 관리하기 위한 자료구조가 fiber이다. elemnent 마다 fiber를 가지게 되고, 이 fiber가 하나의 실행 단위이다.

다음과 같은 html이 있다고 가정해보자.

```jsx
Didact.render(
  <div>
    <h1>
      <p />
      <a />
    </h1>
    <h2 />
  </div>,
  container
);
```

![fiber](/img/BuildMyReact_Fiber.png)

render 함수는 root fiber를 만들고 첫 nextUnitOfWork로 설정할 것이다. 이후 작업들은 performUnitOfWork에서 실행될 것이고 다음과 같다.

1. DOM에 element를 추가한다.
2. element의 자식들에 대한 fiber을 생성한다.
3. 다음 실행를 단위 설정한다.

이 자료구조의 핵심은 다음 실행 단위를 쉽게 찾기 위함이다. 그래서, fiber들은 first child, sibling, parent와 링크를 가지고 있습니다.

fiber에 대한 작업 수행을 마치면 다음 실행할 child fiber가 다음 작업 단위가 된다.

위의 예제에서 fiber 작업을 마치면 div 다음 작업단위는 h1 fiber가 된다.

child fiber가 없으면 sibling이 사용된다.

예를 들어 p fiber에는 child fiber가 없으므로 완성 후 해당 p fiber의 child 인 a로 이동한다.

child인 a에서도 child fiber가 없으면 parent의 sibling(삼촌)으로 이동한다.

이를 parent가 없는 루트에 도달할 때까지 반복하고 루트에 도달한다면 .parentsiblingrender가 완료했음을 의미한다.

> 정리

1. 먼저 자식이 있다면, 다음 실행 단위가 된다.
2. 자식이 없다면 형제가 다음 실행 단위가 된다.
3. 둘 다 없다면 '삼촌'이 실행 단위가 된다. 즉 형제의 부모를 말한다.

이제 코드를 넣어보자

먼저 render 함수에서 dom 만드는 부분을 따로 함수화 한다.

````jsx
function render(element, container) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)
​
  const isProperty = key => key !== "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
​
  element.props.children.forEach(child =>
    render(child, dom)
  )
​
  container.appendChild(dom)
}
​```

```jsx
function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type)
​
  const isProperty = key => key !== "children"
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    })
​
  return dom
}
​
function render(element, container) {
  // TODO set next unit of work
}
````

DOM 노드를 생성하는 부분은 자체 함수에 보관하고 나중에 사용할 것이다.

이제 render 함수에서 우리 nextUnitOfWork는 root의 fiber tree 로 설정한다.

```jsx
function render(element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  }
}
​
let nextUnitOfWork = null
```

이제 다음 브라우저가 준비되면 이 트리를 호출하고 workLoop 루트에서 작업을 시작한다.

```jsx
let nextUnitOfWork = null
​
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
​
requestIdleCallback(workLoop)
​
function performUnitOfWork(fiber) {
  // TODO add dom node
  // TODO create new fibers
  // TODO return next unit of work
}
```

먼저 새 노드를 만들고 DOM에 추가한다.

자식들에 대해 fiber를 생성한다. 첫 자녀는 자녀로 연결하고, 나머지들은 서로 형제로 연결한다.

```jsx
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
​
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }
  // TODO create new fibers
  // TODO return next unit of work
}
```

그런 다음 각 child 에 대해 새로운 fiber를 만든다

```jsx
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
​
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null
​
  while (index < elements.length) {
    const element = elements[index]
​
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }
  }
  // TODO return next unit of work
}

```

그리고 우리는 그것을 fiber tree에 추가하여 그것이 첫 번째 자식인지 판별해 child 또는 sibling로 설정한다.

```jsx
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
​
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }

  const elements = fiber.props.children
  let index = 0
  let prevSibling = null
​
  while (index < elements.length) {
    const element = elements[index]
​
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }
  }
  if (index === 0) {
      fiber.child = newFiber
  } else {
    prevSibling.sibling = newFiber
  }
​
  prevSibling = newFiber
  index++
  // TODO return next unit of work
}

```

마지막으로 다음 작업 단위를 찾는다. 먼저 child, sibling, parent-sibling 순으로 시도

```jsx
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
​
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }

  const elements = fiber.props.children
  let index = 0
  let prevSibling = null
​
  while (index < elements.length) {
    const element = elements[index]
​
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }
  }
  if (index === 0) {
      fiber.child = newFiber
  } else {
    prevSibling.sibling = newFiber
  }
​
  prevSibling = newFiber
  index++

  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}
```
