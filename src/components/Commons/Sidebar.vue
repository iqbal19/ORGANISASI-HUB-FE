<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-[1000] w-64 h-screen pt-16 transition-transform duration-300 bg-white border-r border-[#DFEEFF] sm:translate-x-0"
    :class="uiStore.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    aria-label="Sidebar"
  >
    <div class="h-full pb-4 overflow-y-auto bg-white flex flex-col justify-between">
      <!-- Menu Links -->
      <ul class="font-medium mt-4 flex flex-col gap-1">
        <!-- Beranda Menu -->
        <li v-if="checkRolePermission(allRole)">
          <div
            @click="navigate('/beranda')"
            class="group flex items-center cursor-pointer gap-3.5 py-3 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 transition-all duration-200"
            :class="isActive('beranda') ? 'border-primary bg-primary-light/40 text-primary font-bold' : 'border-transparent'"
          >
            <IconLayoutDashboard class="w-5 h-5 transition-transform group-hover:scale-110" :class="isActive('beranda') ? 'text-primary' : 'text-neutral-500 group-hover:text-neutral-700'" />
            <span class="text-sm">Beranda</span>
          </div>
        </li>
        <!-- Anggota Menu -->
        <li v-if="checkRolePermission(allRole)">
          <div
            @click="isMemberOpen = !isMemberOpen"
            class="group flex items-center justify-between cursor-pointer py-3 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 transition-all duration-200"
            :class="isActive('members') ? 'border-primary text-primary font-bold' : 'border-transparent'"
          >
            <div class="flex items-center gap-3.5">
              <IconIdBadge class="w-5 h-5 transition-transform group-hover:scale-110" :class="isActive('members') ? 'text-primary' : 'text-neutral-500 group-hover:text-neutral-700'" />
              <span class="text-sm">Data Anggota</span>
            </div>
            <IconChevronDown class="w-4 h-4 transition-transform duration-200" :class="isMemberOpen ? 'rotate-180' : ''" />
          </div>
          <!-- Submenu -->
          <ul v-show="isMemberOpen" class="flex flex-col gap-1 bg-neutral-50/50 py-2">
            <li>
              <div
                @click="navigate('/members')"
                class="cursor-pointer pl-14 pr-6 py-2 text-sm transition-colors"
                :class="route.path === '/members' ? 'text-primary font-bold' : 'text-neutral-500 hover:text-primary'"
              >
                List Anggota
              </div>
            </li>
            <li>
              <div
                @click="navigate('/members/create')"
                class="cursor-pointer pl-14 pr-6 py-2 text-sm transition-colors"
                :class="route.path === '/members/create' ? 'text-primary font-bold' : 'text-neutral-500 hover:text-primary'"
              >
                Tambah Anggota
              </div>
            </li>
          </ul>
        </li>

        <!-- Berita Menu -->
        <li v-if="checkRolePermission(['SUPER_ADMIN', 'ADMIN_PUSAT', 'ADMIN_DAERAH', 'ADMIN_CABANG'])">
          <div
            @click="navigate('/kelola-berita')"
            class="group flex items-center cursor-pointer gap-3.5 py-3 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 transition-all duration-200"
            :class="isActive('kelola-berita') ? 'border-primary bg-primary-light/40 text-primary font-bold' : 'border-transparent'"
          >
            <IconNews class="w-5 h-5 transition-transform group-hover:scale-110" :class="isActive('kelola-berita') ? 'text-primary' : 'text-neutral-500 group-hover:text-neutral-700'" />
            <span class="text-sm">Kelola Berita</span>
          </div>
        </li>

        <!-- Kegiatan Menu -->
        <li v-if="checkRolePermission(['SUPER_ADMIN', 'ADMIN_PUSAT', 'ADMIN_DAERAH', 'ADMIN_CABANG'])">
          <div
            @click="navigate('/events')"
            class="group flex items-center cursor-pointer gap-3.5 py-3 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 transition-all duration-200"
            :class="isActive('events') ? 'border-primary bg-primary-light/40 text-primary font-bold' : 'border-transparent'"
          >
            <IconCalendarEvent class="w-5 h-5 transition-transform group-hover:scale-110" :class="isActive('events') ? 'text-primary' : 'text-neutral-500 group-hover:text-neutral-700'" />
            <span class="text-sm">Kelola Kegiatan</span>
          </div>
        </li>

        <!-- Iuran Menu -->
        <li v-if="checkRolePermission(['SUPER_ADMIN', 'ADMIN_PUSAT', 'ADMIN_DAERAH'])">
          <div
            @click="navigate('/dues')"
            class="group flex items-center cursor-pointer gap-3.5 py-3 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 transition-all duration-200"
            :class="isActive('dues') ? 'border-primary bg-primary-light/40 text-primary font-bold' : 'border-transparent'"
          >
            <IconCoin class="w-5 h-5 transition-transform group-hover:scale-110" :class="isActive('dues') ? 'text-primary' : 'text-neutral-500 group-hover:text-neutral-700'" />
            <span class="text-sm">Kelola Iuran</span>
          </div>
        </li>

        <!-- Pengaturan Menu -->
        <li v-if="checkRolePermission(['ADMIN_PUSAT', 'ADMIN_DAERAH'])">
          <div
            @click="navigate('/settings')"
            class="group flex items-center cursor-pointer gap-3.5 py-3 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 transition-all duration-200"
            :class="isActive('settings') ? 'border-primary bg-primary-light/40 text-primary font-bold' : 'border-transparent'"
          >
            <IconSettings class="w-5 h-5 transition-transform group-hover:scale-110" :class="isActive('settings') ? 'text-primary' : 'text-neutral-500 group-hover:text-neutral-700'" />
            <span class="text-sm">Pengaturan</span>
          </div>
        </li>
        <!-- User Menu -->
        <li v-if="checkRolePermission(['SUPER_ADMIN'])">
          <div
            @click="navigate('/user')"
            class="group flex items-center cursor-pointer gap-3.5 py-3 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 transition-all duration-200"
            :class="isActive('user') ? 'border-primary bg-primary-light/40 text-primary font-bold' : 'border-transparent'"
          >
            <IconUsers class="w-5 h-5 transition-transform group-hover:scale-110" :class="isActive('user') ? 'text-primary' : 'text-neutral-500 group-hover:text-neutral-700'" />
            <span class="text-sm">User</span>
          </div>
        </li>

        <!-- Organisasi Menu -->
        <li v-if="checkRolePermission(['SUPER_ADMIN'])">
          <div
            @click="navigate('/organization')"
            class="group flex items-center cursor-pointer gap-3.5 py-3 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 transition-all duration-200"
            :class="isActive('organization') ? 'border-primary bg-primary-light/40 text-primary font-bold' : 'border-transparent'"
          >
            <IconBuilding class="w-5 h-5 transition-transform group-hover:scale-110" :class="isActive('organization') ? 'text-primary' : 'text-neutral-500 group-hover:text-neutral-700'" />
            <span class="text-sm">Organisasi</span>
          </div>
        </li>

        <!-- Master Produk Menu -->
        <li v-if="checkRolePermission(['SUPER_ADMIN'])">
          <div
            @click="navigate('/products')"
            class="group flex items-center cursor-pointer gap-3.5 py-3 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 transition-all duration-200"
            :class="isActive('products') ? 'border-primary bg-primary-light/40 text-primary font-bold' : 'border-transparent'"
          >
            <IconShoppingBag class="w-5 h-5 transition-transform group-hover:scale-110" :class="isActive('products') ? 'text-primary' : 'text-neutral-500 group-hover:text-neutral-700'" />
            <span class="text-sm">Master Produk</span>
          </div>
        </li>

        <!-- Produksi KTA Menu -->
        <li v-if="checkRolePermission(['SUPER_ADMIN'])">
          <div
            @click="navigate('/production')"
            class="group flex items-center cursor-pointer gap-3.5 py-3 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 transition-all duration-200"
            :class="isActive('production') ? 'border-primary bg-primary-light/40 text-primary font-bold' : 'border-transparent'"
          >
            <IconPrinter class="w-5 h-5 transition-transform group-hover:scale-110" :class="isActive('production') ? 'text-primary' : 'text-neutral-500 group-hover:text-neutral-700'" />
            <span class="text-sm">Produksi KTA</span>
          </div>
        </li>

        <!-- Referensi Menu -->
        <li v-if="checkRolePermission(['SUPER_ADMIN'])">
          <div
            @click="isReferenceOpen = !isReferenceOpen"
            class="group flex items-center justify-between cursor-pointer py-3 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 transition-all duration-200"
            :class="isActive('reference') ? 'border-primary text-primary font-bold' : 'border-transparent'"
          >
            <div class="flex items-center gap-3.5">
              <IconMap class="w-5 h-5 transition-transform group-hover:scale-110" :class="isActive('reference') ? 'text-primary' : 'text-neutral-500 group-hover:text-neutral-700'" />
              <span class="text-sm">Referensi</span>
            </div>
            <IconChevronDown class="w-4 h-4 transition-transform duration-200" :class="isReferenceOpen ? 'rotate-180' : ''" />
          </div>
          <!-- Submenu -->
          <ul v-show="isReferenceOpen" class="flex flex-col gap-1 bg-neutral-50/50 py-2">
            <li>
              <div
                @click="navigate('/reference/province')"
                class="cursor-pointer pl-14 pr-6 py-2 text-sm transition-colors"
                :class="isActive('reference/province') ? 'text-primary font-bold' : 'text-neutral-500 hover:text-primary'"
              >
                Provinsi
              </div>
            </li>
            <li>
              <div
                @click="navigate('/reference/regency')"
                class="cursor-pointer pl-14 pr-6 py-2 text-sm transition-colors"
                :class="isActive('reference/regency') ? 'text-primary font-bold' : 'text-neutral-500 hover:text-primary'"
              >
                Kabupaten/Kota
              </div>
            </li>
            <li>
              <div
                @click="navigate('/reference/district')"
                class="cursor-pointer pl-14 pr-6 py-2 text-sm transition-colors"
                :class="isActive('reference/district') ? 'text-primary font-bold' : 'text-neutral-500 hover:text-primary'"
              >
                Kecamatan
              </div>
            </li>
            <li>
              <div
                @click="navigate('/reference/positions')"
                class="cursor-pointer pl-14 pr-6 py-2 text-sm transition-colors"
                :class="isActive('reference/positions') ? 'text-primary font-bold' : 'text-neutral-500 hover:text-primary'"
              >
                Jabatan
              </div>
            </li>
          </ul>
        </li>
      </ul>

      <!-- Footer Info inside Sidebar (Optional / Premium touch) -->
      <div class="px-6 py-2 border-t border-neutral-100 hidden sm:block">
        <!-- <p class="text-xs font-bold text-neutral-700 mt-1">PDAM KAB. BERAU</p> -->
        <p class="text-[9px] text-neutral-400 mt-0.5">Versi 1.0.0 (Offline Mode)</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useUIStore } from "@/stores/UIStore";
import {
  IconNews,
  IconUsers,
  IconLayoutDashboard,
  IconBuilding,
  IconShoppingBag,
  IconMap,
  IconChevronDown,
  IconCalendarEvent,
  IconCoin,
  IconSettings,
  IconIdBadge,
  IconPrinter,
} from "@tabler/icons-vue";
import {
  allRole,
  checkRolePermission,
} from "@/extends/constants/role";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const uiStore = useUIStore();

const isReferenceOpen = ref(false);
const isMemberOpen = ref(false);

onMounted(() => {
  if (isActive('reference')) {
    isReferenceOpen.value = true;
  }
  if (isActive('members')) {
    isMemberOpen.value = true;
  }
});

const isActive = (menu) => {
  return route.path.includes(menu);
};

const navigate = (path) => {
  router.push(path);
  // Tutup sidebar setelah mengklik rute di resolusi mobile
  uiStore.closeSidebar();
};
</script>

<style scoped></style>
