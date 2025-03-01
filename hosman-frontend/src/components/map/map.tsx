import MapGL, { MapProps, MapRef } from 'react-map-gl/mapbox';  // If using Mapbox
// OR

import { forwardRef } from 'react';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export const Map = forwardRef<MapRef, MapProps>(({ ...other }, ref) => (
  <MapGL ref={ref} mapboxAccessToken={CONFIG.mapboxApiKey} {...other} />
));
