import * as React from 'react';

function SvgReportIssue(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true" {...props}>
      <g fill="unset">
        <path d="M22.8 45.7v1c0 1.2-.9 2.1-2.1 2.1H4.1c-1.2 0-2.1-.9-2.1-2.1v-1c0-2.5 3-4.1 5.7-5.3.1 0 .2-.1.3-.2.2-.1.5-.1.7 0 1.1.7 2.4 1.1 3.8 1.1 1.3 0 2.6-.4 3.8-1.1.2-.1.4-.1.6 0 .1 0 .2.1.3.2 2.7 1.3 5.6 2.8 5.6 5.3z" />
        <ellipse cx={12.4} cy={33.7} rx={5.2} ry={5.7} />
        <path d="M34.8 3.2c-8.5 0-15.3 6.5-15.3 14.5 0 2.5.7 5 2 7.2.1.2.2.5.2.8L20 30.3c-.2.6.2 1.1.7 1.3.2.1.4.1.6 0l4.5-1.6c.3-.1.6-.1.8.1 2.4 1.4 5.2 2.2 8 2.2 8.5 0 15.3-6.6 15.3-14.6.1-8-6.8-14.5-15.1-14.5zm-1.1 5.7h3v7l-.3 4.6H34l-.2-4.6v-7zm1.5 17.3c-1.4 0-1.8-.8-1.8-1.8s.4-1.8 1.8-1.8 1.8.8 1.8 1.8c.1 1-.4 1.8-1.8 1.8z" />
      </g>
    </svg>
  );
}

export default SvgReportIssue;