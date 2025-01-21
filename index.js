const http = require("http");
const getBodyData = require('./util')
const {v4} = require('uuid')
const books = [
  {
    id: "1",
    title: "Book 1",
    page: 120,
    auther: "Writer",
  },
];
const server = http.createServer(async (req, res) => {
  /// Get all books
  if (req.url === "/books" && req.method === "GET") {
    res.writeHead(200, {
        "Content-Type": "application/json charset=utf8",
      });
    const resp = {
      status: "OK",
      books,
    };
    res.end(JSON.stringify(resp));
  }
  else if(req.url === '/books' && req.method === 'POST'){
    
    const  data = await  getBodyData(req)
    const {title,page,auther} =  JSON.parse(data)
    const newBook = {
        id:v4(),
        title,
        page,
        auther
    }

    books.push(newBook)
    const resp ={
        status:'Create',
        book:newBook
    }
    res.writeHead(200, {
        "Content-Type": "application/json charset=utf8",
      });
    res.end(JSON.stringify(resp))
    
  }
  else if(req.url.match(/\/books\/\w+/)  && req.method === "GET"){
    const id = req.url.split('/')[2]
    const book = books.find(b => b.id == id)
    res.writeHead(200, {
        "Content-Type": "application/json charset=utf8",
      });
      const resp = {
        status: 'OK',
        book
      }
      res.end(JSON.stringify(resp))
  }
  else if(req.url.match(/\/books\/\w+/)  && req.method === "PUT"){
    const id = req.url.split('/')[2]
    const  data = await  getBodyData(req)
    const {title,page,auther} =  JSON.parse(data)
    const inx = books.findIndex(b => b.id === id)
    const changeBooks = {
        id: books[inx].id,
        title:title || books[inx].title,
        page:page || books[inx].page,
        auther:auther || books[inx].auther
    }
    books[inx] == changeBooks
    res.writeHead(200, {
        "Content-Type": "application/json charset=utf8",
      });
      const resp = {
        status: 'OK',
        changeBooks
      }
      res.end(JSON.stringify(resp))
  }
});

server.listen(3000, () => console.log("Server running on port: 3000"));
