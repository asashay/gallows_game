function getUserData () {
	$("#loginForm").submit(function () {
		event.preventDefault();

		var $form = $(this);
		var url = $form.attr("action");
		var username = $form.find("input[name='username']").val();
		var password = $form.find("input[name='password']").val();

		var posting = $.post(url, {
			username: username,
			password: password
		});

		posting.done(function (data) {
			window.location.href = "/playground#close";
			window.location.reload();
		})
		.fail(function (data) {
			$( ".failMessage" ).remove();

			var error = $.parseJSON(data.responseText);
			$form.find("input[name='password']").after("<p class='failMessage'>" + error.message + '</p>');
		});
	});
}

function logoutUser () {
	$("#logoutForm").submit(function () {
		event.preventDefault();

		var $form = $(this);
		var url = $form.attr("action");

		var posting = $.post(url);

		posting.done(function (data) {
			window.location.href = "/playground";
		})
		.fail(function (data) {
			var error = $.parseJSON(data.responseText);
			$form.html(error.message);
		});
	});

}

$(document).ready(function () {
	getUserData();
	logoutUser();
})