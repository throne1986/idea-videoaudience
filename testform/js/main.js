/*
Code make disclaimer toggle
*/
$(".btn-more").click(function() {
    $('html, body').animate({
        scrollTop: $(".form").offset().top
    }, 500);
    return false;
});
$("#nota").on('click',function onNotaClick(e) {
	e.preventDefault();
	$("#disclaimer").slideToggle('fast');
});

$('.more').hide();
$('.show_more').click(function() {
    $('.more').slideToggle();
    $(this).hide();
});

$('.hide_more').click(function() {
    $('.more').slideToggle();
    $('.show_more').show();
});
/*
$('.disc').on('scroll', function(){
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        $(".send").prop("disabled", false);
    } else {
        $(".send").prop("disabled", true);
    }
});

The code below
separate first and last name
into two fields


$('#send').click(function () {


    var all = $('#client_name_all').val();

    if (all) {

	    $("#client_name").attr("value", "brak");
	    $("#client_surname").attr("value", "brak");

        var put = all.split(' ', 2);
        var imie = put[0];
        var naziwsko = put[1];
        $("#client_name").attr("value", imie);
        $("#client_surname").attr("value", naziwsko);
    }

});
$('#send').click(function () {


    var all = $('#forename_and_surname').val();

    if (all) {

	    $("#forename").attr("value", "brak");
	    $("#surname").attr("value", "brak");

        var put = all.split(' ', 2);
        var imie = put[0];
        var naziwsko = put[1];
        $("#forename").attr("value", imie);
        $("#surname").attr("value", naziwsko);
    }

});

*/


// Validators in js/validators.js

$('#form-send').validate({
    ignore: ':hidden:not(:checkbox)',
    rules: {
        cellularPhone: {
            required: true,
            phonePL: true,
            digits: true,
            remote: {
                url: "js/check-phone.php",
                type: "post",
                data: {
                  cellularPhone: function() {
                     return $("#cellularPhone").val();
                  }
                }
            }
        },
        taxReferenceNumber: {
            required: true,
            digits: true,
            nip: true,
        },
        email: {
            minlength: 5,
            required:  {
                depends:function(){
                    $(this).val($.trim($(this).val()));
                    return true;
                }   
            },
            customemail: true
        },
        checkbox_agreed_MAR01:  {
            required: true
        },
        checkbox_agreed_USL01: {
            required: true
        },
        checkbox_agreed_person_10: {
            required: true
        },
        checkbox_agreed_MAR02: {
            required: true
        }
    },
    invalidHandler: function(event, validator) {
        // 'this' refers to the form
        // console.log(event, validator);
        var errors = validator.numberOfInvalids();
        var errorList = validator.errorList;
        // var message = "Wprowadź proszę poprawne dane<br><ul>";
        var message = "<ul>";
          // + this.numberOfInvalids()

        for (var i = 0; i < errorList.length; i++) {
            var field = errorList[i];
            message += '<li>' + field.message + '</li>';
        };
        message += '</ul>';
        sweetAlert({
            title: "Wprowadź poprawne dane",
            text: message,
            html: true,
            type: "error"
        });

    },
    submitHandler: function(form) {
        
        dataLayer.push({
            'event':'VMevent',
            'eventCategory':'Click',
            'eventAction':'form',
            'eventLabel':'wyslij'
        });

        form.submit();
    },
    messages: {
        cellularPhone: {
            required: "Podaj \"Numer telefonu\"",
            phonePL: "Podaj poprawny \"Numer telefonu\"",
            digits: "Pole \"Numer telefonu\" może zawierac tylko liczby.",
            remote: "Podany numer telefonu już istnieje"
        },
        taxReferenceNumber: {
            required: "Podaj \"NIP firmy\"",
            digits: "Pole \"NIP\" może zawierac tylko liczby.",
            nip: "Podany NIP jest nieprawidłowy",
        },
        email: {
            minlength: "Podany adres jest za krótki",
            required: "Podaj prawidłowy adres \"E-mail\"",
            customemail: "Podaj poprawny adres \"E-mail\""
        },
        checkbox_agreed_MAR01: {
            required: "Zgoda na przetwarzanie danych w celach marketingowych",
        },
        checkbox_agreed_USL01: {
            required: "Zgoda na przekazywanie danych związanych ze świadczeniem usług płatniczych"
        },
        checkbox_agreed_person_10: {
            required: "Oświadczam, że przed zawarciem umowy otrzymałem/am, zapoznałem/am się i akceptuję treść."
        },
        checkbox_agreed_MAR02: {
            required: "Zgoda na marketing telefoniczny"
        }
    },
    highlight: function(element) {
        $(element).addClass('error');
        // $(element).next('span').addClass('error-checkbox');
    },
    unhighlight: function(element) {
        $(element).removeClass('error');
        // $(element).next('span').removeClass('error-checkbox');
    },
    errorPlacement: function(error, element) {}

});

/* Check all checkbox 
and radio buttons */

$("#check_all").change(function(){
    
        if($(this).is(':checked')){
            $(".form input[type=checkbox]").each(function() {
                var $this = $(this);
                $this.prop('checked', true);
                $this.attr("value", "yes");
                $this.removeClass('error');
                $("input[name=" + $this.data('reflect-in') + "]").val("yes");
            });
        } else {
            $(".form input[type=checkbox]").each(function() {
                var $this = $(this);
                $this.prop('checked', false);
                $this.attr("value", "no");
                $("input[name=" + $this.data('reflect-in') + "]").val("no");
            });
        }
});


$("[data-reflect-in]").each(function(i, el) {
    
            var $this = $(el);
            var $reflectElements = $("[name=" + $this.data('reflect-in') + "]");
            
            var revert = $(el).data("reflectRevert") !== undefined;
            if (revert) {
                var index0 = 1, index1 = 0;
            } else {
                var index0 = 0, index1 = 1;
            }
    
            $this.on("change", function(e) {
                console.log("data-reflect-in : " + $this.attr('name'));
                $("#check_all").prop('checked', false);
                $("#check_all").attr("value", "no");
                if ($this.is(":checked")) {
                    //alert($("input[name="+ $this.data('reflect-in') +"]").val("no"));
                    $("input[name=" + $this.data('reflect-in') + "]").val("yes");
                    $this.attr("value", "yes");
                    //$reflectElements.eq(index0).trigger('click');
                    console.log($reflectElements.eq(index0).trigger('click'));
                } else {
                    //alert($("input[name="+ $this.data('reflect-in') +"]").val("yes"));
                    $("input[name=" + $this.data('reflect-in') + "]").val("no");
                    $this.attr("value", "no");
                    //$reflectElements.eq(index1).trigger('click');
                    console.log($reflectElements.eq(index1).trigger('click'));
                }
            }).on("init", function(e) {
                // if ($reflectElements.eq(index1).is(":checked") === false){
                //     el.checked = true;
                // } else {
                //     el.checked = false;
                // }
            }).trigger("init");
    
            $reflectElements.on('change', function(e) {
                $this.trigger('init');
            });
    
});