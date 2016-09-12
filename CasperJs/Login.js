'use strict';

/**
 * Login.js
 * @param {string} arg1
 * @param {string} arg2
 * casperjs --web-security=false --ignore-ssl-errors=true --ssl-protocol=any --cookies-file=cookies Login.js 2>&1 | tee log.html
 **/

var casper = require('casper').create({
	loadImages: false,
	verbose: true,
	logLevel: 'debug',
	stepTimeout: 30000,
	onError: function (self, message) {
		console.log('FATAL: Step' + message);
		this.exit();
	},
	onStepTimeout: function (self, message) {
		console.log('TIMEOUT: Step' + message);
		this.exit();
	},
	onDie: function (message, status) {
		console.log('DIE: Step' + message);
		this.exit();
	}
});


casper.on('resource.requested', function (requestData, request) {
	var deny = [
		'ad'
	];
	var allow = [
		'.js',
		'.css'
	];
	var no_skip_flg = false;
	allow.forEach(function (needle) {
		if (requestData.url.indexOf(needle) > 0) {
			no_skip_flg = true;
		}
	});
	deny.forEach(function (needle) {
		if (requestData.url.indexOf(needle) > 0) {
			no_skip_flg = false;
		}
	});
	if (!no_skip_flg) {
		casper.log('Skipped: ' + requestData.url, 'info');
		request.abort();
	}
});

phantom.cookiesEnabled = true;

var ua = "Mozilla/5.0 (X11; Linux i686; rv:45.0) Gecko/20100101 Firefox/45.0";
casper.userAgent(ua);

var fs = require('fs');
var arg1 = casper.cli.get(1);
var arg2 = casper.cli.get(2);

casper.start('http://example.com', function () {
	this.echo('start');
});

casper.then(function () {
	this.echo(' >> make referrer');
	this.evaluate(function () {
		var url = 'http://a.example.com';
		var link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('id', "myTargetUrl");
		document.body.appendChild(link);
	});
	this.click('a#myTargetUrl');
});

casper.then(function () {
	if (this.getTitle() !== "login") {
		this.echo(this.getHTML());
		this.capture('login.png', {
			top: 0,
			left: 0,
			width: 900,
			height: 600
		});
		this.die(" >> Fail.", 1);
	}
	this.fill('form#login_form', {
		'login': arg1,
		'passwd': arg2
	}, true);
});

casper.waitForSelector("h1.targetClass", function () {
	this.echo(' >> open target');
	this.clickLabel('click me!', 'a');
});

casper.run(function () {
	this.echo(' >> complete');
	this.exit();
});
