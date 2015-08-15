self.port.on("username", function(message) {
	console.log("FireOwa - username " + message);
	document.getElementById('username').value = message;
	loginIfReady();
});

self.port.on("password", function(message) {
	console.log("FireOwa - password xxxx");
	document.getElementById('password').value = message;
	loginIfReady();
})

function loginIfReady() {
	var userName = document.getElementById('username').value;
	var password = document.getElementById('password').value;

	console.log(username.legnth);
	console.log(password.legnth);

	if (!userName) {
		console.log('loginIfReady - userName not ready');
		return;
	}

	if (!password) {
		console.log('loginIfReady - password not ready');
		return;
	}

	console.log("loginIfReady - submit");
	$('#rdoPrvt').click();

	$("input[type='submit']").click();
}