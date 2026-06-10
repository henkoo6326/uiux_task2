/* ════════════════════════════════════════════════════════════════
   공유 사이트 헤더 — 모든 서브페이지 공통.
   <script src="../assets/site-nav.js"></script> 한 줄만 추가하면 됨.
   · 기존 .top-nav / .nav-bar 제거
   · 좌상단 로고 없음 (메인에만 로고 유지)
   · 우상단 MENU 드롭다운 (하이라이트는 hover 때만)
   · 서체꼴/자간행간/크기무게(한·영) 페이지에는 같은 언어 세부 이동 보조헤더 + 한/EN 토글 자동 주입
   ════════════════════════════════════════════════════════════════ */
(function () {
  var SUBS = [
    { key: "seochaegol", ko: "서체꼴",     en: "Letterform" },
    { key: "jagan",      ko: "자간·행간",  en: "Spacing" },
    { key: "keumo",      ko: "크기·무게",  en: "Size & Weight" }
  ];

  var CSS = "\
.sn-nav{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;align-items:center;justify-content:space-between;padding:22px 3vw;font-family:'Montserrat',-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo',sans-serif;}\
.sn-left{display:flex;align-items:center;gap:26px;min-height:30px;}\
.sn-sub{display:flex;gap:22px;}\
.sn-sub a{font-family:'Pretendard',-apple-system,'Apple SD Gothic Neo',sans-serif;font-size:14px;font-weight:500;color:rgba(0,0,0,.42);text-decoration:none;letter-spacing:-0.01em;transition:color .2s;}\
.sn-sub a:hover{color:#0c0d0e;}\
.sn-sub a.active{color:#0c0d0e;font-weight:700;}\
.sn-right{display:flex;align-items:center;gap:18px;}\
.sn-btn{display:inline-flex;align-items:center;background:#0c0d0e;color:#fff;border:none;cursor:pointer;padding:12px 26px;border-radius:40px;font-family:'Montserrat',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.12em;box-shadow:0 0 0 1px rgba(255,255,255,.6);}\
.sn-wrap{position:relative;}\
.sn-panel{position:absolute;top:calc(100% + 12px);right:0;width:min(380px,82vw);background:#e7e7e7;border-radius:18px;padding:10px;opacity:0;visibility:hidden;transform:translateY(-10px) scale(.98);transform-origin:top right;transition:opacity .35s cubic-bezier(.16,1,.3,1),transform .35s cubic-bezier(.16,1,.3,1),visibility .35s;box-shadow:0 30px 70px -30px rgba(0,0,0,.4);}\
.sn-open .sn-panel{opacity:1;visibility:visible;transform:translateY(0) scale(1);}\
.sn-panel a{display:flex;align-items:center;gap:14px;padding:16px 20px;border-radius:12px;text-decoration:none;color:#0c0d0e;font-family:'Pretendard',-apple-system,'Apple SD Gothic Neo',sans-serif;font-weight:600;font-size:clamp(20px,2vw,28px);letter-spacing:-0.02em;opacity:0;transform:translateY(8px);transition:opacity .4s cubic-bezier(.16,1,.3,1),transform .4s cubic-bezier(.16,1,.3,1),background .25s;}\
.sn-open .sn-panel a{opacity:1;transform:translateY(0);}\
.sn-open .sn-panel a:nth-child(1){transition-delay:.05s,.05s,0s}\
.sn-open .sn-panel a:nth-child(2){transition-delay:.10s,.10s,0s}\
.sn-open .sn-panel a:nth-child(3){transition-delay:.15s,.15s,0s}\
.sn-open .sn-panel a:nth-child(4){transition-delay:.20s,.20s,0s}\
.sn-open .sn-panel a:nth-child(5){transition-delay:.25s,.25s,0s}\
.sn-panel a .arr{opacity:0;transform:translateX(-6px);transition:opacity .25s,transform .25s;}\
.sn-panel a:hover{background:#fff;}\
.sn-panel a:hover .arr{opacity:1;transform:translateX(0);}\
.sn-foot{border-top:1px solid rgba(0,0,0,.1);padding:clamp(40px,6vh,72px) 3vw;max-width:1920px;margin:0 auto;display:grid;grid-template-columns:repeat(5,1fr);column-gap:2vw;row-gap:clamp(28px,4vh,40px);align-items:start;font-family:'Pretendard',-apple-system,'Apple SD Gothic Neo',sans-serif;}\
.sn-foot .fb{grid-column:1 / 3;display:flex;flex-direction:column;gap:8px;}\
.sn-foot .fmark{font-size:13px;font-weight:600;letter-spacing:-0.01em;color:#0c0d0e;text-decoration:none;}\
.sn-foot .fcopy{font-size:12px;letter-spacing:0.02em;color:#8c9197;}\
.sn-foot .fcol{display:flex;flex-direction:column;gap:7px;}\
.sn-foot .flbl{font-family:'Montserrat',sans-serif;font-weight:600;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#8c9197;}\
.sn-foot .fval{font-size:15px;font-weight:600;letter-spacing:-0.01em;color:#0c0d0e;}\
.sn-foot .fsub{font-size:12px;letter-spacing:0.02em;color:#8c9197;}\
@media(max-width:900px){.sn-foot{grid-template-columns:repeat(2,1fr);}.sn-foot .fb{grid-column:1 / -1;}}\
@media(max-width:560px){.sn-foot{grid-template-columns:1fr;}}";

  function currentPage() {
    var file = decodeURIComponent((location.pathname.split("/").pop() || ""));
    var m = file.match(/^(seochaegol|jagan|keumo)-(han|eng)\.html$/);
    return m ? { key: m[1], lang: m[2] } : null;
  }

  function buildLeft(cur) {
    if (!cur) return "";  // image / hyungeol 등은 보조헤더 없음
    var links = SUBS.map(function (s) {
      var label = cur.lang === "han" ? s.ko : s.en;
      var active = s.key === cur.key ? " class=\"active\"" : "";
      return '<a href="' + s.key + '-' + cur.lang + '.html"' + active + '>' + label + '</a>';
    }).join("");
    // 한/EN 토글은 햄버거 메뉴에 있으므로 보조헤더에서는 제거
    return '<div class="sn-sub">' + links + '</div>';
  }

  function buildRight(cur) {
    var menu =
      '<div class="sn-wrap">' +
        '<button class="sn-btn" type="button" aria-expanded="false"><span class="sn-label">MENU</span></button>' +
        '<div class="sn-panel">' +
          '<a href="../비주얼커뮤니케이션.html"><span class="arr">→</span> Home</a>' +
          '<a href="seochaegol-han.html"><span class="arr">→</span> 한글</a>' +
          '<a href="seochaegol-eng.html"><span class="arr">→</span> 영어</a>' +
          '<a href="image.html"><span class="arr">→</span> 이미지</a>' +
          '<a href="hyungeol.html"><span class="arr">→</span> 형태와 컬러</a>' +
        '</div>' +
      '</div>';
    return menu;
  }

  function buildFooter() {
    var f = document.createElement("footer");
    f.className = "sn-foot";
    f.innerHTML =
      '<div class="fb">' +
        '<span class="fmark">© 2026 고해은 · Visual Communication</span>' +
        '<span class="fcopy">Typography Web Essays</span>' +
      '</div>' +
      '<div class="fcol"><span class="flbl">Student</span><span class="fval">고해은</span><span class="fsub">22561005</span></div>' +
      '<div class="fcol"><span class="flbl">Professor</span><span class="fval">최미선</span><span class="fsub">지도교수</span></div>' +
      '<div class="fcol"><span class="flbl">Course</span><span class="fval">Visual Communication</span><span class="fsub">2026</span></div>';
    return f;
  }

  function init() {
    if (document.getElementById("sn-style")) return;

    var font = document.createElement("link");
    font.rel = "stylesheet";
    font.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap";
    document.head.appendChild(font);

    var style = document.createElement("style");
    style.id = "sn-style";
    style.textContent = CSS;
    document.head.appendChild(style);

    // 기존/중복 헤더·햄버거 제거 (새 MENU 하나만 남김)
    document.querySelectorAll(".top-nav, .nav-bar, .menu-ico").forEach(function (n) { n.remove(); });

    var cur = currentPage();
    var nav = document.createElement("nav");
    nav.className = "sn-nav";
    nav.innerHTML =
      '<div class="sn-left">' + buildLeft(cur) + '</div>' +
      '<div class="sn-right">' + buildRight(cur) + '</div>';
    document.body.insertBefore(nav, document.body.firstChild);

    // 공통 푸터 — 모든 서브페이지 맨 끝에 주입
    if (!document.querySelector(".sn-foot")) document.body.appendChild(buildFooter());

    var btn = nav.querySelector(".sn-btn");
    var label = nav.querySelector(".sn-label");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = document.body.classList.toggle("sn-open");
      label.textContent = open ? "CLOSE" : "MENU";
      btn.setAttribute("aria-expanded", open);
    });
    document.addEventListener("click", function () {
      if (document.body.classList.contains("sn-open")) {
        document.body.classList.remove("sn-open");
        label.textContent = "MENU";
        btn.setAttribute("aria-expanded", false);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
