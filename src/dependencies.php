<?php

use Psr\Container\ContainerInterface;
use Slim\Views\PhpRenderer;

// DIC configuration
$container = $app->getContainer();

// view renderer
$container['renderer'] = function (ContainerInterface $c) {
    $settings = $c->get('settings')['renderer'];
    return new PhpRenderer($settings['template_path']);
};
