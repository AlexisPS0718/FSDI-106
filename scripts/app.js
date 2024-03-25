function sayHello(firstName, lastName) {
  console.log('Hello, ' + firstName + ' ' + lastName);
}

function sum(num1, num2) {
  const result = num1 + num2;

  return result;
}

function init() {
  console.log('Hello, World');

  const firstName = 'Alexis'
  sayHello(firstName, 'Peñuñuri');

  const result = sum(10, 20);
  console.log(result);
}

window.onload = init;