var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

var result=[];
var result1=[];
var result2;
var result3;
var datetime;
var result5;
var Usr_Id;
var a;
 
var config1 = {
	userName: 'datapullman',  
	password: 'system',  
	server: 'localhost',
	options: {
		// encrypt: true, /*If you are connecting to a Microsoft Azure SQL database, you will need this*/
		database: 'Live_Chat1'
	}
}
var connection = new Connection(config1);  
connection.on('connect', function(err) {  
    if (err) {
        console.log(err);

    }  
    else    {
		console.log("Connected");
		
	}

});
var ssn=1;
var result_ip='192.1168.1.21111115';
port=8080;
var myInt = setTimeout(function () {
     New_Ticket_Creation(result_ip,port,ssn,datetime)

}, 500);
	function New_Ticket_Creation(Usr_Ip,Usr_Port,ssn){
					console.log("Executing The New_Ticket_Creation");
					request = new Request('New_Ticket_Creation', function(err){
						if (err) {
							console.log(err);
						//	var rr=err['message'];
						//	console.log("rr",rr);
						/* 	if(rr!=null){
								console.log('testing rr',rr);
					 
							} */
					
						}
						else{
							 console.log('ticket created successfully');
						}
						 
				});	
				request.on('row', function(columns) {
					columns.forEach(function(column) {
						if (column.value === null) {
							console.log('NULL');
						} else {
						result += column.value + " ";

                    }
					});
				 
                   // console.log('ticket creation data',result);
                     result1=result.split(" ",3);
                    console.log('ticket creation data',result);
                    console.log('result 1',result1[1])

 
					
			  });	
				
				








						request.addParameter('Usr_IP_Address', TYPES.VarChar, Usr_Ip);
						request.addParameter('Usr_Port_Id', TYPES.VarChar, Usr_Port);
						request.addParameter('Session_Id', TYPES.VarChar, ssn);
						request.addParameter('Con_Start_Time', TYPES.DateTime, new Date());
						 // Check how many rows were inserted
						request.on('doneInProc', function(rowCount, more) {
							console.log(rowCount + ' row(s) inserted');
						});
					connection.callProcedure(request);
				}

                var myInt1 = setTimeout(function () {

				var i=	New_Ticket_Assignment(result1[1]);
					console.log('i',i);
                }, 600);
                        

						function New_Ticket_Assignment(Usr_Id){
                            console.log("Executing The New_ticket_Assignement");
                            console.log('usr_id',result1[1]);
							request = new Request('New_Ticket_Assignment', function(err){
								if (err) {
									console.log(err);
									var rr=err['message'];
									console.log("rr",rr);
									if(rr!=null){
										console.log('testing rr',rr);
							 
									}
							
								}
								else{
									 console.log('ticket assigned successfully');
								}
								 
						});	
						request.on('row', function(columns) {
							columns.forEach(function(column) {
								if (column.value === null) {
									console.log('NULL');
								} else {
								result2 += column.value + " ";
								}
							});
						 
                            console.log('result data',result2);
                            result5=result2.split(" ",20);
                            console.log('result5',result5);
                            console.log('result5[3]',result5[19]);

									a= result5[19];
									return a;
							
					  });				
								request.addParameter('Usr_Id', TYPES.Int, result1[1]);
									 // Check how many rows were inserted
								request.on('doneInProc', function(rowCount, more) {
									console.log(rowCount + ' row(s) inserted');
								});
							connection.callProcedure(request);
							return a;
 
						}
 
