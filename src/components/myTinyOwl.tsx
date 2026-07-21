import { useEffect, useState, type CSSProperties } from "react";

const myOwlGazes = [
  { myEyeX: 0, myEyeY: 0, myHead: 0 },
  { myEyeX: -1.8, myEyeY: -0.3, myHead: -3 },
  { myEyeX: 1.7, myEyeY: -0.2, myHead: 3 },
  { myEyeX: 0.4, myEyeY: 1.1, myHead: 1 }
];

export function MyTinyOwl() {
  const [myGazeIndex, setMyGazeIndex] = useState(0);
  const myGaze = myOwlGazes[myGazeIndex];
  const myStyle = {
    "--myOwlEyeX": `${myGaze.myEyeX}px`,
    "--myOwlEyeY": `${myGaze.myEyeY}px`,
    "--myOwlHeadTilt": `${myGaze.myHead}deg`
  } as CSSProperties;

  useEffect(() => {
    const myMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (myMotionQuery.matches) {
      return;
    }

    let myLookTimer = 0;

    const myScheduleLook = () => {
      myLookTimer = window.setTimeout(() => {
        setMyGazeIndex((myCurrentIndex) => (myCurrentIndex + 1) % myOwlGazes.length);
        myScheduleLook();
      }, 2400 + Math.random() * 3600);
    };

    myScheduleLook();

    return () => window.clearTimeout(myLookTimer);
  }, []);

  return (
    <span className="myTinyOwl" style={myStyle} aria-hidden="true">
      <svg className="myTinyOwlSvg" viewBox="0 0 96 96">
        <defs>
          <radialGradient id="myOwlDarkBody" cx="30%" cy="18%" r="86%">
            <stop offset="0%" stopColor="#4c5664" />
            <stop offset="28%" stopColor="#111820" />
            <stop offset="70%" stopColor="#030507" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          <radialGradient id="myOwlSnowBody" cx="34%" cy="18%" r="82%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="38%" stopColor="#edf5fb" />
            <stop offset="78%" stopColor="#bccbd7" />
            <stop offset="100%" stopColor="#8494a3" />
          </radialGradient>
          <linearGradient id="myOwlGloss" x1="18" y1="6" x2="70" y2="82">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.82" />
            <stop offset="28%" stopColor="#9fdfff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="myOwlEyeGold" cx="48%" cy="46%" r="56%">
            <stop offset="0%" stopColor="#fff4be" />
            <stop offset="58%" stopColor="#d8a63b" />
            <stop offset="100%" stopColor="#76591c" />
          </radialGradient>
        </defs>

        <ellipse className="myTinyOwlShadow" cx="48" cy="89" rx="22" ry="4.6" />

        <g className="myTinyOwlBreath">
          <g className="myTinyOwlHead">
            <path
              className="myTinyOwlSilhouette"
              d="M20 42c0-20 12-32 28-32s28 12 28 32c0 22-10 40-28 40S20 64 20 42z"
            />
            <path className="myTinyOwlEar myTinyOwlEarLeft" d="M25 22 16 12l2 23z" />
            <path className="myTinyOwlEar myTinyOwlEarRight" d="M71 22 80 12l-2 23z" />
            <path className="myTinyOwlWing myTinyOwlWingLeft" d="M25 46c-8 7-9 20-3 29 8-5 13-14 13-26z" />
            <path className="myTinyOwlWing myTinyOwlWingRight" d="M71 46c8 7 9 20 3 29-8-5-13-14-13-26z" />
            <path
              className="myTinyOwlChest"
              d="M32 50c3 12 10 20 16 20s13-8 16-20c-5 4-10 6-16 6s-11-2-16-6z"
            />

            <g className="myTinyOwlFeathers">
              <path d="M31 43c4 3 8 4 13 4" />
              <path d="M52 47c5 0 9-1 13-4" />
              <path d="M34 58c4 3 8 4 14 4s10-1 14-4" />
              <path d="M37 68c3 2 7 3 11 3s8-1 11-3" />
            </g>

            <path className="myTinyOwlFaceDisc myTinyOwlFaceDiscLeft" d="M18 31c5-10 15-14 27-11 0 14-8 24-20 27-6-3-8-8-7-16z" />
            <path className="myTinyOwlFaceDisc myTinyOwlFaceDiscRight" d="M78 31c-5-10-15-14-27-11 0 14 8 24 20 27 6-3 8-8 7-16z" />
            <path className="myTinyOwlBrow" d="M21 30c8-5 16-6 25-3M75 30c-8-5-16-6-25-3" />

            <g className="myTinyOwlEyes">
              <circle className="myTinyOwlEye" cx="36" cy="39" r="9.4" />
              <circle className="myTinyOwlEye" cx="60" cy="39" r="9.4" />
              <circle className="myTinyOwlPupil" cx="36" cy="39" r="4.6" />
              <circle className="myTinyOwlPupil" cx="60" cy="39" r="4.6" />
              <circle className="myTinyOwlEyeSpark" cx="33.2" cy="35.7" r="1.7" />
              <circle className="myTinyOwlEyeSpark" cx="57.2" cy="35.7" r="1.7" />
            </g>

            <path className="myTinyOwlBlink" d="M26.5 39c4.8-4.2 13.4-4.2 18.5 0M51 39c5.1-4.2 13.7-4.2 18.5 0" />
            <path className="myTinyOwlBeak" d="M48 46 42.5 53.5 48 57l5.5-3.5z" />
            <path className="myTinyOwlGloss" d="M28 20c8-8 25-9 35 0-9-3-22-1-31 6-5 4-8 10-9 17-3-9-1-17 5-23z" />
          </g>
        </g>
      </svg>
    </span>
  );
}
