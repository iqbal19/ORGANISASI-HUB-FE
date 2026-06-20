<template>
  <div class="relative w-full h-full min-h-[300px]">
    <Bar v-if="type === 'bar'" :data="data" :options="chartOptions" />
    <Line v-else-if="type === 'line'" :data="data" :options="chartOptions" />
    <Doughnut v-else-if="type === 'doughnut'" :data="data" :options="chartOptions" />
    <Pie v-else-if="type === 'pie'" :data="data" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Bar, Line, Doughnut, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
);

const props = defineProps({
  type: {
    type: String,
    default: "bar",
    validator: (value) => ["bar", "line", "doughnut", "pie"].includes(value),
  },
  data: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 11,
        },
        usePointStyle: true,
      },
    },
    tooltip: {
      padding: 10,
      bodyFont: {
        family: "'Plus Jakarta Sans', sans-serif",
      },
      titleFont: {
        family: "'Plus Jakarta Sans', sans-serif",
        weight: "bold",
      },
    },
  },
};

const chartOptions = computed(() => {
  return {
    ...defaultOptions,
    ...props.options,
    plugins: {
      ...defaultOptions.plugins,
      ...(props.options?.plugins || {}),
      legend: {
        ...defaultOptions.plugins.legend,
        ...(props.options?.plugins?.legend || {}),
      },
      tooltip: {
        ...defaultOptions.plugins.tooltip,
        ...(props.options?.plugins?.tooltip || {}),
      },
    },
  };
});
</script>
