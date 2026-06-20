<template>
  <div class="flex flex-col gap-6 p-1">
    <!-- Header Welcome Banner -->
    <div class="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 md:p-8 text-white shadow-sm">
      <h1 class="text-2xl md:text-3xl font-bold mb-2">Selamat Datang di Portal PDAM Berau</h1>
      <p class="text-sm md:text-base text-primary-light max-w-2xl font-light">
        Kelola data pelanggan, pantau debit air secara real-time, dan perbarui berita seputar layanan air bersih daerah Kabupaten Berau dengan sistem terintegrasi.
      </p>
      
      <!-- Toast Showcase Buttons -->
      <div class="mt-6 flex flex-wrap gap-3">
        <button
          @click="showToast('Koneksi database berhasil diverifikasi!', 'success')"
          class="px-4 py-2 bg-white/20 hover:bg-white/35 text-white font-medium text-xs rounded-lg transition-colors border border-white/10"
        >
          Tes Toast Sukses
        </button>
        <button
          @click="showToast('Gagal memuat log sistem terbaru.', 'danger')"
          class="px-4 py-2 bg-white/20 hover:bg-white/35 text-white font-medium text-xs rounded-lg transition-colors border border-white/10"
        >
          Tes Toast Gagal
        </button>
        <button
          @click="showToast('Peringatan: Kapasitas tampungan air mendekati limit.', 'warning')"
          class="px-4 py-2 bg-white/20 hover:bg-white/35 text-white font-medium text-xs rounded-lg transition-colors border border-white/10"
        >
          Tes Toast Peringatan
        </button>
        <button
          @click="showToast('Sistem melakukan pemeliharaan berkala pukul 23.00.', 'info')"
          class="px-4 py-2 bg-white/20 hover:bg-white/35 text-white font-medium text-xs rounded-lg transition-colors border border-white/10"
        >
          Tes Toast Info
        </button>
      </div>
    </div>

    <!-- Stats Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <CardStat
        title="Total Pelanggan"
        value="14,280"
        :icon="IconUsers"
        trend="+4.8%"
        trendDirection="up"
      />
      <CardStat
        title="Pemeliharaan Aktif"
        value="12 Titik"
        :icon="IconTool"
        trend="-1.2%"
        trendDirection="down"
      />
      <CardStat
        title="Debit Air Rata-rata"
        value="420 L/s"
        :icon="IconDroplet"
        trend="+0.2%"
        trendDirection="up"
      />
      <CardStat
        title="Berita Publik"
        value="38 Rilis"
        :icon="IconNews"
        trend="Stabil"
        trendDirection="flat"
      />
    </div>

    <!-- Charts & Settings Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Trend Line Chart -->
      <div class="lg:col-span-2 bg-white border border-[#BBD6FF] rounded-xl p-5 shadow-sm flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-base font-bold text-neutral-900">Grafik Fluktuasi Debit Air</h3>
            <p class="text-xs text-neutral-500">Pemantauan bulanan distribusi air bersih (Ltr/detik)</p>
          </div>
          <IconActivity class="text-primary w-5 h-5" />
        </div>
        <div class="flex-1 min-h-[300px]">
          <BaseChart type="line" :data="flowChartData" :options="flowChartOptions" />
        </div>
      </div>

      <!-- Settings & Badges Sidebar Card -->
      <div class="bg-white border border-[#BBD6FF] rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4 border-b border-neutral-200 pb-3">
            <h3 class="text-base font-bold text-neutral-900 flex items-center gap-2">
              <IconSettings class="w-5 h-5 text-neutral-600" />
              Konfigurasi & Status
            </h3>
          </div>

          <!-- Toggle Switches Demo -->
          <div class="flex flex-col gap-4 mb-6">
            <h4 class="text-xs font-bold text-neutral-500 uppercase tracking-wider">Fitur Dashboard</h4>
            <ToggleSwitch
              v-model="dashboardSettings.realtime"
              label="Sinkronisasi Data Otomatis"
              @update:modelValue="handleSettingToggle('Sinkronisasi otomatis', $event)"
            />
            <ToggleSwitch
              v-model="dashboardSettings.notifications"
              label="Notifikasi Peringatan Kritis"
              @update:modelValue="handleSettingToggle('Notifikasi kritis', $event)"
            />
            <ToggleSwitch
              v-model="dashboardSettings.compact"
              label="Tampilan Grid Padat"
              @update:modelValue="handleSettingToggle('Tampilan padat', $event)"
            />
          </div>

          <!-- Badges Status Demo -->
          <div class="flex flex-col gap-3">
            <h4 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Status Server & Jaringan</h4>
            <div class="flex items-center justify-between py-1.5 border-b border-neutral-100">
              <span class="text-sm font-medium text-neutral-700">API Server Utama</span>
              <Badge variant="success" text="Online" pill />
            </div>
            <div class="flex items-center justify-between py-1.5 border-b border-neutral-100">
              <span class="text-sm font-medium text-neutral-700">Database Cluster</span>
              <Badge variant="success" text="Sinkron" pill />
            </div>
            <div class="flex items-center justify-between py-1.5 border-b border-neutral-100">
              <span class="text-sm font-medium text-neutral-700">Backup Storage</span>
              <Badge variant="info" text="Siaga" pill />
            </div>
            <div class="flex items-center justify-between py-1.5">
              <span class="text-sm font-medium text-neutral-700">Sektor Pengolahan</span>
              <Badge variant="warning" text="Pemeliharaan" pill />
            </div>
          </div>
        </div>

        <div class="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <span>Terakhir diperbarui:</span>
          <span class="font-semibold text-neutral-700">Baru saja</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { showToast } from "@/extends/plugins/toast";
import CardStat from "@/components/Basics/CardStat.vue";
import BaseChart from "@/components/Basics/BaseChart.vue";
import ToggleSwitch from "@/components/Basics/ToggleSwitch.vue";
import Badge from "@/components/Basics/Badge.vue";
import {
  IconUsers,
  IconTool,
  IconDroplet,
  IconNews,
  IconActivity,
  IconSettings,
} from "@tabler/icons-vue";

// Dashboard control states
const dashboardSettings = ref({
  realtime: true,
  notifications: true,
  compact: false,
});

const handleSettingToggle = (name, value) => {
  const status = value ? "diaktifkan" : "dinonaktifkan";
  showToast(`${name} berhasil ${status}!`, value ? "success" : "info");
};

// Flow rate simulation data (Jan - Jun)
const flowChartData = ref({
  labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
  datasets: [
    {
      label: "Zona Berau Utara (L/s)",
      data: [380, 410, 395, 420, 440, 430],
      borderColor: "#3686FF",
      backgroundColor: "rgba(223, 238, 255, 0.4)",
      borderWidth: 3,
      fill: true,
      tension: 0.3,
      pointBackgroundColor: "#3686FF",
      pointBorderColor: "#FFFFFF",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: "Zona Berau Selatan (L/s)",
      data: [320, 340, 330, 350, 345, 360],
      borderColor: "#FFB936",
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0.3,
      pointBackgroundColor: "#FFB936",
      pointBorderColor: "#FFFFFF",
      pointBorderWidth: 1.5,
      pointRadius: 4,
    }
  ],
});

const flowChartOptions = ref({
  scales: {
    y: {
      grid: {
        color: "rgba(229, 229, 229, 0.5)",
      },
      ticks: {
        font: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 11,
        },
        color: "#808080",
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 11,
        },
        color: "#808080",
      },
    },
  },
});
</script>

<style scoped>
/* Gradient utility override */
.bg-primary-dark {
  background-color: #2457A8;
}
</style>
