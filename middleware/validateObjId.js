const ObjectId =require('mongoose').Types.ObjectId

module.exports=function(req, res, next){
    const objId=req.params.id;
    if(ObjectId.isValid(objId)){
        const newObjId=String(new ObjectId(objId));
        if(objId!==newObjId) return res.status(404).send('Invalid Id')
        next()
    }
    else return res.status(404).send('Invalid Id')
}