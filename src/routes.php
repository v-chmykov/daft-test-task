<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Brewery\Brewery;

// Routes

$app->get('/', function (Request $request, Response $response) {
    // Render index view
    return $this->renderer->render($response, 'index.html');
})->setName('main');

/**/
$app->get('/api/random-beer', function (Request $request, Response $response) {
    $key = $this->get('settings')['brewery_key'];
    $brewery = new Brewery($key);

    return $response->withJson($brewery->randomBeer());
});

/**/
$app->get('/api/search', function (Request $request, Response $response) {
    $key = $this->get('settings')['brewery_key'];
    $brewery = new Brewery($key);
    $options = [
        'q' => $request->getQueryParam('q', ''),
        'type' => $request->getQueryParam('type', 'beer')
    ];

    return $response->withJson($brewery->search($options));
});
