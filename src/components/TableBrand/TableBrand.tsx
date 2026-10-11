import { useId } from "react";
import "./TableBrand.css";

export default function TableBrand() {
  const id = useId();
  const textPathId = `${id}-text-path`;
  const inkFilterId = `${id}-ink`;

  return (
    <header className="table-brand">
      <h1 className="table-brand__accessible-name">
        Emilio Fayad
      </h1>

      <svg
        className="table-brand__printing"
        viewBox="0 0 1000 360"
        aria-hidden="true"
      >
        <defs>
          {/* Shared baseline keeps all lettering on the same curve */}
          <path
            id={textPathId}
            d="M 100 65 C 245 360, 755 360, 900 65"
          />

          {/* Subtle uneven ink coverage */}
          <filter
            id={inkFilterId}
            x="-5%"
            y="-10%"
            width="110%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              seed="8"
              result="grain"
            />

            <feColorMatrix
              in="grain"
              type="matrix"
              values="
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 0 1
                0.20 0.20 0.20 0 0.40
              "
              result="inkMask"
            />

            <feComposite
              in="SourceGraphic"
              in2="inkMask"
              operator="in"
            />
          </filter>
        </defs>

        <g filter={`url(#${inkFilterId})`}>
          <g className="table-brand__lines">
            <path d="M 130 25 C 265 292, 735 292, 870 25" />
            <path d="M 65 70 C 225 415, 775 415, 935 70" />
          </g>

          <text className="table-brand__name">
            <textPath
              href={`#${textPathId}`}
              startOffset="50%"
              textAnchor="middle"
            >
              EMILIO FAYAD
            </textPath>
          </text>

          <text className="table-brand__odds">
            <textPath
              href={`#${textPathId}`}
              startOffset="12%"
              textAnchor="middle"
            >
              2 to 1
            </textPath>
          </text>

          <text className="table-brand__odds">
            <textPath
              href={`#${textPathId}`}
              startOffset="88%"
              textAnchor="middle"
            >
              2 to 1
            </textPath>
          </text>
        </g>
      </svg>
    </header>
  );
}