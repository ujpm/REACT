import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng, Icon } from 'leaflet';
import { Box, TextField, Paper, InputAdornment } from '@mui/material';
import { LocationOn, Search } from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationPickerProps {
  onLocationSelect: (location: { address: string; coordinates: [number, number] }) => void;
  initialLocation?: string;
}

interface MapClickHandlerProps {
  onLocationSelect: (coordinates: [number, number]) => void;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onLocationSelect }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect([lat, lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return null;
};

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialLocation }) => {
  const [searchText, setSearchText] = useState(initialLocation || '');
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [hasPosition, setHasPosition] = useState(false);

  useEffect(() => {
    // Get user's current location on component mount
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setPosition([location.coords.latitude, location.coords.longitude]);
        setHasPosition(true);
      },
      () => {
        // Default position if geolocation is denied (you can set this to your city's coordinates)
        setPosition([51.505, -0.09]);
        setHasPosition(true);
      }
    );
  }, []);

  const handleMapClick = async (coordinates: [number, number]) => {
    setPosition(coordinates);
    try {
      // Reverse geocoding using OpenStreetMap Nominatim
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[0]}&lon=${coordinates[1]}`
      );
      const data = await response.json();
      const address = data.display_name;
      setSearchText(address);
      onLocationSelect({ address, coordinates });
    } catch (error) {
      console.error('Error getting address:', error);
      onLocationSelect({ 
        address: `${coordinates[0]}, ${coordinates[1]}`,
        coordinates 
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchText) return;

    try {
      // Forward geocoding using OpenStreetMap Nominatim
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`
      );
      const data = await response.json();
      
      if (data && data[0]) {
        const newPosition: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setPosition(newPosition);
        onLocationSelect({ 
          address: data[0].display_name,
          coordinates: newPosition
        });
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  if (!hasPosition) {
    return <Box>Loading map...</Box>;
  }

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search location or click on map"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ height: 400, width: '100%', '& .leaflet-container': { height: '100%', width: '100%', borderRadius: 1 } }}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onLocationSelect={handleMapClick} />
          {position && <Marker position={position as LatLng} />}
        </MapContainer>
      </Box>
    </Paper>
  );
};

export default LocationPicker;
