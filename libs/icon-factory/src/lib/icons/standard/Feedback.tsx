import * as React from 'react';

function SvgFeedback(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <path
        fill="unset"
        d="M79.1 56.5c-.1-.4-.1-.9.2-1.2C81 52.2 82 48.7 82 45c0-11.6-9.9-21-22-21-5.2 0-10 1.8-13.8 4.7C58.7 31.4 68 42.2 68 55c0 3.6-.7 7.1-2.1 10.2 2-.5 3.9-1.3 5.7-2.4.4-.2.8-.3 1.2-.1l6.4 2.3c1.1.4 2.2-.7 1.9-1.9l-2-6.6z"
      />
      <path
        fill="unset"
        d="M40 34c-12.1 0-22 9.4-22 21 0 3.7 1 7.2 2.8 10.3.2.4.3.8.2 1.2l-2.1 6.7c-.4 1.2.7 2.3 1.9 1.9l6.4-2.3c.4-.1.9-.1 1.2.1 3.4 2 7.3 3.1 11.6 3.1 12.1 0 22-9.4 22-21s-9.9-21-22-21zM28 59c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm12 0c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm12 0c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"
      />
    </svg>
  );
}

export default SvgFeedback;