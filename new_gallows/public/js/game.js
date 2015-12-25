var alphabet = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л', 'м', 
'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я', '\''];
var counter = 0;

var wins = 0;
var losses = 0;

function generateWord() {
	var el = $(".wordSecret").html();
	el = el.toLowerCase();
	$(".word").empty();

	for (var i = 0; i <= el.length; i++) {
		if ($.inArray(el[i], alphabet) != -1) {
			$('.word').append("<div " + "class=\"" + alphabet.indexOf(el[i]) + "\">_&nbsp;</div>");
		};
	};
}

function populateSymbols () {
	$( ".symbolsContainer" ).empty();
	var symbols = '';
	$.each(alphabet, function (i, val) {
		var element = "<div id=\"" + i +"\" class=\"" + "letter\">" + val + "</div>";
		symbols += element;
	})


	$(".symbolsContainer").append(symbols);
};

function checkLetter() {
	$('.symbols .letter').click(function () {
		var letter = $(this).html();
		var word = $( '.wordSecret' ).html();

		var indexLetter = word.indexOf(letter);

		if (indexLetter == -1) {
			$(this).appendTo( $( '.symbolsWrongContainer' ) );
			counter += 1;

			switch (counter) {
				case 1:
				drawBasement();
				break;
				case 2:
				drawPole();
				break;
				case 3:
				drawBeam();
				break;
				case 4:
				drawStick();
				break;
				case 5:
				drawHead();
				break;
				case 6:
				drawBody();
				break;
				case 7:
				drawHands();
				break;
				case 8:
				drawLegs();
				$( ".btn" ).css("display", "initial");
				losses += 1;
				addScore();
				$('.symbols .letter').off();
				break;
			};

			return;
		} else {
			$('.' + alphabet.indexOf(letter)).html(letter);
			$(this).appendTo( $( '.symbolsRightContainer' ) );

			var wordToQuess = $(".word").text();
			var wordSecret = $( ".wordSecret" ).html();

			if (wordToQuess == wordSecret) {
				$( ".btn" ).css("display", "initial");
				wins += 1;
				addScore();
				$('.symbols .letter').off();
			};

			return;
		}

		return;
	});
};

function addScore() {
	$( ".victories p:last-child" ).html(wins);
	$( ".losses p:last-child" ).html(losses);
	return
};

function restoreInititalState () {
	$(".symbolsRightContainer, .symbolsWrongContainer, #canvas").empty();
	$( ".btn" ).css("display", "none");
	counter = 0;
	return
}

function btnReload () {
	$( ".reload" ).click(function () {
		location.reload();
		return
	});
};

function btnPlayMore () {
	$( ".playMore" ).click(function () {
		$.ajax({
			method: "GET",
			url: "http://localhost:3000/playgroundAJAX",
			dataType: "json",
			complete: function (data) {
				var newWord = $.parseJSON(data.responseText);
				$( ".wordSecret" ).html(newWord.word);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				counter = 0;
				restoreInititalState();

				generateWord();
				populateSymbols();
				checkLetter();
				addScore();
				btnReload();
				btnPlayMore();
			}
		})
	})
}


var canvas = document.getElementById('gallows');
var ctx = canvas.getContext('2d');

function drawBasement () {
	ctx.strokeStyle = "white";
	ctx.lineWidth = 15;
	ctx.lineCap = 'square';
	ctx.beginPath();
	ctx.moveTo(50, 350);
	ctx.quadraticCurveTo(100, 300, 250, 350);
	ctx.stroke();
}

function drawPole () {
	ctx.beginPath();
	ctx.moveTo(100, 329);
	ctx.lineTo(100, 50);
	ctx.stroke();
}

function drawBeam () {
	ctx.beginPath();
	ctx.moveTo(50, 50);
	ctx.lineTo(200, 50);
	ctx.stroke();
}

function drawStick () {
	ctx.lineCap = 'butt';
	ctx.beginPath();
	ctx.moveTo(200, 50);
	ctx.lineTo(200, 100);
	ctx.stroke();
}

function drawHead () {
	ctx.lineWidth = 5;
	ctx.lineCap = 'butt';
	ctx.beginPath();
	ctx.moveTo(228, 128);
	ctx.arc(200, 128, 28, 0*Math.PI, 2*Math.PI);
	ctx.stroke();
}

function drawBody () {
	ctx.beginPath();
	ctx.moveTo(200, 156);
	ctx.lineTo(200, 250);
	ctx.stroke();
}

function drawHands () {
	ctx.beginPath();
	ctx.moveTo(200, 200);
	ctx.lineTo(250, 150);

	ctx.moveTo(200, 200);
	ctx.lineTo(150, 150);
	ctx.stroke();
}

function drawLegs () {
	ctx.beginPath();
	ctx.moveTo(200, 250);
	ctx.lineTo(250, 300);

	ctx.moveTo(200, 250);
	ctx.lineTo(150, 300);
	ctx.stroke();
}

$(document).ready(function () {
	generateWord();
	populateSymbols();
	checkLetter();
	addScore();
	btnReload();
	btnPlayMore();

});