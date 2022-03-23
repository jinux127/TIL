# 순열과 조합

## 순열
주어진 수열에서 순서에 따라 결과가 달라지는 방식.

즉, 순서가 존재하는 열이라는 뜻이다.

- 예) (1,2,3) 과 (1,3,2) 는 다른  값이다.



```jsx
// 순열

const arr = [1,2,3,4,5];
const MAX = arr.length;
const visited = new Array(MAX).fill(false);
const vector = [];
const result = [];

const dfs = (cnt) =>{
    let str ="";
    if(cnt === 3){
        for(let i=0; i<vector.length; i++){
            str += vector[i] + " ";
        }
        result.push(str.trim());
        return;
    }

    for(let i=0; i<MAX; i++){
        if(visited[i]) continue;
        visited[i] = true;
        vector.push(arr[i]);
        dfs(cnt+1);
        vector.pop();
        visited[i] = false;
    }

}

dfs(0);
console.log(result.join('\n'));
```

## 조합
조합은 순서가 상관이 없는 모임을 뜻한다.

- 예) (1,2,3) 과 (1,3,2) 는 같은 값이다.

```jsx
// 조합

const arr = [1,2,3,4,5];
const MAX = arr.length;
const visited = new Array(MAX).fill(false);
const result = [];

const dfs = (idx, cnt) =>{
    let str = "";
    if(cnt ===3){
        for(let i=0; i<MAX; i++){
            if(visited[i] === true){
                str += arr[i] + " ";
            }
        }
        result.push(str.trim());
        return;
    }

    for(let i= idx; i<MAX; i++){
        if(visited[i] === true) continue;
        visited[i] = true;

        dfs(i, cnt+1);
        visited[i] = false;
    }
}

dfs(0,0);
console.log(result);
```