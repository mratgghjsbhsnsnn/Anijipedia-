const INDEX_HTML = String.raw`<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#006887">
  <meta name="description" content="Anijipedia คลังความรู้แห่งโลกอนิจิน ร่วมสร้างและตรวจสอบความรู้ไปด้วยกัน">
  <title>Anijipedia — คลังความรู้แห่งโลกอนิจิน</title>
  <style>:root{--brand:#006887;--brand-deep:#004d65;--brand-soft:#e8f4f7;--ink:#17252d;--muted:#61717a;--line:#dbe4e8;--surface:#fff;--page:#f6f8f9;--success:#16734a;--success-bg:#eaf7ef;--warning:#8d5b00;--warning-bg:#fff5df;--danger:#ad3535;--danger-bg:#fff0f0;--radius:16px;--shadow:0 8px 28px rgba(17,50,63,.06);font-family:Inter,"Noto Sans Thai","Leelawadee UI",Tahoma,system-ui,sans-serif;color:var(--ink);background:var(--page);font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}*{box-sizing:border-box}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}body{margin:0;min-width:320px;background:var(--page);font-size:15px;line-height:1.65}button,input,textarea,select{font:inherit}button,a,input,textarea,select{-webkit-tap-highlight-color:transparent}a{color:var(--brand);text-decoration:none}a:hover{text-decoration:underline}button{cursor:pointer}button:disabled{opacity:.55;cursor:not-allowed}.skip-link{position:absolute;left:-999px;top:8px;z-index:99;background:#fff;padding:10px 14px;border-radius:8px}.skip-link:focus{left:8px}.site-header{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.96);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}.header-inner{max-width:1200px;margin:auto;padding:10px 24px;min-height:76px;display:flex;align-items:center;gap:24px}.brand{display:flex;align-items:center;gap:11px;color:var(--ink);min-width:225px}.brand:hover{text-decoration:none}.brand-mark{height:42px;width:42px;border-radius:13px;background:var(--brand);display:grid;place-items:center;flex:none}.brand-mark svg{width:31px;height:31px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.brand-copy{display:flex;flex-direction:column;line-height:1.28}.brand-copy strong{font-size:19px;letter-spacing:-.4px}.brand-copy small{font-size:11px;color:var(--muted);margin-top:3px}.primary-nav{display:flex;gap:8px;align-items:center;flex:1}.primary-nav a{color:#4b5d66;padding:10px 12px;border-radius:10px;font-size:14px}.primary-nav a:hover,.primary-nav a.active{color:var(--brand);background:var(--brand-soft);text-decoration:none}.account-nav{display:flex;gap:8px;align-items:center;justify-content:flex-end;flex-wrap:wrap}.account-name{max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#43545c;font-size:13px;padding:0 4px}.btn{border:1px solid transparent;border-radius:10px;min-height:44px;padding:10px 16px;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:650;text-align:center;text-decoration:none!important;line-height:1.25;transition:background .16s,border-color .16s,transform .16s}.btn:hover{transform:translateY(-1px)}.btn-primary{background:var(--brand);color:white}.btn-primary:hover{background:var(--brand-deep)}.btn-secondary{background:var(--brand-soft);color:var(--brand);border-color:#d2e8ee}.btn-quiet{background:white;border-color:var(--line);color:var(--ink)}.btn-danger{background:var(--danger-bg);color:var(--danger);border-color:#f2caca}.btn-success{background:var(--success-bg);color:var(--success);border-color:#ccebd8}.btn-small{min-height:38px;padding:8px 12px;font-size:13px}.btn-wide{width:100%}.btn-link{background:none;border:0;padding:8px 0;color:var(--brand);font-weight:650}.page-shell{max-width:1200px;min-height:60vh;margin:0 auto;padding:28px 24px 64px}.site-footer{border-top:1px solid var(--line);background:#fff}.footer-inner{max-width:1200px;margin:auto;padding:25px 24px 32px;display:flex;align-items:center;gap:20px;flex-wrap:wrap}.footer-brand{font-weight:800;color:var(--brand);font-size:17px}.footer-inner p{margin:0;color:var(--muted);font-size:13px;flex:1}.footer-inner small{color:#89959b;font-size:11px}.footer-links{display:flex;gap:16px;font-size:12px}.hero{position:relative;overflow:hidden;border-radius:24px;background:var(--brand);color:#fff;padding:clamp(28px,5vw,58px);display:grid;grid-template-columns:minmax(0,1.4fr) minmax(200px,.6fr);align-items:center;gap:28px;box-shadow:var(--shadow)}.hero:after{content:"";position:absolute;width:330px;height:330px;border:1px solid rgba(255,255,255,.13);border-radius:50%;right:-110px;top:-150px;box-shadow:0 0 0 30px rgba(255,255,255,.035),0 0 0 60px rgba(255,255,255,.025);pointer-events:none}.eyebrow{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.85}.hero h1{font-size:clamp(30px,4.6vw,52px);letter-spacing:-1.2px;line-height:1.22;margin:10px 0 12px;max-width:670px}.hero p{max-width:630px;color:#e2f2f5;margin:0 0 24px}.search-form{display:flex;gap:8px;max-width:690px;padding:6px;background:#fff;border-radius:13px;box-shadow:0 8px 25px rgba(0,0,0,.12)}.search-form input{min-width:0;flex:1;border:0;outline:0;padding:9px 12px;background:transparent;color:var(--ink)}.search-form .btn{min-height:44px;white-space:nowrap}.hero-aside{position:relative;z-index:1;padding:23px;border:1px solid rgba(255,255,255,.22);border-radius:18px;background:rgba(255,255,255,.09);backdrop-filter:blur(5px)}.hero-aside strong{font-size:38px;line-height:1.2;display:block}.hero-aside span{display:block;color:#d9edf1;font-size:13px}.hero-aside hr{border:0;border-top:1px solid rgba(255,255,255,.22);margin:18px 0}.section{margin-top:36px}.section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:16px}.section-head h2{font-size:22px;margin:0;letter-spacing:-.4px}.section-head p{margin:3px 0 0;color:var(--muted);font-size:13px}.category-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.category-card{display:block;background:#fff;border:1px solid var(--line);border-radius:14px;padding:17px;color:var(--ink);min-height:104px;transition:border .15s,transform .15s}.category-card:hover{border-color:#92c4d1;transform:translateY(-2px);text-decoration:none}.category-symbol{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:var(--brand-soft);color:var(--brand);font-weight:800;font-size:16px;margin-bottom:10px}.category-card strong{display:block;font-size:14px}.category-card small{display:block;color:var(--muted);font-size:12px;margin-top:2px}.content-grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(280px,.8fr);gap:24px;align-items:start}.panel{background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden}.panel-head{padding:17px 20px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:10px}.panel-head h2,.panel-head h3{margin:0;font-size:16px}.panel-body{padding:6px 20px}.article-row{padding:17px 0;border-bottom:1px solid #edf1f3}.article-row:last-child{border-bottom:0}.article-row h3{font-size:16px;line-height:1.45;margin:0 0 5px}.article-row h3 a{color:var(--ink)}.article-row p{color:#596a73;font-size:13px;margin:0 0 9px;line-height:1.7}.article-meta{display:flex;align-items:center;gap:9px;flex-wrap:wrap;color:var(--muted);font-size:11px}.dot{height:3px;width:3px;border-radius:50%;background:#94a2a9}.tag{display:inline-flex;align-items:center;max-width:100%;border-radius:100px;background:var(--brand-soft);color:var(--brand);padding:4px 9px;font-size:11px;font-weight:650}.tag.status-pending{background:var(--warning-bg);color:var(--warning)}.tag.status-published,.tag.status-approved,.tag.status-active{background:var(--success-bg);color:var(--success)}.tag.status-rejected,.tag.status-suspended{background:var(--danger-bg);color:var(--danger)}.empty-state,.loading-state{padding:36px 16px;text-align:center;color:var(--muted)}.empty-state strong{display:block;color:var(--ink);font-size:15px;margin-bottom:5px}.empty-state p{margin:0 0 15px;font-size:13px}.loader{display:inline-block;width:24px;height:24px;border:3px solid #d8e7eb;border-top-color:var(--brand);border-radius:50%;animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.page-heading{margin:3px 0 23px}.page-heading .eyebrow{color:var(--brand);opacity:1}.page-heading h1{font-size:clamp(27px,4vw,38px);letter-spacing:-.8px;line-height:1.3;margin:5px 0 8px}.page-heading p{margin:0;color:var(--muted);max-width:760px}.toolbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:18px}.toolbar .search-form{flex:1;min-width:min(100%,300px);max-width:none;border:1px solid var(--line);box-shadow:none}.toolbar select{background:white;border:1px solid var(--line);border-radius:10px;padding:11px 36px 11px 12px;min-height:44px;max-width:100%}.article-list{display:grid;grid-template-columns:1fr;gap:0}.article-page{max-width:900px;margin:0 auto}.breadcrumbs{font-size:12px;color:var(--muted);margin-bottom:20px}.breadcrumbs a{color:var(--brand)}.article-header{padding:0 0 21px;border-bottom:1px solid var(--line);margin-bottom:25px}.article-header h1{font-size:clamp(30px,5vw,44px);letter-spacing:-1px;line-height:1.25;margin:14px 0 11px;overflow-wrap:anywhere}.article-summary{font-size:17px;color:#51636c;line-height:1.8;margin:0 0 15px}.article-tools{display:flex;gap:8px;flex-wrap:wrap;margin-top:18px}.article-content{font-size:16px;line-height:1.95;overflow-wrap:anywhere}.article-content p{margin:0 0 1.25em;white-space:normal}.article-content p:empty{display:none}.article-content h2{font-size:24px;margin:1.7em 0 .55em}.article-content h3{font-size:20px;margin:1.4em 0 .5em}.article-content a{overflow-wrap:anywhere}.article-bottom{border-top:1px solid var(--line);margin-top:35px;padding-top:20px;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}.content-note{background:#f0f6f8;border-left:3px solid var(--brand);padding:13px 15px;border-radius:0 10px 10px 0;color:#4a5d65;font-size:13px;margin-top:24px}.form-card{max-width:580px;margin:0 auto;background:#fff;border:1px solid var(--line);border-radius:20px;padding:clamp(22px,4vw,34px);box-shadow:var(--shadow)}.form-card h1{margin:0 0 7px;font-size:26px;letter-spacing:-.6px}.form-intro{margin:0 0 24px;color:var(--muted);font-size:13px}.field{margin-bottom:17px}.field label{font-size:13px;font-weight:700;display:block;margin-bottom:7px}.field .hint{font-size:11px;color:var(--muted);margin-top:5px}.input,.field input,.field textarea,.field select{display:block;width:100%;min-height:46px;border:1px solid #cfdbe0;border-radius:10px;background:#fff;padding:11px 12px;color:var(--ink);outline:0}.field textarea{min-height:122px;resize:vertical;line-height:1.75}.field .article-editor{min-height:320px}.input:focus,.field input:focus,.field textarea:focus,.field select:focus{border-color:var(--brand);box-shadow:0 0 0 3px rgba(0,104,135,.1)}.form-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:24px}.form-actions .btn{flex:1}.form-footnote{font-size:12px;text-align:center;color:var(--muted);margin:17px 0 0}.alert{border-radius:10px;padding:12px 14px;margin-bottom:15px;font-size:13px}.alert-info{background:var(--brand-soft);color:var(--brand-deep)}.alert-warning{background:var(--warning-bg);color:var(--warning)}.alert-danger{background:var(--danger-bg);color:var(--danger)}.alert-success{background:var(--success-bg);color:var(--success)}.dashboard-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:19px 0 26px}.metric-card{border:1px solid var(--line);border-radius:14px;background:#fff;padding:17px}.metric-card span{color:var(--muted);font-size:12px;display:block}.metric-card strong{font-size:28px;line-height:1.3;display:block;margin-top:6px;letter-spacing:-.8px}.tabs{display:flex;gap:6px;overflow-x:auto;padding:4px;background:#eaf0f2;border-radius:12px;margin:20px 0;scrollbar-width:thin}.tabs a,.tabs button{border:0;background:transparent;white-space:nowrap;border-radius:9px;padding:10px 14px;min-height:42px;color:#53646c;font-size:13px;font-weight:650}.tabs a.active,.tabs button.active{background:#fff;color:var(--brand);box-shadow:0 1px 3px rgba(20,45,56,.07);text-decoration:none}.stack{display:flex;flex-direction:column;gap:12px}.data-card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:17px}.data-card h3{margin:0 0 6px;font-size:16px;overflow-wrap:anywhere}.data-card p{color:var(--muted);font-size:13px;margin:0 0 12px;white-space:normal;overflow-wrap:anywhere}.data-card .card-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:13px}.data-card .card-actions .btn{min-height:38px;font-size:12px;padding:8px 11px}.split-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,.65fr);gap:18px;align-items:start}.policy-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}.policy-card{padding:19px;border:1px solid var(--line);border-radius:15px;background:white}.policy-card .num{height:30px;width:30px;border-radius:10px;background:var(--brand-soft);color:var(--brand);display:grid;place-items:center;font-weight:800;margin-bottom:12px}.policy-card h3{font-size:15px;margin:0 0 7px}.policy-card p{font-size:13px;color:var(--muted);margin:0;line-height:1.8}.callout{padding:17px;border-radius:13px;background:#eef6f8;border:1px solid #d8ebef;color:#3e5660;font-size:13px}.callout strong{color:var(--brand-deep)}.pagination{display:flex;justify-content:center;align-items:center;gap:10px;margin-top:22px}.pagination span{font-size:12px;color:var(--muted)}.admin-label{color:var(--brand);font-size:11px;font-weight:800;letter-spacing:.06em}.toast-region{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:100;display:flex;flex-direction:column;gap:8px;max-width:min(390px,calc(100vw - 32px));pointer-events:none}.toast{background:#183944;color:white;padding:12px 16px;border-radius:12px;box-shadow:0 8px 25px rgba(12,33,40,.2);font-size:13px;animation:toast-in .2s ease-out}.toast.error{background:#8d2828}.toast.success{background:#176444}@keyframes toast-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.mobile-only{display:none}.muted{color:var(--muted)}.small{font-size:12px}.divider{height:1px;background:var(--line);margin:18px 0}.empty-inline{font-size:13px;color:var(--muted);padding:14px 0}.editor-counter{text-align:right;font-size:11px;color:var(--muted);margin-top:4px}.kbd{font:inherit;background:#eef2f4;border:1px solid #dce4e8;padding:1px 5px;border-radius:4px}.danger-zone{border:1px solid #f0cccc;background:#fffafa;padding:16px;border-radius:12px}
@media(max-width:900px){.header-inner{gap:14px;padding:10px 18px;flex-wrap:wrap}.brand{min-width:190px;flex:1}.primary-nav{order:3;flex-basis:100%;border-top:1px solid #edf1f3;padding-top:5px}.primary-nav a{padding:7px 10px}.account-nav{margin-left:auto}.hero{grid-template-columns:1fr}.hero-aside{display:none}.category-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.content-grid{grid-template-columns:1fr}.dashboard-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.policy-list{grid-template-columns:1fr}.split-layout{grid-template-columns:1fr}}
@media(max-width:560px){body{font-size:14px}.header-inner{padding:9px 13px;gap:9px}.brand{min-width:0;gap:8px}.brand-mark{height:37px;width:37px;border-radius:11px}.brand-mark svg{width:28px;height:28px}.brand-copy strong{font-size:17px}.brand-copy small{font-size:10px}.account-nav{gap:5px}.account-nav .btn{padding:7px 9px;font-size:11px;min-height:34px}.account-name{display:none}.primary-nav{gap:3px;overflow-x:auto;white-space:nowrap;padding-top:2px}.primary-nav a{font-size:12px;padding:7px 9px}.page-shell{padding:16px 13px 42px}.hero{padding:27px 19px;border-radius:18px;gap:18px}.hero h1{font-size:32px;letter-spacing:-.8px}.hero p{font-size:13px;margin-bottom:18px}.eyebrow{font-size:10px}.search-form{gap:4px}.search-form input{padding:8px;font-size:13px}.search-form .btn{padding:8px 11px;font-size:12px}.section{margin-top:28px}.section-head{align-items:flex-start}.section-head h2{font-size:19px}.category-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.category-card{padding:13px;min-height:95px}.category-symbol{width:29px;height:29px;margin-bottom:7px}.category-card strong{font-size:13px}.category-card small{font-size:11px}.panel-head{padding:14px}.panel-body{padding:5px 14px}.article-row{padding:14px 0}.article-row h3{font-size:15px}.article-row p{font-size:12px}.footer-inner{padding:22px 14px;gap:10px}.footer-inner p{flex-basis:100%;order:3}.footer-links{margin-left:auto}.footer-inner small{flex-basis:100%;order:4}.page-heading{margin-bottom:19px}.page-heading h1{font-size:29px}.article-header h1{font-size:30px}.article-summary{font-size:15px}.article-content{font-size:15px}.article-content h2{font-size:21px}.article-content h3{font-size:18px}.article-tools .btn{flex:1;font-size:12px;padding:8px}.form-card{padding:21px 17px;border-radius:16px}.form-card h1{font-size:24px}.form-actions .btn{flex-basis:100%}.dashboard-grid{gap:8px}.metric-card{padding:13px}.metric-card strong{font-size:24px}.tabs{margin:16px 0}.tabs a,.tabs button{padding:9px 11px;font-size:12px}.data-card{padding:14px}.toolbar{gap:7px}.toolbar select{width:100%}.toolbar .search-form{min-width:100%}.article-meta{gap:7px}.mobile-only{display:block}.desktop-only{display:none}.toast-region{right:10px;bottom:calc(10px + env(safe-area-inset-bottom));max-width:calc(100vw - 20px)}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
</style>
</head>
<body>
  <a class="skip-link" href="#main-content">ข้ามไปยังเนื้อหา</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="#/" aria-label="Anijipedia หน้าหลัก">
        <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40" role="img"><path d="M5 9.5c5.5-2.2 10.1-1.3 15 2.2v20c-4.9-3.5-9.5-4.4-15-2.2z"/><path d="M35 9.5c-5.5-2.2-10.1-1.3-15 2.2v20c4.9-3.5 9.5-4.4 15-2.2z"/><path d="M20 11.7v20"/></svg></span>
        <span class="brand-copy"><strong>Anijipedia</strong><small>คลังความรู้แห่งโลกอนิจิน</small></span>
      </a>
      <nav class="primary-nav" aria-label="เมนูหลัก">
        <a href="#/search">ค้นหาความรู้</a>
        <a href="#/how">วิธีใช้งาน</a>
      </nav>
      <div id="account-nav" class="account-nav"><a class="btn btn-quiet btn-small" href="#/login">เข้าสู่ระบบ</a><a class="btn btn-primary btn-small" href="#/register">สมัครสมาชิก</a></div>
    </div>
  </header>
  <main id="main-content" class="page-shell" tabindex="-1"><div class="loading-state"><span class="loader"></span><p>กำลังเปิดคลังความรู้…</p></div></main>
  <footer class="site-footer">
    <div class="footer-inner"><a class="footer-brand" href="#/">Anijipedia</a><p>ความรู้ที่ดี เริ่มจากการร่วมกันสร้างและตรวจสอบ</p><div class="footer-links"><a href="#/how">แนวทางการเขียน</a><a href="#/search">สารบัญบทความ</a></div><small>โครงการชุมชนความรู้แห่งโลกอนิจิน</small></div>
  </footer>
  <div id="toast-region" class="toast-region" aria-live="polite" aria-atomic="true"></div>
  <script>(function () {
  'use strict';
  var app = document.getElementById('main-content');
  var accountNav = document.getElementById('account-nav');
  var toastRegion = document.getElementById('toast-region');
  var auth = { user: null, csrf: null };
  var renderSeq = 0;
  var cachedCategories = null;
  var statusNames = { draft: 'ฉบับร่าง', pending: 'รอตรวจสอบ', published: 'เผยแพร่แล้ว', approved: 'อนุมัติแล้ว', rejected: 'ต้องแก้ไข', suspended: 'ถูกระงับ', active: 'ใช้งานได้', archived: 'เก็บเข้าคลัง' };
  var statusClass = { draft: '', pending: 'status-pending', published: 'status-published', approved: 'status-approved', rejected: 'status-rejected', suspended: 'status-suspended', active: 'status-active', archived: '' };

  function esc(value) {
    return String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function fmtDate(value) {
    if (!value) return '—';
    var d = new Date(value);
    if (isNaN(d.getTime())) return '—';
    try { return new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium' }).format(d); } catch (_) { return d.toLocaleDateString('th-TH'); }
  }
  function fmtNumber(value) {
    return new Intl.NumberFormat('th-TH').format(Number(value || 0));
  }
  function statusTag(status) {
    return '<span class="tag ' + (statusClass[status] || '') + '">' + esc(statusNames[status] || status || 'ไม่ระบุสถานะ') + '</span>';
  }
  function toast(message, type) {
    var el = document.createElement('div');
    el.className = 'toast' + (type ? ' ' + type : '');
    el.textContent = message;
    toastRegion.appendChild(el);
    window.setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 3600);
  }
  function setBusy(button, busy, busyLabel) {
    if (!button) return;
    if (busy) {
      button.dataset.originalText = button.textContent;
      button.textContent = busyLabel || 'กำลังดำเนินการ…';
      button.disabled = true;
    } else {
      button.textContent = button.dataset.originalText || button.textContent;
      button.disabled = false;
    }
  }
  async function api(path, options) {
    options = options || {};
    var method = (options.method || 'GET').toUpperCase();
    var headers = { 'Accept': 'application/json' };
    if (options.body !== undefined && options.body !== null && typeof options.body !== 'string') {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(options.body);
    }
    if (options.headers) Object.keys(options.headers).forEach(function (key) { headers[key] = options.headers[key]; });
    if (method !== 'GET' && method !== 'HEAD' && auth.csrf) headers['X-CSRF-Token'] = auth.csrf;
    var response = await fetch(path, { method: method, headers: headers, body: options.body, credentials: 'same-origin', cache: 'no-store' });
    var data;
    try { data = await response.json(); } catch (_) { data = {}; }
    if (!response.ok) {
      if (response.status === 401 && path !== '/api/me') {
        auth.user = null;
        auth.csrf = null;
      }
      var apiError = new Error(data.error || 'เกิดข้อผิดพลาด (' + response.status + ')');
      apiError.status = response.status;
      throw apiError;
    }
    return data;
  }
  async function refreshAuth() {
    try {
      var data = await api('/api/me');
      auth.user = data.user || null;
      auth.csrf = data.csrf || null;
    } catch (_) { auth.user = null; auth.csrf = null; }
    renderAccountNav();
  }
  function renderAccountNav() {
    if (!auth.user) {
      accountNav.innerHTML = '<a class="btn btn-quiet btn-small" href="#/login">เข้าสู่ระบบ</a><a class="btn btn-primary btn-small" href="#/register">สมัครสมาชิก</a>';
      return;
    }
    accountNav.innerHTML = '<span class="account-name">' + esc(auth.user.username) + '</span><a class="btn btn-quiet btn-small" href="#/my">พื้นที่ของฉัน</a>' + (auth.user.role === 'admin' ? '<a class="btn btn-secondary btn-small" href="#/admin">แอดมิน</a>' : '') + '<button class="btn btn-quiet btn-small" type="button" data-action="logout">ออกจากระบบ</button>';
  }
  async function getCategories(force) {
    if (cachedCategories && !force) return cachedCategories;
    var data = await api('/api/categories');
    cachedCategories = data.categories || [];
    return cachedCategories;
  }
  function categoryLink(category) {
    return '<a class="tag" href="#/search?category=' + encodeURIComponent(category.id) + '">' + esc(category.name) + '</a>';
  }
  function articleRow(article) {
    return '<article class="article-row"><h3><a href="#/wiki/' + encodeURIComponent(article.id) + '">' + esc(article.title) + '</a></h3>' + (article.summary ? '<p>' + esc(article.summary) + '</p>' : '') + '<div class="article-meta">' + categoryLink({ id: article.category_id, name: article.category_name || 'ไม่จัดหมวดหมู่' }) + '<span>' + esc(article.author_name || 'ไม่ทราบผู้เขียน') + '</span><span class="dot"></span><span>' + fmtDate(article.published_at || article.updated_at) + '</span><span class="dot"></span><span>' + fmtNumber(article.views) + ' ครั้ง</span></div></article>';
  }
  function emptyState(title, text, action) {
    return '<div class="empty-state"><strong>' + esc(title) + '</strong><p>' + esc(text) + '</p>' + (action || '') + '</div>';
  }
  function pageHeading(eyebrow, title, description) {
    return '<div class="page-heading"><div class="eyebrow">' + esc(eyebrow || '') + '</div><h1>' + esc(title) + '</h1>' + (description ? '<p>' + esc(description) + '</p>' : '') + '</div>';
  }
  function queryFromHash() {
    var hash = location.hash || '#/';
    var qIndex = hash.indexOf('?');
    return new URLSearchParams(qIndex >= 0 ? hash.slice(qIndex + 1) : '');
  }
  function routePath() {
    var hash = location.hash || '#/';
    var text = hash.slice(1).split('?')[0];
    return text || '/';
  }
  function safeBack(defaultHash) {
    if (history.length > 1) history.back(); else location.hash = defaultHash || '#/';
  }
  function inlineContent(value) {
    var text = String(value || '');
    var expression = /\*\*(.+?)\*\*|(https?:\/\/[^\s<>]+)/g;
    var output = '', last = 0, match;
    while ((match = expression.exec(text))) {
      output += esc(text.slice(last, match.index));
      if (match[1] !== undefined) {
        output += '<strong>' + esc(match[1]) + '</strong>';
      } else {
        var rawUrl = match[2], cleanUrl = rawUrl, trailing = '';
        while (/[.,!?;:)]$/.test(cleanUrl)) { trailing = cleanUrl.slice(-1) + trailing; cleanUrl = cleanUrl.slice(0, -1); }
        if (/^https?:\/\//i.test(cleanUrl)) output += '<a href="' + esc(cleanUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(cleanUrl) + '</a>' + esc(trailing);
        else output += esc(rawUrl);
      }
      last = match.index + match[0].length;
    }
    output += esc(text.slice(last));
    return output;
  }
  function contentHtml(value) {
    var lines = String(value || '').replace(/\r\n?/g, '\n').split('\n');
    var output = [], paragraph = [], listType = '' , listItems = [];
    function flushParagraph() {
      if (paragraph.length) { output.push('<p>' + paragraph.map(inlineContent).join('<br>') + '</p>'); paragraph = []; }
    }
    function flushList() {
      if (listItems.length) { output.push('<' + listType + '>' + listItems.map(function (item) { return '<li>' + inlineContent(item) + '</li>'; }).join('') + '</' + listType + '>'); listItems = []; listType = ''; }
    }
    lines.forEach(function (line) {
      if (!line.trim()) { flushParagraph(); flushList(); return; }
      var heading = line.match(/^\s*(#{2,3})\s+(.+)$/);
      var unordered = line.match(/^\s*[-*]\s+(.+)$/);
      var ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);
      if (heading) { flushParagraph(); flushList(); var tag = heading[1].length === 2 ? 'h2' : 'h3'; output.push('<' + tag + '>' + inlineContent(heading[2]) + '</' + tag + '>'); }
      else if (unordered || ordered) {
        flushParagraph();
        var nextType = unordered ? 'ul' : 'ol';
        if (listType && listType !== nextType) flushList();
        listType = nextType; listItems.push((unordered || ordered)[1]);
      } else { flushList(); paragraph.push(line); }
    });
    flushParagraph(); flushList();
    return output.join('');
  }
  function bindCounter(input, counter, max) {
    var field = document.getElementById(input), label = document.getElementById(counter);
    if (!field || !label) return;
    function update() { label.textContent = field.value.length + ' / ' + max; }
    field.addEventListener('input', update); update();
  }
  async function render() {
    var mySeq = ++renderSeq;
    app.innerHTML = '<div class="loading-state"><span class="loader"></span><p>กำลังโหลดข้อมูล…</p></div>';
    var path = routePath();
    var query = queryFromHash();
    try {
      if (path === '/' || path === '') await renderHome(mySeq);
      else if (path === '/search') await renderSearch(query, mySeq);
      else if (path === '/login') renderLogin();
      else if (path === '/register') renderRegister();
      else if (path === '/how') renderHow();
      else if (path === '/my') await renderMy(mySeq, query);
      else if (path === '/write' || path.indexOf('/write/') === 0) await renderWrite(path, query, mySeq);
      else if (path.indexOf('/wiki/') === 0) await renderArticle(path.split('/')[2], mySeq);
      else if (path === '/admin') await renderAdmin(query, mySeq);
      else if (path.indexOf('/admin/review/') === 0) await renderAdminReview(path.split('/')[3], mySeq);
      else if (path.indexOf('/history/') === 0) await renderHistory(path.split('/')[2], mySeq);
      else renderNotFound();
    } catch (error) {
      if (mySeq !== renderSeq) return;
      app.innerHTML = '<div class="form-card"><h1>เปิดหน้านี้ไม่สำเร็จ</h1><p class="muted">' + esc(error.message || 'ไม่สามารถโหลดข้อมูลได้') + '</p><div class="form-actions"><button class="btn btn-primary" type="button" data-action="retry">ลองอีกครั้ง</button><a class="btn btn-quiet" href="#/">กลับหน้าหลัก</a></div></div>';
    }
    if (mySeq === renderSeq) window.scrollTo({ top: 0, behavior: 'auto' });
  }
  async function renderHome(seq) {
    var results = await Promise.all([api('/api/stats'), getCategories(), api('/api/articles?sort=latest&page=1&limit=5'), api('/api/articles?sort=popular&page=1&limit=4')]);
    if (seq !== renderSeq) return;
    var stats = results[0], categories = results[1], recent = results[2], popular = results[3];
    var cats = categories.map(function (cat, i) { return '<a class="category-card" href="#/search?category=' + encodeURIComponent(cat.id) + '"><span class="category-symbol">' + esc((cat.name || 'ค').charAt(0)) + '</span><strong>' + esc(cat.name) + '</strong><small>' + esc(cat.description || 'สำรวจบทความในหมวดนี้') + '</small></a>'; }).join('');
    var recentHtml = recent.items.length ? recent.items.map(articleRow).join('') : emptyState('ยังไม่มีบทความเผยแพร่', 'เริ่มต้นสร้างคลังความรู้ด้วยบทความแรกของชุมชน', '<a class="btn btn-primary btn-small" href="#/write">เขียนบทความแรก</a>');
    var popularHtml = popular.items.length ? popular.items.map(articleRow).join('') : emptyState('ยังไม่มีบทความยอดนิยม', 'บทความที่ผ่านการตรวจสอบจะปรากฏในส่วนนี้');
    app.innerHTML = '<section class="hero"><div><div class="eyebrow">ANJIPEDIA · KNOWLEDGE COMMUNITY</div><h1>ความรู้ของโลกอนิจิน<br>เริ่มต้นที่นี่</h1><p>คลังความรู้ที่ทุกคนร่วมเขียนได้ ทุกบทความผ่านการตรวจสอบก่อนเผยแพร่ เพื่อให้ข้อมูลน่าเชื่อถือและเป็นประโยชน์ต่อชุมชน</p><form class="search-form" data-form="home-search"><input type="search" name="q" aria-label="ค้นหาความรู้" placeholder="ค้นหาประเทศ บุคคล ประวัติศาสตร์…" maxlength="120"><button class="btn btn-primary" type="submit">ค้นหา</button></form></div><aside class="hero-aside"><strong>' + fmtNumber(stats.articles) + '</strong><span>บทความที่เผยแพร่แล้ว</span><hr><strong>' + fmtNumber(stats.contributors) + '</strong><span>ผู้ร่วมสร้างคลังความรู้</span></aside></section>' +
      '<section class="section"><div class="section-head"><div><h2>สำรวจตามหมวดหมู่</h2><p>เลือกหัวข้อที่คุณสนใจเพื่อเริ่มค้นคว้า</p></div><a href="#/search">ดูบทความทั้งหมด →</a></div><div class="category-grid">' + cats + '</div></section>' +
      '<section class="section content-grid"><div class="panel"><div class="panel-head"><h2>บทความล่าสุด</h2><a href="#/search?sort=latest" class="small">ดูทั้งหมด →</a></div><div class="panel-body article-list">' + recentHtml + '</div></div><div class="panel"><div class="panel-head"><h2>บทความยอดนิยม</h2></div><div class="panel-body article-list">' + popularHtml + '</div></div></section>' +
      '<section class="section"><div class="callout"><strong>ร่วมเป็นผู้สร้างความรู้</strong><br>ค้นคว้าข้อมูลให้รอบด้าน ระบุแหล่งอ้างอิงในเนื้อหา และส่งบทความให้ผู้ดูแลตรวจสอบก่อนเผยแพร่ <a href="#/how">อ่านแนวทางการเขียน →</a></div></section>';
  }
  async function renderSearch(query, seq) {
    var q = query.get('q') || '';
    var category = query.get('category') || '';
    var sort = query.get('sort') || 'latest';
    var page = Math.max(1, Number(query.get('page') || 1));
    var cats = await getCategories();
    if (seq !== renderSeq) return;
    var params = new URLSearchParams();
    if (q) params.set('q', q);
    if (category) params.set('category', category);
    params.set('sort', sort); params.set('page', String(page)); params.set('limit', '12');
    var data = await api('/api/articles?' + params.toString());
    if (seq !== renderSeq) return;
    var options = '<option value="">ทุกหมวดหมู่</option>' + cats.map(function (c) { return '<option value="' + esc(c.id) + '"' + (String(c.id) === String(category) ? ' selected' : '') + '>' + esc(c.name) + '</option>'; }).join('');
    var items = data.items.length ? data.items.map(articleRow).join('') : emptyState('ไม่พบบทความที่ตรงกัน', 'ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น');
    var totalPages = Math.max(1, Math.ceil(data.total / data.limit));
    app.innerHTML = pageHeading('KNOWLEDGE LIBRARY', 'ค้นหาความรู้', 'ค้นหาบทความที่เผยแพร่แล้วในคลัง Anijipedia') +
      '<div class="toolbar"><form class="search-form" data-form="search"><input type="search" name="q" value="' + esc(q) + '" placeholder="พิมพ์คำค้นหา…" aria-label="คำค้นหา" maxlength="120"><button class="btn btn-primary" type="submit">ค้นหา</button></form><select id="search-category" aria-label="กรองหมวดหมู่"><option value="">ทุกหมวดหมู่</option>' + options + '</select><select id="search-sort" aria-label="เรียงลำดับ"><option value="latest"' + (sort === 'latest' ? ' selected' : '') + '>ใหม่ล่าสุด</option><option value="popular"' + (sort === 'popular' ? ' selected' : '') + '>ยอดนิยม</option><option value="title"' + (sort === 'title' ? ' selected' : '') + '>ตามชื่อ</option></select></div>' +
      '<div class="panel"><div class="panel-head"><h2>ผลการค้นหา</h2><span class="small muted">' + fmtNumber(data.total) + ' บทความ</span></div><div class="panel-body article-list">' + items + '</div></div>' +
      (totalPages > 1 ? '<div class="pagination"><button class="btn btn-quiet btn-small" data-action="page" data-page="' + (page - 1) + '"' + (page <= 1 ? ' disabled' : '') + '>← ก่อนหน้า</button><span>หน้า ' + fmtNumber(page) + ' จาก ' + fmtNumber(totalPages) + '</span><button class="btn btn-quiet btn-small" data-action="page" data-page="' + (page + 1) + '"' + (page >= totalPages ? ' disabled' : '') + '>ถัดไป →</button></div>' : '');
    var selectCategory = document.getElementById('search-category');
    var selectSort = document.getElementById('search-sort');
    selectCategory.addEventListener('change', function () { navigateSearch(q, this.value, sort, 1); });
    selectSort.addEventListener('change', function () { navigateSearch(q, category, this.value, 1); });
  }
  function navigateSearch(q, category, sort, page) {
    var p = new URLSearchParams(); if (q) p.set('q', q); if (category) p.set('category', category); if (sort) p.set('sort', sort); if (page) p.set('page', page);
    location.hash = '/search?' + p.toString();
  }
  function renderLogin() {
    app.innerHTML = '<div class="form-card"><div class="eyebrow" style="color:var(--brand);opacity:1">WELCOME BACK</div><h1>เข้าสู่ระบบ</h1><p class="form-intro">เข้าสู่ระบบเพื่อร่วมสร้างและติดตามความรู้ใน Anijipedia</p><form data-form="login"><div class="field"><label for="login-email">อีเมล</label><input id="login-email" name="email" type="email" autocomplete="email" maxlength="180" required></div><div class="field"><label for="login-password">รหัสผ่าน</label><input id="login-password" name="password" type="password" autocomplete="current-password" required></div><div class="form-actions"><button class="btn btn-primary btn-wide" type="submit">เข้าสู่ระบบ</button></div></form><p class="form-footnote">ยังไม่มีบัญชี? <a href="#/register">สมัครสมาชิก</a></p></div>';
  }
  function renderRegister() {
    app.innerHTML = '<div class="form-card"><div class="eyebrow" style="color:var(--brand);opacity:1">JOIN THE COMMUNITY</div><h1>สร้างบัญชี Anijipedia</h1><p class="form-intro">บัญชีสมาชิกสามารถเขียนฉบับร่าง ส่งบทความให้ตรวจสอบ และบันทึกบทความที่สนใจได้</p><div class="alert alert-info">บทความที่ส่งเข้าระบบจะยังไม่ปรากฏต่อสาธารณะจนกว่าแอดมินจะตรวจสอบและอนุมัติ</div><form data-form="register"><div class="field"><label for="reg-name">ชื่อที่ใช้แสดง</label><input id="reg-name" name="username" autocomplete="nickname" minlength="3" maxlength="30" required><div class="hint">3–30 ตัวอักษร ไม่ควรใส่ข้อมูลส่วนตัวที่ไม่จำเป็น</div></div><div class="field"><label for="reg-email">อีเมล</label><input id="reg-email" name="email" type="email" autocomplete="email" maxlength="180" required></div><div class="field"><label for="reg-password">รหัสผ่าน</label><input id="reg-password" name="password" type="password" autocomplete="new-password" minlength="10" maxlength="128" required><div class="hint">อย่างน้อย 10 ตัวอักษร แนะนำให้ใช้รหัสผ่านที่ไม่ซ้ำกับเว็บไซต์อื่น</div></div><div class="field"><label for="reg-password2">ยืนยันรหัสผ่าน</label><input id="reg-password2" name="password2" type="password" autocomplete="new-password" minlength="10" maxlength="128" required></div><div class="form-actions"><button class="btn btn-primary btn-wide" type="submit">สร้างบัญชี</button></div></form><p class="form-footnote">มีบัญชีอยู่แล้ว? <a href="#/login">เข้าสู่ระบบ</a></p></div>';
  }
  function renderHow() {
    app.innerHTML = pageHeading('ABOUT ANIJIPEDIA', 'ร่วมกันสร้างคลังความรู้ที่น่าเชื่อถือ', 'Anijipedia เปิดให้ชุมชนเสนอข้อมูล โดยใช้กระบวนการตรวจสอบก่อนเผยแพร่') +
      '<div class="policy-list"><section class="policy-card"><div class="num">1</div><h3>ค้นคว้าและเขียน</h3><p>ใช้ชื่อเรื่องชัดเจน เขียนเนื้อหาเป็นกลาง แยกข้อเท็จจริงออกจากความคิดเห็น และระบุแหล่งที่มาที่ตรวจสอบได้ในเนื้อหา</p></section><section class="policy-card"><div class="num">2</div><h3>บันทึกหรือส่งตรวจ</h3><p>บันทึกเป็นฉบับร่างเพื่อกลับมาแก้ไขภายหลัง หรือส่งเข้าสู่คิวตรวจสอบเมื่อเนื้อหาพร้อม</p></section><section class="policy-card"><div class="num">3</div><h3>แอดมินตรวจสอบ</h3><p>ผู้ดูแลตรวจความครบถ้วน ความสอดคล้อง และความเหมาะสม หากต้องแก้ไขจะส่งข้อเสนอแนะกลับไปยังผู้เขียน</p></section></div>' +
      '<section class="section content-grid"><div class="panel"><div class="panel-head"><h2>แนวทางการเขียนบทความ</h2></div><div class="panel-body"><div class="article-row"><h3>ความถูกต้องมาก่อนความยาว</h3><p>ตรวจชื่อ วันที่ ตัวเลข และคำศัพท์ให้สม่ำเสมอ หากข้อมูลยังไม่ยืนยัน ควรระบุข้อจำกัดให้ชัดเจน</p></div><div class="article-row"><h3>เขียนอย่างเป็นกลาง</h3><p>หลีกเลี่ยงถ้อยคำโจมตี การโฆษณา การคาดเดาที่เขียนเหมือนข้อเท็จจริง และข้อมูลส่วนตัวที่ไม่มีเหตุจำเป็น</p></div><div class="article-row"><h3>ไม่คัดลอกโดยไม่ระบุที่มา</h3><p>สรุปด้วยภาษาของตนเอง และเพิ่มแหล่งอ้างอิงหรือข้อมูลที่ช่วยให้ผู้อ่านตรวจสอบต่อได้</p></div><div class="article-row"><h3>บทความที่แก้ไขก็ต้องตรวจใหม่</h3><p>การแก้บทความที่เผยแพร่แล้วจะส่งเป็นฉบับเสนอแก้ไขแยกต่างหาก เนื้อหาสาธารณะเดิมจะยังอยู่จนกว่าฉบับใหม่จะได้รับอนุมัติ</p></div></div></div><aside class="callout"><strong>ระบบสถานะบทความ</strong><p><span class="tag">ฉบับร่าง</span> แก้ไขได้และยังไม่ส่งตรวจ</p><p><span class="tag status-pending">รอตรวจสอบ</span> อยู่ในคิวแอดมิน</p><p><span class="tag status-rejected">ต้องแก้ไข</span> ดูข้อเสนอแนะแล้วปรับปรุงก่อนส่งใหม่</p><p><span class="tag status-published">เผยแพร่แล้ว</span> ผู้อ่านทั่วไปเข้าถึงได้</p><hr><a class="btn btn-primary btn-wide" href="#/write">เริ่มเขียนบทความ</a></aside></section>';
  }
  async function renderArticle(id, seq) {
    if (!/^\d+$/.test(String(id))) return renderNotFound();
    var article = await api('/api/articles/' + encodeURIComponent(id));
    if (seq !== renderSeq) return;
    var saved = false;
    if (auth.user) {
      try { var bookmarks = await api('/api/bookmarks'); saved = (bookmarks.items || []).some(function (x) { return String(x.id) === String(article.id); }); } catch (_) { saved = false; }
    }
    if (seq !== renderSeq) return;
    var tags = (article.tags || []).map(function (tag) { return '<span class="tag">' + esc(tag) + '</span>'; }).join(' ');
    app.innerHTML = '<article class="article-page"><div class="breadcrumbs"><a href="#/">หน้าหลัก</a> / <a href="#/search?category=' + encodeURIComponent(article.category_id) + '">' + esc(article.category_name) + '</a></div><header class="article-header">' + categoryLink({ id: article.category_id, name: article.category_name }) + '<h1>' + esc(article.title) + '</h1>' + (article.summary ? '<p class="article-summary">' + esc(article.summary) + '</p>' : '') + '<div class="article-meta"><span>เขียนโดย ' + esc(article.author_name) + '</span><span class="dot"></span><span>เผยแพร่ ' + fmtDate(article.published_at) + '</span><span class="dot"></span><span>แก้ไขล่าสุด ' + fmtDate(article.updated_at) + '</span><span class="dot"></span><span>' + fmtNumber(article.views) + ' ครั้ง</span></div><div class="article-tools">' + (auth.user ? '<button class="btn btn-secondary" data-action="bookmark" data-id="' + esc(article.id) + '" data-saved="' + (saved ? '1' : '0') + '">' + (saved ? '✓ บันทึกแล้ว' : '＋ บันทึกบทความ') + '</button><a class="btn btn-quiet" href="#/write?article=' + encodeURIComponent(article.id) + '">เสนอแก้ไข</a>' : '<a class="btn btn-secondary" href="#/login">เข้าสู่ระบบเพื่อบันทึกหรือเสนอแก้ไข</a>') + '<a class="btn btn-quiet" href="#/history/' + encodeURIComponent(article.id) + '">ประวัติเวอร์ชัน</a></div></header><div class="article-content">' + contentHtml(article.content) + '</div>' + (tags ? '<div class="article-tools" aria-label="แท็กบทความ">' + tags + '</div>' : '') + '<div class="content-note">บทความนี้ผ่านการตรวจสอบก่อนเผยแพร่ หากพบข้อมูลคลาดเคลื่อน สามารถเสนอแก้ไขเพื่อให้ผู้ดูแลตรวจสอบได้</div><div class="article-bottom"><a href="#/search">← กลับไปค้นหาบทความ</a><a href="#/how">แนวทางการเขียน</a></div></article>';
  }
  async function renderHistory(id, seq) {
    var data = await api('/api/articles/' + encodeURIComponent(id) + '/history');
    if (seq !== renderSeq) return;
    var items = data.items || [];
    app.innerHTML = '<div class="article-page">' + pageHeading('ARTICLE HISTORY', 'ประวัติการแก้ไข', 'ดูเวอร์ชันที่ผ่านการอนุมัติของบทความนี้') + '<div class="panel"><div class="panel-head"><h2>' + esc(data.article_title || 'บทความ') + '</h2><a href="#/wiki/' + encodeURIComponent(id) + '">กลับไปยังบทความ →</a></div><div class="panel-body">' + (items.length ? items.map(function (item) { return '<div class="article-row"><h3>เวอร์ชัน ' + fmtNumber(item.revision_number) + ' · ' + esc(item.title) + '</h3><p>' + esc(item.summary || 'ไม่มีคำอธิบายสรุป') + '</p><div class="article-meta"><span>ผู้แก้ไข ' + esc(item.editor_name || 'ไม่ระบุ') + '</span><span class="dot"></span><span>' + fmtDate(item.changed_at) + '</span></div></div>'; }).join('') : emptyState('ยังไม่มีประวัติเวอร์ชัน', 'ข้อมูลจะปรากฏหลังจากมีการอนุมัติบทความ') ) + '</div></div></div>';
  }
  async function renderMy(seq, query) {
    if (!auth.user) { location.hash = '/login'; return; }
    var data = await api('/api/my/submissions');
    if (seq !== renderSeq) return;
    var tab = query.get('tab') || 'contributions';
    var bookmarks = tab === 'saved' ? await api('/api/bookmarks') : { items: [] };
    if (seq !== renderSeq) return;
    var myItems = data.items || [];
    var body;
    if (tab === 'saved') {
      body = bookmarks.items.length ? bookmarks.items.map(articleRow).join('') : emptyState('ยังไม่มีบทความที่บันทึกไว้', 'กดปุ่ม “บันทึกบทความ” ในหน้าบทความเพื่อเก็บไว้อ่านภายหลัง');
    } else {
      body = myItems.length ? myItems.map(function (item) {
        var action = (item.status === 'draft' || item.status === 'rejected') ? '<a class="btn btn-secondary" href="#/write/' + encodeURIComponent(item.id) + '">เปิดเพื่อแก้ไข</a>' : (item.article_id && item.status === 'approved' ? '<a class="btn btn-quiet" href="#/wiki/' + encodeURIComponent(item.article_id) + '">ดูบทความ</a>' : '');
        return '<div class="data-card"><div class="article-meta">' + statusTag(item.status) + '<span>' + esc(item.category_name || 'ไม่จัดหมวดหมู่') + '</span><span class="dot"></span><span>แก้ไข ' + fmtDate(item.updated_at) + '</span></div><h3 style="margin-top:9px">' + esc(item.title) + '</h3><p>' + esc(item.summary || 'ไม่มีคำอธิบายสรุป') + '</p>' + (item.review_note ? '<div class="alert ' + (item.status === 'rejected' ? 'alert-warning' : 'alert-info') + '"><strong>ข้อเสนอแนะจากผู้ดูแล:</strong> ' + esc(item.review_note) + '</div>' : '') + '<div class="card-actions">' + action + '</div></div>';
      }).join('') : emptyState('ยังไม่มีผลงานของคุณ', 'เริ่มเขียนบทความหรือบันทึกฉบับร่างไว้ได้เลย', '<a class="btn btn-primary btn-small" href="#/write">เขียนบทความ</a>');
    }
    app.innerHTML = pageHeading('YOUR WORKSPACE', 'พื้นที่ของฉัน', 'ติดตามสถานะบทความ ดูข้อเสนอแนะ และจัดการความรู้ที่คุณบันทึกไว้') + '<div class="tabs"><a class="' + (tab === 'contributions' ? 'active' : '') + '" href="#/my?tab=contributions">ผลงานและฉบับร่าง</a><a class="' + (tab === 'saved' ? 'active' : '') + '" href="#/my?tab=saved">บทความที่บันทึก</a><a class="' + (tab === 'account' ? 'active' : '') + '" href="#/my?tab=account">บัญชีผู้ใช้</a></div>' +
      (tab === 'account' ? '<div class="form-card" style="max-width:680px;margin:0"><h2 style="margin-top:0">เปลี่ยนรหัสผ่าน</h2><p class="form-intro">ใช้รหัสผ่านเดิมเพื่อยืนยันตัวตน การเปลี่ยนรหัสผ่านจะออกจากระบบบนอุปกรณ์อื่นทั้งหมด</p><form data-form="change-password"><div class="field"><label for="old-password">รหัสผ่านปัจจุบัน</label><input id="old-password" name="oldPassword" type="password" autocomplete="current-password" required></div><div class="field"><label for="new-password">รหัสผ่านใหม่</label><input id="new-password" name="newPassword" type="password" minlength="10" maxlength="128" autocomplete="new-password" required><div class="hint">อย่างน้อย 10 ตัวอักษร</div></div><div class="field"><label for="new-password2">ยืนยันรหัสผ่านใหม่</label><input id="new-password2" name="newPassword2" type="password" minlength="10" maxlength="128" autocomplete="new-password" required></div><button class="btn btn-primary" type="submit">เปลี่ยนรหัสผ่าน</button></form><div class="divider"></div><p class="small muted">ชื่อที่แสดง: ' + esc(auth.user.username) + ' · อีเมล: ' + esc(auth.user.email) + '</p></div>' : '<div class="toolbar"><a class="btn btn-primary" href="#/write">＋ เขียนบทความใหม่</a><span class="small muted">' + (tab === 'saved' ? fmtNumber(bookmarks.items.length) + ' บทความที่บันทึก' : fmtNumber(myItems.length) + ' รายการ') + '</span></div><div class="stack">' + body + '</div>');
  }
  async function renderWrite(path, query, seq) {
    if (!auth.user) { location.hash = '/login'; return; }
    var editingId = path.indexOf('/write/') === 0 ? path.split('/')[2] : '';
    var articleId = query.get('article') || '';
    var data = { title: '', summary: '', content: '', tags: [], category_id: '', id: '', article_id: articleId, status: 'draft' };
    if (editingId) {
      data = await api('/api/submissions/' + encodeURIComponent(editingId));
      if (data.status !== 'draft' && data.status !== 'rejected') {
        app.innerHTML = '<div class="form-card"><h1>รายการนี้แก้ไขไม่ได้</h1><p class="muted">รายการที่ส่งตรวจแล้วจะไม่สามารถแก้ไขได้จนกว่าจะได้รับผลตรวจสอบ</p><a class="btn btn-primary" href="#/my">กลับไปผลงานของฉัน</a></div>'; return;
      }
    } else if (articleId) {
      var published = await api('/api/articles/' + encodeURIComponent(articleId));
      data = { title: published.title, summary: published.summary, content: published.content, tags: published.tags || [], category_id: published.category_id, id: '', article_id: published.id, status: 'draft' };
    }
    if (seq !== renderSeq) return;
    var categories = await getCategories();
    if (seq !== renderSeq) return;
    var options = categories.map(function (c) { return '<option value="' + esc(c.id) + '"' + (String(c.id) === String(data.category_id) ? ' selected' : '') + '>' + esc(c.name) + '</option>'; }).join('');
    var isEdit = !!(editingId || articleId);
    app.innerHTML = pageHeading('CONTRIBUTE', isEdit ? 'เสนอแก้ไขบทความ' : 'เขียนบทความใหม่', 'กรอกข้อมูลให้ครบถ้วน คุณสามารถบันทึกฉบับร่างหรือส่งให้ผู้ดูแลตรวจสอบได้') + (data.review_note ? '<div class="alert alert-warning"><strong>ข้อเสนอแนะจากผู้ดูแล:</strong> ' + esc(data.review_note) + '</div>' : '') +
      '<form class="form-card" style="max-width:900px" data-form="write" data-submission-id="' + esc(data.id || editingId || '') + '" data-article-id="' + esc(data.article_id || articleId || '') + '"><div class="alert alert-info">การบันทึกเป็นฉบับร่างหรือส่งตรวจจะไม่เปลี่ยนบทความสาธารณะโดยตรง การเปลี่ยนแปลงจะเผยแพร่เมื่อแอดมินอนุมัติเท่านั้น</div><div class="field"><label for="write-title">ชื่อบทความ *</label><input id="write-title" name="title" required maxlength="180" minlength="3" value="' + esc(data.title) + '" placeholder="ตั้งชื่อให้ตรงกับเนื้อหา"><div class="editor-counter" id="title-counter"></div></div><div class="field"><label for="write-summary">คำอธิบายสรุป</label><textarea id="write-summary" name="summary" rows="3" maxlength="350" placeholder="สรุปใจความสำคัญสำหรับผู้อ่าน">' + esc(data.summary) + '</textarea><div class="editor-counter" id="summary-counter"></div></div><div class="field"><label for="write-category">หมวดหมู่ *</label><select id="write-category" name="categoryId" required><option value="">เลือกหมวดหมู่</option>' + options + '</select></div><div class="field"><label for="write-tags">แท็กคำค้น</label><input id="write-tags" name="tags" maxlength="240" value="' + esc((data.tags || []).join(', ')) + '" placeholder="เช่น ประวัติศาสตร์, ประเทศ, ภาษา"><div class="hint">คั่นแต่ละแท็กด้วยเครื่องหมายจุลภาค ใส่ได้ไม่เกิน 8 แท็ก</div></div><div class="field"><label for="write-content">เนื้อหาบทความ *</label><textarea class="article-editor" id="write-content" name="content" required minlength="40" maxlength="40000" placeholder="เขียนเนื้อหาเป็นย่อหน้า ใช้บรรทัดว่างเพื่อขึ้นย่อหน้าใหม่ ระบุแหล่งที่มาในเนื้อหาให้ตรวจสอบได้">' + esc(data.content) + '</textarea><div class="editor-counter" id="content-counter"></div><div class="hint">อย่างน้อย 40 ตัวอักษร สูงสุด 40,000 ตัวอักษร รองรับย่อหน้า หัวข้อย่อยด้วย ## หรือ ### รายการด้วย - และตัวหนาด้วย **ข้อความ** รวมถึงลิงก์ URL ไม่รับ HTML เพื่อป้องกันโค้ดอันตราย</div></div><div class="form-actions"><button class="btn btn-quiet" type="submit" name="action" value="draft">บันทึกฉบับร่าง</button><button class="btn btn-primary" type="submit" name="action" value="submit">ส่งให้แอดมินตรวจสอบ</button></div></form>';
    bindCounter('write-title', 'title-counter', 180); bindCounter('write-summary', 'summary-counter', 350); bindCounter('write-content', 'content-counter', 40000);
  }
  function adminUserCards(users) {
    if (!users || !users.length) return emptyState('ไม่พบสมาชิก', 'ลองค้นหาด้วยชื่อหรืออีเมลอื่น');
    return users.map(function (u) {
      return '<div class="data-card"><div class="article-meta">' + statusTag(u.status) + '<span>' + (u.role === 'admin' ? '<span class="tag">ผู้ดูแล</span>' : '<span class="tag">สมาชิก</span>') + '</span></div><h3 style="margin-top:8px">' + esc(u.username) + '</h3><p>' + esc(u.email) + '<br>สมัครเมื่อ ' + fmtDate(u.created_at) + '</p><div class="card-actions">' + (String(u.id) === String(auth.user.id) ? '<span class="small muted">บัญชีที่กำลังใช้งาน</span>' : '<button class="btn ' + (u.status === 'active' ? 'btn-danger' : 'btn-success') + '" data-action="user-status" data-id="' + esc(u.id) + '" data-status="' + (u.status === 'active' ? 'suspended' : 'active') + '">' + (u.status === 'active' ? 'ระงับบัญชี' : 'เปิดใช้งานบัญชี') + '</button>') + '</div></div>';
    }).join('');
  }
  async function renderAdmin(query, seq) {
    if (!auth.user) { location.hash = '/login'; return; }
    if (auth.user.role !== 'admin') { app.innerHTML = '<div class="form-card"><h1>ไม่มีสิทธิ์เข้าถึง</h1><p class="muted">หน้านี้สำหรับผู้ดูแลระบบเท่านั้น</p><a class="btn btn-primary" href="#/">กลับหน้าหลัก</a></div>'; return; }
    var tab = query.get('tab') || 'queue';
    var summary = await api('/api/admin/summary');
    if (seq !== renderSeq) return;
    var body = '';
    if (tab === 'users') {
      var userData = await api('/api/admin/users');
      if (seq !== renderSeq) return;
      body = '<div class="toolbar"><input class="input" id="user-filter" style="max-width:360px" placeholder="ค้นหาชื่อหรืออีเมล…" aria-label="ค้นหาสมาชิก"></div><div class="stack" id="admin-user-list">' + adminUserCards(userData.items) + '</div>';
    } else if (tab === 'categories') {
      var categoryData = await api('/api/categories?all=1');
      if (seq !== renderSeq) return;
      body = '<div class="split-layout"><form class="form-card" style="max-width:none;margin:0" data-form="category"><h2 style="margin-top:0">เพิ่มหมวดหมู่</h2><div class="field"><label for="cat-name">ชื่อหมวดหมู่</label><input id="cat-name" name="name" maxlength="80" required></div><div class="field"><label for="cat-description">คำอธิบาย</label><textarea id="cat-description" name="description" maxlength="240" rows="3"></textarea></div><button class="btn btn-primary" type="submit">เพิ่มหมวดหมู่</button></form><div><h2 style="font-size:18px;margin:0 0 12px">หมวดหมู่ที่มีอยู่</h2><div class="stack">' + categoryData.categories.map(function (c) { return '<div class="data-card"><div class="article-meta">' + (c.active ? statusTag('active') : statusTag('suspended')) + '</div><h3 style="margin-top:7px">' + esc(c.name) + '</h3><p>' + esc(c.description || 'ไม่มีคำอธิบาย') + '</p><button class="btn ' + (c.active ? 'btn-danger' : 'btn-success') + ' btn-small" data-action="category-status" data-id="' + esc(c.id) + '" data-active="' + (c.active ? '0' : '1') + '">' + (c.active ? 'ปิดการใช้งาน' : 'เปิดการใช้งาน') + '</button></div>'; }).join('') + '</div></div></div>';
    } else {
      var pending = await api('/api/admin/submissions?status=pending');
      if (seq !== renderSeq) return;
      body = '<div class="stack">' + (pending.items.length ? pending.items.map(function (item) { return '<div class="data-card"><div class="article-meta"><span class="tag status-pending">รอตรวจสอบ</span><span>' + esc(item.category_name) + '</span><span class="dot"></span><span>ส่งเมื่อ ' + fmtDate(item.submitted_at) + '</span></div><h3 style="margin-top:9px">' + esc(item.title) + '</h3><p>' + esc(item.summary || 'ไม่มีคำอธิบายสรุป') + '</p><div class="article-meta"><span>ผู้เขียน ' + esc(item.author_name) + '</span>' + (item.article_id ? '<span class="dot"></span><span>เสนอแก้ไขบทความเดิม</span>' : '<span class="dot"></span><span>บทความใหม่</span>') + '</div><div class="card-actions"><a class="btn btn-primary" href="#/admin/review/' + encodeURIComponent(item.id) + '">ตรวจสอบบทความ</a></div></div>'; }).join('') : emptyState('ไม่มีบทความรอตรวจสอบ', 'เมื่อสมาชิกส่งบทความเข้าคิว รายการจะแสดงที่นี่')) + '</div>';
    }
    app.innerHTML = pageHeading('ADMIN CONSOLE', 'ศูนย์ควบคุม Anijipedia', 'จัดการคิวตรวจสอบ สมาชิก และหมวดหมู่ของคลังความรู้') + '<div class="dashboard-grid"><div class="metric-card"><span>บทความเผยแพร่</span><strong>' + fmtNumber(summary.articles) + '</strong></div><div class="metric-card"><span>รอตรวจสอบ</span><strong>' + fmtNumber(summary.pending) + '</strong></div><div class="metric-card"><span>สมาชิกทั้งหมด</span><strong>' + fmtNumber(summary.users) + '</strong></div><div class="metric-card"><span>หมวดหมู่ที่ใช้งาน</span><strong>' + fmtNumber(summary.categories) + '</strong></div></div><div class="tabs"><a class="' + (tab === 'queue' ? 'active' : '') + '" href="#/admin?tab=queue">คิวตรวจสอบ (' + fmtNumber(summary.pending) + ')</a><a class="' + (tab === 'users' ? 'active' : '') + '" href="#/admin?tab=users">สมาชิก</a><a class="' + (tab === 'categories' ? 'active' : '') + '" href="#/admin?tab=categories">หมวดหมู่</a></div>' + body;
    var userFilter = document.getElementById('user-filter');
    if (userFilter) {
      var userFilterTimer = null;
      userFilter.addEventListener('input', function () {
        var term = this.value.trim();
        window.clearTimeout(userFilterTimer);
        userFilterTimer = window.setTimeout(async function () {
          try {
            var list = document.getElementById('admin-user-list');
            if (!list) return;
            var results = await api('/api/admin/users?q=' + encodeURIComponent(term));
            if (document.getElementById('admin-user-list') === list) list.innerHTML = adminUserCards(results.items || []);
          } catch (error) { toast(error.message || 'ค้นหาสมาชิกไม่สำเร็จ', 'error'); }
        }, 250);
      });
    }
  }
  async function renderAdminReview(id, seq) {
    if (!auth.user) { location.hash = '/login'; return; }
    if (auth.user.role !== 'admin') { renderNotFound(); return; }
    var item = await api('/api/admin/submissions/' + encodeURIComponent(id));
    if (seq !== renderSeq) return;
    app.innerHTML = '<div class="article-page">' + pageHeading('ADMIN REVIEW', 'ตรวจสอบบทความ', 'อ่านเนื้อหาทั้งหมดก่อนตัดสินใจอนุมัติหรือส่งกลับให้แก้ไข') + '<div class="article-tools"><a class="btn btn-quiet" href="#/admin?tab=queue">← กลับไปยังคิวตรวจสอบ</a>' + statusTag(item.status) + '</div><div class="article-header" style="margin-top:20px"><span class="tag">' + esc(item.category_name) + '</span><h1>' + esc(item.title) + '</h1>' + (item.summary ? '<p class="article-summary">' + esc(item.summary) + '</p>' : '') + '<div class="article-meta"><span>ผู้เขียน ' + esc(item.author_name) + '</span><span class="dot"></span><span>' + fmtDate(item.submitted_at) + '</span>' + (item.article_id ? '<span class="dot"></span><span>เสนอแก้ไขบทความเดิม #' + esc(item.article_id) + '</span>' : '<span class="dot"></span><span>บทความใหม่</span>') + '</div><div class="article-tools">' + (item.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join(' ') + '</div></div><div class="article-content">' + contentHtml(item.content) + '</div><div class="divider"></div>' + (item.status === 'pending' ? '<div class="form-card" style="max-width:none;margin:0"><h2 style="margin-top:0">ผลการตรวจสอบ</h2><div class="field"><label for="review-note">ข้อเสนอแนะถึงผู้เขียน</label><textarea id="review-note" rows="4" maxlength="1000" placeholder="ระบุจุดที่ควรแก้ไข หรือบันทึกเหตุผลประกอบการอนุมัติ"></textarea><div class="hint">กรณีไม่อนุมัติ ต้องระบุข้อเสนอแนะอย่างน้อย 5 ตัวอักษร</div></div><div class="form-actions"><button class="btn btn-danger" data-action="review-reject" data-id="' + esc(item.id) + '">ส่งกลับให้แก้ไข</button><button class="btn btn-primary" data-action="review-approve" data-id="' + esc(item.id) + '">อนุมัติและเผยแพร่</button></div></div>' : '<div class="alert alert-info">รายการนี้ได้รับการตรวจสอบแล้ว ' + (item.review_note ? '<br><strong>หมายเหตุ:</strong> ' + esc(item.review_note) : '') + '</div>') + '</div>';
  }
  function renderNotFound() {
    app.innerHTML = '<div class="form-card"><h1>ไม่พบหน้าที่ต้องการ</h1><p class="muted">ลิงก์นี้อาจไม่ถูกต้อง หรือข้อมูลอาจไม่มีอยู่แล้ว</p><a href="#/" class="btn btn-primary">กลับหน้าหลัก</a></div>';
  }
  async function handleForm(form, event) {
    event.preventDefault();
    var submitter = event.submitter || form.querySelector('button[type="submit"]');
    setBusy(submitter, true);
    try {
      var fd = new FormData(form);
      var result;
      if (form.dataset.form === 'home-search' || form.dataset.form === 'search') {
        var q = String(fd.get('q') || '').trim();
        location.hash = '/search' + (q ? '?q=' + encodeURIComponent(q) : '');
      } else if (form.dataset.form === 'login') {
        result = await api('/api/auth/login', { method: 'POST', body: { email: fd.get('email'), password: fd.get('password') } });
        auth.user = result.user; auth.csrf = result.csrf; renderAccountNav(); toast('เข้าสู่ระบบสำเร็จ', 'success'); location.hash = result.user.role === 'admin' ? '/admin' : '/';
      } else if (form.dataset.form === 'register') {
        if (fd.get('password') !== fd.get('password2')) throw new Error('รหัสผ่านทั้งสองช่องไม่ตรงกัน');
        result = await api('/api/auth/register', { method: 'POST', body: { username: fd.get('username'), email: fd.get('email'), password: fd.get('password') } });
        auth.user = result.user; auth.csrf = result.csrf; renderAccountNav(); toast('สร้างบัญชีเรียบร้อยแล้ว', 'success'); location.hash = '/my';
      } else if (form.dataset.form === 'write') {
        var action = submitter && submitter.value === 'draft' ? 'draft' : 'submit';
        var tags = String(fd.get('tags') || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean).slice(0, 8);
        result = await api('/api/submissions', { method: 'POST', body: { id: form.dataset.submissionId || undefined, articleId: form.dataset.articleId || undefined, title: fd.get('title'), summary: fd.get('summary'), content: fd.get('content'), categoryId: fd.get('categoryId'), tags: tags, action: action } });
        toast(action === 'draft' ? 'บันทึกฉบับร่างแล้ว' : 'ส่งบทความเข้าคิวตรวจสอบแล้ว', 'success'); location.hash = '/my';
      } else if (form.dataset.form === 'change-password') {
        if (fd.get('newPassword') !== fd.get('newPassword2')) throw new Error('รหัสผ่านใหม่ทั้งสองช่องไม่ตรงกัน');
        result = await api('/api/account/password', { method: 'POST', body: { oldPassword: fd.get('oldPassword'), newPassword: fd.get('newPassword') } });
        auth.csrf = result.csrf || auth.csrf; form.reset(); toast('เปลี่ยนรหัสผ่านแล้ว', 'success');
      } else if (form.dataset.form === 'category') {
        result = await api('/api/admin/categories', { method: 'POST', body: { name: fd.get('name'), description: fd.get('description') } });
        cachedCategories = null; toast('เพิ่มหมวดหมู่แล้ว', 'success'); location.hash = '/admin?tab=categories';
      }
    } catch (error) {
      toast(error.message || 'ดำเนินการไม่สำเร็จ', 'error');
    } finally { setBusy(submitter, false); }
  }
  app.addEventListener('submit', function (event) {
    var form = event.target.closest('form[data-form]');
    if (form) handleForm(form, event);
  });
  app.addEventListener('click', async function (event) {
    var el = event.target.closest('[data-action]');
    if (!el) return;
    var action = el.getAttribute('data-action');
    try {
      if (action === 'retry') { render(); }
      else if (action === 'logout') {
        await api('/api/auth/logout', { method: 'POST', body: {} }); auth.user = null; auth.csrf = null; renderAccountNav(); toast('ออกจากระบบแล้ว', 'success'); location.hash = '/';
      } else if (action === 'page') {
        var q = queryFromHash(); navigateSearch(q.get('q') || '', q.get('category') || '', q.get('sort') || 'latest', Number(el.dataset.page));
      } else if (action === 'bookmark') {
        if (!auth.user) { location.hash = '/login'; return; }
        var saved = await api('/api/bookmarks/' + encodeURIComponent(el.dataset.id), { method: 'POST', body: {} });
        el.dataset.saved = saved.saved ? '1' : '0'; el.textContent = saved.saved ? '✓ บันทึกแล้ว' : '＋ บันทึกบทความ'; toast(saved.saved ? 'บันทึกบทความแล้ว' : 'นำออกจากรายการที่บันทึกแล้ว', 'success');
      } else if (action === 'review-approve') {
        if (!window.confirm('ยืนยันอนุมัติและเผยแพร่บทความนี้หรือไม่?')) return;
        setBusy(el, true);
        var note = document.getElementById('review-note');
        await api('/api/admin/submissions/' + encodeURIComponent(el.dataset.id) + '/review', { method: 'POST', body: { decision: 'approve', note: note ? note.value : '' } });
        toast('อนุมัติและเผยแพร่บทความแล้ว', 'success'); location.hash = '/admin?tab=queue';
      } else if (action === 'review-reject') {
        var noteField = document.getElementById('review-note');
        var noteValue = noteField ? noteField.value.trim() : '';
        if (noteValue.length < 5) { toast('กรุณาระบุข้อเสนอแนะอย่างน้อย 5 ตัวอักษร', 'error'); if (noteField) noteField.focus(); return; }
        if (!window.confirm('ส่งบทความกลับให้ผู้เขียนแก้ไขใช่หรือไม่?')) return;
        setBusy(el, true);
        await api('/api/admin/submissions/' + encodeURIComponent(el.dataset.id) + '/review', { method: 'POST', body: { decision: 'reject', note: noteValue } });
        toast('ส่งข้อเสนอแนะกลับให้ผู้เขียนแล้ว', 'success'); location.hash = '/admin?tab=queue';
      } else if (action === 'user-status') {
        var destStatus = el.dataset.status;
        var ok = window.confirm(destStatus === 'suspended' ? 'ต้องการระงับบัญชีนี้หรือไม่? ผู้ใช้จะเข้าสู่ระบบไม่ได้' : 'ต้องการเปิดใช้งานบัญชีนี้หรือไม่?');
        if (!ok) return;
        setBusy(el, true);
        await api('/api/admin/users/' + encodeURIComponent(el.dataset.id) + '/status', { method: 'POST', body: { status: destStatus } });
        toast(destStatus === 'suspended' ? 'ระงับบัญชีแล้ว' : 'เปิดใช้งานบัญชีแล้ว', 'success'); render();
      } else if (action === 'category-status') {
        setBusy(el, true);
        await api('/api/admin/categories/' + encodeURIComponent(el.dataset.id), { method: 'POST', body: { active: el.dataset.active === '1' } });
        cachedCategories = null; toast('ปรับสถานะหมวดหมู่แล้ว', 'success'); render();
      }
    } catch (error) {
      toast(error.message || 'ดำเนินการไม่สำเร็จ', 'error');
      if ((action === 'review-approve' || action === 'review-reject') && error.status === 409) location.hash = '/admin?tab=queue';
    } finally { if (action.indexOf('review-') === 0 || action === 'user-status' || action === 'category-status') setBusy(el, false); }
  });
  window.addEventListener('hashchange', render);
  refreshAuth().then(render);
})();
</script>
</body>
</html>
`;

const SESSION_DAYS = 7;
const SESSION_SECONDS = SESSION_DAYS * 24 * 60 * 60;
const PASSWORD_ITERATIONS = 210000;
const MAX_BODY_BYTES = 120000;
const MAX_TITLE = 180;
const MAX_SUMMARY = 350;
const MAX_CONTENT = 40000;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const BRAND_NAME = 'Anijipedia';

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

function responseHeaders(extra) {
  return Object.assign({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cache-Control': 'no-store'
  }, extra || {});
}
function json(data, status, extraHeaders) {
  return new Response(JSON.stringify(data), { status: status || 200, headers: responseHeaders(Object.assign({ 'Content-Type': 'application/json; charset=utf-8' }, extraHeaders || {})) });
}
function fail(status, message) { throw new HttpError(status, message); }
function nowIso() { return new Date().toISOString(); }
function randomBytes(length) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}
function hex(bytes) { return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join(''); }
function token(length) {
  const bytes = randomBytes(length || 32);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
async function sha256(value) {
  return hex(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))));
}
async function passwordHash(password, saltHex) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const result = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: Uint8Array.from(saltHex.match(/.{2}/g).map((x) => parseInt(x, 16))), iterations: PASSWORD_ITERATIONS }, key, 256);
  return hex(new Uint8Array(result));
}
function constantEqual(a, b) {
  a = String(a || ''); b = String(b || '');
  let diff = a.length ^ b.length;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}
function safeUser(row) {
  if (!row) return null;
  return { id: row.id, username: row.username, email: row.email, role: row.role, status: row.status, created_at: row.created_at };
}
function safeTags(raw) {
  try { const value = JSON.parse(raw || '[]'); return Array.isArray(value) ? value : []; }
  catch (_) { return []; }
}
function safeArticle(row) {
  return Object.assign({}, row, { tags: safeTags(row.tags) });
}
function cookieToken(request) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/(?:^|;\s*)__Host-anijipedia_session=([A-Za-z0-9_-]{30,100})(?:;|$)/);
  return match ? match[1] : '';
}
function setCookie(tokenValue) {
  return '__Host-anijipedia_session=' + tokenValue + '; Path=/; Max-Age=' + SESSION_SECONDS + '; Secure; HttpOnly; SameSite=Lax';
}
function clearCookie() {
  return '__Host-anijipedia_session=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Lax';
}
function verifyOrigin(request) {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) fail(403, 'คำขอมาจากแหล่งที่ไม่อนุญาต กรุณาโหลดหน้าเว็บใหม่');
}
async function readJson(request) {
  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > MAX_BODY_BYTES) fail(413, 'ข้อมูลที่ส่งมีขนาดใหญ่เกินไป');
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) fail(413, 'ข้อมูลที่ส่งมีขนาดใหญ่เกินไป');
  try {
    const value = JSON.parse(text || '{}');
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail(400, 'รูปแบบข้อมูลไม่ถูกต้อง');
    return value;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    fail(400, 'รูปแบบข้อมูลไม่ถูกต้อง');
  }
}
function textField(value, max, fieldName, min) {
  if (typeof value !== 'string') fail(400, 'กรุณากรอก' + fieldName);
  const normalized = value.trim();
  if (normalized.length < (min || 0)) fail(400, fieldName + 'สั้นเกินไป');
  if (normalized.length > max) fail(400, fieldName + 'ยาวเกินกำหนด');
  return normalized;
}
function emailField(value) {
  const email = textField(String(value || ''), 180, 'อีเมล', 5).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(400, 'รูปแบบอีเมลไม่ถูกต้อง');
  return email;
}
function usernameField(value) {
  const username = textField(value, 30, 'ชื่อที่ใช้แสดง', 3);
  if (!/[\p{L}\p{N}]/u.test(username)) fail(400, 'ชื่อที่ใช้แสดงต้องมีตัวอักษรหรือตัวเลข');
  if (/[<>\u0000-\u001f]/.test(username)) fail(400, 'ชื่อที่ใช้แสดงมีอักขระที่ไม่อนุญาต');
  return username;
}
function passwordField(value) {
  if (typeof value !== 'string' || value.length < 10) fail(400, 'รหัสผ่านต้องมีอย่างน้อย 10 ตัวอักษร');
  if (value.length > 128) fail(400, 'รหัสผ่านยาวเกินกำหนด');
  return value;
}
function slugBase(value) {
  const base = String(value || '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
  return base || 'article';
}
function parseTags(value) {
  if (value == null) value = [];
  if (!Array.isArray(value)) fail(400, 'รูปแบบแท็กไม่ถูกต้อง');
  const seen = new Set();
  return value.map((item) => String(item).trim().slice(0, 30)).filter((item) => item && !seen.has(item.toLowerCase()) && seen.add(item.toLowerCase())).slice(0, 8);
}
function getClientKey(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('X-Real-IP') || 'unknown-client';
}
async function hitRateLimit(request, env, scope, maxHits, windowMs) {
  const now = Date.now();
  const key = await sha256(scope + ':' + getClientKey(request));
  const cutoff = now - windowMs;
  await env.DB.prepare(`INSERT INTO rate_limits (key, hits, window_start) VALUES (?, 1, ?)
    ON CONFLICT(key) DO UPDATE SET
      hits = CASE WHEN rate_limits.window_start <= ? THEN 1 ELSE rate_limits.hits + 1 END,
      window_start = CASE WHEN rate_limits.window_start <= ? THEN ? ELSE rate_limits.window_start END`)
    .bind(key, now, cutoff, cutoff, now).run();
  const row = await env.DB.prepare('SELECT hits, window_start FROM rate_limits WHERE key = ?').bind(key).first();
  if (row && Number(row.hits) > maxHits && now - Number(row.window_start) < windowMs) fail(429, 'มีคำขอมากเกินไป กรุณารอสักครู่แล้วลองใหม่');
}
async function getSession(request, env) {
  const raw = cookieToken(request);
  if (!raw) return null;
  const id = await sha256(raw);
  const row = await env.DB.prepare(`SELECT s.id AS session_id, s.csrf_token, s.expires_at,
      u.id, u.username, u.email, u.role, u.status, u.created_at
    FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.id = ?`).bind(id).first();
  if (!row) return null;
  if (Date.parse(row.expires_at) <= Date.now() || row.status !== 'active') {
    await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(id).run();
    return null;
  }
  return { id: row.session_id, csrf: row.csrf_token, user: safeUser(row) };
}
async function requireSession(request, env) {
  const session = await getSession(request, env);
  if (!session) fail(401, 'กรุณาเข้าสู่ระบบก่อนดำเนินการ');
  return session;
}
function requireAdmin(session) {
  if (!session || session.user.role !== 'admin') fail(403, 'เฉพาะผู้ดูแลระบบเท่านั้นที่ใช้ส่วนนี้ได้');
}
function checkCsrf(request, session) {
  verifyOrigin(request);
  const csrf = request.headers.get('X-CSRF-Token') || '';
  if (!session || !csrf || !constantEqual(csrf, session.csrf)) fail(403, 'เซสชันหมดอายุหรือคำขอไม่ถูกต้อง กรุณาโหลดหน้าเว็บใหม่');
}
async function createSession(userId, env) {
  const raw = token(32);
  const cleanupNow = nowIso();
  await env.DB.prepare('DELETE FROM sessions WHERE expires_at < ?').bind(cleanupNow).run();
  await env.DB.prepare('DELETE FROM rate_limits WHERE window_start < ?').bind(Date.now() - 24 * 60 * 60 * 1000).run();
  const id = await sha256(raw);
  const csrf = token(24);
  const now = Date.now();
  const expiry = new Date(now + SESSION_SECONDS * 1000).toISOString();
  await env.DB.prepare('INSERT INTO sessions (id, user_id, csrf_token, created_at, expires_at) VALUES (?, ?, ?, ?, ?)')
    .bind(id, userId, csrf, nowIso(), expiry).run();
  const user = await env.DB.prepare('SELECT id, username, email, role, status, created_at FROM users WHERE id = ?').bind(userId).first();
  return { user: safeUser(user), csrf, cookie: setCookie(raw) };
}
function articleSelect() {
  return `SELECT a.id, a.slug, a.title, a.summary, a.content, a.category_id, a.tags, a.author_id,
    a.editor_id, a.created_at, a.updated_at, a.published_at, a.views, a.status,
    c.name AS category_name, u.username AS author_name
    FROM articles a JOIN categories c ON c.id = a.category_id JOIN users u ON u.id = a.author_id`;
}
async function getArticleById(env, id) {
  return env.DB.prepare(articleSelect() + ' WHERE a.id = ? AND a.status = \'published\'').bind(id).first();
}
async function getLatestRevision(env, articleId) {
  const row = await env.DB.prepare('SELECT COALESCE(MAX(revision_number), 0) AS revision_number FROM article_revisions WHERE article_id = ?').bind(articleId).first();
  return Number(row ? row.revision_number : 0);
}
function parseId(value, name) {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id <= 0) fail(400, 'รหัส' + (name || 'รายการ') + 'ไม่ถูกต้อง');
  return id;
}
async function apiFetch(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method.toUpperCase();
  const session = await getSession(request, env);

  if (path === '/api/health' && method === 'GET') {
    await env.DB.prepare('SELECT 1 AS ok').first();
    return json({ ok: true, service: BRAND_NAME, database: 'connected' });
  }
  if (path === '/api/me' && method === 'GET') {
    return json({ user: session ? session.user : null, csrf: session ? session.csrf : null });
  }
  if (path === '/api/auth/register' && method === 'POST') {
    verifyOrigin(request);
    await hitRateLimit(request, env, 'register', 5, 60 * 60 * 1000);
    const body = await readJson(request);
    const username = usernameField(body.username);
    const email = emailField(body.email);
    const password = passwordField(body.password);
    const salt = hex(randomBytes(16));
    const hash = await passwordHash(password, salt);
    const now = nowIso();
    let userId;
    try {
      const result = await env.DB.prepare(`INSERT INTO users (username, email, password_salt, password_hash, role, status, created_at)
        VALUES (?, ?, ?, ?, 'member', 'active', ?)`).bind(username, email, salt, hash, now).run();
      userId = result.meta && result.meta.last_row_id;
      if (!userId) {
        const user = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
        userId = user && user.id;
      }
    } catch (error) {
      if (String(error && error.message || '').toLowerCase().indexOf('unique') >= 0) fail(409, 'อีเมลนี้มีบัญชีอยู่แล้ว');
      throw error;
    }
    if (!userId) fail(500, 'สร้างบัญชีไม่สำเร็จ กรุณาลองใหม่');
    const created = await createSession(userId, env);
    return json({ user: created.user, csrf: created.csrf }, 201, { 'Set-Cookie': created.cookie });
  }
  if (path === '/api/auth/login' && method === 'POST') {
    verifyOrigin(request);
    await hitRateLimit(request, env, 'login', 10, RATE_WINDOW_MS);
    const body = await readJson(request);
    const email = emailField(body.email);
    const password = typeof body.password === 'string' ? body.password.slice(0, 128) : '';
    const user = await env.DB.prepare('SELECT id, username, email, password_salt, password_hash, role, status, created_at FROM users WHERE email = ?').bind(email).first();
    const salt = user ? user.password_salt : '00000000000000000000000000000000';
    const candidate = await passwordHash(password, salt);
    if (!user || !constantEqual(candidate, user.password_hash) || user.status !== 'active') fail(401, 'อีเมลหรือรหัสผ่านไม่ถูกต้อง หรือบัญชีไม่สามารถใช้งานได้');
    const created = await createSession(user.id, env);
    return json({ user: created.user, csrf: created.csrf }, 200, { 'Set-Cookie': created.cookie });
  }
  if (path === '/api/auth/logout' && method === 'POST') {
    verifyOrigin(request);
    if (session) checkCsrf(request, session);
    const raw = cookieToken(request);
    if (raw) await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(await sha256(raw)).run();
    return json({ ok: true }, 200, { 'Set-Cookie': clearCookie() });
  }

  if (path === '/api/stats' && method === 'GET') {
    const row = await env.DB.prepare(`SELECT
      (SELECT COUNT(*) FROM articles WHERE status = 'published') AS articles,
      (SELECT COUNT(DISTINCT author_id) FROM articles WHERE status = 'published') AS contributors,
      (SELECT COUNT(*) FROM categories WHERE active = 1) AS categories`).first();
    return json(row || { articles: 0, contributors: 0, categories: 0 });
  }
  if (path === '/api/categories' && method === 'GET') {
    const all = url.searchParams.get('all') === '1';
    if (all) { requireAdmin(session); }
    const rows = await env.DB.prepare('SELECT id, name, slug, description, active, created_at FROM categories ' + (all ? '' : 'WHERE active = 1 ') + 'ORDER BY name COLLATE NOCASE LIMIT 100').all();
    return json({ categories: rows.results || [] });
  }
  if (path === '/api/articles' && method === 'GET') {
    const q = (url.searchParams.get('q') || '').trim().slice(0, 120);
    const category = url.searchParams.get('category') || '';
    const sort = url.searchParams.get('sort') || 'latest';
    const rawPage = Number(url.searchParams.get('page') || 1);
    const rawLimit = Number(url.searchParams.get('limit') || 12);
    const page = Number.isFinite(rawPage) ? Math.max(1, Math.min(10000, Math.floor(rawPage))) : 1;
    const limit = Number.isFinite(rawLimit) ? Math.max(1, Math.min(30, Math.floor(rawLimit))) : 12;
    const where = ["a.status = 'published'"];
    const binds = [];
    if (q) { where.push('(a.title LIKE ? COLLATE NOCASE OR a.summary LIKE ? COLLATE NOCASE OR a.content LIKE ? COLLATE NOCASE OR a.tags LIKE ? COLLATE NOCASE)'); const term = '%' + q + '%'; binds.push(term, term, term, term); }
    if (category && /^\d+$/.test(category)) { where.push('a.category_id = ?'); binds.push(Number(category)); }
    const whereSql = ' WHERE ' + where.join(' AND ');
    const totalRow = await env.DB.prepare('SELECT COUNT(*) AS total FROM articles a' + whereSql).bind(...binds).first();
    let order = 'a.published_at DESC, a.id DESC';
    if (sort === 'popular') order = 'a.views DESC, a.published_at DESC';
    else if (sort === 'title') order = 'a.title COLLATE NOCASE ASC';
    const offset = (page - 1) * limit;
    const rows = await env.DB.prepare(articleSelect() + whereSql + ' ORDER BY ' + order + ' LIMIT ? OFFSET ?').bind(...binds, limit, offset).all();
    return json({ items: (rows.results || []).map(safeArticle), total: Number(totalRow ? totalRow.total : 0), page, limit });
  }
  const historyMatch = path.match(/^\/api\/articles\/(\d+)\/history$/);
  if (historyMatch && method === 'GET') {
    const id = parseId(historyMatch[1], 'บทความ');
    const article = await env.DB.prepare('SELECT id, title FROM articles WHERE id = ? AND status = \'published\'').bind(id).first();
    if (!article) fail(404, 'ไม่พบบทความนี้');
    const rows = await env.DB.prepare(`SELECT r.id, r.revision_number, r.title, r.summary, r.category_id, r.tags, r.editor_id,
      r.changed_at, u.username AS editor_name FROM article_revisions r
      LEFT JOIN users u ON u.id = r.editor_id WHERE r.article_id = ? ORDER BY r.revision_number DESC LIMIT 100`).bind(id).all();
    return json({ article_title: article.title, items: (rows.results || []).map((row) => Object.assign({}, row, { tags: safeTags(row.tags) })) });
  }
  const articleMatch = path.match(/^\/api\/articles\/(\d+)$/);
  if (articleMatch && method === 'GET') {
    const id = parseId(articleMatch[1], 'บทความ');
    const article = await getArticleById(env, id);
    if (!article) fail(404, 'ไม่พบบทความนี้');
    await env.DB.prepare('UPDATE articles SET views = views + 1 WHERE id = ?').bind(id).run();
    article.views = Number(article.views || 0) + 1;
    return json(safeArticle(article));
  }

  if (path === '/api/bookmarks' && method === 'GET') {
    const current = await requireSession(request, env);
    const rows = await env.DB.prepare(articleSelect() + ' JOIN bookmarks b ON b.article_id = a.id WHERE b.user_id = ? AND a.status = \'published\' ORDER BY b.created_at DESC LIMIT 200').bind(current.user.id).all();
    return json({ items: (rows.results || []).map(safeArticle) });
  }
  const bookmarkMatch = path.match(/^\/api\/bookmarks\/(\d+)$/);
  if (bookmarkMatch && method === 'POST') {
    const current = await requireSession(request, env); checkCsrf(request, current);
    const id = parseId(bookmarkMatch[1], 'บทความ');
    const article = await getArticleById(env, id);
    if (!article) fail(404, 'ไม่พบบทความนี้');
    const found = await env.DB.prepare('SELECT user_id FROM bookmarks WHERE user_id = ? AND article_id = ?').bind(current.user.id, id).first();
    if (found) { await env.DB.prepare('DELETE FROM bookmarks WHERE user_id = ? AND article_id = ?').bind(current.user.id, id).run(); return json({ saved: false }); }
    await env.DB.prepare('INSERT OR IGNORE INTO bookmarks (user_id, article_id, created_at) VALUES (?, ?, ?)').bind(current.user.id, id, nowIso()).run();
    return json({ saved: true });
  }

  if (path === '/api/submissions' && method === 'POST') {
    const current = await requireSession(request, env); checkCsrf(request, current);
    await hitRateLimit(request, env, 'submissions', 25, 60 * 60 * 1000);
    const body = await readJson(request);
    const title = textField(body.title, MAX_TITLE, 'ชื่อบทความ', 3);
    const summary = typeof body.summary === 'string' ? body.summary.trim() : '';
    if (summary.length > MAX_SUMMARY) fail(400, 'คำอธิบายสรุปยาวเกิน 350 ตัวอักษร');
    const content = textField(body.content, MAX_CONTENT, 'เนื้อหา', 40);
    const categoryId = parseId(body.categoryId, 'หมวดหมู่');
    const category = await env.DB.prepare('SELECT id FROM categories WHERE id = ? AND active = 1').bind(categoryId).first();
    if (!category) fail(400, 'กรุณาเลือกหมวดหมู่ที่เปิดใช้งาน');
    const tags = JSON.stringify(parseTags(body.tags));
    const action = body.action === 'draft' ? 'draft' : 'pending';
    const now = nowIso();
    let existing = null;
    if (body.id !== undefined && body.id !== null && String(body.id) !== '') {
      const submissionId = parseId(body.id, 'ฉบับร่าง');
      existing = await env.DB.prepare('SELECT * FROM submissions WHERE id = ? AND author_id = ?').bind(submissionId, current.user.id).first();
      if (!existing) fail(404, 'ไม่พบฉบับร่างนี้');
      if (existing.status !== 'draft' && existing.status !== 'rejected') fail(409, 'รายการนี้ส่งตรวจแล้วและไม่สามารถแก้ไขได้');
    }
    let articleId = existing ? existing.article_id : null;
    if (!existing && body.articleId !== undefined && body.articleId !== null && String(body.articleId) !== '') articleId = parseId(body.articleId, 'บทความ');
    let baseRevision = 0;
    if (articleId) {
      const published = await getArticleById(env, articleId);
      if (!published) fail(404, 'ไม่พบบทความที่ต้องการเสนอแก้ไข');
      baseRevision = await getLatestRevision(env, articleId);
      if (baseRevision < 1) fail(409, 'บทความนี้ยังไม่มีเวอร์ชันที่ตรวจสอบได้');
    }
    if (existing) {
      await env.DB.prepare(`UPDATE submissions SET article_id = ?, title = ?, summary = ?, content = ?, category_id = ?, tags = ?, status = ?,
        base_revision = ?, review_note = NULL, reviewer_id = NULL, reviewed_at = NULL, updated_at = ?, submitted_at = ? WHERE id = ? AND author_id = ?`)
        .bind(articleId, title, summary, content, categoryId, tags, action, baseRevision, now, action === 'pending' ? now : null, existing.id, current.user.id).run();
      return json({ id: existing.id, status: action, article_id: articleId }, 200);
    }
    const result = await env.DB.prepare(`INSERT INTO submissions (article_id, title, summary, content, category_id, tags, status, author_id, base_revision, created_at, updated_at, submitted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(articleId, title, summary, content, categoryId, tags, action, current.user.id, baseRevision, now, now, action === 'pending' ? now : null).run();
    return json({ id: result.meta && result.meta.last_row_id, status: action, article_id: articleId }, 201);
  }
  if (path === '/api/my/submissions' && method === 'GET') {
    const current = await requireSession(request, env);
    const rows = await env.DB.prepare(`SELECT s.id, s.article_id, s.title, s.summary, s.category_id, s.tags, s.status, s.review_note,
      s.created_at, s.updated_at, s.submitted_at, s.reviewed_at, c.name AS category_name
      FROM submissions s LEFT JOIN categories c ON c.id = s.category_id WHERE s.author_id = ? ORDER BY s.updated_at DESC LIMIT 200`).bind(current.user.id).all();
    return json({ items: (rows.results || []).map((row) => Object.assign({}, row, { tags: safeTags(row.tags) })) });
  }
  const oneSubmissionMatch = path.match(/^\/api\/submissions\/(\d+)$/);
  if (oneSubmissionMatch && method === 'GET') {
    const current = await requireSession(request, env);
    const row = await env.DB.prepare(`SELECT s.*, c.name AS category_name FROM submissions s LEFT JOIN categories c ON c.id = s.category_id WHERE s.id = ? AND s.author_id = ?`).bind(parseId(oneSubmissionMatch[1], 'ฉบับร่าง'), current.user.id).first();
    if (!row) fail(404, 'ไม่พบฉบับร่างนี้');
    return json(Object.assign({}, row, { tags: safeTags(row.tags) }));
  }

  if (path === '/api/account/password' && method === 'POST') {
    const current = await requireSession(request, env); checkCsrf(request, current);
    const body = await readJson(request);
    const oldPassword = typeof body.oldPassword === 'string' ? body.oldPassword : '';
    const newPassword = passwordField(body.newPassword);
    if (oldPassword.length > 128 || !oldPassword) fail(400, 'กรุณากรอกรหัสผ่านปัจจุบัน');
    const row = await env.DB.prepare('SELECT password_salt, password_hash FROM users WHERE id = ?').bind(current.user.id).first();
    const candidate = await passwordHash(oldPassword, row.password_salt);
    if (!constantEqual(candidate, row.password_hash)) fail(400, 'รหัสผ่านปัจจุบันไม่ถูกต้อง');
    if (oldPassword === newPassword) fail(400, 'รหัสผ่านใหม่ต้องแตกต่างจากรหัสผ่านเดิม');
    const salt = hex(randomBytes(16));
    const hash = await passwordHash(newPassword, salt);
    await env.DB.prepare('UPDATE users SET password_salt = ?, password_hash = ? WHERE id = ?').bind(salt, hash, current.user.id).run();
    const raw = cookieToken(request);
    const currentHash = raw ? await sha256(raw) : '';
    await env.DB.prepare('DELETE FROM sessions WHERE user_id = ? AND id != ?').bind(current.user.id, currentHash).run();
    return json({ ok: true, csrf: current.csrf });
  }

  if (path === '/api/admin/summary' && method === 'GET') {
    requireAdmin(session);
    const row = await env.DB.prepare(`SELECT
      (SELECT COUNT(*) FROM articles WHERE status = 'published') AS articles,
      (SELECT COUNT(*) FROM submissions WHERE status = 'pending') AS pending,
      (SELECT COUNT(*) FROM users) AS users,
      (SELECT COUNT(*) FROM categories WHERE active = 1) AS categories`).first();
    return json(row || { articles: 0, pending: 0, users: 0, categories: 0 });
  }
  if (path === '/api/admin/submissions' && method === 'GET') {
    requireAdmin(session);
    const status = url.searchParams.get('status') || 'pending';
    if (!['pending', 'rejected', 'approved', 'draft', 'processing'].includes(status)) fail(400, 'สถานะไม่ถูกต้อง');
    const rows = await env.DB.prepare(`SELECT s.id, s.article_id, s.title, s.summary, s.category_id, s.tags, s.status, s.author_id,
      s.base_revision, s.created_at, s.updated_at, s.submitted_at, s.review_note, c.name AS category_name, u.username AS author_name
      FROM submissions s JOIN users u ON u.id = s.author_id LEFT JOIN categories c ON c.id = s.category_id
      WHERE s.status = ? ORDER BY s.submitted_at ASC LIMIT 200`).bind(status).all();
    return json({ items: (rows.results || []).map((row) => Object.assign({}, row, { tags: safeTags(row.tags) })) });
  }
  const adminSubmissionMatch = path.match(/^\/api\/admin\/submissions\/(\d+)$/);
  if (adminSubmissionMatch && method === 'GET') {
    requireAdmin(session);
    const row = await env.DB.prepare(`SELECT s.*, c.name AS category_name, u.username AS author_name
      FROM submissions s JOIN users u ON u.id = s.author_id LEFT JOIN categories c ON c.id = s.category_id WHERE s.id = ?`).bind(parseId(adminSubmissionMatch[1], 'บทความ')).first();
    if (!row) fail(404, 'ไม่พบรายการนี้');
    return json(Object.assign({}, row, { tags: safeTags(row.tags) }));
  }
  const reviewMatch = path.match(/^\/api\/admin\/submissions\/(\d+)\/review$/);
  if (reviewMatch && method === 'POST') {
    requireAdmin(session); checkCsrf(request, session);
    const body = await readJson(request);
    const decision = body.decision;
    const note = typeof body.note === 'string' ? body.note.trim().slice(0, 1000) : '';
    if (decision !== 'approve' && decision !== 'reject') fail(400, 'คำสั่งตรวจสอบไม่ถูกต้อง');
    if (decision === 'reject' && note.length < 5) fail(400, 'กรุณาระบุข้อเสนอแนะอย่างน้อย 5 ตัวอักษร');
    const id = parseId(reviewMatch[1], 'บทความ');
    const claim = await env.DB.prepare("UPDATE submissions SET status = 'processing' WHERE id = ? AND status = 'pending'").bind(id).run();
    if (!claim.meta || Number(claim.meta.changes) !== 1) fail(409, 'รายการนี้ไม่ได้อยู่ในคิวตรวจสอบแล้ว กรุณาโหลดหน้าใหม่');
    let lockedSubmission;
    try {
      lockedSubmission = await env.DB.prepare('SELECT * FROM submissions WHERE id = ?').bind(id).first();
      if (!lockedSubmission) fail(404, 'ไม่พบรายการนี้');
      const now = nowIso();
      if (decision === 'reject') {
        await env.DB.prepare("UPDATE submissions SET status = 'rejected', review_note = ?, reviewer_id = ?, reviewed_at = ?, updated_at = ? WHERE id = ? AND status = 'processing'")
          .bind(note, session.user.id, now, now, id).run();
        return json({ ok: true, status: 'rejected' });
      }
      let articleId = lockedSubmission.article_id ? Number(lockedSubmission.article_id) : null;
      let nextRevision = 1;
      let finalSlug = '';
      if (articleId) {
        const published = await getArticleById(env, articleId);
        if (!published) fail(409, 'บทความเดิมไม่สามารถพบได้ กรุณาตรวจสอบข้อมูลก่อนอนุมัติ');
        const latest = await getLatestRevision(env, articleId);
        if (latest !== Number(lockedSubmission.base_revision)) {
          const conflictNote = 'มีการเผยแพร่เวอร์ชันใหม่ระหว่างที่ฉบับนี้รอตรวจสอบ กรุณาเปิดบทความล่าสุด ตรวจข้อมูลอีกครั้ง แล้วส่งฉบับแก้ไขใหม่';
          await env.DB.prepare("UPDATE submissions SET status = 'rejected', review_note = ?, reviewer_id = ?, reviewed_at = ?, updated_at = ? WHERE id = ? AND status = 'processing'")
            .bind(conflictNote, session.user.id, now, now, id).run();
          fail(409, conflictNote);
        }
        nextRevision = latest + 1;
      } else {
        const placeholder = 'pending-' + token(12);
        const created = await env.DB.prepare(`INSERT INTO articles (slug, title, summary, content, category_id, tags, author_id, editor_id,
          created_at, updated_at, published_at, views, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'draft')`)
          .bind(placeholder, lockedSubmission.title, lockedSubmission.summary, lockedSubmission.content, lockedSubmission.category_id, lockedSubmission.tags, lockedSubmission.author_id, lockedSubmission.author_id, now, now, now).run();
        articleId = created.meta && created.meta.last_row_id;
        if (!articleId) {
          const createdRow = await env.DB.prepare('SELECT id FROM articles WHERE slug = ?').bind(placeholder).first();
          articleId = createdRow && createdRow.id;
        }
        if (!articleId) fail(500, 'สร้างบทความไม่สำเร็จ');
        finalSlug = slugBase(lockedSubmission.title) + '-' + articleId;
      }
      const operations = [];
      if (lockedSubmission.article_id) {
        operations.push(env.DB.prepare(`UPDATE articles SET title = ?, summary = ?, content = ?, category_id = ?, tags = ?, editor_id = ?, updated_at = ?
          WHERE id = ? AND status = 'published'`).bind(lockedSubmission.title, lockedSubmission.summary, lockedSubmission.content, lockedSubmission.category_id, lockedSubmission.tags, lockedSubmission.author_id, now, articleId));
      } else {
        operations.push(env.DB.prepare("UPDATE articles SET status = 'published', slug = ? WHERE id = ? AND status = 'draft'").bind(finalSlug, articleId));
      }
      operations.push(env.DB.prepare(`INSERT INTO article_revisions (article_id, revision_number, title, summary, content, category_id, tags, editor_id, submission_id, changed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(articleId, nextRevision, lockedSubmission.title, lockedSubmission.summary, lockedSubmission.content, lockedSubmission.category_id, lockedSubmission.tags, lockedSubmission.author_id, id, now));
      operations.push(env.DB.prepare("UPDATE submissions SET status = 'approved', article_id = ?, review_note = ?, reviewer_id = ?, reviewed_at = ?, updated_at = ? WHERE id = ? AND status = 'processing'")
        .bind(articleId, note || null, session.user.id, now, now, id));
      await env.DB.batch(operations);
      return json({ ok: true, status: 'approved', article_id: articleId });
    } catch (error) {
      if (error instanceof HttpError && error.status === 409 && lockedSubmission && lockedSubmission.article_id) {
        const statusRow = await env.DB.prepare('SELECT status FROM submissions WHERE id = ?').bind(id).first();
        if (statusRow && statusRow.status === 'processing') await env.DB.prepare("UPDATE submissions SET status = 'pending' WHERE id = ? AND status = 'processing'").bind(id).run();
      } else {
        const statusRow = await env.DB.prepare('SELECT status FROM submissions WHERE id = ?').bind(id).first();
        if (statusRow && statusRow.status === 'processing') await env.DB.prepare("UPDATE submissions SET status = 'pending' WHERE id = ? AND status = 'processing'").bind(id).run();
      }
      throw error;
    }
  }
  if (path === '/api/admin/users' && method === 'GET') {
    requireAdmin(session);
    const q = (url.searchParams.get('q') || '').trim().slice(0, 100);
    const rows = q
      ? await env.DB.prepare('SELECT id, username, email, role, status, created_at FROM users WHERE username LIKE ? COLLATE NOCASE OR email LIKE ? COLLATE NOCASE ORDER BY created_at DESC LIMIT 300').bind('%' + q + '%', '%' + q + '%').all()
      : await env.DB.prepare('SELECT id, username, email, role, status, created_at FROM users ORDER BY created_at DESC LIMIT 300').all();
    return json({ items: rows.results || [] });
  }
  const userStatusMatch = path.match(/^\/api\/admin\/users\/(\d+)\/status$/);
  if (userStatusMatch && method === 'POST') {
    requireAdmin(session); checkCsrf(request, session);
    const id = parseId(userStatusMatch[1], 'สมาชิก');
    const body = await readJson(request);
    if (body.status !== 'active' && body.status !== 'suspended') fail(400, 'สถานะบัญชีไม่ถูกต้อง');
    if (Number(session.user.id) === id && body.status === 'suspended') fail(400, 'ไม่สามารถระงับบัญชีที่กำลังใช้งานอยู่ได้');
    const target = await env.DB.prepare('SELECT id, role, status FROM users WHERE id = ?').bind(id).first();
    if (!target) fail(404, 'ไม่พบสมาชิกนี้');
    if (target.role === 'admin' && body.status === 'suspended' && target.status === 'active') {
      const count = await env.DB.prepare("SELECT COUNT(*) AS n FROM users WHERE role = 'admin' AND status = 'active'").first();
      if (Number(count.n) <= 1) fail(400, 'ไม่สามารถระงับผู้ดูแลระบบคนสุดท้ายได้');
    }
    await env.DB.prepare('UPDATE users SET status = ? WHERE id = ?').bind(body.status, id).run();
    if (body.status === 'suspended') await env.DB.prepare('DELETE FROM sessions WHERE user_id = ?').bind(id).run();
    return json({ ok: true, status: body.status });
  }
  if (path === '/api/admin/categories' && method === 'POST') {
    requireAdmin(session); checkCsrf(request, session);
    const body = await readJson(request);
    const name = textField(body.name, 80, 'ชื่อหมวดหมู่', 2);
    const description = typeof body.description === 'string' ? body.description.trim() : '';
    if (description.length > 240) fail(400, 'คำอธิบายหมวดหมู่ยาวเกินกำหนด');
    const duplicate = await env.DB.prepare('SELECT id FROM categories WHERE name = ? COLLATE NOCASE').bind(name).first();
    if (duplicate) fail(409, 'มีหมวดหมู่ชื่อนี้อยู่แล้ว');
    const slug = slugBase(name) + '-' + token(5).toLowerCase();
    const result = await env.DB.prepare('INSERT INTO categories (name, slug, description, active, created_at) VALUES (?, ?, ?, 1, ?)').bind(name, slug, description, nowIso()).run();
    return json({ ok: true, id: result.meta && result.meta.last_row_id }, 201);
  }
  const categoryStatusMatch = path.match(/^\/api\/admin\/categories\/(\d+)$/);
  if (categoryStatusMatch && method === 'POST') {
    requireAdmin(session); checkCsrf(request, session);
    const id = parseId(categoryStatusMatch[1], 'หมวดหมู่');
    const body = await readJson(request);
    if (typeof body.active !== 'boolean') fail(400, 'สถานะหมวดหมู่ไม่ถูกต้อง');
    const existing = await env.DB.prepare('SELECT id FROM categories WHERE id = ?').bind(id).first();
    if (!existing) fail(404, 'ไม่พบหมวดหมู่นี้');
    if (!body.active) {
      const count = await env.DB.prepare('SELECT COUNT(*) AS n FROM categories WHERE active = 1').first();
      if (Number(count.n) <= 1) fail(400, 'ต้องมีหมวดหมู่ที่เปิดใช้งานอย่างน้อยหนึ่งหมวด');
    }
    await env.DB.prepare('UPDATE categories SET active = ? WHERE id = ?').bind(body.active ? 1 : 0, id).run();
    return json({ ok: true, active: body.active });
  }

  return json({ error: 'ไม่พบ API ที่ร้องขอ' }, 404);
}

function htmlResponse() {
  return new Response(INDEX_HTML, { status: 200, headers: responseHeaders({
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'; object-src 'none'",
    'X-DNS-Prefetch-Control': 'off'
  }) });
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      if (url.pathname.startsWith('/api/')) {
        if (!env.DB) return json({ error: 'ยังไม่ได้เชื่อมต่อ D1 binding ชื่อ DB กรุณาตั้งค่าใน Cloudflare' }, 503);
        return await apiFetch(request, env);
      }
      if (url.pathname === '/favicon.ico') return new Response(null, { status: 204, headers: responseHeaders() });
      return htmlResponse();
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status);
      console.error('Anijipedia request failed:', error && error.stack ? error.stack : error);
      return json({ error: 'ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง หากปัญหายังอยู่ให้ตรวจสอบบันทึกของ Worker' }, 500);
    }
  }
};
