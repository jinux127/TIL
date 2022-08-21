# 서론

- useCallback: 메모이제이션된 콜백을 반환한다.
- useMemo: 메모이제이션된 값을 반환한다.

두가지 훅 모두 공통적인 속성은 메모이제이션과 의존성이다. 메모이제이션이란 메모리에 어떤 연산을 통해 반환된 값을 저장해 놓았다가 나중에 다시 사용하는 개념이고, 두 가지 훅 모두 배열 형태의 의존성을 가져 그 값이 변하면 함수와, 값을 반환하는 것이다.

```javascript
useCallback(fn, deps);

useMemo(() => fn, deps);
```

위의 두 코드는 동일한 동작을 수행한다. 그렇다면 언제 각각의 훅을 사용해야 할까?

## 다르지만 같아요 (동치비교)

동치비교란 ==는 성립하지만 ===는 성립하지 않는 것을 말한다. 즉, 참조하는 메모리가 다른 경우를 의미한다.

컴포넌트가 리렌더링할 때마다 새로운 함수가 매번 생성하는데 겉으로 보기에 값은 같지만 그 값이 참조하는 메모리가 달라서 === 비교는 false가 나오기 때문에 계속 리렌더링을 하는 경우가 발생한다. 두 훅은 이런 일을 방지하는 역할을 하는 것이다.

```javascript
const fetchUser = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const newUser = await res.json();
  setUser(newUser); // 🔴 setState triggers re-render
};

useEffect(() => {
  fetchUser();
}, [fetchUser]); // fetchUser is a new function on every render
```

```javascript
const fetchUser = useCallback(async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const newUser = await res.json();
  setUser(newUser);
}, [userId]);

useEffect(() => {
  fetchUser();
}, [fetchUser]); // ✅ fetchUser stays the same between renders
```

## Reference

https://medium.com/@jan.hesters/usecallback-vs-usememo-c23ad1dc60
