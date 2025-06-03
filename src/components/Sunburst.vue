<template>
  <div class="sunburst-grid">
    <div class="sunburst-group">
      <div class="sunburst-title">Subject areas</div>
      <div ref="chartContainerSubjects" class="sunburst-chart"></div>
    </div>

    <div class="sunburst-group">
      <div class="sunburst-title">Tech stack</div>
      <div ref="chartContainerTools" class="sunburst-chart"></div>
    </div>  
    <div id="tooltip" style="position: absolute; display: none; pointer-events: none; background: white; border: 1px solid #ccc; padding: 5px; font-size: 12px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as d3 from 'd3';
import { fetchByResourceTemplate, fetchByResourceClass } from '@/db';

const chartContainerTools = ref(null);
const chartContainerSubjects = ref(null);

const projects = ref([]);
const items = ref([]);
const size = ref({ width: 0, height: 0 });
let resizeObserver;

function drawPieChart(data, containerEl) {
  if (!containerEl || size.value.width === 0) return;
  d3.select(containerEl).selectAll('*').remove();
  const width = size.value.width;
  const height = size.value.height;
  const radius = Math.min(width, height) / 2;

  const svg = d3.select(containerEl)
    .append('svg')
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .style('font', '10px sans-serif');

  const pie = d3.pie().value(d => d.value);
  const arc = d3.arc().innerRadius(radius - 50).outerRadius(radius);

  const pastelPalette = [

  '#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6',
  '#ffffcc', '#ed80aa', '#fddaec', '#f2f2f2'
];

const alternativePalette1 = [
    '#9b5de5', '#c65ccd','#f15bb5','#f8a07b','#fee440',
    '#7fd09d','#00bbf9','#00d8e7','#00f5d4'

];

const color = d3.scaleOrdinal(alternativePalette1);

const tooltip = d3.select('#tooltip');

function handleInteraction(event, d) {
  tooltip
    .style('display', 'block')
    .style('left', `${event.pageX + 10}px`)
    .style('top', `${event.pageY + 10}px`)
    .html(`<strong>${d.data.name}</strong> ${d.data.value}`);
}


  const arcs = pie(data);

  svg.selectAll('path')
    .data(arcs)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.name))
    .on('mouseover', handleInteraction)
    .on('click', handleInteraction)
    .on('mouseout', () => tooltip.style('display', 'none'));
}

onMounted(async () => {
  // Subject areas
  const resp = await fetchByResourceClass(99);
  projects.value = resp.map(item => ({
    subjectArea: item['dcterms:subject'] || []
  }));

  const allSubjects = projects.value.flatMap(item =>
    item.subjectArea.filter(sub => sub['@value']).map(sub => sub['@value'])
  );

  const subjectCounts = {};
  allSubjects.forEach(subject => {
    subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
  });

  const subjectData = Object.entries(subjectCounts).map(([name, value]) => ({ name, value }));

  // Tech stack (from schema:category)
  const techItems = await fetchByResourceTemplate(6);
  const allCategories = techItems.flatMap(item =>
    (item['dcterms:type'] || []).filter(cat => cat['@value']).map(cat => cat['@value'])
  );

  const techCounts = {};
  allCategories.forEach(cat => {
    techCounts[cat] = (techCounts[cat] || 0) + 1;
  });

  const techData = Object.entries(techCounts).map(([name, value]) => ({ name, value }));

  // Resize observer
  resizeObserver = new ResizeObserver(() => {
    size.value.width = chartContainerTools.value?.clientWidth || 0;
    size.value.height = chartContainerTools.value?.clientHeight || 0;

    drawPieChart(subjectData, chartContainerSubjects.value);
    drawPieChart(techData, chartContainerTools.value);
  });

  if (chartContainerTools.value) resizeObserver.observe(chartContainerTools.value);
  if (chartContainerSubjects.value) resizeObserver.observe(chartContainerSubjects.value);

  // Initial draw
  drawPieChart(subjectData, chartContainerSubjects.value);
  drawPieChart(techData, chartContainerTools.value);
});

onUnmounted(() => {
  if (resizeObserver) {
    if (chartContainerTools.value) resizeObserver.unobserve(chartContainerTools.value);
    if (chartContainerSubjects.value) resizeObserver.unobserve(chartContainerSubjects.value);
  }
});
</script>

<style scoped>
.sunburst-grid {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  padding: 0rem;
  height: 100%;
  width: 100%;
}

.sunburst-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sunburst-title {
  margin-bottom: 10px;
}

.sunburst-chart {
  width: 200px;
  height: 200px;
  transition: all 0.2s ease-in-out;
}

.sunburst-chart:hover {
  transform: scale(1.05);
}

@media screen and (max-width: 1100px) {
  .sunburst-grid {
    gap: 1rem;
  }
  .sunburst-chart {
    width: 170px;
    height: 170px;
  }
}

@media screen and (max-width: 900px) {
  .sunburst-grid {
    gap: 2rem;
  }
  .sunburst-chart {
    width: 200px;
    height: 200px;
  }
}

@media screen and (max-width: 500px) {
  .sunburst-grid {
    gap: 1rem;
  }
  .sunburst-chart {
    width: 120px;
    height: 120px;
  }
}
</style>
