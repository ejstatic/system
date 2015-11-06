function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function sendRequest(name, email, company, size) {
	var str = name + '|' + email + '|' + company + '|' + size;
	console.log('sendTracking:', str);
	ga('send', 'event', 'email', 'click', str);
}


jQuery(document).ready(function() {
	$('#request-form').submit(function (event) {
		console.log('submit...');
		var errorClass = 'has-error',
			hasError = false,
			name = $('[name="form-name"]'),
			email = $('[name="form-email"]'),
			company = $('[name="form-company"]'),
			size = $('[name="form-size"]');

		$('.alert-danger').addClass('hidden');
		$('.alert-success').addClass('hidden');
		$('.' + errorClass).removeClass(errorClass);

		if (!name.val()) {
			hasError = true;
			name.parent().addClass(errorClass);
		}
		if (!email.val() || !validateEmail(email.val())) {
			hasError = true;
			email.parent().addClass(errorClass);
		}
		if (!company.val()) {
			hasError = true;
			company.parent().addClass(errorClass);
		}
		if (!size.val()) {
			hasError = true;
			size.parent().addClass(errorClass);
		}

		if (!hasError) {
			sendRequest(name.val(), email.val(), company.val(), size.val());
			$('.alert-success').removeClass('hidden');
			name.val('');
			email.val('');
			company.val('');
			size.val('');
		} else {
			$('.alert-danger').removeClass('hidden');
		}
		event.preventDefault();
	});

	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), 0);
	});	
	
    /*
        Background slideshow
    */
    $('.top-content').backstretch("assets/img/backgrounds/1.jpg");
    $('.how-it-works-container').backstretch("assets/img/backgrounds/1.jpg");
    $('.call-to-action-container').backstretch("assets/img/backgrounds/1.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    
    /*
        Wow
    */
    new WOW().init();
    
	/*
	    Modals
	*/
	$('.launch-modal').on('click', function(e){
		e.preventDefault();
		$( '#' + $(this).data('modal-id') ).modal();
	});
	
});


jQuery(window).load(function() {
	
	/*
		Loader
	*/
	$(".loader-img").fadeOut();
	$(".loader").delay(1000).fadeOut("slow");
	
	/*
		Hidden images
	*/
	$(".modal-body img, .testimonial-image img").attr("style", "width: auto !important; height: auto !important;");
	
});

