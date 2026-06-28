<template>
  <div class="digital-kta bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden" :class="orientation === 'portrait' ? 'aspect-[0.63] w-full max-w-sm mx-auto' : 'aspect-[1.58] w-full'">
    <div class="relative w-full h-full scaled-wrapper">
      <div class="absolute inset-0 transform-origin-top-left" :style="containerStyle">
        <img v-if="backgroundUrl" :src="backgroundUrl" class="absolute inset-0 w-full h-full object-cover" />
        
        <div 
          v-for="el in elements" 
          :key="el.id"
          class="absolute"
          :style="getElementStyle(el)"
        >
          <template v-if="el.type === 'TEXT'">
            <div class="w-full h-full break-words" :style="{ wordBreak: 'break-word' }">{{ getRenderedValue(el) }}</div>
          </template>
          <template v-else-if="el.type === 'PHOTO'">
            <img :src="getRenderedValue(el)" @error="e => e.target.src = getDefaultAvatar()" class="w-full h-full object-cover" :style="{ borderRadius: el.borderRadius + 'px' }" />
          </template>
          <template v-else-if="el.type === 'QR'">
            <img :src="getRenderedValue(el)" class="w-full h-full object-cover" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';

const props = defineProps({
  organization: { type: Object, required: true },
  member: { type: Object, required: true },
  card: { type: Object, required: true },
});

const template = computed(() => props.organization?.ktaTemplate || {});
const orientation = computed(() => template.value.orientation || 'landscape');
const backgroundUrl = computed(() => template.value.front?.background || '');
const elements = computed(() => template.value.front?.elements || []);

// We need to scale the template to fit the responsive container (Designer uses 856x540)
const containerWidth = computed(() => template.value.baseWidth || (orientation.value === 'portrait' ? 540 : 856));
const containerHeight = computed(() => template.value.baseHeight || (orientation.value === 'portrait' ? 856 : 540));

const scale = ref(1);

const updateScale = () => {
  const el = document.querySelector('.scaled-wrapper');
  if (el) {
    const parentWidth = el.clientWidth;
    scale.value = parentWidth / containerWidth.value;
  }
};

onMounted(() => {
  updateScale();
  window.addEventListener('resize', updateScale);
  // Give it a tiny delay to ensure DOM is fully rendered
  setTimeout(updateScale, 50);
});

watch(() => orientation.value, () => {
  setTimeout(updateScale, 50);
});

const containerStyle = computed(() => ({
  width: `${containerWidth.value}px`,
  height: `${containerHeight.value}px`,
  transform: `scale(${scale.value})`,
  transformOrigin: 'top left'
}));

const getElementStyle = (el) => {
  const style = {
    left: el.x + 'px',
    top: el.y + 'px',
    zIndex: 10,
  };
  
  if (el.type === 'TEXT') {
    style.fontSize = `${el.fontSize}px`;
    style.fontFamily = el.fontFamily;
    style.color = el.color;
    style.fontWeight = el.bold ? 'bold' : 'normal';
    style.textTransform = el.uppercase ? 'uppercase' : 'none';
    style.textAlign = el.align;
    style.width = `${el.w}px`;
  } else {
    style.width = `${el.w}px`;
    style.height = `${el.h}px`;
  }
  
  if (el.rotate) {
    style.transform = `rotate(${el.rotate}deg)`;
    style.transformOrigin = 'center';
  }
  
  return style;
};

const getDefaultAvatar = () => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(props.member?.name || 'Member')}&background=random`;
};

const getRenderedValue = (el) => {
  const m = props.member;
  if (el.type === 'PHOTO') return m.photo || getDefaultAvatar();
  if (el.type === 'QR') {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${props.card?.qrToken || m.id}`;
  }
  
  const field = el.field;
  if (!field) return `[${el.label}]`;
  
  if (field === 'memberId') return m.memberId;
  if (field === 'name') return m.name;
  if (field === 'nik') return m.nik;
  if (field === 'email') return m.email;
  if (field === 'phone') return m.phone;
  if (field === 'birthPlace') return m.birthPlace;
  if (field === 'address') return m.address;
  if (field === 'gender') return m.gender === 'M' ? 'Laki-Laki' : 'Perempuan';
  if (field === 'province') return m.province?.name;
  if (field === 'regency') return m.regency?.name;
  if (field === 'district') return m.district?.name;
  if (field === 'position.name') return m.position?.name || '-';
  
  if (field === 'region') return `${m.village?.name || ''} ${m.district?.name || ''} ${m.regency?.name || ''} ${m.province?.name || ''}`.trim() || '-';
  
  if (field === 'birthDate' && m.birthDate) {
    const d = new Date(m.birthDate);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  
  if (field.startsWith('custom_')) {
    const customId = field.replace('custom_', '');
    const customValue = m.customFieldValues?.find(v => v.fieldConfigId === customId);
    return customValue ? customValue.value : '-';
  }
  
  return m[field] || '-';
};
</script>
