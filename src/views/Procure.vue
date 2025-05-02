<template>
    <div class="Platforms">
        <div class="projects grey-gradient">
            <div class="intro-space" style="">
                <div class="text-module-title">Cutting Edge Expertise</div>
                <div class="intro-title">
                ProCURE: Protection of Cultural Resources
                </div>
                <div class="intro-article">
                  <p> The Gothenburg Research Infrastructure in Digital Humanities (GRIDH) is a research node and infrastructure
                    that offer expertise in <span>deep learning and artificial intelligence</span>, <span>visualisation</span> and
                    <span>visual analysis</span>, <span>spatio-temporal
                      interfaces</span>, and <span>natural language processing</span>. Our mission is to strengthen, renew and
                    enrich research and
                    teaching through digital source material, tools and methods.
                  </p>
            
                  <p>We help researchers to develop research applications and navigate datasets, and is a resource for memory
                    institutions that seek new ways to make their collections and archives available for research and public
                    alike. We publish both human and machine readable interfaces for a number of our research projects.</p>
                </div>
              </div>

              
            <div class="projects-container">

                <div class="row">
                    <div class="data-module">
                        <div class="buffer">
                            <div class="module theme-gradient-1">
                            </div>
                        </div>
                    </div>
                    <div class="info-module">
                        <div class="info-module-slogan right">
                            <div class="text-module-title">ProCURE: Protection of Cultural Resources</div>
                            <h1>A Centre of Excellence</h1>
                            <h2></h2>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { fetchByResourceTemplate } from '@/db';
    import type { Tool } from '@/types';
    import { onMounted, ref } from 'vue';



    

    onMounted(async () => {
       

        //then randomize the order

        //set them as either active or legacy tools according to legacy value
       

      

    });

    const translateResponse = (response: any) => {
        
    };
</script>

<style scoped>
    h1 {
        font-weight: 200;
    }

    h2 {
        font-weight: 200;
    }

    .projects {
        width: 100%;
        display: block;


    }

    .projects-container {
        width: calc(100% - 120px);
        padding-left: 20px;
        padding-bottom: 40px;
    }

    .projects-container li {
        list-style: none;
    }

    .legacy {
        border-top: thin dotted rgba(0 0 0 / 0.5);
        padding-bottom: 50px;
        padding-top: 20px;
        margin-top: 60px;
        width: calc(100% - 0px);
    }

    .masonry-column {}

    .masonry-item {}
</style>