<template>
  <div id="print-area" class="print-only">
    <!-- PVC Layout (A4 size with multiple cards) -->
    <div v-if="printType === 'pvc'" class="print-page pvc-layout">
      <div v-for="(pageChunk, pageIdx) in chunkedOrders" :key="'pvc-page-' + pageIdx" class="a4-page">
        <div class="cards-grid">
          <div v-for="order in pageChunk" :key="'order-' + order.id" class="card-item">
            <!-- Front -->
            <div class="physical-card front-card" :class="getOrientation(order.organization.ktaTemplate)">
              <!-- Plunge Marks for Bleed -->
              <div class="plong-mark tl"></div>
              <div class="plong-mark tr"></div>
              <div class="plong-mark bl"></div>
              <div class="plong-mark br"></div>
              
              <div class="scaled-content" :style="getContainerStyle(order.organization.ktaTemplate)">
                <img v-if="order.organization.ktaTemplate?.front?.background" :src="order.organization.ktaTemplate.front.background" class="absolute inset-0 w-full h-full object-cover" />
                <div 
                  v-for="el in order.organization.ktaTemplate?.front?.elements || []" 
                  :key="el.id"
                  class="absolute"
                  :style="getElementStyle(el)"
                >
                  <template v-if="el.type === 'TEXT'">
                    <div class="w-full h-full break-words" :style="{ wordBreak: 'break-word' }">{{ getRenderedValue(el, order.member) }}</div>
                  </template>
                  <template v-else-if="el.type === 'PHOTO'">
                    <img :src="getRenderedValue(el, order.member)" @error="e => e.target.src = getDefaultAvatar(order.member)" class="w-full h-full object-cover" :style="{ borderRadius: el.borderRadius + 'px' }" />
                  </template>
                  <template v-else-if="el.type === 'QR'">
                    <img :src="getRenderedValue(el, order.member)" class="w-full h-full object-cover" />
                  </template>
                </div>
              </div>
            </div>
            
            <!-- Back -->
            <div class="physical-card back-card" :class="getOrientation(order.organization.ktaTemplate)">
              <!-- Plunge Marks for Bleed -->
              <div class="plong-mark tl"></div>
              <div class="plong-mark tr"></div>
              <div class="plong-mark bl"></div>
              <div class="plong-mark br"></div>
              
              <div class="scaled-content" :style="getContainerStyle(order.organization.ktaTemplate)">
                <img v-if="order.organization.ktaTemplate?.back?.background" :src="order.organization.ktaTemplate.back.background" class="absolute inset-0 w-full h-full object-cover" />
                <div 
                  v-for="el in order.organization.ktaTemplate?.back?.elements || []" 
                  :key="el.id"
                  class="absolute"
                  :style="getElementStyle(el)"
                >
                  <template v-if="el.type === 'TEXT'">
                    <div class="w-full h-full break-words" :style="{ wordBreak: 'break-word' }">{{ getRenderedValue(el, order.member) }}</div>
                  </template>
                  <template v-else-if="el.type === 'PHOTO'">
                    <img :src="getRenderedValue(el, order.member)" @error="e => e.target.src = getDefaultAvatar(order.member)" class="w-full h-full object-cover" :style="{ borderRadius: el.borderRadius + 'px' }" />
                  </template>
                  <template v-else-if="el.type === 'QR'">
                    <img :src="getRenderedValue(el, order.member)" class="w-full h-full object-cover" />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- E-Money Layout (CR80 specific size per page, 1 per page) -->
    <div v-else class="print-page emoney-layout">
      <template v-for="order in orders" :key="'emoney-' + order.id">
        <!-- Front Page -->
        <div class="cr80-wrapper">
          <div class="cr80-page physical-card" :class="getOrientation(order.organization.ktaTemplate)">
            <div class="scaled-content" :style="getContainerStyle(order.organization.ktaTemplate)">
              <img v-if="order.organization.ktaTemplate?.front?.background" :src="order.organization.ktaTemplate.front.background" class="absolute inset-0 w-full h-full object-cover" />
              <div 
                v-for="el in order.organization.ktaTemplate?.front?.elements || []" 
                :key="el.id"
                class="absolute"
                :style="getElementStyle(el)"
              >
                <template v-if="el.type === 'TEXT'">
                  <div class="w-full h-full break-words" :style="{ wordBreak: 'break-word' }">{{ getRenderedValue(el, order.member) }}</div>
                </template>
                <template v-else-if="el.type === 'PHOTO'">
                  <img :src="getRenderedValue(el, order.member)" @error="e => e.target.src = getDefaultAvatar(order.member)" class="w-full h-full object-cover" :style="{ borderRadius: el.borderRadius + 'px' }" />
                </template>
                <template v-else-if="el.type === 'QR'">
                  <img :src="getRenderedValue(el, order.member)" class="w-full h-full object-cover" />
                </template>
              </div>
            </div>
          </div>
        </div>
        <!-- Back Page -->
        <div class="cr80-wrapper" v-if="order.organization.ktaTemplate?.back?.background || (order.organization.ktaTemplate?.back?.elements && order.organization.ktaTemplate?.back?.elements.length > 0)">
          <div class="cr80-page physical-card" :class="getOrientation(order.organization.ktaTemplate)">
            <div class="scaled-content" :style="getContainerStyle(order.organization.ktaTemplate)">
              <img v-if="order.organization.ktaTemplate?.back?.background" :src="order.organization.ktaTemplate.back.background" class="absolute inset-0 w-full h-full object-cover" />
              <div 
                v-for="el in order.organization.ktaTemplate?.back?.elements || []" 
                :key="el.id"
                class="absolute"
                :style="getElementStyle(el)"
              >
                <template v-if="el.type === 'TEXT'">
                  <div class="w-full h-full break-words" :style="{ wordBreak: 'break-word' }">{{ getRenderedValue(el, order.member) }}</div>
                </template>
                <template v-else-if="el.type === 'PHOTO'">
                  <img :src="getRenderedValue(el, order.member)" @error="e => e.target.src = getDefaultAvatar(order.member)" class="w-full h-full object-cover" :style="{ borderRadius: el.borderRadius + 'px' }" />
                </template>
                <template v-else-if="el.type === 'QR'">
                  <img :src="getRenderedValue(el, order.member)" class="w-full h-full object-cover" />
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps({
  orders: {
    type: Array,
    required: true
  },
  printType: {
    type: String,
    default: 'pvc' // 'pvc' or 'emoney'
  }
});

const emit = defineEmits(['ready']);

// Utility to chunk array into groups of 4 (for PVC layout)
const chunkedOrders = computed(() => {
  const result = [];
  for (let i = 0; i < props.orders.length; i += 4) {
    result.push(props.orders.slice(i, i + 4));
  }
  return result;
});

const getContainerStyle = (template) => {
  const orientation = template?.orientation || 'landscape';
  return {
    width: orientation === 'landscape' ? '856px' : '540px',
    height: orientation === 'landscape' ? '540px' : '856px',
  };
};

const getOrientation = (template) => {
  return template?.orientation || 'landscape';
};

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
  }
  
  return style;
};

const getDefaultAvatar = (member) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(member?.name || 'Member')}&background=e2e8f0&color=475569&size=300`;
};

// Extractor logic
const getRenderedValue = (el, member) => {
  if (el.type === 'PHOTO') return member.photo || getDefaultAvatar(member);
  if (el.type === 'QR') {
    const qrText = (member.cards && member.cards.length > 0) ? member.cards[0].qrToken : member.id;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrText}`;
  }
  
  const field = el.field;
  if (!field) return `[${el.label}]`;
  
  // Specific mappings
  if (field === 'position.name') return member.position?.name || '-';
  if (field === 'region') return `${member.village?.name || ''} ${member.district?.name || ''} ${member.regency?.name || ''} ${member.province?.name || ''}`.trim() || '-';
  if (field === 'birthDate' && member.birthDate) {
    const d = new Date(member.birthDate);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  
  return member[field] || '-';
};

onMounted(() => {
  // Let the DOM update and images render, then emit ready
  setTimeout(() => {
    emit('ready');
  }, 1000);
});
</script>

<style>
/* Base print layout - visible on screen for debug but hidden in production */
.print-only {
  position: relative;
  width: 100%;
}

/* PVC A4 Layout */
.pvc-layout .a4-page {
  page-break-after: always;
  width: 200mm; /* Standard PVC inkjet sheet width */
  min-height: 300mm; /* Standard PVC inkjet sheet height */
  padding: 5mm;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #ccc;
  margin: 0 auto 20px auto;
}

.pvc-layout .a4-page:last-child {
  page-break-after: auto;
}

.cards-grid {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  column-gap: 5mm;
  row-gap: 8mm;
}

.card-item {
  display: contents;
}

/* Physical Card Dimensions (Base config shared by PVC and EMoney) */
.physical-card {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fff;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* PVC Specific override */
.pvc-layout .physical-card {
  width: 91.6mm;
  height: 60.0mm;
}

/* Inner Plunge Marks strictly inside the bleed area */
.plong-mark {
  position: absolute;
  border: 2px solid #000; /* Tebal agar mudah dilihat */
  z-index: 50;
  pointer-events: none;
}
.plong-mark.tl { top: 0; left: 0; width: 3mm; height: 3mm; border-top: none; border-left: none; }
.plong-mark.tr { top: 0; right: 0; width: 3mm; height: 3mm; border-top: none; border-right: none; }
.plong-mark.bl { bottom: 0; left: 0; width: 3mm; height: 3mm; border-bottom: none; border-left: none; }
.plong-mark.br { bottom: 0; right: 0; width: 3mm; height: 3mm; border-bottom: none; border-right: none; }

/* 
  Scale internal canvas to fill the new bleed dimensions.
  Scale factor = 0.41994 (covers 60.0mm height, safely crops tiny extra left/right)
*/
.scaled-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
}

.physical-card.landscape .scaled-content {
  transform: translate(-50%, -50%) scale(0.41994);
}

.physical-card.portrait.front-card .scaled-content {
  transform: translate(-50%, -50%) scale(0.41994) rotate(90deg);
}

.physical-card.portrait.back-card .scaled-content {
  transform: translate(-50%, -50%) scale(0.41994) rotate(-90deg);
}

/* E-Money CR80 Layout */
.emoney-layout {
  display: block;
}

.cr80-wrapper {
  page-break-after: always;
  margin: 0 auto 20px auto;
  display: block;
}

.emoney-layout .cr80-wrapper:last-child {
  page-break-after: auto;
}

.emoney-layout .cr80-page {
  /* Inherits .physical-card properties */
  margin: 0 auto;
  padding: 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.emoney-layout .cr80-page.landscape {
  width: 85.6mm;
  height: 54.0mm;
}

.emoney-layout .cr80-page.portrait {
  width: 54.0mm;
  height: 85.6mm;
}

/* E-Money scaling using zoom to bypass Chrome transform bugs */
.emoney-layout .scaled-content {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
  zoom: 0.37795;
}

.emoney-layout .cr80-page.landscape .scaled-content {
  transform: none;
}

.emoney-layout .cr80-page.portrait .scaled-content {
  transform: none;
}

/* Print-specific overrides */
@media print {
  body {
    background-color: transparent !important;
  }
  .cr80-wrapper {
    margin: 0 !important;
  }
  .emoney-layout .cr80-page {
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
  }
  .pvc-layout .a4-page {
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
  }
}

/* Hide on screen
@media screen {
  .print-only {
    display: none;
  }
}
*/
</style>
