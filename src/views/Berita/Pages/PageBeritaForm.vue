<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-4">
      <div
        class="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors"
        @click="goBack"
      >
        <IconArrowLeft class="w-5 h-5 text-neutral-600" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 tracking-tight">
          {{ isEdit ? 'Ubah Berita' : 'Tulis Berita Baru' }}
        </h1>
        <p class="text-sm text-neutral-500 mt-1">
          {{ isEdit ? 'Perbarui informasi berita/artikel ini.' : 'Buat berita atau artikel baru untuk dipublikasikan.' }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 flex flex-col gap-6">
        <!-- Form Utama -->
        <div class="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div class="flex flex-col gap-4">
            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-1">Judul Berita <span class="text-red-500">*</span></label>
              <BaseInput
                type="text"
                placeholder="Masukkan judul berita"
                v-model="form.title"
                @input="generateSlug"
              />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-1">Slug (URL) <span class="text-red-500">*</span></label>
              <BaseInput
                type="text"
                placeholder="slug-otomatis"
                v-model="form.slug"
                readonly
                class="bg-neutral-50"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-1">Ringkasan (Excerpt)</label>
              <textarea
                class="w-full text-sm border border-neutral-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                rows="3"
                placeholder="Tulis ringkasan singkat tentang berita ini..."
                v-model="form.excerpt"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Isi Berita <span class="text-red-500">*</span></label>
              <div class="border border-neutral-300 rounded-lg overflow-hidden">
                <QuillEditor
                  ref="quillEditor"
                  theme="snow"
                  v-model:content="form.content"
                  contentType="html"
                  :options="editorOptions"
                  class="min-h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1 flex flex-col gap-6">
        <!-- Panel Samping -->
        <div class="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <h3 class="text-md font-bold text-neutral-800 border-b border-neutral-100 pb-2">Cover / Banner</h3>
          
          <div class="flex flex-col gap-3">
             <img v-if="form.thumbnail && !imageError && uploadFileVal.length === 0" :src="form.thumbnail" @error="imageError = true" class="w-full aspect-video object-cover rounded-lg border border-neutral-200" />
             <img v-else-if="uploadFileVal && uploadFileVal.length > 0 && uploadFileVal[0].base64" :src="uploadFileVal[0].base64" class="w-full aspect-video object-cover rounded-lg border border-neutral-200" />
             <div v-else class="w-full aspect-video bg-slate-100 rounded-lg border border-slate-200 flex flex-col gap-2 items-center justify-center text-slate-400">
               <IconPhoto class="w-8 h-8" />
               <span class="text-sm font-medium">Belum ada cover</span>
             </div>

             <UploadFile
              v-model="uploadFileVal"
              :maxFiles="1"
              :loading="uploading"
              formatFile=".jpg,.jpeg,.png,.webp"
              previewType="list"
            />
          </div>
        </div>

        <div class="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <h3 class="text-md font-bold text-neutral-800 border-b border-neutral-100 pb-2">Publikasi</h3>
          
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-1">Status</label>
            <SingleSelect
              :list="statusList"
              :selectedItem="selectedStatus"
              @update:selected="onStatusSelected"
              labelKey="label"
              :searchable="false"
              placeholder="Pilih Status"
            />
          </div>

          <div class="flex gap-2 mt-2">
            <BaseButton type="button" variant="secondary" outline class="w-full justify-center" @click="isPreviewOpen = true" :disabled="loading">
              <IconEye class="w-5 h-5 mr-1" />
              Pratinjau
            </BaseButton>

            <BaseButton type="button" variant="primary" class="w-full justify-center" @click="save" :disabled="loading">
              <span v-if="loading" class="flex items-center">
                 Menyimpan...
              </span>
              <span v-else class="flex items-center justify-center">
                <IconDeviceFloppy class="w-5 h-5 mr-1" />
                Simpan
              </span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div v-if="isPreviewOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 lg:p-10">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-full flex flex-col overflow-hidden">
        <div class="p-4 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
          <h2 class="text-lg font-bold text-neutral-800 flex items-center gap-2">
            <IconEye class="w-5 h-5 text-primary" /> Pratinjau Berita
          </h2>
          <button @click="isPreviewOpen = false" class="text-neutral-400 hover:text-red-500 transition-colors">
            <IconX class="w-6 h-6" />
          </button>
        </div>
        <div class="p-6 overflow-y-auto flex-1">
          <div class="max-w-4xl mx-auto flex flex-col gap-4 lg:gap-8">
            <div class="flex flex-col gap-3">
              <Badge
                class="w-max mb-1"
                :variant="form.status === 'PUBLISHED' ? 'success' : (form.status === 'DRAFT' ? 'warning' : 'secondary')"
                :text="form.status === 'PUBLISHED' ? 'Dipublikasi' : (form.status === 'DRAFT' ? 'Draf' : 'Diarsipkan')"
                pill
              />
              <h1 class="text-3xl sm:text-4xl lg:text-[42px] font-black text-neutral-900 leading-[1.2] tracking-tight break-words">{{ form.title || 'Judul Berita' }}</h1>
              
              <div class="flex flex-col gap-1 mt-2">
                <div class="flex flex-wrap items-center gap-2 text-sm text-neutral-500 font-medium">
                  <span class="text-primary font-bold uppercase tracking-wider flex items-center">
                    <IconUser class="w-4 h-4 mr-1" /> Anda (Penulis)
                  </span>
                  <span class="text-neutral-300">&mdash;</span>
                  <span>Hari ini</span>
                  <span class="text-neutral-300">/</span>
                  <span class="text-neutral-400">Umum</span>
                </div>
              </div>
            </div>

            <div class="w-full relative mt-2 mb-2 lg:mb-4">
              <img v-if="form.thumbnail && !imageError && uploadFileVal.length === 0" :src="form.thumbnail" class="w-full h-auto max-h-[500px] rounded-2xl shadow-sm object-cover bg-slate-100" />
              <img v-else-if="uploadFileVal && uploadFileVal.length > 0 && uploadFileVal[0].base64" :src="uploadFileVal[0].base64" class="w-full h-auto max-h-[500px] rounded-2xl shadow-sm object-cover bg-slate-100" />
              <div v-else class="w-full h-[250px] lg:h-[400px] bg-slate-100 rounded-2xl shadow-sm flex items-center justify-center border border-slate-200">
                <IconPhoto class="w-20 h-20 lg:w-32 lg:h-32 text-slate-400" />
              </div>
            </div>
            
            <p v-if="form.excerpt" class="text-lg text-neutral-500 italic border-l-4 border-primary pl-4">{{ form.excerpt }}</p>
            
            <div class="prose prose-lg prose-blue max-w-none text-neutral-800 leading-[1.8] font-serif-like" v-html="form.content"></div>
          </div>
        </div>
        <div class="p-4 border-t border-neutral-200 flex justify-end gap-3 bg-neutral-50">
          <BaseButton type="button" variant="secondary" outline @click="isPreviewOpen = false">Tutup Pratinjau</BaseButton>
          <BaseButton type="button" variant="primary" @click="saveAndClosePreview" :disabled="loading">
            {{ loading ? 'Menyimpan...' : 'Simpan Berita' }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/extends/plugins/axios";
import BaseInput from "@/components/Basics/BaseInput.vue";
import SingleSelect from "@/components/Basics/SingleSelect.vue";
import BaseButton from "@/components/Basics/BaseButton.vue";
import UploadFile from "@/components/Basics/UploadFile.vue";
import Badge from "@/components/Basics/Badge.vue";
import { openModalInfo } from "@/extends/plugins/modal";
import { IconArrowLeft, IconDeviceFloppy, IconEye, IconX, IconPhoto, IconUser } from "@tabler/icons-vue";

// Import VueQuill
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const route = useRoute();
const router = useRouter();

const quillEditor = ref(null);
const isEdit = computed(() => route.params.id !== undefined);
const articleId = computed(() => route.params.id);

const isPreviewOpen = ref(false);

const loading = ref(false);
const uploading = ref(false);
const uploadFileVal = ref([]);
const imageError = ref(false);

const form = ref({
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  thumbnail: "",
  status: "DRAFT",
});

const statusList = [
  { id: "DRAFT", label: "Draf" },
  { id: "PUBLISHED", label: "Dipublikasi" }
];

const selectedStatus = ref(statusList[0]);

const onStatusSelected = (val) => {
  form.value.status = val.id;
  selectedStatus.value = val;
};

const generateSlug = () => {
  if (!isEdit.value || form.value.slug === '') {
    form.value.slug = form.value.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
};

const goBack = () => {
  router.push('/kelola-berita');
};

const getDetail = async () => {
  try {
    const res = await axios.get('/api/articles/' + articleId.value);
    const data = res.data.data || res.data;
    form.value = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || "",
      content: data.content,
      thumbnail: data.thumbnail || "",
      status: data.status,
    };
    
    if (data.thumbnail) {
      // populate uploadFileVal for preview consistency
      uploadFileVal.value = [{ base64: data.thumbnail, url: data.thumbnail }];
    }

    const statusObj = statusList.find(s => s.id === data.status);
    if(statusObj) selectedStatus.value = statusObj;
  } catch (error) {
    console.error(error);
    openModalInfo({ message: "Gagal memuat detail berita", type: "error" });
  }
};

// Remove watch and auto upload cover logic

// Quill Image Handler
const imageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'articles/inline');

      try {
        const res = await axios.post('/api/uploads', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        const responseData = res.data.data || res.data;
        if (responseData?.url) {
          const quill = quillEditor.value.getQuill();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', responseData.url);
          quill.setSelection(range.index + 1);
        }
      } catch (error) {
        console.error('Image upload failed', error);
        openModalInfo({ message: "Gagal mengunggah gambar sisipan", type: "error" });
      }
    }
  };
};

const editorOptions = ref({
  modules: {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
      ],
      handlers: {
        image: imageHandler
      }
    }
  }
});


const save = async () => {
  if (!form.value.title || !form.value.slug || !form.value.content) {
    return openModalInfo({ message: "Judul, Slug, dan Isi Berita wajib diisi", type: "warning" });
  }

  loading.value = true;
  try {
    // Handle manual thumbnail upload like in PageForm.vue
    if (uploadFileVal.value && uploadFileVal.value.length > 0) {
      const p = uploadFileVal.value[0];
      if (p instanceof File || (p && p.name && p.size)) {
        const formData = new FormData();
        formData.append('file', p);
        formData.append('folder', 'articles');
        try {
          const uploadRes = await axios.post('/api/uploads', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          const responseData = uploadRes.data.data || uploadRes.data;
          form.value.thumbnail = responseData.url;
        } catch (uploadError) {
          loading.value = false;
          return openModalInfo({ message: "Gagal mengunggah banner/cover", type: "error" });
        }
      }
    } else {
      // If user cleared the UploadFile, clear the thumbnail
      form.value.thumbnail = "";
    }

    if (isEdit.value) {
      await axios.patch('/api/articles/' + articleId.value, form.value);
      openModalInfo({ message: "Berita berhasil diperbarui", type: "success" });
    } else {
      await axios.post('/api/articles', form.value);
      openModalInfo({ message: "Berita berhasil dibuat", type: "success" });
    }
    router.push('/kelola-berita');
  } catch (error) {
    console.error(error);
    openModalInfo({
      message: error.response?.data?.message || "Terjadi kesalahan",
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};

const saveAndClosePreview = async () => {
  await save();
  if(!loading.value) {
    isPreviewOpen.value = false;
  }
};

onMounted(() => {
  if (isEdit.value) {
    getDetail();
  }
});
</script>

<style>
/* Adjust Quill Editor Height */
.ql-editor {
  min-height: 400px;
  font-size: 15px;
}
.ql-container {
  font-family: 'Inter', sans-serif !important;
}

/* Typography improvements for professional news matching Detail Page */
.font-serif-like {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
.prose {
  font-size: 1rem;
}
@media (min-width: 1024px) {
  .prose {
    font-size: 1.125rem; /* 18px */
  }
}
.prose img {
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
}
@media (min-width: 1024px) {
  .prose img {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
.prose p {
  margin-bottom: 1.5em;
  color: #374151; /* neutral-700 */
}
.prose h2 {
  font-weight: 800;
  margin-top: 2em;
  color: #111827;
}
</style>
