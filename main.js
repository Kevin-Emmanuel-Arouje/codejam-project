leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotPoses);
}

function gotPoses(results) {
    if(!results) {
        return;
    }
    if (results.length > 0) {
        console.debug(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.debug("leftWrist-X=", leftWristX , "leftWrist-Y= " , leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.debug("rightWrist-X=", rightWristX , "rightWrist-Y=" , rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}

function modelloaded() {
    console.log("posenet initialised");
}

function preload() {
    song = loadSound("music.mp3");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    const speedElem="speed-val"

    if (scoreRightWrist > 0.2) {
        console.log("RightWristY", rightWristY);
        circle(rightWristX, rightWristY, 20);
        speedLabel = Math.floor(rightWristY/100); // Math.floor(speedLabel);
        document.getElementById(speedElem).innerHTML="speed= " + speedLabel;
        speedRate=song.rate(speedLabel);
        //consol1e.trace("speed elem", document.getElementById("speed-val"));
        /*if (rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5);
            document.getElementById(speedElem).innerHTML = "speed= 0.5x";
        } else if (rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);
            document.getElementById(speedElem).innerHTML = "speed= 1x";
        } else if (rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5);
            document.getElementById(speedElem).innerHTML = "speed= 1.5x";
        } else if (rightWristY > 300 && rightWristY <= 400) {
            song.rate(2);
            document.getElementById(speedElem).innerHTML = "speed= 2x";
        } else if (rightWristY > 400 && rightWristY <= 500) {
            song.rate(2.5);
            document.getElementById(speedElem).innerHTML = "speed= 2.5x";
        }*/
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        numberLeftWristY = Number(leftWristY);
        removeDecimals = floor(numberLeftWristY);
        volume = removeDecimals / 500;
        document.getElementById("volume-label").innerHTML = "volume =" + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.setVolume(0);
}