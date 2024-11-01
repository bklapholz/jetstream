import * as React from 'react';
function SvgDrafts(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="unset" aria-hidden="true" {...props}>
      <path d="M730 200H410c-33 0-60 27-60 60v10c0 6 4 10 10 10h290c33 0 60 27 60 60v310c0 6 4 10 10 10h10c33 0 60-27 60-60V260c0-33-27-60-60-60zM590 340H270c-33 0-60 27-60 60v340c0 33 27 60 60 60h320c33 0 60-27 60-60V400c0-33-27-60-60-60zM290 440c0-11 9-20 20-20h200c11 0 20 9 20 20v20c0 11-9 20-20 20H310c-11 0-20-9-20-20zm240 260c0 11-9 20-20 20H310c-11 0-20-9-20-20v-20c0-11 9-20 20-20h200c11 0 20 9 20 20zm40-120c0 11-9 20-20 20H310c-11 0-20-9-20-20v-20c0-11 9-20 20-20h240c11 0 20 9 20 20z" />
    </svg>
  );
}
export default SvgDrafts;
