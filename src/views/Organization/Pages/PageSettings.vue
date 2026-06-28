<template>
  <div class="flex flex-col gap-6">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <nav class="flex text-xs font-semibold text-neutral-400 mb-2 gap-2 items-center">
          <router-link to="/beranda" class="hover:text-primary transition-colors">Beranda</router-link>
          <span class="text-neutral-300">/</span>
          <router-link v-if="isSuperAdmin" to="/organization" class="hover:text-primary transition-colors">Manajemen Organisasi</router-link>
          <span v-if="isSuperAdmin" class="text-neutral-300">/</span>
          <span class="text-neutral-600 font-bold text-primary">Pengaturan</span>
        </nav>
        <h1 class="text-2xl font-bold text-neutral-900 tracking-tight">Pengaturan Organisasi</h1>
      </div>
    </div>

    <div v-if="loadingOrg" class="flex justify-center p-10">
      <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <div v-else class="flex flex-col gap-6">
      <!-- Tabs -->
      <div v-if="isSuperAdmin" class="flex border-b border-neutral-200">
        <button 
          @click="activeTab = 'nta'"
          class="px-6 py-3 font-semibold text-sm transition-colors border-b-2"
          :class="activeTab === 'nta' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-700'"
        >
          Format NTA
        </button>
        <button 
          @click="activeTab = 'fields'"
          class="px-6 py-3 font-semibold text-sm transition-colors border-b-2"
          :class="activeTab === 'fields' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-700'"
        >
          Formulir Anggota
        </button>
        <button 
          @click="activeTab = 'website'"
          class="px-6 py-3 font-semibold text-sm transition-colors border-b-2"
          :class="activeTab === 'website' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-700'"
        >
          Website Organisasi
        </button>
        <button 
          @click="activeTab = 'products'"
          class="px-6 py-3 font-semibold text-sm transition-colors border-b-2"
          :class="activeTab === 'products' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-700'"
        >
          Produk & Layanan
        </button>
        <button 
          v-if="isSuperAdmin"
          @click="activeTab = 'kta_design'"
          class="px-6 py-3 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap"
          :class="activeTab === 'kta_design' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-700'"
        >
          Desain KTA
        </button>
      </div>

      <!-- Tab Content: NTA Format -->
      <div v-if="activeTab === 'nta'" class="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm max-w-2xl">
        <h3 class="text-lg font-bold text-neutral-900 mb-4">Pengaturan Format NTA</h3>
        <p class="text-sm text-neutral-500 mb-6 leading-relaxed">
          Tentukan format Nomor Tanda Anggota otomatis untuk organisasi ini. <br/>
          Variabel tersedia: <code>[ORG_CODE]</code>, <code>[PROV_CODE]</code>, <code>[REG_CODE]</code>, <code>[DIST_CODE]</code>, <code>[DOB_DDMMYY]</code> (Tanggal Lahir), dan nomor urut berulang seperti <code>[SEQ_2]</code>, <code>[SEQ_4]</code>, <code>[SEQ_6]</code>. <br/>
          <i>Contoh KTP-style: [PROV_CODE][REG_CODE][DOB_DDMMYY][SEQ_4]</i>
        </p>
        <form @submit.prevent="handleSaveNta">
          <BaseInput
            label="Format NTA"
            type="text"
            placeholder="contoh: [ORG_CODE]-[SEQ_6]"
            v-model="orgForm.ntaFormat"
          />
          <div class="mt-4 flex justify-end">
            <BaseButton type="submit" :loading="savingNta">Simpan Format NTA</BaseButton>
          </div>
        </form>
      </div>

      <!-- Tab Content: Formulir Anggota -->
      <div v-if="activeTab === 'fields'" class="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-lg font-bold text-neutral-900">Kolom Tambahan Anggota</h3>
            <p class="text-sm text-neutral-500">
              Sesuaikan kolom isian (field) yang akan muncul saat anggota baru mendaftar di organisasi ini.
            </p>
          </div>
          <BaseButton @click="openFieldModal()">+ Tambah Kolom</BaseButton>
        </div>

        <div v-if="loadingFields" class="flex justify-center p-5">
          <div class="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
        
        <div v-else-if="fields.length === 0" class="text-center py-10 border-2 border-dashed border-neutral-200 rounded-lg">
          <p class="text-neutral-500 font-medium">Belum ada kolom tambahan.</p>
          <p class="text-sm text-neutral-400 mt-1">Klik "Tambah Kolom" untuk membuat formulir dinamis.</p>
        </div>

        <div v-else class="space-y-3">
          <div 
            v-for="(field, idx) in fields" 
            :key="field.id"
            class="flex items-center justify-between p-4 border border-neutral-200 rounded-lg bg-neutral-50 hover:border-primary/30 transition-colors"
          >
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-neutral-400 cursor-move">
                {{ idx + 1 }}
              </div>
              <div>
                <p class="font-bold text-neutral-800">{{ field.fieldLabel }} <span v-if="field.isRequired" class="text-danger">*</span></p>
                <div class="flex gap-2 mt-1">
                  <Badge variant="secondary" :text="field.fieldType" pill />
                  <span class="text-xs text-neutral-500 font-mono bg-neutral-200 px-2 py-0.5 rounded">{{ field.fieldKey }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <BaseButton size="sm" variant="secondary" outline @click="openFieldModal(field)">Ubah</BaseButton>
              <BaseButton size="sm" variant="danger" outline @click="handleDeleteField(field)">Hapus</BaseButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content: Website Organisasi -->
      <div v-if="activeTab === 'website'" class="space-y-6">
        
        <!-- Domain Section -->
        <div class="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900 mb-2">Pengaturan Domain</h3>
          <p class="text-sm text-neutral-500 mb-6">
            Website organisasi secara default dapat diakses melalui subdomain platform (berdasarkan Slug). Anda juga bisa mendaftarkan domain milik Anda sendiri.
          </p>
          <form @submit.prevent="handleSaveWebsite" class="space-y-4 max-w-xl">
            <BaseInput
              label="Custom Domain (Opsional)"
              type="text"
              placeholder="contoh: mastrip.or.id"
              v-model="orgForm.customDomain"
            />
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs font-medium bg-neutral-100 text-neutral-600 px-2 py-1 rounded">Subdomain Aktif:</span>
              <span class="text-xs text-primary font-bold">{{ orgSlug }}.organisasihub.com</span>
            </div>
            
            <hr class="my-4 border-neutral-100"/>
            
            <h4 class="text-md font-bold text-neutral-800 mb-4">Informasi Dasar Website</h4>
            <BaseInput
              label="Nama Website (Site Name)"
              type="text"
              placeholder="contoh: Portal Resmi HIMASI"
              v-model="websiteSettingForm.siteName"
            />
            <BaseInput
              label="Tagline / Slogan"
              type="text"
              placeholder="contoh: Bersama Membangun Negeri"
              v-model="websiteSettingForm.tagline"
            />
            <div class="mt-4">
              <label class="block text-sm font-medium text-neutral-700 mb-1">Deskripsi Singkat (Hero)</label>
              <textarea
                v-model="websiteSettingForm.desc"
                rows="2"
                class="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Deskripsi singkat yang tampil di Hero Section..."
              ></textarea>
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium text-neutral-700 mb-1">Tentang Organisasi</label>
              <textarea
                v-model="websiteSettingForm.about"
                rows="6"
                class="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Deskripsi panjang tentang organisasi Anda..."
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Hero Image (Opsional)</label>
                <UploadFile
                  v-model="websiteSettingForm.heroImageFiles"
                  :maxFiles="1"
                  previewType="image"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">About Image (Opsional)</label>
                <UploadFile
                  v-model="websiteSettingForm.aboutImageFiles"
                  :maxFiles="1"
                  previewType="image"
                />
              </div>
            </div>

            <hr class="my-6 border-neutral-100"/>
            
            <h4 class="text-md font-bold text-neutral-800 mb-4 flex justify-between items-center">
              Statistik Organisasi
              <button type="button" @click="addStat" class="text-xs text-primary font-medium hover:underline">+ Tambah Stat</button>
            </h4>
            <div class="space-y-3">
              <div v-for="(stat, index) in websiteSettingForm.stats" :key="index" class="flex gap-2 items-start">
                <input type="text" v-model="stat.value" placeholder="Angka (ex: 1.240)" class="w-1/3 px-3 py-2 border border-neutral-300 rounded-md sm:text-sm" />
                <input type="text" v-model="stat.label" placeholder="Label (ex: Anggota Aktif)" class="w-2/3 px-3 py-2 border border-neutral-300 rounded-md sm:text-sm" />
                <button type="button" @click="websiteSettingForm.stats.splice(index, 1)" class="text-red-500 hover:text-red-700 p-2">✕</button>
              </div>
              <div v-if="!websiteSettingForm.stats.length" class="text-xs text-neutral-400">Belum ada data statistik.</div>
            </div>

            <hr class="my-6 border-neutral-100"/>
            
            <h4 class="text-md font-bold text-neutral-800 mb-4 flex justify-between items-center">
              Nilai Organisasi (Core Values)
              <button type="button" @click="addCoreValue" class="text-xs text-primary font-medium hover:underline">+ Tambah Nilai</button>
            </h4>
            <div class="space-y-3">
              <div v-for="(cv, index) in websiteSettingForm.coreValues" :key="index" class="flex flex-col gap-2 p-4 border border-neutral-200 rounded-md relative bg-neutral-50">
                <button type="button" @click="websiteSettingForm.coreValues.splice(index, 1)" class="absolute top-2 right-2 text-red-500 hover:text-red-700">✕</button>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="sm:col-span-2">
                    <input type="text" v-model="cv.title" placeholder="Judul (ex: Integritas)" class="w-full px-3 py-2 border border-neutral-300 rounded-md sm:text-sm" />
                  </div>
                  <div>
                    <select v-model="cv.iconId" class="w-full px-3 py-2 border border-neutral-300 rounded-md sm:text-sm">
                      <option value="" disabled>Pilih Icon</option>
                      <option v-for="icon in availableIcons" :key="icon.id" :value="icon.id">{{ icon.label }}</option>
                    </select>
                  </div>
                </div>
                <textarea v-model="cv.desc" placeholder="Deskripsi nilai inti..." rows="2" class="w-full px-3 py-2 border border-neutral-300 rounded-md sm:text-sm"></textarea>
              </div>
              <div v-if="!websiteSettingForm.coreValues.length" class="text-xs text-neutral-400">Belum ada core values.</div>
            </div>

            <hr class="my-6 border-neutral-100"/>
            
            <h4 class="text-md font-bold text-neutral-800 mb-4">Kontak & Sosial Media</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput
                label="Nomor Telepon / WA"
                type="text"
                placeholder="contoh: 08123456789"
                v-model="websiteSettingForm.contactInfo.phone"
              />
              <BaseInput
                label="Email"
                type="email"
                placeholder="contoh: hello@organisasi.com"
                v-model="websiteSettingForm.contactInfo.email"
              />
              <div class="md:col-span-2">
                <BaseInput
                  label="Alamat Lengkap"
                  type="text"
                  placeholder="Jl. Sudirman No. 1, Jakarta"
                  v-model="websiteSettingForm.contactInfo.address"
                />
              </div>
              <BaseInput
                label="Instagram (Username/URL)"
                type="text"
                placeholder="contoh: organisasi_id"
                v-model="websiteSettingForm.socialMedia.instagram"
              />
              <BaseInput
                label="X / Twitter (Username/URL)"
                type="text"
                placeholder="contoh: organisasi_id"
                v-model="websiteSettingForm.socialMedia.twitter"
              />
              <BaseInput
                label="LinkedIn (Username/URL)"
                type="text"
                placeholder="contoh: organisasi-id"
                v-model="websiteSettingForm.socialMedia.linkedin"
              />
            </div>

            <h4 class="text-md font-bold text-neutral-800 mt-6 mb-4">Tema Warna</h4>
            <div class="flex items-center gap-4">
              <label 
                v-for="color in availableColors" 
                :key="color.id" 
                class="cursor-pointer flex flex-col items-center gap-2"
              >
                <div class="relative">
                  <input 
                    type="radio" 
                    name="primaryColor" 
                    :value="color.id" 
                    v-model="websiteSettingForm.primaryColor"
                    class="sr-only"
                  />
                  <div 
                    class="w-10 h-10 rounded-full transition-all flex items-center justify-center border-2 shadow-sm"
                    :class="websiteSettingForm.primaryColor === color.id ? 'border-neutral-800 scale-110' : 'border-transparent hover:scale-105'"
                    :style="{ backgroundColor: color.hex }"
                  >
                    <svg v-if="websiteSettingForm.primaryColor === color.id" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <span class="text-xs font-medium text-neutral-600">{{ color.name }}</span>
              </label>
            </div>

            <div class="pt-6 mt-4 border-t border-neutral-100">
              <BaseButton type="submit" :loading="savingWebsite">Simpan Domain & Tema</BaseButton>
            </div>
          </form>
        </div>

        <!-- Theme Section -->
        <div class="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3 class="text-lg font-bold text-neutral-900">Pilihan Tema Website</h3>
              <p class="text-sm text-neutral-500">Pilih tema visual yang paling cocok dengan identitas organisasi Anda.</p>
            </div>
          </div>
          
          <div v-if="loadingThemes" class="flex justify-center p-10">
            <div class="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="theme in themes" 
              :key="theme.id"
              @click="selectTheme(theme.id)"
              class="relative border-2 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-md"
              :class="orgForm.themeId === theme.id ? 'border-primary ring-2 ring-primary/20 ring-offset-2' : 'border-neutral-200 hover:border-primary/50'"
            >
              <div v-if="orgForm.themeId === theme.id" class="absolute top-3 right-3 z-10 bg-primary text-white rounded-full p-1 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <img :src="theme.thumbnail || 'https://placehold.co/600x400/f3f4f6/a1a1aa?text=No+Preview'" :alt="theme.name" class="w-full h-40 object-cover border-b border-neutral-100" />
              <div class="p-4 bg-white">
                <h4 class="font-bold text-neutral-900">{{ theme.name }}</h4>
                <p class="text-xs text-neutral-500 mt-1 line-clamp-2">{{ theme.description }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Tab Content: Produk & Layanan -->
      <div v-if="activeTab === 'products'" class="space-y-6">
        <div class="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3 class="text-lg font-bold text-neutral-900">Produk & Layanan Cabang</h3>
              <p class="text-sm text-neutral-500">Pilih produk mana saja yang ingin Anda aktifkan untuk anggota, dan atur harganya.</p>
            </div>
            <BaseButton @click="handleSaveProducts" :loading="savingProducts">Simpan Produk</BaseButton>
          </div>

          <div v-if="loadingProducts" class="flex justify-center p-10">
            <div class="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(prod, index) in products" :key="prod.productId" class="border border-neutral-200 rounded-xl p-4 flex flex-col justify-between" :class="prod.isActive ? 'bg-primary/5 border-primary/20' : 'bg-white'">
              <div>
                <div class="flex items-start justify-between mb-2">
                  <h5 class="font-bold text-neutral-800">{{ prod.name }}</h5>
                  <label class="flex items-center cursor-pointer">
                    <div class="relative">
                      <input type="checkbox" v-model="prod.isActive" class="sr-only" />
                      <div class="block w-10 h-6 rounded-full transition-colors" :class="prod.isActive ? 'bg-primary' : 'bg-neutral-300'"></div>
                      <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" :class="prod.isActive ? 'transform translate-x-4' : ''"></div>
                    </div>
                  </label>
                </div>
                <p class="text-xs text-neutral-500 mb-3">{{ prod.description || 'Tidak ada deskripsi' }}</p>
              </div>
              <div class="pt-3 border-t border-neutral-100 mt-auto">
                <span class="text-xs text-neutral-500 block mb-0.5">Harga Pengguna</span>
                <p class="font-bold text-primary text-lg">Rp {{ Number(prod.defaultPrice || 0).toLocaleString('id-ID') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content: Desain KTA -->
      <div v-if="activeTab === 'kta_design'" class="space-y-6">
        <KtaDesigner :orgId="orgForm.id" :initialTemplate="orgForm.ktaTemplate" @saved="handleKtaTemplateSaved" />
      </div>
    </div>

    <!-- Modal Form Field -->
    <Modal
      :showModal="showFieldModal"
      @closeModal="closeFieldModal"
      :isBorder="true"
      classWidth="max-w-md"
    >
      <template #header>
        <p class="text-xl font-bold text-neutral-900">{{ editingField ? 'Ubah Kolom' : 'Tambah Kolom Baru' }}</p>
      </template>
      <template #body>
        <form @submit.prevent="handleSaveField">
          <div class="space-y-4">
            <BaseInput
              label="Label Kolom"
              type="text"
              placeholder="contoh: Asal Kampus"
              v-model="fieldForm.fieldLabel"
              required
            />
            
            <div>
              <label class="text-sm font-semibold text-neutral-800 mb-1 block">Tipe Input</label>
              <SingleSelect
                placeholder="Pilih Tipe"
                :list="refFieldTypes"
                :selectedItem="selectedFieldType"
                :searchable="false"
                @update:selected="handleFieldTypeChange"
                labelKey="label"
              />
            </div>

            <BaseInput
              label="Placeholder (Opsional)"
              type="text"
              placeholder="contoh: Masukkan nama kampus..."
              v-model="fieldForm.placeholder"
            />

            <!-- Opsi untuk Tipe Select -->
            <div v-if="fieldForm.fieldType === 'SELECT'" class="p-4 border border-blue-100 bg-blue-50 rounded-lg">
              <label class="text-sm font-semibold text-blue-900 mb-1 block">Pilihan Dropdown (pisahkan dengan koma)</label>
              <textarea
                class="w-full text-sm p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="3"
                placeholder="Opsi A, Opsi B, Opsi C"
                v-model="fieldForm.optionsString"
              ></textarea>
            </div>

            <div class="flex items-center gap-2 mt-2">
              <input type="checkbox" id="isRequired" v-model="fieldForm.isRequired" class="w-4 h-4 text-primary rounded border-neutral-300">
              <label for="isRequired" class="text-sm font-medium text-neutral-700">Wajib Diisi (Required)</label>
            </div>
          </div>

          <div class="flex justify-end mt-7 items-center gap-3">
            <BaseButton variant="primary" outline type="button" @click="closeFieldModal" :disabled="savingField">Batal</BaseButton>
            <BaseButton type="submit" :loading="savingField">Simpan</BaseButton>
          </div>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import BaseInput from "@/components/Basics/BaseInput.vue";
import BaseButton from "@/components/Basics/BaseButton.vue";
import Badge from "@/components/Basics/Badge.vue";
import Modal from "@/components/Basics/Modal.vue";
import SingleSelect from "@/components/Basics/SingleSelect.vue";
import UploadFile from "@/components/Basics/UploadFile.vue";
import KtaDesigner from "../Components/KtaDesigner.vue";
import { openModalInfo, openModalConfirm, handleConfirm } from "@/extends/plugins/modal";
import { useAuthStore } from "@/stores/AuthStore";
import { useProfileStore } from "@/stores/ProfileStore";

const route = useRoute();
const authStore = useAuthStore();
const profileStore = useProfileStore();

const orgId = computed(() => {
  const rawRouteId = route.params.id;
  if (rawRouteId && rawRouteId !== 'undefined') return rawRouteId;
  return profileStore.user?.organizationId;
});

const isSuperAdmin = computed(() => profileStore.user?.role === 'SUPER_ADMIN');

const activeTab = ref(isSuperAdmin.value ? "nta" : "website");
const loadingOrg = ref(true);
const savingNta = ref(false);
const savingWebsite = ref(false);

const orgSlug = ref("");

const orgForm = ref({
  id: orgId.value,
  ntaFormat: "",
  customDomain: "",
  themeId: null,
  ktaTemplate: null,
});

const websiteSettingForm = ref({
  siteName: "",
  tagline: "",
  desc: "",
  about: "",
  heroImage: "",
  aboutImage: "",
  heroImageFiles: [],
  aboutImageFiles: [],
  primaryColor: "theme-default",
  stats: [],
  coreValues: [],
  contactInfo: { phone: "", email: "", address: "" },
  socialMedia: { instagram: "", twitter: "", linkedin: "" },
});

const availableIcons = ref([
  { id: 'target', label: 'Target / Misi', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' },
  { id: 'heart', label: 'Hati / Peduli', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>' },
  { id: 'users', label: 'Users / Kolaborasi', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>' },
  { id: 'lightbulb', label: 'Lampu / Inovasi', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>' },
  { id: 'shield', label: 'Perisai / Integritas', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>' },
  { id: 'star', label: 'Bintang / Kualitas', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>' },
  { id: 'globe', label: 'Global / Jangkauan', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>' },
  { id: 'book', label: 'Buku / Pengetahuan', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>' },
  { id: 'chart', label: 'Grafik / Progres', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>' },
  { id: 'award', label: 'Medali / Prestasi', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>' },
  { id: 'eye', label: 'Mata / Visi', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>' },
  { id: 'handshake', label: 'Kerjasama / Kemitraan', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>' },
  { id: 'clock', label: 'Waktu / Efisiensi', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' },
  { id: 'zap', label: 'Petir / Kecepatan', svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' }
]);

const addStat = () => websiteSettingForm.value.stats.push({ value: '', label: '' });
const addCoreValue = () => websiteSettingForm.value.coreValues.push({ title: '', desc: '', iconId: 'target', icon: '' });

const availableColors = ref([
  { id: "theme-default", name: "Default (Biru)", hex: "#2563eb" },
  { id: "theme-emerald", name: "Emerald", hex: "#10b981" },
  { id: "theme-orange", name: "Orange", hex: "#f97316" },
  { id: "theme-purple", name: "Purple", hex: "#8b5cf6" },
  { id: "theme-red", name: "Merah", hex: "#ef4444" },
  { id: "theme-teal", name: "Teal", hex: "#14b8a6" },
  { id: "theme-cyan", name: "Cyan", hex: "#06b6d4" },
  { id: "theme-rose", name: "Rose", hex: "#f43f5e" },
  { id: "theme-slate", name: "Slate", hex: "#64748b" },
  { id: "theme-amber", name: "Amber", hex: "#f59e0b" },
]);

// Fields State
const fields = ref([]);
const loadingFields = ref(false);
const showFieldModal = ref(false);
const savingField = ref(false);
const editingField = ref(null);

// Themes State
const themes = ref([]);
const loadingThemes = ref(false);

// Products State
const products = ref([]);
const loadingProducts = ref(false);
const savingProducts = ref(false);

const refFieldTypes = ref([
  { id: "TEXT", label: "Teks Pendek" },
  { id: "TEXTAREA", label: "Teks Panjang (Textarea)" },
  { id: "NUMBER", label: "Angka" },
  { id: "DATE", label: "Tanggal" },
  { id: "SELECT", label: "Pilihan Ganda (Dropdown)" },
  { id: "FILE", label: "Upload File (PDF / Gambar)" },
]);

const selectedFieldType = computed(() => {
  return refFieldTypes.value.find(t => t.id === fieldForm.value.fieldType) || null;
});

const fieldForm = ref({
  fieldLabel: "",
  fieldType: "TEXT",
  placeholder: "",
  isRequired: false,
  optionsString: "",
});

const getOrganization = async () => {
  if (!orgId.value || orgId.value === "undefined") {
    loadingOrg.value = false;
    return;
  }
  try {
    loadingOrg.value = true;
    let res = await axios.get(`/api/organizations/${orgId.value}`);
    const data = res.data?.data || res.data;
    orgForm.value.id = orgId.value;
    orgForm.value.ntaFormat = data.ntaFormat || "";
    orgForm.value.customDomain = data.customDomain || "";
    orgForm.value.themeId = data.themeId || null;
    orgForm.value.ktaTemplate = data.ktaTemplate || null;
    orgSlug.value = data.slug || "";
    
    if (data.websiteSetting) {
      websiteSettingForm.value.siteName = data.websiteSetting.siteName || "";
      websiteSettingForm.value.tagline = data.websiteSetting.tagline || "";
      websiteSettingForm.value.desc = data.websiteSetting.metaDescription || "";
      websiteSettingForm.value.about = data.websiteSetting.about || "";
      websiteSettingForm.value.heroImage = data.websiteSetting.heroImage || "";
      websiteSettingForm.value.aboutImage = data.websiteSetting.aboutImage || "";
      websiteSettingForm.value.heroImageFiles = data.websiteSetting.heroImage ? [data.websiteSetting.heroImage] : [];
      websiteSettingForm.value.aboutImageFiles = data.websiteSetting.aboutImage ? [data.websiteSetting.aboutImage] : [];
      websiteSettingForm.value.primaryColor = data.websiteSetting.primaryColor || "theme-default";
      websiteSettingForm.value.stats = data.websiteSetting.stats || [];
      websiteSettingForm.value.coreValues = data.websiteSetting.coreValues || [];
      if (data.websiteSetting.contactInfo) {
        websiteSettingForm.value.contactInfo = { ...websiteSettingForm.value.contactInfo, ...data.websiteSetting.contactInfo };
      }
      if (data.websiteSetting.socialMedia) {
        websiteSettingForm.value.socialMedia = { ...websiteSettingForm.value.socialMedia, ...data.websiteSetting.socialMedia };
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    loadingOrg.value = false;
  }
};

const handleSaveNta = async () => {
  try {
    savingNta.value = true;
    await axios.patch(`/api/organizations/${orgId.value}`, {
      ntaFormat: orgForm.value.ntaFormat
    });
    openModalInfo({ message: "Format NTA berhasil disimpan", type: "success" });
  } catch (e) {
    console.error(e);
    openModalInfo({ message: "Gagal menyimpan Format NTA", type: "error" });
  } finally {
    savingNta.value = false;
  }
};

const handleSaveWebsite = async () => {
  try {
    savingWebsite.value = true;
    
    // Save Domain in Organizations
    await axios.patch(`/api/organizations/${orgId.value}`, {
      customDomain: orgForm.value.customDomain || null,
    });

    // Inject actual SVG into coreValues based on iconId before saving
    const finalCoreValues = websiteSettingForm.value.coreValues.map(cv => {
      const selectedIcon = availableIcons.value.find(i => i.id === cv.iconId);
      return { ...cv, icon: selectedIcon ? selectedIcon.svg : '' };
    });

    // Handle Uploads
    let finalHeroImage = websiteSettingForm.value.heroImage;
    if (websiteSettingForm.value.heroImageFiles.length > 0) {
      const hFile = websiteSettingForm.value.heroImageFiles[0];
      if (hFile instanceof File) {
        let fd = new FormData();
        fd.append('file', hFile);
        fd.append('folder', 'organizations');
        const uploadRes = await axios.post('/api/uploads', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
        finalHeroImage = uploadRes.data?.data?.url || uploadRes.data?.url;
      } else {
        finalHeroImage = typeof hFile === 'string' ? hFile : hFile.url || finalHeroImage;
      }
    } else {
      finalHeroImage = "";
    }

    let finalAboutImage = websiteSettingForm.value.aboutImage;
    if (websiteSettingForm.value.aboutImageFiles.length > 0) {
      const aFile = websiteSettingForm.value.aboutImageFiles[0];
      if (aFile instanceof File) {
        let fd = new FormData();
        fd.append('file', aFile);
        fd.append('folder', 'organizations');
        const uploadRes = await axios.post('/api/uploads', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
        finalAboutImage = uploadRes.data?.data?.url || uploadRes.data?.url;
      } else {
        finalAboutImage = typeof aFile === 'string' ? aFile : aFile.url || finalAboutImage;
      }
    } else {
      finalAboutImage = "";
    }

    // Save Theme & Website Settings in WebsiteSettings API
    const endpoint = isSuperAdmin.value 
      ? `/api/website-settings/${orgId.value}` 
      : `/api/website-settings/my-org`;

    await axios.put(endpoint, {
      themeId: orgForm.value.themeId || null,
      siteName: websiteSettingForm.value.siteName,
      tagline: websiteSettingForm.value.tagline,
      metaDescription: websiteSettingForm.value.desc,
      about: websiteSettingForm.value.about,
      heroImage: finalHeroImage,
      aboutImage: finalAboutImage,
      primaryColor: websiteSettingForm.value.primaryColor,
      stats: websiteSettingForm.value.stats,
      coreValues: finalCoreValues,
      contactInfo: websiteSettingForm.value.contactInfo,
      socialMedia: websiteSettingForm.value.socialMedia,
    });

    openModalInfo({ message: "Pengaturan Website berhasil disimpan", type: "success" });
  } catch (e) {
    console.error(e);
    let errorMsg = "Gagal menyimpan pengaturan website";
    if (e.response?.status === 409) {
      errorMsg = e.response.data?.message || "Domain tersebut sudah digunakan oleh organisasi lain.";
    }
    openModalInfo({ message: errorMsg, type: "error" });
  } finally {
    savingWebsite.value = false;
  }
};

const getFields = async () => {
  if (!orgId.value || orgId.value === "undefined") return;
  try {
    loadingFields.value = true;
    let res = await axios.get(`/api/organizations/${orgId.value}/field-configs`);
    fields.value = res.data?.data || res.data || [];
  } catch (e) {
    console.error(e);
  } finally {
    loadingFields.value = false;
  }
};

const getThemes = async () => {
  try {
    loadingThemes.value = true;
    let res = await axios.get(`/api/website-themes`);
    themes.value = res.data?.data || res.data || [];
  } catch (e) {
    console.error(e);
  } finally {
    loadingThemes.value = false;
  }
};

const selectTheme = (themeId) => {
  orgForm.value.themeId = themeId;
  handleSaveWebsite(); // Auto-save when theme selected
};

const getProducts = async () => {
  if (!orgId.value || orgId.value === "undefined") return;
  try {
    loadingProducts.value = true;
    let res = await axios.get(`/api/organizations/${orgId.value}/products`);
    const pricings = res.data?.data || res.data;
    if (Array.isArray(pricings)) {
      products.value = pricings.map(p => ({
        productId: p.productId,
        name: p.product?.name || 'Produk',
        defaultPrice: p.product?.defaultPrice || 0,
        description: p.product?.description || '',
        isActive: p.isActive,
      }));
    }
  } catch (e) {
    console.error("Gagal mengambil produk", e);
  } finally {
    loadingProducts.value = false;
  }
};

const handleSaveProducts = async () => {
  try {
    savingProducts.value = true;
    const payload = {
      products: products.value.map(p => ({
        productId: p.productId,
        customPrice: p.defaultPrice,
        isActive: p.isActive,
      }))
    };
    await axios.patch(`/api/organizations/${orgId.value}/products`, payload);
    openModalInfo({ message: "Produk & Layanan berhasil disimpan", type: "success" });
  } catch (e) {
    console.error(e);
    openModalInfo({ message: "Gagal menyimpan Produk", type: "error" });
  } finally {
    savingProducts.value = false;
  }
};

const handleFieldTypeChange = (selected) => {
  if (selected) {
    fieldForm.value.fieldType = selected.id;
  }
};

const openFieldModal = (field = null) => {
  if (field) {
    editingField.value = field;
    fieldForm.value = {
      fieldLabel: field.fieldLabel,
      fieldType: field.fieldType,
      placeholder: field.placeholder || "",
      isRequired: field.isRequired,
      optionsString: field.options ? field.options.join(", ") : "",
    };
  } else {
    editingField.value = null;
    fieldForm.value = {
      fieldLabel: "",
      fieldType: "TEXT",
      placeholder: "",
      isRequired: false,
      optionsString: "",
    };
  }
  showFieldModal.value = true;
};

const closeFieldModal = () => {
  showFieldModal.value = false;
  editingField.value = null;
};

const handleSaveField = async () => {
  try {
    savingField.value = true;
    const payload = {
      fieldLabel: fieldForm.value.fieldLabel,
      fieldType: fieldForm.value.fieldType,
      placeholder: fieldForm.value.placeholder,
      isRequired: fieldForm.value.isRequired,
      options: fieldForm.value.fieldType === "SELECT" && fieldForm.value.optionsString
        ? fieldForm.value.optionsString.split(",").map(s => s.trim())
        : null,
    };
    
    if (editingField.value) {
      await axios.patch(`/api/organizations/${orgId.value}/field-configs/${editingField.value.id}`, payload);
      openModalInfo({ message: "Kolom berhasil diperbarui", type: "success" });
    } else {
      await axios.post(`/api/organizations/${orgId.value}/field-configs`, payload);
      openModalInfo({ message: "Kolom berhasil ditambahkan", type: "success" });
    }
    
    closeFieldModal();
    getFields();
  } catch (e) {
    console.error(e);
    openModalInfo({ message: "Gagal menyimpan kolom", type: "error" });
  } finally {
    savingField.value = false;
  }
};

const handleDeleteField = (field) => {
  openModalConfirm({
    message: `Hapus kolom "${field.fieldLabel}"? Data anggota lama mungkin tetap menyimpannya, tapi kolom ini akan hilang dari form baru.`,
    type: "delete",
    confirmButtonText: "Hapus",
  });
  handleConfirm(async () => {
    try {
      await axios.delete(`/api/organizations/${orgId.value}/field-configs/${field.id}`);
      openModalInfo({ message: "Kolom berhasil dihapus", type: "success" });
      getFields();
    } catch (e) {
      openModalInfo({ message: "Gagal menghapus kolom", type: "error" });
    }
  });
};

const handleKtaTemplateSaved = (newTemplate) => {
  orgForm.value.ktaTemplate = newTemplate;
};

// Auto fetch when orgId is available
watch(orgId, (newVal) => {
  if (newVal && newVal !== "undefined") {
    getOrganization();
    getFields();
    getProducts();
  }
}, { immediate: true });

onMounted(() => {
  getThemes();
});
</script>
