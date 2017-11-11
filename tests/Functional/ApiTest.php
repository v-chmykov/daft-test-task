<?php

namespace Tests\Functional;

class ApiTest extends BaseTestCase
{
    /**/
    public function testGetHomepage() {
        $response = $this->runApp('GET', '/');
        $this->assertEquals(200, $response->getStatusCode());
        $body = (string) $response->getBody();
        $this->assertContains('Distilled SCH Beer Application', $body);
    }

    /**/
    public function testGetRandomBeer() {
        $response = $this->runApp('GET', '/api/random-beer');

        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()['Content-Type'][0];
        $this->assertContains('application/json', $contentType);
    }

    /**/
    public function testSearch() {
        $response = $this->runApp('GET', '/api/search?q=test');

        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()['Content-Type'][0];
        $this->assertContains('application/json', $contentType);
    }
}