import * as React from 'react';
function SvgPromptBuilder(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <path
        d="M79.47 41.98c-.86-1.93-2.46-3.32-4.39-3.64-.96-.21-2.03-.32-3.21-.32-6.2 0-13.37 3-18.51 6.53 2.03-4.6 3.1-7.92 1.28-8.66-1.82-.75-3.74 2.14-5.99 6.85-.43-7.27-3.53-16.58-9.09-21.18-.96-.75-2.25-1.18-3.64-1.18-.75 0-1.39.11-2.14.32-1.71.53-3 1.71-3.53 3.21-.11.21-.11.53-.11.75-.32 11.87-2.14 14.66-2.57 17.12s.64 4.49 2.78 5.78c.11.11.86.43 1.71.86-.96-.21-1.82-.32-2.67-.32-2.03 0-3.96.53-5.46 1.5-2.35 1.39-3.85 3.74-3.96 6.31 0 3.85.43 9.09 5.56 11.66.21.11.43.21.64.32.75.32 1.39.32 1.82.32.86 0 1.82-.21 2.67-.64.32-.11.64-.32.96-.53l9.31-6.85c-1.93 5.24-2.67 8.99-2.03 9.31s3-2.67 5.88-7.49c.11 4.28.32 10.38.53 12.2.43 2.78 3.42 4.49 3.42 4.49 1.39.64 2.78.96 4.17.96 2.78 0 5.46-1.28 8.56-4.07 1.82-1.71 2.67-4.28 2.25-7.06-.43-2.67-1.93-5.13-4.39-7.06.53.21.96.43 1.39.64l.64.32c.53.21 1.18.32 1.82.32 1.6 0 3.21-.75 4.17-2.03 0 0 5.35-8.24 11.55-13.05.21-.21.32-.11.53-.53.64-1.07.75-3.42 0-5.13zM34.11 28.29c0-1.5 1.18-2.67 2.67-2.67s2.67 1.18 2.67 2.67-1.18 2.67-2.67 2.67c-1.39 0-2.67-1.18-2.67-2.67zm5.35 10.38c-1.07 0-1.93-.86-1.93-1.93s.86-1.93 1.93-1.93 1.93.86 1.93 1.93-.86 1.93-1.93 1.93zm24.28 10.27c-1.07 0-1.93-.86-1.93-1.93s.86-1.93 1.93-1.93 1.93.86 1.93 1.93c.11 1.07-.86 1.93-1.93 1.93zm8.45-1.82c-1.5 0-2.67-1.18-2.67-2.67s1.18-2.67 2.67-2.67 2.67 1.18 2.67 2.67-1.18 2.67-2.67 2.67z"
        fill="unset"
      />
    </svg>
  );
}
export default SvgPromptBuilder;