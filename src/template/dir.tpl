<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<style>
		.main {
			display: flex;
			align-items: center;
		}
		.item {
			flex: 1;
			font-size: 30px;
			color: #ff5d5d;
			text-decoration: none;
		}
	</style>
	<title>{{title}}</title>
</head>
<body>
	<div class="main">
	{{#each files}}
		<a class="item" href="{{../dir}}/{{this}}">{{this}}</a>
	{{/each}}
	</div>
</body>
</html>