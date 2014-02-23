
// *** sliding search panel
jQuery(function($) {
  $("#extruder-search").buildMbExtruder({
        positionFixed:false,
        position:"right",
        width:320,
        top:0
    });
});


// *** advanced search toggle
jQuery(function($) {
	$(".advanced-link").click(function() {
    $(".advanced-link-view").toggle("show");
  });
});


// *** inserts search icon for sliding panel
jQuery(function($) {
	$(".flap").append("<span style='font-size:1.32em;position:relative;top:-35px;left:9px;'><i class='fa fa-search'></i></span>");
});






jQuery(function($) {	
			  $("#extruder-search .panel-heading").click(function() {					      			

							$(this).find("i").toggleClass("fa-plus fa-minus");
							$("#extruder-search .panel-collapse.in").prev().find("i").toggleClass("fa-plus false");							
							$("#extruder-search .panel-collapse.in").prev().find("i").toggleClass("fa-minus true");
							
				});	

							$("#extruder-search .panel-collapse.in").prev().find("i.fa").removeClass("fa-plus");				
							$("#extruder-search .panel-collapse.in").prev().find("i.fa").addClass("fa-minus");
							
							if ($("#extruder-search .panel-collapse.in").length ){					      													
										$(this).prev().find("i").toggleClass("fa-minus true");
										$(this).prev().find("i").toggleClass("fa-plus false");			
							}
								
});
