// src/components/CircleDiagram.tsx
import { component$ } from '@builder.io/qwik';
import styles from './circlediagram.module.css';

interface CircleDiagramProps {
  borderColor: string;
  gradientStart: string;
  gradientEnd: string;
  gradientAngle?: string;
  opacity?: number;
  value: number;
  label: string;
}

interface ServerStats {
  pterodactylServerCount: number;
  pterodactylTotalRam: string;
  discordMemberCount: number;
}

export const CircleDiagram = component$<CircleDiagramProps>(({ borderColor, gradientStart, gradientEnd, gradientAngle = 'to right', opacity = 1, value, label }) => {

  // Convert hex color to RGB format
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return [bigint >> 16 & 255, bigint >> 8 & 255, bigint & 255];
  };

  // Get RGB values for gradient start and end colors
  const startRgb = hexToRgb(gradientStart);
  const endRgb = hexToRgb(gradientEnd);

  return (
    <div
      class={styles.circle}
      style={{
        '--border-color': borderColor,
        '--circle-gradient-start-rgb': `${startRgb[0]}, ${startRgb[1]}, ${startRgb[2]}`,
        '--circle-gradient-end-rgb': `${endRgb[0]}, ${endRgb[1]}, ${endRgb[2]}`,
        '--gradient-angle': gradientAngle,
        '--gradient-opacity': opacity,
        '--value': value,
      } as any}
    >
      <div class={styles.label}>{label}</div>
      <div class={styles.value}></div>
    </div>
  );
});