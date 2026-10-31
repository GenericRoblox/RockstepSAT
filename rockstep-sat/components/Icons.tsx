import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 20): SVGProps<SVGSVGElement> => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true,
});

export const Flame = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 2c.6 3.2 2.5 4.9 4 6.8 1.4 1.8 2 3.4 2 5.2A6 6 0 0 1 6 14c0-2.1 1-3.8 2.4-5 .2 1.6 1 2.7 2.2 3.2C10 9 10.5 5.2 12 2Z" fill="currentColor" />
    <path d="M12 21a3 3 0 0 1-3-3c0-1.4 1-2.4 2-3.4.2 1 .8 1.6 1.6 1.9.6-.7.9-1.5 1-2.5 1 1 1.4 2.4 1.4 4A3 3 0 0 1 12 21Z" fill="var(--flame-core)" />
  </svg>
);
export const Snow = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 2v20M3.3 7l17.4 10M20.7 7 3.3 17M9 4l3 2.5L15 4M9 20l3-2.5 3 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Chalk = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M7 6h10l1.5 13.2A2 2 0 0 1 16.5 21h-9a2 2 0 0 1-2-1.8L7 6Z" fill="currentColor" />
    <path d="M6 3.5h12V6H6z" fill="currentColor" opacity=".55" />
    <circle cx="12" cy="13" r="2.4" fill="var(--panel)" />
  </svg>
);
export const Check = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Close = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
);
export const Lock = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="2.4" />
  </svg>
);
export const Flag = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6 21V4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M6 4.5h11l-2.5 3.8L17 12H6z" fill="currentColor" />
  </svg>
);
export const Skip = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M5 6l7 6-7 6zM13 6l7 6-7 6z" fill="currentColor" /></svg>
);
export const Clock = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.2" />
    <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
export const Mountain = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M2.5 20 9 8.5l3.5 5.5L15 10l6.5 10z" fill="currentColor" />
    <path d="M9 8.5 10.8 11.6 9 11l-1.4 1z" fill="var(--panel)" />
  </svg>
);
export const Chart = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
export const Gear = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" stroke="currentColor" strokeWidth="2.2" />
    <path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-2.6-1.5L14 2.5h-4l-.4 2.5A7.5 7.5 0 0 0 7 6.5l-2.4-1-2 3.4 2 1.6a7.6 7.6 0 0 0 0 3l-2 1.6 2 3.4 2.4-1a7.5 7.5 0 0 0 2.6 1.5l.4 2.5h4l.4-2.5a7.5 7.5 0 0 0 2.6-1.5l2.4 1 2-3.4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
export const Spark = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 2.5 14 10l7.5 2-7.5 2-2 7.5-2-7.5-7.5-2L10 10z" fill="currentColor" /></svg>
);
