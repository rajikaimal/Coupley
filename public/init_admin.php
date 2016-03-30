<!DOCTYPE html>
<html>
<head>
    <script src="dist/js/socket.io-1.3.4.js"></script>
    <script src="dist/js/admin/canvas.js"></script>
    <script src="dist/js/admin/sweetalert.min.js"></script>
    <link rel="stylesheet" href="dist/css/admin/bootstrap.min.css" type="text/css">
    <link href='dist/css/OpenSans.css' rel='stylesheet' type='text/css'>
    <link href='dist/css/bootstrap-material-design.min.css' rel='stylesheet' type='text/css'>
    <link href='dist/css/ripples.min.css' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="dist/css/admin/sweetalert.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="stylesheet" href="dist/css/admin/AdminLTE.min.css">
    <link rel="stylesheet" href="dist/css/admin/_all-skins.min.css">
    <link rel="stylesheet" href="dist/css/admin/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coupley</title>
</head>
<body>
<div id="content"></div>

<div id="chartContainer"></div>
<div id="chartContainer1"></div>

<script src="dist/css/admin/plugins/jQuery/jQuery-2.1.4.min.js"></script>
<script src="dist/js/admin/jquery-ui.min.js"></script>
<script src="dist/js/material.min.js"></script>
<script src="dist/js/ripples.min.js"></script>
<script src="dist/js/admin/bootstrap.min.js"></script>
<script src="dist/css/admin/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<script>
    $.material.init();
    var socket = io('http://localhost:8081');
</script>
<script src="bundle.js"></script>
<script src="dist/js/admin/app.min.js"></script>
<script src="dist/js/admin/demo.js"></script>


</body>

</html>