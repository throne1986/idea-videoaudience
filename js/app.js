//define global variables
var welcomeMovie1 = "./videos/powitania/przywitanie_10-22_konto.mp4"
var welcomeMovie2 = "./videos/powitania/przywitanie_10-22_konto.mp4"
var welcomeMovie3 ="./videos/powitania/przywitanie_10-22_konto.mp4"
var messageTime;

var messageTime = new Date().getHours();
var welcomeMsg = "";
var vid = " ";
var autoplay = false;

//if statements to play a video a certain time in a day .
if (messageTime >= 5 && messageTime < 10) {
    welcomeMsg = "early bird";
    vid = welcomeMovie1;
} else
if (messageTime >= 10 && messageTime < 22) {
    welcomeMsg = "middle of day";
    vid = welcomeMovie2;
} else
if (messageTime >= 22 || messageTime < 5) {
    welcomeMsg = "night owl";
    vid = welcomeMovie3;
}
////}, 1000 * 60);

//call the function to play a video
playVideo(vid);

console.log("Hello! Your welcome message is " + welcomeMsg + " " + vid)
// promise function to create custom video controls and play functions
function playVideo(src) {
    console.log("Hello! Your welcome message is " + welcomeMsg + " " + vid)
    $("#playervideo").attr("src", src);
    $("#playervideo")[0].muted = false;

    if (autoplay == true) {

        var playPromise = $("#playervideo")[0].play();

        if (playPromise !== undefined) {

            playPromise.then(function() {}).catch(function() {

                if (autoplay == false) {
                    $("#video-unmute-button").addClass("show");
                    $("#playervideo")[0].muted = true;
                    var playPromise2 = $("#playervideo")[0].play();

                    playPromise2.then(function() {

                    }).catch(function() {
                        $("#video-start-button").addClass("show");


                        $("#video-start-button").on("click", function() {
                            $("#playervideo")[0].muted = false;
                            $("#playervideo")[0].play();
                            $("#video-start-button").removeClass("show");

                        });
                    });

                    console.log("pause force");
                } else {

                }
            });
        } else {}
    } else {

    }

}

// call windows resize function when document is ready.
$(document).ready(function() {
    $(window).resize(resizeIframe);
    $(window).resize();

});

// creating resizeIframe for iframe and video control responsiveness
function resizeIframe() {
    console.log($("iframe#playervideo").width() * 576 / 1024);
    $("iframe#playervideo").height($("iframe#playervideo").width() * 576 / 1024);
}

// document.getElementsByTagName("video").style.height="100%";
// document.getElementsByTagName("video").style.width="100%";
