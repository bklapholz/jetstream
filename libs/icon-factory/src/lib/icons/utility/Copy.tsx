import * as React from 'react';
function SvgCopy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" fill="unset" aria-hidden="true" {...props}>
      <path d="M44 2H18a4 4 0 00-4 4v2h24a4 4 0 014 4v28h2a4 4 0 004-4V6a4 4 0 00-4-4z" />
      <path d="M38 16a4 4 0 00-4-4H8a4 4 0 00-4 4v30a4 4 0 004 4h26a4 4 0 004-4V16zm-18 7c0 .6-.4 1-1 1h-8c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v2zm8 16c0 .6-.4 1-1 1H11c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h16c.6 0 1 .4 1 1v2zm4-8c0 .6-.4 1-1 1H11c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h20c.6 0 1 .4 1 1v2z" />
    </svg>
  );
}
export default SvgCopy;
