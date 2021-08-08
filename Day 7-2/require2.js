console.log('require가 가장 위에 올 필요가 없습니다.');

module.exports = '저를 찾아보세요';

require('./var2');

console.log('require.cache입니다.');
console.log(require.cache);
console.log('require.main입니다.');
console.log(require.main === module);
console.log(require.main.filename);