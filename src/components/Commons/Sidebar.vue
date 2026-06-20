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


        <!-- User Menu -->
        <li v-if="checkRolePermission(['ADMIN_APLIKASI'])">
          <div
            @click="navigate('/user')"
            class="group flex items-center cursor-pointer gap-3.5 py-3 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 transition-all duration-200"
            :class="isActive('user') ? 'border-primary bg-primary-light/40 text-primary font-bold' : 'border-transparent'"
          >
            <IconUsers class="w-5 h-5 transition-transform group-hover:scale-110" :class="isActive('user') ? 'text-primary' : 'text-neutral-500 group-hover:text-neutral-700'" />
            <span class="text-sm">User</span>
          </div>
        </li>
      </ul>

      <!-- Footer Info inside Sidebar (Optional / Premium touch) -->
      <div class="px-6 py-4 border-t border-neutral-100 hidden sm:block">
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
  IconLayoutDashboard
} from "@tabler/icons-vue";
import {
  allRole,
  checkRolePermission,
} from "@/extends/constants/role";

const route = useRoute();
const router = useRouter();
const uiStore = useUIStore();

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
