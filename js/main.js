
// *** SEARCH *** initiate sliding container, toggle collections & search options
jQuery(function ($) {
  $("#kmaps-search").buildMbExtruder({
      positionFixed: false,
      position: "right",
      width: 295,
      top: 0
  });

  // --- collections toggle
  $("li.explore").addClass("closed");
  $(".explore>a, .closecollection").click(function () {
      $(".opencollect").slideToggle('fast');
      $(".closed").toggleClass("open", 'fast');
      $("#kmaps-search").toggleClass("hidden", 'slow' );
  });

  // --- advanced search toggle icons, open/close, view change height
  $(".advanced-link").click(function () {
      $(this).toggleClass("show-advanced", 'fast' );
      $(".advanced-view").slideToggle( 'fast' ); 
			$(".advanced-view").toggleClass( "show-options" );
			$(".view-wrap").toggleClass("short-wrap"); // ----- toggle class for managing view-section height
  });
});



  
// *** SEARCH *** adapt search panel height to viewport
jQuery(function($) { 
  var winHeight = $(window).height(); 	
	// set initial div height
	$("div.text").css({ "height": winHeight -100 }); // ----- main outside height setting for search panel	1/2 
	$(".view-wrap").css({ "height": winHeight -222 });	// ----- default height setting for search panel view-section	
	$("#kmaps-search .view-wrap.short-wrap").css({ "height": winHeight -406 });  // ----- adjust for changes in height of advanced options when open 1/3, a larger number shortens the view-section length
				
	// make sure div stays full width/height on resize
	$(window).resize(function(){
		$("div.text").css({ "height": winHeight -100 });	// ----- main outside height setting for search panel	2/2
		$(".view-wrap").css({ "height": winHeight -222 });	// ----- default height setting for search panel view-section	
		$("#kmaps-search .view-wrap.short-wrap").css({ "height": winHeight -406 });	// ----- adjust for changes in height of advanced options when open 2/3
	});
	
	// toggle heights with search options
	$(".advanced-link").click(function () {
    var winHeight = $(window).height();
		$(".view-wrap").css({ "height": winHeight -222 });	// ----- default height setting for search panel view-section
		$("#kmaps-search .view-wrap.short-wrap").css({ "height": winHeight -406 });	// ----- adjust for changes in height of advanced options when open	3/3
  });
});





// *** SEARCH *** corrections for widths
jQuery(function($) {

  $("#kmaps-search div.text").resizable({ handles: "w" });	// ----- initiate jquery resize

	function checkWidth() {
	var panelWidth = $(".text").width();
		
		if( panelWidth > 275 ) {
				$(".extruder-content").css("width","100%");		
			} else 		
		if( panelWidth <= 275 ) {		
				$(".extruder-content").css("width","100% !important");
			}	
	}
	
  // Execute on load
  checkWidth();  
  // Bind event listener
  $(".extruder-content").resize(checkWidth);  
    
  // $(window).on("resize",function(){ location.reload(); } ); // forces height refersh on browser-size change
	
	// $(".ui-resizable-w").mousedown(function() {
	//    	$(window).mousemove(function() {
	//        $(window).on("resize",function(){ location.reload(); } );
	//			});
	// })


	if (!$(".extruder.right").hasClass("isOpened")) {
				$(".flap").click( function() {
					$(".extruder .text").css("width","100%");
				});
	}
		  
});


// *** SEARCH *** toggle button
jQuery(function($) {
	if (!$(".extruder.right").hasClass("isOpened")) {
				$(".flap").prepend("<span style='font-size:21px; position:absolute; left:19px; top:12px; z-index:10;'><i class='icon km-search'></i></span>");
				$(".flap").addClass("on-flap");
	}
							
	// --- set class on dropdown menu for icon
	$(".extruder.right .flap").hover( function() {
	    $(this).addClass('on-hover');
	    },                 
	      function () {              
	    $(this).removeClass('on-hover');
	    }
	);
});



// *** SEARCH *** sliding panel
jQuery(function ($) {

    if ($('table.table-results')) {
    $('table.table-results').dataTable(
        {
            "oLanguage": {
                "oPaginate": {
                    "sNext": ">",
                    "sPrevious": "<"
                }
            }
        }
    );
    }

    $("#tree").fancytree({
      extensions: ["glyph", "filter"],
			checkbox: false,
			selectMode: 2,
            		debugLevel: 0,
			autoScroll: true,
			closeOnExternalClick:false,
			flapMargin:0,
      filter: { mode: 'hide' },
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
      lazyload: function (event, ctx) { ctx.result = { url: "src/json/ajax-sub2.json", debugDelay: 1000}; },
      focus: function(event, data){ data.node.scrollIntoView(true); }
  });

	var handleSearch = function handleSearch() {
      // clear previous styling
      // (can't simply unwrap because that leaves text nodes in extraneous chunks)
      $('span.fancytree-title').each(
          function () {
              $(this).text($(this).text());
          }
      );
      var txt = $("#searchform").val();

        $('table.table-results').dataTable().fnDestroy();

        if (txt) {

            var tree = $('#tree').fancytree('getTree').applyFilter(txt);
            // $('span.fancytree-match').removeClass('fancytree-match');
            $('span.fancytree-title').highlight(txt, { element: 'em', className: 'fancytree-highlight' });
            // Retrieve matches
            var list = $('#tree').fancytree('getRootNode').findAll(function (n) {
                return n.match;
            });
            // clear the current list.

            $('div.listview div div.table-responsive table.table-results tr').not(':first').remove();
            // populate list
            var table = $('div.listview div div.table-responsive table.table-results');
            $.each(list, function (x, y) {
                table.append(
                   $("<tr>" +
                        "<td><div class='title-field'>" + y.title + "</div></td>" +
                        "</tr>").highlight(txt,{ element: 'em', className: 'fancytree-highlight' })
                );
            });

            $('table.table-results').dataTable(
                {
                    "oLanguage": {
                        "oPaginate": {
                            "sNext": "&gt;",
                            "sPrevious": "&lt;"
                        }
                    }
//                    ,
//                    "fnDrawCallback":function(){
//                        if ($("div.dataTables_paginate").length > 0) {
//                            if($("div.dataTables_paginate")[0].find(".paginate-button").length<=5){
//                            $('div.dataTables_paginate').style.display = "none";
//                        } else {
//                            $('div.dataTables_paginate').style.display = "block";
//                        }
//                        }
//                    }

                }
            );

            $("#kmaps-search.title-field").trunk8();

        }

        return false;
  };
  $("#searchbutton").click(handleSearch);
  $("form.form").submit(handleSearch);

});







// *** SEARCH *** call function iCheck for form graphics
jQuery(function ($) {
  $("input[type='checkbox'], input[type='radio']").each(function () {
      var self = $(this),
          label = self.next(),
          label_text = label.text();

      label.remove();
      self.iCheck({
          checkboxClass: "icheckbox_minimal-red",
          radioClass: "iradio_minimal-red",
          insert: "<div class='icheck_line-icon'></div>" + label_text
      });
  });
});




// *** SEARCH *** remove watermark on focus
jQuery(function($) {		
	var searchBox = $("input#searchform");
	var searchBoxDefault = "Enter Search...";
	
	searchBox.focus(function(){
		if($(this).attr("placeholder") == searchBoxDefault) $(this).attr("placeholder", "");
	});
	searchBox.blur(function(){
		if($(this).attr("placeholder") == "") $(this).attr("placeholder", searchBoxDefault);
	});
});




// *** SEARCH *** prevent flash onload
jQuery(function ($) {
	$(".selectpicker").selectpicker();
	$(".input-section, .view-section, .view-section .nav-tabs>li>a").css("display","block");
});



