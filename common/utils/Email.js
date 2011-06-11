var email = require('nodemailer');

email.SMTP = {
    host: "smtp.gmail.com",
    port: 465,
    ssl: true,
    use_authentication: true,
    user: "refbank123@gmail.com",
    pass: "referencebank"
}

exports.sendEmail = function(receiver, sub, msg){
	email.send_mail({
		sender: "refbank123@gmail.com", 
		to:receiver, 
		subject:sub,
    body:msg},
    
		function(error, success){
			console.log("Message "+(success?"sent":"failed"));
		});
}
