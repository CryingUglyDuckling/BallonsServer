
const mongoose=require('mongoose');
const schema=mongoose.Schema;
//Create Schema
const matchSchema=new schema({
    id:Number,
    level:Number,
    requestTime:Date,    
    pos1:String,
    pos2:String, 
});
const tournamentSchema=new schema({
    tournamentNo:Number,
    startDate:Date,
    endDate:Date,
    champion:String,
    matches:[matchSchema]
});

//Create model and collection is 'playerCollection' an automatic S after collection is added
const tournamentModel=mongoose.model('tournamentDB',tournamentSchema);
module.exports=tournamentModel;