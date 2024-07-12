/* eslint-disable qwik/no-use-visible-task */
import {
  component$,
  noSerialize,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { LatLngTuple } from "leaflet";
import { Map } from "leaflet";
import type { MapProps } from "~/models/map";

export const LeafletMap = component$<MapProps>(({ location }: MapProps) => {
  useStyles$(`
    #map {
      width: 100%;
      height: 40vh;
    }
  `);

  const mapContainer$ = useSignal<Map>();

  const additionalLocations: { name: string; point: LatLngTuple }[] = [
    { name: "UK", point: [51.509865, -0.118092] },
    { name: "Canada", point: [56.1304, -106.3468] },
    { name: "India", point: [20.5937, 78.9629] },
    { name: "Poland", point: [51.9194, 19.1451] },
  ];

  useVisibleTask$(async ({ track }) => {
    track(location);

    const { tileLayer, marker } = await import("leaflet");

    const { getBoundaryBox } = await import("../../helpers/boundary-box");

    if (mapContainer$.value) {
      mapContainer$.value.remove();
    }

    const { value: locationData } = location;

    const centerPosition: LatLngTuple = locationData.point as LatLngTuple;

    const map = new Map("map").setView(
      centerPosition,
      locationData.zoom || 14,
    );

    tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Assign select boundary box to use in OSM API if you want
    locationData.boundaryBox = getBoundaryBox(map);

    if (locationData.marker) {
      marker(centerPosition).bindPopup(`${locationData.name}`).addTo(map);
    }

    additionalLocations.forEach((loc) => {
      marker(loc.point).bindPopup(`${loc.name}`).addTo(map);
    });

    mapContainer$.value = noSerialize(map);
  });
  
  return <div id="map"></div>;
});
