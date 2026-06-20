<script setup>
import { onMounted, ref, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import { sleep } from "@/extends/helpers/util.timer";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import LayoutMain from "@/layouts/LayoutMain.vue";
import { initFlowbite } from "flowbite";

const route = useRoute();
const loading = ref(true);
const LayoutView = shallowRef(LayoutDefault);
const appName = import.meta.env.VITE_NAME_APP;

watch(
  () => route?.meta,
  async (value) => {
    if (!value) return;
    await handleLayout();
  }
);

const handleLayout = async () => {
  const metaLayout = route?.meta?.layout;
  loading.value = true;
  if (route.name === "Tidak Ditemukan" || route.name === "Hak Akses Dibatasi") {
    await sleep(150);
    LayoutView.value = LayoutDefault;
  }
  if (metaLayout === "main") LayoutView.value = LayoutMain;
  if (metaLayout === "default") LayoutView.value = LayoutDefault;
  loading.value = false;
};

onMounted(async () => {
  initFlowbite();
  await handleLayout();
  document.title = appName;
});
</script>

<template>
  <layout-view v-show="!loading">
    <router-view />
  </layout-view>
</template>
