var bbox_map = L.mapbox.map('bbox', 'examples.map-9ijuk24y').setView([45.5, -122.5], 10);

$.ajax({
  type: 'GET',
  url: 'http://civicapps.iknuth.com/data/Heritage_Trees_pdx.geojson?limit=0',
  dataType: 'jsonp',
  success: function(geojson) {
    var markerLayer = L.geoJson(geojson).addTo(bbox_map);
  }
});