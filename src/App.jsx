import { useState, useEffect, useRef } from "react";
import "./App.css";
import FoxScene from "./components/FoxScene";

function useArrow(foxRef, annotationRef) {
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    function compute() {
      const foxEl = foxRef.current;
      const annotEl = annotationRef.current;
      if (!foxEl || !annotEl) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const foxRect = foxEl.getBoundingClientRect();
      const annotRect = annotEl.getBoundingClientRect();

      // Start: center-left of the fox container
      const x1 = ((foxRect.left + foxRect.width * 0.55) / vw) * 1000;
      const y1 = ((foxRect.top + foxRect.height * 0.68) / vh) * 690;

      // End: slightly inset from left edge of annotation box
      const x2 = ((annotRect.left + 40) / vw) * 1000;
      const y2 = (annotRect.top / vh) * 690;

      // Bezier control points
      const cx1 = x1 + (x2 - x1) * 0.25;
      const cy1 = y1 + 40;
      const cx2 = x2 - (x2 - x1) * 0.25;
      const cy2 = y2 - 30;

      const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

      // Arrowhead: tangent direction at endpoint = (x2 - cx2, y2 - cy2)
      const dx = x2 - cx2;
      const dy = y2 - cy2;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = dx / len;
      const ny = dy / len;
      const px = -ny;
      const py = nx;
      const s = 10;

      const head1 = `M ${x2} ${y2} L ${x2 - nx * s + px * 4} ${y2 - ny * s + py * 4}`;
      const head2 = `M ${x2} ${y2} L ${x2 - nx * s - px * 4} ${y2 - ny * s - py * 4}`;

      setArrow({ d, head1, head2 });
    }

    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute);
    };
  }, [foxRef, annotationRef]);

  return arrow;
}

export default function App() {
  const foxRef = useRef();
  const annotationRef = useRef();
  const arrow = useArrow(foxRef, annotationRef);
  const [teamOpen, setTeamOpen] = useState(false);

  return (
    <div className="root-wrapper">
      <div className="fox-container" ref={foxRef}>
        <FoxScene />
      </div>

      <div className={`team${teamOpen ? " team--open" : ""}`}>
        <span className="team-trigger" onClick={() => setTeamOpen((o) => !o)}>
          team
        </span>
        <div className="team-contact">
          hit us up at{" "}
          <a href="mailto:hello@glind.app" className="team-email">
            hello@glind.app
          </a>
        </div>
        <div className="team-tooltip">
          <svg
            viewBox="0 0 270 255"
            className="venn-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter
                id="venn-rough"
                x="-15%"
                y="-15%"
                width="130%"
                height="130%"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.03"
                  numOctaves="4"
                  seed="12"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="5"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
            <g filter="url(#venn-rough)" fill="none" strokeLinecap="round">
              <circle
                cx="95"
                cy="105"
                r="78"
                stroke="rgba(255,255,255,0.38)"
                strokeWidth="1.4"
              />
              <circle
                cx="175"
                cy="88"
                r="62"
                stroke="rgba(255,255,255,0.38)"
                strokeWidth="1.4"
              />
              <circle
                cx="148"
                cy="172"
                r="70"
                stroke="rgba(255,255,255,0.38)"
                strokeWidth="1.4"
              />
            </g>
            <a
              href="https://www.sanzianagrecu.com"
              target="_blank"
              rel="noreferrer"
            >
              <text x="22" y="95" className="venn-label">
                sanziana
              </text>
            </a>
            <a
              href="https://www.linkedin.com/in/stefan-ionescu-3083ba17/"
              target="_blank"
              rel="noreferrer"
            >
              <text x="188" y="30" className="venn-label">
                stefan
              </text>
            </a>
            <a
              href="https://www.linkedin.com/in/cosmina-ene-b9712b252/"
              target="_blank"
              rel="noreferrer"
            >
              <text x="170" y="248" className="venn-label">
                cosmina
              </text>
            </a>
          </svg>
          <div className="team-member" style={{ display: "none" }}>
            <span className="team-role">
              our wizard mentor and strategy maker (and also the one who beats
              our chronic procrastinator)
            </span>
          </div>
        </div>
      </div>

      <p className="wordmark">glind studios</p>

      <div className="wordmark-sub">
        this is our playground where we take chances on cool ideas.
      </div>

      <div className="shipped">
        <span className="shipped-label">some things we shipped</span>
        <a
          href="https://www.glind.app"
          className="shipped-item shipped-item--glind"
          target="_blank"
          rel="noreferrer"
        >
          glind -{">"} the low SM app
          <img src="/glind.png" className="glind-logo-tooltip" alt="glind" />
        </a>
        <a
          href="#"
          className="shipped-item shipped-item--incoming"
          onClick={(e) => e.preventDefault()}
        >
          papillon (incoming) -{">"} <span className="redacted" />
        </a>
        <a
          href="#"
          className="shipped-item shipped-item--incoming"
          onClick={(e) => e.preventDefault()}
        >
          horizon (incoming) -{">"} <span className="redacted" />
        </a>
      </div>

      <svg
        className="annotation-svg"
        viewBox="0 0 1000 700"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {arrow && (
          <g
            filter="url(#rough)"
            stroke="#aaa"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={arrow.d} strokeWidth="1.4" />
            <path d={arrow.head1} strokeWidth="1.4" />
            <path d={arrow.head2} strokeWidth="1.4" />
          </g>
        )}
      </svg>

      <div ref={annotationRef} className="annotation-text">
        just like{" "}
        <a
          href="https://en.wikipedia.org/wiki/The_Hedgehog_and_the_Fox"
          target="_blank"
          rel="noreferrer"
          className="annotation-link"
        >
          the fox from isaiah berlin's allegory
        </a>
        , we're{" "}
        <a
          href="https://www.lesswrong.com/posts/XvN2QQpKTuEzgkZHY/being-the-pareto-best-in-the-world"
          target="_blank"
          rel="noreferrer"
          className="annotation-link"
        >
          pareto good
        </a>
        . we shake the tree, stuff our eyes with wonder and act like we're going
        to drop dead in 10 seconds
      </div>
    </div>
  );
}
