<?php

namespace Brewery;

class Brewery
{
    /**
     * @var BreweryService
     */
    protected $service = null;

    /**
     * Brewery constructor.
     *
     * @param $apiKey
     */
    public function __construct($apiKey) {
        $this->service = new BreweryService($apiKey);
    }

    /**
     * @return array
     */
    public function randomBeer() {
        // A little trick to get a random beer with image and information about brewing
        $string = $this->service->request('beer/random', [
            'withBreweries' => 'Y',
            'hasLabels' => 'Y',
        ]);

        return json_decode($string, true);
    }

    /**
     * @param array $options
     *
     * @return string
     */
    public function search($options = []) {
        $string = $this->service->request('search', $options);

        return json_decode($string, true);
    }
}