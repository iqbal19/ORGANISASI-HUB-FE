<template>
  <nav
    class="fixed top-0 z-[1001] w-full border-b border-[#DFEEFF] backdrop-blur-md bg-white/80 transition-all duration-300"
  >
    <div class="px-4 py-3 lg:px-6">
      <div class="flex items-center justify-between">
        <!-- Logo & Hamburger Section -->
        <div class="flex items-center justify-start">
          <button
            type="button"
            class="inline-flex items-center p-2 text-sm text-neutral-600 rounded-lg sm:hidden hover:bg-neutral-100 focus:outline-none"
            @click.stop="uiStore.toggleSidebar"
          >
            <span class="sr-only">Buka Sidebar</span>
            <IconMenu2 class="w-6 h-6 text-neutral-700" />
          </button>
          <a href="#" class="flex items-center ms-3 sm:ms-0 gap-3">
            <img
              v-if="profile?.organization?.logo"
              :src="profile.organization.logo"
              alt="Logo Organisasi"
              class="w-10 h-10 object-contain transform hover:scale-105 transition-transform"
            />
            <img
              v-else
              src="@/assets/images/logo.svg"
              alt="Logo Organisasi Hub"
              class="w-10 h-10 object-contain transform hover:scale-105 transition-transform"
            />
            <p class="text-neutral-900 text-lg md:text-xl font-bold tracking-tight">
              {{ profile?.organization?.name || appName }}
            </p>
          </a>
        </div>

        <!-- User Profile Dropdown Section -->
        <div class="flex items-center relative" ref="dropdownRef">
          <button
            type="button"
            class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-neutral-100/80 transition-colors"
            @click.stop="isDropdownOpen = !isDropdownOpen"
          >
            <div
              class="w-8 h-8 rounded-full bg-primary-light flex justify-center items-center text-primary"
            >
              <IconUser class="w-5 h-5" />
            </div>
            <div class="hidden md:flex flex-col items-start leading-none text-left">
              <span class="text-sm font-semibold text-neutral-900">
                {{ profile?.name || 'Super Admin' }}
              </span>
              <span class="text-[10px] text-neutral-500 font-medium uppercase mt-0.5">
                {{ profile?.role ? profile.role.replace('_', ' ') : 'Pengguna' }}
              </span>
            </div>
            <IconChevronDown class="w-4 h-4 text-neutral-500 hidden md:block transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }" />
          </button>

          <!-- Dropdown Card -->
          <transition name="dropdown">
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 top-full mt-2 w-56 bg-white border border-[#DFEEFF] rounded-xl shadow-lg py-2 z-50 transform origin-top-right"
            >
              <div class="px-4 py-2.5 border-b border-neutral-100">
                <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Akun Masuk</p>
                <p class="text-sm font-bold text-neutral-900 truncate mt-0.5">{{ profile?.name || 'Super Admin' }}</p>
                <p class="text-xs text-neutral-500 truncate mt-0.5">{{ profile?.email || 'admin@admin.go.id' }}</p>
              </div>
              <ul class="py-1">
                <li>
                  <button
                    @click.prevent="handleLogout"
                    class="flex w-full items-center gap-3 px-4 py-2 text-sm text-danger hover:bg-danger-light/30 transition-colors font-medium text-left"
                  >
                    <IconLogout class="w-5 h-5" />
                    <span>Keluar Aplikasi</span>
                  </button>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProfileStore } from "@/stores/ProfileStore";
import { useUIStore } from "@/stores/UIStore";
import { doLogout } from "@/extends/methods/auth";
import { useRouter } from "vue-router";
import { IconUser, IconLogout, IconMenu2, IconChevronDown } from "@tabler/icons-vue";
import useClickOutside from "@/extends/helpers/util.clickoutside";

const router = useRouter();
const profileStore = useProfileStore();
const uiStore = useUIStore();

const profile = computed(() => profileStore.user);
const appName = import.meta.env.VITE_NAME_APP;

const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

// Menutup dropdown jika mengklik di luar area dropdown
useClickOutside(dropdownRef, () => {
  isDropdownOpen.value = false;
});

const handleLogout = async () => {
  isDropdownOpen.value = false;
  await doLogout();
  
  // Hapus cache manual untuk memastikan tidak ada sisa sesi
  localStorage.removeItem("nex.profile");
  localStorage.removeItem("nex.auth");
  
  // Redirect ke login
  router.replace("/login");
};
</script>

<style scoped>
/* Transisi Dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-8px);
}
</style>
