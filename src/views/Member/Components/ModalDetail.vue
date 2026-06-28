<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleClose"
    :isBorder="true"
    classWidth="max-w-3xl"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <IconUser class="w-6 h-6" />
        </div>
        <div>
          <p class="text-xl font-bold text-neutral-900 tracking-tight">Detail Anggota</p>
          <p class="text-sm text-neutral-500 font-medium">Informasi profil dan identitas keanggotaan</p>
        </div>
      </div>
    </template>
    <template #body>
      <div v-if="!data" class="py-10 text-center text-neutral-500">
        Memuat data...
      </div>
      <div v-else class="space-y-6">
        <!-- Profil Singkat -->
        <div class="flex flex-col sm:flex-row gap-6 items-start p-5 bg-neutral-50 rounded-xl border border-neutral-100">
          <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm flex-shrink-0 bg-neutral-200">
            <img v-if="data.photo" :src="data.photo" alt="Photo Profil" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-neutral-400">
              <IconUser class="w-10 h-10" />
            </div>
          </div>
          <div class="flex-1 space-y-1">
            <div class="flex items-center gap-2">
              <h2 class="text-xl font-bold text-neutral-900">{{ data.name }}</h2>
              <span class="px-2 py-0.5 rounded-full text-xs font-bold" :class="data.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                {{ data.isActive ? 'AKTIF' : 'TIDAK AKTIF' }}
              </span>
            </div>
            <p class="text-sm text-neutral-600 font-medium">NTA: {{ data.memberId || '-' }}</p>
            <p class="text-sm text-neutral-500">Jabatan: {{ data.position?.name || 'Anggota' }}</p>
          </div>
        </div>

        <!-- Grid Informasi -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <h4 class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Kontak & Personal</h4>
              <dl class="space-y-2 text-sm">
                <div class="grid grid-cols-3 gap-2">
                  <dt class="text-neutral-500">Email</dt>
                  <dd class="col-span-2 font-medium text-neutral-900">{{ data.email || '-' }}</dd>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <dt class="text-neutral-500">No HP/WA</dt>
                  <dd class="col-span-2 font-medium text-neutral-900">{{ data.phone || '-' }}</dd>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <dt class="text-neutral-500">NIK</dt>
                  <dd class="col-span-2 font-medium text-neutral-900">{{ data.nik || '-' }}</dd>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <dt class="text-neutral-500">TTL</dt>
                  <dd class="col-span-2 font-medium text-neutral-900">{{ data.birthPlace || '-' }}, {{ data.birthDate ? new Date(data.birthDate).toLocaleDateString('id-ID') : '-' }}</dd>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <dt class="text-neutral-500">Gender</dt>
                  <dd class="col-span-2 font-medium text-neutral-900">{{ data.gender === 'MALE' ? 'Laki-laki' : (data.gender === 'FEMALE' ? 'Perempuan' : '-') }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <h4 class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Alamat & Penempatan</h4>
              <dl class="space-y-2 text-sm">
                <div class="grid grid-cols-3 gap-2">
                  <dt class="text-neutral-500">Alamat</dt>
                  <dd class="col-span-2 font-medium text-neutral-900">{{ data.address || '-' }}</dd>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <dt class="text-neutral-500">Organisasi</dt>
                  <dd class="col-span-2 font-medium text-neutral-900">{{ data.organization?.name || '-' }}</dd>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <dt class="text-neutral-500">Level</dt>
                  <dd class="col-span-2 font-medium text-neutral-900">{{ data.level || '-' }}</dd>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <dt class="text-neutral-500">Wilayah</dt>
                  <dd class="col-span-2 font-medium text-neutral-900">
                    <span v-if="data.province">Prov: {{ data.province?.name }}<br></span>
                    <span v-if="data.regency">Kab/Kota: {{ data.regency?.name }}<br></span>
                    <span v-if="data.district">Kec: {{ data.district?.name }}</span>
                    <span v-if="!data.province">-</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <!-- Custom Fields -->
        <div v-if="data.customFieldValues && data.customFieldValues.length > 0" class="pt-4 border-t border-neutral-100">
          <h4 class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Informasi Tambahan Organisasi</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
            <div v-for="cf in data.customFieldValues" :key="cf.id" class="text-sm">
              <span class="text-neutral-500 block mb-0.5">{{ cf.fieldConfig?.fieldLabel || 'Field' }}</span>
              
              <div v-if="cf.fieldConfig?.fieldType === 'FILE' && cf.value" class="font-medium text-primary">
                <a :href="cf.value" target="_blank" class="flex items-center gap-1 hover:underline">
                  <IconFile class="w-4 h-4" /> Lihat Dokumen
                </a>
              </div>
              <div v-else-if="cf.fieldConfig?.fieldType === 'BOOLEAN'" class="font-medium text-neutral-900">
                {{ cf.value === 'true' ? 'Ya' : 'Tidak' }}
              </div>
              <div v-else class="font-medium text-neutral-900">
                {{ cf.value || '-' }}
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="flex justify-end mt-8 pt-5 border-t border-neutral-100">
        <BaseButton @click="handleClose">
          Tutup
        </BaseButton>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import Modal from "@/components/Basics/Modal.vue";
import BaseButton from "@/components/Basics/BaseButton.vue";
import { IconUser, IconFile } from "@tabler/icons-vue";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["closeModal"]);

const handleClose = () => {
  emit("closeModal");
};
</script>
