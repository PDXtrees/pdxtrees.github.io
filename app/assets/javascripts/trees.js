$(document).ready(function() {
  var bbox_map = L.mapbox.map('bbox', 'examples.map-9ijuk24y').setView([45.53, -122.63], 12);

  $.ajax({
    type: 'GET',
    url: 'http://civicapps.iknuth.com/data/Heritage_Trees_pdx.geojson?limit=0',
    dataType: 'jsonp',
    success: function(geojson) {
      $.each(geojson.features, function (i, feature) {
        feature.properties['marker-symbol'] = "park";
        feature.properties['marker-color'] = "#006400";
        feature.properties.iconSize = [50,50];
      });
      var markerLayer = L.mapbox.markerLayer(geojson).addTo(bbox_map);

      markerLayer.eachLayer(function(layer) {

        // here you call `bindPopup` with a string of HTML you create - the feature
        // properties declared above are available under `layer.feature.properties`

        var content = '<p><b>' + layer.feature.properties.common_nam + '</b><\/p>' +
            '<p><i>' + layer.feature.properties.scientific + '</i><\/p>' + 
            '<p>' + layer.feature.properties.address + '<\/p>' + 
            '<p>Year: ' + layer.feature.properties.year + '<\/p>';
        layer.bindPopup(content);
      });
    }
  });
});