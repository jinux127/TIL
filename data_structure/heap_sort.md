# 힙 정렬
병합 정렬과 퀵 정렬만큼 빠른 정렬 알고리즘

힙 정렬은 힙 트리 구조를 이용하는 정렬 방법

## 힙
힙을 알기 전 이진 트리를 학습해야 한다.

> 이진트리: 모든 노드의 자식 노드가 2개 이하인 노드

> 완전 이진 트리: 데이터가 루트 노드부터 자식 노드가 왼 쪽 자식 노드 부터 오른쪽 까지 차례로 들어가는 구조의 이진 트리

> 힙: 최솟값이나 최댓값을 바르게 찾아내기 위해 완전 이진 트리를 기반으로 하는 트리

힙에는 최대 힙, 최소 힙이 존재한다. 최대 힙은 부모 노드가 자식 노드보다 큰 힙이다. 힙정렬을 하기 위해선 정해진 데이터를 힙 구조를 가지도록 만들어야 한다.

최대 힙은 부모 노드의 값이 자식 노드보다 커야 한다.

트리 안에서 그 구조가 보장 되지 않으므로 힙 생성 알고리즘을 사용해야 한다. 힙 생성 알고리즘은 특정한 '하나의 노드'에 대해서 수행하는 것이다. 또한 해당 '하나의 노드를 제외하고는 최대 힙이 구성되어 있는 상태'라고 가정을 한다는 특징이 있다.

힙 생성 알고리즘은 특정한 노드의 두 자식 중에서 더 큰 자식과 자신의 위치를 바꾸는 알고리즘이다.

# 예제

> 다음의 데이터를 오름차순 정렬
 - 7 5 6 8 3 5 9 1 6

기본적으로 완전 이진 트리를 표현하는 가장 쉬운 방법은 배열에 그대로 삽입하는 것이다.

모든 원소를 기준으로 힙 생성 알고리즘을 적용해서 전체 트리를 힙 구조를 만들면 된다.

전체 트리를 힙 구조로 만드는 복잡도는 O(N* logN) 이다.
```jsx
const str =('7 5 6 8 3 5 9 1 6');
const arr = str.split(' ').map(Number);

const swap = (arr, i, j) =>{
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    return arr;
}

const heapify = (arr, lastIdx) =>{
    let last = parseInt(lastIdx/2)-1;
    while(last >= 0){
        const left = last*2+1;
        const right = last*2+2;

        if(arr[left] >= arr[right] && arr[last] < arr[left]){
            arr = swap(arr,last,left);
        } else if(arr[left] < arr[right] && arr[last] < arr[right]){
            arr = swap(arr,last,right);
        }
        last--;
    }
    return arr;
}
const heapSort = (arr) =>{
    for(let i=arr.length-1; i>=0; i--){
        arr = heapify(arr,i);
        if(arr[0] > arr[i]){
            arr = swap(arr,i, 0);
        }
    }
    return arr;
}

console.log(heapSort(arr));

```

# 특징
힙 정렬은 병합 정렬과 다르게 별도로 추가적인 배열이 필요하지 않다는 점에서 메모리 측면에서 몹시 효율적이다. 또한, 항상O(N*logN)을 보장할 수 있다는 점에 몹시 강력한 정렬 알고리즘이다.

하지만 단순히 속도만 가지고 비교하면 퀵 정렬이 평균적으로 더 빠르다~

# 보충 자료
힙 생성 함수는 특정한 노드를 기준으로 위쪽으로 올라가는 상향식 구현 방식과 아래쪽으로 내려가는 하향식 구현 방식이 있다. 두 방식 모두 시간복잡도는 동일하다.