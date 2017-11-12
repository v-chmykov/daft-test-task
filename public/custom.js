function init() {
    window.app = new Vue({
        data: function() {
            return {
                isRequestInProgress: false,
                isSearchInProgress: false,
                isSearchResultsVisible: false,
                searchQuery: '',
                searchType: 'beer',
                randomBeer: {
                    name: '',
                    description: '',
                    labels: {
                        medium: ''
                    },
                    breweries: [{
                        name: ''
                    }]
                },
                searchResults: []
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
                        self.randomBeer = response.data.data;
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

                        if (response.data.hasOwnProperty('data')) {
                            console.log(response.data.data);
                            self.searchResults = response.data.data;
                        } else {
                            self.searchResults = [];
                        }
                    })
                    .catch(function(error) {
                        alert("Error, see 'console' for details");
                        console.log(error);
                    });
            }
        }
    }).$mount('#app');
}

document.addEventListener("DOMContentLoaded", init);