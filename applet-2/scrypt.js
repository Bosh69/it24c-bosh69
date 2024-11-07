class LeafletMap {
    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);

        // Initialize tile layers
        this.satelliteLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors, Tiles by OSM France'
        });

        this.osmLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg', {
            attribution: '© OpenStreetMap contributors'
        });

        // Add OpenStreetMap layer by default
        this.osmLayer.addTo(this.map);

        // Set up base layers for the layer control
        const baseLayers = {
            "Street Map": this.satelliteLayer,
            "Satellite View": this.osmLayer,
        };

        // Add layer control to switch between layers
        L.control.layers(baseLayers).addTo(this.map);
    }

    addMarker(lat, lng, message) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(message);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }
}

const myMap = new LeafletMap('map', [8.360004, 124.868419], 18);

myMap.addMarker(8.359735, 124.869206, 'CCS Faculty Office');
myMap.addMarker(8.359639, 124.869179, 'CCS Laboratory 1');
myMap.addMarker(8.359554, 124.869153, 'CCS Laboratory 2');
myMap.addMarker(8.3591000408389, 124.86858016520326, 'NBSC Education Department');
myMap.addMarker(8.360075939950157, 124.8689737081807, 'Northern Bukidnon State College Gym');
myMap.addMarker(8.360178828467555, 124.86931948684074, 'NBSC Cafeteria');
myMap.loadMarkersFromJson('.json');
