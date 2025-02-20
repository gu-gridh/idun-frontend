<template>
    <div>
        <h1>{{ project.name }}</h1>
        <p>Identifier: <span v-for="id in project.identifier">{{ id['@value'] }}</span> </p>
        <p>{{ project.description }}</p>
        <p>Project owner: <p v-for="own in project.owner">{{ own.display_title }}</p></p>
        <p>Homepage: {{ project.homepage }}</p>
        <p>Contributors: <p v-for="cont in project.contributor">{{ cont.display_title }}</p></p>
        <p>Funding provided via: <p v-for="f in project.fundingProvider">{{ f.display_title }}</p></p>
        <p>Funding: <p v-for="fund in project.funding">{{ fund['@value'] }}</p></p>
        <p>Time interval:<p v-for="time in project.timeInterval">{{ time['@value'] }}</p></p>
        <p>Subject: <p v-for="subj in project.subject">{{ subj['@value'] }}</p></p>
        <p>Subject area: <p v-for="area in project.subjectArea">{{ area['@value'] }}</p></p>

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
        identifier: response['vivo:identifier'],
        name: response['o:title'],
        owner: response['bibo:owner'], // array
        description: Array.isArray(response['dcterms:description']) 
            ? response['dcterms:description'][0]?.['@value'] 
            : response['dcterms:description']?.['@value'],
        homepage: response['foaf:homepage'][0]?.['@id'], // array
        contributor: response['vivo:contributingRole'], // array
        fundingProvider: response['vivo:hasFundingVehicle'], // array
        funding: response['schema:funding'], // array
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