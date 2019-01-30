(function () {
	//  :)
	function getQueryVariable(variable) {
	    var query = window.location.search.substring(1);
	    var vars = query.split("&");
	    for (var i=0;i<vars.length;i++) {
	        var pair = vars[i].split("=");
	        if(pair[0] == variable){return pair[1];}
	    }
	    return false;
	}
	var nota = getQueryVariable("nota");

	// var hash = window.location.hash;

	if( nota === 'true' ){
		$('#disc').show();
		window.scrollTo(0, $("#disc").offset().top );
	}
	else{
		$("#disc").hide();
	}

})();
