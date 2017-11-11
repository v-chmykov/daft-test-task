<?php

namespace Brewery;

use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface;

class BreweryService
{
    /**
     * Base URL for the Brewerydb API
     *
     * @var string
     */
    const BASE_URL = 'http://api.brewerydb.com/v2/';

    /**
     * API key
     * @var string
     */
    protected $_apiKey = '';

    /**
     * BreweryService constructor.
     *
     * @param string $apiKey Brewerydb API key
     */
    public function __construct($apiKey) {
        $this->_apiKey = (string) $apiKey;
    }

    /**
     * Sends a request using curl to the required endpoint
     *
     * @param string $endpoint
     * @param array  $query
     *
     * @return string
     */
    public function request($endpoint, $query = []) {
        $query['key'] = $this->_apiKey;
        $client = new Client(['base_uri' => self::BASE_URL]);
        $response = $client->request('GET', $endpoint, [
            'query' => $query,
        ]);

        if (200 === $response->getStatusCode()) {
            return (string) $response->getBody();
        }

        return '{}';
    }
}