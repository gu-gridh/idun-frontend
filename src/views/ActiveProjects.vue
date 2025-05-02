<template>
    <div>
        <div v-for="project in projects" :key="project.id" class="project">

            <router-link :to="'/projects/' + project.id">
                <!-- <img :src="project.image.large" alt="Project Image" /> -->
                <h2>{{ project.name }}</h2>
                <h3 v-if="project.shortDescription">{{ project.shortDescription[0]['@value'] }}</h3>

                <div class="metadata-group">
                Project owner:<h4 v-for="owner in project.owner"> {{ owner.display_title}}</h4> 
            </div>
            <div class="metadata-group">
                Funded by: <h4 v-for="funding in project.funding">{{ funding.display_title}}</h4> <!-- TODO add URL? -->
            </div>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Projects } from '@/types';
import { fetchByResourceClass} from '@/db';
import { useRoute } from 'vue-router';

const projects = ref<Projects[]>([]);
const projectsId = ref(99) //this is the id for resource class 'Projects'

onMounted (async () => {
    const response = await fetchByResourceClass(projectsId.value);
    projects.value = await translateResponse(response);
    //loop and keep items with status active
    projects.value.sort((a, b) => (a.name > b.name) ? 1 : -1);
    //loop and keep items with status active
    projects.value = projects.value.filter((item) => {
        return item.status[0]['@value'] === 'Active'
    });
});

const translateResponse = (response: any) => {
    return response.map((item: any) => {
        return {
            id: item['o:id'],
            name: item['o:title'],
            //description: Array.isArray(item['dcterms:description']) ? item['dcterms:description'][0]?.['@value'] : item['dcterms:description']?.['@value'],
            subject: item['dcterms:subject'], //array
            funding: item['vivo:hasFundingVehicle'], //array
            // contributingRole: item['vivo:contributingRole'], //array
            // timeInterval: item['vivo:dateTimeInterval'], //array
            subjectArea: item['vivo:hasSubjectArea'], //arraye
            shortDescription: item['bibo:shortDescription'], //array
            image: item['thumbnail_display_urls'],
            owner: item['bibo:owner'], //array
            status: item['schema:status'], //array
        }
    });
}
</script>

<style scoped>
</style>