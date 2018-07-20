const mongoose=require('mongoose');
const schema=mongoose.Schema;
//Create Schema
const adSchema=new schema({
    time:Date,
    type:String,
    by:String
});
const tournamentSchema=new schema({
    startDate:Date,
    endDate:Date,
    champion:String,
    matchs:[matchSchema]
});
const gameSchema=new schema({
    
});
//Create model and collection is 'playerCollection' an automatic S after collection is added
const playerModel=mongoose.model('playerCollection',playerSchema);

module.exports=playerModel;