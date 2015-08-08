var crypto = require('crypto');

exports.createSalt = function(){
    "use strict";

    return crypto.randomBytes(128).toString('base64');
};

exports.hashPwd = function(salt, pwd){
    "use strict";

    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
};