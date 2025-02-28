<template>
  <footer id="footer">
    <div id="developer-info">
      <div class="links-stack ">
        <a class="site-link link" href="https://www.gu.se/digital-humaniora" target="_blank">GRIDH home</a>
        <a class="site-link link" href="https://github.com/gu-gridh/" target="_blank">GitHub repository</a>
      </div>
     <div class="links-stack border-style">
      Address: Box 100, 405 30 Gothenburg <br>
      Telephone: +46 (0) 31-786 0000
    </div> 
    </div>
    <div class="partners">
      <a href="https://dh.gu.se/">
        <div class="GRIDHLogo" id="">GRIDH</div>
      </a>

      <a href="https://www.gu.se">
        <div class="PartnerLogo" id="">GU</div>
      </a>
  </div>
  </footer>
</template>

<script setup>


</script>

<style>
#footer {
  display:block;
  background-color: #222;
  color: white;
  line-height: 1;
  height: 82px;
  width: calc(100% + 2px);
  font-size: 12px;
  position: fixed;
  z-index: 3000;
  bottom: -2px;;
  font-family: "Barlow Condensed", sans-serif;
}

#footer a {
  font-weight: bold;
  color:white;
}

.partners {
    float: right;
    position: fixed;

    bottom: 0px;
    right: 0px;
    height: 80px;
  }

  .GRIDHLogo {
    float: right;
    margin-top: 30px;
    width: auto;
    height: auto;
    text-align: left;
    font-weight: 100;
    font-style: normal;
    font-size: 30px;
    line-height: 0.8;
    padding: 0px 50px 5px 30px;
    vertical-align: middle;
  }

  .PartnerLogo {
    float: right;
    margin-top: 30px;
    width: auto;
    height: auto;
    text-align: left;
    font-weight: 100;
    font-style: normal;
    font-size: 30px;
    line-height: 0.8;
    padding: 0px 30px 5px 30px;
    vertical-align: middle;
    border-width: 0px 0.5px 0px 0px;
    border-color: white;
    border-style: solid;
  }

#developer-info {
  display: flex; 
  align-items: flex-end; 
  margin-left: 40px;
  margin-top: 10px;
  font-size: 1.5em;
  line-height: 1.4;
  font-weight: 200;
}

.border-style {
  border-width: 0 0px 0 0.5px;
  border-color: white;
  border-style: dashed;
  padding-left: 20px; 
  padding-right: 10px; 

}

.link{
color:white;
}

.link:visited{
color:white;
}

.link:hover{
opacity:0.8;
}

.download-link{
  background:url("https://data.dh.gu.se/ui-icons/download_white_circle.png");
  background-size:18px;
  background-position:0px 50%;
  background-repeat:no-repeat;
  padding-left:25px;
  margin-left:0px;
}

.site-link{
  background:url("https://data.dh.gu.se/ui-icons/arrow_link_white_circle.png");
  background-size:18px;
  background-position:0px 50%;
  background-repeat:no-repeat;
  padding-left:25px;

}

.links-stack {
  margin-right: 20px; 
}

.links-stack a {
  display: block;
}

#developer-info a:link{
  font-weight:200;
}

</style>
