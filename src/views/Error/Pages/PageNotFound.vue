<template>
  <div class="error-page">
    <!-- Animated Background -->
    <div class="bg-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- Floating Particles -->
    <div class="particles" aria-hidden="true">
      <span v-for="n in 6" :key="n" :class="`particle particle-${n}`"></span>
    </div>

    <!-- Content Card -->
    <div class="error-card">
      <!-- Icon Section -->
      <div class="icon-wrapper">
        <div class="icon-ring icon-ring-outer"></div>
        <div class="icon-ring icon-ring-inner"></div>
        <div class="icon-circle">
          <IconMapSearch class="icon-main" />
        </div>
      </div>

      <!-- Error Code -->
      <div class="error-code">
        <span class="digit">4</span>
        <span class="digit digit-highlight">0</span>
        <span class="digit">4</span>
      </div>

      <!-- Message -->
      <h1 class="error-title">Halaman Tidak Ditemukan</h1>
      <p class="error-desc">
        Halaman yang Anda cari tidak ada atau telah dipindahkan.<br />
        Periksa kembali URL atau kembali ke beranda.
      </p>

      <!-- URL Badge -->
      <div class="url-badge" v-if="currentPath !== '/'">
        <IconLink class="url-icon" />
        <span class="url-text">{{ currentPath }}</span>
      </div>

      <!-- Divider -->
      <div class="divider">
        <span class="divider-line"></span>
        <span class="divider-dot"></span>
        <span class="divider-line"></span>
      </div>

      <!-- Actions -->
      <div class="action-buttons">
        <BaseButton variant="primary" size="md" @click="goDashboard">
          <IconHome class="btn-icon" />
          Ke Beranda
        </BaseButton>
        <BaseButton variant="primary" outline size="md" @click="goBack">
          <IconArrowLeft class="btn-icon" />
          Kembali
        </BaseButton>
      </div>

      <!-- Footer hint -->
      <p class="error-hint">
        <IconInfoCircle class="hint-icon" />
        Kode Error: <strong>404 Not Found</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { IconMapSearch, IconArrowLeft, IconHome, IconInfoCircle, IconLink } from "@tabler/icons-vue";
import BaseButton from "@/components/Basics/BaseButton.vue";

const router = useRouter();
const route = useRoute();

const currentPath = computed(() => route.fullPath);

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
};

const goDashboard = () => {
  router.push("/");
};
</script>

<style scoped>
/* ── Base Layout ──────────────────────────────── */
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f6ff 0%, #f8f4ff 50%, #f0fff4 100%);
  font-family: "Plus Jakarta Sans", sans-serif;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

/* ── Animated Background Blobs ────────────────── */
.bg-blobs {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  animation: floatBlob 9s ease-in-out infinite;
}

.blob-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #bfdbfe, #60a5fa);
  top: -140px;
  left: -100px;
  animation-delay: 0s;
}

.blob-2 {
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, #d9f99d, #86efac);
  bottom: -100px;
  right: -80px;
  animation-delay: -4s;
}

.blob-3 {
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, #e9d5ff, #c084fc);
  top: 45%;
  left: 55%;
  animation-delay: -2s;
}

@keyframes floatBlob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(18px, -22px) scale(1.04); }
  66% { transform: translate(-12px, 12px) scale(0.98); }
}

/* ── Floating Particles ───────────────────────── */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.15);
  animation: floatParticle linear infinite;
}

.particle-1 { width: 8px;  height: 8px;  top: 15%; left: 10%; animation-duration: 12s; animation-delay: 0s; }
.particle-2 { width: 5px;  height: 5px;  top: 75%; left: 20%; animation-duration: 15s; animation-delay: -3s; }
.particle-3 { width: 10px; height: 10px; top: 30%; left: 80%; animation-duration: 10s; animation-delay: -6s; }
.particle-4 { width: 6px;  height: 6px;  top: 65%; left: 85%; animation-duration: 14s; animation-delay: -1s; }
.particle-5 { width: 7px;  height: 7px;  top: 50%; left: 5%;  animation-duration: 11s; animation-delay: -7s; }
.particle-6 { width: 4px;  height: 4px;  top: 20%; left: 55%; animation-duration: 16s; animation-delay: -9s; }

@keyframes floatParticle {
  0%   { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
  50%  { transform: translateY(-40px) rotate(180deg); opacity: 0.9; }
  100% { transform: translateY(0px) rotate(360deg); opacity: 0.4; }
}

/* ── Card ─────────────────────────────────────── */
.error-card {
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 2rem;
  padding: 3rem 2.5rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow:
    0 8px 32px rgba(59, 130, 246, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.8) inset;
  animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(32px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ── Icon ─────────────────────────────────────── */
.icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
}

.icon-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid;
  animation: pulseRing 2.4s ease-in-out infinite;
}

.icon-ring-outer {
  width: 100px;
  height: 100px;
  border-color: rgba(59, 130, 246, 0.2);
  animation-delay: 0s;
}

.icon-ring-inner {
  width: 80px;
  height: 80px;
  border-color: rgba(59, 130, 246, 0.35);
  animation-delay: -0.6s;
}

@keyframes pulseRing {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.06); opacity: 0.6; }
}

.icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border: 2px solid rgba(59, 130, 246, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
  z-index: 1;
  animation: iconBounce 3s ease-in-out infinite;
}

.icon-main {
  width: 32px;
  height: 32px;
  color: #2563eb;
}

@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

/* ── Error Code ───────────────────────────────── */
.error-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.digit {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, #374151, #6b7280);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.04em;
}

.digit-highlight {
  background: linear-gradient(135deg, #2563eb, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Text ─────────────────────────────────────── */
.error-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}

.error-desc {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.7;
  margin: 0;
}

/* ── URL Badge ────────────────────────────────── */
.url-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
  padding: 0.4rem 0.9rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  max-width: 100%;
  overflow: hidden;
}

.url-icon {
  width: 13px;
  height: 13px;
  color: #9ca3af;
  flex-shrink: 0;
}

.url-text {
  font-size: 0.75rem;
  color: #6b7280;
  font-family: "Courier New", monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
}

/* ── Divider ──────────────────────────────────── */
.divider {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.75rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, #e5e7eb, transparent);
}

.divider-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d1d5db;
}

/* ── Buttons ──────────────────────────────────── */
.action-buttons {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

/* ── Hint ─────────────────────────────────────── */
.error-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 1.5rem;
  font-size: 0.78rem;
  color: #9ca3af;
}

.hint-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
</style>
