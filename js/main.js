
// *** SEARCH *** sliding search panel
jQuery(function($) {
  $("#extruder-search").buildMbExtruder({
        positionFixed:false,
        position:"right",
        width:320,
        top:0
    });
});


// *** SEARCH *** advanced search toggle
jQuery(function($) {
	$(".advanced-link").click(function() {
    $(".advanced-link-view").toggle("show");
  });
});


// *** SEARCH *** inserts search icon for sliding panel
jQuery(function($) {
	$(".flap").append("<span style='font-size:1.32em;position:relative;top:-35px;left:9px;'><i class='fa fa-search'></i></span>");
});


// *** SEARCH *** toggle function for icons on search accordion
jQuery(function($) {	
	  $("#accordion-search .panel-heading").click(function() {					      			
		
				$(this).find("i").toggleClass("fa-plus fa-minus");					
											
				// if ($("#accordion-search .in").length ){
				//			$(this).prev().addClass("active-parent");					      													
				//			$(".active-parent").find("i").toggleClass("fa-minus true");
				//			$(".active-parent").find("i").toggleClass("fa-plus false");			
				// }		
		});								
});


// *** SEARCH *** IF NEEDED this makes the accordian function with only one open
// jQuery(function($) {	
// 		var active = true;
//    $('#accordion-search').on('show.bs.collapse', function () {
//        if (active) $('#accordion-search .in').collapse('hide');
//    });								
// });







