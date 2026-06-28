<template>
  <div class="w-full">
    <div
      v-if="file.length < maxFiles"
      class="w-full base-input border rounded-lg cursor-pointer"
    >
      <div v-bind="dropzone.getRootProps()" class="min-h-10 flex items-center">
        <input v-bind="dropzone.getInputProps()" />
        <div class="flex items-center gap-3">
          <div class="text-center hidden md:block self-center">
            <button
              class="button button-primary dark:text-dark-800"
              type="button"
            >
              Pilih Berkas
            </button>
          </div>
          <div class="flex items-center gap-3 flex-1">
            <p class="text-s text-neutral-500 dark:text-dark-500">
              {{ formatFile }} maks {{ maxFileSizeMB }} MB
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- PREVIEW: LIST (Default) -->
  <div class="w-full" v-if="previewType === 'list'">
    <div
      v-for="(data, index) in file"
      :key="index"
      class="my-2 py-1 base-input border rounded-lg"
    >
      <div class="py-2 rounded flex justify-between items-center gap-4">
        <div class="flex items-center overflow-hidden gap-3">
          <img v-if="isImage(data)" :src="isLink(data) ? data : data.base64" class="w-8 h-8 object-cover rounded bg-neutral-100 border border-neutral-200 flex-shrink-0" />
          <div v-else class="w-8 h-8 bg-neutral-50 flex items-center justify-center rounded border border-neutral-200 flex-shrink-0 text-neutral-400">
            <IconFile class="w-4 h-4" />
          </div>
          <p
            class="text-start text-neutral-800 dark:text-dark-800 text-s whitespace-nowrap overflow-hidden overflow-ellipsis line-clamp-1"
          >
            {{
              isLink(data)
                ? getFileNameFromURL(data)
                : data.name || data.fileName || "File"
            }}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <p
            class="text-s ml-auto text-neutral-500 whitespace-nowrap"
            v-if="data.size"
          >
            {{ formatFileSize(data.size) }}
          </p>
          <button
            class="text-neutral-500"
            type="button"
            @click="removeFile(index)"
          >
            <IconTrash class="w-5 h-5 min-w-5 min-h-5 text-danger" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- PREVIEW: IMAGE -->
  <div class="w-full mt-4 flex flex-wrap gap-4" v-else-if="previewType === 'image' && file.length > 0">
    <div
      v-for="(data, index) in file"
      :key="index"
      class="relative group w-32 h-32 rounded-lg border border-neutral-200 overflow-hidden bg-neutral-50 flex-shrink-0"
    >
      <img
        :src="isLink(data) ? data : data.base64"
        class="w-full h-full object-cover"
        alt="Preview"
      />
      <!-- Delete Overlay -->
      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button
          class="bg-white rounded-full p-2 text-danger hover:scale-110 transition-transform shadow-sm"
          type="button"
          @click.stop="removeFile(index)"
        >
          <IconTrash class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDropzone } from "vue3-dropzone";
import { openModalInfo } from "@/extends/plugins/modal";
import { IconTrash, IconFile } from "@tabler/icons-vue";

const props = defineProps({
  defaultFile: {
    type: String,
    default: null,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  maxSize: {
    type: Number,
    default: 2000000,
  },
  maxFiles: {
    type: Number,
    default: null,
  },
  formatFile: {
    type: String,
    default: ".pdf,.jpg,.jpeg,.png",
  },
  previewType: {
    type: String,
    default: "list", // "list" | "image"
    validator: (value) => ["list", "image"].includes(value),
  },
});

const file = ref(Array.isArray(props.modelValue) ? [...props.modelValue] : []);
const maxFileSizeMB = (props.maxSize / 1000 / 1000).toFixed(2);
const emits = defineEmits(["update:modelValue"]);

const dropzone = useDropzone({
  accept: props.formatFile,
  maxSize: props.maxSize,
  multiple: true,
  maxFiles: props.maxFiles || Infinity,
  onDrop: (acceptFiles, rejectReasons) => {
    handleDrop(acceptFiles, rejectReasons);
  },
});

const handleDrop = (acceptFiles, rejectReasons) => {
  if (rejectReasons.length > 0) {
    rejectReasons.forEach((element) => {
      if (element?.errors?.some((e) => e.code === "file-too-large")) {
        openModalInfo({
          message: "Maksimal Ukuran Berkas " + maxFileSizeMB + " MB",
          type: "error",
        });
      }
      if (element?.errors?.some((e) => e.code === "too-many-files")) {
        openModalInfo({
          message:
            "Hanya Boleh Mengunggah Maksimal " + props.maxFiles + " Berkas",
          type: "error",
        });
      }
    });
  } else {
    const currentFilesLength = file.value.length;
    const newFilesLength = acceptFiles.length;
    const maxFiles = props.maxFiles;

    if (!maxFiles || currentFilesLength + newFilesLength <= maxFiles) {
      acceptFiles.forEach((files) => {
        convertToBase64(files).then((base64) => {
          files.base64 = base64;
          file.value.push(files);
          emits("update:modelValue", file.value);
        });
      });
    } else {
      openModalInfo({
        message: "Maksimal " + props.maxFiles + " Berkas",
        type: "error",
      });
    }
  }
};

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 MB";
  const mb = 1024 * 1024;
  const dm = decimals < 0 ? 0 : decimals;
  return (bytes / mb).toFixed(dm) + " MB";
};

const removeFile = (index) => {
  file.value.splice(index, 1);
  emits("update:modelValue", file.value);
};

const isLink = (data) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!urlPattern.test(data);
};

const isImage = (data) => {
  if (isLink(data)) {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(data);
  }
  return data.type && data.type.startsWith('image/');
};

const getFileNameFromURL = (url) => {
  const match = url.split("/").pop();
  return match || "File";
};

watch(
  () => props.modelValue,
  (newFiles, oldFiles) => {
    if (Array.isArray(newFiles) && newFiles !== oldFiles) {
      file.value = [...newFiles];
    } else {
      file.value = [];
    }
  }
);
</script>
