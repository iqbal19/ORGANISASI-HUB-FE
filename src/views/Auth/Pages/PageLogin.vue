<template>
  <div
    class="min-h-screen h-auto flex justify-center items-center"
    :style="{
      backgroundImage: `url(${backgroundLogin})`,
      backgroundSize: 'cover',
    }"
  >
    <div class="flex flex-col w-full max-w-md p-4">
      <div class="flex justify-center gap-3 mb-3">
        <img
          src="@/assets/images/logo.svg"
          alt="logo-organisasi"
          class="w-24 h-24 object-contain"
        />
      </div>
      <form
        class="flex flex-col border w-full border-primary-light p-6 rounded-xl bg-neutral-100/90 backdrop-blur-sm shadow-md"
        @submit.prevent="handleLogin"
      >
        <p class="text-primary text-2xl text-center font-bold mt-2">
          {{ appName }}
        </p>
        <p class="text-neutral-600 text-center text-sm font-normal mb-6">
          Masukkan email dan password untuk mengakses halaman utama
        </p>
        
        <div class="flex flex-col gap-4 mb-6">
          <BaseInput
            label="Email"
            type="text"
            placeholder="Email"
            v-model="form.email"
            :error="errors.email"
          />
          <BaseInput
            label="Password"
            type="password"
            placeholder="Password"
            v-model="form.password"
            :error="errors.password"
          />
        </div>

        <BaseButton type="submit" :loading="loading" class="w-full">
          Masuk
        </BaseButton>

        <div class="mt-6 flex items-center gap-3">
          <div class="flex-1 h-px bg-neutral-200"></div>
          <span class="text-xs text-neutral-400 font-medium uppercase">Atau</span>
          <div class="flex-1 h-px bg-neutral-200"></div>
        </div>

        <div class="flex justify-center w-full mt-4">
          <button type="button" @click="handleGoogleLogin" class="w-full flex items-center justify-center gap-2 bg-white border border-neutral-300 text-neutral-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-neutral-50 transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-5 h-5">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Masuk dengan Google
          </button>
        </div>

        <div class="mt-6 flex items-center gap-3">
          <div class="flex-1 h-px bg-neutral-200"></div>
          <span class="text-xs text-neutral-500 font-medium uppercase">Anggota Terdaftar?</span>
          <div class="flex-1 h-px bg-neutral-200"></div>
        </div>

        <button 
          type="button" 
          @click="router.push('/aktivasi-akun')"
          class="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-qrcode">
            <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M7 17l0 .01"></path>
            <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M7 7l0 .01"></path>
            <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M17 7l0 .01"></path>
            <path d="M14 14l3 0"></path>
            <path d="M20 14l0 3"></path>
            <path d="M14 14l0 3"></path>
            <path d="M14 20l3 0"></path>
            <path d="M17 17l3 0"></path>
            <path d="M20 17l0 3"></path>
          </svg>
          Aktivasi Akun via QR / KTA
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { z } from "zod";
import BaseInput from "@/components/Basics/BaseInput.vue";
import BaseButton from "@/components/Basics/BaseButton.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";
import { setUserProfile } from "@/extends/methods/auth";
import { openModalInfo } from "@/extends/plugins/modal";
import backgroundLogin from "@/assets/images/background-login.svg";
import { googleTokenLogin } from "vue3-google-login";

const authStore = useAuthStore();
const router = useRouter();

const appName = import.meta.env.VITE_NAME_APP;

const form = ref({
  email: "",
  password: "",
});
const errors = ref({
  email: null,
  password: null,
});
const loading = ref(false);

const loginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(1, { message: "Password harus diisi" }),
});

const handleLogin = async () => {
  errors.value = { email: null, password: null };

  try {
    loginSchema.parse(form.value);

    loading.value = true;
    let payload = {
      email: form.value.email,
      password: form.value.password,
    };
    // Menggunakan endpoint real backend
    let response = await axios.post("/api/login", payload);
    if (response.status === 200 || response.data.success) {
      // Data sesungguhnya berada di dalam response.data.data karena global interceptor BE
      const responseData = response.data.data || response.data;
      const authData = {
        ...responseData.user,
        access_token: responseData.accessToken,
        refresh_token: responseData.refreshToken,
      };
      authStore.setAuthUser(authData);
      await setUserProfile();
      const role = responseData?.user?.role || authData.role;
      if (role === "ANGGOTA") {
        router.replace("/dashboard-anggota");
      } else {
        router.replace("/beranda");
      }
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      err.errors.forEach((e) => {
        errors.value[e.path[0]] = e.message;
      });
    } else {
      let errorMsg = err.response?.data?.message || "Terjadi kesalahan pada kredensial.";
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
        errorMsg = err.response.data.errors.join(", ");
      }
      openModalInfo({
        message: errorMsg,
        type: "error",
      });
    }
  } finally {
    loading.value = false;
  }
};

const handleGoogleLogin = async () => {
  try {
    const response = await googleTokenLogin();
    const token = response.access_token;
    
    if (!token) {
      throw new Error("Token Google tidak ditemukan.");
    }

    loading.value = true;
    let payload = {
      googleToken: token,
    };
    
    let res = await axios.post("/api/login/google", payload);
    if (res.status === 200 || res.data.success) {
      const responseData = res.data.data || res.data;
      const authData = {
        ...responseData.user,
        access_token: responseData.accessToken,
        refresh_token: responseData.refreshToken,
      };
      authStore.setAuthUser(authData);
      await setUserProfile();
      const role = responseData?.user?.role || authData.role;
      if (role === "ANGGOTA") {
        router.replace("/dashboard-anggota");
      } else {
        router.replace("/beranda");
      }
    }
  } catch (err) {
    let errorMsg = err.response?.data?.message || "Terjadi kesalahan saat login dengan Google.";
    openModalInfo({
      message: errorMsg,
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>
