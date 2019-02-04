   // creating stage variables for animation
   var stage = null;
   var timeline = null;

   var audioArray = [];

   var autoplay = true;

   var moviePowitalny = "https://skodavideo.s3-eu-west-1.amazonaws.com/skoda_gos_1168_m_11549.mp4";
   var movieCzekanie1 = "./videos/formularz_1/czekanie_1.mp4"
   var movieClient_name1 = "./videos/formularz_1/imie_to_proste_wpisz_swoje_imie.mp4"
   var movieClient_nameError = "./videos/formularz_1/ojojoj.mp4"
   var movieClient_surnameError = "./videos/formularz_1/ojojoj.mp4"
   var movieClient_name2 = "./videos/formularz_1/imie_to_proste_wpisz_swoje_imie.mp4"
   var movieClient_name3 = "./videos/formularz_1/imie_imie.mp4"
   var movieClient_surname1 = "./videos/formularz_1/formularz_nazwisko_long.mp4"
   var movieClient_surname2 = "./videos/formularz_1/client_surname_wpisz_swoje_client_surname.mp4"
   var movieClient_surname3 = "./videos/formularz_1/client_surname_client_surname.mp4"
   var movieClient_mobile1 = "./videos/formularz_1/formularz_nr_telefonu_long.mp4"
   var movieClient_email1 = "./videos/formularz_1/formularz_email_long.mp4"
   var movieClient_code1 = "./videos/formularz_1/formularz_kod_pocztowy_long.mp4"
   var movieClient_codeError = "./videos/formularz_1/ojojoj.mp4"
   var movieNip1 = "./videos/formularz_1/formularz_nip_long.mp4"
   var movieCheckbox = "./videos/formularz_1/formularz_zgody_long.mp4"
   var movieThanks = "./videos/formularz_1/wyslij.mp4"
   var movieSendData = "./videos/formularz_1/wyslij.mp4"




   function init() {
       //define global variables
       var welcomeMovie1 = "./videos/formularz_1/przywitanie_5-10_konto.mp4"
       var welcomeMovie2 = "./videos/formularz_1/przywitanie_10-22_konto.mp4"
       var welcomeMovie3 = "./videos/formularz_1/przywitanie_22-5_konto.mp4"
       var messageTime;
       var messageTime = new Date().getHours();
       var welcomeMsg = "";
       var vid = " ";


       //if statements to play a video a certain time in a day .
       if (messageTime >= 5 && messageTime < 12) {
           welcomeMsg = "early bird";
           vid = welcomeMovie1;
       } else
       if (messageTime >= 12 && messageTime < 16) {
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

       //  console.log("Hello! Your welcome message is " + welcomeMsg + " " + vid)

   }
   init();

   // creating animation
   $(document).ready(function () {
       stage = new createjs.Stage("videocanvas");
       timeline = new createjs.Timeline();

       createjs.Ticker.framerate = 50;
       createjs.Ticker.addEventListener("tick", tick);

       $(window).resize(resizeFunction);
       $(window).resize();
   });


   // creating ticker function for handling time
   function tick() {
       timeline.gotoAndStop($("#playervideo")[0].currentTime * 6000);

       if ($("#playervideo")[0].currentTime > 2 && $("#playervideo")[0].currentTime < 17) {
           $("#fieldsetForm").css("display", "flex");
       } else {
           $("#fieldsetForm").css("display", "none");
       }

       if ($("#playervideo")[0].currentTime > 2 && $("#playervideo")[0].currentTime < 17) {
           $("#testform").css("display", "flex");


       } else {
           $("#testform").css("display", "none");
       }
       stage.update();

       for (var audio in audioArray) {

           if ($("#playervideo")[0].paused == true || $("#playervideo")[0].muted == true) {
               audioArray[audio].howl.pause();
               audioArray[audio].state = "paused";
           } else {

               if ($("#playervideo")[0].currentTime < audioArray[audio].position) {
                   audioArray[audio].howl.seek(0);
                   audioArray[audio].howl.pause();
                   audioArray[audio].state = "paused";

               } else if ($("#playervideo")[0].currentTime >= audioArray[audio].position && $("#playervideo")[0].currentTime < audioArray[audio].position + audioArray[audio].duration) {

                   console.log(2);

                   if (audioArray[audio].state == "paused") {
                       audioArray[audio].howl.seek($("#playervideo")[0].currentTime - audioArray[audio].position);
                       audioArray[audio].howl.play();
                       audioArray[audio].state = "playing";
                   }
               } else if ($("#playervideo")[0].currentTime > audioArray[audio].position + audioArray[audio].duration) {
                   if (audioArray[audio].state == "playing") {
                       audioArray[audio].state = "paused";
                   }
               }
           }

       }
   }

   function resizeFunction() {
       $("#videowrapper").height($("#videowrapper").width() * 3 / 4);

   }

   var inputsFocusCounters = [];

   window.addEventListener("message", receiveMessage, false);

   function receiveMessage(eventPosted) {

       var values = eventPosted.data.split("&");
       var event = values[0].split("=")[1];
       var fieldtype = values[1].split("=")[1];
       var value = values[2].split("=")[1];
       var result = values[3].split("=")[1];

       switch (event) {
           case "focus":
               if (!inputsFocusCounters[fieldtype]) inputsFocusCounters[fieldtype] = 0;
               inputsFocusCounters[fieldtype]++;
               console.log(inputsFocusCounters[fieldtype]);

               if (inputsFocusCounters[fieldtype] > 1) {
                   sayWaiting();
               } else {
                   sayAbountField(fieldtype);
               }
               //openHitsVideo("client_surnameSlide");
               break;
           case "change":

               switch (result) {
                   case "badword":
                       sayOyOyOy();
                       console.log("iframe: " + event + " / " + fieldtype + " - badword");
                       break;
                   case "error":
                       sayFieldValidationError(fieldtype);
                       console.log("iframe: " + event + " / " + fieldtype + " - error");
                       break;

                       // case "correct":
                       //     console.log("iframe: " + event + " / " + fieldtype + " - correct");
                       //     break;

                   default:

                       break;
               }

               switch (fieldtype) {
                   case "check_all":
                       saycheckAllBoxVideo();
                       break;

               }
               break;

           default:

               break;

       }
   }


   var sayWaitingVideo = "./videos/formularz_1/czekanie_1.mp4";


   var sayFieldNameVideos =[];
   sayFieldNameVideos['client_name'] = "./videos/formularz_1/zaczepka_jeszcze_sie_zastanawiasz_zycie_ucieka_wypelnij_formularz.mp4";
   sayFieldNameVideos['client_name'] = "./videos/formularz_1/wachasz_sie_uzupelnij_formularz_i_zobacz_jak_ideabank_pomaga_przedsiebiorcom.mp4";
   sayFieldNameVideos['client_name'] = "./videos/formularz_1/wow_az_takie_niezdecydowanie.mp4";
   sayFieldNameVideos['client_name'] = "./videos/formularz_1/zakochales_sie_bo_podobno_oni_czasu_nie_licza.mp4";
   

   function sayWaiting() {
       videoElement = document.getElementById('playerVideo');
       var activeVideo = Math.floor(Math.random() * sayFieldNameVideos.length);
       videoElement.src =sayFieldNameVideos[activeVideo];
       videoElement.addEventListener('ended', function(e){
         // update the active video index
            activeVideo = (++activeVideo) % sayFieldNameVideos.length;
            if(activeVideo === sayFieldNameVideos.length){
                activeVideo = 0;
            }
              // update the video source and play
        videoElement.src = sayFieldNameVideos[activeVideo];
          playVideo(videoElement);
       })

   }



   var sayAbountVideos = [];
   sayAbountVideos['client_name'] = "./videos/formularz_1/imie_to_proste_wpisz_swoje_imie.mp4";
   sayAbountVideos['client_surname'] = "./videos/formularz_1/formularz_nazwisko_long.mp4";
   sayAbountVideos['client_mobile'] = "./videos/formularz_1/formularz_nr_telefonu_long.mp4";
   sayAbountVideos['client_email'] = "./videos/formularz_1/formularz_email_long.mp4";
   sayAbountVideos['client_code'] = "./videos/formularz_1/formularz_kod_pocztowy_long.mp4";
   sayAbountVideos['nip'] = "./videos/formularz_1/formularz_nip_long.mp4";

   function sayAbountField(fieldid) {
       console.log(sayAbountVideos[fieldid]);
       playVideo(sayAbountVideos[fieldid]);

   }
   var oyoyoyVideo = "./videos/formularz_1/ojojoj.mp4";

   function sayOyOyOy() {
       playVideo(oyoyoyVideo);
   }
  

   var sayFieldValidationErrorVideos = [];
   sayFieldValidationErrorVideos['client_name'] = "./videos/formularz_1/ojojoj.mp4";
   sayFieldValidationErrorVideos['client_surname'] = "./videos/formularz_1/ojojoj.mp4";
   sayFieldValidationErrorVideos['client_mobile'] = "./videos/formularz_1/blad_numer_telefonu.mp4";
   sayFieldValidationErrorVideos['client_email'] = "./videos/formularz_1/ojojoj.mp4";
   sayFieldValidationErrorVideos['client_code'] = "./videos/formularz_1/blad_kod_pocztowy.mp4";
   sayFieldValidationErrorVideos['nip'] = "./videos/formularz_1/ojojoj.mp4";

   var checkAllBoxVideo = "./videos/formularz_1/zgody_niezbedne_zgody.mp4"

   function saycheckAllBoxVideo() {
       playVideo(checkAllBoxVideo)
   }

   function sayFieldValidationError(fieldid) {
       console.log(sayFieldValidationErrorVideos[fieldid]);
       playVideo(sayFieldValidationErrorVideos[fieldid]);
   }
   var sampleImage = null;
   var imageLoaded = false;
   var sound = null;
   var params = null;
   var audioLoaded = false;


   // when video ends catch it and close iframe

   $(document).ready(function () {

    $("#playervideo")[0].muted = true;

       var md = new MobileDetect(window.navigator.userAgent);

       //alert(md.phone());
       if (md.phone() != null) {
           var vid = document.getElementById("playervideo");
           vid.addEventListener("ended", disableIframeOnPhone);
       }

   });

   function disableIframeOnPhone() {
       // parentpostmessage nie wysyłaj mi sdarzen i ukryj iframe z video
       var vid = document.getElementById("playervideo");
       vid.removeEventListener("ended", disableIframeOnPhone);

       window.parent.postMessage("event=closeiframe", "*");

   }


   function checkIfAllLoaded() {
       if (imageLoaded == true) {
           for (var audio in audioArray) {
               console.log(audio);
               audioArray[audio].duration = audioArray[audio].howl.duration();
               audioArray[audio].state = "paused";
           }

           openPowitalnyContentReady();
       }
   }

   function clearAllCanvas() {
       // timeline.removeAll();
       stage.removeAllChildren();
       audioArray = []

   }

   function playVideo(src) {
       $(".fader").addClass("switchvideo");

       $(".fader").animate({
           opacity: 1
       }, 333, function () {

           $("#playervideo").attr("src", src);
        //    if()
           
           //$("#playervideo")[0].muted = false;
           //if( $("video")[0].muted) {

           //}
console.log($("#playervideo")[0].muted );
           if (autoplay == true) {

               var playPromise = $("#playervideo")[0].play();

               if (playPromise !== undefined) {

                   playPromise.then(function () {
                       $("video")[0].addEventListener("timeupdate", checkVideoReady);

                   }).catch(function () {

                       if (autoplay == true) {
                           $("#video-unmute-button").addClass("show");
                           $("#playervideo")[0].muted = true;
                           var playPromise2 = $("#playervideo")[0].play();

                           playPromise2.then(function () {
                               $("video")[0].addEventListener("timeupdate", checkVideoReady);
                           }).catch(function () {
                               $("#video-start-button").addClass("show");
                               $("#video-start-button").on("click", function () {
                                   $("#playervideo")[0].muted = false;
                                   $("#playervideo")[0].play();
                                   $("#video-start-button").removeClass("show");
                                   $("video")[0].addEventListener("timeupdate", checkVideoReady);

                               });
                           });

                       } else {

                       }
                   });
               } else {

                   $("video")[0].addEventListener("timeupdate", checkVideoReady);

               }
           } else {

           }
       });

   }


   function checkVideoReady() {
       if ($("video")[0].currentTime) {
           if ($("video")[0].currentTime > 0) {

               $("video")[0].removeEventListener("timeupdate", checkVideoReady);

               $(".fader").animate({
                   opacity: 0
               }, 150, function () {});

           }
       }

   }
   var customPlayer = document.getElementById("playervideo");


   $("#customPlayer").on("click", function () {
       customPlayer.currentTime = 0;
       customPlayer.play();

   });


   $("#customPlayerMute").on("click", function () {
       if (customPlayer.muted) {
           customPlayer.muted = false;
           $("#customPlayerMute").hide();
           $("#customPlayerVoice").show();


       } else {
           customPlayer.muted = true;

       }

   })

   $("#customPlayerVoice").on("click", function () {
  
       $("#customPlayerMute").show();
       $("#customPlayerVoice").hide();
       customPlayer.muted = true;
       console.log(customPlayer.muted)
   })





   // $(function() {
   //     $('.form').submit(function(e) {
   //         e.preventDefault();
   //         var isValid = true;
   //         $('.form input, .form textarea, .form select').each(function() {
   //           if ( $(this).val() === '' )
   //               isValid = false;
   //         });
   //         if (isValid) {
   //            playVideo(movieSendData);
   //         }
   //      });
   //    });