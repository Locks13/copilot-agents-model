// Exemplo: bloqueio do event loop com cálculo sincrono
console.log('start (blocking example)');

setTimeout(() => console.log('timeout fired (should be delayed)'), 0);

function fib(n) {
  if (n < 2) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}

console.log('about to run fib(45) - this will block the event loop');
const result = fib(45);
console.log('fib(45) =', result);

Promise.resolve().then(() => console.log('promise microtask (runs after sync)'));

console.log('end (blocking example)');

// Expected order:
// start
// about to run fib(45) - this will block the event loop
// fib(45) = ...
// end (blocking example)
// promise microtask (runs after sync)
// timeout fired (should be delayed)
