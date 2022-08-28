// 정렬된 값으로 이진탐색해야함.
const binarySearch = (list, target) => {
  let mid = 0;
  let left = 0;
  let right = list.length - 1;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (list[mid] === target) return mid;

    list[mid] > target ? (right = mid - 1) : (left = mid + 1);
  }
  return -1;
};

const test = [1, 4, 3, 6, 5, 7, 8, 9];

test.sort((a, b) => a - b);

const result = binarySearch(test, 7);

console.log(result);
