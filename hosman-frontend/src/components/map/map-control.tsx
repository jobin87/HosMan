import { ScaleControl, GeolocateControl, NavigationControl, FullscreenControl } from 'react-map-gl';

// ----------------------------------------------------------------------

type Props = {
  hideScale?: boolean;
  hideGeolocate?: boolean;
  hideFullscreen?: boolean;
  hideNavigation?: boolean;
};

export function MapControl({ hideScale, hideGeolocate, hideFullscreen, hideNavigation }: Props) {
  return (
    <>
      {!hideGeolocate && (
        <GeolocateControl positionOptions={{ enableHighAccuracy: true }} />
      )}

      {!hideFullscreen && <FullscreenControl />}

      {!hideScale && <ScaleControl />}

      {!hideNavigation && <NavigationControl />}
    </>
  );
}
