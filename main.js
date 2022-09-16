const fs = require('fs');
const express =require('express');
const con = require('./db');
const path = require('path');
const cors = require('cors');
const url = require('url');

const app = express();


const static = path.join(__dirname,'public');

const multer = require('multer');

const stroage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./public/asset/products');
    },
    filename : function(req,file,cb){
        
        const filename = Date.now()+file.originalname;
        cb(null,filename);
        

        const company_name = req.body.company_name;
        const product_name = req.body.product_name;
        const product_type =req.body.product_type;
        const sql = `
            INSERT INTO product_imgs(company_name,product_name,product_type,imgs) values('${company_name}','${product_name}','${product_type}','${filename}')
        
        `;

        con.query(sql,(err,result)=>{
            if(err) console.log(err);
            else console.log("changes made to database..");
        });
    }
});

const upload = multer({storage:stroage});


app.use(express.static(path.join(__dirname,'public','Client')));
app.use(express.urlencoded());
app.use(cors());



console.log(static);


app.get('/',(req,res)=>{
    res.sendFile(static+"/Client/login.html");
});



// returning list of companies stored in db
app.get('/company',(req,res)=>{

    const sql = ` SELECT * FROM Companies `;
    
    con.query(sql,(err,result)=>{
        if(err) console.log(err);
        else res.send(result);
        });
});   


// to add product in Product table in experiment db
app.post('/add_product',upload.any('product_images'),(req,res)=>{
    const company_name = req.body.company_name;
    const product_name = req.body.company_name;
    const product_type = req.body.product_type;
    const product_price = req.body.product_price;
    const product_main_cat = req.body.product_main_cat;

    const product_sub_cat = req.body.product_sub_cat;
    const product_des = req.body.product_description;

    const sql = `insert into Products(company_name,product_name,product_type,product_price,product_main_cat,product_sub_cat,product_description) values(${company_name},${product_name},${product_type},${product_price},${product_main_cat},${product_sub_cat},${product_des})`;


    


    con.query(sql,(err,result)=>{
        if(err) console.log(err);
    });
});



// send the list of product according to main_cat & sub_cat
app.get('/get_product',(req,res)=>{
    
    app.get('/get_product',(req,res)=>{
    const dat = url.parse(req.url,true);

    con.query('SELECT * From `Products`',(err,result)=>{
        if(err) console.log(err);
        else{
            if(dat.product_main_cat != null)
                result = result.filter((value,index,array)=>{
                if(value.product_main_cat == dat.product_main_cat)
                    return value;
            })
            if(dat.query.product_sub_cat != null)
                result = result.filter((value,index,array)=>{
                    if(value.product_sub_cat == dat.product_sub_cat)
                        return value;
            })
        }
    });
});
});




// Adding user to db in pending state 
// User side
app.post('/add_user',(req,res)=>{
    const q = req.body;
    const sql = `
        INSERT INTO Users(name,email_id,password,address,city,state,pin_code,contact_no,dob,google_pay_no,upi_id,status) VALUES(${q.name},${q.email_id},${q.password},${q.address},${q.city},${q.state},${q.pin_code},${q.contact_no},${q.dob},${q.google_pay_no},${q.upi_id},'PENDING')
    `;
   
    con.query(sql,(err,result)=>{
        if(err) console.log(err);
    });
    
    // put appropriate response...
    return res.send("Your accesss is pending..."); 
});




// getting perticuler user from database 
// according to flag set ('approved','pending','rejected')
app.get('/get_user_users/:flag',(req,res)=>{
    
    const sql = `
        SELECT * FROM Users
    `;

    con.query(sql,(err,result)=>{
        if(err) console.log(err);
        
        if(req.params.flag == 'approved'){
            result = result.filter((value,index,array)=>{
                if(value.status == 'APPROVED')
                    return value;
            });
        }

        if(req.params.flag == 'pending'){
            result = result.filter((value,index,array)=>{
                if(value.status == 'PENDING')
                    return value;
            });
        }

        if(req.params.flag == 'rejected'){
            result = result.filter((value,index,array)=>{
                if(value.status == 'REJECTED')
                    return value;
            });
        }

        return res.send(result);
    });
});


// changing user status...
// admin side
app.post('/set_user_permission/:flag',(req,res)=>{
    const email = req.body.email_id;
    const sql = `
        UPDATE Users SET status = '${flag}' WHERE email = '${email}'
    `;

    con.query(sql,(err,result)=>{
        if(err) console.log(err);        
    });
});



app.post('/signin',(req,res)=>{
   const email = req.body.email_id;
   const password = req.body.password;

   con.query('SELECT * FROM Users',(err,result)=>{
        if(err) console.log(err);
        
        // edit appropriate response
        if(result.length < 1 && result.password != password)  res.send('Wrong email or password');     

        // sending appropriate resp
        return sendFile("HELLO");
   });
});


app.listen(5000,(err)=>{
    if(err)
        console.log(err);
    else 
        console.log('server is started on 5000 port..');
});