import './App.css'
import FoxScene from './components/FoxScene'

export default function App() {
  return (
    <div className="root-wrapper">
      <FoxScene />

      <svg className="annotation-svg" viewBox="0 0 1000 700" preserveAspectRatio="none">
        <defs>
          {/* Slight displacement for hand-drawn wobble */}
          <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Doodle curved arrow — from fox body toward text */}
        <g filter="url(#rough)" stroke="#aaa" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Starts from right side of fox, curves down-right to text */}
          <path
            d="M 565 430 C 620 460, 700 510, 770 555"
            strokeWidth="1.4"
          />
          {/* Hand-drawn arrowhead */}
          <path d="M 770 555 L 750 546" strokeWidth="1.4" />
          <path d="M 770 555 L 760 537" strokeWidth="1.4" />
        </g>
      </svg>

      <div className="annotation-text">
        we're pareto good and this is our place of experimentation.
        just like the fox from isaiah berlin's allegory, we are
        the jack of all trades and master of some.
      </div>
    </div>
  )
}
