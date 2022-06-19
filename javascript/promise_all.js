// Promise.all

var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 2000);
});

Promise.all([p1, p2, p3]).then((values) => {
  console.log(values); // [3, 1337, "foo"]
});

var p = Promise.all([]); // 즉시 이행함
var p2 = Promise.all([1337, 'hi']); // 프로미스가 아닌 값은 무시하지만 비동기적으로 실행됨
console.log(p);
console.log(p2);
setTimeout(function () {
  console.log('the stack is now empty');
  console.log(p2);
});

// 출력
// Promise { <state>: "fulfilled", <value>: Array[0] }
// Promise { <state>: "pending" }
// the stack is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }

var p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('p1_지연_이행'), 1000);
});

var p2 = new Promise((resolve, reject) => {
  reject(new Error('p2_즉시_거부'));
});

Promise.all([
  p1.catch((error) => {
    return error;
  }),
  p2.catch((error) => {
    return error;
  }),
]).then((values) => {
  console.log(values[0]); // "p1_지연_이행"
  console.log(values[1]); // "Error: p2_즉시_거부"
});
