
// *** SEARCH **************
jQuery(function($) {
  // --- search panel
  $("#kmaps-search").buildMbExtruder({
        positionFixed:false,
        position:"right",
        width:320,
        top:0
  });
  
  // --- collections toggle
  $("li.explore").addClass("closed");
  $("#toggle-collections, .closecollection").click(function() {
    $("#opencollect").slideToggle('fast');
    $(".closed").toggleClass("open", 200);
  });
  
  // --- advanced search toggle
  $(".advanced-link").click(function() {
		$(".advanced-trigger").toggleClass("show-advanced", 200);
    $(".advanced-link-view").slideToggle('fast');
  });

});

// *** SEARCH *** manage sliding panel
jQuery(function($) {
		$("#tree").fancytree({
			extensions: ["glyph"],
			checkbox: false,
			selectMode: 2,
			autoCollapse: true,
			closeOnExternalClick:false,
			flapMargin:5,
			glyph: {
				map: {
					doc: "",
					docOpen: "",
					error: "glyphicon glyphicon-warning-sign",
					expanderClosed: "glyphicon glyphicon-plus-sign",
					expanderLazy: "glyphicon glyphicon-plus-sign",
					// expanderLazy: "glyphicon glyphicon-expand",
					expanderOpen: "glyphicon glyphicon-minus-sign",
					// expanderOpen: "glyphicon glyphicon-collapse-down",
					folder: "",
					folderOpen: "",
					loading: "glyphicon glyphicon-refresh"
					// loading: "icon-spinner icon-spin"
				}
			},
      source: {url: "src/json/nested-formatted.json", debugDelay: 1000},
			lazyload: function(event, ctx) {
				ctx.result = {url: "src/json/ajax-sub2.json", debugDelay: 1000};
			}
		});
});


// *** SEARCH *** manage toggle button
jQuery(function($) {
		if (!$(".extruder.right").hasClass("isOpened")) {
			$(".flap").prepend("<span style='font-size:27px; position:absolute; left:16px; top:8px; z-index:10;'><i class='icon km-search'></i></span>");
			$(".flap").addClass("on-flap");
		}
});



// *** SEARCH *** set class on dropdown menu for icon
jQuery(function($) {
	$(".extruder.right .flap").hover( function () {
	    $(this).addClass('on-hover');
	    },                 
	      function () {              
	    $(this).removeClass('on-hover');
	    }
	);
});






