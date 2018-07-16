var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  
var async = require('async');
//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());
 
app.post('/myaction', function(req, res) {
  //res.send('You sent the name "' + req.body.name + '".');
  res.send('your first name"'+req.body.firstname+'".');
    	Insert(req.body.firstname,req.body.lastname,req.body.username,req.body.password,req.body.gender,req.body.email,req.body.address,req.body.phonenumber);

 
 });
var config1 = {
        userName: 'datapullman',  
        password: 'system',  
        server: 'TESTSERVER2',
        options: {
            // encrypt: true, /*If you are connecting to a Microsoft Azure SQL database, you will need this*/
            database: 'Chat11'
        }
    }
var connection = new Connection(config1);  

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {  
    if (err) {
        console.log(err);
    }  
        else    {
		console.log("Connected");


	}

});



	function Insert(firstname, lastname,username,password,gender,email,address,phonenumber, callback){
			console.log("Inserting into Table...");
	
			request = new Request("INSERT  Registration (firstname,lastname,username,password,gender,email,address,phonenumber) OUTPUT INSERTED.slno VALUES (@firstname,@lastname,@username,@password,@gender,@email,@address,@phonenumber);", function(err){  
				 if (err) {
						console.log(err);
					}  
				}
			);  
			request.addParameter('firstname', TYPES.VarChar, firstname);  
			request.addParameter('lastname', TYPES.VarChar, lastname);  
			request.addParameter('username', TYPES.VarChar, username);  
			request.addParameter('password', TYPES.VarChar, password); 
	request.addParameter('gender', TYPES.VarChar, gender); 
	request.addParameter('email', TYPES.VarChar, email); 
	request.addParameter('address', TYPES.VarChar, address); 
	request.addParameter('phonenumber', TYPES.VarChar, phonenumber); 
	
			// Check how many rows were inserted
			request.on('doneInProc', function(rowCount, more) {  
				console.log(rowCount + ' row(s) inserted');  
		
			});             
	
			connection.execSql(request);  
		}
	function validateform(){  
var name=document.myform.name.value;  
var password=document.myform.password.value;  
  
if (name==null || name==""){  
  
  var fn = document.fm.firstname.value;
   var  ln= document.fm.lastname.value;  
   var username= document.float.username.value;
	var pwd= document.fm.password.value;
	 var gen = document.fm.gender.value;
	 var Email = document.fm.email.value;
	 var Address = document.fm.address.value;
	var ph= document.fm.phonenumber.value;
  
  
  var name=document.myform.name.value;  

  
  
  
  
}  
	
	
	
	}
	
app.listen(9005, function() {
  console.log('Server running at http://127.0.0.1:9005/');
});