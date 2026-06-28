const fs = require('fs');

const files = [
  'src/views/OrgLanding/design-1/PageOrgLanding1.vue',
  'src/views/OrgLanding/design-2/PageOrgLanding2.vue',
  'src/views/OrgLanding/design-3/PageOrgLanding3.vue'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('import { computed } from')) {
    content = content.replace("import { ref, onMounted, onUnmounted } from 'vue'", "import { ref, onMounted, onUnmounted, computed } from 'vue'");
  }
  
  // Replace the org object
  content = content.replace(/const org = \{\n[\s\S]*?\}\n/, `const props = defineProps(['tenant'])
const org = computed(() => {
  return {
    name: props.tenant?.websiteSetting?.siteName || props.tenant?.name || 'Organisasi Default',
    tagline: props.tenant?.websiteSetting?.tagline || 'Tagline organisasi anda di sini',
    desc: props.tenant?.websiteSetting?.about || 'Deskripsi singkat mengenai organisasi ini.',
    about: props.tenant?.websiteSetting?.about || 'Deskripsi lengkap tentang organisasi ini akan ditampilkan di sini.',
    address: props.tenant?.address || 'Alamat Organisasi'
  }
})
`);
  
  fs.writeFileSync(file, content);
}
console.log('Done patching.');
