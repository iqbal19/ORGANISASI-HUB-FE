<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-gray-50">
     <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
  <component v-else :is="landingComponent" :tenant="tenantData" />
</template>

<script setup>
import { ref, onMounted, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import PageDashboard from "@/views/Dashboard/Pages/PageDashboard.vue";
import PageOrgLanding1 from "@/views/OrgLanding/design-1/PageOrgLanding1.vue";
import PageOrgLanding2 from "@/views/OrgLanding/design-2/PageOrgLanding2.vue";
import PageOrgLanding3 from "@/views/OrgLanding/design-3/PageOrgLanding3.vue";
import PageOrgLanding4 from "@/views/OrgLanding/design-4/PageOrgLanding4.vue";
import PageOrgLanding5 from "@/views/OrgLanding/design-5/PageOrgLanding5.vue";
import PageOrgLanding6 from "@/views/OrgLanding/design-6/PageOrgLanding6.vue";

const loading = ref(true);
const landingComponent = shallowRef(null);
const tenantData = ref(null);
const route = useRoute();

onMounted(async () => {
  const hostname = window.location.hostname;
  const slug = route.params.slug;
  
  let domainToResolve = slug || hostname;
  let isMain = false;

  if (hostname === 'organisasihub.com' || hostname === 'www.organisasihub.com') {
    isMain = true;
  }
  
  if (!slug && (hostname === 'localhost' || hostname === '127.0.0.1')) {
    isMain = true;
  }

  if (isMain) {
    landingComponent.value = PageDashboard;
    loading.value = false;
    return;
  }

  try {
    const res = await axios.get(`/api/organizations/public/resolve-tenant?domain=${domainToResolve}`);
    tenantData.value = res.data?.data || res.data;
    
    // Inject CSS Variable or Class for Theme
    if (tenantData.value?.websiteSetting?.primaryColor) {
      document.body.className = tenantData.value.websiteSetting.primaryColor;
    }

    // Set Page Title and Favicon
    if (tenantData.value?.websiteSetting?.siteName) {
      document.title = tenantData.value.websiteSetting.siteName;
    } else {
      document.title = tenantData.value.name;
    }
    
    if (tenantData.value?.logo) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = tenantData.value.logo;
    }

    const themeCode = tenantData.value?.theme?.code || 'DESIGN_1';
    
    if (themeCode === 'DESIGN_1') landingComponent.value = PageOrgLanding1;
    else if (themeCode === 'DESIGN_2') landingComponent.value = PageOrgLanding2;
    else if (themeCode === 'DESIGN_3') landingComponent.value = PageOrgLanding3;
    else if (themeCode === 'DESIGN_4') landingComponent.value = PageOrgLanding4;
    else if (themeCode === 'DESIGN_5') landingComponent.value = PageOrgLanding5;
    else if (themeCode === 'DESIGN_6') landingComponent.value = PageOrgLanding6;
    else landingComponent.value = PageOrgLanding1;

  } catch (error) {
    console.error("Tenant not found", error);
    // If tenant not found, fallback to main dashboard or show error
    landingComponent.value = PageDashboard;
  } finally {
    loading.value = false;
  }
});
</script>
