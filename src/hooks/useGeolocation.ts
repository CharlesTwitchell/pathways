import { useEffect, useRef, useState } from 'react';

export interface GeoPosition {
  lat: number;
  lng: number;
  accuracy: number;
}

export interface GeolocationState {
  position: GeoPosition | null;
  error: string | null;
  permissionDenied: boolean;
  loading: boolean;
}

export function useGeolocation(active: boolean): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
    permissionDenied: false,
    loading: active,
  });
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      return;
    }

    if (!('geolocation' in navigator)) {
      setState({
        position: null,
        error: 'Geolocation is not supported on this device.',
        permissionDenied: false,
        loading: false,
      });
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setState({
          position: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          },
          error: null,
          permissionDenied: false,
          loading: false,
        });
      },
      (err) => {
        setState({
          position: null,
          error: err.message,
          permissionDenied: err.code === err.PERMISSION_DENIED,
          loading: false,
        });
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 },
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [active]);

  return state;
}
