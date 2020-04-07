var mysql = require('mysql');
module.exports = (function(){
    var pool = mysql.createPool({
        host:'localhost',
        user:'root',
        password:'wzq760313',
        database:'charity',
        port:'3306'
    });
    pool.on('connection',function(connection){
        connection.query('SET SESSION auto_increment_increment=1');
    });
    return function(){
        return pool;
    }
})();
	