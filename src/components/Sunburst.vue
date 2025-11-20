<template>
  <div class="sunburst-wrapper" :class="{ 'sunburst-wrapper--fullscreen': isFullscreen }">
    <button type="button" class="sunburst-fullscreen-btn" :class="{ 'sunburst-fullscreen-btn--active': isFullscreen }"
      aria-label="Toggle fullscreen" @click="toggleFullscreen">
      <img class="sunburst-fullscreen-btn__icon" :src="isFullscreen ? iconUrls.compress : iconUrls.expand" alt="" />
    </button>
    <div class="sunburst-grid" :class="{ 'sunburst-grid--fullscreen': isFullscreen }">
      <template v-if="isFullscreen">
        <div v-if="subjectChartData.length" ref="subjectListEl"
          class="sunburst-category-panel sunburst-category-panel--left">
          <ul class="sunburst-category-list">
            <li v-for="item in subjectChartData" :key="item.name" :class="[
              'sunburst-category-list__item',
              { 'sunburst-category-list__item--active': activeSubject === item.name }
            ]" :ref="el => setSubjectItemRef(item.name, el)" @mouseenter="handleListMouseEnter('subject', item.name)"
              @mouseleave="handleListMouseLeave('subject')">
              <span class="sunburst-category-list__swatch"
                :style="{ backgroundColor: getItemColor('subject', item.name) }"></span>
              <span class="sunburst-category-list__label">{{ item.name }}</span>
              <span class="sunburst-category-list__value">{{ item.value }}</span>
            </li>
          </ul>
        </div>

        <div class="sunburst-chart-block sunburst-chart-block--subject">
          <div class="sunburst-title">Subject areas</div>
          <div ref="chartContainerSubjects" class="sunburst-chart sunburst-chart--fullscreen"></div>
        </div>

        <div class="sunburst-chart-block sunburst-chart-block--tech">
          <div class="sunburst-title">Tech stack</div>
          <div ref="chartContainerTools" class="sunburst-chart sunburst-chart--fullscreen"></div>
        </div>

        <div v-if="techChartData.length" ref="techListEl"
          class="sunburst-category-panel sunburst-category-panel--right">
          <ul class="sunburst-category-list">
            <li v-for="item in techChartData" :key="item.name" :class="[
              'sunburst-category-list__item',
              { 'sunburst-category-list__item--active': activeTech === item.name }
            ]" :ref="el => setTechItemRef(item.name, el)" @mouseenter="handleListMouseEnter('tech', item.name)"
              @mouseleave="handleListMouseLeave('tech')">
              <span class="sunburst-category-list__swatch"
                :style="{ backgroundColor: getItemColor('tech', item.name) }"></span>
              <span class="sunburst-category-list__label">{{ item.name }}</span>
              <span class="sunburst-category-list__value">{{ item.value }}</span>
            </li>
          </ul>
        </div>
      </template>

      <template v-else>
        <div class="sunburst-group">
          <div class="sunburst-title">Subject areas</div>
          <div ref="chartContainerSubjects" class="sunburst-chart"></div>
        </div>

        <div class="sunburst-group">
          <div class="sunburst-title">Tech stack</div>
          <div ref="chartContainerTools" class="sunburst-chart"></div>
        </div>
      </template>
      <div id="tooltip"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as d3 from 'd3';
import { fetchByResourceTemplate, fetchByResourceClass } from '@/db';

const chartContainerTools = ref(null);
const chartContainerSubjects = ref(null);
const subjectListEl = ref(null);
const techListEl = ref(null);
const subjectChartData = ref([]);
const techChartData = ref([]);
const activeSubject = ref(null);
const activeTech = ref(null);
const isFullscreen = ref(false);
const iconUrls = {
  expand: 'https://data.dh.gu.se/ui-icons/expand_white.svg',
  compress: 'https://data.dh.gu.se/ui-icons/compress_white.svg'
};

const alternativePalette1 = [
  '#9b5de5', '#c65ccd', '#f15bb5', '#f8a07b', '#fee440',
  '#7fd09d', '#00bbf9', '#00d8e7', '#00f5d4'
];

const subjectColorScale = d3.scaleOrdinal(alternativePalette1);
const techColorScale = d3.scaleOrdinal(alternativePalette1);

const getItemColor = (type, name) => {
  return type === 'subject'
    ? subjectColorScale(name)
    : techColorScale(name);
};

let resizeObserver;
const subjectItemRefs = new Map();
const techItemRefs = new Map();

const setSubjectItemRef = (name, el) => {
  if (el) {
    subjectItemRefs.set(name, el);
  } else {
    subjectItemRefs.delete(name);
  }
};

const setTechItemRef = (name, el) => {
  if (el) {
    techItemRefs.set(name, el);
  } else {
    techItemRefs.delete(name);
  }
};

const scrollListItemIntoView = (type, name) => {
  if (!name) return;
  const container = type === 'subject' ? subjectListEl.value : techListEl.value;
  const map = type === 'subject' ? subjectItemRefs : techItemRefs;
  if (!container) return;
  const itemEl = map.get(name);
  if (!itemEl) return;

  const containerRect = container.getBoundingClientRect();
  const itemRect = itemEl.getBoundingClientRect();

  if (itemRect.top < containerRect.top) {
    container.scrollBy({
      top: itemRect.top - containerRect.top - 12,
      behavior: 'smooth'
    });
  } else if (itemRect.bottom > containerRect.bottom) {
    container.scrollBy({
      top: itemRect.bottom - containerRect.bottom + 12,
      behavior: 'smooth'
    });
  }
};

const getChartContainer = type =>
  type === 'subject' ? chartContainerSubjects.value : chartContainerTools.value;

const highlightSlice = (type, name) => {
  const container = getChartContainer(type);
  if (!container) return;

  const { baseArc, activeArc } = container.__arcFns || {};
  if (!baseArc || !activeArc) return;

  const paths = container.querySelectorAll('path[data-name]');

  paths.forEach(path => {
    const d = path.__data__;
    if (!d) return;

    const isActive = !!name && path.dataset.name === name;
    const arcFn = isActive ? activeArc : baseArc;

    d3.select(path).attr('d', arcFn(d));
  });
};

const getSlicePath = (type, name) => {
  if (!name) return null;
  const container = getChartContainer(type);
  if (!container) return null;
  const paths = container.querySelectorAll('path[data-name]');
  return Array.from(paths).find(path => path.dataset.name === name) || null;
};

const applyActiveState = (type, name, { scroll = false, showTooltip = false } = {}) => {
  if (type === 'subject') {
    activeSubject.value = name;
  } else if (type === 'tech') {
    activeTech.value = name;
  }

  highlightSlice(type, name);

  if (scroll && name && isFullscreen.value) {
    scrollListItemIntoView(type, name);
  }

  if (showTooltip) {
    showTooltipForItem(type, name);
  }
};

const showTooltipForItem = (type, name) => {
  const tooltip = d3.select('#tooltip');
  if (!name) {
    tooltip.style('display', 'none');
    return;
  }

  const dataSource = type === 'subject' ? subjectChartData.value : techChartData.value;
  const datum = dataSource.find(item => item.name === name);
  const path = getSlicePath(type, name);

  if (!datum || !path) {
    tooltip.style('display', 'none');
    return;
  }

  const rect = path.getBoundingClientRect();

  tooltip
    .style('display', 'block')
    .style('left', `${rect.left + rect.width / 2}px`)
    .style('top', `${rect.top + rect.height / 2}px`)
    .html(`<strong>${datum.name}</strong> ${datum.value}`);
};

const handleListMouseEnter = (type, name) => {
  applyActiveState(type, name, { showTooltip: true });
};

const handleListMouseLeave = type => {
  applyActiveState(type, null, { showTooltip: true });
};

function drawPieChart(data, containerEl, type) {
  if (!containerEl || !data.length) return;

  const rect = containerEl.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  if (!width || !height) return;

  d3.select(containerEl).selectAll('*').remove();
  const radius = Math.max(Math.min(width, height) / 2 - 10, 30);
  const innerRadius = Math.max(radius * 0.55, radius - 50);

  const svg = d3.select(containerEl)
    .append('svg')
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .style('font', '10px sans-serif');

  const pie = d3.pie().value(d => d.value);
  const baseArc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  const activeArc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius + 8); //slice sticks out by 8px

  containerEl.__arcFns = { baseArc, activeArc };

  const color = type === 'subject' ? subjectColorScale : techColorScale;
  const tooltip = d3.select('#tooltip');

  const handlePointerMove = (event, d) => {
    tooltip
      .style('display', 'block')
      .style('left', `${event.clientX + 12}px`)
      .style('top', `${event.clientY + 12}px`)
      .html(`<strong>${d.data.name}</strong> ${d.data.value}`);

    applyActiveState(type, d.data.name, { scroll: true, showTooltip: false });
  };

  const handlePointerOut = () => {
    tooltip.style('display', 'none');

    applyActiveState(type, null, { showTooltip: false });
  };

  const arcs = pie(data);

  svg.selectAll('path')
    .data(arcs)
    .enter()
    .append('path')
    .attr('d', d => baseArc(d))
    .attr('fill', d => color(d.data.name))
    .attr('data-name', d => d.data.name)
    .on('mouseover', handlePointerMove)
    .on('mousemove', handlePointerMove)
    .on('click', handlePointerMove)
    .on('mouseout', handlePointerOut);

  applyActiveState(type, null);
}

onMounted(async () => {
  const resp = await fetchByResourceClass(99);
  const projects = resp.map(item => ({
    subjectArea: item['dcterms:subject'] || []
  }));

  const allSubjects = projects.flatMap(item =>
    item.subjectArea.filter(sub => sub['@value']).map(sub => sub['@value'])
  );

  const subjectCounts = {};
  allSubjects.forEach(subject => {
    subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
  });

  subjectChartData.value = Object.entries(subjectCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const techItems = await fetchByResourceTemplate(6);
  const allCategories = techItems.flatMap(item =>
    (item['dcterms:type'] || []).filter(cat => cat['@value']).map(cat => cat['@value'])
  );

  const techCounts = {};
  allCategories.forEach(cat => {
    techCounts[cat] = (techCounts[cat] || 0) + 1;
  });

  techChartData.value = Object.entries(techCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      if (entry.target === chartContainerSubjects.value) {
        drawPieChart(subjectChartData.value, chartContainerSubjects.value, 'subject');
      }
      if (entry.target === chartContainerTools.value) {
        drawPieChart(techChartData.value, chartContainerTools.value, 'tech');
      }
    }
  });

  if (chartContainerTools.value) resizeObserver.observe(chartContainerTools.value);
  if (chartContainerSubjects.value) resizeObserver.observe(chartContainerSubjects.value);

  drawPieChart(subjectChartData.value, chartContainerSubjects.value, 'subject');
  drawPieChart(techChartData.value, chartContainerTools.value, 'tech');
});

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
  document.body.classList.toggle('sunburst-fullscreen-active', isFullscreen.value);
  requestAnimationFrame(() => {
    drawPieChart(subjectChartData.value, chartContainerSubjects.value, 'subject');
    drawPieChart(techChartData.value, chartContainerTools.value, 'tech');
  });
};

onUnmounted(() => {
  document.body.classList.remove('sunburst-fullscreen-active');
  if (resizeObserver) {
    if (chartContainerTools.value) resizeObserver.unobserve(chartContainerTools.value);
    if (chartContainerSubjects.value) resizeObserver.unobserve(chartContainerSubjects.value);
  }
});
</script>

<style scoped>
.sunburst-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  --sunburst-grid-gap: clamp(1rem, 4vw, 4rem);
  --sunburst-chart-full: clamp(260px, 28vw, 360px);
}

.sunburst-wrapper--fullscreen {
  position: fixed;
  inset: 0;
  background: #fff;
  z-index: 999;
  overflow-y: auto;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.sunburst-fullscreen-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  color: #1b1c24;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: background 0.2s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sunburst-fullscreen-btn--active {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1001;
  background: rgba(255, 255, 255, 0.95);
  color: #1b1c24;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.25);
}

.sunburst-fullscreen-btn:hover {
  background: #ffffff;
  transform: scale(1.05);
}

.sunburst-fullscreen-btn__icon {
  width: 20px;
  height: 20px;
  display: block;
  filter: brightness(0) saturate(100%);
}

:global(body.sunburst-fullscreen-active) {
  overflow: hidden;
}

#tooltip {
  position: fixed;
  display: none;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 8px;
  backdrop-filter: blur(5px);
}

.sunburst-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--sunburst-grid-gap);
  padding: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.sunburst-grid--fullscreen {
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: var(--sunburst-grid-gap);
  padding: 0 2rem;
}

.sunburst-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sunburst-title {
  margin-bottom: 10px;
  text-align: center;
}

.sunburst-chart-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5rem;
  box-sizing: border-box;
}

.sunburst-chart {
  width: clamp(110px, 30vw, 200px);
  height: clamp(110px, 30vw, 200px);
}

.sunburst-chart--fullscreen {
  width: var(--sunburst-chart-full);
  height: var(--sunburst-chart-full);
}

.sunburst-category-panel {
  flex: 1 1 clamp(220px, 22vw, 340px);
  max-width: clamp(220px, 22vw, 340px);
  max-height: calc(80vh - 8rem);
  overflow-y: auto;
  padding: 0.75rem 2rem 1rem 1rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.2);
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-sizing: border-box;
}

.sunburst-category-panel--left,
.sunburst-category-panel--right {
  text-align: left;
}

.sunburst-category-panel::-webkit-scrollbar {
  display: none;
}

.sunburst-category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.sunburst-category-list__item {
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  width: 100%;
  padding: 0.3rem 0.5rem;
  border-radius: 0.35rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.sunburst-category-list__value {
  color: #777;
}

.sunburst-category-list__item--active {
  background: rgba(155, 93, 229, 0.18);
  box-shadow: 0 0 0 1px rgba(155, 93, 229, 0.5), 0 8px 18px rgba(155, 93, 229, 0.25);
}

@media screen and (max-width: 1200px) {

  .sunburst-wrapper--fullscreen {
    padding: 1rem 0.5rem 1rem;
  }

  #tooltip {
    display: none !important;
  }

  .sunburst-wrapper--fullscreen .sunburst-grid,
  .sunburst-wrapper--fullscreen .sunburst-grid--fullscreen {
    height: auto;
  }

  .sunburst-grid--fullscreen {
    flex-direction: column;
    align-items: stretch;
    gap: 1.25rem;
  }

  .sunburst-grid--fullscreen>* {
    width: 100%;
    max-width: none;
  }

  .sunburst-category-panel {
    max-height: none;
  }

  .sunburst-chart-block--subject {
    order: 1;
  }

  .sunburst-category-panel--left {
    order: 2;
  }

  .sunburst-chart-block--tech {
    order: 3;
  }

  .sunburst-category-panel--right {
    order: 4;
  }

  .sunburst-grid--fullscreen .sunburst-chart,
  .sunburst-grid--fullscreen .sunburst-chart--fullscreen {
    width: min(260px, 85vw);
    height: min(260px, 85vw);
  }
}

.sunburst-category-list__swatch {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
  flex-shrink: 0;
}
</style>
