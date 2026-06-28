<template>
  <div class="kta-designer bg-white border border-neutral-200 rounded-xl shadow-sm flex flex-col h-[800px] overflow-hidden">
    <!-- Header Toolbar -->
    <div class="h-16 border-b border-neutral-200 bg-neutral-50 px-6 flex items-center justify-between shrink-0">
      <div class="flex items-center gap-4">
        <h3 class="font-bold text-neutral-900 text-lg">Desainer KTA</h3>
        
        <div class="flex bg-white border border-neutral-200 rounded-lg p-1">
          <button 
            @click="activeSide = 'front'"
            class="px-4 py-1.5 text-sm font-semibold rounded-md transition-colors"
            :class="activeSide === 'front' ? 'bg-primary text-white shadow-sm' : 'text-neutral-600 hover:bg-neutral-100'"
          >
            Sisi Depan
          </button>
          <button 
            @click="activeSide = 'back'"
            class="px-4 py-1.5 text-sm font-semibold rounded-md transition-colors"
            :class="activeSide === 'back' ? 'bg-primary text-white shadow-sm' : 'text-neutral-600 hover:bg-neutral-100'"
          >
            Sisi Belakang
          </button>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <BaseButton variant="secondary" outline @click="resetTemplate">Reset</BaseButton>
        <BaseButton @click="saveTemplate" :loading="saving">
          <IconDeviceFloppy class="w-4 h-4 mr-2" /> Simpan Desain
        </BaseButton>
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Left Sidebar: Elements & Tools -->
      <div class="w-64 border-r border-neutral-200 bg-white flex flex-col overflow-y-auto">
        <div class="p-4 border-b border-neutral-100">
          <h4 class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Latar Belakang</h4>
          
          <div class="mb-4">
            <label class="block text-xs font-semibold text-neutral-600 mb-1">Orientasi Kanvas</label>
            <div class="flex rounded-md border border-neutral-200 overflow-hidden">
              <button @click="template.orientation = 'landscape'" class="flex-1 py-1.5 text-xs font-bold border-r border-neutral-200 transition-colors" :class="template.orientation === 'landscape' ? 'bg-primary text-white' : 'bg-white text-neutral-500 hover:bg-neutral-50'">Landscape</button>
              <button @click="template.orientation = 'portrait'" class="flex-1 py-1.5 text-xs font-bold transition-colors" :class="template.orientation === 'portrait' ? 'bg-primary text-white' : 'bg-white text-neutral-500 hover:bg-neutral-50'">Portrait</button>
            </div>
          </div>

          <UploadFile
            v-model="backgroundFile"
            :maxFiles="1"
            :maxSize="5000000"
            formatFile=".jpg,.jpeg,.png"
            previewType="image"
            @update:modelValue="onBackgroundChange"
          />
          <p class="text-[10px] text-neutral-500 mt-2">
            Rasio ideal: 
            <span v-if="template.orientation === 'landscape'">856x540 px</span>
            <span v-else>540x856 px</span>
          </p>
        </div>
        
        <div class="p-4 flex-1">
          <h4 class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Tambahkan Elemen</h4>
          <div class="space-y-2">
            <button v-for="el in availableElements" :key="el.id" @click="addElement(el)" class="w-full text-left px-3 py-2 text-sm text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-between group">
              <span>{{ el.label }}</span>
              <IconPlus class="w-4 h-4 text-neutral-400 group-hover:text-primary" />
            </button>
          </div>
        </div>
      </div>

      <!-- Center: Canvas Workspace -->
      <div class="flex-1 bg-neutral-100 relative overflow-hidden flex items-start justify-center pt-12 px-8 pb-12" @click="clearSelection" ref="workspaceRef">
        <!-- Scaling Wrapper -->
        <div class="origin-top transition-transform duration-200" :style="{ transform: `scale(${scaleFactor})` }">
          <!-- The Canvas Wrapper -->
          <div 
            class="canvas-container relative bg-white shadow-xl ring-1 ring-neutral-200 overflow-hidden shrink-0"
            :style="{ 
              width: template.orientation === 'landscape' ? '856px' : '540px', 
              height: template.orientation === 'landscape' ? '540px' : '856px'
            }"
            @click.stop
          >
          <!-- Background Image -->
          <img v-if="currentSideData.background" :src="currentSideData.background" class="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />
          
          <!-- Checkerboard fallback if no bg -->
          <div v-else class="absolute inset-0 z-0 opacity-10 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYNggwEAE+MdIgxowajA4DMDAACgM4MEYxMA0AwNjRkPGAw1kGjRoAQAxZg8FfX4kxgAAAABJRU5ErkJggg==')]"></div>

          <!-- Draggable Elements -->
          <div 
            v-for="el in currentSideData.elements" 
            :key="el.id"
            class="absolute cursor-move z-10 select-none group"
            :class="{ 'ring-2 ring-primary border-transparent': selectedElementId === el.id, 'border border-dashed border-neutral-300 hover:border-primary/50': selectedElementId !== el.id }"
            :style="getElementStyle(el)"
            @mousedown="onDragStart($event, el)"
            @click.stop="selectedElementId = el.id"
          >
            <!-- Render Text -->
            <div v-if="el.type === 'TEXT'" class="w-full h-full break-words" :style="{ wordBreak: 'break-word' }">
              [{{ el.label }}]
            </div>
            
            <!-- Render Image (Photo) -->
            <div v-else-if="el.type === 'PHOTO'" class="w-full h-full bg-neutral-200 flex items-center justify-center overflow-hidden border border-neutral-300" :style="{ borderRadius: el.borderRadius + 'px' }">
              <IconUser class="w-1/2 h-1/2 text-neutral-400" />
            </div>

            <!-- Render QR Code -->
            <div v-else-if="el.type === 'QR'" class="w-full h-full bg-white border border-neutral-300 flex items-center justify-center p-1">
              <IconQrcode class="w-full h-full text-neutral-800" />
            </div>

            <!-- Resize handle (only visible when selected) -->
            <div v-if="selectedElementId === el.id" class="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-white border border-primary rounded-full cursor-se-resize z-20" @mousedown.stop="onResizeStart($event, el)"></div>
          </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar: Properties -->
      <div class="w-72 border-l border-neutral-200 bg-white flex flex-col overflow-y-auto">
        <div v-if="!selectedElement" class="p-8 text-center text-neutral-400">
          <IconPointer class="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p class="text-sm font-medium">Klik elemen di kanvas untuk mengatur propertinya.</p>
        </div>
        
        <div v-else class="p-5 space-y-6">
          <div>
            <h4 class="font-bold text-neutral-900 mb-1 flex items-center justify-between">
              {{ selectedElement.label }}
              <span class="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded">{{ selectedElement.type }}</span>
            </h4>
          </div>

          <!-- Position & Size -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-neutral-600 mb-1">X (px)</label>
              <input type="number" v-model.number="selectedElement.x" class="w-full text-sm border border-neutral-200 rounded px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-neutral-600 mb-1">Y (px)</label>
              <input type="number" v-model.number="selectedElement.y" class="w-full text-sm border border-neutral-200 rounded px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-neutral-600 mb-1">Lebar (px)</label>
              <input type="number" v-model.number="selectedElement.w" class="w-full text-sm border border-neutral-200 rounded px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
            </div>
            <div v-if="['PHOTO', 'QR'].includes(selectedElement.type)">
              <label class="block text-xs font-semibold text-neutral-600 mb-1">Tinggi (px)</label>
              <input type="number" v-model.number="selectedElement.h" class="w-full text-sm border border-neutral-200 rounded px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
            </div>
            <div class="col-span-2 mt-2 border-t border-neutral-100 pt-3">
              <label class="block text-xs font-semibold text-neutral-600 mb-1">Rotasi (Derajat)</label>
              <div class="flex items-center gap-2">
                <input type="range" v-model.number="selectedElement.rotate" min="-180" max="180" class="w-full accent-primary" />
                <input type="number" v-model.number="selectedElement.rotate" class="w-16 text-xs border border-neutral-200 rounded px-1 py-1 text-center focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
              </div>
            </div>
          </div>

          <!-- Text Properties -->
          <div v-if="selectedElement.type === 'TEXT'" class="space-y-4 pt-4 border-t border-neutral-100">
            <div>
              <label class="block text-xs font-semibold text-neutral-600 mb-1">Ukuran Font (px)</label>
              <input type="number" v-model.number="selectedElement.fontSize" class="w-full text-sm border border-neutral-200 rounded px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-neutral-600 mb-1">Jenis Font</label>
              <select v-model="selectedElement.fontFamily" class="w-full text-sm border border-neutral-200 rounded px-2 py-1.5 focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                <option value="Inter, sans-serif">Inter</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Roboto', sans-serif">Roboto</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-neutral-600 mb-1">Warna Teks</label>
              <div class="flex gap-2 items-center">
                <input type="color" v-model="selectedElement.color" class="w-8 h-8 rounded border-0 p-0 cursor-pointer" />
                <input type="text" v-model="selectedElement.color" class="flex-1 text-sm border border-neutral-200 rounded px-2 py-1 uppercase" />
              </div>
            </div>
            <label class="flex items-center gap-2 cursor-pointer mt-2">
              <input type="checkbox" v-model="selectedElement.bold" class="rounded text-primary focus:ring-primary" />
              <span class="text-sm font-medium text-neutral-700">Tebal (Bold)</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="selectedElement.uppercase" class="rounded text-primary focus:ring-primary" />
              <span class="text-sm font-medium text-neutral-700">Huruf Kapital</span>
            </label>
            <div>
              <label class="block text-xs font-semibold text-neutral-600 mb-1 mt-2">Perataan Teks</label>
              <div class="flex rounded-md border border-neutral-200 overflow-hidden">
                <button @click="selectedElement.align = 'left'" class="flex-1 py-1 text-sm font-bold border-r border-neutral-200" :class="selectedElement.align === 'left' ? 'bg-neutral-200 text-neutral-900' : 'bg-white text-neutral-500 hover:bg-neutral-50'">Kiri</button>
                <button @click="selectedElement.align = 'center'" class="flex-1 py-1 text-sm font-bold border-r border-neutral-200" :class="selectedElement.align === 'center' ? 'bg-neutral-200 text-neutral-900' : 'bg-white text-neutral-500 hover:bg-neutral-50'">Tengah</button>
                <button @click="selectedElement.align = 'right'" class="flex-1 py-1 text-sm font-bold" :class="selectedElement.align === 'right' ? 'bg-neutral-200 text-neutral-900' : 'bg-white text-neutral-500 hover:bg-neutral-50'">Kanan</button>
              </div>
            </div>
          </div>

          <!-- Photo Properties -->
          <div v-if="selectedElement.type === 'PHOTO'" class="space-y-4 pt-4 border-t border-neutral-100">
             <div>
              <label class="block text-xs font-semibold text-neutral-600 mb-1">Radius Sudut (Border Radius)</label>
              <input type="range" v-model.number="selectedElement.borderRadius" min="0" max="100" class="w-full accent-primary" />
              <div class="text-right text-xs text-neutral-500">{{ selectedElement.borderRadius }}px</div>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-4 border-t border-neutral-100">
            <BaseButton variant="danger" outline class="w-full justify-center" @click="deleteSelectedElement">
              <IconTrash class="w-4 h-4 mr-2" /> Hapus Elemen
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue';
import axios from '@/extends/plugins/axios';
import BaseButton from '@/components/Basics/BaseButton.vue';
import UploadFile from '@/components/Basics/UploadFile.vue';
import { IconDeviceFloppy, IconPlus, IconUser, IconQrcode, IconPointer, IconTrash } from '@tabler/icons-vue';
import { openModalInfo } from '@/extends/plugins/modal';

const props = defineProps({
  orgId: {
    type: String,
    required: true
  },
  initialTemplate: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['saved']);

const activeSide = ref('front'); // 'front' or 'back'
const saving = ref(false);
const backgroundFile = ref([]);

// KTA Template State
const template = reactive({
  orientation: 'landscape', // 'landscape' or 'portrait'
  front: { background: '', elements: [] },
  back: { background: '', elements: [] }
});

// Load initial
onMounted(() => {
  if (props.initialTemplate) {
    if (props.initialTemplate.orientation) template.orientation = props.initialTemplate.orientation;
    if (props.initialTemplate.front) template.front = JSON.parse(JSON.stringify(props.initialTemplate.front));
    if (props.initialTemplate.back) template.back = JSON.parse(JSON.stringify(props.initialTemplate.back));
  }
  syncBackgroundUploader();
});

// Available elements to add
const availableElements = [
  { id: 'foto', type: 'PHOTO', label: 'Foto Profil', field: 'photo', defaultW: 100, defaultH: 130 },
  { id: 'nama', type: 'TEXT', label: 'Nama Lengkap', field: 'name' },
  { id: 'qr', type: 'QR', label: 'QR Code Profil', field: 'qr', defaultW: 80, defaultH: 80 },
  { id: 'tempat_lahir', type: 'TEXT', label: 'Tempat Lahir', field: 'birthPlace' },
  { id: 'tanggal_lahir', type: 'TEXT', label: 'Tanggal Lahir', field: 'birthDate' },
  { id: 'wilayah', type: 'TEXT', label: 'Wilayah Penempatan', field: 'region' },
  { id: 'nta', type: 'TEXT', label: 'Nomor Anggota (NTA)', field: 'memberId' },
  { id: 'jabatan', type: 'TEXT', label: 'Jabatan', field: 'position.name' },
  { id: 'nik', type: 'TEXT', label: 'NIK', field: 'nik' },
  { id: 'alamat', type: 'TEXT', label: 'Alamat', field: 'address' },
  { id: 'email', type: 'TEXT', label: 'Email', field: 'email' },
  { id: 'telepon', type: 'TEXT', label: 'Telepon', field: 'phone' },
];

const currentSideData = computed(() => template[activeSide.value]);
const selectedElementId = ref(null);
const selectedElement = computed(() => currentSideData.value.elements.find(e => e.id === selectedElementId.value));

// Uploader Sync
watch(activeSide, () => {
  clearSelection();
  syncBackgroundUploader();
});

const syncBackgroundUploader = () => {
  const currentBg = template[activeSide.value].background;
  if (currentBg) {
    backgroundFile.value = [currentBg];
  } else {
    backgroundFile.value = [];
  }
};

const onBackgroundChange = (val) => {
  if (val && val.length > 0) {
    const item = val[0];
    if (typeof item === 'string') {
      template[activeSide.value].background = item;
    } else if (item.base64) {
      template[activeSide.value].background = item.base64;
    } else if (item instanceof File || item instanceof Blob) {
      template[activeSide.value].background = URL.createObjectURL(item);
    } else {
      template[activeSide.value].background = item.url || '';
    }
  } else {
    template[activeSide.value].background = '';
  }
};

// Canvas Interaction Logic
let dragAction = null; // 'MOVE' or 'RESIZE'
let startMouseX = 0;
let startMouseY = 0;
let startElX = 0;
let startElY = 0;
let startElW = 0;
let startElH = 0;

// Scale Logic
const workspaceRef = ref(null);
const scaleFactor = ref(1);

const calculateScale = () => {
  if (!workspaceRef.value) return;
  const paddingWidth = 80; // 40px left/right
  const paddingHeight = 96; // 48px top/bottom
  const availableWidth = workspaceRef.value.clientWidth - paddingWidth;
  const availableHeight = workspaceRef.value.clientHeight - paddingHeight;
  
  const cardWidth = template.orientation === 'landscape' ? 856 : 540;
  const cardHeight = template.orientation === 'landscape' ? 540 : 856;
  
  const scaleX = availableWidth / cardWidth;
  const scaleY = availableHeight / cardHeight;
  
  scaleFactor.value = Math.min(scaleX, scaleY, 1);
};

watch(() => template.orientation, () => {
  setTimeout(calculateScale, 50);
});

const clearSelection = () => {
  selectedElementId.value = null;
};

const addElement = (def) => {
  const newEl = {
    id: `el_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    type: def.type,
    field: def.field,
    label: def.label,
    x: 50,
    y: 50,
  };

  if (def.type === 'TEXT') {
    newEl.fontSize = 18;
    newEl.fontFamily = 'Inter, sans-serif';
    newEl.color = '#000000';
    newEl.bold = false;
    newEl.uppercase = false;
    newEl.align = 'left';
    newEl.w = def.defaultW || 300; // default width for text
    newEl.rotate = 0;
  } else {
    newEl.w = def.defaultW || 100;
    newEl.h = def.defaultH || 100;
    newEl.rotate = 0;
    if (def.type === 'PHOTO') newEl.borderRadius = 0;
  }

  template[activeSide.value].elements.push(newEl);
  selectedElementId.value = newEl.id;
};

const deleteSelectedElement = () => {
  if (selectedElementId.value) {
    const idx = template[activeSide.value].elements.findIndex(e => e.id === selectedElementId.value);
    if (idx !== -1) {
      template[activeSide.value].elements.splice(idx, 1);
      clearSelection();
    }
  }
};

const getElementStyle = (el) => {
  const style = {
    left: `${el.x}px`,
    top: `${el.y}px`,
  };
  
  if (el.type === 'TEXT') {
    style.fontSize = `${el.fontSize}px`;
    style.fontFamily = el.fontFamily;
    style.color = el.color;
    style.fontWeight = el.bold ? 'bold' : 'normal';
    style.textTransform = el.uppercase ? 'uppercase' : 'none';
    style.textAlign = el.align;
    style.width = `${el.w}px`; // ensure text elements also get width
  } else {
    style.width = `${el.w}px`;
    style.height = `${el.h}px`;
  }
  
  if (el.rotate) {
    style.transform = `rotate(${el.rotate}deg)`;
  }
  
  return style;
};

// Mouse Events for Dragging & Resizing
const onDragStart = (event, el) => {
  dragAction = 'MOVE';
  selectedElementId.value = el.id;
  startMouseX = event.clientX;
  startMouseY = event.clientY;
  startElX = el.x;
  startElY = el.y;

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const onResizeStart = (event, el) => {
  dragAction = 'RESIZE';
  startMouseX = event.clientX;
  startMouseY = event.clientY;
  startElW = el.w;
  startElH = el.h;
  
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event) => {
  if (!selectedElement.value) return;

  const dx = (event.clientX - startMouseX) / scaleFactor.value;
  const dy = (event.clientY - startMouseY) / scaleFactor.value;

  if (dragAction === 'MOVE') {
    selectedElement.value.x = startElX + dx;
    selectedElement.value.y = startElY + dy;
  } else if (dragAction === 'RESIZE') {
    const newW = startElW + dx;
    const newH = startElH + dy;
    selectedElement.value.w = newW > 20 ? newW : 20;
    selectedElement.value.h = newH > 20 ? newH : 20;
  }
};

const onMouseUp = () => {
  dragAction = null;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
};
let resizeObserver = null;

onMounted(() => {
  if (workspaceRef.value) {
    resizeObserver = new ResizeObserver(() => {
      calculateScale();
    });
    resizeObserver.observe(workspaceRef.value);
  }
  setTimeout(calculateScale, 100);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  if (resizeObserver) resizeObserver.disconnect();
});

const resetTemplate = () => {
  if (confirm("Yakin ingin menghapus semua desain ini?")) {
    template.orientation = 'landscape';
    template.front = { background: '', elements: [] };
    template.back = { background: '', elements: [] };
    clearSelection();
    syncBackgroundUploader();
  }
};

const saveTemplate = async () => {
  saving.value = true;
  try {
    const payload = {
      ktaTemplate: template
    };
    await axios.patch(`/api/organizations/${props.orgId}`, payload);
    openModalInfo({ message: "Desain KTA berhasil disimpan", type: "success" });
    emit('saved', JSON.parse(JSON.stringify(template)));
  } catch (error) {
    console.error("Gagal menyimpan desain KTA", error);
    openModalInfo({ message: "Terjadi kesalahan saat menyimpan desain.", type: "error" });
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
/* Scoped styles to prevent interference */
</style>
