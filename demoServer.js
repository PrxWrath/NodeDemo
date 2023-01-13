const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('Welcome Pratyush');
})

server.listen(4000);
