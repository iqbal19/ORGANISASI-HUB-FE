import { defineStore } from "pinia";
import { set } from "zod";

export const useModalStore = defineStore("modal", {
  state: () => ({
    modalInfo: {
      message: "",
      title: "",
      type: "success",
      withTitle: true,
    },
    modalData: {
      message: "",
      title: "",
      type: "confirm",
      withTitle: true,
      loading: false,
      confirmButtonText: "Konfirmasi",
    },
    myFunction: null,
    deniedFunction: null,
    showModalConfirm: false,
    showModalInfo: false,
    modalPreviewFoto: {
      show: false,
      url: "",
    },
  }),
  getters: {
    getModalData: (state) => state.modalData,
    getModalInfo: (state) => state.modalInfo,
    getModalPreviewFoto: (state) => state.modalPreviewFoto,
  },
  actions: {
    setShowPreviewFoto(payload) {
      this.modalPreviewFoto = { show: true, url: payload };
    },
    setHidePreviewFoto() {
      this.modalPreviewFoto = { show: false, url: "" };
    },
    setModalData(payload) {
      this.modalData = { ...this.modalData, ...payload };
    },
    setModalInfo(payload) {
      this.modalInfo = { ...this.modalInfo, ...payload };
    },
    setLoading(loading) {
      this.modalData.loading = loading;
    },
    setFunction(func) {
      this.myFunction = func;
    },
    setDeniedFunction(func) {
      this.deniedFunction = func;
    },
    openModal(payload) {
      this.setModalData(payload);
      this.showModalConfirm = true;
    },
    closeModal() {
      this.setModalData({
        message: "",
        title: "",
        type: "success",
        withTitle: true,
        loading: false,
        confirmButtonText: "Konfirmasi",
      });
      this.showModalConfirm = false;
    },
    openModalInfo(payload) {
      this.setModalInfo(payload);
      setTimeout(() => {
        this.showModalInfo = true;
      }, 100);
    },
    handleLoading(payload) {
      this.setLoading(payload);
    },
    async saveFunction(func) {
      this.setFunction(func);
    },
    async executeFunction(payload) {
      if (typeof this.myFunction === "function") {
        await this.myFunction(payload);
      } else {
        console.error("No valid function stored in state.");
      }
    },
    async saveDeniedFunction(func) {
      this.setDeniedFunction(func);
    },
    async executeDeniedFunction(payload) {
      if (typeof this.deniedFunction === "function") {
        await this.deniedFunction(payload);
        this.setDeniedFunction(null);
      } else {
        this.showModalConfirm = false;
      }
    },
    closeModalInfo() {
      this.showModalInfo = false;
    },
  },
});
