var os = require('os');
console.log('os architechture :' + os.arch());
console.log('Cpu/core object information :' + os.cpus());
console.log('Cpu endianess :' + os.endianness());
console.log('Free system memory :' + os.freemem());
console.log('Home directory :' + os.homedir());
console.log('Host name :' + os.hostname());
console.log('Load average :' + os.loadavg());
console.log('List of network interfaces : ' + os.networkInterfaces());
console.log('Current Platform : ' + os.platform());
console.log('Operating system release : ' + os.release());
console.log('Temprory directory : ' + os.tmpdir());
console.log('Total amount of system memory : ' + os.totalmem());
console.log('Operating system name : ' + os.type());
console.log('System uptime in seconds : ' + os.uptime());
// console.log('Subset of the password file entry : ' + os.userInfo([options]));

