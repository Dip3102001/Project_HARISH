const mysql = require('mysql');


// changies req according to database
// testing executed on mysql database with following config
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'experiment'
});

con.connect((err)=>{
    if(err) console.log('Error while making connection with mysql database server');
    console.log('connected to mysql server');
});

module.exports = con;