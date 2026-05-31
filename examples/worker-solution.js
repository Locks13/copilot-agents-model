// Exemplo: usar worker_threads para evitar bloquear o event loop (ESM)
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

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

if (isMainThread) {
  console.log('start (worker solution)');

  setTimeout(() => console.log('timeout fired (not delayed)'), 0);

  const worker = new Worker(new URL(import.meta.url), { workerData: 45 });
  worker.on('message', (res) => console.log('worker result', res));
  worker.on('error', (err) => console.error('worker error', err));
  worker.on('exit', (code) => console.log('worker exit', code));

  Promise.resolve().then(() => console.log('promise microtask (runs after sync)'));

  console.log('end (worker solution)');

} else {
  // worker thread: compute fib and send result
  const n = workerData;
  const res = fib(n);
  parentPort.postMessage(res);
}
