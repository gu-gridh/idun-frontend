<script setup lang="ts">
  import { RouterLink, RouterView } from "vue-router";
  import Footer from "@/components/Footer.vue";
</script>

<template>


  <div class="top-menu">
    <router-link to="/"><div class="menu-item  menu-selected">Home</div></router-link>
    <router-link to="/resources"><div class="menu-item">All resources and tools</div></router-link>
    <router-link to="/projects"><div class="menu-item">All projects</div></router-link>
</div>

  <div class="top">
    
    <div class="title-space">
      <div class="title-gridh">
        GRIDH:
      </div>
      <div class="subtitle-gridh">
        Gothenburg <br>
        Research Infrastructure<br>
        in Digital Humanities
      </div>
      <div class="gu-logo">
        <div class="logo"></div>
      </div>
    </div>

    
  </div>

  <div class="container">
    <RouterView />
  </div>
  <Footer />
</template>

<style>
  .top-menu {
    display: flex;
    flex-direction: row;
    width: 500px;
    color:white;
    margin-left:60px;
    font-family: "Barlow Condensed", sans-serif !important;
  }

  .menu-item{
    color:black ;
    background-color:none;
    padding:20px 20px;
    cursor:pointer;
    margin-right:0.5px;
  }

  .menu-item:hover{
    background: linear-gradient(360deg, #fdb1ce 0%, #bbafff 100%);
    color:white;

  }

  .menu-item:visited{
    color:black !important;
  }

.menu-selected {
  background: linear-gradient(360deg, #fdb1ce 0%, #bbafff 100%);
  color:white;
  }

  .top {
    font-family: "Barlow Condensed", sans-serif !important;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 30px;
  }

  .title-space {
    font-family: "Barlow Condensed", sans-serif !important;
    text-align: left;
    width: calc(50%);
    font-weight: 600;
    line-height: 0.85;
    margin-left: 60px;
    color: var(--theme-heading);
    background: -webkit-linear-gradient(var(--theme-livedata1), var(--theme-livedata2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .title-gridh {
    width: 100%;
    font-size: 80px;


  }


  .subtitle-gridh {
    width: 100%;
    font-size: 60px;
    min-width: 500px;
    padding-bottom: 10px;
  }

  .livedata-pulse {

    /* Standard Syntax */
    animation: livedata-pulse 2.0s infinite;
  }


  /* Standard Syntax */
  @keyframes livedata-pulse {
    0% {
      color: var(--theme-livedata1);
    }

    50% {
      color: var(--theme-livedata2);
    }

    100% {
      color: var(--theme-livedata1);
    }
  }


  .gu-logo {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    right: 80px;
    top: 0px;
    height: 170px;
    width: 150px;
    border-radius: 0px 0px 5px 5px;
    background: linear-gradient(180deg, rgb(0, 0, 0) 0%, rgb(51, 51, 51) 100%);
  }

  .logo {
    width: 120px;
    height: 120px;
    background: url(gu_logo.png);
    background-size: contain;
    background-repeat: no-repeat;
  }

  .container {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 80px;
    display: flex;
    margin: 0px;
    font-family: "Barlow Condensed", sans-serif !important;
    display:flex;
    flex-direction: column;
  }

  @media screen and (max-width: 900px) {
    .container {
      flex-direction: column;
      align-items: left;
    }
  }
</style>