const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('Welcome Pratyush');
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Demo Server</title></head>');
    
    switch(req.url){
        case '/home': res.write('<h1>Welcome to Home</h1>');
        break;
        case '/about': res.write('<h1>Welcome to About Us page</h1>');
        break;
        case '/node': res.write('<h1>Welcome to my NodeJS project</h1>');
        break;
        default: res.write('<h1>Welcome Pratyush</h1>');
    }
    res.end();
})

server.listen(4000);
