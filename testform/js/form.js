//form script


        $(document).ready(function () {
            $(window).resize(resizeIframe);
            $(window).resize();
            $("input#client_name").on("focus", function (e) {
                document.getElementById('videoframe').contentWindow.postMessage( "event=fieldchanged&fieldtype=" + "client_name" + "&value=" + $("input#client_name").val(), "*");
                e.preventDefault();
                
               
            });

            // $("input#client_name").on("keyup", function (e) {
            //     document.getElementById('videoframe').contentWindow.postMessage( "event=ontyping&fieldtype=" + "client_name" + "&value=" + $("input#client_name").val(), "*");
            //     e.preventDefault();
            // });
            // $("input#client_name").on("onchange", function (e) {
            //     document.getElementById('videoframe').contentWindow.postMessage( "event=ontyping&fieldtype=" + "client_name" + "&value=" + $("input#client_name").val(), "*");
            //     e.preventDefault();
            // });


            $("input#client_surname").on("focus", function () {
                document.getElementById('videoframe').contentWindow.postMessage( "event=fieldchanged&fieldtype=" + "client_surname" + "&value=" + $("input#client_surname").val(), "*");
            });


            $("input#client_mobile").on("focus", function () {
                document.getElementById('videoframe').contentWindow.postMessage( "event=fieldchanged&fieldtype=" + "client_mobile" + "&value=" + $("input#client_mobile").val(), "*");
            });
            $("input#nip").on("focus", function () {
                document.getElementById('videoframe').contentWindow.postMessage( "event=fieldchanged&fieldtype=" + "nip" + "&value=" + $("input#nip").val(), "*");
            });

            $("input#client_code").on("focus", function () {
                document.getElementById('videoframe').contentWindow.postMessage( "event=fieldchanged&fieldtype=" + "client_code" + "&value=" + $("input#client_code").val(), "*");
            });

            // play a video after the user enter an input client_email works perfect
            $("input#client_email").on("focus", function () {
                document.getElementById('videoframe').contentWindow.postMessage( "event=fieldchanged&fieldtype=" + "client_email" + "&value=" + $("input#client_email").val(), "*");
            });

            $("input#send").on("onlick", function () {
                if(this.onclick === true){
                    alert('clicked');
                }
                document.getElementById('videoframe').contentWindow.postMessage( "event=fieldchanged&fieldtype="  + "send" + "&value=" + $("input#send").val(), "*");
            });

            $("input#check_all").on("change", function () {
                if(this.checked === true){
                document.getElementById('videoframe').contentWindow.postMessage( "event=fieldchanged&fieldtype=" + "check_all" + "&value=" + $("input#check_all").val(), "*");
                }
            });
    

        });

        function resizeIframe() {
            console.log($("iframe#videoframe").width()*3/4 );
            $("iframe#videoframe").height( $("iframe#videoframe").width()*3/4 );

        }
