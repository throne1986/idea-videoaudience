   // creating stage variables for animation
   var stage = null;
   var timeline = null;

   var audioArray = [];

   var autoplay = true;

   //    var moviePowitalny = "https://skodavideo.s3-eu-west-1.amazonaws.com/skoda_gos_1168_m_11549.mp4";
   //    var movieClient_name1 = "./videos/formularz_1/imie_wpisz_swoje_imie_gest.mp4"
   //    var movieClient_name2 = "./videos/formularz_1/imie_to_proste_wpisz_swoje_imie.mp4"
   //    var movieClient_name3 = "./videos/formularz_1/imie_imie.mp4"
   //    var movieCzekanie ="./videos/formularz_1/czekanie.mp4"
   //    var movieClient_surname1 = "./videos/formularz_1/nazwisko_a_teraz_wpisz_nazwisko.mp4"
   //    var movieClient_surname2 = "./videos/formularz_1/client_surname_wpisz_swoje_client_surname.mp4"
   //    var movieClient_surname3 = "./videos/formularz_1/client_surname_client_surname.mp4"
   //    var movieNip1 = "./videos/formularz_1/nip_nip.mp4"
   //    var movieClient_code1 = "./videos/formularz_1/kod_pocztowy_kod_pocztowy.mp4"
   //    var movieClient_email1 ="./videos/formularz_1/email_adres_email.mp4"
   //    var movieThanks = "./videos/formularz_1/wyslij.mp4"


   var moviePowitalny = "https://skodavideo.s3-eu-west-1.amazonaws.com/skoda_gos_1168_m_11549.mp4";
   var movieCzekanie = "./videos/formularz_1/czekanie.mp4"
   var movieClient_name1 = "./videos/formularz_1/formularz_imie_long_3.mp4"
   var movieClient_nameError = "./videos/formularz_1/blad_kod_pocztowy.mp4"
   var movieClient_name2 = "./videos/formularz_1/imie_to_proste_wpisz_swoje_imie.mp4"
   var movieClient_name3 = "./videos/formularz_1/imie_imie.mp4"
   var movieClient_surname1 = "./videos/formularz_1/formularz_nazwisko_long.mp4"
   var movieClient_surname2 = "./videos/formularz_1/client_surname_wpisz_swoje_client_surname.mp4"
   var movieClient_surname3 = "./videos/formularz_1/client_surname_client_surname.mp4"
   var movieClient_mobile1 = "./videos/formularz_1/formularz_nr_telefonu_long.mp4"
   var movieClient_email1 = "./videos/formularz_1/formularz_email_long.mp4"
   var movieClient_code1 = "./videos/formularz_1/formularz_kod_pocztowy_long.mp4"
   var movieNip1 = "./videos/formularz_1/formularz_nip_long.mp4"
   var movieCheckbox = "./videos/formularz_1/formularz_zgody_long.mp4"
   var movieThanks = "./videos/formularz_1/wyslij.mp4"

   // files containing inputs variables
   var JSON = [{
           "client_name": "kurwa"
       },
       {
           "client_name": "Spierdalaj"
       },
       {
           "client_name": "dupa"
       },
       {
           "client_name": "pojebany"
       }
   ];
   var hasMatch = false;



   function init() {
       //define global variables
       var welcomeMovie1 = "./videos/formularz_1/przywitanie_5-10_konto.mp4"
       var welcomeMovie2 = "./videos/formularz_1/przywitanie_5-10_ogolne.mp4"
       var welcomeMovie3 = "./videos/formularz_1/przywitanie_22-5_konto.mp4"
       var messageTime;
       var messageTime = new Date().getHours();
       var welcomeMsg = "";
       var vid = " ";


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

   window.addEventListener("message", receiveMessage, false);

   function receiveMessage(eventPosted) {

       var values = eventPosted.data.split("&");
       console.log(values);
       var event = values[0].split("=")[1];
       var fieldtype = values[1].split("=")[1];
       var value = values[2].split("=")[1];

       console.log(event, fieldtype, value);

       switch (event) {
           case "fieldchanged":
               switch (fieldtype) {
                   case "client_name":
                       openSlide("client_nameSlide", {
                           value: value
                       });
                       break;
                   case "client_surname":
                       openSlide("client_surnameSlide", {
                           value: value,
                       });
                       break;
                   case "nip":
                       openSlide("nipSlide", {
                           value: value,
                       });
                       break;
                   case "client_code":
                       openSlide("client_codeSlide", {
                           value: value,
                       });
                       break;
                   case "client_email":
                       openSlide("client_emailSlide", {
                           value: value,
                       });
                       break;
                   case "client_mobile":
                       openSlide("client_mobileSlide", {
                           value: value,
                       });
                       break;
                   case "send_data":
                       openSlide("submitSlide", {
                           value: value,
                       });
                       break;
                   case "check_all":
                       openSlide("checkboxSlide", {
                           value: value,
                       });
                   default:
                       break;
               }
               break;
           case "ontyping":
               switch (fieldtype) {
                   case 'client_name':
                       openSlide("client_nameSlideTyping", {
                           value: value
                       });
                       break;
                   default:

               }
               break;

           default:
               console.log("Event not supported");
               break;
       }

   }

   function openSlide(slideName, params) {
       switch (slideName) {
           case "powitalny":
               openPowitalny(params);
               break;
           case "client_nameSlide":
               openClient_name(params);
               break;
               //    case "client_nameSlideTyping":
               //         openClient_nameTyping(params);
               //        break;
           case "client_surnameSlide":
               openclient_surname(params);
               break;
           case "nipSlide":
               openNip(params);
               break;
           case "client_codeSlide":
               openClient_code(params);
               break;
           case "client_emailSlide":
               openClient_email(params);
               break;
           case "client_mobileSlide":
               openClient_mobile(params);
               break;

           case "submitSlide":
               openSubmit(params);
               break;
           case "checkboxSlide":
               opencheckbox_all(params);
               break;
       }

   }
   var sampleImage = null;
   var imageLoaded = false;
   var sound = null;
   var params = null;
   var audioLoaded = false;


   // when video ends catch it and close iframe

   $(document).ready(function () {
       var md = new MobileDetect(window.navigator.userAgent);
       // id of video
       var vid = document.getElementById("playervideo");
       if (vid.onended && md.phone) {
           $("#videoframe").hide();
           $("#playervideo").hide();
           alert("has ended");
           console.log(md);
       }
   });

//    $(document).ready(function () {
//         var vid = document.getElementById("playervideo");
//         var md = new MobileDetect(window.navigator.userAgent);
//         vid.onended = function() {
//             $("#videoframe").hide();
//            $("#playervideo").hide();
//         };
//     });

   function openClient_name(_params) {
       for (var index = 0; index < JSON.length; ++index) {
           var names = JSON[index];
           if (names.client_name == "kurwa" || names.client_name == "spierdalaj" || names.client_name == "dupa") {
               hasMatch = true;
               playVideo(movieClient_nameError);
               if (!_params.value.length) {
                   playVideo(movieClient_name1);
               } else {
                   playVideo(movieCzekanie);

               }
           }
       }
   }

   //    function openClient_nameTyping(_params){
   //        playVideo(movieCzekanie);
   //    }

   function openclient_surname(_params) {
       if (!_params.value.length) {
           playVideo(movieClient_surname1);
       } else {
           playVideo(movieCzekanie);

       }
   }

   function openClient_mobile(_params) {
       if (!_params.value.length) {
           playVideo(movieClient_mobile1);
       } else {
           playVideo(movieCzekanie);

       }
   }

   function openNip(_params) {
       if (!_params.value.length) {
           playVideo(movieNip1);
       } else {
           playVideo(movieCzekanie);

       }
   }

   function openClient_code(_params) {
       if (!_params.value.length) {
           playVideo(movieClient_code1);
       } else {
           playVideo(movieCzekanie);

       }
   }

   function openClient_email(_params) {
       if (!_params.value.length) {
           playVideo(movieClient_email1);
       } else {
           playVideo(movieCzekanie);

       }
   }

   function opencheckbox_all(_params) {
       playVideo(movieCheckbox);
   }

   function openSubmit(_params) {
       playVideo(movieThanks);
   }

   function openPowitalny(_params) {

       clearAllCanvas();

       params = _params;

       sampleImage = new Image();
       sampleImage.onload = function () {
           imageLoaded = true;
           checkIfAllLoaded();
       }
       sampleImage.src = "images/download.jpg";

       // sound = new Howl({
       //   src: ['audio/1001.mp3']
       // });

       // audioArray['nameStartboard'] = { position:3, howl: sound, duration: 0 };

       // sound.once('load', function(){

       //     sound.seek(0.4);
       //     sound.play();

       //     audioLoaded = true;
       //     checkIfAllLoaded();
       // });





   }

   function checkIfAllLoaded() {
       //if( imageLoaded==true && audioLoaded==true ) {
       if (imageLoaded == true) {
           for (var audio in audioArray) {
               console.log(audio);
               audioArray[audio].duration = audioArray[audio].howl.duration();
               audioArray[audio].state = "paused";
           }

           openPowitalnyContentReady();
       }
   }

   function openPowitalnyContentReady() {

       var circle = new createjs.Shape();
       circle.graphics.beginFill("DeepSkyBlue").drawRect(0, 0, 50, 100);
       circle.x = 100;
       circle.y = 100;
       stage.addChild(circle);

       var circleTween = createjs.Tween.get(circle).to({
           x: 900
       }, 1000, createjs.Ease.getPowInOut(4));
       timeline.addTween(circleTween);


       var obrazek = new createjs.Bitmap(sampleImage);
       obrazek.x = 512;
       obrazek.y = 150;
       obrazek.regX = sampleImage.width / 2;
       obrazek.regY = sampleImage.height / 2;
       stage.addChild(obrazek);

       var obrazekTween = createjs.Tween.get(obrazek).to({
           alpha: 0,
           scale: 0.1
       }, 0).wait(600).to({
           alpha: 1,
           scale: 0.4
       }, 300).wait(4600).to({
           alpha: 0,
           scale: 0.1
       }, 300);
       timeline.addTween(obrazekTween);


       obrazek.addEventListener("click", function () {
           alert("Nie drażnij lwa");
       });


       var text = new createjs.Text(params.value, "bold 30px Arial", "#000000");
       text.x = 1024 / 2;
       text.y = 405;
       text.alpha = 0;
       text.textAlign = "center";
       text.textBaseline = "alphabetic";

       stage.addChild(text);

       var textTween = createjs.Tween.get(text).to({
           alpha: 0
       }, 0, createjs.Ease.elasticOut()).wait(600).to({
           alpha: 1
       }, 300).wait(4600).to({
           alpha: 0
       }, 300, createjs.Ease.elasticIn());
       timeline.addTween(textTween);

       stage.update();

       playVideo(moviePowitalny);
       //playVideo(movie2);

   }

   function clearAllCanvas() {
       // timeline.removeAll();
       stage.removeAllChildren();
       audioArray = []

   }

   function playVideo(src) {


       console.log("--------- playVideo 3");

       $(".fader").addClass("switchvideo");
       console.log("Fade in started: " + $("video")[0].currentTime);
       $(".fader").animate({
           opacity: 1
       }, 333, function () {
           console.log("Fade in finished: " + $("video")[0].currentTime);

           $("#playervideo").attr("src", src);
           $("#playervideo")[0].muted = false;

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

                           console.log("pause force");
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
       console.log("checkVideoReady");
       //  if( $(".fader").hasClass("switchvideo") && !$(".fader").hasClass("fadingout") ) {

       if ($("video")[0].currentTime) {
           if ($("video")[0].currentTime > 0) {

               $("video")[0].removeEventListener("timeupdate", checkVideoReady);

               //  $(".fader").addClass("fadingout");
               console.log("Fade out started: " + $("video")[0].currentTime);
               $(".fader").animate({
                   opacity: 0
               }, 150, function () {
                   console.log("Fade out finished: " + $("video")[0].currentTime);
                   //  $(".fader").removeClass("switchvideo");
                   //  $(".fader").removeClass("fadingout");
               });

           }
       }
       // }

   }