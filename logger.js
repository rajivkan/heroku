var winston = require('winston');
require('winston-daily-rotate-file');

var filenameByEnv = function () {
      return ( process.env.NODE_ENV === 'production' ) ? './logs/production/production' : './logs/development/development';
}      

winston.add(winston.transports.DailyRotateFile, { filename: filenameByEnv() + '.log', json: true });

var log = function(level, title, message) {
  var message = (message instanceof Array || typeof(message) === 'string') ? message : JSON.stringify(message);

  message = traceCaller(new Error().stack) +" : "+ message;
  if (title) {
    message = title +': '+message;
  }

  winston.remove(winston.transports.DailyRotateFile);
  winston.add(winston.transports.DailyRotateFile, { filename: filenameByEnv() + '_'+ level +'.log', json: true });
  
  winston.log(level, message);
}

var traceCaller = function(s) {
    var n=1;
    n+=1;
    var a=s.indexOf('\n',5);
    while(n--) {
      a=s.indexOf('\n',a+1);
      if( a<0 ) { a=s.lastIndexOf('\n',s.length); break;}
    }
    b=s.indexOf('\n',a+1); if( b<0 ) b=s.length;
    a=Math.max(s.lastIndexOf(' ',b), s.lastIndexOf('/',b));
    b=s.lastIndexOf(':',b);
    s=s.substring(a+1,b);
    return s;
}

module.exports = function() {
  return {
    info: function(message, title) {
      log('info', title, message)
    },
    error: function(message, title) {
      log('error', title, message)
    }
  }
}