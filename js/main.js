
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


// *** SEARCH *** accordian function for maintaining only one open tab
// jQuery(function($) {	
// 		var active = true;
//    $('#accordion-search').on('show.bs.collapse', function () {
//        if (active) $('#accordion-search .in').collapse('hide');
//    });								
// });
 

