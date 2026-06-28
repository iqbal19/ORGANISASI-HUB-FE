<template>
  <footer id="kontak" class="dash-footer">
    <div class="dash-footer__container">
      <div class="dash-footer__top">
        <div class="dash-footer__brand">
          <div class="dash-footer__logo">
            <div class="dash-footer__logo-icon">OH</div>
            <span class="dash-footer__logo-text">Organisasi<span class="dash-footer__logo-accent">Hub</span></span>
          </div>
          <p class="dash-footer__brand-desc">
            Membangun ekosistem komunitas yang terintegrasi, transparan, dan berdampak nyata bagi kesejahteraan masyarakat.
          </p>
          <div class="dash-footer__socials">
            <a href="#" class="dash-footer__social" aria-label="Twitter">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" class="dash-footer__social" aria-label="Instagram">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" class="dash-footer__social" aria-label="LinkedIn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
        <div class="dash-footer__links">
          <h4 class="dash-footer__links-title">Platform</h4>
          <a href="#" class="dash-footer__link">Fitur</a>
          <a href="#" class="dash-footer__link">Harga</a>
          <a href="#" class="dash-footer__link">Integrasi</a>
          <a href="#" class="dash-footer__link">Dokumentasi API</a>
        </div>
        <div class="dash-footer__links">
          <h4 class="dash-footer__links-title">Organisasi</h4>
          <a href="#" class="dash-footer__link">Tentang Kami</a>
          <a href="#" class="dash-footer__link">Berita</a>
          <a href="#" class="dash-footer__link">Karir</a>
          <a href="#" class="dash-footer__link">Kontak</a>
        </div>
        <div class="dash-footer__links">
          <h4 class="dash-footer__links-title">Legal</h4>
          <a href="#" class="dash-footer__link">Syarat & Ketentuan</a>
          <a href="#" class="dash-footer__link">Kebijakan Privasi</a>
          <a href="#" class="dash-footer__link">Pusat Bantuan</a>
        </div>
      </div>
      <div class="dash-footer__bottom">
        <p>&copy; {{ new Date().getFullYear() }} Organisasi Hub. Hak cipta dilindungi undang-undang.</p>
        <p class="dash-footer__bottom-made">
          Dibuat dengan
          <svg width="14" height="14" fill="#ef4444" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          untuk komunitas Indonesia
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.dash-footer { background: #0f172a; padding: 80px 0 0; }
.dash-footer__container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
.dash-footer__top {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px;
  padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,.06);
}
.dash-footer__logo { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.dash-footer__logo-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: linear-gradient(135deg, #396fef, #5b8af5);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 800; font-size: 12px;
}
.dash-footer__logo-text { font-size: 20px; font-weight: 800; color: #fff; }
.dash-footer__logo-accent { color: #396fef; }
.dash-footer__brand-desc { color: rgba(255,255,255,.4); font-size: 14px; line-height: 1.7; max-width: 320px; margin-bottom: 20px; }
.dash-footer__socials { display: flex; gap: 10px; }
.dash-footer__social {
  width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,.06);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,.5); text-decoration: none; transition: all .25s;
}
.dash-footer__social:hover { background: #396fef; color: #fff; }
.dash-footer__links-title { color: #fff; font-size: 14px; font-weight: 700; margin-bottom: 18px; }
.dash-footer__link { display: block; color: rgba(255,255,255,.4); font-size: 14px; text-decoration: none; margin-bottom: 12px; transition: color .2s; }
.dash-footer__link:hover { color: #93c5fd; }
.dash-footer__bottom {
  display: flex; justify-content: space-between; align-items: center;
  padding: 24px 0; color: rgba(255,255,255,.25); font-size: 13px;
}
.dash-footer__bottom-made { display: flex; align-items: center; gap: 5px; }
@media (max-width: 768px) {
  .dash-footer__top { grid-template-columns: 1fr; gap: 32px; }
  .dash-footer__bottom { flex-direction: column; gap: 8px; text-align: center; }
}
</style>
