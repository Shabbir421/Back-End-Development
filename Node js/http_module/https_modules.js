const http = require('http');
const server=http.createServer(function (req, res) {
  res.end("hello world!");
})
server.listen(3000);

// npm - node package manager 
// node js core me jo install aata h wo module kahlata hai 
// npm se download ko package kahte hai 

// installing and uninstalling
// npm install packagename
// -> npm install perticular package = npm install packagename@package_version
// uninstalling -> npm uninstall packagename

// dependencies- packages and packages ki dependency
// devdependencies - aise package jo sirf development me kaam aayenge par jab app ban jayega and deploy ho jayega tab ham in package ko use nahi karenge 

