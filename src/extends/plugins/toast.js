import { useToastStore } from "@/stores/ToastStore";

/**
 * Trigger a toast notification.
 * @param {string} message - Message to display
 * @param {'success'|'danger'|'warning'|'info'} type - Type of toast
 * @param {number} duration - Time to show in ms (default 3000ms)
 */
export const showToast = (message, type = "success", duration = 3000) => {
  const toastStore = useToastStore();
  return toastStore.addToast({ message, type, duration });
};
