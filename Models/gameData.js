const mongoose=require('mongoose');
const schema=mongoose.Schema;
//Create Schema
const gameSchema=new schema({
    tournamentNo:Number,
    matchNo:Number,

});

//Create model and collection is 'playerCollection' an automatic S after collection is added
const gameDataModel=mongoose.model('gameDataDB',gameSchema);
module.exports=gameDataModel;