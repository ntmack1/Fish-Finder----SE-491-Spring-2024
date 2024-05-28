// src/components/InteractiveMap.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
// import { useMap } from 'react-leaflet/hooks';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

// Custom fish marker icon
const fishIcon = new L.Icon({
    iconUrl: '/fishmarker.png', // Ensure this path is correct and the image is in the public folder
    iconSize: [40, 40], // Adjust size as needed
    iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -40] // Point from which the popup should open relative to the iconAnchor
});

const SearchBar = ({ setPosition }) => {
    const map = useMap();

    React.useEffect(() => {
        const provider = new OpenStreetMapProvider();

        const searchControl = new GeoSearchControl({
            provider,
            showMarker: true,
            showPopup: false,
            marker: {
                icon: fishIcon,
                draggable: false,
            },
            style: 'bar',
            autoClose: true,
            keepResult: true,
        });

        map.addControl(searchControl);

        map.on('geosearch/showlocation', (result) => {
            if (result.location) {
                const { y: lat, x: lng } = result.location;
                console.log('Search result location:', result.location);
                setPosition({ lat, lng });
            } else {
                console.error('Location is null:', result);
            }
        });

        return () => map.removeControl(searchControl);
    }, [map, setPosition]);

    return null;
};

const InteractiveMap = ({ onSave }) => {
    const [position, setPosition] = useState(null);
    const [savedPosition, setSavedPosition] = useState(null);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);
            },
        });

        return position === null ? null : (
            <Marker position={position} icon={fishIcon}></Marker>
        );
    };

    const handleSave = () => {
        if (position) {
            onSave(position.lat, position.lng);
            setSavedPosition(position);
        } else {
            alert('Please click on the map to select a location.');
        }
    };

    return (
        <div>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <SearchBar setPosition={setPosition} />
                <LocationMarker />
            </MapContainer>
            <button onClick={handleSave}>Save Location</button>
            {savedPosition && (
                <div>
                    <h3>Saved Location</h3>
                    <p>Latitude: {savedPosition.lat}</p>
                    <p>Longitude: {savedPosition.lng}</p>
                </div>
            )}
        </div>
    );
};

export default InteractiveMap;
