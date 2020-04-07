var express = require('express');
var router = express.Router();
var connPool = require('../db/dbconnect');
var fs = require('fs');
var path = require('path');
var jwt = require('jsonwebtoken');
var pool = connPool();

router.get('/', function (req, res) {
    res.render('goods');
});

var goodsList = [];

router.get('/goods-list', function (req, res) {
    let sqlStr = "select * from goods";
    pool.getConnection(function (err, conn) {
        if (err) {
            res.status(400).json({
                code: '-200',
                msg: '数据库连接失败！'
            });
            return;
        }
        conn.query(sqlStr, [], function (err, rs) {
            if (err) {
                console.log('Error Message: ' + err.message);
                res.status(400).json({
                    code: '-200',
                    msg: '查询货物列表出错：' + err.message
                });
                return;
            }
            goodsList = rs;
						console.log(rs.length);
            res.send({
                code: '200',
                results: rs
            });
        });
        conn.release();
    });
});

router.get('/checkout-goods', function (req, res) {
    let sqlStr = "select * from goods where checkOut=false";
    pool.getConnection(function (err, conn) {
        if (err) {
            res.status(400).json({
                code: '-200',
                msg: '数据库连接失败！'
            });
            return;
        }
        conn.query(sqlStr, [], function (err, rs) {
            if (err) {
                console.log('Error Message: ' + err.message);
                res.status(400).json({
                    code: '-200',
                    msg: '查询货物列表出错：' + err.message
                });
                return;
            }
            goodsList = rs;
            res.send({
                code: '200',
                results: rs
            });
        });
        conn.release();
    });
});

router.post('/checkin', function (req, res) {
	const goods = req.body['value'];
	let sqlStr = ``;
  let params = [];
	sqlStr = `insert into goods (kind, quantity, amount, targetLocation, donor, storeLocation, checkOut)
    values(?, ?, ?, ?, ?, ?, false)`;
	params = [goods.kind, goods.quantity, goods.amount, goods.targetLocation, goods.donor, goods.storeLocation, goods.checkOut];
	pool.getConnection(function (err, conn) {
		if (err) {
			res.status(400).json({
				code: '-200',
				msg: '数据库连接失败！'
			});
			return;
		}
		conn.query(sqlStr, params, function (err, rs) {
			if (err) {
				console.log(err.message);
				res.status(400).json({
						code: '-200',
						msg: '添加捐赠信息出错：' + err.message
				});
				return;
			}
			res.status(200).json({
				code: '200',
				msg: 'Check-in Goods success!'
			});
		});
	conn.release();
	});
});

router.post('/checkout', function (req, res) {
	const goods = req.body['value'];
	let sqlStr = ``;
  let params = [];
	sqlStr = `update goods set checkOut = true where id = (?)`;
	params = [goods];
	pool.getConnection(function (err, conn) {
		if (err) {
			res.status(400).json({
				code: '-200',
				msg: '数据库连接失败！'
			});
			return;
		}
		conn.query(sqlStr, params, function (err, rs) {
			if (err) {
				console.log(err.message);
				res.status(400).json({
						code: '-200',
						msg: '更改出库信息出错：' + err.message
				});
				return;
			}
			res.status(200).json({
				code: '200',
				msg: 'Check-out Goods success!'
			});
		});
	conn.release();
	});
});

router.post('/storecheckout', function (req, res) {
	const goods = req.body['value'];
	console.log(goods);
	let sqlStr = ``;
  let params = [];
	sqlStr = `update goods set checkOut = true where targetLocation = (?)`;
	params = [goods];
	pool.getConnection(function (err, conn) {
		if (err) {
			res.status(400).json({
				code: '-200',
				msg: '数据库连接失败！'
			});
			return;
		}
		conn.query(sqlStr, params, function (err, rs) {
			if (err) {
				console.log(err.message);
				res.status(400).json({
						code: '-200',
						msg: '更改出库信息出错：' + err.message
				});
				return;
			}
			res.status(200).json({
				code: '200',
				msg: 'Check-out Goods success!'
			});
		});
	conn.release();
	});
});

module.exports = router;