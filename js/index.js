
$(document).ready(function () {
    $(".modal.permalink").each(function () {
        if (window.location.href.indexOf($(this).attr("id")) != -1) {
            $(this).modal('show');
        }
    });
});

$(function () {

	// to change the img on scroll in the header 
	$(window).on('scroll', function (event) {
		
		let docHeight = $('header').outerHeight(),
        scrollTop = $(window).scrollTop(),
		windowHeight = $(window).height();
		
		if( scrollTop == 0 ){
			$('#image')[0].src= 'images/shrimp-only-plate.png';
		}
		else if( scrollTop + windowHeight <= docHeight/5*3 ){
			$('#image')[0].src= 'images/carciofi-big.png';
		}
		else if( scrollTop + windowHeight <= docHeight/5*4 ){
			$('#image')[0].src= 'images/egg-flower-bg-trasparent.png';
		}
		else if( scrollTop + windowHeight <= docHeight-10 ){
			$('#image')[0].src= 'images/salmon-big.png';
		}
		else{
			$('#image')[0].src= 'images/egg-potato-only-plate.png';
		}

	});


	//rotating the logo 
	$(window).scroll(function () {
		var theta = $(window).scrollTop() / 100;
		$('.stamp').css({ transform: 'rotate(' + theta + 'rad)' });

	});

	// for the modal dialog 
	$('.modal').scroll(function () {
		var modalDialogScroll = $(this).scrollTop() / 100;
		$(this).find('.stamp').css({ transform: 'rotate(' + modalDialogScroll + 'rad)' });
	});

	// Fetch the form element
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;
    $('#date').attr('min', maxDate);


    let telInput = $("#phone");

    // initialize
    telInput.intlTelInput({
        initialCountry: 'auto',
        preferredCountries: ['us', 'gb', 'br', 'ru', 'cn', 'es', 'it'],
        autoPlaceholder: 'aggressive',
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/js/utils.js",
        geoIpLookup: function (callback) {
            fetch('https://api.ipdata.co/?api-key=a86af3a7a4a375bfa71f9259b5404149d1eabb74adcc275e4faf9dfe',
            {
                cache: 'reload'
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Failed: ' + response.status)
            }).then(ipjson => {
                callback(ipjson.country_code)
            }).catch(e => {
                callback('us')
            })
        }
	});
	
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('safari') != -1) {
            document.getElementById('date').type = 'date';
            document.getElementById('time').type = 'time';
        } else {
            if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
                document.getElementById('time').type = 'time';
            }
            else {
                console.log('safari');
            }
        }
    }	
	/**********************************************************************/

	var formE = document.getElementById("email-form");

	// Override the submit event

	$(formE).keypress(function (e) {
		var keycode = (e.keyCode ? e.keyCode : e.which);
		if (keycode == '13') {

			e.preventDefault();

			let request = new XMLHttpRequest();

			request.addEventListener("load", function () {
				if (request.status === 302) { // CloudCannon redirects on success
					console.log("worked")
				}
			});


			if (!$('#email-form').valid({ errorPlacement: function (error, element) { } })) {
				$('.sms-subscription').text('Enter a valid email address');
			} else {

				request.open(formE.method, formE.action);
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				request.send(getFormDataString(formE));
				$('.sms-subscription').text('Thank You!');
				$('#email-form #email, #submit').hide();
				$('#email-form').trigger("reset");

			}
		}
	});

	$('#submit').click(function(){

		let request = new XMLHttpRequest();

		request.addEventListener("load", function () {
			if (request.status === 302) { // CloudCannon redirects on success
				console.log("worked")
			}
		});


		if (!$('#email-form').valid({ errorPlacement: function (error, element) { } })) {
			$('.sms-subscription').text('Enter a valid email address');
		} else {

			request.open(formE.method, formE.action);
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			request.send(getFormDataString(formE));
			$('.sms-subscription').text('Thank You!');
			$('#email-form #email, #submit').hide();
			$('#email-form').trigger("reset");

		}
	})
})
