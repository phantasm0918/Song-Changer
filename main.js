function setup(){
    C1 = createCanvas(500 , 400)
    C1.center()
    vid = createCapture(VIDEO )
    vid.hide()
    myModel = ml5.poseNet(vid, modelLoaded)
    myModel.on('pose', gotPoses)
}

function modelLoaded(){
    console.log("Model is loaded.")
}

SongStatus1 = ""
SongStatus2 = ""
song1 = ""
song2 = ""

LWX=0
RWX=0
LWY=0
RWY=0
LScore = 0
RScore = 0

function preload(){
    song1 = loadSound("music1.mp3")
    song2 = loadSound("music2.mp3")
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        LWX = results[0].pose.leftWrist.x
        RWX = results[0].pose.rightWrist.x
        LWY = results[0].pose.leftWrist.y
        RWY = results[0].pose.rightWrist.y
        LScore = results[0].pose.keypoints[9].score
        RScore = results[0].pose.keypoints[10].score
        console.log("Left wrist X :", LWX)
        console.log("Right wrist X :", RWX)
        console.log("Left wrist Y :", LWY)
        console.log("Right wrist Y :", RWY)
        console.log("Left wrist score : ", LScore)
        console.log("Right wrsit score : ", RScore)
    }
}



function draw(){
    image(vid , 0 ,0 , 500 ,450)
    fill("red")
    SongStatus1 = song1.isPlaying()
    SongStatus2 = song2.isPlaying()
    if(LScore>0.2){
      circle(LWX,LWY,20)
      song2.stop()
      if(SongStatus1 == false){
        song1.play()
        document.getElementById("song").innerHTML = "Instrumental is playing"
      }
    }
    if(RScore>0.2){
        circle(RWX,RWY,20)
        song1.stop()
        if(SongStatus2 == false){
            song2.play()
            document.getElementById("song").innerHTML = "Peter Pan is playing "
        }
    }
}



function play(){
    song1.play()
    song2.play()
}



