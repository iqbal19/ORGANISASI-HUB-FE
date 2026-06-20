import moment from "moment";
import "moment/locale/id";

// Konfigurasi locale bahasa indonesia untuk moment
moment.locale("id");

/**
 * Memformat angka menjadi nominal Rupiah Indonesia (misal: Rp 150.000)
 * @param {number|string} val - Nilai angka yang ingin diformat
 * @returns {string} String Rupiah terformat
 */
export const formatRupiah = (val) => {
  const number = Number(val);
  if (isNaN(number)) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

/**
 * Memformat angka desimal dengan pemisah ribuan titik dan koma desimal khas Indonesia
 * @param {number|string} val - Nilai angka
 * @param {number} decimals - Jumlah angka di belakang koma (default: 0)
 * @returns {string} Angka terformat
 */
export const formatNumber = (val, decimals = 0) => {
  const number = Number(val);
  if (isNaN(number)) return "0";
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

/**
 * Memformat volume air dalam meter kubik (m3) untuk kebutuhan PDAM (contoh: 24,5 m³)
 * @param {number|string} val - Nilai angka volume air
 * @returns {string} Volume air terformat
 */
export const formatWaterVolume = (val) => {
  return `${formatNumber(val, 1)} m³`;
};

/**
 * Mengubah string tanggal (ISO/Y-m-d) menjadi format penanggalan bahasa Indonesia
 * @param {string|Date} date - Objek Date atau string tanggal
 * @param {boolean} withDay - Jika true, menyertakan nama hari di depan (default: false)
 * @returns {string} Tanggal terformat (contoh: "Sabtu, 20 Juni 2026")
 */
export const formatDateIndo = (date, withDay = false) => {
  if (!date) return "-";
  const format = withDay ? "dddd, D MMMM YYYY" : "D MMMM YYYY";
  return moment(date).format(format);
};

/**
 * Mengubah waktu menjadi format relatif lokal Indonesia (contoh: "3 jam yang lalu", "Kemarin")
 * @param {string|Date} date - Objek Date atau string tanggal
 * @returns {string} Waktu relatif terformat
 */
export const formatRelativeTime = (date) => {
  if (!date) return "-";
  return moment(date).fromNow();
};
