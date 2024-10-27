//create controller-implement CRUD functionalities
const express= require("express")
const router = express.Router()
const db=require("../db/db")
const bodyParser=require("body-parser")

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended:true
}))

//Get
router.get("/api/v1/accounts",(req,res)=>{
    const sql= "Select * from acc.account";
    db.query(sql,(err,result)=>{
        if(err) throw res.json(err);
        return res.status(200).json(result.rows);
    })
})

//Post
router.post("/api/v1/accounts",(req,res)=>{
    const {name,type,balance}= req.body
    const sql= "insert into acc.account(name,type,balance) VALUES ($1,$2,$3) RETURNING *";
    db.query(sql,[name,type,balance],(err,result)=>{
        if(err) throw res.json(err);
        return res.status(201).json(result.rows);
    })
})

//put
router.put("/api/v1/accounts/:id",(req,res)=>{
    const id = Number(req.params.id)
    const {name,type,balance}= req.body
    const sql= "UPDATE acc.account SET name=$1, type=$2 , balance=$3 WHERE id = $4";
    db.query(sql,[name,type,balance,id],(err,result)=>{
        if(err) throw res.json(err);
        return res.status(200).json(`Account is Updated Successfully for id:${id}`);
    })
})

//Delete
router.delete("/api/v1/accounts/:id",(req,res)=>{
    const id = Number(req.params.id)
    const sql= "delete from acc.account where id = $1";
    db.query(sql,[id],(err,result)=>{
        if(err) throw res.json(err);
        return res.status(200).json(`Account is Updated Successfully for id:${id}`);
    })
})

module.exports=router;