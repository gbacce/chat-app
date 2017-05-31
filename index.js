
/////// All the code necessary to create a server ///////

// var http = require("http");
// var fs = require("fs");

// var server = http.createServer((req,res)=>{
// 	console.log("Someone connected via HTTP!");
// 	fs.readFile('index.html', 'utf-8',(error,data)=>{
// 		if(error){
// 			res.writeHead(500,{'content-type':'text/html'});
// 			res.end('Internal Server Error');
// 		}else{
// 			res.writeHead(200,{'content-type':'text/html'});
// 			res.end(data);
// 		}
// 	})
// });

// server.listen(8080);
// console.log("Listening on port 8080");

/////////////////////////////////////////////////////////


var http = require("http");
var fs = require("fs");

// Include socket.io, which was installed by npm. It is not part of core.
var socketio = require("socket.io");

var usersArray = [];

var server = http.createServer((req,res)=>{
	console.log("Someone connected via HTTP!");

	if(req.url == '/'){
		fs.readFile('index.html', 'utf-8',(error,data)=>{
			if(error){
				res.writeHead(500,{'content-type':'text/html'});
				res.end('Internal Server Error');
			} else{
				res.writeHead(200,{'content-type':'text/html'});
				res.end(data);
			}
		});

	} else if(req.url == '/styles.css'){
		fs.readFile('styles.css', 'utf-8',(error,data)=>{
			if(error) {
				res.writeHead(500,{'content-type':'text/html'});
				res.end('Internal Server Error');
			} else{
				res.writeHead(200,{'content-type':'text/css'});
				res.end(data);
			}			
		});
	} else if(req.url == '/config.js'){
		fs.readFile('config.js', 'utf-8',(error,data)=>{
			if(error) {
				res.writeHead(500,{'content-type':'text/html'});
				res.end('Internal Server Error');
			} else{
				res.writeHead(200,{'content-type':'application/javascript'});
				res.end(data);
			}			
		});
	} else{
		
	}
});

var io = socketio.listen(server);

// Handle socket connections...
io.sockets.on('connect',(socket)=>{
	console.log("Someone connected via socket!");


	// Event Listener //
	socket.on('nameToServer',(name)=>{
		console.log(name + " just joined.");
		io.sockets.emit('newUser',name);
		
	});

	socket.on('sendMessage',()=>{
		console.log("Someone clicked on the big blue button.");
	});

	socket.on('messageToServer',(messageObj)=>{
		io.sockets.emit('messageToClient', `<span>${messageObj.name}</span> &nbsp ${messageObj.newMessage}`);
	});

	socket.on('disconnect',(data)=>{
		
	})




});

server.listen(8080);
console.log("Listening on port 8080");





