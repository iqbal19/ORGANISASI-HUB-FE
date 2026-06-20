/**
 * Memvalidasi apakah input string adalah format email yang sah
 * @param {string} email - Alamat email yang diuji
 * @returns {boolean} True jika format valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

/**
 * Memvalidasi nomor telepon seluler lokal Indonesia
 * Mendukung format: 08..., 628..., +628... dengan panjang 9 s/d 14 karakter.
 * @param {string} phone - String nomor telepon
 * @returns {boolean} True jika format valid
 */
export const isValidIndonesianPhone = (phone) => {
  if (!phone) return false;
  // Regex memvalidasi +628, 628, atau 08 diikuti oleh 7 s/d 11 digit angka
  const regex = /^(?:\+62|62|0)8[1-9][0-9]{7,11}$/;
  return regex.test(phone.replace(/[\s-]/g, "")); // Bersihkan spasi atau tanda hubung sebelum test
};

/**
 * Memvalidasi apakah input string adalah IP Address IPv4 yang sah (berguna untuk sensor IoT/hardware PDAM)
 * @param {string} ip - IP Address
 * @returns {boolean} True jika format IPv4 valid
 */
export const isValidIP = (ip) => {
  if (!ip) return false;
  const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return regex.test(ip);
};
