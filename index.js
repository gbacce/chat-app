
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

var server = http.createServer((req,res)=>{
	console.log("Someone connected via HTTP!");
	fs.readFile('index.html', 'utf-8',(error,data)=>{
		// console.log(error);
		// console.log(data);
		if(error){
			res.writeHead(500,{'content-type':'text/html'});
			res.end('Internal Server Error');
		} else{
			res.writeHead(200,{'content-type':'text/html'});
			res.end(data);
		}
	})
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


});

server.listen(8080);
console.log("Listening on port 8080");






