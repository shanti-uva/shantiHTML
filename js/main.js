
// *** SEARCH *** initiate extrude function, toggle collections & search options
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
  });

  // --- advanced search toggle icons, open/close, view change height
  $(".advanced-link").click(function () {
      $(this).toggleClass("show-advanced", 100 );
      $(".advanced-view").slideToggle( 'fast' ); 
			$(".advanced-view").toggleClass( "show-options" );
			$(".view-wrap").toggleClass("short-wrap"); // ----- toggle class for managing heights below
  });
});

// *** SEARCH *** adapt search panel height to viewport
jQuery(function($) { 
  var winHeight = $(window).height(); 	
	// set initial div height
	$("div.text").css({ "height": winHeight -100 }); // ----- main outside height setting for search panel	1/2 
	$(".view-wrap").css({ "height": winHeight -220 });	// ----- default height setting for search panel view-section	
	$("#kmaps-search .view-wrap.short-wrap").css({ "height": winHeight -396 });  // ----- adjust for changes in height of advanced options when open 1/3, a larger number shortens the view-section length
				
	// make sure div stays full width/height on resize
	$(window).resize(function(){
		$("div.text").css({ "height": winHeight -100 });	// ----- main outside height setting for search panel	2/2
		$(".view-wrap").css({ "height": winHeight -220 });	// ----- default height setting for search panel view-section	
		$("#kmaps-search .view-wrap.short-wrap").css({ "height": winHeight -396 });	// ----- adjust for changes in height of advanced options when open 2/3
	});
	
	// toggle heights with search options
	$(".advanced-link").click(function () {
    var winHeight = $(window).height();
		$(".view-wrap").css({ "height": winHeight -220 });	// ----- default height setting for search panel view-section
		$("#kmaps-search .view-wrap.short-wrap").css({ "height": winHeight -396 });	// ----- adjust for changes in height of advanced options when open	3/3
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
    
  // $(window).on("resize",function(){ location.reload(); });  -- need to debug drag event ---

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
                    "<tr>" +
                        "<td><span class='title-field'>" + y.title + "</span></td>" +
                        "<td>" + (y.data.caption ? y.data.caption : "<em>n/a</em>") + "</td>" +
                        "</tr>"
                );
            });

            $('table.table-results').dataTable(
                {
                    "oLanguage": {
                        "oPaginate": {
                            "sNext": ">",
                            "sPrevious": "<"
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
	$(".input-section, .view-section, .view-section .nav-tabs>li>a").css("display","block");
});
		






jQuery(function ($) {
	// var select = $("select").selectBoxIt({ populate: '{ "text": "Testing shit", "value": "yea buddy", "class": "please add", "data-iconurl": "https://twimg0-a.akamaihd.net/profile_images/2633978789/80508321d8ce3ba8aa264380bb7eba33.png", "selected": "selected" }' }).data("selectBox-selectBoxIt");
	
  // var select = $("select").selectBoxIt({ populate: '<option value="test">test</option>' }).data('selectBox-selectBoxIt').remove(0);

  $('#selector1').selectBoxIt({ 
  
  	showEffect: "slideDown", 
  	showEffectSpeed: "fast",
  	nativeMousedown: true,
  	aggressiveChange: true,
  	theme: "bootstrap"
	  
  });

  // $('form').removeClass('hidden');

  // $('select').last().selectBoxIt({
  //   defaultText: "Greg Franko Repos",
  //   populate: function() {
  //       var deferred = $.Deferred(),
  //           arr = [],
  //           x = -1;
  //       $.ajax({
  //           url: 'https://api.github.com/users/gfranko/repos'
  //       }).done(function(data) {
  //           while(++x < data.length) {
  //               arr.push(data[x].name);
  //           }
  //           //console.log('arr', arr);
  //           deferred.resolve(arr);
  //       });
  //       return deferred;
  //   }
  // });

  // $.ajax({
  //   url: 'https://api.github.com/users/gfranko',
  //   success: function(data) {
  //       console.log('data', data);
  //   }
  // });

  // $.ajax({
  //   url: 'https://api.github.com/users/gfranko/repos'
  // }).done(function(data) {
  //   console.log('data', data);
  // });

  // $.get('https://api.github.com/users/gfranko/repos').done(function(data) {
  //   console.log('data', data);
  // });

  //select.refresh();

  //select.wait(1000, select.open).wait(1000, select.moveDown);

});


