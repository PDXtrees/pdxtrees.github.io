(function() {
    "use strict";
    var map = L.mapbox.map('map', 'eknuth.gmh51030',
        { zoomControl: false }).setView([45.52, -122.67], 13);
    new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

    window.TreesCtrl = function TreesCtrl ($scope, $http) {
        var tree_layer;
        $scope.searchTerm = null;
        $scope.location = null;
        $scope.searchResults = [];
        $scope.showList = false;

        $scope.zoomTo = function (feature, index) {
            // if (index) {
            //     $scope.featuredResults = $scope.searchResults.slice(index,3);
            //     $scope.showList = false;
            // }

            map.setView([feature.geometry.coordinates[1],
                feature.geometry.coordinates[0]], 18);
        };

        $scope.search = function (term) {
            $scope.showList = false;
            if (term.length == 0) {
                $scope.searchResults = [];
                map.removeLayer(tree_layer);
                return false;
            } else if (term.length < 3) {
                return false;
            }
        
            var url = "http://civicapps.iknuth.com/data/Heritage_Trees_pdx.geojson";
            url = url + '?callback=JSON_CALLBACK&search-field=common_nam&search-term=' + term;

            if ($scope.location) {
                url = url + '&closest-to-point=' + [
                    $scope.location.coords.longitude,
                    $scope.location.coords.latitude
                ].join(',');
            }
            $http.jsonp(url).success(function (d) {
                if (tree_layer) {
                    map.removeLayer(tree_layer);
                }
                $scope.searchResults = d.features;
                $scope.featuredResults = d.features.slice(0,3);
                tree_layer = L.geoJson(d).addTo(map);
            });
        };

        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.location = pos;
        },
        function (err) {
            $scope.error = err;
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });

    };



})();