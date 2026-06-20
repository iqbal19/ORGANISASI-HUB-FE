<script setup>
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  isBorder: {
    type: Boolean,
    default: false,
  },
  classWidth: {
    type: String,
    default: "max-w-2xl",
  },
  bgHeader: {
    type: String,
    default: "bg-white",
  },
  paddingHeader: {
    type: String,
    default: "p-[18px]",
  },
  isClose: {
    type: Boolean,
    default: true,
  },
  paddingBody: {
    type: String,
    default: "px-[18px] py-5",
  },
  paddingFooter: {
    type: String,
    default: "p-[18px] ",
  },
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};
</script>

<template>
  <!-- Main modal -->
  <transition name="preview-wrapper" appear>
    <div
      v-if="showModal"
      class="fixed inset-0 z-[1002] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="fixed inset-0 bg-neutral-800 opacity-50 h-auto" @click="closeModal"></div>
      <div class="relative w-full max-h-full p-4" :class="classWidth">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->

          <div
            class="flex items-center justify-between rounded-t-lg px-[18px] pt-[18px]"
            :class="[isBorder ? 'border-b ' : '', bgHeader, paddingHeader]"
          >
            <slot name="header"> </slot>
            <button
              v-if="isClose"
              @click="closeModal"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              type="button"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div class="" :class="[paddingBody]">
            <slot name="body">
              <!-- isi body -->
              <p class="text-base leading-relaxed text-gray-500">
                Default modal body content goes here.
              </p>
            </slot>
          </div>

          <div
            v-if="$slots.footer"
            :class="[paddingFooter]"
            class="flex justify-end items-center space-x-2 border-t border-gray-200 rounded-b-lg"
          >
            <slot name="footer">
              <!-- isi footer -->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.preview-wrapper-enter-from {
  opacity: 0;
}

.preview-wrapper-enter-to {
  opacity: 1;
}

.preview-wrapper-enter-active {
  transition: all 0.5s ease-in-out;
}

.preview-wrapper-leave-from {
  opacity: 1;
}

.preview-wrapper-leave-to {
  opacity: 0;
}

.preview-wrapper-leave-active {
  transition: all 0.5s ease-in-out;
}

.modal-wrapper::-webkit-scrollbar {
  width: 5px;
  display: none;
}
</style>
