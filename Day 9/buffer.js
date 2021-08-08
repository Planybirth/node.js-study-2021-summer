const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
console.log('from() : ', buffer);
console.log('길이 : ', buffer.length);
console.log('toString() : ',buffer.toString());

const arr = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffer2 = Buffer.concat(arr);

const buffer3 = Buffer.alloc(5);
console.log('alloc() : ', buffer3);