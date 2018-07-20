const mongoose=require('mongoose');
const schema=mongoose.Schema;
//Create Schema
const balloonSchema=new schema({
    name:String,
    health:Number,
    maxHealth:Number,
    velocity:Number,    
    tapRate:Number,
    scale:Number,
    gravity:Number,
    bounce:Number,
    color:String,
    key:String
})
const playerSchema=new schema({
    fbid:String,
    pass:String,    
    pic:String,
    name: String,
    coins:Number, 
    level:Number,
    levelPercent:Number,
    selectedBalloon:Number,
    onlineMatchs:Number,
    onlineWinnings:Number,
    tournamentMatchs:Number,
    tournamentWinnings:Number,
    tournamentPosition:Number,   
    balloons:[balloonSchema]
});
//Create model and collection is 'playerCollection' an automatic S after collection is added
const playerModel=mongoose.model('playercollection',playerSchema);

module.exports=playerModel;