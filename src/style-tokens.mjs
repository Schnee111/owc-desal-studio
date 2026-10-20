// Conservative restyle of the original cross-section. Geometry and choreography
// remain in s1–s6.html and engine.js; this palette adapter also migrates the
// original embedded SVG colors. No CSS filters or rendered-output patches.
export const colors = {
 '#0A0E14':'#F4EFE4', '#E8EEF4':'#293F3D', '#2B78B8':'#367B86',
 '#4E9BDB':'#32727D', '#FF9F1C':'#A64F32', '#FFD23F':'#A64F32',
 '#9BEAFF':'#3F6D79', '#5CC8FF':'#286B75', '#8FA89A':'#676953',
 '#18212D':'#C8C7B9', '#0F151D':'#DED4BD', '#121A26':'#E5E2D5',
 '#0E1520':'#D7DBCE', '#0F1621':'#E4E5D8', '#0D131B':'#F4EFE4',
 '#BFE3FF':'#F4EFE4', '#FFF6C9':'#A64F32',
};
export function recolor(source){
 return source.replace(/#[0-9a-f]{6}\b/gi,hex=>colors[hex.toUpperCase()]||hex)
  .replaceAll('rgba(10, 14, 20, 0.9)','rgba(244, 239, 228, 0.96)')
  .replaceAll('rgba(10, 14, 20, 0.86)','rgba(244, 239, 228, 0.96)')
  .replaceAll('rgba(18,26,38,0.55)','#E5E2D5')
  .replaceAll('rgba(14,20,30,0.92)','#F4EFE4')
  .replaceAll('rgba(255,210,63,0.06)','#E8E2D2')
  .replace(/\bInter\b/g,"'Source Sans 3'")
  .replace(/\bMontserrat\b/g,'Literata')
  .replaceAll('IBM Plex Mono','Source Sans 3');
}
