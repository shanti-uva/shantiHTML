
// *** NAVIGATION *** top drilldown menu
jQuery(function ($) {	
	$( '#menu' ).multilevelpushmenu({
		menuWidth: 250,
		menuHeight: '32em', // this height set by longest menu length, preferences
		mode: 'cover',
		direction: 'rtl',
    backItemIcon: 'fa fa-angle-left',
    groupIcon: 'fa fa-angle-right',
    collapsed: true
	});
	
	$('.navbar-default .navbar-nav>li.lang, .navbar-default .navbar-nav>li:last').addClass('highlight');
  // $('.multilevelpushmenu_wrapper>div>ul>li').append($("<a class=\"link-blocker\"></a>"));	
	
	// --- expand
	$( '.menu-toggle' ).click(function(){
		$('.menu-toggle').toggleClass('show-topmenu');
		$('#menu').multilevelpushmenu( 'expand' );		
	
		if($('.menu-toggle').hasClass('show-topmenu')) {
			$(this).multilevelpushmenu( 'collapse' );					
		}
	});		
	// --- align the text
	$('#menu ul>li, #menu h2').css('text-align','left');
	$('#menu ul>li.levelHolderClass.rtl').css('text-align','right');

	
	// --- close the menu on outside click except button
  $('.menu-toggle').click( function(event){
      event.stopPropagation();
      $('#menu').toggle();
  });
  $(document).click( function(){
  		$('#menu').hide();
  		$('.menu-toggle').removeClass('show-topmenu');
      $('#menu').multilevelpushmenu( 'collapse' );
  });
});


//jQuery(function ($) {

	//var menulist = $('#menu ul').css('display') == 'block'
	
	//$(menulist).filter(function() {
	  // return $(menulist).css('display') == 'block';
	//})
	//.css('box-shadow','none');

//});

// *** SEARCH *** prevent flash onload
jQuery(function ($) {
	$(".input-section, .view-section, .view-section .nav-tabs>li>a").css("display","block");
});


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


  
// *** SEARCH *** adapt search panel height to viewport
jQuery(function($) { 
  var winHeight = $(window).height(); 
  var panelHeight = winHeight -100; // ----- height of container for search panel - minus length above and below in px
  var viewHeight = winHeight -217; // ----- height for view-section & search options - CLOSED
  var shortHeight = winHeight -387;  // ----- height for view-section & search options - OPEN 
    	
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
				$(".flap").prepend("<span style='font-size:20px; position:absolute; left:19px; top:13px; z-index:10;'><i class='icon km-search'></i></span>");
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
    var caption = "<blockquote>" + ((node.data.caption)?node.data.caption:"") + "</blockquote>";
    var kmapid = "<span class='kmapid-display'>" + node.key + "</span>";
    var lazycounts = "<div class='counts-display'>...</div>";
    jQuery(elem).attr('data-content', path + caption + "<div class='info-wrap'>" + lazycounts + "</div>");
    jQuery(elem).attr('title', node.title + kmapid);
    jQuery(elem).popover();
    jQuery(elem).on('shown.bs.popover', function(x) {

        var counts = jQuery(elem.parentNode||elem).find('.info-wrap .counts-display');
        // alert(node.key + counts);
        $.ajax({
            type: "GET",
            url: "http://dev-subjects.kmaps.virginia.edu/features/" + node.key + ".xml",
            dataType: "xml",
            success: function (xml) {
                // force the counts to be evaluated as numbers.
                var related_count = Number($(xml).find('related_feature_count').text());
                var description_count = Number($(xml).find('description_count').text());
                var place_count = Number($(xml).find('place_count').text());
                var picture_count = Number($(xml).find('picture_count').text());
                var video_count = Number($(xml).find('video_count').text());
                var document_count = Number($(xml).find('document_count').text());

                // perhaps instead of vertical bars this should be done as spans then styled via css
                if (related_count) counts.html("<span class='associated'><i class='icon km-places'></i><span class='badge' + (related_count)?' alert-success':''>" + related_count + "</span></span>");
                if (description_count) counts.append("<span class='associated'><i class='icon km-essays'></i><span class='badge' + (description_count)?' alert-success':'>" + description_count + "</span></span>");
                if (place_count) counts.append("<span class='associated'><i class='icon km-texts'></i><span class='badge' + (place_count)?' alert-success':'>" + place_count + "</span></span>");
                if (picture_count) counts.append("<span class='associated'><i class='icon km-photos'></i><span class='badge' + (picture_count)?' alert-success':'>" + picture_count + "</span></span>");
                if (video_count) counts.append("<span class='associated'><i class='icon km-audiovideo'></i><span class='badge' + (video_count)?' alert-success':'>" + video_count + "</span></span>");
                if (document_count) counts.append("<span class='associated'><i class='icon km-essays'></i><span class='badge' + (document_count)?' alert-success':'>" + document_count + "</span></span>");

            }
        });
    });
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


var notify = {
    warn: function (warnid, warnhtml) {
        var wonk = function () {
            if ($('div#' + warnid).length) {
                $('div#' + warnid).fadeIn();
            } else {
                jQuery('<div id="' + warnid + '" class="alert alert-danger fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' + warnhtml + '</div>').fadeIn().appendTo('#notification-wrapper');
            }
        }

        if ($('#notification-wrapper div#' + warnid).length) {
            $('#notification-wrapper div#' + warnid).fadeOut('slow', wonk);
        } else {
            wonk();
        }
    },

    clear: function (warnid) {

        if (warnid) {
            $('#notification-wrapper div#' + warnid).fadeOut('slow').remove()
        } else {
            $('#notification-wrapper div').fadeOut('slow').remove()
        }
    }
}





// *** SEARCH *** sliding panel

jQuery(function ($) {
    // set the popover defaults
    $.fn.popover.Constructor.DEFAULTS.trigger = 'hover';
    $.fn.popover.Constructor.DEFAULTS.placement = 'left';
    $.fn.popover.Constructor.DEFAULTS.html = true;
    $.fn.popover.Constructor.DEFAULTS.delay.hide = '5000'

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
      // lazyload: function (event, ctx) { ctx.result = { url: "src/json/ajax-sub2.json", debugDelay: 1000}; },
      focus: function(event, data){ data.node.scrollIntoView(true); },
        renderNode: function(event,data) {
            if (!data.node.isStatusNode) {
                decorateElementWithPopover(data.node.span, data.node);
            }
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
            notify.clear();
        } else if (txt.length < 3) {
            notify.clear();
            notify.warn('warntooshort', 'You are pudding head! <br>Search query is too short!');
        } else {
            notify.clear();
            $('table.table-results').dataTable().fnDestroy();
            var tree = $('#tree').fancytree('getTree').applyFilter(txt);
            // $('span.fancytree-match').removeClass('fancytree-match');
            $('span.fancytree-title').highlight(txt, { element: 'mark' });
            // Retrieve matches
            var list = $('#tree').fancytree('getRootNode').findAll(function (n) {
                return n.match;
            });

            if (list.length === 0) {
                notify.warn("warnnoresults", "There are no matches.  <br>Try to modify your search.");
            }
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
                        .append(decorateElementWithPopover($('<td>'), y)
                            .append(
                                $('<span class="title-field">').text(y.title)
                                    .highlight(txt, { element: 'mark' }).trunk8({ tooltip: false })
                            )
                        )

                );

//                table.append(
//                   $("<tr>" +
//                        "<td><span rel='popover' title='" + y.title + "' data-content='" + path + (y.data.caption?("<blockquote>" + y.data.caption + "</blockquote>"):"") + "' class='title-field'>" + y.title + "</span></td>" +
//                        "</tr>").highlight(txt,{ element: 'mark' })
//                )
            });

            $("table.table-results tbody tr").click(function (event) {
                $('.row_selected').removeClass('row_selected');
                $(event.target).closest('tr').addClass('row_selected');
            });

            $('table.table-results').dataTable();

        }
        return false;
  };
  $("#searchbutton").click(handleSearch);
  $("form.form").submit(handleSearch);

//    $('.table-v').on('shown.bs.tab', function() { $('.title-field').trunk8(); });
    $('.listview').on('shown.bs.tab', function() {$(".title-field").trunk8({ tooltip:false }); });
    $('#tree').on('click', '.fancytree-statusnode-error', function () {
        $('#tree').fancytree();
    });

    // untruncate on mouseover
//    $('.listview').on({
////        'mouseenter': function () { $(this).trunk8('revert'); },
////        'mouseout': function () { $(this).trunk8({ tooltip:false }).popover(); }
//    },'.title-field');

});





// *** SEARCH *** clear search input & support for placeholder on older
jQuery(function($) {			
	/*--- placeholder ---*/		
	$('#searchform').data('holder',$('.form-control').attr('placeholder'));		
	$('input.form-control').focusin(function(){
	    $('input.form-control').attr('placeholder','');
	    $('.searchreset').show('fast');
	});
	$('input.form-control').focusout(function(){
	    $('#searchform').attr('placeholder',$('.form-control').data('holder'));	
	    $('.searchreset').hide();        
	});	
	$('.searchreset').click(function(){
		$('input.form-control').attr('placeholder','');
		$('#searchform').attr('placeholder',$('.form-control').data('holder'));
		$('.searchreset').hide();
	});	
	
	
	$('input.form-control').focusout(function() {
		var str = 'Enter Search...';
		var txt = $('input.form-control').val();
		
		if (str.indexOf(txt) > -1) {
			$('.searchreset').hide();
		return true;
		} else {
			$('.searchreset').show(100);
		return false;
		}
	});
});







// *** SEARCH *** Select-Form & iCheck form graphics
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
  
  $(".selectpicker").selectpicker();
  
});











// *** CONTENT *** Back to Top link
jQuery(function ($) { 
	var offset = 220;
  var duration = 500;
  jQuery(window).scroll(function() {
      if (jQuery(this).scrollTop() > offset) {
          jQuery('.back-to-top').fadeIn(duration);
      } else {
          jQuery('.back-to-top').fadeOut(duration);
      }
  });
  
  jQuery('.back-to-top').click(function(event) {
      event.preventDefault();
      jQuery('html, body').animate({scrollTop: 0}, duration);
      return false;
  })
});




/*** new twist on things ***
jQuery(function ($) {	
	$("body").css({
	  "background": "linear-gradient(#ccc, #666)",
	  "box-shadow": "inset 0 0 5px black",
	  "transform" : "rotate(5deg)"
	});
});
***/
