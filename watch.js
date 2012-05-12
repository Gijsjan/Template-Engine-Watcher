var fs = require('fs'),
	util = require('util'),
	exec = require('child_process').exec;

try { var _ = require('underscore'); }
catch (err) { throw new Error("\n\nI love Underscore.js, don't you?\n\n"); }

console.log("Watching to convert Coffee/Stylus/Jade");

var jade = {
	base: '/home/someuser/someproject/templates/',
	out: '/var/www/templates/',
	exec: 'jade --out %newpath% %filepath%',
	extension: 'jade'
};

var stylus = {
	base: '/home/someuser/someproject/css/',
	out: '/var/www/css/',
	exec: 'stylus --out %newpath% %filepath%',
	extension: 'styl'
};

var coffee = {
	base: '/home/someuser/someproject/js/',
	out: '/var/www/js/',
	exec: 'coffee --output %newpath% --compile %filepath%',
	extension: 'coffee'
};

var convertors = [jade, stylus, coffee];

_.each(convertors, function(convertor) {
	watchConvertor(convertor);
});

function watchConvertor(convertor) {
	exec('find ' + convertor.base, function(error, stdout, stderr) {
		if (error) throw error;
		var dirs = _.compact(stdout.split('\n'));
		
		_.each(dirs, function(dir) {
			fs.stat(dir, function (err, stats) {
				if (err) throw err;
				if (stats.isDirectory()) {
					fs.watch(dir, function(event, filename) {
						if (filename.split('.').pop() === convertor.extension) {
							execConvertor(convertor, dir + '/' + filename);
						}
					});
				}
			});
		});

		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
}

function execConvertor(convertor, filepath) {
	var part = filepath.replace(convertor.base, ""); // main/login/login.jade
	var dirs = _.initial(part.split('/')).join('/'); // main/login
	var newpath = convertor.out + dirs; // /var/www/templates/main/login
	var exec_str = convertor.exec.replace('%newpath%', newpath);
	exec_str = exec_str.replace('%filepath%', filepath);

	exec(exec_str,
		function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
		}
	);
}
