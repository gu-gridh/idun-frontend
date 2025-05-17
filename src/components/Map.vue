<template>
    <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// @ts-ignore
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchByResourceClass } from '@/db';
// needed for leaflet markers to show up after build
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

const places = ref([]);

onMounted(async() => {
    //fetch coordinates from the database
    await fetchCoordinates();  
    await initMap();  
})

const initMap = () => {
    //create a map
    let map = L.map('map').setView([40, -20], 1.5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
       // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    map.scrollWheelZoom.disable();

    L.Icon.Default.prototype.options.iconUrl = markerIconUrl;
    L.Icon.Default.prototype.options.iconRetinaUrl = markerIconRetinaUrl;
    L.Icon.Default.prototype.options.shadowUrl = markerShadowUrl;
    L.Icon.Default.imagePath = ""; // necessary to avoid Leaflet adds some prefix to image path.


    //add markers to the map
    places.value.forEach((place: any) => {
        L.marker(place.coords).addTo(map)
            .bindPopup(place.name)
            //.openPopup();
    });
}

const fetchCoordinates = async () => {
    //fetch coordinates from the database
    const response = await fetchByResourceClass(185);
    console.log(response);
    places.value = translateResponse(response);
}

const translateResponse = (response: any) => {
    return response.map((item: any) => {
        return {
            id: item['o:id'],
            name: item['o:title'],
            coords: convertCoords(item['rdau:P60345'][0]['@value']),
        }
    });
}

const convertCoords = (coords: string) => {
    return coords.split('/').map(coord => parseFloat(coord));
}
</script>

<style>
#map {
    height: 100%;
    width: 100%;
    border-radius: 15px;
    z-index: auto;
}

.leaflet-container {
    filter: hue-rotate(130deg);
    background:transparent;
}

.leaflet-container .leaflet-control-attribution{
    filter: hue-rotate(-130deg);
}

/* Overides the settings in ui_modules.css */
#app .ol-zoom-in {
    display: none !important;
}

#app .ol-zoom-out {
    display: none !important;
}

#map .leaflet-control-zoom-in {
 left: calc(25vw - 87px);
  top: calc(240px) !important;
  position: absolute;
  border-radius: 8px 0px 0px 8px !important;
  height: 25px;
  border-bottom: none;
  background-color: rgba(0,0,0,0.6);
  color: white;
  width: 35px;
  font-size:16px;
  line-height: 1.4;
}

#map .leaflet-control-zoom-in:hover {
  background-color: black;
}

#map .leaflet-control-zoom-out {
  left: calc(25vw - 48px);
  top: calc(240px) !important;
  position: absolute;
  border-radius: 0px 8px 8px 0px !important;
  height: 25px;
  border-bottom: none;
  background-color: rgba(0,0,0,0.6);
  color: white;
  width: 35px;
  font-size:16px;
  line-height: 1.4;
}

#map .leaflet-control-zoom-out:hover {
  background-color: black;
}

@media screen and (max-width: 900px) {

    #map .leaflet-control-zoom-in {
 left: calc(50vw - 67px);
}

#map .leaflet-control-zoom-out {
  left: calc(50vw - 28px);
  
}

}



</style>