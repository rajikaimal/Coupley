<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="bootstrap.min.css" type="text/css" >
	<link rel="stylesheet" href="base.css" type="text/css" >
	<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
	<link href='dist/css/bootstrap-material-design.min.css' rel='stylesheet' type='text/css'>
	<link href='dist/css/ripples.min.css' rel='stylesheet' type='text/css'>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="/favicons/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
	<link rel="manifest" href="/favicons/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">
	<title>Coupley</title>
</head>
<body>
	<div id="content"></div>
	<script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
	<script src="https://cdn.socket.io/socket.io-1.3.4.js"></script>
	<script src="dist/js/material.min.js"></script>
	<script src="dist/js/ripples.min.js"></script>
	<script>
		$.material.init();
		var socket = io('http://localhost:8080');
	</script>
	<script src="bundle.js"></script>
</body>
</html>