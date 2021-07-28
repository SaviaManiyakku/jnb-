video="";
status=""
objects=[];

function preload(){
}

function setup(){
canvas = createCanvas(480,530);
canvas.center();
video = createCapture(VIDEO);
video.hide();
}


function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Object    ";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
console.log(results);
objects = results;
}

function draw(){
    image(video,0,0,480,530);
    if(status !=""){
        objectDetector.detect(video,gotResult);
    for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML ="Status : Objects Detected;";
    document.getElementById("number_of_objects").innerHTML ="Number of objects detected :" + objects.length;
    fill("#9bc9c6");
    percent=floor(objects[i].confidence * 100);
    text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y +15);
    noFill();
    stroke("#9bc9c6");
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
    }
    }