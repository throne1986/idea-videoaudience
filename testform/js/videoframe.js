   // creating stage variables for animation
   var stage = null;
   var timeline = null;

   var audioArray = [];

   var autoplay = true;

   var movieCzekanie3 = "./videos/formularz_1/czekanie_3.mp4"
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


   var stateplayer = "przywitanie";

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
       if (messageTime >= 16 || messageTime < 5) {
           welcomeMsg = "night owl";
           vid = welcomeMovie3;
       }
       ////}, 1000 * 60);


       //call the function to play a video
       playVideo(vid);

       //  console.log("Hello! Your welcome message is " + welcomeMsg + " " + vid)
       var autoSelectInputName = document.getElementById('playervideo');
   }
   $(document).ready(function () {


       $(window).resize(resizeFunction);
       $(window).resize();
   });

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

               lastFocusedField = fieldtype;
               waitingState = "saying";
               //    if (!inputsFocusCounters[fieldtype]) inputsFocusCounters[fieldtype] = 0;
               //    inputsFocusCounters[fieldtype]++;
               //    console.log(inputsFocusCounters[fieldtype]);

               //    if (inputsFocusCounters[fieldtype] > 1) {
               //        sayWaiting();
               //    } else {
               sayAbountField(fieldtype);
               // }
               //openHitsVideo("client_surnameSlide");
               break;
           case "change":
               switch (fieldtype) {
                   case "check_all":
                       saycheckAllBoxVideo();
                       break;

               }

               break;

           case "blur":

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

           case "keyup":
               sayWaiting();

               break;
           case "mouseleave":
               privacyPolicy();

               break;
           default:
               break;

       }
   }


   var sayWaitingVideo = "./videos/formularz_1/czekanie_1.mp4";


   var sayFieldNameVideos = [];
   sayFieldNameVideos['client_name'] = [
       "./videos/formularz_1/zaczepka_jeszcze_sie_zastanawiasz_zycie_ucieka_wypelnij_formularz.mp4",
       "./videos/formularz_1/wachasz_sie_uzupelnij_formularz_i_zobacz_jak_ideabank_pomaga_przedsiebiorcom.mp4",
       "./videos/formularz_1/wow_az_takie_niezdecydowanie.mp4",
       "./videos/formularz_1/zakochales_sie_bo_podobno_oni_czasu_nie_licza.mp4"
   ];
   sayFieldNameVideos['client_surname'] = [
       "./videos/formularz_1/zaczepka_no_to_nie_jest_takie_trudne.mp4",
       "./videos/formularz_1/nazwisko_wpisz_swoje_nazwisko.mp4",
       "./videos/formularz_1/uzupelnij_formularz_i_wyslij_potem_jeszcze_porozmawiamy.mp4",
   ];
   sayFieldNameVideos['client_mobile'] = [
       "./videos/formularz_1/nr_telefonu_zapomniales_o_numerze_telefonu_wpisz_go_zebysmy_mogli_sie_z_toba_skonaktowac.mp4",
       "./videos/formularz_1/blad_numer_telefonu.mp4",
       "./videos/formularz_1/uzupelnij_pola_i_wyslij_formularz_a_ja_zaraz_wroce_do_ciebie.mp4",
   ];
   sayFieldNameVideos['client_email'] = [
       "./videos/formularz_1/nie_chcesz_podac_danych_porozmawiajmy_dalej.mp4",
   ];
   sayFieldNameVideos['client_code'] = [
       "./videos/formularz_1/kod_pocztowy_wpisz_kod_pocztowy.mp4",
       "./videos/formularz_1/uzupelnij_formularz_i_wyslij_potem_jeszcze_porozmawiamy.mp4",
       "./videos/formularz_1/wachasz_sie_uzupelnij_formularz_i_zobacz_jak_ideabank_pomaga_przedsiebiorcom.mp4",
   ];
   sayFieldNameVideos['nip'] = [
       "./videos/formularz_1/nip_na_pewno_znasz_nip_swojej_firmy.mp4",
       "./videos/formularz_1/zapomniales_nipu.mp4",
       "./videos/formularz_1/nip_jeszcze_wpisz_nip_swojej_firmy.mp4"
   ];


   var sayPrivacyPolicyVideos = "./videos/formularz_1/zgody_zaznacz_prosze_niezbedne_zgody.mp4"
   var sayPolicyVideos = [
       "./videos/formularz_1/zgody_niezbedne_zgody.mp4",
       "./videos/formularz_1/zgody_zaznacz_niezbedne_zgody_a_ja_zaraz_wroce_do_ciebie_i_porozmawiamy_dalej.mp4",
   ];

   function privacyPolicyWaiting() {
       if (waitingState == 'saying') {
           videoElementPlayer = document.getElementById('playervideo');
           var randomPolicyVideo = Math.floor(Math.random() * sayPolicyVideos.length);
           console.log(randomPolicyVideo);
           playVideo(sayPolicyVideos[randomPolicyVideo]);
       } else if (waitingState == "notsaying") {
           playVideo(movieCzekanie3);
           console.log(waitingState);
           waitingState = "saying";
       }
   }


   function privacyPolicy() {
       playVideo(sayPrivacyPolicyVideos);
       document.getElementById('playervideo').addEventListener('ended', function (e) {
           if (stateplayer == "powitanie") {
               stateplayer = "zaczepki";
               setTimeout(function () {
                   privacyPolicyWaiting();
               }, 2000);
           } else if (stateplayer == "zaczepki") {
               stateplayer = "zaczepki";
               setTimeout(function () {
                   privacyPolicyWaiting();
               }, 2000);
           } else {
               privacyPolicyWaiting();

           }
       });


   }

   function sayWaiting() {
       if (waitingState == 'saying') {
           videoElement = document.getElementById('playervideo');
           var activeVideo = Math.floor(Math.random() * sayFieldNameVideos[lastFocusedField].length);
           console.log(activeVideo);
           playVideo(sayFieldNameVideos[lastFocusedField][activeVideo]);
           waitingState = "notsaying";
       } else if (waitingState == "notsaying") {
           playVideo(movieCzekanie3);
           console.log(waitingState);
           waitingState = "saying";
       }
   }

   var sayAbountVideos = [];
   sayAbountVideos['client_name'] = "./videos/formularz_1/imie_to_proste_wpisz_swoje_imie.mp4";
   sayAbountVideos['client_surname'] = "./videos/formularz_1/nazwisko_a_teraz_wpisz_nazwisko.mp4";
   sayAbountVideos['client_mobile'] = "./videos/formularz_1/nr_telefonu_podaj_numer_telefonu.mp4";
   sayAbountVideos['client_email'] = "./videos/formularz_1/email_adres_email.mp4";
   sayAbountVideos['client_code'] = "./videos/formularz_1/kod_pocztowy_wpisz_kod_pocztowy.mp4";
   sayAbountVideos['nip'] = "./videos/formularz_1/nip_wpisz_nip_swojej_firmy.mp4";

   function sayAbountField(fieldid) {
       console.log(sayAbountVideos[fieldid]);
       playVideo(sayAbountVideos[fieldid]);

   }
   var oyoyoyVideo = "./videos/formularz_1/ojojoj.mp4";

   function sayOyOyOy() {
       playVideo(oyoyoyVideo);
   }


   var sayFieldValidationErrorVideos = [];
   sayFieldValidationErrorVideos['client_name'] = "./videos/formularz_1/blad_naprawde_tak_sie_nazywasz.mp4";
   sayFieldValidationErrorVideos['client_surname'] = "./videos/formularz_1/blad_naprawde_tak_sie_nazywasz.mp4";
   sayFieldValidationErrorVideos['client_mobile'] = "./videos/formularz_1/blad_numer_telefonu.mp4";
   sayFieldValidationErrorVideos['client_email'] = "./videos/formularz_1/ojojoj.mp4";
   sayFieldValidationErrorVideos['client_code'] = "./videos/formularz_1/blad_kod_pocztowy.mp4";
   sayFieldValidationErrorVideos['nip'] = "./videos/formularz_1/zapomniales_nipu.mp4";

   var checkAllBoxVideo = "./videos/formularz_1/zgody_niezbedne_zgody.mp4"

   function saycheckAllBoxVideo() {
       playVideo(movieSendData);
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

   var lastFocusedField = "";
   var waitingState = "saying";


   $(document).ready(function () {

       init();

       $("#playervideo")[0].muted = true;

       var md = new MobileDetect(window.navigator.userAgent);

       //alert(md.phone());
       if (md.phone() != null) {
           var vid = document.getElementById("playervideo");
           vid.addEventListener("ended", disableIframeOnPhone);
       }


       document.getElementById('playervideo').addEventListener('ended', function (e) {
           e.preventDefault();
           if (stateplayer == "powitanie") {
               stateplayer = "zaczepki";
               setTimeout(function () {
                   sayWaiting();
               }, 2000);
           } else if (stateplayer == "zaczepki") {
               stateplayer = "zaczepki";
               setTimeout(function () {
                   sayWaiting();
               }, 2000);
           } else {
               sayWaiting();

           }


       })

       document.getElementById('playervideo').addEventListener('timeupdate', function (e) {
           if (stateplayer == "przywitanie" && !$("#playervideo").hasClass("autoselectname")) {
               if (document.getElementById('playervideo').currentTime > 21) {
                   console.log("Zaselektuj pole imie");
                   $("#playervideo").addClass("autoselectname");
                   //  var inputSelect =document.getElementById('client_name');
                   var inputSelect = window.parent.document.getElementById('client_name');
                   inputSelect.focus();
                   inputSelect.select();
                   console.log(inputSelect);

               }
           }
           //console.log("timeupdate: " + document.getElementById('playervideo').currentTime);

       })

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
           console.log(src);
           $("#playervideo").attr("src", src);
           //    if()

           //$("#playervideo")[0].muted = false;
           //if( $("video")[0].muted) {

           //}
           console.log($("#playervideo")[0].muted);


           if (autoplay == true) {
               console.log($("#playervideo")[0]);
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
       init();
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

   var isValid = true;
   $("input").each(function () {
       var element = $(this);
       if (element.val() == "") {
           isValid = false;
       }
   });
   if (!isValid) playVideo(movieSendData);