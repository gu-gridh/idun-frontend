<template>
    <div class="Platforms">
        <div class="projects grey-gradient">
            <div class="intro-space" style="">
              
                <div class="intro-title" style="line-height:0.9; padding-bottom:10px;">
                ProCURE: <br>Protection of Cultural Resources
                </div>
                <div class="intro-article">
                  <p>ProCURE, hosted by the Gothenburg Research Infrastructure in Digital Humanities (GRIDH), 
                    is a <span>Centre of Excellence</span> dedicated to advancing expertise, developing software solutions, 
                    and providing both high-end equipment and accessible solutions for digital preservation and access to <span>remote or endangered cultural resources.</span> 
                    It serves as a global hub for heritage digitization, ensuring that at-risk cultural heritage is documented, 
                    analyzed, and made accessible for <span>research, education, and public engagement.</span></p>

                  <p>Through strategic collaborations and training programs, 
                    ProCURE is designed to empower heritage professionals, 
                    researchers, and institutions with the tools and knowledge 
                    needed to safeguard cultural assets for future generations. 
                    To digitize cultural heritage is a monumental task always in need of 
                    state-of-the-art expertise and broader perspectives.</p>
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