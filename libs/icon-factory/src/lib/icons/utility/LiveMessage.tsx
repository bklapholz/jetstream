import * as React from 'react';
function SvgLiveMessage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" fill="unset" aria-hidden="true" {...props}>
      <path d="M460 20H220a40 40 0 00-40 40v1a190 190 0 0196 38h148c8 0 16 8 16 16v270c0 8-8 14-16 14H254c-8 0-14-6-14-14v-1l-2-3c-17 8-36 13-55 15-2 2-3 4-3 9v54a40 40 0 0039 40h240c22 0 41-18 41-40V60a40 40 0 00-40-40zM340 480c-17 0-30-13-30-30s13-30 30-30 30 13 30 30-13 30-30 30zM20 229c0 71 63 128 139 129 27 0 52-7 73-19 4-2 7-2 10-1l50 19c5 1 9-3 8-8l-18-50c-1-4-1-7 1-10 11-19 17-40 17-62 0-70-62-127-140-127-77 0-139 57-140 129z" />
    </svg>
  );
}
export default SvgLiveMessage;
