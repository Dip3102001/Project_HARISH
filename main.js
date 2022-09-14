const fs = require('fs');
const express =require(`express`);
const con = require(`./db`);
const path = require('path');
const app = express();
const cors = require('cors')
const static = path.join(__dirname,'public');
app.use(express.static(path.join(__dirname,'public','Client')));
app.use(express.urlencoded());
app.use(cors());



console.log(static)


app.get('/',(req,res)=>{
    res.sendFile(static+"/Client/login.html");
});



// home page
app.get('/company/:num',(req,res)=>{

    console.log('Hello');

    const sql = ` SELECT * FROM Companies `;
    
    con.query(sql,(err,result)=>{
        if(err) console.log(err);
        else{
            res.send(result.filter((value,index,array)=>{                
                if(index < Number(req.params.num))
                    return value;
            }));
        }
    });   
});

app.post('/add_product',(req,res)=>{
    const company_name = req.body.company_name;
    const product_name = req.body.company_name;
    const product_type = req.body.product_type;
    const product_price = req.body.product_price;
    const product_main_cat = req.body.product_main_cat;

    const product_sub_cat = req.body.product_sub_cat;
    const product_des = req.body.product_description;

    const sql = `insert into Product(company_name,product_name,product_type,product_price,product_main_cat,product_sub_cat,product_description) values(${company_name},${product_name},${product_type},${product_price},${product_main_cat},${product_sub_cat},${product_des})`;

    con.query(sql,(err,result)=>{
        if(err) console.log(err);
    });
});
















app.listen(5000,(err)=>{
    if(err)
        console.log(err);
    else 
        console.log('server is started on 5000 port..');
});