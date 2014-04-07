
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
  $(".explore>a, .closecollection").click(function(){
      $(".opencollect").slideToggle('fast');
      $(".closed").toggleClass("open", 'fast');
      // $("#kmaps-search").toggleClass("hidden", 300);
      $("#kmaps-search").toggleClass("open-collections", 200);
  });

  // --- advanced search toggle icons, open/close, view change height
  $(".advanced-link").click(function () {
      $(this).toggleClass("show-advanced",'fast');
      $(".advanced-view").slideToggle('fast'); 
			$(".advanced-view").toggleClass("show-options");
			$(".view-wrap").toggleClass("short-wrap"); // ----- toggle class for managing view-section height
  });
});



// *** NAVIGATION *** top drilldown menu
jQuery(function ($) {	
	$( '#menu' ).multilevelpushmenu({
		menuWidth: 250,
		menuHeight: '30em',
		mode: 'cover',
		direction: 'rtl',
    backItemIcon: 'fa fa-angle-left',
    groupIcon: 'fa fa-angle-right',
    collapsed: true
	});
	// --- expand
	$( '.menu-toggle' ).click(function(){
		$('#menu').toggleClass('show-topmenu');
		$('#menu').css('display','block');
		$('#menu').multilevelpushmenu( 'expand' );		
	});	
	// --- collapse	
	$( '.menu-toggle' ).click(function(){	
		if($('#menu').hasClass('show-topmenu')) {
			
			$( '#menu' ).multilevelpushmenu( 'collapse' );
			$( '#menu' ).css('display','none');
					
		}
	});		
	// --- align the text
	$('#menu ul>li, #menu h2').css('text-align','left');
	$('#menu ul>li.levelHolderClass.rtl').css('text-align','right');
});


  
// *** SEARCH *** adapt search panel height to viewport
jQuery(function($) { 
  var winHeight = $(window).height(); 
  var panelHeight = winHeight -100; // ----- height of container for search panel - minus top and bottom space outside search panel
  var viewHeight = winHeight -222; // ----- height for view-section with search options - CLOSED
  var shortHeight = winHeight -406;  // ----- height for view-section with search options - OPEN 
    	
	// set initial div height
	$("div.text").css({ "height": panelHeight }); 
	$(".view-wrap").css({ "height": viewHeight });
	$("#kmaps-search .view-wrap.short-wrap").css({ "height": shortHeight }); 				
	// make sure div stays full width/height on resize
	$(window).resize(function(){
		$("div.text").css({ "height": panelHeight });
		$(".view-wrap").css({ "height": viewHeight });
		$("#kmaps-search .view-wrap.short-wrap").css({ "height": shortHeight });
	});	
	// toggle heights with search options
	$(".advanced-link").click(function () {
    var winHeight = $(window).height();
		$(".view-wrap").css({ "height": viewHeight });
		$("#kmaps-search .view-wrap.short-wrap").css({ "height": shortHeight });
  });
});





// *** SEARCH *** corrections for widths
jQuery(function($) {

  $("#kmaps-search div.text").resizable({ handles: "w",
          resize: function (event, ui) {
              $('.title-field').trunk8({ tooltip:false });
          }
      });	// ----- initiate jquery resize

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

function decorateElementWithPopover(elem, node) {
    jQuery(elem).attr('rel', 'popover');
    var path = "/" + $.makeArray(node.getParentList(false, true).map(function (x) {
        return x.title;
    })).join("/");
    var caption = (node.data.caption ? ("<blockquote>" + node.data.caption + "</blockquote>") : "");
    var kmapid = "<span class='kmapid-display'>" + node.key + "</span>";
    jQuery(elem).attr('data-content', path + caption + kmapid);
    jQuery(elem).attr('title', node.title);
    jQuery(elem).popover();
    jQuery(elem).find(".fancytree-title");
    return elem;
}

function clearSearch() {
    $('#tree').fancytree('getTree').clearFilter();
    $('#tree').fancytree("getRootNode").visit(function (node) {
        node.setExpanded(false);
    });
    $('table.table-results').dataTable().fnDestroy();
    $('div.listview div div.table-responsive table.table-results tr').not(':first').remove();
    $('table.table-results').dataTable();

}

// *** SEARCH *** sliding panel
jQuery(function ($) {

    // set the dataTable defaults
    $.extend( true, $.fn.dataTable.defaults,        {
        "sDom": "<'row'<'col-xs-6'i><'col-xs-6'p>>" +
            "t" +
            "<'row'>",
        "iTabIndex": 1,
        "oLanguage": {
            "sEmptyTable": "No results.  Enter new search query above.",
            "oPaginate": {
                "sPrevious": "&lt;",
                "sNext": "&gt;"
            }
        },
        // this hides the pagination navigation when there is only one page.
        "fnDrawCallback": function() {
            var dtable = $('table.table-results').dataTable();
            if (dtable.fnSettings().fnRecordsDisplay() <= dtable.fnSettings()._iDisplayLength) {
                $('div.dataTables_paginate').hide();
            } else {
                $('.dataTables_paginate').show();
            }
            $('.title-field').trunk8({ tooltip:false });// .popover();
        },
        "fnInitComplete": function() {
            $('.title-field').trunk8({ tooltip:false }); // .popover();
        }
    });

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
//              loading: "icon-spinner icon-spin"
          }
      },
      source: {url: "http://dev-subjects.kmaps.virginia.edu/features/fancy_nested.json",
          cache: false,
          debugDelay: 1000,
          complete: function(xhr, status) {
//              $('<div class="alert alert-warning fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' + status + ': ' + xhr.statusText + '</div>').appendTo('.treeview');
//              $(".alert").alert();
          }
      },
//      source: {url: "src/json/nested-formatted.json", debugDelay: 1000},
      //lazyload: function (event, ctx) { ctx.result = { url: "src/json/ajax-sub2.json", debugDelay: 1000}; },
      focus: function(event, data){ data.node.scrollIntoView(true); },
        renderNode: function(event,data) {
            decorateElementWithPopover(data.node.span, data.node);
        }
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

        if (!txt) {
            clearSearch();
        } else {

            $('table.table-results').dataTable().fnDestroy();
            var tree = $('#tree').fancytree('getTree').applyFilter(txt);
            // $('span.fancytree-match').removeClass('fancytree-match');
            $('span.fancytree-title').highlight(txt, { element: 'mark' });
            // Retrieve matches
            var list = $('#tree').fancytree('getRootNode').findAll(function (n) {
                return n.match;
            });
            // clear the current list.

            $('div.listview div div.table-responsive table.table-results tr').not(':first').remove();
            // populate list
            var table = $('div.listview div div.table-responsive table.table-results');
            $.each(list, function (x, y) {
//                var path = "/" + $.makeArray(y.getParentList(false,true).map(function(n) {
//                    return n.title;
//                })).join("/");

                table.append(
                    $('<tr>')
                        .append(decorateElementWithPopover($('<td>'),y)
                            .append(
                                $('<span class="title-field">').text(y.title)
                                    .highlight(txt, { element: 'mark' }).trunk8({ tooltip:false })
                            )
                        )

                );

//                table.append(
//                   $("<tr>" +
//                        "<td><span rel='popover' title='" + y.title + "' data-content='" + path + (y.data.caption?("<blockquote>" + y.data.caption + "</blockquote>"):"") + "' class='title-field'>" + y.title + "</span></td>" +
//                        "</tr>").highlight(txt,{ element: 'mark' })
//                )
            });

            $("table.table-results tbody tr").click(function(event) {
                $('.row_selected').removeClass('row_selected');
                $(event.target).closest('tr').addClass('row_selected');
            });

            $('table.table-results').dataTable();

//            $('.tab-content').on('mouseenter', '.title-field',  function (e) {
//                $('.title-field').not(this).popover('hide');
//            });
        }
        return false;
  };
  $("#searchbutton").click(handleSearch);
  $("form.form").submit(handleSearch);

//    $('.table-v').on('shown.bs.tab', function() { $('.title-field').trunk8(); });
    $('.listview').on('shown.bs.tab', function() {$(".title-field").trunk8({ tooltip:false }); });
    $('#tree').on('click', '.fancytree-statusnode-error', function () {

    });

    $.fn.popover.Constructor.DEFAULTS.trigger = 'hover';
    $.fn.popover.Constructor.DEFAULTS.placement = 'left';
    $.fn.popover.Constructor.DEFAULTS.html = true;
    $.fn.popover.Constructor.DEFAULTS.delay.hide = '5000'

    // untruncate on mouseover
//    $('.listview').on({
////        'mouseenter': function () { $(this).trunk8('revert'); },
////        'mouseout': function () { $(this).trunk8({ tooltip:false }).popover(); }
//    },'.title-field');

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

    searchBox.attr("autocomplete","off");
});




// *** SEARCH *** prevent flash onload
jQuery(function ($) {
	$(".selectpicker").selectpicker();
	$(".input-section, .view-section, .view-section .nav-tabs>li>a").css("display","block");
});




