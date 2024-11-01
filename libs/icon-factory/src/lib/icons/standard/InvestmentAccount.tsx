import * as React from 'react';
function SvgInvestmentAccount(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="unset" aria-hidden="true" {...props}>
      <path d="M740 270H260c-33 0-60 27-60 60v340c0 33 27 60 60 60h480c33 0 60-27 60-60V330c0-33-27-60-60-60zm-50 270c0 9-10 13-17 7l-46-46-106 91a29 29 0 01-42 0l-64-73-114 100c-4 4-10 4-14 0l-5-5c-4-4-4-10 0-14l112-153c12-12 31-12 42 0l64 64 65-75-42-38c-6-6-2-18 7-18h140c11 0 19 10 19 21v139z" />
    </svg>
  );
}
export default SvgInvestmentAccount;
