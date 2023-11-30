const SVG_NORMAL_DEFS =
`<svg version="1.1" viewBox="0 0 156 192" xmlns="http://www.w3.org/2000/svg">
<defs>
    <path id="segA" d="m16 0c-4.1221 0-7.5433 1.7965-10.479 4.5215l19.479 19.479h58l19.479-19.479c-2.9352-2.725-6.4785-4.5215-10.479-4.5215z" />
    <path id="segB" d="m103.48 5.5215-19.479 19.479v58l12 12 12-12v-67c0-3.8923-1.7965-7.5433-4.5215-10.479z"  />        
    <path id="segC" d="m96 97-12 12v58l19.396 19.396c2.7714-2.9944 4.6035-6.3295 4.6035-10.396v-67z" />
    <path id="segD" d="m25 168-19.479 19.479c2.9352 2.725 5.8967 4.5215 10.479 4.5215h76c4 0 7.4766-1.8589 10.4-4.5996l-19.4-19.4z" />
    <path id="segE" d="m12 97-12 12v67c0 3.7774 1.7965 7.5433 4.5215 10.479l19.479-19.479v-58z" />
    <path id="segF" d="m4.5215 5.5215c-2.725 2.9352-4.5215 6.3564-4.5215 10.479v67l12 12 12-12v-58z" />
    <path id="segG" d="m25 84-12 12 12 12h58l12-12-12-12z" />
    <rect id="segDot" y="168" width="24" height="24" />
    <g id="segDoubledot">
        <rect y="108" width="24" height="24" />
        <rect y="60" width="24" height="24" />
    </g>
    <g class="mod7Seg">
        <use href="#segA" />
        <use href="#segB" />
        <use href="#segC" />
        <use href="#segD" />
        <use href="#segE" />
        <use href="#segF" />
        <use href="#segG" />
        <use href="#topZone" />
        <use href="#bottomZone" />
    </g>
    <g class="modDot">
        <use href="#segDot" />
    </g>
    <g class="modDoubledot">
        <use href="#segDoubledot" />
    </g>
    <g class="modSpace">
    </g>
</defs>
</svg>`;

const SVG_FAT_DEFS =
`<svg version="1.1" viewBox="0 0 108 184" xmlns="http://www.w3.org/2000/svg">
<defs>
    <path id="segfA" d="m16 0c-4.1221 0-7.5433 1.7965-10.479 4.5215l27.479 27.479h42l27.479-27.479c-2.9352-2.725-6.4785-4.5215-10.479-4.5215z"/>
    <path id="segfB" d="m103.48 5.5215-27.479 27.479v42l16 16 16-16v-59c0-3.8923-1.7965-7.5433-4.5215-10.479z"/>
    <path id="segfC" d="m92 93-16 16v42l27.396 27.396c2.7714-2.9944 4.6035-6.3295 4.6035-10.396v-59z"/>
    <path id="segfD" d="m33 152-27.479 27.479c2.9352 2.725 5.8967 4.5215 10.479 4.5215h76c4 0 7.4766-1.8589 10.4-4.5996l-27.4-27.4z"/>
    <path id="segfE" d="m16 93.003-16 15.997 1.6667e-7 59c1.0671e-8 3.7774 1.7965 7.5433 4.5215 10.479l27.479-27.479v-42z"/>
    <path id="segfF" d="m4.5215 5.5215c-2.725 2.9352-4.5215 6.3564-4.5215 10.479v59l16 16 16-16v-42z"/>
    <path id="segfG" d="m33 76-16 16 15.431 16 42.569 2e-5 16-16-16-16z"/>
    <rect id="segfDot" y="152" width="32" height="32" />
    <g id="segfDoubledot">
        <rect y="116" width="32" height="32" />
        <rect y="52" width="32" height="32" />
    </g>
    <g class="mod7Seg">
        <use href="#segfA" />
        <use href="#segfB" />
        <use href="#segfC" />
        <use href="#segfD" />
        <use href="#segfE" />
        <use href="#segfF" />
        <use href="#segfG" />
        <use href="#topZone" />
        <use href="#bottomZone" />
    </g>
    <g class="modDot">
        <use href="#segfDot" />
    </g>
    <g class="modDoubledot">
        <use href="#segfDoubledot" />
    </g>
    <g class="modSpace">
    </g>
</defs>
</svg>
`;

const SVG_MODERN_DEFS =
`<svg version="1.1" viewBox="0 0 108 192" xmlns="http://www.w3.org/2000/svg">
<defs>
    <path id="segmA" d="m23.5 0h-11.5c-7.9939 0.015236-12 4.0065-12 12v11.5h23.5z" />
    <path id="segmB" d="m24.5 0v24h59v-24z" />
    <path id="segmC" d="m84.5 0h11.5c8 0 12 4.0079 12 12v11.5h-23.5z" />
    <path id="segmD" d="m84 24.5v58.793l12 12 12-12v-58.793z" />
    <path id="segmE" d="m108 84.707-11.293 11.293 11.293 11.293z" />
    <path id="segmF" d="m96 96.707-12 12v58.793h24v-58.793z" />
    <path id="segmG" d="m84.5 192h11.5c8.0381 0.11738 12-4 12-12l-0.0254-11.5h-23.475z" />
    <path id="segmH" d="m24.5 168v24h59v-24z" />
    <path id="segmI" d="m0 168v12c0 7.9997 4.0145 11.68 12 11.5l11.5-0.0254v-23.475z" />
    <path id="segmJ" d="m12 96.707-12 12v58.793h24v-58.793z" />
    <path id="segmK" d="m0 84.707v22.586l11.293-11.293z" />
    <path id="segmL" d="m0 24.5v58.793l12 12 12-12v-58.793z" />
    <path id="segmM" d="m24.707 84-12 12 12 12h58.586l12-12-12-12z" />
    <ellipse id="segmDot" cx="12" cy="180" rx="12" ry="12"/>
    <g id="segmDoubledot">
        <ellipse cx="12" cy="72" rx="12" ry="12"/>
        <ellipse cx="12" cy="120" rx="12" ry="12"/>
    </g>
    <g class="modm13Seg">
        <use href="#segmA" />
        <use href="#segmB" />
        <use href="#segmC" />
        <use href="#segmD" />
        <use href="#segmE" />
        <use href="#segmF" />
        <use href="#segmG" />
        <use href="#segmH" />
        <use href="#segmI" />
        <use href="#segmJ" />
        <use href="#segmK" />
        <use href="#segmL" />
        <use href="#segmM" />
    </g>
    <g class="modDot">
        <use href="#segmDot" />
    </g>
    <g class="modDoubledot">
        <use href="#segmDoubledot" />
    </g>
    <g class="modSpace">
    </g>
</defs>
</svg>
`;

const MODBAR_TEMPLATE =
`<svg class="modulebar" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g>
    </g>
</svg>`;
