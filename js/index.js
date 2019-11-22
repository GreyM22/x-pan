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
			$('.sms-form').text('Reservation made successfully')
			$('  form').trigger("reset");
		}
		else if (parseInt(month) == parseInt(currentDate.getMonth() + 1) && parseInt(day) >= parseInt(currentDate.getDate())) {
			if (parseInt(time.split(':')[0]) >= (parseInt(currentDate.getHours()) + 2) && parseInt(time.split(':')[1]) >= parseInt(currentDate.getMinutes())) {
				request.open(formEmail.method, formEmail.action);
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				request.send(getFormDataString(formEmail));
				$(' form ').trigger("reset");
				$(' .sms-form').text('Reservation made successfully')
			}
			else {
				$('.sms-form').text('*Pleas book two hours in advance');
			}
		}
		else {
			$('  .sms-form').text('*You can not reserve a table in the past. Please change your reservation date.');
		}

	});

	/**********************************************************************/

	var formE = document.getElementById("email-form");

	// Override the submit event

	$(formE).keypress(function (e) {
		var keycode = (e.keyCode ? e.keyCode : e.which);
		if (keycode == '13') {

			// if(!$(formE).valid()){
			// 	$('.sms-subscription').text('Enter a valid email address');
			//  }
			e.preventDefault();

			let request = new XMLHttpRequest();

			request.addEventListener("load", function () {
				if (request.status === 302) { // CloudCannon redirects on success
					console.log("worked")
				}
			});

			request.open(formE.method, formE.action);
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			request.send(getFormDataString(formE));
			$('.sms-subscription').text('Thank You!');
			$('#email-form').trigger("reset");
		}
	});

	// formEmail.addEventListener("submit", function (e) {

	// 	console.log("function called ok")
	// 	e.preventDefault();

	// 	let request = new XMLHttpRequest();

	// 	request.addEventListener("load", function () {
	// 		if (request.status === 302) { // CloudCannon redirects on success
	// 			console.log("worked")
	// 		}
	// 	});

	// 	request.open(formEmail.method, formEmail.action);
	// 	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	// 	request.send(getFormDataString(formEmail));
	// 	$('.sms-subscription').fadeToggle('fast');
	// 	$('#email-form').trigger("reset");
	// });



})

/* Fromating the date in the booking form  */
var date = document.getElementById('date');

function checkValue(str, max) {
	if (str.charAt(0) !== '0' || str == '00') {
		var num = parseInt(str);
		if (isNaN(num) || num <= 0 || num > max) num = 1;
		str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
	};
	return str;
};

date.addEventListener('input', function (e) {
	this.type = 'text';
	var input = this.value;
	if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
	var values = input.split('/').map(function (v) {
		return v.replace(/\D/g, '')
	});
	if (values[0]) values[0] = checkValue(values[0], 12);
	if (values[1]) values[1] = checkValue(values[1], 31);
	var output = values.map(function (v, i) {
		return v.length == 2 && i < 1 ? v + ' / ' : v;
	});
	this.value = output.join('').substr(0, 14);
});

/* to format the time input */
var time = document.getElementById('time');

time.addEventListener('input', function (e) {
	this.type = 'text';
	var input = this.value;
	if (/\D\:$/.test(input)) input = input.substr(0, input.length - 3);
	var values = input.split(':').map(function (v) {
		return v.replace(/\D/g, '')
	});
	if (values[0]) values[0] = checkValue(values[0], 23);
	if (values[1]) values[1] = checkValue(values[1], 60);
	var output = values.map(function (v, i) {
		return v.length == 2 && i < 1 ? v + ' : ' : v;
	});
	this.value = output.join('').substr(0, 14);
});