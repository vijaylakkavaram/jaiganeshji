var express = require('express');
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')();
var uuid = require('node-uuid');
var Q = require('q');
var _ = require("underscore")
var dbFunctions = require('./dbStore/dbFunctions');
var config = require('./config');
var mail = require('./mail');	//Configure mail.js and un-comment the mail code
var btoa = require('btoa');		//Password is btoa hashed 
var c = 0;
var a = 0;
var bodyParser = require('body-parser');
var admins = {};
var users = {};
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');
var connectionsLimit = 6
var result = "";
var result1="";
var fs = require('fs');
const os = require('os');
var io1 = os.networkInterfaces();
app.enable('trust proxy');
app.get('trust proxy');
var datetime;
var colors = require('colors');
var Admin_Login_Ip;
var result_ip;
var result_ipp=[];
var r_result;
var rr_result=[];
var result1 = [];
var Usr_Id;
var Admin_Login_Port = config.web_port;  //port
var resulta;
var resultaa = [];
var callback;
var c_resultip;
 var p_resultip;
var admin_id;
var ssn=1;
var result2=" ";
var config1 = {
	userName: 'datapullman',
	password: 'system',
	server: 'localhost',
	options: {
		encrypt: false, /*If you are connecting to a Microsoft Azure SQL database, you will need this*/
		database: 'Live_Chat1'
	}
}

var connection = new Connection(config1);
dbFunctions.ConnectToRedis(startApp);

connection.on('connect', function (err) {
	if (err) {
		console.log(err);

	}
	else {
		console.log("Connected".green);

	}

});

app.get('/Registration', function (req, res) {
	res.sendFile(__dirname + '/views/Reg.html');
	console.log("Registration page Displayed");



});
app.get('/ping', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', config.parentDomain);
	res.send("OK");
});

app.get(config.admin_url, function (req, res) {
	res.sendFile(__dirname + '/views/admin.html');
	console.log('here at config');
	var path = __dirname + '/views/admin.html';

	var ip1 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	Admin_Login_Ip	 = ip1.split("::");


});
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/client.html');
/* 	var ip2=req.ip;
	console.log('ip2',ip2); */

	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	 
	result_ipp = ip.split("::::ffff:");
	console.log('result_ip', result_ipp[0]);
	

	//  result_ip = ip.split("::");
	/*   console.log("resultip,c_resultip",result_ip,c_resultip);
	  console.log('ips',ip2); */
	setTimeout(function () {
		 console.log('c_resultip',c_resultip);
 
				if(c_resultip!=result_ipp[0]){
					
					New_Ticket_Creation(result_ip,config.web_port,ssn,datetime)

				}
				else if(c_resultip==result_ipp[0])
				{
					console.log("ticket already created for this user dont create the ticket agin");

				}
 
   }, 200);
 

					
   result="";
   result1="";



});


//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/adminURL', function (req, res) {
	//res.send('You sent the name "' + req.body.name + '".');
	//res.send('Your first name is "'+req.body.firstname+'".');
	res.sendFile(__dirname + '/views/admin.html');
Insert(req.body.firstname, req.body.lastname, req.body.username, req.body.password, req.body.gender, req.body.email, req.body.address, req.body.phonenumber);

function Insert(firstname, lastname, username, password, gender, email, address, phonenumber, callback) {


	request = new Request('Get_Admin_Registration', function (err) {
		if (err) {

 			console.log(err);
		}
		else{
		 res.send();
			console.log("successfully registered");
		}
	}
	);
	request.addParameter('F_Name', TYPES.VarChar, firstname);
	request.addParameter('L_Name', TYPES.VarChar, lastname);
	request.addParameter('Admin_Name', TYPES.VarChar, username);
	request.addParameter('Pass_Word', TYPES.VarChar, password);
	request.addParameter('Gender', TYPES.VarChar, gender);
	request.addParameter('Email', TYPES.VarChar, email);
	request.addParameter('Address1', TYPES.VarChar, address);
	request.addParameter('Ph_No', TYPES.VarChar, phonenumber);

	// Check how many rows were inserted
	request.on('doneInProc', function (rowCount, more) {
		console.log(rowCount + ' row(s) inserted');
		console.log("Inserting into Table for Registration...");

	});
	request.on('row', function (columns) {
		columns.forEach(function (column) {
			if (column.value === null) {
				console.log('NULL');
			} else {
				
				r_result += column.value + " ";
			}
		});

		console.log('ticket creation data', result);
	
		rr_result = r_result.split(" ", 3);
		console.log('rr_Result', rr_result);
	 
 	});

	connection.callProcedure(request);

}

 
});
//app.use(express.bodyParser());
function New_Ticket_Creation(Usr_Ip, Usr_Port, ssn) {
	console.log("Executing The New_Ticket_Creation");
	request = new Request('New_Ticket_Creation', function (err) {
		if (err) {
			console.log(err);
			var rr = err['message'];
			console.log("rr", rr);
			if (rr != null) {
				console.log('testing rr', rr);
			}

		}
		else {

			console.log('ticket created successfully');
		}

	});
	request.on('row', function (columns) {
		columns.forEach(function (column) {
			if (column.value === null) {
				console.log('NULL');
			} else {
				result += column.value + " ";
			}
		});

		console.log('ticket creation data', result);
	
		result1 = result.split(" ", 3);
p_resultip=result.split(" ",14);
console.log("p_resultip",p_resultip);
c_resultip=p_resultip[13];
console.log("c_resultip",c_resultip);
console.log('result[1]', result1[1]);
Usr_Id="";
Usr_Id=result1[1];
console.log('Usr_Id',Usr_Id);
	});
	request.addParameter('Usr_IP_Address', TYPES.VarChar, result_ipp[0]);
	request.addParameter('Usr_Port_Id', TYPES.VarChar, Usr_Port);
	request.addParameter('Session_Id', TYPES.VarChar, ssn);
	request.addParameter('Con_Start_Time', TYPES.DateTime, new Date());
	// Check how many rows were inserted
	request.on('doneInProc', function (rowCount, more) {
		console.log(rowCount + ' row(s) inserted');
	});
	connection.callProcedure(request);
} 
function Get_ticket_color() {
	console.log("Inserting into Table...");
	request = new Request("New_Get_Ticket_color", function (err) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('no errors for get ticket color');
		}
	}
	);


	request.on('row', function (columns) {
		columns.forEach(function (column) {
			if (column.value === null) {
				console.log('NULL');
			} else {
				result2 += column.value + " ";
			}
		});

		console.log('result data', result2);

	});


	connection.execSql(request);
}
function New_Ticket_Assignment(Usr_Id) {
	console.log("Executing The New_ticket_Assignement for usr_Id", );
var 	request1 = new Request('New_Ticket_Assignment', function (err) {
		if (err) {
			console.log(err);
			var rr = err['message'];
			admin_id=rr;
			
			console.log("rr", rr);
			if (rr != null) {
				console.log('testing rr', rr);

			}

		}
		else {
			console.log('ticket assigned successfully');
		}

	});
	request1.on('row', function (columns) {
		columns.forEach(function (column) {
			if (column.value === null) {
				console.log('NULL');
			} else {
				resulta += column.value + " ";
			}
		});

		console.log('result data', resulta);
		resultaa=" ";
		resultaa = resulta.split(" ", 20);
		console.log('main admin name', resultaa[19]);
		admin_id=" ";
		admin_id = resultaa[19];
		console.log('main result', admin_id);

	});



	request1.addParameter('Usr_Id', TYPES.Int, result1[1]);
	// Check how many rows were inserted
	request1.on('doneInProc', function (rowCount, more) {
		console.log(rowCount + ' row(s) inserted');
	});
	connection.callProcedure(request1);
}  




app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {





	//Login Admin
	socket.on('login', function (data) {
		var a = data['admin'];
		var b = data['password'];

		console.log("Username and Password is ", a, b);
		console.log("admin name: " + data.admin + " password:" + data.password);
		//	console.log('admin login test ip',Admin_Login_Ip[1]);
		//	var ip2=Admin_Login_Ip[1];
		console.log('ip', Admin_Login_Ip);
		Admin_Login(a, b, Admin_Login_Ip, Admin_Login_Port);


		function Admin_Login(a, b, ip2, Admin_Login_Port) {
			console.log("Inserting into Table for Login");
			request = new Request('Let_Admin_Login', function (err) {
				if (err) {
					console.log(err);
					var rr = err['message'];
					console.log("rr", rr);
					if (rr != null) {
						console.log('testing rr', rr);
						//	if (admins[data.admin])
						socket.emit('login', {
							login: false,
							err: rr
						})
					}
					else {
						socket.emit('login', {
							login: false,
							err: "Invalid Login"
						})


					}

				}
				else {
					//if (admins[data.admin])
					socket.emit('login', {
						login: true
					});
				}

			});
			request.addParameter('Admin_Name', TYPES.VarChar, a);
			request.addParameter('Pass_Word', TYPES.VarChar, b);
			request.addParameter('Admin_Login_Ip', TYPES.VarChar, ip2);
			request.addParameter('Admin_Login_Port', TYPES.VarChar, Admin_Login_Port);
			// Check how many rows were inserted
			request.on('doneInProc', function (rowCount, more) {
				console.log(rowCount + ' row(s) inserted');
			});
			connection.callProcedure(request);
		}


	});
	//Init admin
	app.get('/', function (req, res) {
		res.sendFile(__dirname + '/views/client.html');
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log('ip', ip);
		result_ip = ip.split("::");
	});

	socket.on('add admin', function (data) {
		this.isAdmin = data.isAdmin;
		socket.username = data.admin;

		console.log('admins log in', data);
		//
		var add = admins[1];
		console.log('admins log in1', add);

		_.each(admins, function (adminSocket) {
			console.log('1 as', adminSocket.username);
			adminSocket.emit("admin added", socket.username)
			socket.emit("admin added", adminSocket.username)
		});

		admins[socket.username] = socket;

		//If some user is already online on chat
		if (Object.keys(users).length > 0) {
			_.each(users, function (userSocket) {
				dbFunctions.getMessages(userSocket.roomID, 0)
					.then(function (history) {
						var len = history.length;
						console.log(len);
						var userSocket = users[history[len - 1]];
						history.splice(-1, 1);
						socket.join(userSocket.roomID);
						socket.emit("New Client", {
							roomID: userSocket.roomID,
							history: history,
							details: userSocket.userDetails,
							justJoined: true

						}
						)
					})
			}); 
		}
	});

	if(a!=null){

	setTimeout(function () {
if(Usr_Id==null&&Usr_Id==undefined){
	
	console.log('No present clients');

}
else
{

	console.log("usr id just before calling the new ticket assignment",Usr_Id);
	New_Ticket_Assignment(Usr_Id);
}
   
   }, 400);
}
Usr_Id="";
   resulta="";
	//Init user
	socket.on('add user', function (data) {
		console.log('add user 0', data);
		socket.isAdmin = false;
 		//c++;
	//	console.log("c here", c);
		if (data.isNewUser) {
			data.roomID = uuid.v4();
			console.log('add user1 ', data);
			dbFunctions.setDetails(data);
			socket.emit("roomID", data.roomID);
 
		}
		socket.roomID = data.roomID;
		//Fetch user details
		dbFunctions.getDetails(socket.roomID)
			.then(function (details) {
				socket.userDetails = details;
			})
			.catch(function (error) {
				console.log("Line 95 : ", error)
			})
			.done();
		socket.join(socket.roomID);
		var newUser = false;
		if (!users[socket.roomID]) {  // Check if different instance of same user. (ie. Multiple tabs)
			users[socket.roomID] = socket;
			newUser = true;
 			console.log('checking at !users');
		}
		//Fetch message history
		dbFunctions.getMessages(socket.roomID, 0)
			.then(function (history) {
				history.splice(-1, 1)
				socket.emit('chat history', {
					history: history,
					getMore: false
				});
				if (Object.keys(admins).length == 0) {
					//Tell user he will be contacted asap and send admin email
					socket.emit('log message', "Thank you for reaching us." +
						" Please leave your message here and we will get back to you shortly.");
					/*mail.alertMail();*/
				} else {
				

					if (newUser) {

						console.log('checking at the newUser');
						socket.emit('log message', "Hello User, How can I help you?");

 			
				

						//Make all available admins join this users room.
						_.each(admins, function (adminSocket) {
							console.log(admin_id);
						if (adminSocket.username == admin_id)
							 {
								console.log('near join');
								adminSocket.join(socket.roomID);
								adminSocket.emit("New Client", {
									roomID: socket.roomID,
									history: history,
									details: socket.userDetails,
									justJoined: false
								})
							}
							


						});
					}
				}
			})
			.catch(function (error) {
				console.log("Line 132 : ", error)
			})
			.done();
		dbFunctions.getMsgLength(socket.roomID)
			.then(function (len) {
				socket.MsgHistoryLen = (len * -1) + 10;
				socket.TotalMsgLen = (len * -1);
			})
			.catch(function (error) {
				console.log("Line 140 : ", error)
			})
			.done();
	});

	/* socket.on('my other event', function (data) {
		Get_ticket_color();
		function Get_ticket_color() {
			console.log("Inserting into Table...");
			request = new Request("Get_Ticket_color", function (err) {
				if (err) {
					console.log(err);
				}
				else {
					console.log('no errors for get ticket color');
				}
			}
			);


			request.on('row', function (columns) {
				columns.forEach(function (column) {
					if (column.value === null) {
						console.log('NULL');
					} else {
						result += column.value + " ";
					}
				});

				console.log('result data', result);

			});


			connection.execSql(request);
		}
		socket.emit('news',
			{
				hello: result
			}

		);

		console.log(data);
	}); */

/* 	socket.on('button', function (data) {


		Get_ticket_color();
		function Get_ticket_color() {
			console.log("Inserting into Table...");
			request = new Request("Get_Ticket_color", function (err) {
				if (err) {
					console.log(err);
				}
				else {
					console.log('no errors for get ticket color');
				}
			}
			);


			request.on('row', function (columns) {
				columns.forEach(function (column) {
					if (column.value === null) {
						console.log('NULL');
					} else {
						result = " ";

						result += column.value + " ";
					}
				});

				console.log('result data', result);

			});


			connection.execSql(request);
		}
		data.result = result;
		console.log('executing the sp get ticket color', data);
		socket.broadcast.to(data.roomID).emit('button', data);

	}); */
	socket.on('chat message', function (data) {
	setTimeout(function(){
		Get_ticket_color();
	},500);
		
		if (data.roomID === "null")
			data.roomID = socket.roomID;
		data.isAdmin = socket.isAdmin;
		dbFunctions.pushMessage(data);

		console.log('data r', data);

		console.log('result', data.result2 = result2);
		result2= '';


		var k = data['msg'];
		var k1 = data['isAdmin'];
		var k2 = data['timestamp'];
		var k3 = data['roomID'];

		if (k1 == false) {
			Insert('client', k, k2, k3);

		}
		else {

			Insert('agent', k, k2, k3);

		}


		function Insert(name, msg, timestamp, roomID) {
			console.log("Inserting into Table...");

			request = new Request("INSERT  chat_history (name, msg,timestamp,roomID) OUTPUT INSERTED.slno VALUES (@Name, @msg,@timestamp,@roomID);", function (err) {
				if (err) {
					console.log(err);
				}
			}
			);
			request.addParameter('name', TYPES.VarChar, name);
			request.addParameter('msg', TYPES.VarChar, msg);
			request.addParameter('timestamp', TYPES.VarChar, timestamp);
			request.addParameter('roomID', TYPES.VarChar, roomID);


			// Check how many rows were inserted
			request.on('doneInProc', function (rowCount, more) {
				console.log(rowCount + ' row(s) inserted');

			});

			connection.execSql(request);
		}
		socket.broadcast.to(data.roomID).emit('chat message', data);
	});

	socket.on("typing", function (data) {
		//console.log('typing',data);
		socket.broadcast.to(data.roomID).emit("typing", {
			isTyping: data.isTyping,
			person: data.person,
			roomID: data.roomID
		});
	});

	socket.on('disconnect', function () {
		if (socket.isAdmin) {
			delete admins[socket.username];
			_.each(admins, function (adminSocket) {
				adminSocket.emit("admin removed", socket.username)
			});
		} else {
			if (io.sockets.adapter.rooms[socket.roomID]) {
				var total = io.sockets.adapter.rooms[socket.roomID]["length"];
				var totAdmins = Object.keys(admins).length;
				var clients = total - totAdmins;
				if (clients == 0) {
					//check if user reconnects in 4 seconds 
					setTimeout(function () {
						if (io.sockets.adapter.rooms[socket.roomID])
							total = io.sockets.adapter.rooms[socket.roomID]["length"];
						totAdmins = Object.keys(admins).length;
						if (total <= totAdmins) {
							/*mail.sendMail({
								roomID: socket.roomID,
								MsgLen: socket.TotalMsgLen,
								email: socket.userDetails
							});*/
							delete users[socket.roomID];
							socket.broadcast.to(socket.roomID).emit("User Disconnected", socket.roomID);
							_.each(admins, function (adminSocket) {
								adminSocket.leave(socket.roomID)
							});
						}
					}, 4000);
				}
			} else {
				if (socket.userDetails)
					/*mail.sendMail({
						roomID: socket.roomID,
						MsgLen: socket.TotalMsgLen,
						email: socket.userDetails
					});*/
					delete users[socket.roomID];
			}
		}
	});

	socket.on('poke admin', function (targetAdmin) {
		admins[targetAdmin].emit("poke admin", {})
	});

	socket.on('client ack', function () {
		for (adminSocket in admins) {
			if (!admins.hasOwnProperty(adminSocket)) {
				continue;
			}
			admins[adminSocket].emit("client ack", {})
		}
	});

	socket.on("more messages", function () {
		if (socket.MsgHistoryLen < 0) {
			dbFunctions.getMessages(socket.roomID, socket.MsgHistoryLen)
				.then(function (history) {
					history.splice(-1, 1)
					socket.emit('more chat history', {
						history: history
					});
				})
			socket.MsgHistoryLen += 10;
		}
	});
});

function startApp(isSuccess) {
	if (isSuccess) {
		server.listen(config.web_port, function () {
			console.log('Server started ' + config.web_port + ' at ' +
				(new Date().toLocaleString().substr(0, 24)));
		});
		io.attach(server, {
			'pingInterval': 15000,
			'pingTimeout': 15000
		});
	} else {
		console.log("Server failed to start.");
	}
}