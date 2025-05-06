<template>
    <div ref="chartContainer" class="sunburst-chart"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import * as d3 from 'd3';
  import { fetchByResourceTemplate } from '@/db';
  
  // Refs
  const chartContainer = ref(null);
  const items = ref([]);
  
  // Track container size
  const size = ref({ width: 0, height: 0 });
  let resizeObserver;
  
  // Classification sets
  const frontendTools = new Set([
    'Vue', 'WordPress', 'Openlayers', 'Openseadragon', 'Annotorious', '3DHOP', 'Pottree'
  ]);
  const backendTools = new Set([
    'Django', 'FlaskAPI', 'FastAPI', 'Strapi', 'Node', 'Express'
  ]);
  
  // Build three-level hierarchy: category -> primary tool -> secondary tools
  function buildHierarchy(dataItems) {
    // Map structure: category -> primary -> { count, seconds: { secondary: count } }
    const hierarchyMap = {};
    dataItems.forEach(item => {
      const types = item['dcterms:type'] || [];
      const toolsList = types.map(t => t['@value']);
      // Determine primary tools
      toolsList.forEach(primary => {
        const isFrontend = frontendTools.has(primary);
        const isBackend = backendTools.has(primary);
        if (!isFrontend && !isBackend) return;
        const category = isFrontend ? 'Frontend' : 'Backend';
        if (!hierarchyMap[category]) hierarchyMap[category] = {};
        if (!hierarchyMap[category][primary]) hierarchyMap[category][primary] = { count: 0, seconds: {} };
        // Count primary occurrence
        hierarchyMap[category][primary].count++;
        // Secondary tools: same category only
        let secList = toolsList.filter(sec => sec !== primary);
        if (isFrontend) secList = secList.filter(sec => frontendTools.has(sec));
        if (isBackend) secList = secList.filter(sec => backendTools.has(sec));
        secList.forEach(secondary => {
          const entry = hierarchyMap[category][primary].seconds;
          entry[secondary] = (entry[secondary] || 0) + 1;
        });
      });
    });
    // Build NodeDatum tree
    return {
      name: 'Tools',
      children: Object.entries(hierarchyMap).map(([category, primaries]) => ({
        name: category,
        children: Object.entries(primaries).map(([primary, data]) => {
          const children = Object.entries(data.seconds).map(([sec, count]) => ({ name: sec, value: count }));
          // If no secondaries, make leaf with primary count
          if (children.length === 0) {
            return { name: primary, value: data.count };
          }
          // Otherwise, sum counts for children, and optionally include self
          return { name: primary, children };
        })
      }))
    };
  }
  
  // Draw zoomable sunburst
  function drawSunburst(rootData) {
    const container = chartContainer.value;
    if (!container || size.value.width === 0) return;
    const w = size.value.width;
    const h = size.value.height;
    d3.select(container).selectAll('*').remove();
    const radius = Math.min(w, h) / 2;
  
    const svg = d3.select(container)
      .append('svg')
      .attr('viewBox', [-w/2, -h/2, w, h])
      .style('font', '10px sans-serif');
  
    // Partition layout
    const rootNode = d3.hierarchy(rootData)
      .sum(d => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));
    d3.partition().size([2 * Math.PI, rootNode.height + 1])(rootNode);
  
    // Color scales
    const categories = rootData.children.map(c => c.name);
    const categoryColor = d3.scaleOrdinal(d3.schemeSet2).domain(categories);
    const primaries = rootData.children.flatMap(c => c.children.map(p => p.name));
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
    // Observe container size
    resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        size.value.width = entry.contentRect.width;
        size.value.height = entry.contentRect.height;
        if (items.value.length) drawSunburst(buildHierarchy(items.value));
      }
    });
    if (chartContainer.value) resizeObserver.observe(chartContainer.value);
  
    // Fetch data and initial draw
    items.value = await fetchByResourceTemplate(6);
    drawSunburst(buildHierarchy(items.value));
  });
  
  onUnmounted(() => {
    if (resizeObserver && chartContainer.value) {
      resizeObserver.unobserve(chartContainer.value);
    }
  });
  </script>
  
  <style scoped>
  .sunburst-chart { width: 100%; height: 100%; }
  </style>
  