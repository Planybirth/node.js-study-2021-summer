setImmediate(() => {
    console.log('즉시');
});

process.nextTick(() => {
    console.log('nextTick');
});

setTimeout(() => {
    console.log('타임 아웃');
}, 1000);

Promise.resolve()
    .then(() => console.log('promise'));