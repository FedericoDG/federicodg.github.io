const mapOptions = {
  center: [-32.34339, -65.01315],
  zoom: 18,
  attributionControl: false,
  scrollWheelZoom: false,
};

const map = new L.map('map', mapOptions);

const greenIcon = L.icon({
  iconUrl: 'assets/images/marker.png',

  iconSize: [30, 45],
  iconAnchor: [15, 45],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

L.marker([-32.34339, -65.01315], { icon: greenIcon }).addTo(map);

const layer = new L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.{ext}',
  {
    minZoom: 0,
    maxZoom: 20,
    ext: 'png',
  }
);

map.once('focus', function () {
  this.scrollWheelZoom.enable();
});

map.addLayer(layer);
