import { saveAs } from "file-saver";

/**
 * Mengunduh objek Blob biner menjadi sebuah file di lokal peramban menggunakan file-saver
 * @param {Blob|File} blob - Data biner file
 * @param {string} filename - Nama file keluaran (misal: "laporan.pdf")
 */
export const downloadBlob = (blob, filename) => {
  if (!blob) return;
  saveAs(blob, filename);
};

/**
 * Mengonversi string Base64 kembali menjadi objek File (File Object) standar HTML5.
 * Sangat berguna ketika mengunggah kembali berkas yang telah dikonversi ke Base64 ke server.
 * @param {string} base64String - String base64 lengkap (mendukung skema data:...)
 * @param {string} filename - Nama file tujuan
 * @returns {File} Objek File yang siap di-upload
 */
export const base64ToFile = (base64String, filename) => {
  if (!base64String) return null;
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

/**
 * Mendapatkan ekstensi file dari nama berkas secara aman
 * @param {string} filename - Nama berkas (misal: "dokumen.penting.pdf")
 * @returns {string} Ekstensi file (misal: "pdf", mengembalikan "" jika tidak ada ekstensi)
 */
export const getFileExtension = (filename) => {
  if (!filename) return "";
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
};
