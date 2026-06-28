const fs = require('fs');
const path = '/Users/mac/Documents/My Project/SASAKTI/ORGANISASI-HUB-FE/src/views/Organization/Components/KtaDesigner.vue';
let content = fs.readFileSync(path, 'utf8');

// Replace onMounted and onUnmounted to use ResizeObserver
const oldHooks = `// Cleanup listeners if component unmounts while dragging
onMounted(() => {
  window.addEventListener('resize', calculateScale);
  setTimeout(calculateScale, 100);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('resize', calculateScale);
});`;

const newHooks = `// ResizeObserver for dynamic scaling
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
});`;

if (content.includes('window.addEventListener(\'resize\', calculateScale)')) {
  content = content.replace(oldHooks, newHooks);
  
  // Let's also increase the padding so the margins are more obvious
  content = content.replace('const padding = 64; // p-8 on both sides', 'const padding = 96; // ensure visible margins');
  
  fs.writeFileSync(path, content);
  console.log('Patched KtaDesigner.vue successfully');
} else {
  console.log('Hooks not found!');
}
