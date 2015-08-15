var tabs = require("sdk/tabs");
var data = require("sdk/self").data;

tabs.on("load", tabReady);

function isOwaLoginPage(tab) {
	return (tab.title === "Outlook Web App");
}

function isOwaLoginFailed(tab) {
	return tab.url.indexOf("reason=2") != -1;
}

function tabReady(tab) {
	console.log("isOwaLoginPage " + isOwaLoginPage(tab));

  if (isOwaLoginPage(tab) === false) {
  	console.log("this is not an OWA page: " + tab.url, + " " + tab.title);
  	return;
	}

	if (isOwaLoginFailed(tab)) {
		console.log("Login failed. Stop here.");
		return;
	}

  console.log("Start Password Search: " + tab.url);

  // storePassword();
  callPasswordManager(tab);

	console.log("FireOWA - End of runScript");
}

function storePassword() {
	require("sdk/passwords").store({
	  url: "https://superhub.hk",
	  realm: "User Login",
	  username: "jason.ching@comingtech.com.hk",
	  password: "Password35",
	});

	require("sdk/passwords").store({
		url: "https://mail.comingtech.com.hk/owa",
		realm: "User Login",
		username: "jasonc",
		password: "ctaajasonc"
	});
}

function callPasswordManager(tab) {
	require("sdk/passwords").search({
		url: tab.url,
	  onComplete: function onComplete(credentials) {
	  	if (credentials.length >= 1)
	  		login(tab, credentials[0]);
	  }
   });
}

function login(tab, credential) {
	var worker = tab.attach({
		contentScriptFile:  [
			data.url("jquery-2.1.4.min.js"), 
			data.url("main.js")]
	});

  worker.port.emit("username", credential.username);
	worker.port.emit("password", credential.password);
}