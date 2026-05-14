var errors = 0;

window.onerror = function(msg, url, ln) {
	let li = document.createElement('li');
	li.innerHTML = msg + " | " + url + ": " + ln; 
	document.querySelector('details ul').append(li);
	errors ++;
	document.querySelector('details summary').innerHTML = "Developer ("+errors+")";
}