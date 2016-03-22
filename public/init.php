<!DOCTYPE html>
<html>
<head>
	<script src="dist/js/admin/sweetalert.min.js"></script>
	<link rel="stylesheet" href="bootstrap.min.css" type="text/css" >
	<link rel="stylesheet" href="base.css" type="text/css" >
	<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
	<link href='dist/css/bootstrap-material-design.min.css' rel='stylesheet' type='text/css'>
	<link href='dist/css/ripples.min.css' rel='stylesheet' type='text/css'>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
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