export const MAP_STYLES = {
  default: 'mapbox://styles/mapbox/streets-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
};

export const DEFAULT_ZOOM = 14;

export const getMapConfig = (latitude: number, longitude: number) => ({
  initialViewState: {
    longitude,
    latitude,
    zoom: DEFAULT_ZOOM,
  },
  style: { width: '100%', height: '100%' },
  mapStyle: MAP_STYLES.default,
});