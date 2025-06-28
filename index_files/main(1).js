jQuery(document).ready(function($) {
    /**
     * @desc Announcement close function
     * @date 04 July 2023
     * @author Catalyst
     */
    $(".announcement-close-btn").click(function() {
        $(".header-announcement").hide();
        $(".header-wrapper").css("top", 0);
        $(".mobile-header").css("top", 0);
        $(".page-id-328 .banner-background-color.banner-main-sec").css("top", 0);
        $(".banner-main-sec").addClass("banner-mobile-sticky-reverse-adjust");
    });

    /**
     * @desc Scroll down function
     * @date 04 July 2023
     * @author Catalyst
     */
    $(".scroll-down").click(function() {
        $("html, body").animate({
            scrollTop: $("#scroll-down-sec").offset().top,
        }, 1000);
    });

    /**
     * @desc Events Details Content Get Height function
     * @date 04 July 2023
     * @author Catalyst
     */

    $(window).scroll(function() {
        if ($(window).scrollTop() >= 150) {
            $(".header-wrapper").addClass("fixed-header");
        } else {
            $(".header-wrapper").removeClass("fixed-header");
        }
    });

    /**
     * @desc Hide Header on on scroll down
     * @date 04 July 2023
     * @author Catalyst
     */

    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = 0;

    $(window).scroll(function(event) {
        didScroll = true;
    });
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $("body").removeClass("nav-down").addClass("nav-up");
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $("body").removeClass("nav-up").addClass("nav-down");
            }
        }
        lastScrollTop = st;
    }

    /**
     * @desc Left carousel function
     * @date 04 July 2023
     * @author Catalyst
     */
    jQuery(".left-side-partners-carousel").owlCarousel({
        items: 6,
        center: true,
        loop: true,
        rtl: false,
        touchDrag: false,
        mouseDrag: false,
        margin: 90,
        autoplay: true,
        slideTransition: "linear",
        autoplayTimeout: 6000,
        autoplaySpeed: 6000,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 3,
                margin: 50,
            },
            600: {
                items: 3,
                margin: 50,
            },
            767: {
                items: 4,
                margin: 90,
            },
            1000: {
                items: 6,
                margin: 90,
            },
        },
    });
    /**
     * @desc Right carousel function
     * @date 04 July 2023
     * @author Catalyst
     */
    jQuery(".right-side-partners-carousel").owlCarousel({
        items: 6,
        center: true,
        loop: true,
        rtl: true,
        touchDrag: false,
        mouseDrag: false,
        margin: 90,
        autoplay: true,
        slideTransition: "linear",
        autoplayTimeout: 6000,
        autoplaySpeed: 6000,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 3,
                margin: 50,
            },
            600: {
                items: 3,
                margin: 50,
            },
            767: {
                items: 4,
                margin: 90,
            },
            1000: {
                items: 6,
                margin: 90,
            },
        },
    });

    /**
     * @desc Mobile Menu function
     * @date 04 July 2023
     * @author Catalyst
     */
    $("#toggle").click(function() {
        $(this).toggleClass("active");
        $("#overlay").toggleClass("open");
        $("body").toggleClass("menu-open");
    });

    $(".overlay-menu .menu li a").click(function() {
        $("#toggle").removeClass("active");
        $("#overlay").removeClass("open");
        $("body").removeClass("menu-open");
    });

    /**
     * @desc Blog carousel function
     * @date 04 July 2023
     * @author Catalyst
     */
    jQuery(".blog-card-carousel").owlCarousel({
        loop: false,
        items: 3,
        margin: 5,
        nav: true,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>",
        ],
        //dots: true,
        autoplay: false,
        smartSpeed: 900,
        responsive: {
            0: {
                items: 1,
                //nav: false,
                //dots: true,
            },
            600: {
                items: 1,
            },
            991: {
                items: 2,
            },
            1080: {
                items: 3,
            },
        },
    });

    /**
     * @desc Background With Content carousel function
     * @date 04 July 2023
     * @author Catalyst
     */
    jQuery(".background-with-content-carousel").owlCarousel({
        loop: true,
        autoHeight: true,
        animateOut: "fadeOut",
        items: 1,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        nav: true,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>",
        ],
        dots: true,
        autoplay: false,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
        },
    });

    /**
     * @desc Client Reviews Slider
     * @date 04 July 2023
     * @author Catalyst
     */
    $("#client-reviews").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        autoHeight: true,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: true,
        dots: true,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>",
        ],
        smartSpeed: 1000,
        responsive: {
            1000: {
                items: 1,
            },
        },
    });
    /**
     * @desc Partners carousel function
     * @date 04 July 2023
     * @author Catalyst
     */
    jQuery(".partners-carousel").owlCarousel({
        loop: true,
        items: 6,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        nav: false,
        dots: false,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 4,
            },
            1000: {
                items: 6,
            },
        },
    });

    /**
     * @desc Header Popup function
     * @date 04 July 2023
     * @author Catalyst
     */
    const modalBtns = Array.from(document.querySelectorAll(".popup-wrapper"));
    modalBtns.forEach((btn) => {
        btn.onclick = function() {
            const modal = btn.getAttribute("data-modal");
            document.getElementById(modal).style.display = "block";
            document.querySelector("body").style.overflow = "hidden";
        };
    });
    const closeBtns = Array.from(document.querySelectorAll(".close-button"));
    closeBtns.forEach((btn) => {
        btn.onclick = function() {
            let modal = btn.closest(".modal");
            modal.style.display = "none";
            document.querySelector("body").style.overflow = "visible";
        };
    });
    window.onclick = function(event) {
        if (event.target.className === "modal") {
            event.target.style.display = "none";
            document.querySelector("body").style.overflow = "visible";
        }
    };
    jQuery(".popup-wrapper").click(function() {
        jQuery("body").addClass("popup-show-wrapper");
    });
    jQuery(".close-button").click(function() {
        jQuery("body").removeClass("popup-show-wrapper");
    });

    /**
     * @desc accordion function
     * @date 04 July 2023
     * @author Catalyst
     */
    //    $(".custom-accordion").accordionjs({
    //        activeIndex: false
    //    });
    //    $(".custom-accordion li").click(function () {
    //        if ($(this).hasClass("acc_active")) {
    //        }
    //    });

    /**
     * @desc content col height get function
     * @date 04 July 2023
     * @author Catalyst
     */
    var maxHeight = -1;
    $(".content-col-content").each(function() {
        maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    });
    $(".content-col-content").each(function() {
        //$(this).height(maxHeight);
        var totalHeight = maxHeight + 40;
        $(this).css("min-height", totalHeight);
    });

    $(".product-content-col").each(function() {
        maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    });
    $(".product-content-col").each(function() {
        //$(this).height(maxHeight);
        var totalHeight = maxHeight + 80;
        $(this).css("min-height", totalHeight);
    });

    //    $('.partner-card-row-col h3.gradient-text').each(function () {
    //        maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    //    });
    //    $('.partner-card-row-col h3.gradient-text').each(function () {
    //        //$(this).height(maxHeight);
    //        var totalHeight = maxHeight
    //        $(this).css('min-height', totalHeight);
    //    });

    /**
     * @desc Tab function
     * @date 04 July 2023
     * @author Catalyst
     */
    $(".tab-link").click(function() {
        var tabID = $(this).attr("data-tab");
        $(this).addClass("tab-active").siblings().removeClass("tab-active");
        $("#tab-" + tabID)
            .addClass("tab-active")
            .siblings()
            .removeClass("tab-active");
    });
    if (jQuery(window).innerWidth() <= 767) {
        jQuery(".tab-carousel").owlCarousel({
            loop: false,
            items: 3,
            margin: 20,
            autoplay: false,
            nav: false,
            dots: false,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 3,
                },
            },
        });
        $(".tab-link").click(function() {
            $(".tab-link").removeClass("tab-active");
            $(this).addClass("tab-active");
        });
    }

    /**
     * @desc Sub Menu function
     * @date 04 July 2023
     * @author Catalyst
     */
    //    $(".sub-menu-warpper-col li.sub-menu-li a.menu-link").hover(function () {
    //        var parentClass = $(this);
    //        var isHovered = $(this).is(":hover");
    //        if (isHovered) {
    //            $(parentClass).find("span.sub-menu-content").stop().slideDown(300);
    //        } else {
    //            $(parentClass).find("span.sub-menu-content").stop().slideUp(300);
    //        }
    //    });

    /**
     * @desc Search function
     * @date 04 July 2023
     * @author Catalyst
     */
    jQuery(".search-form-sec input#s").on("keyup", function() {
        if (jQuery(this).val() == "") {
            jQuery(".search-rest-btn").hide();
            jQuery(".search-button").show();
        } else {
            jQuery(".search-rest-btn").show();
            jQuery(".search-button").hide();
        }
    });

    jQuery(".search-rest-btn").click(function() {
        jQuery(".search-form-sec input#s").val("");
    });

    /**
     * @desc Mobile Sub Menu function
     * @date 04 July 2023
     * @author Catalyst
     */
    jQuery(".overlay-menu .menu-item-has-children").each(function() {
        var parentClass = jQuery(this);
        jQuery(parentClass).click(function() {
            jQuery(parentClass)
                .find(".mobile-sub-menu-warpper")
                .slideToggle()
                .parent()
                .toggleClass("active");
        });
    });

    /**
     * @desc Codemirror Tab function
     * @date 04 July 2023
     * @author Catalyst
     */
    $(".codemirror-tab-link").click(function() {
        var tabID = $(this).attr("data-tab");
        $(this)
            .addClass("codemirror-tab-active")
            .siblings()
            .removeClass("codemirror-tab-active");
        $("#tab-" + tabID)
            .addClass("codemirror-tab-active")
            .siblings()
            .removeClass("codemirror-tab-active");
    });

    /**
     * @desc Codemirror function
     * @date 04 July 2023
     * @author Catalyst
     */
    //    $(".codemirror-tab-content").each(function () {
    //        var parentClass = $(this);
    //        var textarea = parentClass.find(".codemirror-editor");
    //        var editor = CodeMirror.fromTextArea(textarea[0], {
    //            theme: "solidity",
    //            matchBrackets: true,
    //            //  lineWrapping: true,
    //            indentUnit: 4,
    //            lineNumbers: true,
    //            tabSize: 8,
    //            // indentWithTabs: true,
    //            mode: "htmlmixed"
    //        });
    //        editor.removeTag = CodeMirror.removeTag;
    //        var cm = parentClass.find(".CodeMirror");
    //        cm.editor = editor;
    //        editor.save();
    //        editor.setOption("mode", "htmlmixed");
    //
    //        parentClass.find(".copy-code-wrap").click(function (e) {
    //            if (e.which == 1) {
    //                // write the text to the clipboard
    //                navigator.clipboard.writeText(editor.getValue());
    //
    //                // animate the button
    //                var copy = parentClass.find(".copy-code", this);
    //                function quickadd() {
    //                    copy.addClass("animate");
    //                    setTimeout(function () {
    //                        copy.removeClass("animate");
    //                    }, 400);
    //                }
    //                quickadd();
    //            }
    //        });
    //    });

    /**
     * @desc Trustpilot Iframe Add ID function
     * @date 04 July 2023
     * @author Catalyst
     */
    setTimeout(function() {
        var trustpilotIframe = document.querySelector(".trustpilot-widget iframe");
        // Set the ID attribute for the iframe
        trustpilotIframe.setAttribute("id", "myTrustpilotIframe");
    }, 1000);

    /**
     * @desc Video Play function
     * @date 04 July 2023
     * @author Catalyst
     */
    $(".video-play-icon").click(function() {
        $(".video-container").addClass("video-play-active");
        $(".video-wrapper").get(0).play();
    });




    /**
     *  @function  Blog Pagination js
     *  @author Catalyst
     *   @date 14/06/2022
     */
    var allTimeItems = jQuery(".filtered-posts .row");
    var allTimeNumItems = allTimeItems.length;
    var allTimePerPage = 3;
    allTimeItems.slice(allTimePerPage).hide();
    $('.pagination-container').pagination({
        items: allTimeNumItems,
        itemsOnPage: allTimePerPage,
        prevText: "<img src='/wp-content/themes/banxa/assets/images/pagination-left-arrow.svg' alt='pagination-left-arrow'/>",
        nextText: "<img src='/wp-content/themes/banxa/assets/images/pagination-right-arrow.svg' alt='pagination-right-arrow'/>",
        onPageClick: function(pageNumber) {
            var showFrom = allTimePerPage * (pageNumber - 1);
            var showTo = showFrom + allTimePerPage;
            allTimeItems.hide().slice(showFrom, showTo).show();
        }
    });



    /**
     *  @function  Blog Filter js
     *  @author Catalyst
     *   @date 14/06/2022
     */

    $(".blog-category li").each(function() {
        $(this).click(function() {
            var category = $(this).val();
            var keyword = $('.blog-search').val();
            //  console.log(category, 'category');
            $(this).addClass('active').siblings().removeClass('active');
            data = {
                'action': 'filterposts',
                'category': category,
                'keyword': keyword
            };
            $.ajax({
                url: "/wp-admin/admin-ajax.php",
                data: data,
                type: 'POST',
                beforeSend: function(xhr) {
                    $('.filtered-posts').html('');
                    $(".loder").fadeIn();
                    $('.blog-category').attr('disabled', 'disabled');
                    $('.pagination-container').fadeOut('fast');
                },
                success: function(data) {
                    if (data) {
                        $(".loder").fadeOut();
                        $('.filtered-posts').html(data.posts);
                        $('.pagination-container').fadeIn();
                        $('.blog-category').removeAttr('disabled');
                    } else {
                        $('.filtered-posts').html('<p class="no-post-found-wrapper">No posts found.</p>');
                    }
                    var allTimeItems = jQuery(".filtered-posts .row");
                    var allTimeNumItems = allTimeItems.length;
                    var allTimePerPage = 3;
                    allTimeItems.slice(allTimePerPage).hide();
                    $('.pagination-container').pagination({
                        items: allTimeNumItems,
                        itemsOnPage: allTimePerPage,
                        prevText: "<img src='/wp-content/themes/banxa/assets/images/pagination-left-arrow.svg' alt='pagination-left-arrow'/>",
                        nextText: "<img src='/wp-content/themes/banxa/assets/images/pagination-right-arrow.svg' alt='pagination-right-arrow'/>",
                        onPageClick: function(pageNumber) {
                            var showFrom = allTimePerPage * (pageNumber - 1);
                            var showTo = showFrom + allTimePerPage;
                            allTimeItems.hide().slice(showFrom, showTo).show();
                        }
                    });
                    jQuery('.simple-pagination ul').each(function() {
                        var parentClass = jQuery(this);
                        var thisLength = jQuery(parentClass).find('li').length;
                        if (thisLength === 3) {
                            jQuery(parentClass).addClass('there-no-pagination');
                        } else {
                            jQuery(parentClass).removeClass('there-no-pagination');
                        }
                    });
                }
            });
        });
    });

    $(".blog-search").keyup(function() {
        var category = $('.blog-category li.active').val();
        var keyword = $('.blog-search').val();
        data = {
            'action': 'filterposts',
            'category': category,
            'keyword': keyword
        };
        $.ajax({
            url: "/wp-admin/admin-ajax.php",
            data: data,
            type: 'POST',
            beforeSend: function(xhr) {
                $('.filtered-posts').html('');
                $(".loder").fadeIn();
                $('.blog-category').attr('disabled', 'disabled');
                $('.pagination-container').fadeOut('fast');
            },
            success: function(data) {
                if (data) {
                    $(".loder").fadeOut();
                    $('.pagination-container').fadeIn();
                    $('.filtered-posts').html(data.posts);

                    $('.blog-category').removeAttr('disabled');
                } else {
                    $('.filtered-posts').html('<p class="no-post-found-wrapper">No posts found.</p>');
                }
                var allTimeItems = jQuery(".filtered-posts .row");
                var allTimeNumItems = allTimeItems.length;
                var allTimePerPage = 3;
                allTimeItems.slice(allTimePerPage).hide();
                $('.pagination-container').pagination({
                    items: allTimeNumItems,
                    itemsOnPage: allTimePerPage,
                    prevText: "<img src='/wp-content/themes/banxa/assets/images/pagination-left-arrow.svg' alt='pagination-left-arrow'/>",
                    nextText: "<img src='/wp-content/themes/banxa/assets/images/pagination-right-arrow.svg' alt='pagination-right-arrow'/>",
                    onPageClick: function(pageNumber) {
                        var showFrom = allTimePerPage * (pageNumber - 1);
                        var showTo = showFrom + allTimePerPage;
                        allTimeItems.hide().slice(showFrom, showTo).show();
                    }
                });

                jQuery('.simple-pagination ul').each(function() {
                    var parentClass = jQuery(this);
                    var thisLength = jQuery(parentClass).find('li').length;
                    if (thisLength === 3) {
                        jQuery(parentClass).addClass('there-no-pagination');
                    } else {
                        jQuery(parentClass).removeClass('there-no-pagination');
                    }
                });
            }
        });
    });


    $("li.all-category").click(function() {
        $("ul.blog-category").toggleClass("all-cat-show");
    });








    /**
     *  @function  Hubspot Forms js
     *  @author Catalyst
     *   @date 14/06/2022
     */


    function checHubspotForms() {
        $ = jQuery;
        var hubspotframe = jQuery("#hs-form-iframe-0");
        var hubspotframeContent = jQuery(hubspotframe).contents();
        //console.log(hubspotframeContent, 'hubspotframeContent');
        $(hubspotframeContent[0]).ready(function($) {
            var hubspotframeLabel = $(hubspotframeContent).find("span");
            var hubspotframeLabelInput = $(hubspotframeContent).find(
                ".hs-input:not([type=file])"
            );
            var hubspotframeP = $(hubspotframeContent).find("p");
            var hubspotframeButton = $(hubspotframeContent).find(".hs-button");
            var hubspotframePlaceholder = $(hubspotframeContent).find(
                "select.is-placeholder"
            );
            var hubspotframeDesc = $(hubspotframeContent).find(
                "legend.hs-field-desc"
            );
            $(hubspotframeP).css({
                color: "#111630"
            });
            $(hubspotframeLabel).css({
                color: "#111630",
                "text-decoration": "none"
            });
            $(hubspotframePlaceholder).css({
                color: "#111630",
                "font-size": "12px"
            });
            $(hubspotframeDesc).css({
                color: "#111630"
            });
            $(hubspotframeLabelInput).css({
                "background-color": "transparent",
                "border-color": "#111630",
            });
            $(hubspotframeButton).css({
                background: "#ffffff",
                "border-color": "#111630",
                height: "50px",
                width: "165px",
                color: "#111630",
                "border-radius": "10px",
                "font-family": "Rubik",
                "font-weight": "500",
                padding: "14px 20px",
            });

            $(hubspotframeButton)
                .mouseenter(function() {
                    $(this).css({
                        "background-color": "#111630",
                        color: "#ffffff"
                    });
                })
                .mouseleave(function() {
                    $(this).css({
                        "background-color": "#fff",
                        color: "#111630"
                    });
                });
        });
    }
    setTimeout(checHubspotForms, 5000);
}); //main