function init() {
    window.app = new Vue({
        data: function() {
            return {
                isRequestInProgress: false,
                isSearchInProgress: false,
                isSearchResultsVisible: false,
                searchQuery: '',
                searchType: 'beer',
                randomBeerResponse: {
                    data: {},
                    status: ''
                },
                searchResponse: {
                    data: {},
                    status: ''
                }
            };
        },
        created: function() {
            this.getAnotherRandomBeer();
        },
        methods: {
            getAnotherRandomBeer: function() {
                var self = this;
                self.isRequestInProgress = true;
                axios.get('/api/random-beer')
                    .then(function(response) {
                        self.randomBeerResponse = response.data;
                        self.isRequestInProgress = false;
                    })
                    .catch(function(error) {
                        alert("Error, see 'console' for details");
                        console.log(error);
                    });
            },
            getFromThisBrewery: function() {
                this.searchQuery = this.randomBeer.breweries[0].name;
                this.searchType = 'brewery';
                this.search();
            },
            search: function() {
                var self = this;
                var queryParams = {
                    q: self.searchQuery,
                    type: self.searchType
                };

                self.isSearchInProgress = true;
                axios.get('/api/search', { params: queryParams })
                    .then(function(response) {
                        self.isSearchInProgress = false;
                        self.isSearchResultsVisible = true;
                        self.searchResponse = response.data;
                        console.log(response.data);
                    })
                    .catch(function(error) {
                        alert("Error, see 'console' for details");
                        console.log(error);
                    });
            }
        },
        computed: {
            randomBeer: function() {
                if ('success' === this.randomBeerResponse.status) {
                    return this.randomBeerResponse.data;
                }

                // Default value                
                return {
                    name: '',
                    description: '',
                    labels: {
                        medium: ''
                    },
                    breweries: [{
                        name: ''
                    }]
                };
            },
            searchResults: function() {
                if ('success' == this.searchResponse.status &&
                    this.searchResponse.hasOwnProperty('data')) {
                    return this.searchResponse.data;
                }

                // Default value
                return [];
            }
        }
    }).$mount('#app');
}

document.addEventListener("DOMContentLoaded", init);