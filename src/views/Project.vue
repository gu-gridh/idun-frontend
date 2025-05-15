<template>
    <div class="container">
        <div class="project-image"><img :src="image" alt="" /></div>
        <div class="text-module-title">Project</div>
        <h1>{{ project.name }}</h1>
        <!-- <p>Identifier: <span v-for="id in project.identifier">{{ id['@value'] }}</span> </p> -->
        <div class="project-description">{{ project.description }}</div>

        <div class="site">{{ project.homepage }}</div>

        <div class="metadata-group">
            <div class="label">Project owner:</div>
            <div class="metadata project-owner" v-for="own in project.owner">{{ own.display_title }}</div>
        </div>
        <div class="metadata-group">
            <div class="label">Project partners: </div>
            <div class="metadata-list">
                <div class="metadata project-partners" v-for="cont in project.contributor">{{ cont.display_title }}
                </div>
            </div>
        </div>
        <div class="metadata-group">
            <div class="label">Funding provider:</div>
            <div class="metadata-list">
                <div class="metadata" v-for="f in project.fundingProvider">{{ f.display_title }}</div>
            </div>
        </div>
        <div class="metadata-group">
            <div class="label">Funding: </div>
            <div class="metadata" v-for="fund in project.funding">{{ fund['@value'] }}</div>
        </div>
        <div class="metadata-group">
            <div class="label">Time interval: </div>
            <div class="metadata" v-for="time in project.timeInterval">{{ time['@value'] }}</div>
        </div>
        <div class="metadata-group">
            <div class="label">Subject: </div>
            <div class="metadata-list">
                <div class="metadata" v-for="subj in project.subject">{{ subj['@value'] }}</div>
            </div>
        </div>
        <div class="metadata-group">
            <div class="label">Subject area: </div>
            <div class="metadata-list">
                <div class="metadata" v-for="area in project.subjectArea">{{ area['@value'] }}</div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { fetchItem } from '@/db';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import type { Project } from '@/types';

    const project = ref < Project > ({} as Project); //this is the project object

    const route = useRoute();

    defineProps(["id", "title", "url", "subjectArea", "description" ]);


    onMounted(async () => {
        const id = route.params.id;
        const response = await fetchItem(id as string);
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
            status: response['vivo:status'] || 'unknown', // default value if missing
        };
    };


</script>

<style scoped>
    h1{
        max-width:600px;
        margin-top:0px;
    }
    p {
        padding-top: 5px;
    }

    .container {
        width: calc(100% - 120px);
        padding-left: 60px;
        padding-right: 60px;
        display: grid;
    }

    .project-image{
        width:100px;
        height:100px;
        border-radius:50%;
        background-color: var(--theme-livedata1-dark);
        margin-bottom:20px;
        margin-left:-10px;
        overflow:hidden;

    }

    .project-description {
        max-width: 1200px;
        columns:2;
        gap:30px;
        text-align:justify;
    }

    .site {
        margin-top: 20px;
        font-size: 20px;
    }

    .label {
        width: 100px;
        font-weight:500;
        
    }

    .metadata {
        font-size: 20px;
        font-weight: 500;
        margin-left: 10px;
        margin-top:-3px;
        color: var(--theme-livedata2-dark);
    }

    .project-owner {}

    .project-partners {


        display: flex;
        flex-direction: column;
    }

    .metadata-group {
        display: flex;
        flex-direction: row;
        align-items: top;
        margin-top: 20px;
    }
</style>