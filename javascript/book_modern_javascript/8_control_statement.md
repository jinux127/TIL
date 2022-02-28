# 8. 제어문

### 8.4 break 문

break문은 레이블 문, 반복문 or 스위치 문의 코드 블록을 탈출한다. 이 외에 break문을 사용하면 SysntaxError가 발생한다.

레이블 문이란 식별자가 붙은 문을 말한다.

```jsx
foo: console.log('foo');
```

```jsx
outer: for(var i=0; i<3; i++){
	for(var j=0; j<3; j++){
		if(i+j) === 3) break outer;
			console.log(`inner[${i}, ${j}]`);
	}
}

```

레이블 문은 중첩된 for 문 외부로 탈출할 때 유용하지만 그 밖의 경우에는 일반적으로 권장하지 않는다. 프로그램의 흐름이 복잡해져서 가독성이 나빠지고 오류를 발생시킬 가능성이 높아지기 때문이다.