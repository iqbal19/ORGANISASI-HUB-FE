<template>
  <div class="flex flex-col gap-6 max-w-4xl mx-auto w-full pb-24">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <nav class="flex text-xs font-semibold text-neutral-400 mb-2 gap-2 items-center">
          <router-link to="/beranda" class="hover:text-primary transition-colors">Beranda</router-link>
          <span class="text-neutral-300">/</span>
          <router-link to="/members" class="hover:text-primary transition-colors">Manajemen Anggota</router-link>
          <span class="text-neutral-300">/</span>
          <span class="text-neutral-600 font-bold text-primary">{{ isEdit ? 'Ubah' : 'Tambah' }} Anggota</span>
        </nav>
        <h1 class="text-2xl font-bold text-neutral-900 tracking-tight">
          {{ isEdit ? 'Ubah Profil Anggota' : 'Registrasi Anggota Baru' }}
        </h1>
        <p class="text-sm text-neutral-500 mt-1">
          Ikuti langkah-langkah di bawah ini untuk melengkapi data anggota.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton type="button" variant="secondary" outline @click="goBack">
          <IconArrowLeft class="w-4 h-4 mr-2" /> Batal
        </BaseButton>
      </div>
    </div>

    <!-- Stepper Indicator -->
    <div class="bg-white border border-neutral-200 rounded-xl shadow-sm p-3 md:p-4 mb-2">
      <div class="flex items-center justify-between relative">
        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-neutral-100 rounded-full z-0"></div>
        <div 
          class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-300"
          :style="`width: ${((currentStep - 1) / 2) * 100}%`"
        ></div>

        <!-- Step 1 -->
        <div class="relative z-10 flex flex-col items-center gap-1 bg-white px-2">
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300"
            :class="currentStep >= 1 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-neutral-100 text-neutral-400 border-2 border-neutral-200'"
          >
            1
          </div>
          <span class="text-[10px] font-semibold" :class="currentStep >= 1 ? 'text-primary' : 'text-neutral-400'">Penempatan</span>
        </div>

        <!-- Step 2 -->
        <div class="relative z-10 flex flex-col items-center gap-1 bg-white px-2">
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300"
            :class="currentStep >= 2 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-neutral-100 text-neutral-400 border-2 border-neutral-200'"
          >
            2
          </div>
          <span class="text-[10px] font-semibold" :class="currentStep >= 2 ? 'text-primary' : 'text-neutral-400'">Data Utama</span>
        </div>

        <!-- Step 3 -->
        <div class="relative z-10 flex flex-col items-center gap-1 bg-white px-2">
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300"
            :class="currentStep >= 3 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-neutral-100 text-neutral-400 border-2 border-neutral-200'"
          >
            3
          </div>
          <span class="text-[10px] font-semibold" :class="currentStep >= 3 ? 'text-primary' : 'text-neutral-400'">Tambahan</span>
        </div>
      </div>
    </div>

    <!-- Main Form Content -->
    <form @submit.prevent="submitForm" class="flex flex-col gap-6">
      
      <!-- STEP 1: TINGKAT KEPENGURUSAN & WILAYAH -->
      <div v-show="currentStep === 1" class="flex flex-col gap-6 animate-fade-in">
        <div class="bg-white border border-neutral-200 rounded-xl shadow-sm">
          <div class="bg-neutral-50 border-b border-neutral-100 px-6 py-4 flex items-center gap-3 rounded-t-xl">
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <IconHierarchy class="w-5 h-5" />
            </div>
            <div>
              <h2 class="text-sm font-bold text-neutral-900">Penempatan & Tingkat Kepengurusan</h2>
              <p class="text-xs text-neutral-500">Tentukan hierarki dan wilayah operasional anggota.</p>
            </div>
          </div>
          
          <div class="p-6 flex flex-col gap-6">
            <!-- Pilihan Organisasi (Khusus SUPER_ADMIN) -->
            <div v-if="isSuperAdmin && !isEdit" class="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-col gap-2">
              <label class="font-bold text-sm text-amber-800">Organisasi Induk (Super Admin Only)</label>
              <SingleSelect
                :list="organizations"
                :selectedItem="selectedOrganization"
                @update:selected="onOrganizationSelected"
                labelKey="name"
                :searchable="true"
              />
            </div>

            <!-- Pilihan Level -->
            <div v-if="profileStore.user?.role !== 'ADMIN_RANTING'" class="grid grid-cols-1 sm:grid-cols-2 gap-3" :class="{
              'md:grid-cols-4': ['SUPER_ADMIN', 'ADMIN_PUSAT'].includes(profileStore.user?.role),
              'md:grid-cols-3': profileStore.user?.role === 'ADMIN_DAERAH',
              'md:grid-cols-2': profileStore.user?.role === 'ADMIN_CABANG'
            }">
              <!-- Level Options -->
              <label 
                v-if="['SUPER_ADMIN', 'ADMIN_PUSAT'].includes(profileStore.user?.role)"
                class="relative border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-primary/5 flex items-center gap-3"
                :class="form.level === 'PUSAT' ? 'border-primary bg-primary/5 shadow-sm shadow-primary/10' : 'border-neutral-200 bg-white'"
              >
                <input type="radio" v-model="form.level" value="PUSAT" class="sr-only" />
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0" :class="form.level === 'PUSAT' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-500'">
                  <IconBuildingMonument class="w-4 h-4" />
                </div>
                <div class="text-left">
                  <div class="font-bold text-sm text-neutral-800 leading-tight">Pusat</div>
                  <div class="text-[10px] text-neutral-500 leading-tight">Tingkat Nasional</div>
                </div>
              </label>

              <label 
                v-if="['SUPER_ADMIN', 'ADMIN_PUSAT', 'ADMIN_DAERAH'].includes(profileStore.user?.role)"
                class="relative border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-primary/5 flex items-center gap-3"
                :class="form.level === 'DAERAH' ? 'border-primary bg-primary/5 shadow-sm shadow-primary/10' : 'border-neutral-200 bg-white'"
              >
                <input type="radio" v-model="form.level" value="DAERAH" class="sr-only" />
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0" :class="form.level === 'DAERAH' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-500'">
                  <IconMap class="w-4 h-4" />
                </div>
                <div class="text-left">
                  <div class="font-bold text-sm text-neutral-800 leading-tight">Daerah</div>
                  <div class="text-[10px] text-neutral-500 leading-tight">Tingkat Provinsi</div>
                </div>
              </label>

              <label 
                v-if="['SUPER_ADMIN', 'ADMIN_PUSAT', 'ADMIN_DAERAH', 'ADMIN_CABANG'].includes(profileStore.user?.role)"
                class="relative border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-primary/5 flex items-center gap-3"
                :class="form.level === 'CABANG' ? 'border-primary bg-primary/5 shadow-sm shadow-primary/10' : 'border-neutral-200 bg-white'"
              >
                <input type="radio" v-model="form.level" value="CABANG" class="sr-only" />
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0" :class="form.level === 'CABANG' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-500'">
                  <IconBuildingCommunity class="w-4 h-4" />
                </div>
                <div class="text-left">
                  <div class="font-bold text-sm text-neutral-800 leading-tight">Cabang</div>
                  <div class="text-[10px] text-neutral-500 leading-tight">Kabupaten/Kota</div>
                </div>
              </label>

              <label 
                v-if="['SUPER_ADMIN', 'ADMIN_PUSAT', 'ADMIN_DAERAH', 'ADMIN_CABANG', 'ADMIN_RANTING', 'OPERATOR'].includes(profileStore.user?.role)"
                class="relative border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-primary/5 flex items-center gap-3"
                :class="form.level === 'RANTING' ? 'border-primary bg-primary/5 shadow-sm shadow-primary/10' : 'border-neutral-200 bg-white'"
              >
                <input type="radio" v-model="form.level" value="RANTING" class="sr-only" />
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0" :class="form.level === 'RANTING' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-500'">
                  <IconHomeRibbon class="w-4 h-4" />
                </div>
                <div class="text-left">
                  <div class="font-bold text-sm text-neutral-800 leading-tight">Ranting</div>
                  <div class="text-[10px] text-neutral-500 leading-tight">Kecamatan/Desa</div>
                </div>
              </label>
            </div>

            <hr v-if="form.level && form.level !== 'PUSAT'" class="border-neutral-200 border-dashed" />

            <!-- Pilihan Wilayah (Ditampilkan Berdasarkan Level) -->
            <div v-if="form.level && form.level !== 'PUSAT'" class="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
              <!-- Provinsi -->
              <div class="relative">
                <label class="block text-sm font-semibold text-neutral-800 mb-1">Provinsi <span class="text-red-500">*</span></label>
                <SingleSelect
                  :list="provinces"
                  :selectedItem="selectedProvince"
                  @update:selected="onProvinceSelected"
                  labelKey="name"
                  :searchable="true"
                  :dropUp="true"
                  :disabled="isProvinceLocked"
                />
              </div>

              <!-- Kabupaten (Hanya muncul jika Cabang/Ranting) -->
              <div v-if="['CABANG', 'RANTING'].includes(form.level)" class="relative">
                <label class="block text-sm font-semibold text-neutral-800 mb-1">Kabupaten/Kota <span class="text-red-500">*</span></label>
                <SingleSelect
                  :list="regencies"
                  :selectedItem="selectedRegency"
                  @update:selected="onRegencySelected"
                  labelKey="name"
                  :searchable="true"
                  :dropUp="true"
                  :disabled="isRegencyLocked"
                />
              </div>

              <!-- Kecamatan (Hanya muncul jika Ranting) -->
              <div v-if="['RANTING'].includes(form.level)" class="relative">
                <label class="block text-sm font-semibold text-neutral-800 mb-1">Kecamatan <span class="text-red-500">*</span></label>
                <SingleSelect
                  :list="districts"
                  :selectedItem="selectedDistrict"
                  @update:selected="onDistrictSelected"
                  labelKey="name"
                  :searchable="true"
                  :dropUp="true"
                  :disabled="isDistrictLocked"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 2: DATA UTAMA -->
      <div v-show="currentStep === 2" class="flex flex-col gap-6 animate-fade-in">
        <div class="bg-white border border-neutral-200 rounded-xl shadow-sm">
          <div class="bg-neutral-50 border-b border-neutral-100 px-6 py-4 flex items-center gap-3 rounded-t-xl">
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <IconUser class="w-5 h-5" />
            </div>
            <div>
              <h2 class="text-sm font-bold text-neutral-900">Data Utama Anggota</h2>
              <p class="text-xs text-neutral-500">Lengkapi identitas, kontak, alamat, dan foto profil.</p>
            </div>
          </div>
          
          <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput
              label="Nama Lengkap *"
              type="text"
              placeholder="Masukkan nama lengkap sesuai KTP"
              v-model="form.name"
              :error="errors.name"
            />

            <div class="relative">
              <label class="block text-sm font-semibold text-neutral-800 mb-1">Jabatan <span class="text-red-500">*</span></label>
              <SingleSelect
                :list="positions"
                :selectedItem="selectedPosition"
                placeholder="Pilih Jabatan"
                labelKey="name"
                @onSelect="form.positionId = $event.id; selectedPosition = $event"
              />
              <small v-if="errors.positionId" class="text-xs text-red-500 font-medium">{{ errors.positionId }}</small>
            </div>


            <div class="grid grid-cols-2 gap-4">
              <BaseInput
                label="Tempat Lahir *"
                type="text"
                placeholder="Kota kelahiran"
                v-model="form.birthPlace"
                :error="errors.birthPlace"
              />
              <BaseInput
                label="Tanggal Lahir *"
                type="date"
                v-model="form.birthDate"
                :error="errors.birthDate"
              />
            </div>
            
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-neutral-800">Jenis Kelamin <span class="text-red-500">*</span></label>
              <div class="flex gap-4 items-center h-[42px]">
                <label class="flex items-center gap-2 cursor-pointer text-sm text-neutral-700 hover:text-primary transition-colors">
                  <input type="radio" v-model="form.gender" value="MALE" class="w-4 h-4 text-primary border-neutral-300 focus:ring-primary cursor-pointer" />
                  Laki-laki
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-sm text-neutral-700 hover:text-primary transition-colors">
                  <input type="radio" v-model="form.gender" value="FEMALE" class="w-4 h-4 text-primary border-neutral-300 focus:ring-primary cursor-pointer" />
                  Perempuan
                </label>
              </div>
              <small v-if="errors.gender" class="text-xs text-red-500 font-medium">{{ errors.gender }}</small>
            </div>

            <BaseInput
              label="Alamat Email"
              type="email"
              placeholder="contoh: budi@gmail.com"
              v-model="form.email"
              :error="errors.email"
            />
            
            <BaseInput
              label="Nomor Telepon / WhatsApp *"
              type="text"
              placeholder="contoh: 08123456789"
              v-model="form.phone"
              :error="errors.phone"
            />
            
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-neutral-800 mb-1">Alamat Lengkap <span class="text-red-500">*</span></label>
              <textarea
                v-model="form.address"
                rows="2"
                class="w-full text-sm px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.address }"
                placeholder="Masukkan alamat domisili (Jalan, RT/RW, dsb)"
              ></textarea>
              <small v-if="errors.address" class="text-xs text-red-500 font-medium mt-1">{{ errors.address }}</small>
            </div>

            <div class="md:col-span-2 mt-2">
              <label class="block text-sm font-semibold text-neutral-800 mb-2">Foto Profil <span class="text-red-500">*</span></label>
              <UploadFile
                v-model="form.photo"
                :maxFiles="1"
                :maxSize="2000000"
                formatFile=".jpg,.jpeg,.png"
                previewType="image"
              />
              <p class="text-[10px] text-neutral-500 mt-1">Maksimal ukuran 2MB. Format JPG, PNG.</p>
              <small v-if="errors.photo" class="text-xs text-red-500 font-medium mt-1 block">{{ errors.photo }}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 3: DATA TAMBAHAN -->
      <div v-show="currentStep === 3" class="flex flex-col gap-6 animate-fade-in">
        <div class="bg-white border border-neutral-200 rounded-xl shadow-sm">
          <div class="bg-neutral-50 border-b border-neutral-100 px-6 py-4 flex items-center gap-3 rounded-t-xl">
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <IconClipboardList class="w-5 h-5" />
            </div>
            <div>
              <h2 class="text-sm font-bold text-neutral-900">Data Spesifik Organisasi</h2>
              <p class="text-xs text-neutral-500">Lengkapi data tambahan yang disyaratkan oleh pengurus pusat.</p>
            </div>
          </div>
          
          <div v-if="fieldConfigs.length === 0" class="p-12 flex flex-col items-center justify-center text-center">
            <div class="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-300 mb-4">
              <IconClipboardList class="w-8 h-8" />
            </div>
            <h3 class="text-neutral-700 font-semibold mb-1">Tidak Ada Form Tambahan</h3>
            <p class="text-xs text-neutral-500 max-w-sm">Organisasi ini belum mengatur isian form tambahan untuk anggotanya.</p>
          </div>

          <div v-else class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div v-for="field in fieldConfigs" :key="field.id">
              <template v-if="field.fieldType === 'TEXT' || field.fieldType === 'NUMBER' || field.fieldType === 'DATE'">
                <BaseInput
                  :label="field.fieldLabel + (field.isRequired ? ' *' : '')"
                  :type="field.fieldType.toLowerCase()"
                  :placeholder="field.placeholder || ''"
                  v-model="dynamicFields[field.id]"
                />
              </template>
              <template v-else-if="field.fieldType === 'SELECT'">
                <label class="block text-sm font-semibold text-neutral-800 mb-1">
                  {{ field.fieldLabel }} <span v-if="field.isRequired" class="text-red-500">*</span>
                </label>
                <SingleSelect
                  :list="field.options.map(opt => ({ id: opt, label: opt }))"
                  :selectedItem="dynamicFields[field.id] ? { id: dynamicFields[field.id], label: dynamicFields[field.id] } : null"
                  @update:selected="val => dynamicFields[field.id] = val ? val.id : ''"
                  labelKey="label"
                />
              </template>
              <template v-else-if="field.fieldType === 'BOOLEAN'">
                <div class="flex flex-col gap-1 mt-2">
                  <label class="block text-sm font-semibold text-neutral-800 mb-1">
                    {{ field.fieldLabel }} <span v-if="field.isRequired" class="text-red-500">*</span>
                  </label>
                  <ToggleSwitch
                    :modelValue="dynamicFields[field.id] === 'true' || dynamicFields[field.id] === true"
                    @update:modelValue="val => dynamicFields[field.id] = String(val)"
                    label="Ya"
                  />
                </div>
              </template>
              <template v-else-if="field.fieldType === 'FILE'">
                <div class="flex flex-col gap-1 mt-2">
                  <label class="block text-sm font-semibold text-neutral-800 mb-1">
                    {{ field.fieldLabel }} <span v-if="field.isRequired" class="text-red-500">*</span>
                  </label>
                  <UploadFile
                    v-model="dynamicFields[field.id]"
                    :maxFiles="1"
                    :maxSize="5000000"
                    formatFile=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    previewType="list"
                  />
                  <p class="text-[10px] text-neutral-500 mt-1">Maksimal ukuran 5MB.</p>
                </div>
              </template>
              <template v-else>
                 <BaseInput
                  :label="field.fieldLabel"
                  type="text"
                  v-model="dynamicFields[field.id]"
                />
              </template>
            </div>
          </div>
        </div>
        <div class="bg-white border border-neutral-200 rounded-xl shadow-sm mt-6">
          <div class="bg-neutral-50 border-b border-neutral-100 px-6 py-4 flex items-center justify-between rounded-t-xl">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <IconSettings class="w-5 h-5" />
              </div>
              <div>
                <h2 class="text-sm font-bold text-neutral-900">Status Keanggotaan Awal</h2>
                <p class="text-xs text-neutral-500">Pilih apakah anggota ini langsung aktif atau butuh pembayaran online.</p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <label class="flex items-center gap-3 cursor-pointer">
              <div class="relative">
                <input type="checkbox" v-model="form.isActive" class="sr-only" />
                <div class="block w-12 h-7 rounded-full transition-colors" :class="form.isActive ? 'bg-primary' : 'bg-neutral-300'"></div>
                <div class="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform" :class="form.isActive ? 'transform translate-x-5' : ''"></div>
              </div>
              <div>
                <span class="font-bold text-neutral-800 block text-sm">{{ form.isActive ? 'Langsung Aktif (Bypass Pembayaran)' : 'Menunggu Pembayaran (Generate Link)' }}</span>
                <span class="text-xs text-neutral-500 block mt-0.5" v-if="form.isActive">Anggota langsung aktif dan kartu digital otomatis dicetak tanpa perlu pembayaran online melalui Tripay.</span>
                <span class="text-xs text-neutral-500 block mt-0.5" v-else>Status anggota ditangguhkan (Tidak Aktif). Anda bisa memberikan link checkout KTA ke anggota agar ia melakukan pembayaran mandiri.</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Floating Sticky Action Footer -->
      <div class="fixed bottom-0 left-0 right-0 sm:left-64 bg-white border-t border-neutral-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 flex justify-between gap-3">
        <div>
          <BaseButton v-if="currentStep > 1" type="button" variant="secondary" outline @click="prevStep">
            <IconArrowLeft class="w-4 h-4 mr-2" /> Sebelumnya
          </BaseButton>
          <div v-else></div> <!-- Placeholder for flex-between -->
        </div>
        
        <div class="flex gap-2">
          <BaseButton v-if="currentStep < 3" type="button" @click="nextStep">
            Selanjutnya <IconArrowRight class="w-4 h-4 ml-2" />
          </BaseButton>
          
          <BaseButton v-if="currentStep === 3" type="submit" :loading="loading">
            <IconDeviceFloppy class="w-4 h-4 mr-2" /> {{ isEdit ? 'Simpan Perubahan' : 'Simpan Anggota Baru' }}
          </BaseButton>
        </div>
      </div>

    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "@/extends/plugins/axios";
import { openModalInfo } from "@/extends/plugins/modal";
import BaseInput from "@/components/Basics/BaseInput.vue";
import BaseButton from "@/components/Basics/BaseButton.vue";
import SingleSelect from "@/components/Basics/SingleSelect.vue";
import ToggleSwitch from "@/components/Basics/ToggleSwitch.vue";
import UploadFile from "@/components/Basics/UploadFile.vue";
import { z } from "zod";
import {
  IconArrowLeft,
  IconArrowRight,
  IconUser,
  IconDeviceFloppy,
  IconClipboardList,
  IconHierarchy,
  IconBuildingMonument,
  IconMap,
  IconBuildingCommunity,
  IconHomeRibbon,
  IconSettings,
  IconCheck,
  IconUpload
} from "@tabler/icons-vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { setUserProfile } from "@/extends/methods/auth";

const route = useRoute();
const router = useRouter();


const authStore = useAuthStore();
const profileStore = useProfileStore();

const isSuperAdmin = computed(() => profileStore.user?.role === 'SUPER_ADMIN');
const isProvinceLocked = computed(() => ['ADMIN_DAERAH', 'ADMIN_CABANG', 'ADMIN_RANTING', 'OPERATOR'].includes(profileStore.user?.role));
const isRegencyLocked = computed(() => ['ADMIN_CABANG', 'ADMIN_RANTING', 'OPERATOR'].includes(profileStore.user?.role));
const isDistrictLocked = computed(() => ['ADMIN_RANTING', 'OPERATOR'].includes(profileStore.user?.role));
const organizations = ref([]);

const loading = ref(false);
const errors = ref({});

const memberId = computed(() => route.params.id);
const isEdit = computed(() => !!memberId.value);

const currentStep = ref(1);

const fieldConfigs = ref([]);
const dynamicFields = ref({});

// Data Wilayah & Jabatan
const allProvinces = ref([]);
const allRegencies = ref([]);
const allDistricts = ref([]);
const positions = ref([]);

const selectedPosition = ref(null);

const provinces = ref([]);
const regencies = ref([]);
const districts = ref([]);

const selectedProvince = ref(null);
const selectedRegency = ref(null);
const selectedDistrict = ref(null);
const selectedOrganization = ref(null);

const form = ref({
  organizationId: "",
  name: "",
  email: "",
  phone: "",
  gender: "",
  birthPlace: "",
  birthDate: "",
  address: "",
  nik: "",
  positionId: "",
  level: "",
  provinceId: "",
  regencyId: "",
  districtId: "",
  villageId: "",
  photo: [],
  isActive: true,
});

// Watcher untuk Level
watch(() => form.value.level, (newLevel) => {
  if (newLevel === 'PUSAT') {
    form.value.provinceId = "";
    form.value.regencyId = "";
    form.value.districtId = "";
    selectedProvince.value = null;
    selectedRegency.value = null;
    selectedDistrict.value = null;
  }
  if (newLevel === 'DAERAH') {
    form.value.regencyId = "";
    form.value.districtId = "";
    selectedRegency.value = null;
    selectedDistrict.value = null;
    
    // Re-fill province if locked
    if (isProvinceLocked.value && profileStore.user?.provinceId) {
      const prov = allProvinces.value.find(p => p.id == profileStore.user.provinceId);
      if (prov) {
        provinces.value = [prov];
        form.value.provinceId = prov.id;
        selectedProvince.value = prov;
        
        if (isRegencyLocked.value && profileStore.user?.regencyId) {
          regencies.value = allRegencies.value.filter(r => r.id == profileStore.user.regencyId);
        } else {
          regencies.value = allRegencies.value.filter(r => r.provinceId === prov.id);
        }
      }
    } else {
      provinces.value = allProvinces.value;
    }
  }
  if (newLevel === 'CABANG') {
    form.value.districtId = "";
    selectedDistrict.value = null;

    // Re-fill province and regency if locked
    if (isProvinceLocked.value && profileStore.user?.provinceId) {
      const prov = allProvinces.value.find(p => p.id == profileStore.user.provinceId);
      if (prov) {
        provinces.value = [prov];
        form.value.provinceId = prov.id;
        selectedProvince.value = prov;
        
        if (isRegencyLocked.value && profileStore.user?.regencyId) {
          regencies.value = allRegencies.value.filter(r => r.id == profileStore.user.regencyId);
        } else {
          regencies.value = allRegencies.value.filter(r => r.provinceId === prov.id);
        }
      }
    } else {
      provinces.value = allProvinces.value;
    }
    
    if (isRegencyLocked.value && profileStore.user?.regencyId) {
      const reg = allRegencies.value.find(r => r.id == profileStore.user.regencyId);
      if (reg) {
        form.value.regencyId = reg.id;
        selectedRegency.value = reg;
        
        if (isDistrictLocked.value && profileStore.user?.districtId) {
          districts.value = allDistricts.value.filter(d => d.id == profileStore.user.districtId);
        } else {
          districts.value = allDistricts.value.filter(d => d.regencyId === reg.id);
        }
      }
    } else {
      districts.value = [];
    }
  }
});

const onProvinceSelected = (val) => {
  form.value.provinceId = val ? val.id : "";
  selectedProvince.value = val;
  form.value.regencyId = "";
  selectedRegency.value = null;
  form.value.districtId = "";
  selectedDistrict.value = null;
  
  if (val) {
    if (isRegencyLocked.value && profileStore.user?.regencyId) {
      regencies.value = allRegencies.value.filter(r => r.id == profileStore.user.regencyId);
    } else {
      regencies.value = allRegencies.value.filter(r => r.provinceId === val.id);
    }
  } else {
    regencies.value = [];
  }
  districts.value = [];
};

const onRegencySelected = (val) => {
  form.value.regencyId = val ? val.id : "";
  selectedRegency.value = val;
  form.value.districtId = "";
  selectedDistrict.value = null;
  
  if (val) {
    if (isDistrictLocked.value && profileStore.user?.districtId) {
      districts.value = allDistricts.value.filter(d => d.id == profileStore.user.districtId);
    } else {
      districts.value = allDistricts.value.filter(d => d.regencyId === val.id);
    }
  } else {
    districts.value = [];
  }
};

const onDistrictSelected = (val) => {
  form.value.districtId = val ? val.id : "";
  selectedDistrict.value = val;
};

const onOrganizationSelected = (val) => {
  form.value.organizationId = val ? val.id : "";
  selectedOrganization.value = val;
};

const fetchAllRegionsAndPositions = async () => {
  try {
    if (!profileStore.user?.provinceId) {
      await setUserProfile();
    }
    const [pRes, rRes, dRes, posRes] = await Promise.all([
      axios.get('/api/regions/provinces?limit=1000'),
      axios.get('/api/regions/regencies?limit=1000'),
      axios.get('/api/regions/districts?limit=10000'),
      axios.get('/api/positions?limit=1000')
    ]);
    allProvinces.value = pRes.data?.data?.data || pRes.data?.data || [];
    allRegencies.value = rRes.data?.data?.data || rRes.data?.data || [];
    allDistricts.value = dRes.data?.data?.data || dRes.data?.data || [];
    positions.value = posRes.data?.data?.data || posRes.data?.data || [];

    if (!isEdit.value) {
      const defaultPos = positions.value.find(p => p.name === 'Anggota');
      if (defaultPos) {
        form.value.positionId = defaultPos.id;
        selectedPosition.value = defaultPos;
      }

      if (profileStore.user?.role === 'ADMIN_DAERAH') form.value.level = 'DAERAH';
      else if (profileStore.user?.role === 'ADMIN_CABANG') form.value.level = 'CABANG';
      else if (profileStore.user?.role === 'ADMIN_RANTING') form.value.level = 'RANTING';

      // Auto-fill locked regions based on logged in user's region
      if (isProvinceLocked.value && profileStore.user?.provinceId) {
        const prov = allProvinces.value.find(p => p.id == profileStore.user.provinceId);
        if (prov) {
          provinces.value = [prov];
          form.value.provinceId = prov.id;
          selectedProvince.value = prov;
          
          if (isRegencyLocked.value && profileStore.user?.regencyId) {
            regencies.value = allRegencies.value.filter(r => r.id == profileStore.user.regencyId);
          } else {
            regencies.value = allRegencies.value.filter(r => r.provinceId === prov.id);
          }
        }
      } else {
        provinces.value = allProvinces.value;
      }
      
      if (isRegencyLocked.value && profileStore.user?.regencyId) {
        const reg = allRegencies.value.find(r => r.id == profileStore.user.regencyId);
        if (reg) {
          form.value.regencyId = reg.id;
          selectedRegency.value = reg;
          
          if (isDistrictLocked.value && profileStore.user?.districtId) {
            const dist = allDistricts.value.find(d => d.id == profileStore.user.districtId);
            if (dist) {
              districts.value = [dist];
              form.value.districtId = dist.id;
              selectedDistrict.value = dist;
            }
          } else {
            districts.value = allDistricts.value.filter(d => d.regencyId === reg.id);
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const schemaStep2 = z.object({
  name: z.string({ required_error: "Nama lengkap wajib diisi" }).min(3, "Nama lengkap minimal 3 karakter"),
  positionId: z.string({ required_error: "Jabatan wajib dipilih" }).min(1, "Jabatan wajib dipilih"),
  birthPlace: z.string({ required_error: "Tempat lahir wajib diisi" }).min(3, "Tempat lahir wajib diisi"),
  birthDate: z.string({ required_error: "Tanggal lahir wajib diisi" }).min(1, "Tanggal lahir wajib diisi"),
  gender: z.enum(["MALE", "FEMALE"], { 
    errorMap: () => ({ message: "Jenis kelamin wajib dipilih" }) 
  }),
  email: z.string().email("Format email tidak valid").optional().or(z.literal('')),
  phone: z.string({ required_error: "Nomor Telepon / WhatsApp wajib diisi" }).min(9, "Nomor WA/Telepon minimal 9 karakter"),
  address: z.string({ required_error: "Alamat lengkap wajib diisi" }).min(10, "Alamat lengkap minimal 10 karakter"),
  photo: z.array(z.any(), { required_error: "Foto profil wajib diunggah" }).min(1, "Foto profil wajib diunggah")
});

const nextStep = () => {
  // Clear previous errors
  errors.value = {};

  // Handle conditional validation
  if (currentStep.value === 1) {
    if (isSuperAdmin.value && !isEdit.value && !form.value.organizationId) {
      return openModalInfo({ message: "Organisasi Induk wajib dipilih", type: "error" });
    }
    if (!form.value.level) {
      return openModalInfo({ message: "Tingkat Kepengurusan wajib dipilih", type: "error" });
    }
    if (form.value.level !== 'PUSAT' && !form.value.provinceId) {
      return openModalInfo({ message: "Silakan pilih Provinsi", type: "error" });
    }
    if (['CABANG', 'RANTING'].includes(form.value.level) && !form.value.regencyId) {
      return openModalInfo({ message: "Silakan pilih Kabupaten/Kota", type: "error" });
    }
    if (form.value.level === 'RANTING' && !form.value.districtId) {
      return openModalInfo({ message: "Silakan pilih Kecamatan", type: "error" });
    }
  }

  // Validasi Step 2 dengan Zod
  if (currentStep.value === 2) {
    try {
      schemaStep2.parse(form.value);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(e => {
          if (e.path[0]) {
            errors.value[e.path[0]] = e.message;
          }
        });
        return openModalInfo({ message: "Silakan perbaiki isian yang berwarna merah", type: "error" });
      }
    }
  }

  currentStep.value++;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const prevStep = () => {
  currentStep.value--;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const fetchMember = async () => {
  if (!isEdit.value || !memberId.value) return;
  try {
    const res = await axios.get(`/api/members/${memberId.value}`);
    const data = res.data?.data || res.data;
    if (data) {
      form.value = {
        level: data.level || "PUSAT",
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        gender: data.gender || "",
        birthPlace: data.birthPlace || "",
        birthDate: data.birthDate ? data.birthDate.split('T')[0] : "",
        address: data.address || "",
        provinceId: data.provinceId || "",
        regencyId: data.regencyId || "",
        districtId: data.districtId || "",
        positionId: data.positionId || "",
        photo: data.photo ? [data.photo] : [],
        isActive: data.isActive !== undefined ? data.isActive : true,
      };
      
      // Data will be loaded locally via computed properties based on ID
      // but if we need to explicitly pre-select objects for SingleSelect:
      if (data.province) selectedProvince.value = data.province;
      if (data.regency) selectedRegency.value = data.regency;
      if (data.district) selectedDistrict.value = data.district;
      if (data.position) selectedPosition.value = data.position;
      
      // Load custom field values
      if (data.customFieldValues && data.customFieldValues.length > 0) {
        data.customFieldValues.forEach(cf => {
          const config = fieldConfigs.value.find(fc => fc.id === cf.fieldConfigId);
          if (config && config.fieldType === 'FILE') {
             dynamicFields.value[cf.fieldConfigId] = cf.value ? [cf.value] : [];
          } else {
             dynamicFields.value[cf.fieldConfigId] = cf.value;
          }
        });
      }
    }
  } catch (error) {
    console.error(error);
    openModalInfo({ message: "Gagal mengambil data anggota", type: "error" });
    router.push('/members');
  }
};

const goBack = () => {
  router.push('/members');
};

const submitForm = async () => {
  // Validate dynamic fields
  for (let field of fieldConfigs.value) {
    if (field.isRequired) {
      const val = dynamicFields.value[field.id];
      if (!val || val === "" || (Array.isArray(val) && val.length === 0)) {
        return openModalInfo({ message: `Field "${field.fieldLabel}" wajib diisi`, type: "error" });
      }
    }
  }

  loading.value = true;
  try {
    const payload = { ...form.value };
    // Bersihkan data kosong
    Object.keys(payload).forEach(key => {
      if (payload[key] === "") payload[key] = null;
    });

    if (isEdit.value || !payload.organizationId) {
      delete payload.organizationId;
    }

    // Handle custom field values
    const customFieldValues = [];
    for (let configId of Object.keys(dynamicFields.value)) {
      let val = dynamicFields.value[configId];
      if (val !== "" && val !== null && (!Array.isArray(val) || val.length > 0)) {
        
        // Handle file array
        if (Array.isArray(val)) {
          const p = val[0];
          if (p instanceof File || (p && p.name && p.size)) {
            const formData = new FormData();
            formData.append('file', p);
            try {
              const uploadRes = await axios.post('/api/uploads', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              });
              const responseData = uploadRes.data.data || uploadRes.data;
              val = responseData.url;
            } catch (uploadError) {
              loading.value = false;
              return openModalInfo({ message: "Gagal mengunggah file dinamis", type: "error" });
            }
          } else {
             val = p.base64 || p;
          }
        }
        
        customFieldValues.push({
          fieldConfigId: configId,
          value: String(val)
        });
      }
    }

    if (customFieldValues.length > 0) {
      payload.customFieldValues = customFieldValues;
    }

    // Handle photo specifically since it's an array from UploadFile
    if (payload.photo && payload.photo.length > 0) {
      const p = payload.photo[0];
      if (p instanceof File || (p && p.name && p.size)) {
        // Upload the actual file using FormData
        const formData = new FormData();
        formData.append('file', p);
        
        try {
          const uploadRes = await axios.post('/api/uploads', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          const responseData = uploadRes.data.data || uploadRes.data;
          payload.photo = responseData.url;
        } catch (uploadError) {
          return openModalInfo({ message: "Gagal mengunggah foto ke server", type: "error" });
        }
      } else {
        // It's already an existing string URL
        payload.photo = p.base64 || p;
      }
    } else {
      payload.photo = null;
    }

    if (payload.birthDate) {
      payload.birthDate = new Date(payload.birthDate).toISOString();
    }

    if (isEdit.value) {
      await axios.patch(`/api/members/${memberId.value}`, payload);
      openModalInfo({ message: "Berhasil memperbarui data anggota", type: "success" });
    } else {
      await axios.post("/api/members", payload);
      openModalInfo({ message: "Berhasil mendaftarkan anggota baru", type: "success" });
    }
    router.push('/members');
  } catch (error) {
    console.error(error);
    openModalInfo({
      message: error.response?.data?.message || "Terjadi kesalahan saat menyimpan data",
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};

const fetchFieldConfigs = async () => {
  try {
    const orgId = isSuperAdmin.value && form.value.organizationId ? form.value.organizationId : (profileStore.user?.organizationId || profileStore.user?.organization?.id);
    if (!orgId) return;
    
    const res = await axios.get(`/api/organizations/${orgId}/field-configs`);
    fieldConfigs.value = res.data?.data || res.data || [];
    
    // Initialize dynamicFields with empty strings
    fieldConfigs.value.forEach(config => {
      if (!(config.id in dynamicFields.value)) {
        dynamicFields.value[config.id] = "";
      }
    });
  } catch (error) {
    console.error("Gagal mengambil konfigurasi field dinamis", error);
  }
};

const getOrganizations = async () => {
  try {
    const res = await axios.get('/api/organizations?limit=1000');
    organizations.value = res.data?.data?.data || res.data?.data || [];
  } catch (error) {
    console.error("Gagal mengambil daftar organisasi", error);
  }
};

watch(() => form.value.organizationId, (newId) => {
  if (newId && isSuperAdmin.value) {
    fetchFieldConfigs();
  }
});

onMounted(async () => {
  if (isSuperAdmin.value) {
    await getOrganizations();
  }
  await fetchAllRegionsAndPositions();
  await fetchFieldConfigs();
  if (isEdit.value) {
    await fetchMember();
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
