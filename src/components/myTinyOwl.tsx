import { useEffect, useState, type CSSProperties } from "react";

const myOwlGazes = [
  { myEyeX: 0, myEyeY: 0, myHead: 0 },
  { myEyeX: -0.9, myEyeY: -0.2, myHead: -2.4 },
  { myEyeX: 0.9, myEyeY: -0.1, myHead: 2.2 },
  { myEyeX: 0.1, myEyeY: 0.7, myHead: 0.8 }
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
      }, 2600 + Math.random() * 4200);
    };

    myScheduleLook();

    return () => window.clearTimeout(myLookTimer);
  }, []);

  return (
    <span className="myTinyOwl" style={myStyle} aria-hidden="true">
      <svg className="myTinyOwlSvg" viewBox="0 0 120 120">
        <defs>
          <radialGradient id="myOwlSnowPlumage" cx="42%" cy="22%" r="76%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="36%" stopColor="#f4f8fb" />
            <stop offset="74%" stopColor="#c7d3dc" />
            <stop offset="100%" stopColor="#8a99a6" />
          </radialGradient>
          <radialGradient id="myOwlRavenPlumage" cx="32%" cy="18%" r="88%">
            <stop offset="0%" stopColor="#55606c" />
            <stop offset="18%" stopColor="#18202a" />
            <stop offset="58%" stopColor="#05070a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          <radialGradient id="myOwlEyeIris" cx="48%" cy="48%" r="58%">
            <stop offset="0%" stopColor="#ffe9a0" />
            <stop offset="48%" stopColor="#c98718" />
            <stop offset="78%" stopColor="#6f4a10" />
            <stop offset="100%" stopColor="#171007" />
          </radialGradient>
          <linearGradient id="myOwlHardGloss" x1="20" y1="14" x2="78" y2="86">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.86" />
            <stop offset="22%" stopColor="#9ed9ff" stopOpacity="0.34" />
            <stop offset="58%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id="myOwlFeatherNoise" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="8" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.16" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>

        <ellipse className="myTinyOwlGroundShadow" cx="60" cy="108" rx="28" ry="5.5" />

        <g className="myTinyOwlBreath">
          <g className="myTinyOwlHead">
            <path
              className="myTinyOwlBodyMass"
              d="M29 54c0-28 12-45 31-45s31 17 31 45c0 31-12 52-31 52S29 85 29 54z"
            />
            <path className="myTinyOwlEarLeft" d="M38 25 24 12l4 31c3-8 6-14 10-18z" />
            <path className="myTinyOwlEarRight" d="M82 25 96 12l-4 31c-3-8-6-14-10-18z" />
            <path
              className="myTinyOwlBackShade"
              d="M31 54c1-25 13-40 29-40 19 0 29 18 29 42 0 23-8 41-24 48 11-16 12-41 6-58-5-16-18-25-40 8z"
            />

            <g className="myTinyOwlFeatherTexture">
              <path d="M39 35c8-5 15-6 21-2" />
              <path d="M60 33c6-4 14-3 21 2" />
              <path d="M38 71c6 5 13 8 22 8s16-3 22-8" />
              <path d="M42 84c5 4 11 6 18 6s13-2 18-6" />
              <path d="M45 95c4 2 9 3 15 3s11-1 15-3" />
            </g>

            <g className="myTinyOwlSpeckles">
              <circle cx="43" cy="25" r="1.2" />
              <circle cx="51" cy="22" r="0.9" />
              <circle cx="68" cy="22" r="0.9" />
              <circle cx="77" cy="26" r="1.2" />
              <circle cx="37" cy="58" r="1" />
              <circle cx="45" cy="64" r="0.9" />
              <circle cx="56" cy="69" r="1.1" />
              <circle cx="64" cy="69" r="1.1" />
              <circle cx="75" cy="64" r="0.9" />
              <circle cx="83" cy="58" r="1" />
              <circle cx="48" cy="88" r="1" />
              <circle cx="60" cy="91" r="0.95" />
              <circle cx="72" cy="88" r="1" />
            </g>

            <path className="myTinyOwlFaceMaskLeft" d="M28 42c8-15 20-20 31-15 1 14-8 26-23 30-8-2-11-7-8-15z" />
            <path className="myTinyOwlFaceMaskRight" d="M92 42c-8-15-20-20-31-15-1 14 8 26 23 30 8-2 11-7 8-15z" />
            <path className="myTinyOwlFacialRuff" d="M31 42c9-9 18-12 29-9M89 42c-9-9-18-12-29-9" />

            <g className="myTinyOwlEyes">
              <circle className="myTinyOwlIris" cx="48" cy="48" r="7.2" />
              <circle className="myTinyOwlIris" cx="72" cy="48" r="7.2" />
              <circle className="myTinyOwlPupil" cx="48" cy="48" r="3.1" />
              <circle className="myTinyOwlPupil" cx="72" cy="48" r="3.1" />
              <circle className="myTinyOwlCatchlight" cx="45.8" cy="45.2" r="1.35" />
              <circle className="myTinyOwlCatchlight" cx="69.8" cy="45.2" r="1.35" />
            </g>

            <path className="myTinyOwlBlink" d="M40 48c4.4-4 11.7-4 16 0M64 48c4.3-4 11.6-4 16 0" />
            <path className="myTinyOwlBeak" d="M60 55 54.5 63 60 67.5 65.5 63z" />
            <path className="myTinyOwlGloss" d="M38 20c12-11 32-10 44 1-17-4-32 0-42 12-7 8-9 18-8 28-6-16-4-31 6-41z" />
          </g>
        </g>
      </svg>
    </span>
  );
}
