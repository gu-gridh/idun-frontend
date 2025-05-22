<template>

  <div class="intro-space" style="">
    <div class="text-module-title">Cutting Edge Expertise</div>
    <div class="intro-title">
      A resource for research!
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


  <div class="container">


    <!---- will fetch 3 page blocks from Omeka S API -->
    <div class="content">
      <div class="row grey-gradient" style="">
        <div class="info-module">
          <div class="info-module-slogan left">
            <div class="text-module-title">Application Experts</div>
            <h1>So many projects!</h1>
            <h2 style="margin-top:-20px!important;">GRIDH have to date supported more than <span>45</span> funded research projects, and have helped raise in excess of <span>200
                million</span> in external funding for these. We are currently involved in
              <span>{{ activeNum }}</span> funded projects. Additionally, GRIDH is a foundational member of
              <span>3</span> national research infrastructures and <span>1</span>
              research school: <span><a href="http://www.huminfra.se">Huminfra</a></span>, <span><a
                  href="http://www.swe-clarin.se">Swe-Clarin</a></span>, <span><a
                  href="https://infravis.se">Infravis</a></span>, and <span><a
                  href="http://www.dash-doctoralschool.se">DASH</a></span>.
            </h2>
            <!-- <div class="text-module-link hoverable contact-us">Contact us and start a project</div> -->

          </div>
        </div>
        <div class="data-module text">
          <div class="text-module">
            <div class="text-module-title">Projects </div>
            <div class="text-module-data"><router-link to="/projects"> <span class="livedata-pulse">{{ rollingActiveNum
                  ?? activeNum }}</span> active
                projects</router-link> </div>
            <div class="text-module-description"><!-- Active projects info text  --></div>

            <div class="text-module-data"><router-link to="/resources"> <span class="livedata-pulse">{{ rollingToolsNum
                  ?? toolsNum }}</span>
                portals and tools </router-link> </div>
            <div class="text-module-description"><!-- Portals and tools info text --> </div>


            <div class="text-module-data"><span class="livedata-pulse">{{ rollingTotFunding ?? totFunding }}</span>
              million in external
              funding</div>
            <div class="text-module-description"><!-- Money-maker info text  --></div>

            <div class="text-module-link hoverable" style="margin-bottom:20px; margin-top:-10px;"><router-link
                to="/projects">See all projects</router-link></div>

            <div class="text-module-title">Infrastructures </div>
            <div class="text-module-data"><router-link to="/projects"> <span class="livedata-pulse">3</span> National
                infrastructures</router-link> </div>
            <div class="text-module-description"></div>




          </div>
        </div>
      </div>


      <div class="row-left">
        <div class="data-module visualisation">
          <div class="buffer">
            <div class="module theme-gradient-1 graph-wrapper">
              <Graph />
            </div>
          </div>
        </div>
        <div class="info-module">
          <div class="info-module-slogan right">
            <div class="text-module-title">University wide support</div>
            <h1>Transdisciplinary collaborations!</h1>
            <h2 v-html="redData2.html"></h2>
          </div>
        </div>
      </div>

      <div class="row-right">
        <!-- some kind of vizualisation -->
        <div class="info-module">
          <div class="info-module-slogan left">
            <div class="text-module-title">Data stewardship</div>
            <h1>So much data!</h1>
            <h2 v-html="redData1.html"></h2>
          </div>
        </div>
        <div class="data-module visualisation">
          <div class="buffer">
            <div class="module theme-gradient-2">
              <Sunburst />
            </div>
          </div>
        </div>
      </div>

      <div class="row-left">
        <div class="data-module visualisation">
          <div class="buffer">
            <div class="module hoverable theme-gradient-map">
              <Map />
            </div>
          </div>
        </div>
        <!-- Map -->
        <div class="info-module">
          <div class="info-module-slogan right">
            <div class="text-module-title">Global datasets</div>
            <h1>From all over the place!</h1>
            <h2 v-html="redData3.html"></h2>

          </div>
        </div>
      </div>


      <div class="row pink-gradient-inverted">
        <!-- Puffs -->

        <div class="links">

          <div class="link-item  digicure">
            <router-link to="/digicure" class="link-item-filler">
              <div class="link-title" style="">
                DIGICURE
              </div>
            </router-link>
          </div>


          <div class="link-item   tools">
            <router-link to="/" class="link-item-filler">
              <div class="link-title">
                AI/ML development
              </div>
            </router-link>
          </div>


          <div class="link-item   technical">
            <a href="https://github.com/gu-gridh/documentation" target="_blank" class="link-item-filler">
              <div class="link-title">
                Technical infrastructure
              </div>
            </a>
          </div>


          <div class="link-item github">
            <a href="https://github.com/gu-gridh" target="_blank" class="link-item-filler">
              <div class="link-title">

                <div class="link-title">
                  GitHub Repositories
                </div>

              </div>
            </a>
          </div>
        </div>
        <!-- Active projects --> <!-- should be marked out in database -->
        <div class="project-container">

          <!-- TODO: hook up the title, link, and image to something that cna be decided in the backend -->
          <h3>Highlighted Resources</h3>
          <div class="projects">
            <a href="https://saintsophia.dh.gu.se" class="project-item"
              style="border-radius:10px 0 0 10px; background-image:url(https://idun.dh.gu.se/files/large/bc1bb1c389814bae436d6328357d21a0946b3358.jpg); ">
              <!-- <div class="project-image-round" style="background-image:url(https://idun.dh.gu.se/files/large/bc1bb1c389814bae436d6328357d21a0946b3358.jpg); background-size: cover; background-position: 50%;"></div> -->
              <div class="project-title">Saint Sophia's Inscriptions</div>
          </a>



            <a href="https://didoc.dh.gu.se" class="project-item"
              style="background-image:url(https://idun.dh.gu.se/files/large/fb5565201c7c7bb2e9423cfdc88f42405b98ec0e.jpg);">

              <!-- <div class="project-image-round" style="background-image:url(https://idun.dh.gu.se/files/large/fb5565201c7c7bb2e9423cfdc88f42405b98ec0e.jpg); background-size: cover; background-position: 50%;"></div> -->
              <div class="project-title">Dawit Isaak Database of Censorship</div>
        </a>

            <a href="https://etruscan.dh.gu.se" class="project-item"
              style="border-radius:0px 10px 10px 0px;  background-image:url(https://idun.dh.gu.se/files/large/f64a8a5f8606fd201d3a6706172468169f1b150f.jpg);">
       
               
                  <!-- <div class="project-image-round" style="background-image:url(https://idun.dh.gu.se/files/large/f64a8a5f8606fd201d3a6706172468169f1b150f.jpg); background-size: cover; background-position: 50%;"></div> -->
                  <div class="project-title">Etruscan Chamber Tombs</div>
            
        
          </a>

          </div>
        </div>
      </div>
    </div>
    <div class="project-button">
      <div class="text-module-link hoverable"><router-link to="/resources">See all resources</router-link></div>
    </div>
  </div>
</template>

<script setup lang="ts">

  import { fetchAllPages, fetchCount, fetchByResourceClass } from '@/db';
  import { onMounted, ref, nextTick } from 'vue';
  import Map from '@/components/Map.vue';
  import Graph from '@/components/Graph.vue';
  import Sunburst from '@/components/Sunburst.vue';
  import type { Project } from '@/types';

  const redData1 = ref({ html: '' });
  const redData2 = ref({ html: '' });
  const redData3 = ref({ html: '' });
  const projectsNum = ref(0);
  const toolsNum = ref(0);
  const totFunding = ref(0);
  const activeNum = ref(0);
  const rollingIntervals: number[] = [];
  const rollingToolsNum = ref < number | null > (null);
  const rollingActiveNum = ref < number | null > (null);
  const rollingTotFunding = ref < number | null > (null);

  //rolling numbers
  const startRollingNumbers = () => {
    rollingIntervals.push(setInterval(() => {
    /*   rollingToolsNum.value = Math.floor(Math.random(1) * 50);
      rollingActiveNum.value = Math.floor(Math.random() * 25);
      rollingTotFunding.value = Math.floor(Math.random() * 250); */
      rollingActiveNum.value += 1;
      rollingToolsNum.value += 2;
      rollingTotFunding.value += 3;
    }, 500));
  };

  const stopRollingNumbers = () => {
    rollingIntervals.forEach(clearInterval);
    rollingToolsNum.value = null;
    rollingActiveNum.value = null;
    rollingTotFunding.value = null;
  };

  onMounted(async () => {
    // Start animated placeholders
    startRollingNumbers();

    // Fetch live data
    await fetchPageData();

    await fetchCount('items?resource_class_id=99')
      .then(data => {
        projectsNum.value = data.total;
      });

    const resp = await fetchByResourceClass(99);
    activeNum.value = resp.reduce((count: number, item: Project) => {
      const status = item['schema:status']?.[0]?.['@value']?.toLowerCase() ?? '';
      return status === 'active' ? count + 1 : count;
    }, 0);

    await fetchCount('items?resource_template_id=6')
      .then(data => {
        toolsNum.value = data.total;
      });

    const response = await fetchByResourceClass(99);
    totFunding.value = 0;
    response.forEach((item: any) => {
      if (item['schema:funding']) {
        item['schema:funding'].forEach((funding: any) => {
          const amount = Number(funding['@value']);
          if (!isNaN(amount)) {
            totFunding.value += amount;
          }
        });
      }
    });
    totFunding.value = Math.round(totFunding.value / 1_000_000);

    // Stop animated placeholders
    stopRollingNumbers();
  });


  const fetchPageData = async () => {
    //fetch html text data
    await fetchAllPages()
      .then((response) => {
        redData1.value = convertToJson(response[1])
        redData2.value = convertToJson(response[2])
        redData3.value = convertToJson(response[3])
      })

  };

  //since the omeka returns json ld data, convert it to more readable json
  const convertToJson = (data: any) => {
    const parsed = {
      html: data['o:block'][1]['o:data']['html'] //this is the html data and might be different in the future
    }
    return parsed;
  };

</script>



<style>
  .intro-space {
    width: calc(100% - 140px);
    padding-left: 60px;
    margin-top: 20px;
  }

  .intro-title {
    font-size: 50px;
    font-weight: 600;
    color: var(--theme-heading);
    line-height: 0.9;
    margin-top: 10px;
  }

  .intro-article {
    columns: 2;
    column-gap: 70px;
    column-rule: 1px solid lightgrey;
    font-size: 20px;
    font-weight: 300;
    text-align: justify;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .intro-article p {
    break-inside: avoid-column;
  }

  .intro-article span {
    color: var(--theme-livedata1-dark);
    font-weight: 700;
    break-inside: avoid-column;
  }

  h2 {
    margin-top: -15px !important;
  }

  @media screen and (max-width: 1100px) {
    .intro-article {
      columns: 1;
      text-align: left;
    }
  }

  .info-module a {
    color: var(--theme-livedata1-dark);
  }


  .float-tooltip-kap {
    position: absolute;
    white-space: nowrap;
    max-width: max(70%, 150px) !important;
    top: 100px;
    right: 20px;
    font-family: "Barlow Condensed", sans-serif !important;
    font-size: 16px !important;
    font-weight: 100;
    padding: 5px 8px 5px 8px !important;
    border-radius: 5px !important;
    color: black !important;
    background: rgba(255, 255, 255, 0.9) !important;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2) !important;

    /* by default */
  }


  .content {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;

  }

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    gap: 0px;
    margin: 0;
    overflow: hidden;
  }

  .row-left {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    gap: 0px;
    margin: 0;
    padding: 0px;
    overflow: hidden;
  }




  .row-right {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    gap: 0px;
    margin: 0;
    overflow: hidden;
  }

  @media screen and (max-width: 900px) {
    .intro-space {}

    .row-left {
      display: flex;
      flex-direction: column-reverse;
      width: 100%;
      align-items: flex-end;
      gap: 0px;
      margin-top: 30px;
    }

    .row-right {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      align-items: center;
      gap: 0px;
      margin-top: 30px;
    }
  }

  .pink-gradient {
    background: linear-gradient(360deg, rgba(255, 0, 200, 0.1) 0%, rgba(255, 255, 255, 1) 100%);
  }

  .blue-gradient {
    background: linear-gradient(360deg, rgba(0, 217, 255, 0.1) 0%, rgba(255, 255, 255, 1) 100%);
  }

  .grey-gradient {
    background: linear-gradient(360deg, rgba(100, 100, 100, 0.1) 0%, rgba(255, 255, 255, 1) 100%);
  }

  .pink-gradient-inverted {
    background: linear-gradient(180deg, rgba(100, 100, 200, 0.1) 0%, rgba(255, 255, 255, 1) 100%);
  }

  .theme-gradient-1 {
    background: linear-gradient(360deg, rgba(255, 0, 200, 0.1) 0%, rgba(240, 240, 240, 1) 100%);
  }

  .theme-gradient-2 {
    background: linear-gradient(360deg, rgba(0, 0, 200, 0.1) 0%, rgba(240, 240, 240, 1) 100%);
  }

  .theme-gradient-map {
    background: linear-gradient(360deg, rgb(235, 239, 241) 30%, rgb(234, 194, 213) 70%);
  }

  .hoverable {
    transition: all 0.2s ease-in-out;
  }

  .hoverable:hover {
    transform: scale(1.03);
  }

  .data-module {
    width: 50%;
  }



  .buffer {
    padding: 30px 40px;

  }


  .text-module {
    background-color: none;
    padding: 20px;
    color: var(--theme-heading);
    padding-bottom: 40px;
    padding-left: 30px
  }

  .text-module a {

    color: var(--theme-heading);

  }

  .text-module-title {
    font-size: 18px;

  }

  .text-module-data {
    font-size: 32px;
    font-weight: bold;
  }

  .text-module-description {
    font-size: 20px;
    margin-bottom: 20px;
    max-width: 600px;
  }

  .text-module-link {
    color: black;
    font-size: 22px;
    width: 150px;
    cursor: pointer;
  }

  .text-module span {
    color: var(--theme-livedata1-dark);
    font-weight: 500;
  }

  .contact-us {
    width: 250px;
    margin-top: 30px;
    color: var(--theme-heading);
  }


  .module {
    border-radius: 15px;
    width: 100%;
    min-height: 300px;
    height: 30vh;
  }




  .info-module {
    width: 50%;
    height: 100%;
  }

  .info-module b,
  strong {
    color: var(--theme-livedata1-dark);
  }

  .info-module .left {
    text-align: right;
    padding: 0px 40px 0px 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

  }

  .info-module .right {
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
    justify-content: center;
    padding: 0px 60px 0px 30px;
  }


  .info-module-slogan {}

  .info-module-slogan span {
    color: var(--theme-livedata1);
    font-weight: 600;
  }


  .info-module-slogan h1 {
    color: var(--theme-heading);
    font-size: 50px;
    margin-top: 10px;
    line-height: 1.0;
  }

  .info-module-slogan h2 {
    color: var(--theme-heading);
    margin-top: -30px !important;
    max-width: 600px;
    font-weight: 300;
    font-size: 20px;
  }



  .links {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    width: 100%;
    align-items: center;
    margin-top: 0px;
    margin-bottom: 0px;
    gap: 1px;
    padding: 40px 40px;
  }

  .project-container {
    width: calc(100% - 80px);
    padding-top: 30px;
    padding: 0px 40px;
  }

  .project-container h3 {
    font-size: 30px;
    font-weight: 300;
  }


  .projects {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    width: 100%;
    align-items: center;
    margin-top: 10px;
    gap: 0px;

  }










  .project-image-round {
    pointer-events: none;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 20px;
    transition: all 0.2s ease-in-out;
  }

  .project-title {
    width: 100%;
    position: relative;
    bottom: 0px;
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    pointer-events: none;
    height: 50px;
    padding-top: 80px;
    margin-top: -20px;
    transition: all 0.2s ease-in-out;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
    pointer-events: none;
  }

  .project-item {
    cursor: pointer;
    height: 190px;
    padding: 0px;
    width: 0;
    overflow: hidden;
    background-blend-mode: screen;
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    align-items: center;
    justify-content: flex-end;
    color: white;
    background-size: 100%;
    background-position: 50%;
    transition: all 0.2s ease-in-out;
  }

  .project-item:hover .project-image-round {
    transform: scale(1.1);
  }

  .project-item:hover .project-title {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
  }


  .project-item:hover {
    background-size: 105%;
  }

  .ocean {
    background: linear-gradient(180deg, rgba(00, 200, 250, 0.2) 0%, rgba(255, 240, 255, 1) 100%);

  }

  .pink {
    background: linear-gradient(180deg, rgba(255, 0, 200, 0.2) 0%, rgba(240, 240, 250, 1) 100%);

  }

  .yellow {
    background: linear-gradient(180deg, rgba(255, 255, 00, 0.2) 0%, rgba(210, 250, 230, 1) 100%);

  }

  .project-button {
    display: flex;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }


  .graph-wrapper {
    width: 100%;
    height: 300px;
    position: relative;
  }


  @media screen and (max-width: 900px) {
    .content {
      flex-direction: column;
      justify-content: left;
      width: auto;
    }

    .intro-space {
      width: calc(100% - 120px);
    }

    .text-module-link {
      width: 100%;
      text-align: center;
    }

    .contact-us {
      width: 100%;
      margin-top: 30px;
    }



    .info-module-slogan h2 {
      color: var(--theme-heading);
      margin-top: -30px !important;
      max-width: calc(100% - 80px);
      font-weight: 300;
      font-size: 20px;
    }

    .data-module {
      width: 100%;
      text-align: center;
      justify-content: center;
      padding-left: 0px;
      margin-left: 0px;


    }

    .visualisation {
      width: calc(100% - 40px);
      padding-left: 20px;
      padding-right: 20px;
      margin-left: 0px;
    }



    .info-module {
      width: calc(100% - 30px);
      text-align: left;
      justify-content: left;
      padding-left: 40px;
    }

    .info-module h1 {}


    .text-module-description {
      width: 100%;
    }


    .info-module .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: left;
      padding: 0px 0px 0px 0px;
      text-align: left;
      padding-left: 20px;
      align-items: flex-start;
      width: calc(100% - 20px);


    }

    .info-module .right {
      text-align: left;
      padding: 0px 20px 0px 20px;
    }

    .links {
      flex-direction: row;
      flex-wrap: wrap;
      padding: 20px 20px;
    }

    .project-container {
      width: 100%;
      padding: 0px 20px;
    }





    .buffer {
      padding: 0px 0px;
      margin-bottom: 40px;
    }

    .link-item {
      min-width: 300px;
    }

    .projects {
      display: block;
      flex-direction: row;
      flex-grow: 1;
      width: 100%;
      align-items: center;
      margin-top: 10px;
      gap: 0px;

    }

    .project-item {
      margin-bottom: 20px;
      padding: 0px;
      flex: 1 1 0;
      width: 100%;
      border-radius: 15px !important;
    }

    #footer {
      display: none;
    }

    .gu-logo {
      display: none;
    }

    .title-space {

      width: calc(90%);

    }
  }

  .link-item {
    background: linear-gradient(180deg, rgb(133, 133, 133) 0%, rgb(182, 109, 109) 100%);
    height: 100px;
    padding: 10px;
    flex: 1 1 0;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-size: 100%;
    transition: all 0.2s ease-in-out;
  }

  .link-title {
    width: 100%;
    color: white !important;
    font-size: 30px;
    /*     text-shadow:
  0 0 1em black; */
    font-weight: 600;
  }

  .link-item:hover {
    background-size: 105%;
  }

  .link-item:hover .link-title {
    text-shadow:
      0 0 2em black;
  }


  .link-item-filler {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }




  .digicure {
    background:
      linear-gradient(180deg, rgb(133, 133, 133) 0%, rgb(0, 0, 0) 100%),
      url('digicure-link.jpg');
    background-blend-mode: soft-light;
    background-size: 100%;
    background-position: 50%;
    color: white !important;
    border-radius: 12px 0px 0px 12px;
  }

  .tools {

    border-radius: 0px 0px 0px 0px;
  }

  .technical {

    border-radius: 0px 0px 0px 0px;
  }

  .github {

    border-radius: 0px 12px 12px 0px;
  }

  @media screen and (max-width: 900px) {

    .digicure {
      border-radius: 12px 0px 0px 0px;
    }

    .tools {

      border-radius: 0px 12px 0px 0px;
    }

    .technical {

      border-radius: 0px 0px 0px 12px;
    }

    .github {

      border-radius: 0px 0px 12px 0px;
    }

  }

  @media screen and (max-width: 700px) {

    .digicure {
      border-radius: 12px;
      margin-bottom: 10px;
    }

    .tools {

      border-radius: 12px;
      margin-bottom: 10px;
    }

    .technical {

      border-radius: 12px;
      margin-bottom: 10px;
    }

    .github {

      border-radius: 12px;

    }
  }

  @media screen and (max-width: 600px) {
    .intro-space {

      padding-left: 30px;

    }

    .info-module {

      padding-left: 30px;
    }

    .info-module .left {
      padding-left: 0px;
      width: 100%;

    }

    .info-module .right {
      padding-left: 0px;


    }

  }
</style>