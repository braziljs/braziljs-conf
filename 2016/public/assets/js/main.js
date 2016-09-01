
function squareBlocks (){
	$('.big-block').height($('.big-block').width());
	$('.small-block').height($('.small-block').width());
	$('.speaker-item').height($('.speaker-item').width());
	$('.highlight-block').height($('.highlight-block').width());
	$('.gold-block').height($('.gold-block').width());
	$('.silver-block').height($('.silver-block').width());
	$('.bronze-block').height($('.bronze-block').width());
	$('.img-slide').height($('.img-slide').width());
};


//Hide Gmaps Block Scroll
$('.hide-scroll').click(function(){
    $(this).addClass("hidden");
});

$(document).ready(function() {
	squareBlocks ();

	/*-- Smooth Scroll --*/
    $('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    // Push page view Google Analytics
	    _gaq.push('_trackPageview', location.pathname + target)

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});

	//Show / Hide Menu
	var lastScroll = 0;
	// $(window).scroll(function(){
	//     var scroll = $(window).scrollTop();
	//     if (scroll > lastScroll) {
	//         $('#menu-nav').addClass('hide-menu');
	//         $('.fixed-buttons').addClass('hide-buttons');
	//     } else if (scroll < lastScroll) {
	//         $('#menu-nav').removeClass('hide-menu');
	//         $('.fixed-buttons').removeClass('hide-buttons');
	//     }
	//     lastScroll = scroll;
	// });

	//Smooth Scroll to Anchor
	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});

	//Parallax Speaker
	var controller = new ScrollMagic.Controller();
	var tween = new TimelineMax ()
		.add([
			TweenMax.fromTo("#parallax-1", 1, {top: 160}, {top: -260, ease: Linear.easeNone})
		]);

	var scene = new ScrollMagic.Scene({triggerElement: ".palestrantes", duration: 4500})
					.setTween(tween)
					.addTo(controller);

	//Parallax Maps
	var controller = new ScrollMagic.Controller();
	var tween = new TimelineMax ()
		.add([
			TweenMax.fromTo("#parallax-2", 1, {top: -50}, {top: 250, ease: Linear.easeNone})
		]);

	var scene = new ScrollMagic.Scene({triggerElement: ".local", duration: 4500})
					.setTween(tween)
					.addTo(controller);


	//Css Animation Trigger

	$('.animate').addClass('animate-load');

	function fadeAnimation() {
	    var janela = this;
	    var screenHeight = $( window ).height();
	    $('.animate').each(function(i) {
	        if (jQuery(janela).scrollTop() >= ($(this).offset().top) - (screenHeight/100)*100 ) {
	            $(this).addClass('animate-scroll');
	        }
	    });
	};

	fadeAnimation();

	$(window).scroll(function(d,h) {
	    fadeAnimation();
	});

});

/* ===== Event Carousel Banner's ===== */

$(document).ready(function() {

	var ed_bullets 	= document.getElementById('edition_bullets'),
		ed_edition	= document.getElementById('edition_list'),
		ed_title	= document.getElementById('edition_title'),
		ed_current	= ed_edition.firstElementChild,
		ed_children	= ed_current.children,
		ed_target	= null;

	function swapEdition(e) {

		ed_target = e.target.getAttribute('data-edition');

		if (ed_target) {
			ed_current.classList.remove('ed_active');

			for (var i = 0; i < ed_children.length; i++) {
				ed_children[i].classList.remove('active');
			}

			ed_title.innerHTML = ' ' + e.target.innerHTML;
			ed_current = ed_edition.querySelector('[data-edition='+ ed_target +']');
			ed_children = ed_current.children;
			ed_current.classList.add('ed_active');
			ed_current.firstElementChild.classList.add('active');
		}
	}

	ed_bullets.addEventListener('click', swapEdition);

});


/* ===== Event Switch Speaker Banner's ===== */

$(document).ready(function() {
	var speakers    = document.getElementById('speakers_list'),
		sp_images	= document.getElementById('speakers_image'),
		sp_info		= document.getElementById('speakers_info'),
		sp_curr 	= speakers.firstElementChild,
		sp_curr_img = sp_images.firstElementChild,
		sp_curr_inf = sp_info.firstElementChild,
		sp_target,
		sp_curr_att,
		sp_url;

		sp_curr_img.classList.add('is_active');
		sp_curr_inf.classList.add('is_active');



	function swapSpeaker(e, id) {
		sp_target 	= id || e.target.getAttribute('data-speaker');
		sp_curr_att = sp_curr.getAttribute('data-speaker');

		if (sp_target && sp_target != sp_curr_att) {

            if(sp_curr) {
    			sp_curr_img = sp_images.querySelector('[data-speaker='+ sp_curr.getAttribute('data-speaker') +']');
    			sp_curr_inf = sp_info.querySelector('[data-speaker='+ sp_curr.getAttribute('data-speaker') +']');

    			sp_curr_img.classList.remove('is_active');
    			sp_curr_inf.classList.remove('is_active');
            }

			sp_curr_img = sp_images.querySelector('[data-speaker='+ sp_target +']');
			sp_curr_inf = sp_info.querySelector('[data-speaker='+ sp_target +']');

			sp_curr_img.classList.add('is_active');
			sp_curr_inf.classList.add('is_active');

			// sp_url = location.protocol + '//' + location.host + '/conf/speaker/' + sp_target + location.search + location.hash;
			// history.pushState({}, "", sp_url);

			sp_curr = id ? speakers.querySelector('[data-speaker='+id+']') : e.target;
		}
	}

    var currentSpeaker = location.pathname.match(/\/speaker\/([a-z0-9_\-]+)/);
    if(currentSpeaker && currentSpeaker.length === 2) {
        swapSpeaker(null, currentSpeaker[1]);

        setTimeout(function(){
            $('html, body').animate({
                scrollTop: $('#speakers_image').offset().top
            }, 300, function(){
                // do something
            });
        }, 2000);
    }

	speakers.addEventListener('click', swapSpeaker);

    // cleaning up the hash on load.
    if(location.hash == '#menu-nav') {
        location.hash = '';
    }
    document.querySelector('#menu-trigger').addEventListener('click', function (event) {
        var h = location.hash;
        if (h == '#menu-nav') {
            history.go(-1);
        } else {
            location.hash = 'menu-nav';
        }
    });
});


$(document).ready(function() {
	var speakers  	= document.getElementById('speakers_list'),
		spk_img   	= document.getElementById('speakers_image'),
		spk_vine 	= document.getElementById('speakers_vine'),
		spk_btn   	= document.getElementById('btn_speaker'),
		spk_refe	= spk_img.firstElementChild,
		ifrm 		= document.createElement('iframe'),
		element,
		attr;

		spk_btn.style.backgroundImage = spk_refe.style.backgroundImage;

		if (spk_refe.children.length > 0) {
			var spk_url	= spk_refe.firstElementChild.getAttribute('data-url');
			spk_btn.style.display = 'block';
		} else {
			spk_btn.style.display = 'none';
		}

	function getVine(e, id) {
		attr = id || e.target.getAttribute('data-speaker');
		element = spk_img.querySelector('[data-speaker='+ attr +']');
		spk_btn.style.backgroundImage = element.style.backgroundImage;

		if (element.children.length > 0) {
			spk_btn.style.display = 'block';
		} else {
			spk_btn.style.display = 'none';
		}

		if(spk_refe != element) {
			spk_url = element.firstElementChild.getAttribute('data-url');
			spk_refe = id ? spk_img.querySelector('[data-speaker='+ id +']') : element;
		}
	}	

	speakers.addEventListener('click', getVine);

    var current_vine = location.pathname.match(/\/speaker\/([a-z0-9_\-]+)/);
    if(current_vine && current_vine.length === 2) {
        getVine(null, current_vine[1]);
    }

	spk_btn.addEventListener('click', function() {
		ifrm.setAttribute('src', 'https://www.youtube.com/embed/' + spk_url);
		spk_vine.appendChild(ifrm);		
	});

	document.body.addEventListener('click', function() {
		if (document.body.classList.contains('modal-open')) {
			spk_vine.removeChild(ifrm);
		}
	});
});
