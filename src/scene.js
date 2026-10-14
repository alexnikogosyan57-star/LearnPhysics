import { wheelAngle } from "./physics";
/** Orthographic corridor: 0–60 m maps linearly to x=110–790. */
export function scene(id = "scene", fraction = 0) {
  const uid = (n) => `${n}-${id}`;
  return `<svg class="corridor" viewBox="0 0 900 390" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Առաքման ռոբոտը միջանցքում։ Հատակին 0-ից 60 մետր սանդղակ է։"><defs>
  <linearGradient id="${uid("wall")}" x2="0" y2="1"><stop stop-color="#f3f0e5"/><stop offset="1" stop-color="#e4e4d5"/></linearGradient>
  <linearGradient id="${uid("floor")}" x1="0" y1="0" x2=".3" y2="1"><stop stop-color="#d2d4c3"/><stop offset=".4" stop-color="#e2dfcd"/><stop offset="1" stop-color="#e6e2d1"/></linearGradient>
  <linearGradient id="${uid("glass")}" x2=".5" y2="1"><stop stop-color="#e9edde"/><stop offset="1" stop-color="#cbd7be"/></linearGradient>
  <linearGradient id="${uid("body")}" x1="0" x2=".8" y2="1"><stop stop-color="#fffdf2"/><stop offset=".45" stop-color="#efeddf"/><stop offset="1" stop-color="#c0c5af"/></linearGradient>
  <linearGradient id="${uid("side")}" x2="1" y2=".3"><stop stop-color="#cbd0bd"/><stop offset="1" stop-color="#8c997b"/></linearGradient>
  <linearGradient id="${uid("face")}" x2=".7" y2="1"><stop stop-color="#51574a"/><stop offset="1" stop-color="#272d25"/></linearGradient>
  <linearGradient id="${uid("box")}" x2="1" y2="1"><stop stop-color="#d7b388"/><stop offset="1" stop-color="#b48b62"/></linearGradient>
  <radialGradient id="${uid("shadow")}"><stop stop-color="#646d50" stop-opacity=".3"/><stop offset="1" stop-color="#646d50" stop-opacity="0"/></radialGradient>
  <linearGradient id="${uid("sun")}" x2=".6" y2="1"><stop stop-color="#fffde9" stop-opacity=".65"/><stop offset="1" stop-color="#fffde9" stop-opacity="0"/></linearGradient>
  </defs><path fill="url(#${uid("wall")})" d="M0 0h900v237H0z"/><path fill="url(#${uid("floor")})" d="M0 237h900v153H0z"/>
  <path d="M0 239h900" stroke="#bcc4ac" stroke-width="4"/><path d="M0 244h900" stroke="#f1f0e2" stroke-width="2"/>
  <path d="M30 390 195 241m180 149 20-149m210 149-124-149m390 149L702 241M0 322h900" fill="none" stroke="#c6cbb8" stroke-width="1"/>
  <path d="m205 230 230-4 170 164H273Z" fill="url(#${uid("sun")})"/>
  <rect x="209" y="64" width="229" height="133" rx="3" fill="#b9c3a9"/><rect x="215" y="70" width="217" height="121" fill="url(#${uid("glass")})"/>
  <path d="m217 137 38-38 43 22 51-32 82 44v56H217Z" fill="#b9c9ad" opacity=".52"/><path d="m217 166 64-33 47 19 49-25 54 38v24H217Z" fill="#9daf92" opacity=".22"/>
  <path d="M324 70v120M215 131h217" stroke="#f5f3e7" stroke-width="6"/><path d="M215 191h217" stroke="#9ead8e" stroke-width="4"/><path d="M199 198h250v8H199Z" fill="#e9e8da"/><path d="M199 206h250" stroke="#c1c9b2" stroke-width="2"/>
  <rect x="665" y="51" width="125" height="190" rx="3" fill="#bdc5b0"/><rect x="673" y="59" width="110" height="179" rx="2" fill="#d1d7c1"/><path d="M681 68h94v163h-94z" stroke="#c2ccb1" fill="none"/><path d="M763 143h10" stroke="#66765b" stroke-width="4" stroke-linecap="round"/><rect x="707" y="74" width="42" height="11" rx="2" fill="#e4e7d7"/>
  <g opacity=".85"><rect x="78" y="92" width="74" height="79" rx="2" fill="#ececde" stroke="#bac4a7"/><path d="M95 114h40m-40 13h32m-32 14h37" stroke="#a6b393" stroke-width="3"/><circle cx="98" cy="155" r="3" fill="#c49671"/></g>
  <ellipse cx="836" cy="247" rx="27" ry="8" fill="url(#${uid("shadow")})"/><path d="m815 213 6 30q16 8 31 0l6-30" fill="#be9b7b"/><ellipse cx="836" cy="213" rx="21" ry="5" fill="#9e8066"/>
  <path d="M836 214v-55" fill="none" stroke="#788766" stroke-width="3"/><path d="M836 188c-33-1-28-29-28-29 27 1 31 20 28 29m0-15c29-1 28-32 28-32-23 1-31 16-28 32m0 34c-27-1-25-23-25-23 20-2 28 14 25 23" fill="#81916f"/><path d="M836 176c-15-7-16-31-16-31 20 3 22 21 16 31" fill="#97a782"/>
  <path d="M90 295h720" stroke="#f7f3df" stroke-width="3" stroke-dasharray="9 8"/>
  ${Array.from({ length: 7 }, (_, i) => `<path d="M${110 + (i * 680) / 6} 308v15" stroke="#8c977a" stroke-width="1.5"/><text x="${110 + (i * 680) / 6}" y="349" font-size="16" fill="#657654" text-anchor="middle">${i * 10} մ</text>`).join("")}
  <g id="robot-${id}" transform="translate(${110 + fraction * 680} 270)">
    <ellipse cy="18" rx="60" ry="16" fill="url(#${uid("shadow")})"/>
    <g><ellipse cx="-31" cy="5" rx="13" ry="17" fill="#353c2e"/><ellipse cx="30" cy="5" rx="13" ry="17" fill="#353c2e"/><ellipse cx="-31" cy="5" rx="8" ry="11" fill="#879576"/><ellipse cx="30" cy="5" rx="8" ry="11" fill="#879576"/><ellipse cx="-31" cy="5" rx="4" ry="6" fill="#bac5a8"/><ellipse cx="30" cy="5" rx="4" ry="6" fill="#bac5a8"/></g>
    ${[-31, 30].map((x) => `<g transform="translate(${x} 5) scale(.7 1)"><g data-wheel-rotor transform="rotate(${typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : wheelAngle(fraction * 60)})"><path d="M-10 0h20M0-10v20" stroke="#c6cebb" stroke-width="1.8"/><circle r="3" fill="#6a7b59"/></g></g>`).join("")}
    <path d="M-40-56q0-18 18-20h47q20 2 21 22l-3 47q-2 13-15 13h-55q-16-1-17-15Z" fill="url(#${uid("side")})"/>
    <path d="M-44-52q0-21 20-22h39q21 0 23 22l-2 44q-1 12-15 14h-47q-15-2-16-16Z" fill="url(#${uid("body")})" stroke="#afbba0" stroke-width=".8"/>
    <path d="M-40-25q37 8 75 0" stroke="#cbd2bd" fill="none"/>
    <rect x="-32" y="-61" width="56" height="29" rx="13" fill="url(#${uid("face")})"/>
    <ellipse cx="-15" cy="-46" rx="5" ry="6" fill="#d8bb74"/><ellipse cx="8" cy="-46" rx="5" ry="6" fill="#d8bb74"/><ellipse cx="-15" cy="-47" rx="2.5" ry="3" fill="#34392f"/><ellipse cx="8" cy="-47" rx="2.5" ry="3" fill="#34392f"/>
    <path d="M-9-38q5 4 10 0" fill="none" stroke="#d5d8c9" stroke-width="1.4" stroke-linecap="round"/><path d="M-22-56q5-3 10-1m13 0q5-2 10 1" fill="none" stroke="#e5e4d6" stroke-width="1.3" stroke-linecap="round"/>
    <rect x="-17" y="-19" width="30" height="14" rx="6" fill="#879576"/><path d="m-5-16 3 5 3-5" fill="#c88f62"/>
    <path d="M-25-74v-27l39-1 10 5v24" fill="url(#${uid("box")})" stroke="#b2936a" stroke-width=".8"/><path d="M-25-101 14-102 24-97-15-96Z" fill="#e0c199"/><path d="M-15-96v23M-5-100 4-99" stroke="#ead0a6" stroke-width="6"/><path d="M32-66v-27" stroke="#6d7c5d" stroke-width="3"/><circle cx="32" cy="-95" r="4" fill="#c88a61"/>
    <path d="M-37-51q0-16 17-18" stroke="#fffef7" stroke-width="3" fill="none" opacity=".7"/>
  </g></svg>`;
}
