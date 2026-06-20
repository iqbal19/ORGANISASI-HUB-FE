<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-3xl"
  >
    <template #header>
      <p class="text-xl font-bold text-neutral-900">Ubah User</p>
    </template>
    <template #body>
      <form @submit.prevent="handleSave">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput
            label="Nama Lengkap"
            type="text"
            placeholder="Nama Lengkap"
            v-model="form.nama"
            :error="errors.nama"
          />
          <BaseInput
            label="Email"
            type="email"
            placeholder="@gmail.com"
            v-model="form.email"
            :error="errors.email"
          />
          <BaseInput
            label="Username"
            type="text"
            placeholder="Username"
            v-model="form.username"
            :error="errors.username"
          />
          <div>
            <BaseInput
              label="Password"
              type="password"
              placeholder="Password"
              v-model="form.password"
              :error="errors.password"
            />
            <p class="text-[11px] text-neutral-500 font-medium mt-1">
              Isi apabila password akan diubah
            </p>
          </div>
          <div>
            <BaseInput
              label="Konfirmasi Password"
              type="password"
              placeholder="Konfirmasi password"
              v-model="form.confirm_password"
              :error="errors.confirm_password"
            />
            <p class="text-[11px] text-neutral-500 font-medium mt-1">
              Isi apabila password akan diubah
            </p>
          </div>
          <div>
            <label for="role" class="text-sm font-semibold text-neutral-800 mb-1 block">Role</label>
            <SingleSelect
              :list="refRole"
              :selectedItem="form.role"
              @update:selected="(selected) => (form.role = selected)"
              labelKey="label"
            />
            <span class="text-xs text-danger font-medium mt-1 block" v-if="errors.role">
              {{ errors.role }}
            </span>
          </div>
        </div>

        <div class="flex justify-end mt-7 items-center gap-3">
          <BaseButton
            variant="primary"
            outline
            :disabled="loading"
            @click="handleCloseModal"
          >
            Batal
          </BaseButton>
          <BaseButton type="submit" :loading="loading">
            Simpan
          </BaseButton>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script setup>
import BaseInput from "@/components/Basics/BaseInput.vue";
import BaseButton from "@/components/Basics/BaseButton.vue";
import Modal from "@/components/Basics/Modal.vue";
import { defineProps, defineEmits, ref, watch } from "vue";
import {
  openModalInfo,
} from "@/extends/plugins/modal";
import { z } from "zod";
import axios from "axios";
import SingleSelect from "@/components/Basics/SingleSelect.vue";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["closeModal", "refresh"]);

const schema = z
  .object({
    nama: z
      .string()
      .min(3, "Nama harus memiliki setidaknya 3 karakter")
      .max(50, "Nama maksimal 50 karakter"),
    email: z.string().email("Email tidak valid"),
    username: z
      .string()
      .min(6, "Username harus memiliki setidaknya 6 karakter")
      .max(20, "Username maksimal 20 karakter"),
    password: z
      .string()
      .min(6, "Password harus memiliki setidaknya 6 karakter")
      .optional()
      .or(z.literal("")),
    confirm_password: z
      .string()
      .min(6, "Konfirmasi password harus memiliki setidaknya 6 karakter")
      .optional()
      .or(z.literal("")),
    role: z.any().refine((role) => role, "Role harus terisi"),
  })
  .refine(
    (data) => {
      if (data.password && data.confirm_password) {
        return data.password === data.confirm_password;
      }
      return true;
    },
    {
      message: "Password dan konfirmasi password harus sama",
      path: ["confirm_password"],
    }
  );

const form = ref({
  nama: "",
  email: "",
  username: "",
  password: "",
  confirm_password: "",
  role: null,
});
const refRole = ref([
  { id: "ADMIN_APLIKASI", label: "Super Admin" },
  { id: "ADMIN", label: "Staff" },
]);
const errors = ref({});
const loading = ref(false);
const loadingFetch = ref(false);

const getDetail = async () => {
  try {
    loadingFetch.value = true;
    let response = await axios.get(`/v1/api/user/${props.data.id}`);
    if (response.status === 200) {
      form.value.nama = response.data.data.nama;
      form.value.email = response.data.data.email;
      form.value.username = response.data.data.username;
      form.value.role = refRole.value.find(
        (role) => role.id === response.data.data.role
      );
    }
  } catch (e) {
    console.error(e);
  } finally {
    loadingFetch.value = false;
  }
};

const handleSave = async () => {
  errors.value = {};

  try {
    schema.parse(form.value);
    loading.value = true;
    let payload = {
      nama: form.value.nama,
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
      role: form.value.role.id,
    };
    let response = await axios.put(`/v1/api/user/${props.data.id}`, payload);
    if (response.status === 200) {
      emit("refresh");
      handleCloseModal();
      openModalInfo({
        message: "Berhasil disimpan",
        type: "success",
      });
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      e.errors.forEach((err) => {
        errors.value[err.path[0]] = err.message;
      });
    } else {
      console.error(e);
    }
  } finally {
    loading.value = false;
  }
};

const handleCloseModal = () => {
  form.value = {
    nama: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    role: null,
  };
  errors.value = {
    nama: null,
    email: null,
    username: null,
    password: null,
    confirm_password: null,
    role: null,
  };
  emit("closeModal");
};

watch(
  () => props.data,
  (newData, oldData) => {
    if (newData && newData.id) {
      getDetail();
    }
  },
  { immediate: true }
);
</script>
