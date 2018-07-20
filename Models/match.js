
const mongoose=require('mongoose');
const schema=mongoose.Schema;
//Create Schema
const matchSchema=new schema({
    type:String,
    id:Number,
    level:Number,
    requestTime:Date,    
    pos1:String,
    pos2:String,
    pos3:String,
    pos4:String,
});

//Create model and collection is 'playerCollection' an automatic S after collection is added
const matchModel=mongoose.model('matchCollection',matchSchema);
module.exports=matchModel;