<template>
    <div class="projects-view">
        <div class="grey-gradient">
            <h1>Active projects</h1>
            <div class="projects-container">
                <ActiveProjects></ActiveProjects>
            </div>
        </div>
    </div>
    <div class="projects-view">
        <h1>Finished projects </h1>
        <div class="projects-container">
            <div v-for="project in projects" :key="project.id" class="project">
                <router-link :to="'/projects/' + project.id">
                    <h2>{{ project.name }}</h2>
                    <h3 v-for="description in project.shortDescription">{{ description['@value'] }}</h3>
                    <!-- <p v-for="subject in project.subject">{{ subject['@value'] }}</p> -->
                    <!-- <div class="metadata-group">
                        Project owner:<h4 v-for="owner in project.owner"> {{ owner.display_title}}</h4> 
                    </div>
                    <div class="metadata-group">
                        Funded by: <h4 v-for="funding in project.funding">{{ funding.display_title}}</h4>
                    </div> -->
                </router-link>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
    import { fetchByResourceClass } from '@/db';
    import { onMounted, ref } from 'vue';
    import type { Projects } from '@/types';
    import { useRoute } from 'vue-router';
    import ActiveProjects from '@/views/ActiveProjects.vue';

    const projects = ref < Projects[] > ([]);
    const projectsId = ref(99) //this is the id for resource class 'Projects'
    const numItems = ref(50) //this is the number of items to fetch

    onMounted(async () => {
        const response = await fetchByResourceClass(projectsId.value);
        console.log(response);
        projects.value = await translateResponse(response);
        //console.log(projects.value);
        //sort by name value
        projects.value.sort((a, b) => (a.name > b.name) ? 1 : -1);
        //loop and keep items with status active
        projects.value = projects.value.filter((item) => {
            return item.status[0]['@value'] === 'Inactive'
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

<style>
    .projects-view {

        display: flex;
        flex-direction: column;
        justify-content: left;
    }

    .projects-view .projects-container {
        padding: 0px 60px 50px 60px;
        columns: 4;
        column-gap: 50px;
        overflow: visible;
        margin-top:-20px;

    }

    @media screen and (max-width: 1400px) {
        .projects-view .projects-container {
            columns: 3;
            column-gap: 50px;
        }
    }

    @media screen and (max-width: 1200px) {
        .projects-view .projects-container {
            columns: 2;
            column-gap: 50px;
        }
    }

    @media screen and (max-width: 900px) {
        .projects-view .projects-container {
            columns: 1;
            column-gap: 50px;
        }
    }


    .projects-view .project {
        padding-bottom: 10px !important;
        cursor: pointer;
        break-inside: avoid-column;

    }

    .projects-view .project:hover {
        color: var(--theme-livedata1);

    }

    .projects-view h1 {
        font-weight: 300;
        margin-left: 60px;
        margin-top: 40px;
    }

    .projects-view h2 {
        font-size: 1.2em;
        margin-bottom: 0px;
        font-weight: 500;
        line-height: 1.2;
    }

    .projects-view h3 {
        font-size: 1.1em;
        margin-bottom: 0px;
        font-weight: 300;
        line-height: 1.2;
        margin-top: 10px;
    }

    .projects-view h4 {
        font-size: 1.1em;
        margin-bottom: 0px;
        font-weight: 600;
        line-height: 1.2;
        margin-top: 5px;
        color: var(--theme-livedata2);

    }

    .projects-view .metadata-group {
        font-size: 1.1em;
        margin-bottom: 0px;
        font-weight: 600;
        line-height: 1.2;
        margin-top: 15px;
    }

</style>