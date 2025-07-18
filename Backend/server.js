const express=require('express');
const cors=require('cors');
const app=express();
const PORT=5000;
const log=require('../Logging_Middleware/log');
app.use(cors());
app.use(express.json());
app.use(log);
let urlss=[];
app.post('/shorten',(req,res)=>{
    const { longUrl }=req.body;
    const id=Date.now().toString(36);
    const shortUrl=`http://localhost:${PORT}/${id}`;
    urlss.push({id,longUrl});
    res.status(201).json({shortUrl,id});
});
app.get('/:id',(req,res)=>{
    const entry=urlss.find(u=>u.id===req.params.id);
    if(entry){
        res.redirect(entry.longUrl);
    }else{
        res.status(404).send("Shorturl not found");
    }
});
    app.listen(PORT,()=>{
        console.log(`Backend running at http://localhost:${PORT}`);
    });
    