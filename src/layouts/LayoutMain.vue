<template>
  <Navbar />
  <Sidebar />

  <!-- Backdrop Overlay untuk resolusi Mobile -->
  <transition name="fade">
    <div
      v-if="uiStore.isSidebarOpen"
      class="fixed inset-0 z-[999] bg-neutral-900/40 backdrop-blur-xs sm:hidden"
      @click="uiStore.closeSidebar"
    ></div>
  </transition>

  <!-- Kontainer Utama Aplikasi -->
  <div class="p-4  sm:ml-64 mt-16 min-h-screen bg-[#FCFEFF] transition-all duration-300">
    <slot />
  </div>

  <div v-if="modalData">
    <ModalConfirm
      :id="'modal-confirm-component'"
      :message="modalData?.message"
      :title="modalData?.title"
      :withTitle="true"
      :type="modalData?.type"
      :loading="false"
      :confirmButtonText="modalData?.confirmButtonText"
    />
  </div>
  <div v-if="modalInfo">
    <ModalInfo
      :id="'modal-info'"
      :message="modalInfo?.message"
      :title="modalInfo?.title"
      :withTitle="true"
      :type="modalInfo?.type"
    />
  </div>
  <div v-if="modalImage">
    <ModalImagePreview :data="modalImage" />
  </div>
  <ToastContainer />
</template>

<script setup>
import Navbar from "@/components/Commons/Navbar.vue";
import Sidebar from "@/components/Commons/Sidebar.vue";
import { useModalStore } from "@/stores/ModalStore";
import { useUIStore } from "@/stores/UIStore";
import { computed } from "vue";

import ModalConfirm from "@/components/Commons/ModalConfirm.vue";
import ModalInfo from "@/components/Commons/ModalInfo.vue";
import ModalImagePreview from "@/components/Commons/ModalImagePreview.vue";
import ToastContainer from "@/components/Commons/ToastContainer.vue";

const modalStore = useModalStore();
const uiStore = useUIStore();

const modalData = computed(() => modalStore.getModalData || {});
const modalInfo = computed(() => modalStore.getModalInfo || {});
const modalImage = computed(() => modalStore.getModalPreviewFoto || {});
</script>

<style scoped>
/* Animasi Fade Backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
