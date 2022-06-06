import L from "leaflet";

const urls = {
  satellite: "http://mt{s}.google.cn/vt/lyrs=s&gl=en&x={x}&y={y}&z={z}"
};

export function CreateMap(container, options = {}) {
  let defaultOptions = {
    renderer: L.canvas(),
    preferCanvas: true,
    center: [23.065437, 113.5728853],
    zoom: 16,
    zoomControl: false,
    attributionControl: false,
    zoomAnimation: true,
    boxZoom: false,
    minZoom: 3,
    maxZoom: 20,
    keyboard: false,
    editable: true
  };
  let map = L.map(container, Object.assign({}, defaultOptions, options));
  map.addLayer(
    L.tileLayer(urls.satellite, {
      maxZoom: 21,
      subdomains: "0123",
      zIndex: 1
    })
  );
  return map;
}

export { L };
