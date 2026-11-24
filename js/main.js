$(function () {

    /* ---------- theme toggle (light / dark) ---------- */
    var THEME_KEY = 'academia-theme';

    function effectiveTheme() {
        var saved = localStorage.getItem(THEME_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        var icon = $('.theme-toggle i');
        if (theme === 'dark') {
            icon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
        }
    }

    applyTheme(effectiveTheme());

    $('.theme-toggle').click(function () {
        var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
    });

    /* ---------- active nav highlighting ---------- */
    function markActiveNav() {
        var current = location.pathname.replace(/\/+$/, '') || '/';
        $('.site-page[href], .nav-page[href]').each(function () {
            var target = this.pathname ? this.pathname.replace(/\/+$/, '') || '/' : '';
            $(this).toggleClass('current', current === target);
        });
    }
    markActiveNav();

    /* ---------- news date chips ([MM/YYYY]: …) ---------- */
    function enhanceNewsLists(scope) {
        $(scope).find('article ul > li, article p').each(function () {
            var $el = $(this);
            var html = $el.html();
            var m = html.match(/^\s*\[(\d{2}\/\d{4})\]\s*:\s*/);
            if (!m) return;
            $el.addClass('news-item');
            if ($el.is('li')) $el.closest('ul').addClass('news-list');
            $el.html('<span class="news-date">' + m[1] + '</span>' + html.slice(m[0].length));
        });
    }

    /* ---------- reveal on scroll ---------- */
    var revealObserver = null;

    function initReveal() {
        if (!('IntersectionObserver' in window)) return;
        if (revealObserver) revealObserver.disconnect();

        revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var $el = $(entry.target);
                $el.addClass('in-view');
                // clear stagger delays once the entrance is done,
                // so hover transitions feel instant afterwards
                setTimeout(function () {
                    $el.children().css('transition-delay', '');
                }, 1100);
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

        $('.page > *').each(function (i) {
            var $el = $(this);
            $el.addClass('reveal');
            if ($el.is('article')) {
                $el.children().each(function (j) {
                    $(this).css('transition-delay', Math.min(j * 70, 490) + 'ms');
                });
            }
            revealObserver.observe(this);
        });
    }

    enhanceNewsLists(document);
    initReveal();

    /* ---------- menu (mobile hamburger) ---------- */
    $(".menus_icon").click(function () {
        if ($(".header_wrap").hasClass("menus-open")) {
            $(".header_wrap").removeClass("menus-open").addClass("menus-close");
        } else {
            $(".header_wrap").removeClass("menus-close").addClass("menus-open");
        }
    });

    /* ---------- sidebar social links (kept for compatibility) ---------- */
    $(".m-social-links").click(function () {
        if ($(".author-links").hasClass("is-open")) {
            $(".author-links").removeClass("is-open").addClass("is-close");
        } else {
            $(".author-links").removeClass("is-close").addClass("is-open");
        }
    });

    /* ---------- floating nav ---------- */
    $(".site-nav").click(function () {
        if ($(".nav").hasClass("nav-open")) {
            $(".nav").removeClass("nav-open").addClass("nav-close");
        } else {
            $(".nav").removeClass("nav-close").addClass("nav-open");
        }
    });

    $(document).click(function (e) {
        var target = $(e.target);
        if (target.closest(".nav").length != 0) return;
        $(".nav").removeClass("nav-open").addClass("nav-close");
        if (target.closest(".author-links").length != 0) return;
        $(".author-links").removeClass("is-open").addClass("is-close");
        if ((target.closest(".menus_icon").length != 0) || (target.closest(".menus_items").length != 0)) return;
        $(".header_wrap").removeClass("menus-open").addClass("menus-close");
    });

    /* ---------- back to top ---------- */
    $(document).ready(function ($) {
        var offset = 100,
            scroll_top_duration = 700,
            $back_to_top = $('.nav-wrap');

        $(window).scroll(function () {
            ($(this).scrollTop() > offset) ? $back_to_top.addClass('is-visible') : $back_to_top.removeClass('is-visible');
        });

        $(".cd-top").on('click', function (event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration);
        });
    });

    /* ---------- pjax ---------- */
    $(document).pjax('a[target!=_blank]', '.page', {
        fragment: '.page',
        timeout: 5000
    });
    $(document).on({
        'pjax:click': function () {
            $('body,html').animate({
                scrollTop: 0,
            }, 700);
        },
        'pjax:end': function () {
            if ($(".header_wrap").hasClass("menus-open")) {
                $(".header_wrap").removeClass("menus-open").addClass("menus-close");
            }
            if ($(".author-links").hasClass("is-open")) {
                $(".author-links").removeClass("is-open").addClass("is-close");
            }
            if ($(".nav").hasClass("nav-open")) {
                $(".nav").removeClass("nav-open").addClass("nav-close");
            }
            markActiveNav();
            enhanceNewsLists(document);
            initReveal();
        }
    });

    /* ---------- smooth scroll for in-page anchors ---------- */
    $(function () {
        $('a[href*=\\#]:not([href=\\#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 700);
                    return false;
                }
            }
        });
    });

});
