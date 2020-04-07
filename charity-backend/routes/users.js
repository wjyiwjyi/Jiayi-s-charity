var express = require('express');
var router = express.Router();
var connPool = require('../db/dbconnect');
var pool = connPool();
var jwt = require('jsonwebtoken');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  let userName = req.body['name'];
  let userPass = req.body['password'];
  let email = req.body['email'];
  if(userName.length === 0 || userPass.length === 0){
    res.status(400).json({ code: '-200', msg: '用户名或密码未输入' });
      return;
  }
  let params = [userName, userPass, email];
  let sqlStr = 'insert into user (uname, upass, uemail)values(?,?,?);'
  pool.getConnection(function (err, conn) {
    if (err) {
      res.status(400).json({ code: '-200', msg: '数据库连接失败' });
      return;
    }
    conn.query(sqlStr, params, function (err, rs) {
      if (err) {
        if(err.message.includes('Duplicate')){
          res.status(400).json({ code: '-200', msg: '注册用户出错:用户名重复' });
          return;
        }else{
          res.status(400).json({ code: '-200', msg: '注册用户出错:' + err.message });
          return;
        }
      }
      res.status(200).json({ token: jwt.sign({ userid: rs.insertId }, 'secret') });
    });
    conn.release();
  });
});

router.post('/login', function (req, res, next) {
  let userName = req.body['name'];
  let userPass = req.body['password'];
  let params = [userName, userPass];
  let sqlStr = "select * from user where uname=? and upass=?";
  pool.getConnection(function(err, conn){
    if(err){
      res.status(400).json({code:'-200',msg:'数据库连接失败'});
      return;
    }
    conn.query(sqlStr, params, function(err,rs){
      if(err){
        res.status(400).json({ code: '-200', msg: '查询用户出错:' + err.message });
        return;
      }
      if(rs.length === 0){
        res.status(401).json({ code: '-200', msg: '登录失败，用户名或密码输入错误！'});
        return;
      }
      res.status(200).json({token: jwt.sign({ userid: rs[0].uid }, 'secret') });
    });
    conn.release();
  });
});

module.exports = router;
