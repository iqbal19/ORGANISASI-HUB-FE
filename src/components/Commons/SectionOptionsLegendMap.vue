<template>
  <div class="absolute top-4 left-4 z-[1000] flex flex-col gap-1 md:gap-[10px]">
    <!-- Layer -->
    <div
      class="relative bg-neutral-900 min-w-10 min-h-10 w-10 h-10 flex justify-center items-center cursor-pointer"
      @click="toggleText('layer')"
      title="Layer"
    >
      <IconStack2 class="text-neutral-100 min-w-6 min-h-6 w-6 h-6" />
      <div
        v-if="visibleText === 'layer'"
        class="absolute left-12 top-0 w-64 shadow"
        @click.stop
      >
        <div class="p-[14px] bg-neutral-700 flex items-center">
          <p class="text-base font-bold text-warning">Layer</p>
        </div>
        <div
          class="p-[14px] bg-neutral-900 flex flex-col gap-[14px] max-h-40 md:max-h-80 overflow-auto"
        >
          <div v-for="(item, index) in props.layerOptions" :key="index">
            <div
              class="flex items-center gap-[10px]"
              @click="item.is_active = !item.is_active"
            >
              <IconEye
                class="min-w-6 min-h-6 h-6 w-6 text-neutral-100"
                v-if="item.is_active"
              />
              <IconEyeOff
                class="min-w-6 min-h-6 h-6 w-6 text-neutral-100"
                v-else
              />
              <p class="text-neutral-100 font-bold">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div
      class="relative bg-neutral-900 min-w-10 min-h-10 w-10 h-10 flex justify-center items-center cursor-pointer"
      @click="toggleText('legend')"
      title="Legend"
    >
      <IconMap2 class="text-neutral-100 min-w-6 min-h-6 w-6 h-6" />
      <div
        v-if="visibleText === 'legend'"
        class="absolute left-12 top-0 w-64 shadow"
        @click.stop
      >
        <div class="p-[14px] bg-neutral-700 flex items-center">
          <p class="text-base font-bold text-warning">Legend</p>
        </div>
        <div class="p-[14px] bg-neutral-900 flex flex-col gap-[14px]">
          <div
            class="flex items-center gap-[10px]"
            v-for="(item, index) in legendPipa"
            :key="index"
          >
            <IconTimeline
              class="min-w-6 min-h-6 h-6 w-6"
              :style="{ color: item?.color }"
            />
            <p class="font-bold text-neutral-100">{{ item?.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Peta Dasar -->
    <div
      class="relative bg-neutral-900 min-w-10 min-h-10 w-10 h-10 flex justify-center items-center cursor-pointer"
      @click="toggleText('peta-dasar')"
      title="Basemap"
    >
      <IconChartTreemap class="text-neutral-100 min-w-6 min-h-6 w-6 h-6" />
      <div
        v-if="visibleText === 'peta-dasar'"
        class="absolute left-12 top-0 w-64 shadow"
        @click.stop
      >
        <div class="p-[14px] bg-neutral-700 flex items-center">
          <p class="text-base font-bold text-warning">Basemap</p>
        </div>
        <div class="p-[14px] bg-neutral-900 flex flex-col gap-[14px]">
          <div
            class="flex items-center gap-[10px]"
            @click="handlePetaDasar('world-imagery')"
          >
            <img
              src="@/assets/images/world-imagery.svg"
              alt="world-imagery"
              class="object-cover min-w-16 min-h-16 w-16 h-16"
            />
            <p class="text-neutral-100 text-sm font-bold">World Imagery</p>
          </div>
          <div
            class="flex items-center gap-[10px]"
            @click="handlePetaDasar('open-street-map')"
          >
            <img
              src="@/assets/images/open-street-map.svg"
              alt="open-street-map"
              class="object-cover min-w-16 min-h-16 w-16 h-16"
            />
            <p class="text-neutral-100 text-sm font-bold">Open Street Map</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Reset Map -->
    <div
      class="relative bg-neutral-900 min-w-10 min-h-10 w-10 h-10 flex justify-center items-center cursor-pointer"
      @click="handleResetMap"
      title="Default Map View"
    >
      <IconHome class="text-neutral-100 min-w-6 min-h-6 w-6 h-6" />
    </div>

    <div class="">
      <div
        class="relative bg-neutral-900 min-w-10 min-h-10 w-10 h-10 flex justify-center items-center cursor-pointer border-b"
        @click="handleZoom('in')"
        title="Zoom In"
      >
        <IconPlus class="text-neutral-100 min-w-6 min-h-6 w-6 h-6" />
      </div>

      <div
        class="relative bg-neutral-900 min-w-10 min-h-10 w-10 h-10 flex justify-center items-center cursor-pointer"
        @click="handleZoom('out')"
        title="Zoom Out"
      >
        <IconMinus class="text-neutral-100 min-w-6 min-h-6 w-6 h-6" />
      </div>
    </div>

    <div class="">
      <div
        class="relative bg-neutral-900 min-w-10 min-h-10 w-10 h-10 flex justify-center items-center cursor-pointer"
        @click="handleJalurPipa"
        title="Jaringan Pipa"
      >
        <IconPolygon
          v-if="showJalurPipa"
          class="text-neutral-100 min-w-6 min-h-6 w-6 h-6"
        />
        <IconPolygonOff
          v-else
          class="text-neutral-100 min-w-6 min-h-6 w-6 h-6"
        />
      </div>
    </div>
    <div class="">
      <div
        class="relative bg-neutral-900 min-w-10 min-h-10 w-10 h-10 flex justify-center items-center cursor-pointer"
        @click="handleTitikPengerjaan"
        title="Titik Pengerjaan"
      >
        <IconTrafficCone
          v-if="showTitikPengerjaan"
          class="text-neutral-100 min-w-6 min-h-6 w-6 h-6"
        />
        <IconTrafficConeOff
          v-else
          class="text-neutral-100 min-w-6 min-h-6 w-6 h-6"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { pipaColors } from "@/extends/helpers/util.color";
import {
  IconChartTreemap,
  IconEye,
  IconEyeOff,
  IconHome,
  IconMap2,
  IconMinus,
  IconPlus,
  IconStack2,
  IconTimeline,
  IconPolygon,
  IconPolygonOff,
  IconTrafficCone,
  IconTrafficConeOff,
} from "@tabler/icons-vue";
import { ref } from "vue";

const props = defineProps({
  layerOptions: Object,
  showJalurPipa: Boolean,
  showTitikPengerjaan: Boolean,
});
const emit = defineEmits([
  "handlePetaDasar",
  "resetMap",
  "handleZoom",
  "handleJalurPipa",
  "handleTitikPengerjaan",
]);

const visibleText = ref(null);
const legendPipa = [
  {
    name: "Pipa 75",
    color: pipaColors[75],
  },
  {
    name: "Pipa 110",
    color: pipaColors[110],
  },
  {
    name: "Pipa 160",
    color: pipaColors[160],
  },
  {
    name: "Pipa 200",
    color: pipaColors[200],
  },
  {
    name: "Pipa 400",
    color: pipaColors[400],
  },
];

const handleZoom = (type) => {
  emit("handleZoom", type);
};
const handleResetMap = () => {
  emit("resetMap");
};
const handlePetaDasar = (peta) => {
  emit("handlePetaDasar", peta);
};
const toggleText = (icon) => {
  visibleText.value = visibleText.value === icon ? null : icon;
};
const handleJalurPipa = () => {
  emit("handleJalurPipa");
};
const handleTitikPengerjaan = () => {
  emit("handleTitikPengerjaan");
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #c5c5c5;
  border-radius: 5px;
}

::-webkit-scrollbar-track {
  background-color: #232323;
  border-radius: 5px;
}
</style>
