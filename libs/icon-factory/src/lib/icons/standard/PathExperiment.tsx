import * as React from 'react';
function SvgPathExperiment(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <path
        d="M78.61 68.84a7.01 7.01 0 01.28 7.39c-1.18 2.33-3.54 3.8-6.14 3.77H27.12a6.784 6.784 0 01-6.14-3.77c-1.2-2.35-1.03-5.18.42-7.39l17.44-26.51V27.85c-.21.01-.42.01-.61 0-2.08-.09-3.67-1.86-3.58-3.93v-.45a3.489 3.489 0 013.5-3.46h24.06c1.89.18 3.31 1.87 3.14 3.77.01.21.01.42 0 .62h-.01a3.736 3.736 0 01-4.18 3.28v14.3l17.49 26.86h-.06.01zm-35.7-19.46H57.4l-3.02-4.81V28.38H46v15.98l-3.1 5.02h.01zm2.04 13.51c-2.93 0-5.31 2.38-5.31 5.31s2.38 5.31 5.31 5.31 5.31-2.38 5.31-5.31-2.38-5.31-5.31-5.31zm10.4-7.81a3.91 3.91 0 100 7.82 3.91 3.91 0 100-7.82z"
        fill="unset"
      />
    </svg>
  );
}
export default SvgPathExperiment;