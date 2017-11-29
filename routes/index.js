var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var creds = require ('../config/config');


var transport = {
	host: 'smtp.gmail.com',
	auth: {
		user: creds.USER,
		pass: creds.PASS
	}
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error,success)=>{
	if (error){
		console.log("Error!");
	} else {
		console.log("SERver is erady");
	}
});
/* GET home page. */
router.get('/', function(req, res, next) {
	var message = '';

	if (req.query.msg != undefined){
		message = req.query.msg
	}

  res.render('index', { title: 'Express' });
});

router.post('/send', function(req,res) {
	var email = req.body.email
	var content = req.body.content
	var name = req.body.name
	var phone = req.body.phone
	var finalMessage = `${content} \n\n phone: ${phone} \n email: ${email}`

	var mail = {
		from: email,
		to: 'saifalmahmud@gmail.com',
		subject: 'Test',
		text: finalMessage
	}

	transporter.sendMail(mail, (error, data)=>{
		if (error){
			console.log("ERROR");
			res.redirect('/?msg=Fail');
		} else {
			console.log("SUCCESS!!!");
			res.redirect('/?msg=Success');
		}
	})
})



module.exports = router;
