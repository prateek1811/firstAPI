const middleWare=(req,res,next)=>{
console.log(req)
   
        let ans=req.is("application/json",req.body)
        console.log(ans)
        if(!ans){
            res.status(403).send({messgae:"you have to pass content-type and application/json"}).end()
        }
    
    next();
};

module.exports={middleWare};