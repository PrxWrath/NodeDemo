const fs = require('fs');
const path = require('path');

const reqHandler = (req, res) => {
    let url = req.url;
    let method = req.method;
    console.log('Welcome Pratyush');

    if(url === '/'){
        fs.readFile('response.txt','utf8', (err,data)=>{
            res.write('<html>');
            res.write('<head><title>Demo Server</title></head>');
            res.write('<h1>Enter a message</h1>')
            res.write(`<strong>${data}</strong>`);
            res.write(`<body><form action="/message" method="POST">
                        <input type="text" name="message"/>
                        <button>Send</button>
                    </form></body>`); 
            res.write('</html>');
            if(err){
                console.log(err);   
            }
            return res.end();
        });
    }
    
    else if(url === '/message' && method==='POST'){
        let body = []
        req.on('data', (chunk)=>{
            body.push(chunk);
        })
        req.on('end', ()=>{
            let parsed = Buffer.concat(body).toString().split('=')[1];
            fs.writeFile('response.txt', parsed, (err)=>{
                if(err) console.log(err);
            });
        })
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    else{
        res.setHeader('Content-Type', 'text/html');
        return res.end();
    }
}

module.exports = reqHandler; 