import { useState, useEffect, useRef } from "react";
import "./App.css";
import FoxScene from "./components/FoxScene";

function useArrow(annotationRef) {
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    function compute() {
      const el = annotationRef.current;
      if (!el) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();

      // Fox body: approx screen position as % of viewport → SVG coords (1000×700)
      const x1 = ((vw * 0.54) / vw) * 1000;
      const y1 = ((vh * 0.65) / vh) * 700;

      // Annotation: left edge, top of box
      const x2 = (rect.left / vw) * 1000;
      const y2 = ((rect.top + 8) / vh) * 700;

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
    return () => window.removeEventListener("resize", compute);
  }, [annotationRef]);

  return arrow;
}

export default function App() {
  const annotationRef = useRef();
  const arrow = useArrow(annotationRef);

  return (
    <div className="root-wrapper">
      <FoxScene />

      <p className="wordmark">glind studios</p>

      <div className="wordmark-sub">
        this is our playground where we take chances on cool ideas.
      </div>

      <div className="shipped">
        <span className="shipped-label">some things we shipped</span>
        <a
          href="https://www.glind.app"
          className="shipped-item"
          target="_blank"
          rel="noreferrer"
        >
          glind -{">"} the low SM app
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
        . we shake the tree, stuff our eyes with wonder and
        act like we're going to drop dead in 10 seconds
      </div>
    </div>
  );
}
