import * as React from 'react';
function SvgDrag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" fill="unset" aria-hidden="true" {...props}>
      <path d="M309 343c0 18-22 25-32 10l-20-43c-11-19-35-23-53-11l-13 10 67 159c3 7 10 11 18 11h176c9 0 16-6 18-14l31-111c8-31-10-61-38-72l-80-27c-113-41-76 84-74 88zM18 285h58v58H18zM144 40h58v58h-58zm0 380h58v58h-58zM18 158h58v58H18zm0-117h58v58H18zm253-1h58v58h-58zm127 0h58v58h-58zM18 421h58v58H18zm380-253h58v58h-58z" />
    </svg>
  );
}
export default SvgDrag;
