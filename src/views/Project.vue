<template>
    <div>
        <h1>{{ project.name }}</h1>
        <p>{{ project.description }}</p>
        <p>Project owner: {{ project.owner }}</p>
        <p>Homepage: {{ project.homepage }}</p>
        <p>Contributors: <p v-for="cont in project.contributor">{{ cont.display_title }}</p></p>
        <p>Funding provided via: <p v-for="f in project.fundingProvider">{{ f.display_title }}</p></p>
        <p>Funding: {{ project.funding }}</p>
        <p>{{ project.contributingRole }}</p>
        <p>{{ project.timeInterval }}</p>
        <p>{{ project.subjectArea }}</p>
        <p>{{ project.subject }}</p>

    </div>
</template>

<script setup lang="ts">
import { fetchItem } from '@/db';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Project } from '@/types';

const project = ref<Project>({} as Project); //this is the project object

const route = useRoute();


onMounted (async () => {
    const id = route.params.id;
    const response = await fetchItem(id as string);
    //project.value = translateResponse(response);
    console.log(response);
    project.value = translateResponse(response) as Project;
    
})

const translateResponse = (response: any): Project => {
    return {
        id: response['o:id'],
        name: response['o:title'],
        owner: response['bibo:owner'][0]?.['display_title'],
        description: Array.isArray(response['dcterms:description']) 
            ? response['dcterms:description'][0]?.['@value'] 
            : response['dcterms:description']?.['@value'],
        homepage: response['foaf:homepage'][0]?.['@id'], // array
        contributor: response['vivo:contributingRole'], // array
        fundingProvider: response['vivo:hasFundingVehicle'], // array
        funding: response['schema:funding'][0]?.['@value'], // array
        contributingRole: response['vivo:contributingRole'], // array
        timeInterval: response['vivo:dateTimeInterval'], // array
        subjectArea: response['vivo:hasSubjectArea'], // array
        subject: response['dcterms:subject'],
    };
};


</script>

<style scoped>
p {
    padding-top: 5px;
}
</style>