<template>
  <div class="sunburst-grid">
    <div ref="chartContainerTools" class="sunburst-chart"></div>
    <div ref="chartContainerSubjects" class="sunburst-chart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as d3 from 'd3';
import { fetchByResourceTemplate, fetchByResourceClass } from '@/db';

const chartContainerTools = ref(null);
const chartContainerSubjects = ref(null);

const items = ref([]);
const projects = ref([]);

const size = ref({ width: 0, height: 0 });
let resizeObserver;

const frontendTools = new Set(['Vue', 'WordPress', 'Openlayers', 'Openseadragon', 'Annotorious', '3DHOP', 'Pottree']);
const backendTools = new Set(['Django', 'FlaskAPI', 'FastAPI', 'Strapi', 'Node', 'Express']);

function buildHierarchy(dataItems) {
  const hierarchyMap = {};
  dataItems.forEach(item => {
    const types = item['dcterms:type'] || [];
    const toolsList = types.map(t => t['@value']);
    toolsList.forEach(primary => {
      const isFrontend = frontendTools.has(primary);
      const isBackend = backendTools.has(primary);
      if (!isFrontend && !isBackend) return;
      const category = isFrontend ? 'Frontend' : 'Backend';
      if (!hierarchyMap[category]) hierarchyMap[category] = {};
      if (!hierarchyMap[category][primary]) hierarchyMap[category][primary] = { count: 0, seconds: {} };
      hierarchyMap[category][primary].count++;
      let secList = toolsList.filter(sec => sec !== primary);
      if (isFrontend) secList = secList.filter(sec => frontendTools.has(sec));
      if (isBackend) secList = secList.filter(sec => backendTools.has(sec));
      secList.forEach(secondary => {
        const entry = hierarchyMap[category][primary].seconds;
        entry[secondary] = (entry[secondary] || 0) + 1;
      });
    });
  });
  return {
    name: 'Tools',
    children: Object.entries(hierarchyMap).map(([category, primaries]) => ({
      name: category,
      children: Object.entries(primaries).map(([primary, data]) => {
        const children = Object.entries(data.seconds).map(([sec, count]) => ({ name: sec, value: count }));
        return children.length === 0
          ? { name: primary, value: data.count }
          : { name: primary, children };
      })
    }))
  };
}

// Reusable sunburst drawing function, accepts a container element
function drawSunburst(rootData, containerEl) {
  if (!containerEl || size.value.width === 0) return;
  const w = size.value.width;
  const h = size.value.height;
  d3.select(containerEl).selectAll('*').remove();
  const radius = Math.min(w, h) / 2;

  const svg = d3.select(containerEl)
    .append('svg')
    .attr('viewBox', [-w / 2, -h / 2, w, h])
    .style('font', '10px sans-serif');

  const rootNode = d3.hierarchy(rootData)
    .sum(d => d.value || 0)
    .sort((a, b) => (b.value || 0) - (a.value || 0));
  d3.partition().size([2 * Math.PI, rootNode.height + 1])(rootNode);

  const categories = rootData.children?.map(c => c.name) || [];
  const categoryColor = d3.scaleOrdinal(d3.schemeSet2).domain(categories);
  const primaries = rootData.children?.flatMap(c => c.children?.map(p => p.name)) || [];
  const primaryColor = d3.scaleOrdinal(d3.schemeCategory10).domain(primaries);

  const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => (d.y0 * radius) / (rootNode.height + 1))
    .outerRadius(d => (d.y1 * radius) / (rootNode.height + 1));

  const g = svg.append('g');
  const nodes = rootNode.descendants().slice(1);

  g.selectAll('path')
    .data(nodes)
    .join('path')
    .attr('fill', d => {
      if (d.depth === 1) return categoryColor(d.data.name);
      if (d.depth === 2) return primaryColor(d.data.name);
      if (d.depth === 3) {
        const parentName = d.parent.data.name;
        return d3.color(primaryColor(parentName)).brighter(0.7).formatHex();
      }
      return '#ccc';
    })
    .attr('d', arc)
    .on('click', (event, p) => {
      rootNode.each(d => {
        d.target = {
          x0: ((d.x0 - p.x0) / (p.x1 - p.x0)) * 2 * Math.PI,
          x1: ((d.x1 - p.x0) / (p.x1 - p.x0)) * 2 * Math.PI,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth)
        };
      });
      const t = g.transition().duration(750);
      g.selectAll('path').transition(t).attrTween('d', d => () => arc(d.target));
    });

  g.selectAll('path').append('title')
    .text(d => `${d.data.name}: ${d.value}`);
}

onMounted(async () => {
  // Fetch dcterms:subject data
  const resp = await fetchByResourceClass(99);
  projects.value = resp.map(item => ({
    subjectArea: item['dcterms:subject'] || []
  }));

  const allSubjects = projects.value.flatMap(item =>
    item.subjectArea
      .filter(sub => sub['@value'])
      .map(sub => sub['@value'])
  );

  const subjectCounts = {};
  allSubjects.forEach(subject => {
    subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
  });

  const sunburstSubjects = {
    name: "Subjects",
    children: Object.entries(subjectCounts).map(([name, count]) => ({
      name,
      value: count
    }))
  };

  // Observe container
  resizeObserver = new ResizeObserver(() => {
    size.value.width = chartContainerTools.value?.clientWidth || 0;
    size.value.height = chartContainerTools.value?.clientHeight || 0;

    if (items.value.length && chartContainerTools.value)
      drawSunburst(buildHierarchy(items.value), chartContainerTools.value);

    if (chartContainerSubjects.value)
      drawSunburst(sunburstSubjects, chartContainerSubjects.value);
  });

  if (chartContainerTools.value) resizeObserver.observe(chartContainerTools.value);
  if (chartContainerSubjects.value) resizeObserver.observe(chartContainerSubjects.value);

  items.value = await fetchByResourceTemplate(6);

  drawSunburst(buildHierarchy(items.value), chartContainerTools.value);
  drawSunburst(sunburstSubjects, chartContainerSubjects.value);
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
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
}

.sunburst-chart {
  width: 200px;
  height: 200px;
}
</style>
