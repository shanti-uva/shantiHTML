
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



jQuery(function($) {
		// Initialize Fancytree
		$("#tree").fancytree({
			extensions: ["glyph"],
			checkbox: false,
			selectMode: 2,
			glyph: {
				map: {
					doc: "",
					docOpen: "",
					error: "glyphicon glyphicon-warning-sign",
					expanderClosed: "glyphicon glyphicon-plus",
					expanderLazy: "glyphicon glyphicon-plus",
					// expanderLazy: "glyphicon glyphicon-expand",
					expanderOpen: "glyphicon glyphicon-minus",
					// expanderOpen: "glyphicon glyphicon-collapse-down",
					folder: "",
					folderOpen: "",
					loading: "glyphicon glyphicon-refresh"
					// loading: "icon-spinner icon-spin"
				}
			},
//			source: {url: "ajax-tree-plain.json", debugDelay: 1000},
			source: {url: "src/json/ajax-tree-taxonomy.json", debugDelay: 1000},
			lazyload: function(event, ctx) {
				ctx.result = {url: "src/json/ajax-sub2.json", debugDelay: 1000};
			}
		});
	});