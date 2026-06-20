<template>
  <div class="w-full">
    <!-- Tab Bar: Line Variant -->
    <div
      v-if="variant === 'line'"
      class="flex border-b border-[#DFEEFF] w-full"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="flex items-center px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-[1px] select-none"
        :class="[
          activeTab === tab.id
            ? 'border-primary text-primary font-bold'
            : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-200'
        ]"
        @click="$emit('update:activeTab', tab.id)"
      >
        <!-- Icon slot or prop -->
        <component
          v-if="tab.icon"
          :is="tab.icon"
          class="w-4 h-4 mr-2"
          :class="activeTab === tab.id ? 'text-primary' : 'text-neutral-400'"
        />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Tab Bar: Pills Variant -->
    <div
      v-else-if="variant === 'pills'"
      class="flex flex-wrap gap-2 p-1 bg-neutral-100/80 rounded-xl w-fit"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="flex items-center px-4 py-2 text-xs font-semibold transition-all select-none rounded-lg"
        :class="[
          activeTab === tab.id
            ? 'bg-white text-primary shadow-sm'
            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
        ]"
        @click="$emit('update:activeTab', tab.id)"
      >
        <!-- Icon slot or prop -->
        <component
          v-if="tab.icon"
          :is="tab.icon"
          class="w-3.5 h-3.5 mr-1.5"
          :class="activeTab === tab.id ? 'text-primary' : 'text-neutral-500'"
        />
        <span>{{ tab.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    validator: (value) =>
      value.every((tab) => Object.prototype.hasOwnProperty.call(tab, "id") && Object.prototype.hasOwnProperty.call(tab, "label")),
  },
  activeTab: {
    type: [String, Number],
    required: true,
  },
  variant: {
    type: String,
    default: "line",
    validator: (value) => ["line", "pills"].includes(value),
  },
});

defineEmits(["update:activeTab"]);
</script>

<style scoped></style>
