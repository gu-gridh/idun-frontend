<template>
    <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// @ts-ignore
import L from "leaflet";
import "leaflet/dist/leaflet.css";

onMounted(() => {
    let map = L.map('map').setView([0, 0], 1);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
});
</script>

<style scoped>
#map {
    height: 100%;
    width: 100%;
    border-radius: 15px;
    z-index: auto;
}
</style>