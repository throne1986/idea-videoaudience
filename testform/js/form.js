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

        document.getElementById('videoframe').contentWindow.postMessage("event=focus&fieldtype=" + $(this).attr("id") + "&value=" + $(this).val() + "&result=" + result, "*");

    });

    $("input#client_name, input#client_surname,input#client_mobile,input#client_email,input#client_code,input#nip").on("change", function(e) {
        console.log("parent:    CHANGE on: " + $(this).attr("id"));

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
                    if (!isNaN($(this).val())) {
                        result = "error";
                    }
                    break;



                case "client_mobile":
                    if (isNaN($(this).val())) {
                        result = "error";
                    }
                    break;
                case "client_code":
                    if (isNaN($(this).val())) {
                        result = "error";
                    }
                    break;
                case "nip":
                    if (isNaN($(this).val())) {
                        result = "error";
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