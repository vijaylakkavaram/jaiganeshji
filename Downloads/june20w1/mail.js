var nodemailer = require('nodemailer');
var dbFunctions = require('./dbStore/dbFunctions');
var Q = require('q');
const xoauth2=require('xoauth2');
var generator = require('xoauth2').createXOAuth2Generator({
	user: "amoghs300@gmail.com",
	clientId: "1069782687216-3kiicdasgkd02al8ukptgcs4f4fjcdsu.apps.googleusercontent.com",
	clientSecret: "bNk4aH5Qg-8omY7ogLpdNGbb",
	refreshToken: "1/1lxC6RqfPZW6j1Iavgxa16NeHMaBhbzwUaV3CutRUhbDeF6UFtuUAbGF0Crr1eNJ",
	accessToken: "ya29.GlvEBfVC9rjGbxiQXivyHJIJw9qaa504DkObcgm9AV0fRADlpyNZ1FRVoKDaojDvRnuoq8gx6nwJFnYG4wjE65UE4QrFe10hrDR-3ocVJBAsv4E6XkT02Pm40L7w"
});

var transporter = nodemailer.createTransport(({
	service: 'gmail',
	auth: {
		xoauth2: generator
	}
}));

var mailOptions = {
	from: "Sender <amoghs300@gmail.com>", // sender address 
	to: "", 				// list of receivers 
	subject: 'Chat System', 						// Subject line 
	generateTextFromHTML: true,
	html: "Chat has started!"
	
};
transporter.sendMail(mailOptions,function(err,res) {
	if(err){
		console.log('Error');
	} else {
		console.log('Email sent');
	}
})

exports.sendMail = function(data) {
	dbFunctions.getMessages(data.roomID, 0, data.MsgLen - 1)
		.then(function(history) {
			//mail only if history is !null
			history.splice(-1, 1);
			mailOptions.subject = "Chat with " + data.email[0];
			if (history.length) {
				formatMail(history, data.email);
				transporter.sendMail(mailOptions, function(error, response) {
					if (error)
						console.log(error);
				});
			}
			mailOptions.html = "";
		})
		.catch(function(error) {
			console.log("Mail.js : ", error)
		})
		.done();
}

exports.alertMail = function() {
	mailOptions.subject = "Customer is trying to chat";
	mailOptions.html = "No admins are online and a customer needs help.";
	transporter.sendMail(mailOptions, function(error, response) {
		if (error)
			console.log(error);
	});
}

function formatMail(history, details) {
	var len = history.length;
	mailOptions.html = "<b>" + details[0] + "</b><br><b> Email ID : " + details[1] + "</b><br><b> Phone : " +
		details[2] + "</b><br><br> Chat History <br><br>";
	for (var i = len - 1; i >= 0; i--) {
		var sender;
		if (history[i]["who"])
			sender = "amoghs300@gmail.com"
		else
			sender = "vijaylakavaram@gmail.com"
		var when = (history[i]["when"]).toLocaleString().substr(15, 6);
		mailOptions.html += "<b>" + sender + "</b>: " + history[i]["what"] + "<br>";
	}
}