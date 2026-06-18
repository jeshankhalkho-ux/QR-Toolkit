import { useState } from "react";

/* ── Design tokens & CSS ─────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#050714;color:#F1F5F9;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased}

/* ── Navbar ── */
.nav{position:sticky;top:0;z-index:200;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);background:rgba(5,7,20,0.85);border-bottom:1px solid rgba(99,102,241,0.12)}
.nav-inner{max-width:1200px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:66px}
.logo{display:flex;align-items:center;gap:10px;cursor:pointer;text-decoration:none}
.logo-mark{width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#6366F1,#22D3EE);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:900;color:#fff;letter-spacing:-0.5px;flex-shrink:0}
.logo-name{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:800;letter-spacing:-0.5px;background:linear-gradient(135deg,#818CF8,#22D3EE);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.nav-links{display:flex;gap:2px}
.nav-link{color:#94A3B8;font-size:14px;font-weight:500;padding:7px 14px;border-radius:8px;cursor:pointer;transition:color .15s,background .15s}
.nav-link:hover{color:#F1F5F9;background:rgba(255,255,255,0.06)}
.nav-actions{display:flex;align-items:center;gap:10px}
.btn-ghost{background:transparent;border:1px solid rgba(99,102,241,0.28);color:#94A3B8;padding:8px 18px;border-radius:9px;font-size:14px;cursor:pointer;font-weight:500;font-family:inherit;transition:all .2s}
.btn-ghost:hover{border-color:var(--ind);color:#F1F5F9}
.btn-primary{background:linear-gradient(135deg,#6366F1,#A855F7);color:#fff;border:none;padding:9px 22px;border-radius:9px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:opacity .2s,transform .15s}
.btn-primary:hover{opacity:.9;transform:translateY(-1px)}

/* ── Hero ── */
:root{--ind:#6366F1;--ind-l:#818CF8;--cyan:#22D3EE;--purp:#A855F7;--grn:#10B981;--amb:#F59E0B;--card:#13182D;--bdr:rgba(255,255,255,0.07)}
.hero{position:relative;padding:88px 24px 72px;overflow:hidden}
.hero-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 70% 55% at 68% 32%,rgba(99,102,241,0.13) 0%,transparent 65%),radial-gradient(ellipse 40% 40% at 12% 82%,rgba(34,211,238,0.07) 0%,transparent 60%)}
.hero-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,0.035) 1px,transparent 1px);background-size:30px 30px;pointer-events:none}
.hero-inner{position:relative;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 430px;gap:64px;align-items:start}
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.24);color:#A5B4FC;font-size:13px;font-weight:600;padding:7px 16px;border-radius:100px;margin-bottom:26px}
.badge-dot{width:6px;height:6px;background:#6366F1;border-radius:50%;animation:bdot 2s infinite}
@keyframes bdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.75)}}
.hero-h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(36px,5vw,60px);font-weight:900;line-height:1.06;letter-spacing:-2px;margin-bottom:22px}
.grad{background:linear-gradient(135deg,#818CF8 0%,#22D3EE 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-sub{font-size:18px;color:#94A3B8;line-height:1.65;max-width:500px;margin-bottom:34px}
.hstats{display:flex;align-items:center;gap:0;margin-bottom:38px;flex-wrap:wrap;row-gap:14px}
.hstat{padding-right:28px}
.hstat:first-child{padding-left:0}
.hsdiv{width:1px;height:40px;background:rgba(255,255,255,0.09);margin-right:28px;flex-shrink:0}
.hstat-n{font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:900;letter-spacing:-1px;color:#F1F5F9}
.hstat-l{font-size:12px;color:#475569;margin-top:2px;font-weight:500}
.hero-cta{display:flex;gap:12px;flex-wrap:wrap}
.bxl{padding:14px 30px;font-size:16px;font-weight:700;border-radius:12px;cursor:pointer;font-family:inherit;transition:all .2s}
.bxl-p{background:linear-gradient(135deg,#6366F1,#A855F7);color:#fff;border:none}
.bxl-p:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(99,102,241,.3)}
.bxl-g{background:transparent;border:1px solid rgba(255,255,255,.11);color:#94A3B8}
.bxl-g:hover{border-color:rgba(255,255,255,.22);color:#F1F5F9}

/* ── Generator Card ── */
.gc{background:rgba(10,13,28,.97);border:1px solid rgba(99,102,241,.18);border-radius:22px;padding:26px;backdrop-filter:blur(20px);box-shadow:0 0 80px rgba(99,102,241,.07),0 1px 0 rgba(255,255,255,.04) inset}
.gc-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.gc-title{font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:700}
.gc-live{display:flex;align-items:center;gap:5px;font-size:11px;color:#22D3EE;font-weight:600;background:rgba(34,211,238,.08);padding:3px 10px;border-radius:100px}
.live-dot{width:6px;height:6px;background:#22D3EE;border-radius:50%;animation:bdot 1.4s infinite}
.ttabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}
.ttab{font-size:11px;padding:5px 11px;border-radius:7px;border:1px solid rgba(255,255,255,.09);background:transparent;color:#475569;cursor:pointer;font-weight:500;font-family:inherit;transition:all .15s;white-space:nowrap}
.ttab:hover{border-color:rgba(99,102,241,.3);color:#94A3B8}
.ttab.on{background:rgba(99,102,241,.1);border-color:rgba(99,102,241,.45);color:#A5B4FC}
.glabel{display:block;font-size:10px;color:#475569;font-weight:700;text-transform:uppercase;letter-spacing:.9px;margin-bottom:7px}
.ginput{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:10px;padding:11px 14px;color:#F1F5F9;font-size:13px;outline:none;font-family:'JetBrains Mono','Courier New',monospace;transition:border-color .2s}
.ginput:focus{border-color:rgba(99,102,241,.4)}
.ginput::placeholder{color:#1E293B}
.gfield{margin-bottom:14px}
.cdots{display:flex;gap:8px;margin-top:7px}
.cdot{width:23px;height:23px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:transform .15s,border-color .15s}
.cdot:hover{transform:scale(1.2)}
.cdot.sel{border-color:#fff;transform:scale(1.15)}
.qr-wrap{display:flex;flex-direction:column;align-items:center;gap:13px;padding-top:2px}
.qr-frame{background:#fff;border-radius:14px;padding:11px;box-shadow:0 0 0 1px rgba(99,102,241,.2),0 4px 24px rgba(0,0,0,.3);position:relative}
.qr-img{width:182px;height:182px;display:block;border-radius:5px}
.qr-tag{position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#6366F1,#A855F7);color:#fff;font-size:9px;font-weight:800;padding:3px 10px;border-radius:100px;letter-spacing:.8px;white-space:nowrap}
.qrbtns{display:flex;gap:8px;width:100%}
.dlbtn{flex:1;padding:10px 0;border-radius:9px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;border:none;transition:all .2s}
.dl-p{background:linear-gradient(135deg,#6366F1,#A855F7);color:#fff}
.dl-p:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(99,102,241,.3)}
.dl-s{background:transparent;border:1px solid rgba(99,102,241,.3);color:#818CF8}
.dl-s:hover{background:rgba(99,102,241,.08)}

/* ── Trusted logos ── */
.trusted{padding:32px 24px;border-top:1px solid rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.05);background:rgba(10,13,28,.5)}
.trusted-inner{max-width:1200px;margin:0 auto;text-align:center}
.tr-lbl{font-size:10px;font-weight:700;color:#1E293B;text-transform:uppercase;letter-spacing:2.5px;margin-bottom:20px}
.logos{display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap}
.lb{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:800;color:#1E2A40;letter-spacing:-.3px}

/* ── Section base ── */
.sec{padding:88px 24px}
.sec-alt{background:rgba(10,13,28,.45)}
.si{max-width:1200px;margin:0 auto}
.eyebrow{font-size:11px;font-weight:700;letter-spacing:2.5px;color:var(--ind);margin-bottom:13px;text-transform:uppercase}
.sh2{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,44px);font-weight:900;letter-spacing:-1.5px;margin-bottom:13px}
.ssub{font-size:16px;color:#475569;margin-bottom:52px;max-width:570px;line-height:1.65}

/* ── QR Types grid ── */
.tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:12px;margin-bottom:30px}
.tcard{position:relative;padding:20px 17px 18px;background:var(--card);border:1px solid var(--bdr);border-radius:14px;cursor:pointer;overflow:hidden;transition:transform .2s,border-color .2s,box-shadow .2s}
.tcard:hover{transform:translateY(-3px);border-color:rgba(99,102,241,.22);box-shadow:0 8px 30px rgba(0,0,0,.2)}
.tcard-ico{font-size:22px;width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:11px}
.tcard-n{font-size:13px;font-weight:700;margin-bottom:3px;color:#E2E8F0}
.tcard-d{font-size:11px;color:#334155;line-height:1.45}
.tbar{position:absolute;bottom:0;left:0;right:0;height:2px;opacity:.55}
.smb{display:flex;align-items:center;gap:8px;margin:0 auto;padding:11px 28px;background:transparent;border:1px solid rgba(99,102,241,.28);color:#818CF8;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s}
.smb:hover{background:rgba(99,102,241,.07);border-color:rgba(99,102,241,.45)}

/* ── Steps ── */
.sgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2px}
.step{padding:32px 24px;background:var(--card);border:1px solid var(--bdr);border-radius:16px;transition:transform .2s;position:relative}
.step:hover{transform:translateY(-4px)}
.snum{font-family:'Space Grotesk',sans-serif;font-size:54px;font-weight:900;color:rgba(99,102,241,.1);line-height:1;margin-bottom:14px}
.stit{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:800;margin-bottom:9px}
.sdesc{font-size:14px;color:#475569;line-height:1.65}

/* ── Bento ── */
.bento{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}
.bc{position:relative;padding:30px;background:var(--card);border:1px solid var(--bdr);border-radius:18px;overflow:hidden;transition:transform .2s,border-color .2s}
.bc:hover{transform:translateY(-3px);border-color:rgba(99,102,241,.18)}
.bc2{grid-column:span 2}
.bico{font-size:28px;margin-bottom:15px;display:block}
.btit{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:800;margin-bottom:9px}
.bdesc{font-size:14px;color:#475569;line-height:1.65}
.bbar{position:absolute;bottom:0;left:0;right:0;height:2px;opacity:.5}

/* ── Stats ── */
.stats{padding:72px 24px;background:linear-gradient(135deg,rgba(99,102,241,.06) 0%,rgba(34,211,238,.04) 100%);border-top:1px solid rgba(99,102,241,.1);border-bottom:1px solid rgba(99,102,241,.1)}
.si2{max-width:960px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px}
.scard{text-align:center;padding:22px 12px}
.sico{font-size:28px;margin-bottom:10px}
.snum{font-family:'Space Grotesk',sans-serif;font-size:44px;font-weight:900;letter-spacing:-2px;line-height:1;background:linear-gradient(135deg,#818CF8,#22D3EE);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.slbl{font-size:13px;color:#334155;margin-top:7px;font-weight:500}

/* ── Pricing ── */
.btog{display:flex;background:rgba(255,255,255,.04);border-radius:11px;padding:4px;width:fit-content;margin:0 auto 50px;border:1px solid rgba(255,255,255,.07)}
.tbtn{padding:8px 22px;border-radius:8px;border:none;background:transparent;color:#475569;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s;display:flex;align-items:center;gap:8px}
.tbtn.on{background:rgba(99,102,241,.18);color:#A5B4FC}
.stag{font-size:10px;background:var(--grn);color:#fff;padding:2px 7px;border-radius:4px;font-weight:700}
.pgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:17px;max-width:960px;margin:0 auto}
.pcard{position:relative;padding:34px 28px;background:var(--card);border:1px solid var(--bdr);border-radius:22px;transition:transform .2s}
.pcard:hover{transform:translateY(-4px)}
.pcard.pop{background:rgba(99,102,241,.05);border-color:rgba(99,102,241,.35);box-shadow:0 0 60px rgba(99,102,241,.1)}
.pbadge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#6366F1,#A855F7);color:#fff;font-size:10px;font-weight:800;padding:4px 18px;border-radius:100px;letter-spacing:1.5px;white-space:nowrap}
.pname{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:9px}
.pprice{font-family:'Space Grotesk',sans-serif;font-size:44px;font-weight:900;letter-spacing:-2px;line-height:1;margin-bottom:4px}
.pperiod{font-family:'Inter',sans-serif;font-size:13px;font-weight:400;color:#334155}
.pdesc{font-size:13px;color:#334155;margin-bottom:22px;padding-top:5px;line-height:1.55}
.pdiv{height:1px;background:rgba(255,255,255,.06);margin:18px 0}
.pfts{list-style:none;margin-bottom:26px}
.pft{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#CBD5E1;padding:7px 0}
.pcheck{flex-shrink:0;font-size:14px}
.pbtn{width:100%;padding:14px 0;border-radius:11px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;border:none;transition:all .2s}
.pb-pri{background:linear-gradient(135deg,#6366F1,#A855F7);color:#fff}
.pb-pri:hover{box-shadow:0 8px 30px rgba(99,102,241,.3);transform:translateY(-1px)}
.pb-out{background:transparent;border:1.5px solid rgba(255,255,255,.11);color:#475569}
.pb-out:hover{border-color:rgba(99,102,241,.35);color:#818CF8}
.pb-cyn{background:transparent;border:1.5px solid rgba(34,211,238,.3);color:#22D3EE}
.pb-cyn:hover{background:rgba(34,211,238,.07)}

/* ── Testimonials ── */
.testgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:17px}
.testcard{padding:28px;background:var(--card);border:1px solid var(--bdr);border-radius:18px;transition:transform .2s,border-color .2s}
.testcard:hover{transform:translateY(-3px);border-color:rgba(99,102,241,.14)}
.tstars{color:#F59E0B;font-size:14px;letter-spacing:2px;margin-bottom:15px}
.ttext{font-size:14px;color:#94A3B8;line-height:1.72;font-style:italic;margin-bottom:22px}
.tauthor{display:flex;align-items:center;gap:12px}
.tavat{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#fff;flex-shrink:0}
.tname{font-size:14px;font-weight:700}
.trole{font-size:12px;color:#334155;margin-top:2px}

/* ── FAQ ── */
.faqwrap{max-width:740px;margin:0 auto}
.faqitem{background:var(--card);border:1px solid var(--bdr);border-radius:13px;padding:20px 24px;margin-bottom:10px;cursor:pointer;transition:border-color .2s}
.faqitem:hover,.faqitem.op{border-color:rgba(99,102,241,.22)}
.faqq{display:flex;justify-content:space-between;align-items:center;font-size:15px;font-weight:600;gap:16px}
.faqi{font-size:21px;color:var(--ind);flex-shrink:0;font-weight:300;line-height:1}
.faqa{font-size:14px;color:#475569;line-height:1.7;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,.05)}

/* ── CTA ── */
.cta{padding:90px 24px;text-align:center;background:linear-gradient(135deg,rgba(99,102,241,.1) 0%,rgba(168,85,247,.07) 50%,rgba(34,211,238,.04) 100%);border-top:1px solid rgba(99,102,241,.12)}
.ctai{max-width:620px;margin:0 auto}
.ctah{font-family:'Space Grotesk',sans-serif;font-size:clamp(30px,5vw,50px);font-weight:900;letter-spacing:-1.5px;margin-bottom:16px}
.ctas{font-size:17px;color:#475569;margin-bottom:36px;line-height:1.6}
.ctabtn{padding:17px 44px;background:linear-gradient(135deg,#6366F1,#A855F7);border:none;border-radius:13px;color:#fff;font-size:18px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s}
.ctabtn:hover{transform:translateY(-2px);box-shadow:0 16px 50px rgba(99,102,241,.3)}

/* ── Footer ── */
.foot{background:#020409;border-top:1px solid rgba(255,255,255,.04);padding:64px 24px 32px}
.footi{max-width:1200px;margin:0 auto}
.ftop{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px}
.ftagl{font-size:13px;color:#1E293B;line-height:1.65;margin-top:14px;max-width:230px}
.fctit{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#334155;margin-bottom:15px}
.flinks{display:flex;flex-direction:column;gap:10px}
.flink{font-size:13px;color:#1E293B;text-decoration:none;transition:color .2s}
.flink:hover{color:#475569}
.fbottom{display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,.04);padding-top:26px;flex-wrap:wrap;gap:14px}
.fcopy{font-size:12px;color:#0F172A}
.fsocs{display:flex;gap:24px}
.fsoc{font-size:12px;color:#0F172A;text-decoration:none;transition:color .2s}
.fsoc:hover{color:#1E293B}
.newsl{display:flex;gap:7px;margin-top:16px}
.nsinp{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:9px 12px;color:#F1F5F9;font-size:13px;outline:none;font-family:inherit}
.nsbtn{background:var(--ind);border:none;border-radius:8px;padding:9px 14px;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}

/* ── Responsive ── */
@media(max-width:960px){
  .hero-inner{grid-template-columns:1fr}.gc{max-width:480px}
  .bento{grid-template-columns:1fr}.bc2{grid-column:span 1}
  .nav-links{display:none}
  .ftop{grid-template-columns:1fr 1fr}
}
@media(max-width:600px){
  .hsdiv{display:none}
  .pgrid{grid-template-columns:1fr}
  .ftop{grid-template-columns:1fr}
  .logos{gap:28px}
}
`;

/* ── Data ─────────────────────────────────────────────────────────────── */
const QR_TYPES = [
  { id:'url',    label:'Website URL',      icon:'🌐', color:'#6366F1', desc:'Any webpage or link' },
  { id:'text',   label:'Plain Text',       icon:'📝', color:'#8B5CF6', desc:'Simple text message' },
  { id:'email',  label:'Email',            icon:'✉️', color:'#EC4899', desc:'Pre-filled email' },
  { id:'phone',  label:'Phone Call',       icon:'📞', color:'#10B981', desc:'Direct phone dial' },
  { id:'sms',    label:'SMS',              icon:'💬', color:'#F59E0B', desc:'Pre-filled text message' },
  { id:'wa',     label:'WhatsApp',         icon:'💚', color:'#25D366', desc:'WhatsApp direct chat' },
  { id:'wifi',   label:'WiFi',             icon:'📶', color:'#3B82F6', desc:'Share network credentials' },
  { id:'vcard',  label:'vCard Contact',    icon:'👤', color:'#06B6D4', desc:'Digital business card' },
  { id:'loc',    label:'GPS Location',     icon:'📍', color:'#EF4444', desc:'Maps & coordinates' },
  { id:'yt',     label:'YouTube',          icon:'▶️', color:'#FF0000', desc:'Video or channel' },
  { id:'ig',     label:'Instagram',        icon:'📸', color:'#E1306C', desc:'Profile or post' },
  { id:'fb',     label:'Facebook',         icon:'📘', color:'#1877F2', desc:'Page or profile' },
  { id:'tw',     label:'X / Twitter',      icon:'🐦', color:'#1DA1F2', desc:'Profile or tweet' },
  { id:'li',     label:'LinkedIn',         icon:'💼', color:'#0077B5', desc:'Professional profile' },
  { id:'pdf',    label:'PDF Document',     icon:'📄', color:'#DC2626', desc:'Shareable PDF file' },
  { id:'btc',    label:'Crypto Payment',   icon:'₿',  color:'#F7931A', desc:'Bitcoin / ETH address' },
  { id:'menu',   label:'Digital Menu',     icon:'🍽️', color:'#84CC16', desc:'Restaurant menu page' },
  { id:'cal',    label:'Calendar Event',   icon:'📅', color:'#F97316', desc:'Add to calendar' },
  { id:'app',    label:'App Download',     icon:'📱', color:'#A855F7', desc:'App Store / Play Store' },
  { id:'pp',     label:'PayPal',           icon:'💰', color:'#009CDE', desc:'PayPal payment link' },
  { id:'tg',     label:'Telegram',         icon:'✈️', color:'#26A5E4', desc:'Group or channel' },
  { id:'tt',     label:'TikTok',           icon:'🎵', color:'#FF0050', desc:'Creator profile' },
  { id:'sp',     label:'Spotify',          icon:'🎧', color:'#1DB954', desc:'Track or playlist' },
  { id:'dc',     label:'Discord',          icon:'🎮', color:'#5865F2', desc:'Server invite link' },
];

const BENTO = [
  { title:'40+ QR Code Types', desc:"URL, WiFi, vCard, WhatsApp, Crypto, Menu, PDF, Calendar — every type your business could ever need, all under one roof.", icon:'⚡', span:2, color:'#6366F1' },
  { title:'Dynamic QR Codes', desc:'Update your QR destination any time without reprinting. One code. Infinite flexibility.', icon:'🔄', span:1, color:'#22D3EE' },
  { title:'Custom Design Studio', desc:'Dot patterns, eye shapes, gradient fills, frames, and logo embedding. Your brand. Your code.', icon:'🎨', span:1, color:'#A855F7' },
  { title:'Real-Time Scan Analytics', desc:'Track every scan by device, OS, country, city, and time. Know your audience and where your prints perform best.', icon:'📊', span:2, color:'#10B981' },
  { title:'Bulk Generation', desc:'Upload a CSV and create thousands of unique QR codes in a single click. Built for scale.', icon:'⚙️', span:1, color:'#F59E0B' },
  { title:'REST API Access', desc:'Full programmatic QR generation, dynamic updates, and scan analytics directly from your own apps.', icon:'🔌', span:1, color:'#EF4444' },
  { title:'High-Res Export', desc:'SVG vectors, hi-res PNG, and PDF — print-perfect at any size, for any medium.', icon:'📐', span:1, color:'#06B6D4' },
];

const PLANS = [
  { name:'Free',       yr:'$0',  mo:'$0',  pop:false, nc:'#64748B', cc:'#64748B',
    desc:'Perfect for personal projects and small experiments.',
    feats:['10,000 QR codes','Unlimited scans','Basic analytics (1 yr)','PNG export','Email support'],
    cta:'Get Started Free', ctc:'pb-out' },
  { name:'Pro',        yr:'$7',  mo:'$12', pop:true,  nc:'#818CF8', cc:'#6366F1',
    desc:'For teams and businesses that need power and reach.',
    feats:['100,000 QR codes','Dynamic QR codes','3-year analytics history','SVG + PDF export','Zero ads','API access (5k/mo)','Scan email alerts','Priority support'],
    cta:'Upgrade to Pro', ctc:'pb-pri' },
  { name:'Enterprise', yr:'$29', mo:'$49', pop:false, nc:'#22D3EE', cc:'#22D3EE',
    desc:'For high-volume teams that need total control at scale.',
    feats:['Unlimited QR codes','Bulk CSV generation','White-label domain','Custom branding','Team workspace','Unlimited API','SLA guarantee','Dedicated manager'],
    cta:'Contact Sales', ctc:'pb-cyn' },
];

const TESTS = [
  { name:'Priya Sharma',   role:'Marketing Director, TechCorp',  grad:'linear-gradient(135deg,#6366F1,#A855F7)', text:'QRForge transformed our print campaigns. Dynamic QR codes mean we never reprint when a landing page changes. An absolute time saver.' },
  { name:'Carlos Mendez',  role:'Restaurant Owner, Valencia',    grad:'linear-gradient(135deg,#A855F7,#EC4899)', text:'We replaced paper menus entirely. Updating prices or seasonal items takes under a minute. Customers love the modern experience.' },
  { name:'Aisha Rahman',   role:'E-commerce Manager, Nairobi',   grad:'linear-gradient(135deg,#22D3EE,#6366F1)', text:'The analytics dashboard finally gives us print attribution. We know which QR codes perform, on which device, and exactly when.' },
  { name:'Tim Brunner',    role:'Freelance Developer',           grad:'linear-gradient(135deg,#10B981,#22D3EE)', text:"The REST API is clean and well-documented. I integrated QR generation into our event app in under an hour. Exactly what I needed." },
  { name:'Naledi Dlamini', role:'Retail Brand Manager',          grad:'linear-gradient(135deg,#F59E0B,#EF4444)', text:'Bulk generation is a game-changer. Upload a CSV, get 5,000 unique QR codes in minutes. Our packaging workflow is fully automated.' },
  { name:'Henrik Berg',    role:'Logistics Coordinator, Oslo',   grad:'linear-gradient(135deg,#EF4444,#A855F7)', text:'Asset tracking with QRForge cut our inventory audit time in half. Scan alerts keep the whole team in sync without extra tooling.' },
];

const FAQS = [
  { q:'Are QRForge QR codes free to create?', a:'Yes. The Free plan lets you create up to 10,000 QR codes with unlimited scans — no credit card required, ever.' },
  { q:'Do QR codes expire on QRForge?', a:'No. QR codes created on QRForge never expire on any plan. Your codes remain active indefinitely, including on the free tier.' },
  { q:'What is a Dynamic QR Code?', a:'A Dynamic QR code lets you change the destination URL or content after it\'s been printed — without reprinting the physical code. Available on Pro and Enterprise.' },
  { q:'Can I track who scanned my QR codes?', a:'Yes. The analytics dashboard shows scan count, device, OS, country, city, and timestamp for every scan. All plans include analytics.' },
  { q:'What file formats can I export?', a:'PNG on all plans. SVG (print-ready vector) and PDF on Pro and Enterprise. All exports are high-resolution and suitable for any print size.' },
  { q:'Is there a developer API?', a:'Yes — a full REST API for generating, updating, and tracking QR codes programmatically. API access is included in Pro (5k req/mo) and Enterprise (unlimited).' },
];

const COLORS_D = [
  { h:'6366F1', l:'Indigo'  },
  { h:'EF4444', l:'Red'     },
  { h:'10B981', l:'Green'   },
  { h:'F59E0B', l:'Amber'   },
  { h:'111318', l:'Black'   },
];

/* ── Placeholders & QR data builders ─────────────────────────────────── */
const LABELS = { url:'Website URL', text:'Your Text', email:'Email Address', phone:'Phone Number', sms:'Phone Number', wa:'WhatsApp Number', wifi:'Network Name (SSID)', vcard:'Contact Full Name', loc:'Coordinates (lat,lng)', yt:'YouTube URL', ig:'Instagram URL', fb:'Facebook URL', tw:'Twitter/X URL', li:'LinkedIn URL', pdf:'PDF File URL', btc:'Crypto Address', menu:'Menu Page URL', cal:'Event Title', app:'App Store URL', pp:'PayPal.me Link', tg:'Telegram URL', tt:'TikTok URL', sp:'Spotify URL', dc:'Discord Invite URL' };
const PHS   = { url:'https://yoursite.com', text:'Type your message here...', email:'hello@example.com', phone:'+1 234 567 8900', sms:'+1 234 567 8900', wa:'+1 234 567 8900', wifi:'HomeNetwork5G', vcard:'Jane Smith', loc:'40.7128,-74.0060', yt:'https://youtube.com/@channel', ig:'https://instagram.com/handle', fb:'https://facebook.com/page', tw:'https://twitter.com/handle', li:'https://linkedin.com/in/name', pdf:'https://yoursite.com/menu.pdf', btc:'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', menu:'https://yoursite.com/menu', cal:'Product Launch 2025', app:'https://apps.apple.com/...', pp:'https://paypal.me/yourname', tg:'https://t.me/yourchannel', tt:'https://tiktok.com/@handle', sp:'https://open.spotify.com/...', dc:'https://discord.gg/...' };

function buildQrData(tab, val) {
  const v = val.trim() || PHS[tab] || 'https://qrforge.io';
  switch(tab) {
    case 'email': return `mailto:${v}`;
    case 'phone': return `tel:${v.replace(/\s/g,'')}`;
    case 'sms':   return `sms:${v.replace(/\s/g,'')}`;
    case 'wa':    return `https://wa.me/${v.replace(/\D/g,'')}`;
    case 'wifi':  return `WIFI:T:WPA;S:${v};P:secret;;`;
    case 'vcard': return `BEGIN:VCARD\nVERSION:3.0\nFN:${v}\nEND:VCARD`;
    case 'loc':   return `geo:${v}`;
    default:      return v;
  }
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function QRForge() {
  const [tab,     setTab]     = useState('url');
  const [input,   setInput]   = useState('https://qrforge.io');
  const [clr,     setClr]     = useState('6366F1');
  const [billing, setBilling] = useState('yearly');
  const [faqOpen, setFaqOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=182x182&data=${encodeURIComponent(buildQrData(tab,input))}&color=${clr}&bgcolor=ffffff&qzone=1`;
  const tabs8 = QR_TYPES.slice(0, 8);
  const shown  = showAll ? QR_TYPES : QR_TYPES.slice(0, 12);

  return (
    <>
      <style>{CSS}</style>
      <div style={{ background:'#050714', minHeight:'100vh' }}>

        {/* ── NAVBAR ─────────────────────────────────────────────── */}
        <nav className="nav">
          <div className="nav-inner">
            <div className="logo">
              <div className="logo-mark">QF</div>
              <span className="logo-name">QRForge</span>
            </div>
            <div className="nav-links">
              {['Features','Pricing','API Docs','Blog','Industries','Support'].map(l => (
                <span key={l} className="nav-link">{l}</span>
              ))}
            </div>
            <div className="nav-actions">
              <button className="btn-ghost">Sign In</button>
              <button className="btn-primary">Start Free →</button>
            </div>
          </div>
        </nav>

        {/* ── HERO ───────────────────────────────────────────────── */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-dots" />
          <div className="hero-inner">

            {/* Left column */}
            <div>
              <div className="badge">
                <div className="badge-dot" />
                #1 Professional QR Toolkit for Business
              </div>
              <h1 className="hero-h1">
                Generate, Design &amp;<br />
                <span className="grad">Track QR Codes</span><br />
                That Convert
              </h1>
              <p className="hero-sub">
                Build powerful QR codes for 40+ content types. Customize every detail, track every scan, and update links any time — no reprinting, ever.
              </p>
              <div className="hstats">
                <div className="hstat"><div className="hstat-n">146M+</div><div className="hstat-l">QR Codes Created</div></div>
                <div className="hsdiv" />
                <div className="hstat"><div className="hstat-n">3B+</div><div className="hstat-l">Total Scans</div></div>
                <div className="hsdiv" />
                <div className="hstat"><div className="hstat-n">8.1M+</div><div className="hstat-l">Active Users</div></div>
              </div>
              <div className="hero-cta">
                <button className="bxl bxl-p">Create QR Code Free</button>
                <button className="bxl bxl-g">▷ Watch Demo</button>
              </div>
            </div>

            {/* Generator card */}
            <div className="gc">
              <div className="gc-hdr">
                <div className="gc-title">⬡ Live QR Generator</div>
                <div className="gc-live"><div className="live-dot" /> Live Preview</div>
              </div>

              <div className="ttabs">
                {tabs8.map(t => (
                  <button
                    key={t.id}
                    className={`ttab${tab === t.id ? ' on' : ''}`}
                    style={tab === t.id ? { borderColor:`${t.color}80`, color:t.color, background:`${t.color}14` } : {}}
                    onClick={() => { setTab(t.id); setInput(''); }}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>

              <div className="gfield">
                <label className="glabel">{LABELS[tab] || 'Content'}</label>
                <input
                  className="ginput"
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={PHS[tab] || 'Enter content...'}
                />
              </div>

              <div className="gfield">
                <label className="glabel">QR Color</label>
                <div className="cdots">
                  {COLORS_D.map(c => (
                    <div
                      key={c.h}
                      className={`cdot${clr === c.h ? ' sel' : ''}`}
                      style={{ backgroundColor:`#${c.h}` }}
                      title={c.l}
                      onClick={() => setClr(c.h)}
                    />
                  ))}
                </div>
              </div>

              <div className="qr-wrap">
                <div className="qr-frame">
                  <img className="qr-img" src={qrSrc} alt="Generated QR Code" />
                  <div className="qr-tag">QRFORGE</div>
                </div>
                <div className="qrbtns">
                  <button className="dlbtn dl-p">⬇ Download PNG</button>
                  <button className="dlbtn dl-s">⬇ SVG</button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── TRUSTED BY ─────────────────────────────────────────── */}
        <div className="trusted">
          <div className="trusted-inner">
            <div className="tr-lbl">Trusted by leading companies worldwide</div>
            <div className="logos">
              {['Disney','Amazon','Starbucks','UPS','Walmart','Marriott','Honeywell'].map(b => (
                <div key={b} className="lb">{b}</div>
              ))}
            </div>
          </div>
        </div>

        {/* ── QR TYPES ───────────────────────────────────────────── */}
        <section className="sec">
          <div className="si">
            <div className="eyebrow">QR CODE TYPES</div>
            <h2 className="sh2">40+ Types for Every Use Case</h2>
            <p className="ssub">From a simple link to complex business workflows — every QR type your team could ever need, built in.</p>
            <div className="tgrid">
              {shown.map(t => (
                <div key={t.id} className="tcard" onClick={() => { setTab(t.id); setInput(''); window.scrollTo({top:0,behavior:'smooth'}); }}>
                  <div className="tcard-ico" style={{ background:`${t.color}18`, color:t.color }}>{t.icon}</div>
                  <div className="tcard-n">{t.label}</div>
                  <div className="tcard-d">{t.desc}</div>
                  <div className="tbar" style={{ background:t.color }} />
                </div>
              ))}
            </div>
            {!showAll && (
              <button className="smb" onClick={() => setShowAll(true)}>
                View All 40+ Types ↓
              </button>
            )}
          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────────────────── */}
        <section className="sec sec-alt">
          <div className="si">
            <div className="eyebrow">HOW IT WORKS</div>
            <h2 className="sh2">Create a QR Code in Under 60 Seconds</h2>
            <div className="sgrid">
              {[
                { n:'01', title:'Choose a Type', desc:'Select from 40+ QR types — URL, WiFi, vCard, crypto payment, menus, and more.' },
                { n:'02', title:'Enter Your Content', desc:'Add the URL, text, contact, or data you want the code to carry.' },
                { n:'03', title:'Customize Design', desc:'Set colors, dot patterns, corner shapes, frames, and embed your logo.' },
                { n:'04', title:'Download & Deploy', desc:'Export PNG, SVG, or PDF — print-ready or screen-ready instantly.' },
              ].map(s => (
                <div key={s.n} className="step">
                  <div className="snum">{s.n}</div>
                  <h3 className="stit">{s.title}</h3>
                  <p className="sdesc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES BENTO ─────────────────────────────────────── */}
        <section className="sec">
          <div className="si">
            <div className="eyebrow">FEATURES</div>
            <h2 className="sh2">Everything You Need to Win with QR</h2>
            <p className="ssub">A complete professional toolkit — not just a generator.</p>
            <div className="bento">
              {BENTO.map((f, i) => (
                <div key={i} className={`bc${f.span === 2 ? ' bc2' : ''}`}>
                  <span className="bico">{f.icon}</span>
                  <h3 className="btit">{f.title}</h3>
                  <p className="bdesc">{f.desc}</p>
                  <div className="bbar" style={{ background:f.color }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ──────────────────────────────────────────────── */}
        <div className="stats">
          <div className="si2">
            {[
              { ico:'⬡', num:'146M+',  lbl:'QR Codes Generated'     },
              { ico:'📡', num:'3.06B+', lbl:'Total Scans Recorded'   },
              { ico:'👥', num:'8.1M+',  lbl:'Active Users Worldwide' },
              { ico:'🏢', num:'100+',   lbl:'Enterprise Clients'     },
            ].map(s => (
              <div key={s.lbl} className="scard">
                <div className="sico">{s.ico}</div>
                <div className="snum">{s.num}</div>
                <div className="slbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PRICING ────────────────────────────────────────────── */}
        <section className="sec">
          <div className="si">
            <div className="eyebrow">PRICING</div>
            <h2 className="sh2">Simple, Honest Pricing</h2>
            <p className="ssub">No hidden fees. Start free, scale when ready.</p>
            <div className="btog">
              <button className={`tbtn${billing==='monthly'?' on':''}`} onClick={()=>setBilling('monthly')}>Monthly</button>
              <button className={`tbtn${billing==='yearly'?' on':''}`}  onClick={()=>setBilling('yearly')}>
                Yearly <span className="stag">Save 45%</span>
              </button>
            </div>
            <div className="pgrid">
              {PLANS.map(p => (
                <div key={p.name} className={`pcard${p.pop?' pop':''}`}>
                  {p.pop && <div className="pbadge">MOST POPULAR</div>}
                  <div className="pname" style={{ color:p.nc }}>{p.name}</div>
                  <div className="pprice">
                    {billing==='yearly' ? p.yr : p.mo}
                    <span className="pperiod">{p.yr!=='$0' ? (billing==='yearly' ? ' /mo, billed yearly' : ' /month') : ''}</span>
                  </div>
                  <div className="pdesc">{p.desc}</div>
                  <div className="pdiv" />
                  <ul className="pfts">
                    {p.feats.map(f => (
                      <li key={f} className="pft">
                        <span className="pcheck" style={{ color:p.cc }}>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`pbtn ${p.ctc}`}>{p.cta}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ───────────────────────────────────────── */}
        <section className="sec sec-alt">
          <div className="si">
            <div className="eyebrow">TESTIMONIALS</div>
            <h2 className="sh2">Loved by 8 Million+ Users</h2>
            <p className="ssub">From freelancers to Fortune 500 companies — QRForge powers QR codes everywhere.</p>
            <div className="testgrid">
              {TESTS.map((t, i) => (
                <div key={i} className="testcard">
                  <div className="tstars">{'★'.repeat(5)}</div>
                  <p className="ttext">"{t.text}"</p>
                  <div className="tauthor">
                    <div className="tavat" style={{ background:t.grad }}>{t.name[0]}</div>
                    <div>
                      <div className="tname">{t.name}</div>
                      <div className="trole">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section className="sec">
          <div className="si">
            <div className="eyebrow">FAQ</div>
            <h2 className="sh2">Frequently Asked Questions</h2>
            <div className="faqwrap">
              {FAQS.map((f, i) => (
                <div
                  key={i}
                  className={`faqitem${faqOpen===i?' op':''}`}
                  onClick={() => setFaqOpen(faqOpen===i ? null : i)}
                >
                  <div className="faqq">
                    <span>{f.q}</span>
                    <span className="faqi">{faqOpen===i ? '−' : '+'}</span>
                  </div>
                  {faqOpen===i && <div className="faqa">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ─────────────────────────────────────────── */}
        <section className="cta">
          <div className="ctai">
            <h2 className="ctah">Ready to Create Your First QR Code?</h2>
            <p className="ctas">Join 8.1 million users building with QRForge. Free forever — no credit card required.</p>
            <button className="ctabtn">Get Started for Free →</button>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <footer className="foot">
          <div className="footi">
            <div className="ftop">
              {/* Brand */}
              <div>
                <div className="logo">
                  <div className="logo-mark">QF</div>
                  <span className="logo-name">QRForge</span>
                </div>
                <p className="ftagl">The professional QR code platform for businesses, marketers, and developers worldwide.</p>
                <div className="newsl">
                  <input className="nsinp" type="email" placeholder="your@email.com" />
                  <button className="nsbtn">Subscribe</button>
                </div>
              </div>
              {/* Link columns */}
              {[
                { t:'Product',   ls:['QR Generator','Pricing','API Docs','Bulk Generator','QR Scanner','Integrations'] },
                { t:'Use Cases', ls:['Restaurants','E-commerce','Real Estate','Healthcare','Education','Logistics'] },
                { t:'Company',   ls:['About Us','Blog','Careers','Press Kit','Partners','Contact'] },
                { t:'Legal',     ls:['Privacy Policy','Terms of Service','GDPR','Cookie Policy','DPA'] },
              ].map(col => (
                <div key={col.t}>
                  <div className="fctit">{col.t}</div>
                  <div className="flinks">
                    {col.ls.map(l => <a key={l} href="#" className="flink">{l}</a>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="fbottom">
              <span className="fcopy">© 2025 QRForge. All rights reserved.</span>
              <div className="fsocs">
                {['Twitter','LinkedIn','GitHub','YouTube'].map(s => (
                  <a key={s} href="#" className="fsoc">{s}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
