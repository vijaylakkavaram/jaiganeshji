var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  
var async = require('async');
var r_result;
var rr_result=[];
 
// Create connection to database
var config = {
        userName: 'datapullman',  
        password: 'system',  
        server: 'localhost',
        options: {
            // encrypt: true, /*If you are connecting to a Microsoft Azure SQL database, you will need this*/
            database: 'Live_chat1'
        }
    }
var connection = new Connection(config);  

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {  
    if (err) {
        console.log(err);
    }  
        else    {
		console.log("Connected");
		
var as;

Insert('abc','abc','ddfffasdsaddsd','abc','abc','abc','abc','abc');
 
console.log('as',r_result);
	}
	
function Insert(firstname, lastname, username, password, gender, email, address, phonenumber, callback) {


var 	request = new Request('Get_Admin_Registration', function (err) {
		if (err) {

 
			console.log(err);
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

		return r_result;
	});
	request.on('row', function (columns) {
		columns.forEach(function (column) {
			if (column.value === null) {
				console.log('NULL');
			} else {
				
				r_result += column.value + " ";
			}
		});

		console.log('ticket creation data', r_result);
	 
		//rr_result = r_result.split(" ", 1);
//		console.log('rr_Result', rr_result);
	 
		
	});


















	connection.callProcedure(request);

}
console.log('as',r_result);

});
 