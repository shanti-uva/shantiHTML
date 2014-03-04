
// *** SEARCH *** sliding search panel
jQuery(function($) {
  $("#kmaps-search").buildMbExtruder({
        positionFixed:false,
        position:"right",
        width:320,
        top:0
    });
});


// *** SEARCH *** advanced search toggle
jQuery(function($) {
	$(".advanced-link").click(function() {
		$(".advanced-trigger").toggleClass("show-advanced", 200);
    $(".advanced-link-view").slideToggle('fast');
  });
});


// *** SEARCH *** manages sliding panel (and aspects of search button)
jQuery(function($) {
		$("#tree").fancytree({
			extensions: ["glyph"],
			checkbox: false,
			selectMode: 2,
			closeOnExternalClick:false,
			flapMargin:5,
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
			// source: {url: "src/json/ajax-tree-plain.json", debugDelay: 1000},
			source: {url: "src/json/ajax-tree-products.json", debugDelay: 1000},
			lazyload: function(event, ctx) {
				ctx.result = {url: "src/json/ajax-sub2.json", debugDelay: 1000};
			}
		});
});



// jQuery(function($) {
//	$('#search-tabs a').click(function (e) {
//	  e.preventDefault()
//	  $(this).tab('show')
//	})
// });



// inserts search icon for sliding panel
jQuery(function($) {
		if (!$(".extruder.right").hasClass("isOpened")) {
			$(".flap").addClass("off-flap");
			$(".flap").prepend("<span style='font-size:1.32em; position:absolute; top:7px; left:18px; z-index:10;'><i class='fa fa-search'></i></span>");
		}
});		


// control the search icon button, changes the button appearance when open/closed 
jQuery(function($) {
		$(".flap, #closeSearch").click( function(){
						$(".off-flap").toggleClass("on-flap", 200);
						$("h3.off").toggleClass("on", 200);
		});
});


// unique classes for tabs, useful for icons etc
jQuery(function($) {
	$("#search-tabs").find("li:eq(0)").addClass("treetab");
	$("#search-tabs").find("li:eq(1)").addClass("listtab");
});



