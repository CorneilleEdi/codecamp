const mongoose = require('mongoose');
const File = require('./file.model')

exports.create= (req,res)=>{
    const file = req.file;
    if (!file) res.status(401).send({error : "file is required"})
    var {originalname,size,mimetype} = file

    var f = new File({name :originalname,type : mimetype,size})
    f.save((err,result)=>{
        if (err) res.status(401).send({error : "An error occur"})
        res.status(201).send({data : {
            name : originalname,
            type : mimetype,
            size
        }})
    })
}