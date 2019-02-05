//form script
var dictionaryVulgArray = [
    "kurwa",
    "dziwka",
    "pizda",
    "fiut",
    "szmata",
    "kutas",
    "spierdalaj",
    "pojebany",
    "cycki",
    "dupa"
];
var waitingTimeout = null;
function findBadWord(str) {
    var res = "correct";
    if (dictionaryVulgArray.indexOf(str) > -1) {
        res = "badword";
    }
    return res;
}

window.addEventListener("message", receiveMessageFromIframe, false);

function receiveMessageFromIframe(msg) {

    var values = msg.data.split("&");
    var event = values[0].split("=")[1];
    if (event == "closeiframe") {
        document.getElementById('videoframe').remove();
    }
}
$(document).ready(function() {
    $(window).resize(resizeIframe);
    $(window).resize();

    $("input#client_name, input#client_surname,input#client_mobile,input#client_email,input#client_code,input#nip").on("focus", function(e) {
        console.log("parent:    FOCUS on: " + $(this).attr("id"));
        var result = "correct";
        clearTimeout(waitingTimeout);
        document.getElementById('videoframe').contentWindow.postMessage("event=focus&fieldtype=" + $(this).attr("id") + "&value=" + $(this).val() + "&result=" + result, "*");

    });

    $("input#nip").on("mouseleave", function(e) {
        console.log("parent:    Mouseleave on: " + $(this).attr("id"));
        var result = "correct";
        clearTimeout(waitingTimeout);
        document.getElementById('videoframe').contentWindow.postMessage("event=mouseleave&fieldtype=" + $(this).attr("id") + "&value=" + $(this).val() + "&result=" + result, "*");

    });
    $("input#client_name, input#client_surname,input#client_mobile,input#client_email,input#client_code,input#nip").on("keyup", function(e) {
        

        clearTimeout(waitingTimeout);
        waitingTimeout = setTimeout(function (field) {
            console.log("parent:    KEYUP on: " + $(field).attr("id"));
            var result = "correct";
           // console.log("event=keyup&fieldtype=" + $(field).attr("id") + "&value=" + $(field).val() + "&result=" + result);
           document.getElementById('videoframe').contentWindow.postMessage("event=keyup&fieldtype=" + $(field).attr("id") + "&value=" + $(field).val() + "&result=" + result, "*");
        
        },2000, $(this) );
    });

    $("input#client_name, input#client_surname,input#client_mobile,input#client_email,input#client_code,input#nip").on("blur", function(e) {
        console.log("parent:    CHANGE on: " + $(this).attr("id"));
        clearTimeout(waitingTimeout);
        var result = findBadWord($(this).val());
        if (result == "correct") {
            switch ($(this).attr("id")) {
                case "client_name":
                    if (!isNaN($(this).val())) {
                        result = "error";
                    }
                    break;
                case "client_surname":
                    if (!isNaN($(this).val())) {
                        result = "error";
                    }
                    break;
                case "client_email":
                    var pattenEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!$(this).val().match(pattenEmail)){
                        result = "error";
                    }
                   
                    break;

                case "client_mobile":
                    var patternMobile = /^\d{9}$/;
                    if (!$(this).val().match(patternMobile)){
                        result = "error";
                    }
                    break;
                case "client_code":
                var patternPostalCode =/^\[0-9]{2}\-[0-9]{3}/;
                  if (!$(this).val().match(patternPostalCode)){
                        result = "error";
                    }
                    break;
                    case "nip":
                    if (isNaN($(this).val())) {
                        result = "error";
                        console.log(result)
                    }
                    break;
            }
        }

        document.getElementById('videoframe').contentWindow.postMessage("event=change&fieldtype=" + $(this).attr("id") + "&value=" + $(this).val() + "&result=" + result, "*");

    });

    $("input#check_all").on("change", function () {
        if(this.checked === true){
            console.log(this.checked)
            document.getElementById('videoframe').contentWindow.postMessage("event=change&fieldtype=" + $(this).attr("id") + "&value=" + $(this).val() + "&result=" + "", "*");
        }
    });

 


});

function resizeIframe() {
    //  console.log($("iframe#videoframe").width()*3/4 );
    $("iframe#videoframe").height($("iframe#videoframe").width() * 3 / 4);

}

