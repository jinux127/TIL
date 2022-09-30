function Person() {}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;

let kim = new Person();
let park = new Person();

console.log(kim.eyes);
console.log(kim.nose);
