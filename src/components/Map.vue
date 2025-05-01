<template>
    <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// @ts-ignore
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchByResourceClass } from '@/db';

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

    //add markers to the map
    places.value.forEach((place: any) => {
        L.marker(place.coords).addTo(map)
            .bindPopup(place.name)
            //.openPopup();
    });
}

const fetchCoordinates = async () => {
    //fetch coordinates from the database
    const response = await fetchByResourceClass(185, 100);
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
    filter: hue-rotate(90deg);

    background:transparent;
}

.leaflet-container .leaflet-control-attribution{
    filter: hue-rotate(-90deg);
}



</style>