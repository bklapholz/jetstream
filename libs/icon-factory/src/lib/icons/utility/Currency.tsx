import * as React from 'react';
function SvgCurrency(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" fill="unset" aria-hidden="true" {...props}>
      <path d="M451 109H69c-24 0-44 20-44 44v213c0 24 20 44 44 44h382c24 0 44-20 44-44V154c0-25-20-45-44-45zM120 366c0-29-23-51-51-51V205c29 0 51-23 51-51h280c0 29 23 51 51 51v110c-29 0-51 23-51 51H120z" />
      <circle cx={260} cy={256} r={73} />
    </svg>
  );
}
export default SvgCurrency;
