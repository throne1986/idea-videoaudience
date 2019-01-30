// polish letters added to jquery validation
jQuery.validator.addMethod('lettersOnly', function(value, element) {
    return this.optional(element) || /^[a-z A-ZąĄęĘżŻźŹćĆńŃŚśłŁóÓ\-]+$/i.test(value);
}, 'Dozwolone są tylko litery');

// polish letters added to jquery validation
jQuery.validator.addMethod('fullName', function(value, element) {
    return this.optional(element) || /^[a-z A-ZąĄęĘżŻźŹćĆńŃŚśłŁóÓ\-]+ [a-z A-ZąĄęĘżŻźŹćĆńŃŚśłŁóÓ\-]+$/i.test(value);
}, 'Podaj poprawnie "Imię i Nazwisko"');

// phone polish validatior
jQuery.validator.addMethod('phonePL', function(phone_number, element) {
    // phone_number = phone_number.replace(/\s+/g, '');
    return this.optional(element) || phone_number.length === 9;
}, 'Podaj poprawny "Numer telefonu"');

// kod pocztowy
jQuery.validator.addMethod("kodpocztowy", function(value, element) {
  return this.optional(element) || /^\d{2}-\d{3}$/.test(value);
}, "Wprowadź poprawny \"Kod pocztowy\"");

jQuery.validator.addMethod("customemail", function(value, element) {

    reg = /^\b[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9ąĄęĘżŻźŹćĆńŃŚśłŁóÓ.-]+\.[A-Z]{2,4}\b$/i;

    if((reg.test(value) == false) || (value.indexOf("..") != -1) || (value.indexOf(".@") != -1) || (value.indexOf("@.") != -1) || (value.indexOf("@") == 0) || (value.substr(value.length - 1) == "@")){
        return false;
    } else{
        return true;
    } 

    }, "Podaj prawidłowy adres E-mail"
);

// NIP validatior
jQuery.validator.addMethod('nip', function(value, element) {

    function validatenip(nip) {
        var nip_bez_kresek = nip.replace(/-/g,"");
        var reg = /^[0-9]{10}$/;
        if(reg.test(nip_bez_kresek) == false) {
            return false;
        }
        else
        {
            var dig = (""+nip_bez_kresek).split("");
            var kontrola = (6*parseInt(dig[0]) + 5*parseInt(dig[1]) + 7*parseInt(dig[2]) + 2*parseInt(dig[3]) + 3*parseInt(dig[4]) + 4*parseInt(dig[5]) + 5*parseInt(dig[6]) + 6*parseInt(dig[7]) + 7*parseInt(dig[8]))%11;
            if(parseInt(dig[9])==kontrola)
            return true;
            else
            return false;
        }

    }

    function isInArray(value, array) {
      return array.indexOf(value) > -1;
    }

    var isChecksumOK = validatenip(value);
    var disallow = ["1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999", "0000000000"];
    var isDisallowed = isInArray(value, disallow);

    var response = !isDisallowed && isChecksumOK;

	return this.optional(element) || response;

}, 'Proszę o podanie prawidłowego "numeru NIP".');
