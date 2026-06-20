<template>
  <div>
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
import { useModalStore } from "@/stores/ModalStore";
import { computed } from "vue";

import ModalConfirm from "@/components/Commons/ModalConfirm.vue";
import ModalInfo from "@/components/Commons/ModalInfo.vue";
import ModalImagePreview from "@/components/Commons/ModalImagePreview.vue";
import ToastContainer from "@/components/Commons/ToastContainer.vue";

const modalStore = useModalStore();

const modalData = computed(() => modalStore.getModalData || {});
const modalInfo = computed(() => modalStore.getModalInfo || {});
const modalImage = computed(() => modalStore.getModalPreviewFoto || {});
</script>

<style lang="scss" scoped></style>
