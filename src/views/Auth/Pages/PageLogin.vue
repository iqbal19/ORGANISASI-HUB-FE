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
    let response = await axios.post("/v1/api/auth/login", payload);
    if (response.status === 200) {
      authStore.setAuthUser(response.data.data);
      await setUserProfile();
      router.replace("/beranda");
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      err.errors.forEach((e) => {
        errors.value[e.path[0]] = e.message;
      });
    } else {
      openModalInfo({
        message: err.response?.data?.meta?.message || "Terjadi kesalahan pada kredensial.",
        type: "error",
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>
