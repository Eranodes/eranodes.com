import { component$, useStyles$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Statistics from '../components/statistics/statistics';
import Hero from "../components/hero/hero";
import Reviews from "../components/reviews/reviews";
import SecondaryFooter from "../components/secondary footer/secondary-footer";

import leafletStyles from "../../node_modules/leaflet/dist/leaflet.css?inline";

import { LeafletMap } from "~/components/leaflet-map";
import type { LocationsProps } from "~/models/location";

export default component$(() => {

  useStyles$(leafletStyles);
  const currentLocation = useSignal<LocationsProps>({
    name: "Germany",
    point: [51.1657, 10.4515],
    /**
     * Define rectangle with: Southwest lat, South West Lng, North East lat,  North East lng points.
     * Very interesting when use to filter in OpenStreetMap API to take POIs
     * Example: https://qwik-osm-poc.netlify.app/
     */
    boundaryBox:
      "43.14658914559456,-2.4765586853027344,43.202923523094725,-2.3467826843261723",
    zoom: 2,
    marker: true,
  },
)

  return (
    <>
      <Hero />
      <Statistics />
      <div id="plans" class="container"></div>
      <div role="presentation" class="ellipsis"></div>
      <div role="presentation" class="ellipsis ellipsis-red"></div>
      <div  id="reviews" class="container"></div>
      <div id="map" class="container container-center">
        <div class="container container-center"></div>
        <LeafletMap location={currentLocation} />
      </div>
      <Reviews />
      <SecondaryFooter />
    </>
  );
});

export const head: DocumentHead = {
  title: "",
  meta: [
    {
      name: "description",
      content: "Welcome to EraNodes 24x7 Freemium Hosting!",
    },
  ],
};

