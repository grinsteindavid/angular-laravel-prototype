<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Google Map Api -->
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwsfQN3Crcir7vQXpLpGPxw8m2N2mDU70&language=es"></script>
  <!-- CSS & JS Compiled -->
  <link rel="stylesheet" type="text/css" href="{{ elixir('css/app.css') }}">
  <script type="text/javascript" src="{{ elixir('js/bootstrap.js') }}"></script>
  <script type="text/javascript" src="{{ elixir('js/app.js') }}"></script>
  <!-- Plugins -->
  <!-- Bootstrap 3 BugFix for IE10 -->
  <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/js/ie10-viewport-bug-workaround.js"></script>
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
  <title> Tac Empresarial </title>
</head>
<body ng-app="main">

  <div ui-view="navbar"></div>
  <div ui-view="body"></div>
  <div ui-view="footer"></div>
  <chat-container ng-show="chatActive"></chat-container>
</body>
</html>
