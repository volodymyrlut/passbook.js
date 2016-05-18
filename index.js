exports.createPassbook = function(type, resources, keys, password,callback){
	var passbook = require('./lib/index.js');
	var fs = require("fs");
	var obj;
	fs.readFile(resources+'pass.json', 'utf8', function (err, data) {
  		if (err) throw err;
  		console.log('pass.json file redaded successfully');
  		obj = JSON.parse(data);
  		var template = passbook.createTemplate(type, {
		passTypeIdentifier: obj.passTypeIdentifier,
		teamIdentifier:     obj.teamIdentifier,
		organizationName:   obj.organizationName
		}, {
		certs: {
		  wwdr: keys+'/wwdr.pem',
		  pass: keys+'/Certificates.pem', // pem with certificate and private key
		  password: password // pass phrase for the pass_cert.pem file
		}
		})
		var pass = template.createPass(obj);
		var stream = pass.pipe(fs.createWriteStream('pass.pkpass'));
		stream.on('finish',function(){
			callback();
		});
	});
}




exports.prepareKeys = function(keys){
	console.log("Preparing keys in directory "+ keys);
	var exec = require('child_process').exec,
	    child;
	child = exec('node node-passbook prepare-keys -p '+keys,
	  function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    console.log('stderr: ' + stderr);
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
	console.log("Keys prepared");
}



