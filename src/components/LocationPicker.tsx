import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Paper, InputAdornment, CircularProgress, IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import { LocationOn, Search, MyLocation, Place } from '@mui/icons-material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LocationPickerProps {
  onLocationSelect: (location: { address: string; coordinates: [number, number] }) => void;
  initialLocation?: string;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialLocation }) => {
  const [searchText, setSearchText] = useState(initialLocation || '');
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<L.Map | null>(null);
  const [marker, setMarker] = useState<L.Marker | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  const initializeMap = useCallback((position: [number, number]) => {
    if (map) return;

    const mapInstance = L.map('map').setView(position, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);

    const markerInstance = L.marker(position, { 
      icon,
      draggable: true // Make marker draggable
    }).addTo(mapInstance);
    
    // Handle marker drag end
    markerInstance.on('dragend', async () => {
      const newPos = markerInstance.getLatLng();
      await handleLocationUpdate([newPos.lat, newPos.lng]);
    });

    mapInstance.on('click', async (e: L.LeafletMouseEvent) => {
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
      markerInstance.setLatLng(e.latlng);
      await handleLocationUpdate(newPos);
    });

    setMap(mapInstance);
    setMarker(markerInstance);
    setLoading(false);
  }, []);

  const handleLocationUpdate = async (coordinates: [number, number]) => {
    setPosition(coordinates);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[0]}&lon=${coordinates[1]}`
      );
      const data = await response.json();
      const address = data.display_name;
      setSearchText(address);
      onLocationSelect({ address, coordinates });
      setShowSuccess(true);
    } catch (error) {
      console.error('Error getting address:', error);
      onLocationSelect({ 
        address: `${coordinates[0]}, ${coordinates[1]}`,
        coordinates 
      });
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });
      
      const newPosition: [number, number] = [position.coords.latitude, position.coords.longitude];
      setPosition(newPosition);
      
      if (map && marker) {
        map.setView(newPosition, 16);
        marker.setLatLng(newPosition);
        await handleLocationUpdate(newPosition);
      }
      
      setLocationError('');
    } catch (error) {
      console.error('Geolocation error:', error);
      setLocationError('Could not get your current location. Please check your permissions.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchText || !map || !marker) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`
      );
      const data = await response.json();
      
      if (data && data[0]) {
        const newPosition: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setPosition(newPosition);
        map.setView(newPosition, 16);
        marker.setLatLng(newPosition);
        onLocationSelect({ 
          address: data[0].display_name,
          coordinates: newPosition
        });
        setShowSuccess(true);
      } else {
        setLocationError('Location not found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      setLocationError('Error searching for location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const getLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });
        
        if (mounted) {
          const newPosition: [number, number] = [position.coords.latitude, position.coords.longitude];
          setPosition(newPosition);
          initializeMap(newPosition);
        }
      } catch (error) {
        console.log('Geolocation error:', error);
        if (mounted) {
          initializeMap([51.505, -0.09]);
        }
      }
    };

    getLocation();

    return () => {
      mounted = false;
      if (map) {
        map.remove();
      }
    };
  }, [initializeMap]);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search location or click on map"
          error={!!locationError}
          helperText={locationError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Place />
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title="Go to my location">
          <IconButton 
            onClick={getCurrentLocation}
            color="primary"
            size="large"
            sx={{ 
              bgcolor: 'primary.light',
              '&:hover': { bgcolor: 'primary.main', color: 'white' }
            }}
          >
            <MyLocation />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ 
        height: 400, 
        width: '100%', 
        position: 'relative',
        borderRadius: 1,
        overflow: 'hidden'
      }}>
        {loading && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255,255,255,0.8)',
            zIndex: 1000
          }}>
            <CircularProgress />
          </Box>
        )}
        <div id="map" style={{ height: '100%', width: '100%' }} />
      </Box>
      <Snackbar 
        open={showSuccess} 
        autoHideDuration={3000} 
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Location selected successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default LocationPicker;
