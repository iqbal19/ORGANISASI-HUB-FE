<template>
  <div class="min-h-screen bg-neutral-50 flex flex-col items-center py-10 px-4">
    <div class="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden border border-neutral-100">
      
      <!-- Header -->
      <div class="bg-primary p-6 text-center">
        <h1 class="text-2xl font-bold text-white mb-2">Aktivasi Akun Anggota</h1>
        <p class="text-primary-100 text-sm">Ikuti langkah-langkah di bawah untuk mengaktifkan akun Anda</p>
      </div>

      <!-- Stepper -->
      <div class="flex px-6 py-4 bg-neutral-50/50 border-b border-neutral-100">
        <div class="flex items-center w-full">
          <div class="flex flex-col items-center flex-1 relative">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 z-10"
              :class="step >= 1 ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'">1</div>
            <span class="text-xs mt-2 font-medium" :class="step >= 1 ? 'text-primary' : 'text-neutral-500'">Pindai KTA</span>
          </div>
          <div class="flex-1 h-1 -mx-4 z-0 relative -top-3 transition-colors duration-300" :class="step >= 2 ? 'bg-primary' : 'bg-neutral-200'"></div>
          <div class="flex flex-col items-center flex-1 relative">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 z-10"
              :class="step >= 2 ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'">2</div>
            <span class="text-xs mt-2 font-medium" :class="step >= 2 ? 'text-primary' : 'text-neutral-500'">Verifikasi</span>
          </div>
          <div class="flex-1 h-1 -mx-4 z-0 relative -top-3 transition-colors duration-300" :class="step >= 3 ? 'bg-primary' : 'bg-neutral-200'"></div>
          <div class="flex flex-col items-center flex-1 relative">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 z-10"
              :class="step >= 3 ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'">3</div>
            <span class="text-xs mt-2 font-medium" :class="step >= 3 ? 'text-primary' : 'text-neutral-500'">Buat Akun</span>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6">
        
        <!-- STEP 1: SCANNER -->
        <div v-show="step === 1" class="animate-fade-in flex flex-col items-center">
          <p class="text-sm text-neutral-600 mb-6 text-center">Arahkan kamera ke QR Code pada Kartu Tanda Anggota (KTA) fisik Anda.</p>
          
          <!-- Camera Container -->
          <div class="w-full max-w-sm rounded-xl overflow-hidden border-2 border-dashed border-primary/50 p-2 relative bg-black min-h-[300px] flex items-center justify-center">
            
            <div id="qr-reader" class="w-full"></div>
            
            <div v-if="cameraLoading" class="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/80 z-10">
              <IconLoader2 class="w-8 h-8 text-primary animate-spin mb-2" />
              <span class="text-sm font-semibold text-white">Membuka Kamera...</span>
            </div>

            <div v-if="scanning" class="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-20">
              <div class="flex flex-col items-center gap-3">
                <IconLoader2 class="w-8 h-8 text-primary animate-spin" />
                <span class="text-sm font-semibold text-primary">Memverifikasi QR Code...</span>
              </div>
            </div>
          </div>
          
          <div class="mt-6 flex flex-col items-center w-full max-w-sm gap-4">
            <div class="flex items-center w-full gap-3">
              <div class="flex-1 h-px bg-neutral-200"></div>
              <span class="text-xs text-neutral-400 font-medium uppercase">ATAU</span>
              <div class="flex-1 h-px bg-neutral-200"></div>
            </div>

            <!-- Upload File Input (Hidden) -->
            <input 
              type="file" 
              ref="fileInput" 
              accept="image/*" 
              class="hidden" 
              @change="handleFileUpload" 
            />

            <!-- Custom Upload Button -->
            <button 
              type="button"
              @click="triggerFileUpload" 
              class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-primary/20 bg-primary/5 text-primary font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <IconUpload class="w-5 h-5" />
              Unggah File / Foto KTA
            </button>
          </div>
          
          <button @click="router.push('/login')" class="mt-8 text-sm text-neutral-500 hover:text-primary transition-colors font-medium">
            Kembali ke Halaman Login
          </button>
        </div>

        <!-- STEP 2: VERIFICATION FORM -->
        <div v-if="step === 2" class="animate-fade-in w-full">
          
          <!-- Member Info Card -->
          <div class="flex items-center gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5 mb-6">
            <div class="w-16 h-16 rounded-full bg-neutral-200 overflow-hidden border-2 border-white shadow-sm shrink-0">
              <img v-if="memberData.photo" :src="memberData.photo" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center bg-primary text-white font-bold text-xl">
                {{ memberData.name?.charAt(0) }}
              </div>
            </div>
            <div>
              <h3 class="font-bold text-neutral-800 text-lg">{{ memberData.name }}</h3>
              <p class="text-xs text-neutral-500 font-medium">ID: {{ memberData.memberId }}</p>
            </div>
          </div>

          <form @submit.prevent="proceedToStep3" class="flex flex-col gap-4">
            
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2 flex items-start gap-3">
              <IconAlertTriangle class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p class="text-xs text-amber-700 leading-relaxed">
                Untuk keamanan, silakan verifikasi tanggal lahir Anda yang terdaftar pada sistem sebelum melanjutkan pembuatan akun.
              </p>
            </div>

            <BaseInput
              label="Tanggal Lahir"
              type="date"
              v-model="form.birthDate"
              :error="errors.birthDate"
              required
            />
            
            <div class="flex gap-3 mt-4">
              <BaseButton type="button" @click="resetScan" class="flex-1" :class="'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'">
                Kembali
              </BaseButton>
              <BaseButton type="submit" class="flex-[2]">
                Lanjutkan
              </BaseButton>
            </div>

          </form>
        </div>

        <!-- STEP 3: CREATE ACCOUNT -->
        <div v-if="step === 3" class="animate-fade-in w-full">
          <form @submit.prevent="handleRegisterGoogle" class="flex flex-col gap-4">
            
            <template v-if="!linkedEmail">
              <div class="text-center mb-4">
                <h3 class="font-bold text-neutral-800 text-lg mb-1">Tautkan Email Google</h3>
                <p class="text-sm text-neutral-500">Tautkan dengan Google untuk mengatur email resmi akun Anda.</p>
              </div>

              <div class="flex justify-center w-full mt-2">
                <button type="button" @click="handleGoogleLink" class="w-full flex items-center justify-center gap-2 bg-white border border-neutral-300 text-neutral-700 py-3 rounded-xl font-semibold text-sm hover:bg-neutral-50 transition-colors shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-5 h-5">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                  </svg>
                  Tautkan dengan Google
                </button>
              </div>

              <div class="flex gap-3 mt-4">
                <BaseButton type="button" @click="step = 2" class="w-full" :class="'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'">
                  Kembali
                </BaseButton>
              </div>
            </template>

            <template v-else>
              <div class="text-center mb-4">
                <h3 class="font-bold text-neutral-800 text-lg mb-1">Buat Password</h3>
                <p class="text-sm text-neutral-500">Email Anda telah berhasil ditautkan. Silakan buat password baru untuk login aplikasi.</p>
              </div>

              <div class="bg-neutral-50 border border-neutral-200 p-3 rounded-lg flex items-center justify-between mb-2">
                <div class="flex flex-col">
                  <span class="text-xs text-neutral-500 font-semibold mb-1">Email Tertaut (Google)</span>
                  <span class="text-sm font-bold text-neutral-800">{{ linkedEmail }}</span>
                </div>
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5l10 -10"></path></svg>
                </div>
              </div>

              <BaseInput
                label="Password Baru"
                type="password"
                placeholder="Minimal 6 karakter"
                v-model="form.password"
                :error="errors.password"
                required
              />

              <div class="flex gap-3 mt-6">
                <BaseButton type="button" @click="cancelLink" class="flex-1" :class="'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'">
                  Batal
                </BaseButton>
                <BaseButton type="submit" :loading="submitting" class="flex-[2]">
                  Daftar
                </BaseButton>
              </div>
            </template>

          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { Html5Qrcode } from "html5-qrcode";
import { IconLoader2, IconAlertTriangle, IconUpload } from "@tabler/icons-vue";
import BaseInput from "@/components/Basics/BaseInput.vue";
import BaseButton from "@/components/Basics/BaseButton.vue";
import { openModalInfo } from "@/extends/plugins/modal";
import { showToast } from "@/extends/plugins/toast";
import { googleTokenLogin } from "vue3-google-login";
import { useAuthStore } from "@/stores/AuthStore";
import { setUserProfile } from "@/extends/methods/auth";

const router = useRouter();
const authStore = useAuthStore();

const step = ref(1);
const scanning = ref(false);
const submitting = ref(false);
const cameraLoading = ref(true);

const scannedToken = ref("");
const memberData = ref({});
const fileInput = ref(null);

const form = ref({
  birthDate: "",
  email: "",
  password: "",
});

const errors = ref({});

let html5Qrcode = null;

onMounted(() => {
  initScanner();
});

onBeforeUnmount(() => {
  stopScanner();
});

const initScanner = async () => {
  if (html5Qrcode) return;
  
  html5Qrcode = new Html5Qrcode("qr-reader");
  cameraLoading.value = true;
  
  try {
    await html5Qrcode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      onScanSuccess,
      onScanFailure
    );
  } catch (err) {
    console.warn("Gagal membuka kamera:", err);
    // Jika tidak ada kamera (misal di PC), kita biarkan saja, pengguna masih bisa upload.
  } finally {
    cameraLoading.value = false;
  }
};

const stopScanner = async () => {
  if (html5Qrcode && html5Qrcode.isScanning) {
    try {
      await html5Qrcode.stop();
      html5Qrcode.clear();
      html5Qrcode = null;
    } catch (e) {
      console.error(e);
    }
  }
};

const triggerFileUpload = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Stop camera scanning first to avoid conflicts
  if (html5Qrcode && html5Qrcode.isScanning) {
    try {
      await html5Qrcode.stop();
      html5Qrcode.clear();
    } catch (e) {
      console.error("Error stopping camera before file upload:", e);
    }
  }

  if (!html5Qrcode) {
    html5Qrcode = new Html5Qrcode("qr-reader");
  }

  scanning.value = true;
  try {
    const decodedText = await html5Qrcode.scanFile(file, false);
    
    // Lepas state loading sebentar agar onScanSuccess tidak ter-block (karena onScanSuccess mengecek if (scanning.value) return)
    scanning.value = false;
    await onScanSuccess(decodedText, null);
  } catch (err) {
    console.error("File scan error:", err);
    openModalInfo({ 
      message: "Sistem tidak dapat membaca QR Code pada gambar yang diunggah. Pastikan gambar jelas dan tidak terpotong.", 
      type: "error" 
    });
    scanning.value = false;
  } finally {
    // Reset file input so same file can be selected again
    event.target.value = "";
    
    // Restart camera if step is still 1
    if (step.value === 1 && html5Qrcode && !html5Qrcode.isScanning) {
       initScanner();
    }
  }
};

const extractTokenFromUrl = (text) => {
  try {
    const url = new URL(text);
    const parts = url.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1];
  } catch (e) {
    return text;
  }
};

const onScanSuccess = async (decodedText, decodedResult) => {
  if (scanning.value || step.value > 1) return;
  scanning.value = true;
  
  try {
    const token = extractTokenFromUrl(decodedText);
    
    // axios request without expecting data structure wrapped heavily
    const response = await axios.get(`/api/activation/verify/${token}`);
    
    // The response is usually accessed via response.data.data from global interceptor
    const responseData = response.data?.data || response.data;
    
    if (responseData) {
      scannedToken.value = token;
      memberData.value = responseData;
      
      await stopScanner();
      step.value = 2;
    }
  } catch (err) {
    const msg = err.response?.data?.message || "QR Code tidak valid atau terjadi kesalahan server.";
    openModalInfo({ message: msg, type: "error" });
  } finally {
    scanning.value = false;
  }
};

const onScanFailure = (error) => {
  // Ignored
};

const linkedEmail = ref("");
const googleTokenStr = ref("");

const resetScan = () => {
  step.value = 1;
  memberData.value = {};
  scannedToken.value = "";
  form.value = { birthDate: "", email: "", password: "" };
  errors.value = {};
  linkedEmail.value = "";
  googleTokenStr.value = "";
  
  nextTick(() => {
    initScanner();
  });
};

const cancelLink = () => {
  linkedEmail.value = "";
  googleTokenStr.value = "";
  form.value.password = "";
  errors.value = {};
};

const proceedToStep3 = async () => {
  errors.value = {};
  if (!form.value.birthDate) {
    errors.value.birthDate = "Tanggal lahir wajib diisi";
    return;
  }

  try {
    submitting.value = true;
    await axios.post("/api/activation/verify-birthdate", {
      qrToken: scannedToken.value,
      birthDate: form.value.birthDate
    });
    
    // If successful, proceed to step 3
    step.value = 3;
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Tanggal lahir tidak sesuai";
    errors.value.birthDate = errorMsg;
  } finally {
    submitting.value = false;
  }
};

const handleGoogleLink = async () => {
  try {
    const response = await googleTokenLogin();
    const token = response.access_token;
    
    if (token) {
      // Fetch user info using access_token
      const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (userInfoResponse.data && userInfoResponse.data.email) {
        linkedEmail.value = userInfoResponse.data.email;
        googleTokenStr.value = token;
      } else {
        openModalInfo({ message: "Gagal membaca profil Google Anda.", type: "error" });
      }
    } else {
      openModalInfo({ message: "Gagal mendapatkan token dari Google.", type: "error" });
    }
  } catch (e) {
    console.error(e);
    openModalInfo({ message: "Gagal membaca data dari Google. Pastikan Client ID sudah benar atau popup tidak diblokir.", type: "error" });
  }
};

const handleRegisterGoogle = async () => {
  errors.value = {};
  if (!form.value.password || form.value.password.length < 6) {
    errors.value.password = "Password minimal 6 karakter";
    return;
  }

  try {
    submitting.value = true;
    
    let res = await axios.post("/api/activation/register-google", {
      qrToken: scannedToken.value,
      birthDate: form.value.birthDate,
      googleToken: googleTokenStr.value,
      password: form.value.password
    });
    
    if (res.status === 200 || res.data?.success) {
      const responseData = res.data?.data || res.data;
      if (responseData.accessToken) {
        const authData = {
          ...responseData.user,
          access_token: responseData.accessToken,
          refresh_token: responseData.refreshToken,
        };
        authStore.setAuthUser(authData);
        await setUserProfile();
      }
      
      showToast("Berhasil login", "success");
      const role = responseData?.user?.role;
      if (role === "ANGGOTA") {
        router.replace("/dashboard-anggota");
      } else {
        router.replace("/beranda");
      }
    }
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Terjadi kesalahan saat mengaktifkan akun via Google.";
    openModalInfo({ message: errorMsg, type: "error" });
    
    // If error is related to birth date, push back to step 2
    if (errorMsg.toLowerCase().includes('tanggal lahir')) {
      step.value = 2;
      errors.value.birthDate = errorMsg;
    }
  } finally {
    submitting.value = false;
  }
};
</script>

<style>
/* Clean up default video styling */
#qr-reader {
  border: none !important;
  width: 100% !important;
}
#qr-reader video {
  width: 100% !important;
  border-radius: 8px;
  object-fit: cover;
}
</style>
