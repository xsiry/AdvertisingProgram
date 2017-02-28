/*
 * ajax 页面跳转
 * by xsiry
 */
$.root_ = $('#wrapper');

$.navAsAjax = true;
var debugState = false
  , enableJarvisWidgets = true
  , ignore_key_elms = ["#wrapper, #page-wrapper, #main"]
  , bread_crumb = $("#ribbon ol.breadcrumb")

function checkURL() {
    var a = location.href.split("#").splice(1).join("#");
    if (!a)
        try {
            var b = window.document.URL;
            b && b.indexOf("#", 0) > 0 && b.indexOf("#", 0) < b.length + 1 && (a = b.substring(b.indexOf("#", 0) + 1))
        } catch (c) {}
    if (container = $("#content"),
    a) {
        $("nav li.active").removeClass("active"),
        $('nav li:has(a[href="#' + a + '"])').addClass("active");
        var d = $('nav a[href="' + a + '"]').attr("title");
        document.title = d || document.title,
        debugState && console.log("Page title: %c " + document.title),
        loadURL(a + location.search, container)
    } else {
        var e = $('nav > ul > li:first-child > a[href!="#"]');
        window.location.hash = e.attr("href"),
        e = null
    }
}

function loadURL(a, b) {
    debugState && console.log("Loading URL: %c" + a),
    $.ajax({
        "type": "GET",
        "url": a,
        "dataType": "html",
        "cache": !0,
        "beforeSend": function() {
            if ($.navAsAjax && $(".google_maps")[0] && b[0] == $("#content")[0]) {
                var a = $(".google_maps")
                  , c = 0;
                a.each(function() {
                    c++;
                    var b = document.getElementById(this.id);
                    c == a.length + 1 || (b && b.parentNode.removeChild(b),
                    debugState && console.log("Destroying maps.........%c" + this.id))
                }),
                debugState && console.log("\u2714 Google map instances nuked!!!")
            }
            if ($.navAsAjax && $(".dataTables_wrapper")[0] && b[0] == $("#content")[0]) {
                var d = $.fn.dataTable.fnTables(!0);
                $(d).each(function() {
                    0 != $(this).find(".details-control").length ? ($(this).find("*").addBack().off().remove(),
                    $(this).dataTable().fnDestroy()) : $(this).dataTable().fnDestroy()
                }),
                debugState && console.log("\u2714 Datatable instances nuked!!!")
            }
            if ($.navAsAjax && $.intervalArr.length > 0 && b[0] == $("#content")[0] && enableJarvisWidgets) {
                for (; $.intervalArr.length > 0; )
                    clearInterval($.intervalArr.pop());
                debugState && console.log("\u2714 All JarvisWidget intervals cleared")
            }
            if ($.navAsAjax && b[0] == $("#content")[0] && enableJarvisWidgets && $("#widget-grid")[0] && ($("#widget-grid").jarvisWidgets("destroy"),
            debugState && console.log("\u2714 JarvisWidgets destroyed")),
            $.navAsAjax && b[0] == $("#content")[0]) {
                if ("function" == typeof pagedestroy)
                    try {
                        pagedestroy(),
                        debugState && console.log("\u2714 Pagedestroy()")
                    } catch (e) {
                        pagedestroy = void 0,
                        debugState && console.log("! Pagedestroy() Catch Error")
                    }
                $.fn.sparkline && $("#content .sparkline")[0] && ($("#content .sparkline").sparkline("destroy"),
                debugState && console.log("\u2714 Sparkline Charts destroyed!")),
                $.fn.easyPieChart && $("#content .easy-pie-chart")[0] && ($("#content .easy-pie-chart").easyPieChart("destroy"),
                debugState && console.log("\u2714 EasyPieChart Charts destroyed!")),
                $.fn.select2 && $("#content select.select2")[0] && ($("#content select.select2").select2("destroy"),
                debugState && console.log("\u2714 Select2 destroyed!")),
                $.fn.mask && $("#content [data-mask]")[0] && ($("#content [data-mask]").unmask(),
                debugState && console.log("\u2714 Input Mask destroyed!")),
                $.fn.datepicker && $("#content .datepicker")[0] && ($("#content .datepicker").off(),
                $("#content .datepicker").remove(),
                debugState && console.log("\u2714 Datepicker destroyed!")),
                $.fn.slider && $("#content .slider")[0] && ($("#content .slider").off(),
                $("#content .slider").remove(),
                debugState && console.log("\u2714 Bootstrap Slider destroyed!"))
            }
            pagefunction = null,
            b.removeData().html(""),
            b.html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>'),
            b[0] == $("#content")[0] && ($("body").find("> *").filter(":not(" + ignore_key_elms + ")").empty().remove(),
            drawBreadCrumb(),
            $("html").animate({
                "scrollTop": 0
            }, "fast"))
        },
        "success": function(a) {
            b.css({
                "opacity": "0.0"
            }).html(a).delay(50).animate({
                "opacity": "1.0"
            }, 300),
            a = null,
            b = null
        },
        "error": function(c, d, e) {
            b.html('<h4 class="ajax-loading-error"><i class="fa fa-warning txt-color-orangeDark"></i> Error requesting <span class="txt-color-red">' + a + "</span>: " + c.status + ' <span style="text-transform: capitalize;">' + e + "</span></h4>")
        },
        "async": !0
    })
}

function drawBreadCrumb(a) {
    var b = $("nav li.active > a")
      , c = b.length;
    bread_crumb.empty(),
    bread_crumb.append($("<li>首页</li>")),
    b.each(function() {
        bread_crumb.append($("<li></li>").html($.trim($(this).clone().children(".badge").remove().end().text()))),
        --c || (document.title = bread_crumb.find("li:last-child").text())
    }),
    void 0 != a && $.each(a, function(a, b) {
        bread_crumb.append($("<li></li>").html(b)),
        document.title = bread_crumb.find("li:last-child").text()
    })
}

function resetWidgets(a) {
    swal({
        title: "<i class='fa fa-refresh' style='color:green'></i> Clear Local Storage",
        text: a.data("reset-msg") || "Would you like to RESET all your saved widgets and clear LocalStorage?1",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(function() {
        location.reload()
    })
}

$.intervalArr = [];

$.navAsAjax && ($("nav").length && checkURL(),

$(window).on("hashchange", function() {
    checkURL()
}))

$.root_.on("click", '[data-action="resetWidgets"]', function(b) {
    var c = $(this);
    resetWidgets(c),
    b.preventDefault(),
    c = null
});
