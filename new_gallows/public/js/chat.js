var input = $('#chatInput');
var ul = $('#chatWindow ul');
var form = $('#chatWindow form');

var socket = io.connect(''/* {reconnect: false}*/);

socket
.on('message', function (username, message) {
	printMessage(username + "> " + message);
})
.on('leave', function (username){
	printStatus(username + " вийшов з чату");
})
.on('join', function (username) {
	printStatus(username + " зайшов до чату");
})
.on('connect', function() {
	printStatus("З'єднання встановлено");
	form.on('submit', sendMessage);
	input.prop('disabled', false);
})
.on('disconnect', function() {
	printStatus("З'єднання втрачено");
	form.off('submit', sendMessage);
	input.prop('disabled', true);
		});

function sendMessage() {
	var text = input.val();
	socket.emit('message', text, function() {
		$('<li>').text("я> " + text).css({"color": "#34db2e", "font-weight": "bold"}).appendTo(ul);
				//printMessage("я> " + text);
			});

	input.val('');
	return false;
}

function printStatus(status) {
	$('<li>').append($('<i>').text(status)).appendTo(ul);
}

function printMessage(text) {
	$('<li>').text(text).css({"color": "#327add", "font-weight": "bold"}).appendTo(ul);
}