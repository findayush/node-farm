const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemp = require('./modules/replaceTemplate')
// FILES

//Blocking, Synchronous Way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn)
// const textOut= `This is read : ${textIn}\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('File written')

//Non-blocking, Asynchronous Way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data)=>{
//     console.log(data);

//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2)=>{
//         console.log(data2);

//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8', err=>{
//                 console.log('file written')
//             })
//         })
//     })

// })
// console.log('File is read')

// SERVER


const tempOverview= fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard= fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct= fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data= fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data)
const server = http.createServer((req, res)=>{

    const {query, pathname:path} = url.parse(req.url, true)
    const baseURL = 'http://' + req.headers.host + '/';
    const reqUrl = new URL(req.url,baseURL);
    //overview page
    if(path === '/' || path === '/overview'){

        const cardsHtml = dataObj.map(el => replaceTemp(tempCard, el)).join('')
        const op= tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        res.writeHead(200, {
            'Content-type':'text/html',
        })
        res.end(op)
    }

    //product page
    else if(path === '/product'){

        const product= dataObj[query.id];
        res.writeHead(200, {'Content-type':'text/html'})
        const output = replaceTemp(tempProduct, product)
        res.end(output)

    //API
    }else if (path === '/api'){
        res.end(data)

    //NOT FOUND
    }else{
        res.writeHead(404, {
            'Content-type':'text/html',
            'my-header': 'abc'
        })
        res.end('<h1>Page Not Found</h1>')
    }
})

server.listen(4949, '127.0.0.1', ()=>{
    console.log("Listing to req on port 4949")
})


// const ser= http.createServer((req, res)=>{
//     res.end("data is here")
// })

// ser.listen(2000, '127.0.0.1', ()=>{
//     console.log("listing 2nd server on 2000")
// })