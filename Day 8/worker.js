const { 
    Worker, isMainThread, parentPort,
  } = require('worker_threads'); 
  
  if (isMainThread) { // 부모일 때 
    const worker = new Worker(__filename); 
    worker.on('message', message => console.log('네 ', message)); 
    worker.on('exit', () => console.log('worker exit')); 
    worker.postMessage('마리오'); 
  } else { // 워커일 때 
    parentPort.on('message', (value) => { 
      console.log(value, "가서 일 좀 해"); 
      parentPort.postMessage('팀장님'); 
      parentPort.close(); 
    }); 
  }