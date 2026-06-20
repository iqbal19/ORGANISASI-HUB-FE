import { useModalStore } from "@/stores/ModalStore";

export const handleConfirm = async (functional) => {
  const modalStore = useModalStore();
  modalStore.saveFunction(async () => {
    handleLoadingConfirm(true);
    await functional.apply(this);
    handleLoadingConfirm(false);
    handleCloseModalConfirm();
  });
};

export const handleDenied = async (functional) => {
  const modalStore = useModalStore();
  modalStore.saveDeniedFunction(async () => {
    handleLoadingConfirm(true);
    await functional.apply(this);
    handleLoadingConfirm(false);
    handleCloseModalConfirm();
  });
};

export const handleLoadingConfirm = (loading) => {
  const modalStore = useModalStore();
  modalStore.handleLoading(loading);
};

export const handleCloseModalConfirm = () => {
  const modalStore = useModalStore();
  modalStore.closeModal();
};

export const openModalConfirm = (data) => {
  const modalStore = useModalStore();
  modalStore.openModal(data);
};

export const openModalInfo = (data) => {
  const modalStore = useModalStore();
  modalStore.openModalInfo(data);
};
