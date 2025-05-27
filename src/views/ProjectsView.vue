<template>
    <div class="projects-view">
        <div class="grey-gradient">
            <h1>Active projects</h1>
            <div class="projects-container">
                <ActiveProjects />
            </div>
        </div>
    </div>

    <div class="projects-view">
        <h1>Finished projects</h1>
        <div class="projects-container">
            <div v-for="project in projects" :key="project?.id" class="project">
                <router-link :to="'/projects/' + project?.id">
                    <h2>{{ project?.name || 'Untitled Project' }}</h2>
                    <!-- <h3 v-if="project?.shortDescription?.length">
                        <span v-for="description in project.shortDescription" :key="description?.['@value']">
                            {{ description?.['@value'] || 'No short description' }}
                        </span>
                    </h3>
                    <p v-else>No short description available</p> -->
                    <h4 v-if="project.owner?.length" v-for="(owner, i) in project.owner" :key="i">
                        {{ owner?.display_title || 'Unnamed owner' }}
                    </h4>
                </router-link>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { fetchByResourceClass } from '@/db';
    import { onMounted, ref } from 'vue';
    import type { Projects } from '@/types';
    import ActiveProjects from '@/views/ActiveProjects.vue';

    const projects = ref < Projects[] > ([]);
    const projectsId = ref(99) //this is the id for resource class 'Projects'

    onMounted(async () => {
        window.scrollTo(0, 0);
        const response = await fetchByResourceClass(projectsId.value);
        projects.value = await translateResponse(response);
        //sort by name value
        projects.value.sort((a, b) => (a.name > b.name) ? 1 : -1);
        //loop and keep items with status active
        projects.value = projects.value.filter((item) => {
    return item.status?.[0]?.['@value']?.toLowerCase() === 'inactive';
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
                status: item['schema:status'] || [], //array
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
        padding-bottom: 0px !important;
        padding-top: 10px !important;
   
        cursor: pointer;
        break-inside: avoid-column;

    }

    .projects-view .project:hover {
        color: var(--theme-livedata1)!important;
        opacity:0.65;

    }

    .projects-view h1 {
        font-weight: 300;
        margin-left: 60px;
        margin-top: 40px;
    }

    .projects-view h2 {
        font-size: 1.2em;
        margin-bottom: 0px;
        font-weight: 400;
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
        font-size: 1.0em;
        margin-bottom: 0px;
        font-weight: 400;
        line-height: 1.2;
        margin-top: 15px;
    }

    @media screen and (max-width: 900px) {

        .projects-view .project {
        padding-bottom: 30px !important;
        margin-top: 40px !important;
        border-width: 0 0 0.5px 0;
        border-style: dotted;
        border-color:black;
    }
    }

</style>