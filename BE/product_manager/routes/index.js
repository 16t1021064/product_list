var express = require('express');
var router = express.Router();
var cors = require('cors')

router.use(cors())
const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Product',
  password: '123',
  port: 5432,
})

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});
router.get('/products', function (req, res, next) {

  pool.query('SELECT * from "Product" order by id', (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      res.send(resp.rows)
    }
  })
});
router.get('/products/:id', function (req, res, next) {
  var id = req.params.id;
  pool.query('SELECT * from "Product" where id=$1', [id], (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      res.send(resp.rows[0])
    }
  })
});
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});
router.get('/add', function (req, res, next) {

  res.render('add', {});
});
router.post('/add', function (req, res, next) {
  var { name, price, status } = req.body;
  var priceInt = parseInt(price);
  console.log(req.body);
  pool.query('insert into "Product" (name, price, status) values ($1,$2,$3)', [name, priceInt, status], (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send();
    }
  })
});
router.delete('/delete/:id', function (req, res, next) {
  const id = req.params.id;
  pool.query('delete from "Product" where id = $1', [id], (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send('đã xóa dữ liệu có id: ' + id);
    }
  })
});
router.put('/update/:id', function (req, res, next) {
  var id = req.params.id;
  var { name, price, status } = req.body;
  var priceInt = parseInt(price);
  pool.query('UPDATE "Product" SET name = $2, price = $3, status = $4 WHERE id = $1;', [id, name, priceInt, status], (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp.rows[0]);
    }
  })
});

module.exports = router;
