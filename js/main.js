
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
  $("#toggle-collections, .closecollection, .km-ul a").click(function() {
    $("#opencollect").slideToggle('slow');
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
			$(".flap").addClass("off-flap");
			$(".flap").prepend("<span style='font-size:1.32em; position:absolute; top:7px; left:18px; z-index:10;'><i class='fa fa-search'></i></span>");
		}
		// --- toggle class for search button & header
		$(".flap, #closeSearch").click( function(){
						$(".off-flap").toggleClass("on-flap", 200);
						$("h3.off").toggleClass("on", 200);
		});
});


// *** SEARCH *** set class for icon onHover
jQuery(function($) {
	$(".dropdown-menu li").find("a").hover( function () {
	    $(this).addClass('on');
	    },                 
	      function () {              
	    $(this).removeClass('on');
	    }
	);
});


// *** SEARCH *** helps control flash when loading
// jQuery(function($) {
//	$("h3.search-header").css('display','block');
// });


// *** SEARCH *** fallback for browsers that don't support HTML5 placeholder attribute
jQuery(function($) {
	if (!elementSupportsAttribute('textarea', 'placeholder')) {
	  $("#searchform")
	    .data("originalText", $("#searchform").text())
	    .css("color", "#999")
	    .focus(function() {
	        var $el = $(this);
	        if (this.value == $el.data("originalText")) {
	          this.value = "";
	        }
	    })
	    .blur(function() {
	      if (this.value == "") {
	          this.value = $(this).data("originalText");
	      }
	    });
	} else {
	  // Browser does support HTML5 placeholder attribute, so use it.
	  $("#searchform")
	    .attr("placeholder", $("#searchform").text())
	    .text("");
	}
});










