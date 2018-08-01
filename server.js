//connect to DB
const mongoose=require('mongoose');
// const ads=require('./Models/ads');
const tournament=require('./Models/tournament');
const player=require('./Models/player');
const matchModel=require('./Models/match');
const gameData=require('./Models/gameData');
mongoose.connect('mongodb://localhost/BalloonsDB');
mongoose.Promise=global.Promise;//Es6 Promises overrides mongoose promise       
//Just listen to even once 
const connecting=mongoose.connection.once('open',function(){
    console.log("Connection has been made Lets Roll");
}).on('error',function(){
    console.log("Connection error".error);    
});
// ballons
allBalloons =[
    airBalloon={
        name:"Air Balloon",
        price: 10000,
        health:100,
        maxHealth:500,
        velocity:200,                    
        tapRate:2000,
        scale:.6,
        gravity:0,
        bounce:.9,
        color:0xff0000,
        key:'balloon'
    },
    oxyBalloon={
        name:"Oxygen Balloon",
        price: 20000,
        health:130,
        maxHealth:600,
        velocity:300,
        tapRate:1800,
        scale:.7,
        gravity:30,
        bounce:.7,
        color:0x800000,
        key:'balloon'
    },
    argonBalloon={
        name:"Argon Balloon",
        price: 136000,
        health:80,
        maxHealth:400,
        velocity:400,                    
        tapRate:1000,
        scale:.5,
        gravity:80,
        bounce:.1,
        color:0x008080,
        key:'balloon'
    },
    benzeneBalloon={
        name:"Benzene Balloon",
        price: 3000000,
        health:500,
        maxHealth:1400,
        velocity:100,
        tapRate:2000,
        scale:1.2,
        gravity:300,
        bounce:.05,
        color:0xffff00,
        key:'balloon'
    },
    co2Balloon={
        name:"CO2 Balloon",
        price: 50000,
        health:120,
        maxHealth:800,
        velocity:500,
        tapRate:1400,
        scale:.8,
        gravity:120,
        bounce:.6,
        color:0xfffff0,
        key:'balloon'
    },
    chlorineBalloon={
        name:"Chlorine Balloon",
        price: 1000000,
        health:200,
        maxHealth:1800,
        velocity:400,
        tapRate:2200,
        scale:.8,
        gravity:-30,
        bounce:.5,
        color:0x83A5D1,
        key:'balloon'
    },
    heliumBalloon={
        name:"Helium Balloon",
        price: 10000000,
        health:300,
        maxHealth:2000,
        velocity:600,
        tapRate:1000,
        scale:.6,
        gravity:-100,
        bounce:1.3,
        color:0x66cccc,
        key:'balloon'
    },
    hydrogenBalloon={
        name:"Hydrogen Balloon",
        price: 20000000,
        health:400,
        maxHealth:2500,
        velocity:700,
        tapRate:500,
        scale:1.3,
        gravity:-200,
        bounce:.01,
        color:0x000000,
        key:'balloon'
    },
]; 
//Mongo DB functions
function sortExample(){
    //sort player based on scale and sort sorted data based on position -1 for desc 1 for desc
    //when sorting large data use the following technique    
    var start=new Date();
    var sort=player.aggregate([
        {$sort:{scale:-1,position:1}}
    ]
    );
    sort.options={allowDiskUse:true};
    sort.exec(function(err,result){
        if(err){console.log(err)}
        else{
            console.log("Sort");// console.log(result);            
            var end=new Date();
            console.log("Time Required "+(end-start));
        }        
    });
}
function sortNRecursionInsert(){
    //Sort and push them to new DB with indexing
    var date=new Date();
    var sortIndex=player.aggregate([
        {$sort:{scale:-1,position:1}}
    ]
    );
    sortIndex.options={allowDiskUse:true};
    sortIndex.exec(function(err,result){
        if(err){console.log(err)}        
        else{
            index = result.findIndex(x => x.name=="p28362");            
            console.log("index is "+index);            
  
            //recursion input
            function inputData(pos){
                data=new rank({
                    position:pos,
                    name:result[pos].name,                    
                });
                data.save().then(function(last){
                    // console.log(pos);
                    pass=last.position+1;
                    if(pass<result.length){inputData(pass);}
                    else{
                        console.log("Completed");
                        now=new Date();
                        console.log("Difference is"+(now-date));
                    }
                });

            }
            inputData(0);
            //DB input many            
        }             
    });
}
function sortNInsertMany(){
    //Sort and push them to new DB with indexing
    var date=new Date();
    var sortIndex=player.aggregate([
        {$sort:{scale:-1,position:1}}
    ]
    );
    sortIndex.options={allowDiskUse:true};
    sortIndex.exec(function(err,result){
        if(err){console.log(err)}        
        else{                      
            //DB input many
            start=new Date();
            rank.insertMany(result).then(function(docs) {
                console.log("inserted");
                end=new Date();
                console.log("Time required "+(end-start));
            })
            .catch(function(err) {
                console.log(err)
            });                     
            console.log("This was called later but displayed before");            
        }             
    });
}
function findExample(){
    start=new Date();
    player.find().limit(5000).then(function(result){
        end=new Date();
        console.log("found time needed "+(end-start));
    });

}
function matchExample(){
    //find matching property (by scale) and group them by property
    player.aggregate([
        {$match:{scale:2}},
        {$group:{_id:"$position",Total:{$sum:1}}}
    ],function(err,result){
        if(err){cosole.log(err)}
        else{console.log(result);}
    });
}
function groupExample(){
    // group players total based on property  
    
    player.aggregate([
        {
            $group:{
                _id:'$scale',
                total:{$sum:1}//find sum based on scales 1 for sum
            }
        }
    ],function(err,result){
        if(err){console.log(err);}
        else{
            console.log(result);
        }
    });
}
function inputData(){
    for(var i=0;i<20000;i++){
        p=new player(
            {
                name:"p"+i,
                scale:Math.floor(Math.random()*5),
                position:Math.floor(Math.random()*50),
            }
        );
        p.save().then(function(){
            date=new Date();            
        })
    }    
}
function dropCollection(){
    mongoose.connection.collections.playercollections.drop(function(){
        console.log("Dropped the Player collection");
    });        
}
function findIndex(){
    start=new Date();
    player.find().then(function(result){
        mid=new Date();
        index = result.findIndex(x => x.name=="p28362");            
        end=new Date();
        console.log("index is "+index +" Time to get data "+(mid-start)+" Time to find "+(end-mid));
    }); 
}
function requestData(socket,i,p){
    
}


var server = require('http').createServer();
var io = require('socket.io')(server);
var roomno=1,activePlayers=0,availableRooms=[];
var password="junanBurns";
var match={gameCode:12429,players:0,requestTime:Date,matchNo:String,level:1000,playersInfo:[]}

gameData.findOne().then(function(result){
    if(result!=null){        
        match.matchNo=result.matchNo;
        console.log("players "+match.matchNo);
    }else{
        gd=new gameData(
            {
                tournamentNo:1,
                matchNo:1
            }
        );
        gd.save().then(function(){
            console.log("players "+match.players);
        })
    }
});
//when connection is made fire the callback function
io.sockets.on('connection',function(receivedSocket){
    console.log('made socket connection with id'+receivedSocket.id);    
    // receivedSocket.emit('trnmnt',"tournmasdadasdadsf dsaf 23324");
    activePlayers++;
    receivedSocket.on('statsInfo',function(data){
        if(data.password=password){
            stats={
                active:activePlayers,                
            }
            receivedSocket.emit('data',stats);            
        }        
    });
    receivedSocket.on('checkConnection',function(){                
        receivedSocket.emit('connected2Server');
    });
    receivedSocket.on('checkUser',function(data){
        // console.log("Checking user "+data);        ;
        player.findOne({fbid:data}).then(function(result){
            console.log("check User called");
            if(result ==null){
                userStats={newUser:true};
                console.log("NEW USER");
            }else{
                userStats=result;
                userStats.newUser=false;
                // console.log(userStats);
                console.log("OLD USER");
            }
            receivedSocket.emit('userStatus',userStats);
        });      
    });
    receivedSocket.on('newPlayer',function(data){ 
        console.log("New player");
        data.pass=Date.parse(new Date());
        data.onlineMatchs=0,data.onlineWinnings=0,        
        data.tournamentMatchs=0,data.tournamentWinnings=0;
        data.tournamentPosition=0;
        newPlayer=new player(data);
        newPlayer.save().then(function(){
            console.log(newPlayer);
            console.log("Saved data");
        });
        receivedSocket.emit('newPlayer',data);       
    });
    receivedSocket.on('myInfo',function(data){   
        console.log("My INfo")       ;     
        player.findOne({id:data.id,pass:data.pass}).then(function(result){
            if(result !=null){
                receivedSocket.emit('yourInfo',result);
            }            
        });              
    });
    receivedSocket.on('updateMyInfo',function(data){   
        console.log("My INfo updates")       ;     
        player.findOne({id:data.id,pass:data.pass}).then(function(result){
            if(result !=null){
                if((data.coins-result.coins)<8000){result.coins=data.coins;}
                result.level=data.level;
                result.levelPercent=data.levelPercent;
                result.selectedBalloon=data.selectedBalloon;
                result.save();
            }            
        });              
    });
    receivedSocket.on('addBalloon',function(data){
        console.log("add ballon executed"); 
        player.findOne({fbid:data.fbid,pass:data.pass}).then(function(result){
            if(result!=null){
                // console.log(allBalloons[0]);
                // console.log(data.balloonIndex);
                result.balloons.push(allBalloons[data.balloonIndex]);
                result.coins-=allBalloons[data.balloonIndex].price;
                result.save().then(function(){
                    console.log("Added balloon")
                });
            }
        });
    });
    receivedSocket.on('modifyMyBalloons',function(data){
        player.findOne({fbid:data.fbid,pass:data.pass}).then(function(result){
            if(result !=null){
                result.coins-=data.price;
                result.balloons[data.index].health=data.health;
                result.balloons[data.index].velocity=data.velocity;
                result.balloons[data.index].scale=data.scale;
                result.balloons[data.index].tapRate=data.tap;
                result.save().then(function(){
                    console.log("Modified balloon balloon")
                });
            }
        });
    });
    receivedSocket.on('ArcadeFinish',function(data){
        console.log("Arcade finish");                          
        player.findOne({fbid:data.fbid,pass:data.pass}).then(function(ans){
            if(ans!=null){
                ans.coins+=data.level*200;                             
                if(ans.levelPercent>=80){ans.level++;ans.levelPercent=0}
                else{ans.levelPercent+=20}            
                ans.save();
                console.log("saved arde data");
            }            
        });                            
    });
    receivedSocket.on('onlineMatch',function(data){
        console.log("Online match");
        console.log(data);
        match.requestTime=new Date;
        if(match.players==0){
            match.requestTime=new Date;
        }               
        if(match.players!=2){        
            receivedSocket.join('OM-'+match.matchNo);
            match.playersInfo.push(data);
            if(data.level<match.level){match.level=data.level} 
            player.findOne({fbid:data.fbid}).then(function(user){
                if(user !=null){
                    user.coins-=1000;
                    user.onlineMatchs++;
                    user.save().then(function(err){
                        if(err)console.log(err);
                        player.findOne({fbid:data.fbid}).then(function(user2){
                            console.log("Coins after saving"+user2.coins);
                        });
                    });
                    console.log("Coins user"+user.coins);
                }else{
                    console.log("No user found");
                }                
            });
            
            match.players++;
            console.log("player connected ");
            console.log(match.level);
            console.log(match.matchNo);
        }
        if(match.players>=2){
            console.log(match.matchNo);
            io.sockets.in('OM-'+match.matchNo).emit('OMReady',match);
            md=new matchModel({
                type:'Online Match',
                id:match.matchNo,
                level:match.level,
                requestTime:match.requestTime,                
            });
            md.save();
            gameData.findOne().then(function(result){
                result.matchNo++;
                result.save();
            });
            match.matchNo++;
            match.players=0; 
            match.playersInfo=[];
            match.gameCode=Math.floor((Math.random() * 29999) + 9819);
            console.log(match.gameCode);
            //Math.floor((Math.random() * range) + start)
        }        
    });
    receivedSocket.on('OMUpdate',function(data){
        //check if clients is in the given room
        io.of('/').in('OM-'+data.matchNo).clients((error, clients) => {
            if (error) throw error;
            else{
                // console.log(clients);
            }
        });        
        io.sockets.in('OM-'+data.matchNo).emit('OMUpdate',data);
    });
    receivedSocket.on('OMFinish',function(data){
        console.log("om finish");        
        io.sockets.in('OM-'+data.matchNo).emit('OMFinish',data);
        console.log("om finish sent data");    
        matchModel.findOne({id:data.matchNo}).then(function(result){
            console.log("data value "+data.matchNo);
            switch(data.position){
                case 1:
                    console.log("pos1 with id "+data.fbid+" result pos 1 "+result.pos1); 
                    if(result.pos1==null){
                        result.pos1=data.fbid;
                        player.findOne({fbid:data.fbid}).then(function(ans){
                            ans.coins+=3000;                             
                            if(ans.levelPercent>=80){ans.level++;ans.levelPercent=0}
                            else{ans.levelPercent+=20}
                            ans.onlineWinnings++;                            
                            ans.save();
                        });
                    } break;
                case 2: 
                    if(result.pos2==null){
                        result.pos2=data.fbid;
                        player.findOne({fbid:data.fbid}).then(function(ans){
                            ans.coins+=1500;
                            ans.save();
                        });
                    } break;
                case 3: 
                    if(result.pos3==null){
                        result.pos3=data.fbid;
                        player.findOne({fbid:data.fbid}).then(function(ans){
                            ans.coins+=500;
                            ans.save();
                        });
                    } break;
                case 4: 
                    if(result.pos4==null){
                        result.pos4=data.fbid;
                        player.findOne({fbid:data.fbid}).then(function(ans){
                            ans.coins+=500;
                            ans.save();
                        });
                    } break;
            }
            result.save();
        });        
    });
    receivedSocket.on('disconnect',function(data){
        activePlayers--;
        console.log('Disconnected The socket with Id '+receivedSocket.id);
    });
    /*
    //when 3 people are filled increase roomno
    if(users%4==0){roomno++};
    receivedSocket.join('room-'+roomno);//join room
    io.sockets.in('room-'+roomno).emit('inRoom',"you are in room "+roomno);//Send message in particular room
    //console.log("User :"+ users);
    // console.log("room :"+ roomno);
    receivedSocket.roomId="room-"+roomno;
    receivedSocket.on('chat',function(data){
        io.sockets.emit('chat',data);
        console.log("Emitted data"+data.test);
    });
    
    receivedSocket.on('typing',function(data){
        receivedSocket.broadcast.emit('typing',data);
    });
    receivedSocket.on('chat420',function(data){
        console.log(data);
        console.log("Working");
    });
    
    //get all clients of namespace '/'
    io.of('/').clients((error, clients) => {
        if (error) throw error;
        // console.log("Clients All : "+clients);
        // console.log("Total clients: "+clients.length);
    });
    //get all clients in 1room-1' of namespace '/' 
    io.of('/').in('room-1').clients((error, clients) => {
        if (error) throw error;
        // console.log("Clients in room-1: "+ clients);
    });
    */
    
});

server.listen(65080);
