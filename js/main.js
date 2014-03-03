
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
    $(".advanced-link-view").slideToggle('fast');
  });
});


// *** SEARCH *** inserts search icon for sliding panel
jQuery(function($) {
	$(".flap").append("<span style='font-size:1.32em;position:relative;top:-35px;right:-9px;'><i class='fa fa-search'></i></span>");	
	// if($(".isOpened").length ) {
	//   		$(".flap").css('right','-29px');
	// }
});


jQuery(function($) {
		$("#tree").fancytree({
			extensions: ["glyph"],
			checkbox: false,
			selectMode: 2,
			closeOnExternalClick:false,
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
			// source: {url: "ajax-tree-plain.json", debugDelay: 1000},
			source: {url: "http://dukar.net/demo/src/json/ajax-tree-taxonomy.json", debugDelay: 1000},
			lazyload: function(event, ctx) {
				ctx.result = {url: "src/json/ajax-sub2.json", debugDelay: 1000};
			}
		});
});



jQuery(function($) {
	$('#search-tabs a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})
});



