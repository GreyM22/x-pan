$(function () {

	//modal diaolg 
	$('[role=dialog]')
		.on('show.bs.modal', function (e) {
			$(this)
				.find('[role=document]')
				.removeClass()
				.addClass('modal-dialog ' + $(e.relatedTarget).data('ui-class'))
		})

	//rotating the logo 
	$(window).scroll(function () {
		var theta = $(window).scrollTop() / 100;
		$('.stamp').css({ transform: 'rotate(' + theta + 'rad)' });

	});

	//rotating the logo inside the modal dialog 
	$('.modal').scroll(function () {
		var modalDialogScroll = $('.modal').scrollTop() / 100;
		$('.modal-body .stamp').css({ transform: 'rotate(' + modalDialogScroll + 'rad)' });
	});

	// Fetch the form element
	function getFormDataString(formEl) {
		var formData = new FormData(formEl),
			data = [];

		for (var keyValue of formData) {
			data.push(encodeURIComponent(keyValue[0]) + "=" + encodeURIComponent(keyValue[1]));
		}

		return data.join("&");
	}



	var formEmail = document.getElementById("reserve-form");

	// Override the submit event
	formEmail.addEventListener("submit", function (e) {

		e.preventDefault();

		let request = new XMLHttpRequest();

		request.addEventListener("load", function () {
			if (request.status === 302) { // CloudCannon redirects on success
			}
		});

		// Validation of the reservation form

		let date = $("#date").val();
		let month = date.split("/")[0];
		let day = date.split("/")[1];
		let time = $('#time').val();

		let currentDate = new Date();

		let x = parseInt(month);
		let y = parseInt(currentDate.getMonth());
		console.log(currentDate)

		if (parseInt(month) > parseInt(currentDate.getMonth()) + 1) {
			e.preventDefault();

			let request = new XMLHttpRequest();

			request.addEventListener("load", function () {
				if (request.status === 302) { // CloudCannon redirects on success
				}
			});
			request.open(formEmail.method, formEmail.action);
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			request.send(getFormDataString(formEmail));
			$('footer .sms-form').text('Reservation made successfully')
			$(' footer form').trigger("reset");
			$("footer").animate({ scrollTop: 0 }, "slow");
		}
		else if (parseInt(month) == parseInt(currentDate.getMonth() + 1) && parseInt(day) >= parseInt(currentDate.getDate())) {
			if (parseInt(time.split(':')[0]) >= (parseInt(currentDate.getHours()) + 2) && parseInt(time.split(':')[1]) >= parseInt(currentDate.getMinutes())) {
				request.open(formEmail.method, formEmail.action);
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				request.send(getFormDataString(formEmail));
				$('footer form ').trigger("reset");
				$("footer").animate({ scrollTop: 0 }, "slow");
				$('footer .sms-form').text('Reservation made successfully')
			}
			else {
				$('footer .sms-form').text('*Pleas book two hours in advance');
				$("footer").animate({ scrollTop: 0 }, "slow");
			}
		}
		else {
			$('footer .sms-form').text('*You can not reserve a table in the past. Please change your reservation date.');
			$("footer").animate({ scrollTop: 0 }, "slow");
		}

	});


})

