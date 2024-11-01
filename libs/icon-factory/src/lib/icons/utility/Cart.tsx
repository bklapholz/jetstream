import * as React from 'react';
function SvgCart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" fill="unset" aria-hidden="true" {...props}>
      <path d="M201 260h239c7 0 14-5 15-12l44-154c3-11-5-20-15-20H115l-6-23c-3-11-13-18-23-18H46c-13 0-25 10-26 23-1 14 11 26 24 26h23l76 257c3 11 12 18 23 18h282c13 0 25-10 26-23 1-14-11-26-24-26H202c-11 0-20-7-23-17v-1c-5-15 7-30 22-30z" />
      <circle cx={206} cy={446} r={40} />
      <circle cx={401} cy={446} r={40} />
    </svg>
  );
}
export default SvgCart;
