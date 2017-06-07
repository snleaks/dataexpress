var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {
  console.log("Successful DB Connection.");
});

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  user_level: String,
  email: String,
  age: String,
  ans1: String,
  ans2: String,
  ans3: String
});

var Users = mongoose.model('User_DB', userSchema);

function generateGraph1(){
    var canvas1 = document.getElementById('graph1');
    var ctx1 = canvas1.getContext('2d');

    Users.find({'ans1' : 'Pineapple'}).exec(function(err, results){
        var pineappleCount = results.length;
    });

    Users.find({'ans1' : 'Veggies'}).exec(function(err, results){
        var veggieCount = results.length;
    });

    Users.find({'ans1' : 'Pepperoni'}).exec(function(err, results){
        var pepperoniCount = results.length;
    });

    Users.find({'ans1' : 'Sausage'}).exec(function(err, results){
        var sausageCount = results.length;
    });

    var totalCount = pineappleCount + veggieCount + pepperoniCount + sausageCount;

    var pineapplePercent = (pineappleCount/totalCount) * 100;
    var veggiePercent = (veggieCount/totalCount) * 100;
    var pepperoniPercent = (pepperoniCount/totalCount) * 100;
    var sausagePercent = (sausageCount/totalCount) * 100;

    var responses = [pineapplePercent, veggiePercent, pepperoniPercent, sausagePercent];
    var width = 50; 
    var currentX = 50;
    var base = 200;

    ctx.fillStyle = 'black';
    
    for(var i = 0; i < responses.length; i++){
        var barHeight = responses[i];
        ctx.fillRect(currentX, canvas.height - barHeight, width, barHeight);
        currentX += width + 10;
    }

    ctx1.fillText("Pineapple", 50, 50, 50);
    ctx1.fillText(pineapplePercent + '%', 50, 60, 50);  

    ctx1.fillText("Veggies", 115, 50, 50);
    ctx1.fillText(veggiePercent + '%', 115, 60, 50);  

    ctx1.fillText("Pepperoni", 170, 50, 50);
    ctx1.fillText(pepperoniPercent + '%', 170, 60, 50);  

    ctx1.fillText("Sausage", 235, 50, 50);
    ctx1.fillText(sausagePercent + '%', 235, 60, 50);  
}


function generateGraph2(){
    var canvas2 = document.getElementById('graph2');
    var ctx2 = canvas2.getContext('2d');

    Users.find({'ans2' : 'Breakfast'}).exec(function(err, results){
        var bfastCount = results.length;
    });

    Users.find({'ans2' : 'Lunch'}).exec(function(err, results){
        var lunchCount = results.length;
    });

    Users.find({'ans2' : 'Dinner'}).exec(function(err, results){
        var dinnerCount = results.length;
    });


    var totalCount = bfastCount + lunchCount + dinnerCount;

    var bfastPercent = (bfastCount/totalCount) * 100;
    var lunchPercent = (lunchCount/totalCount) * 100;
    var dinnerPercent = (dinnerCount/totalCount) * 100;

    var responses = [bfastPercent, lunchPercent, dinnerPercent];
    var width = 50; 
    var currentX = 50;
    var base = 200;

    ctx.fillStyle = 'black';
    
    for(var i = 0; i < responses.length; i++){
        var barHeight = responses[i];
        ctx.fillRect(currentX, canvas.height - barHeight, width, barHeight);
        currentX += width + 10;
    }

    ctx.fillText("Breakfast", 50, 50, 50);
    ctx.fillText(bfastPercent + '%', 50, 60, 50);  

    ctx.fillText("Lunch", 115, 50, 50);
    ctx.fillText(lunchPercent + '%', 115, 60, 50);  

    ctx.fillText("Dinner", 170, 50, 50);
    ctx.fillText(dinnerPercent + '%', 170, 60, 50);  

}


function generateGraph3(){
    var canvas3 = document.getElementById('graph3');
    var ctx3 = canvas3.getContext('2d');

    Users.find({'ans3' : 'Water'}).exec(function(err, results){
        var waterCount = results.length;
    });

    Users.find({'ans3' : 'Soda'}).exec(function(err, results){
        var sodaCount = results.length;
    });

    Users.find({'ans3' : 'Juice'}).exec(function(err, results){
        var juiceCount = results.length;
    });

    Users.find({'ans3' : 'SweetTea'}).exec(function(err, results){
        var sweetTeaCount = results.length;
    });

    var totalCount = waterCount + sodaCount + juiceCount + sweetTeaCount;

    var waterPercent = (waterCount/totalCount) * 100;
    var sodaPercent = (sodaCount/totalCount) * 100;
    var juicePercent = (juiceCount/totalCount) * 100;
    var sweetTeaPercent = (sweetTeaCount/totalCount) * 100;

    var responses = [waterPercent, sodaPercent, juicePercent, sweetTeaPercent];
    var width = 50; 
    var currentX = 50;
    var base = 200;

    ctx.fillStyle = 'black';
    
    for(var i = 0; i < responses.length; i++){
        var barHeight = responses[i];
        ctx.fillRect(currentX, canvas.height - barHeight, width, barHeight);
        currentX += width + 10;
    }

    ctx.fillText("Water", 50, 50, 50);
    ctx.fillText(waterPercent + '%', 50, 60, 50);  

    ctx.fillText("Soda", 115, 50, 50);
    ctx.fillText(sodaPercent + '%', 115, 60, 50);  

    ctx.fillText("Juice", 170, 50, 50);
    ctx.fillText(juicePercent + '%', 170, 60, 50);  

    ctx.fillText("Sweet Tea", 235, 50, 50);
    ctx.fillText(sweetTeaPercent + '%', 235, 60, 50);  
}

generateGraph1();
generateGraph2();
generateGraph3();
