<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Untitled quiz app social quiz application">
    <title>Untitled Quiz App</title>

    <link rel="stylesheet" href="{{ asset('css/app.css') }}">


</head>

<body class="antialiased">
    <div id="index"></div>
    <script src="{{ asset('js/manifest.js') }}"></script>
    <script src="{{ asset('js/vendor.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>