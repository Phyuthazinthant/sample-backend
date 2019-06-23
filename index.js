const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 4000;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


const con = mysql.createConnection({
host: "localhost",
user: "",
password: "",
database: "test"
});

app.get('/', (req, res) => res.send("hell0 "));

app.get('/users', (req, res) => {
con.connect(function (err) {
//if (err) throw err;
con.query("SELECT * FROM test", function (err, result, fields) {
//if (err) throw err;
res.status(200).json(result);
});
});
});

app.post('/user/add', (req, res) => {
data = req.body;
con.connect(function (err) {
//if (err) throw err;
console.log("Connected!");
var sql = `INSERT INTO test (id,name,age,job,address) VALUES ('${data.id}','${data.name}','${data.age}','${data.job}','${data.address}')`;
con.query(sql, function (err, result) {
//if (err) throw err;
res.status(201).send("User created!");
});
});
});

app.put('/user/update/:uid', function (req, res) {
id = req.params.uid;
con.query('UPDATE `test` SET `name`=?,`age`=?,`job`=?,`address`=? where `id`=?', [req.body.name, req.body.age, req.body.job, req.body.address, id], function (error, results, fields) {
//if (error) throw error;
res.end(JSON.stringify(results));
});
});

app.delete('/user/remove/:uid', (req, res) => {
id = req.params.uid;
var sql = `DELETE FROM test WHERE id = ${id}`;
con.query(sql, function (err, result) {
//if (err) throw err;
if (result.affectedRows == 0) {
res.status(404).send("Not Found!");
} else {
res.status(200).send("Deleted!");
}
});
});

app.listen(port, () => console.log(`Http server running on localhost:${port}`));