// *** SEARCH **************
jQuery(function ($) {
    // --- search panel
    $("#kmaps-search").buildMbExtruder({
        positionFixed: false,
        position: "right",
        width: 320,
        top: 0
    });

    // --- collections toggle
    $("li.explore").addClass("closed");
    $("#toggle-collections, .closecollection").click(function () {
        $("#opencollect").slideToggle('fast');
        $(".closed").toggleClass("open", 'fast');
    });

    // --- advanced search toggle icons, open/close, view change height
    $(".advanced-link").click(function () {
        $(".advanced-trigger").toggleClass("show-advanced", 'fast');
        $(".advanced-view").slideToggle('300');
        
        $(".long-wrap").toggleClass("short-wrap", 'fast'); // adjusts for height diff w/advanced panel
    });

});

// *** SEARCH *** sliding panel
jQuery(function ($) {
    $("#tree").fancytree({
        extensions: ["glyph", "filter"],
        checkbox: false,
        selectMode: 2,
        autoCollapse: false,
        closeOnExternalClick: false,
        flapMargin: 5,
        filter: {
            mode: 'hide'
        },
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
        lazyload: function (event, ctx) {
            ctx.result = {url: "src/json/ajax-sub2.json", debugDelay: 1000};
        }
    });

		handleSearch = function handleSearch() {

        // clear previous styling
        // (can't simply unwrap because that leaves text nodes in extraneous chunks)
        $('span.fancytree-title').each(
            function () {
                $(this).text($(this).text());
            }
        );
        var txt = $("#searchform").val();
        var tree = $('#tree').fancytree('getTree').applyFilter(txt);
        // $('span.fancytree-match').removeClass('fancytree-match');
        $('span.fancytree-title').highlight(txt, { element: 'em', className: 'fancytree-highlight' });



        // Retrieve matches
        var list = $('#tree').fancytree('getRootNode').findAll(function (n) {
            return n.match;
        });

        // clear the current list.
        $('div#listview div div.table-responsive table.table-results tr').not(':first').remove();

        // populate list
        var table = $('div#listview div div.table-responsive table.table-results');
        $.each(list, function (x, y) {
            table.append(
                "<tr>" +
                    "<td>" + y.title + "</td>" +
                    "<td>"+ y.data.id + "</td>" +
                    "<td>" + (y.data.caption?y.data.caption:"<em>n/a</em>") +  "</td>" +
                    "</tr>"
            );
        });

        $('table.table-results').tablesorter();

        return false;
    };

    $("#searchbutton").click(handleSearch);

    $("form.form").submit(handleSearch);

});



// *** SEARCH *** toggle button
jQuery(function($) {
		if (!$(".extruder.right").hasClass("isOpened")) {
			$(".flap").prepend("<span style='font-size:21px; position:absolute; left:19px; top:12px; z-index:10;'><i class='icon km-search'></i></span>");
			$(".flap").addClass("on-flap");
		}

	// --- set class on dropdown menu for icon
	$(".extruder.right .flap").hover( function () {
	    $(this).addClass('on-hover');
	    },                 
	      function () {              
	    $(this).removeClass('on-hover');
	    }
	);
});


// *** SEARCH *** call function iCheck for form graphics
jQuery(function ($) {
    $('input').not('.form-control').each(function () {
        var self = $(this),
            label = self.next(),
            label_text = label.text();

        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_minimal-red',
            radioClass: 'iradio_minimal-red',
            insert: '<div class="icheck_line-icon"></div>' + label_text
        });
    });
});
