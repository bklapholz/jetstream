import * as React from 'react';
function SvgKanban(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" fill="unset" aria-hidden="true" {...props}>
      <path d="M320 175c0-8-7-15-15-15h-90c-8 0-15 7-15 15v270c0 8 7 15 15 15h90c8 0 15-7 15-15zm-180 0c0-8-7-15-15-15H35c-8 0-15 7-15 15v310c0 8 7 15 15 15h90c8 0 15-7 15-15zm360 0c0-8-7-15-15-15h-90c-8 0-15 7-15 15v230c0 8 7 15 15 15h90c8 0 15-7 15-15zm0-140c0-8-7-15-15-15H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h450c8 0 15-7 15-15z" />
    </svg>
  );
}
export default SvgKanban;
