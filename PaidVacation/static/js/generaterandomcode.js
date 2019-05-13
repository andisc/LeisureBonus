//add text to the list have it randomly appear when click me button is pressed
//var list = ["a","b","c","this bit of text"];

function getRandom() {
	var text = "";
  	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  	for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}