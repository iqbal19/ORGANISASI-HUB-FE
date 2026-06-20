<template>
  <div class="error-page">
    <!-- Animated Background -->
    <div class="bg-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- Content Card -->
    <div class="error-card">
      <!-- Icon Section -->
      <div class="icon-wrapper">
        <div class="icon-ring icon-ring-outer"></div>
        <div class="icon-ring icon-ring-inner"></div>
        <div class="icon-circle">
          <IconShieldLock class="icon-main" />
        </div>
      </div>

      <!-- Error Code -->
      <div class="error-code">
        <span class="digit">4</span>
        <span class="digit digit-highlight">0</span>
        <span class="digit">3</span>
      </div>

      <!-- Message -->
      <h1 class="error-title">Akses Ditolak</h1>
      <p class="error-desc">
        Anda tidak memiliki izin untuk mengakses halaman ini.<br />
        Silakan hubungi administrator jika Anda merasa ini adalah kesalahan.
      </p>

      <!-- Divider -->
      <div class="divider">
        <span class="divider-line"></span>
        <span class="divider-dot"></span>
        <span class="divider-line"></span>
      </div>

      <!-- Actions -->
      <div class="action-buttons">
        <BaseButton variant="danger" size="md" @click="goBack">
          <IconArrowLeft class="btn-icon" />
          Kembali
        </BaseButton>
        <BaseButton variant="danger" outline size="md" @click="goDashboard">
          <IconHome class="btn-icon" />
          Ke Beranda
        </BaseButton>
      </div>

      <!-- Footer hint -->
      <p class="error-hint">
        <IconInfoCircle class="hint-icon" />
        Kode Error: <strong>403 Forbidden</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { IconShieldLock, IconArrowLeft, IconHome, IconInfoCircle } from "@tabler/icons-vue";
import BaseButton from "@/components/Basics/BaseButton.vue";

const router = useRouter();

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
  background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #fff5f5 100%);
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
  animation: floatBlob 8s ease-in-out infinite;
}

.blob-1 {
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, #c7d7ff, #a78bfa);
  top: -120px;
  left: -120px;
  animation-delay: 0s;
}

.blob-2 {
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, #fecaca, #f87171);
  bottom: -80px;
  right: -80px;
  animation-delay: -3s;
}

.blob-3 {
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, #ddd6fe, #c084fc);
  top: 50%;
  left: 60%;
  animation-delay: -5s;
}

@keyframes floatBlob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -20px) scale(1.05); }
  66% { transform: translate(-15px, 10px) scale(0.97); }
}

/* ── Card ─────────────────────────────────────── */
.error-card {
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 2rem;
  padding: 3rem 2.5rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow:
    0 8px 32px rgba(99, 102, 241, 0.1),
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
  border-color: rgba(239, 68, 68, 0.2);
  animation-delay: 0s;
}

.icon-ring-inner {
  width: 80px;
  height: 80px;
  border-color: rgba(239, 68, 68, 0.35);
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
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  border: 2px solid rgba(239, 68, 68, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.2);
  z-index: 1;
}

.icon-main {
  width: 32px;
  height: 32px;
  color: #dc2626;
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
  background: linear-gradient(135deg, #dc2626, #f87171);
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
