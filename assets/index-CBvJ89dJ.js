(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#app`),t=[{id:`today`,hash:`#/`,label:`오늘`},{id:`review`,hash:`#/review`,label:`심사`},{id:`ledger`,hash:`#/ledger`,label:`기록`},{id:`account`,hash:`#/account`,label:`내 계좌`}],n={pass:{text:`통과`,tone:`pass`},fail:{text:`탈락`,tone:`fail`},hold:{text:`보류`,tone:`hold`},setup:{text:`자리`,tone:`pass`},reject:{text:`REJECT`,tone:`fail`},skip:{text:`SKIP`,tone:`hold`},watch:{text:`관찰`,tone:`pass`}},r={route:`today`,slot:1,ledgerDate:null,loading:!0,error:``,config:null,index:null,names:{},day:null,ledger:[],fills:[]};function i(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}function a(e){return e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean).map(e=>JSON.parse(e))}function o(e){return Number(e).toLocaleString(`ko-KR`)}function s(e){return`${o(e)}원`}function c(e,t=1){let n=Number(e),r=n.toFixed(t);return n>0?`+${r}`:r}function l(e,t=1){return`${c(e,t)}%`}function u(e){if(e==null||Number.isNaN(Number(e)))return`없음`;let t=Math.round(Number(e));return t>0?`+${o(t)}억`:t<0?`${o(t)}억`:`0억`}function d(e){let t=Number(e),n=Math.floor(t/1e4),r=t%1e4;return n<=0?`${o(t)}억`:`${n}조 ${o(r)}억`}function f(e){return r.names[e]?.name??e}function p(e){return r.names[e]??{name:e,market:``,sector:``}}function m(){let e=location.hash||`#/`;return e.startsWith(`#/review`)?`review`:e.startsWith(`#/ledger`)?`ledger`:e.startsWith(`#/account`)?`account`:`today`}function h(){return r.config.oneR*r.config.maxNames}function g(){let e=r.fills.reduce((e,t)=>t.exitPrice==null?e+(Number(t.riskWon)||r.config.oneR):e,0);return Math.max(0,h()-e)}function _(){return r.fills.filter(e=>e.exitPrice==null)}function v(e){return`tone-${n[e]?.tone??`hold`}`}function y(e,t){return t||n[e]?.text||e}function b(e,t){return`<span class="${v(e)}">${i(y(e,t))}</span>`}function x(){return r.day?.watches??[]}function S(e){return x().find(t=>Number(t.slot||1)===Number(e))}function C(e){return{loc:(e.provisional-e.low)/(e.high-e.low)*100,wick:(e.high-e.rangeHigh)/e.brokerLast*100,sma5:(e.provisional-e.sma5)/e.sma5*100,sma20:(e.provisional-e.sma20)/e.sma20*100,valueMult:e.valueEok/e.value20dEok,amp:(e.high-e.low)/e.open*100,chg:(e.provisional-e.prevClose)/e.prevClose*100,maxLoss:e.shares*(e.rangeHigh-e.stop),notional:e.shares*e.rangeHigh}}function w(e){let t=e.stop,n=Math.max(e.rangeHigh,e.provisional),r=(n-t)*.045,i=t,a=n+r-i;return{left:(e.rangeLow-i)/a*100,width:(e.rangeHigh-e.rangeLow)/a*100,dot:(e.provisional-i)/a*100}}function T(e){return{rejects:(e.scout??[]).filter(e=>e.risk===`reject`).sort((e,t)=>{let n=e=>e.flow===`fail`?0:e.theme===`fail`?1:e.chart===`fail`?2:3;return n(e)-n(t)}),holds:(e.scout??[]).filter(e=>e.flow===`hold`)}}function E(e){let t=r.ledger.filter(t=>t.date===e),n=r.index?.asOf,i=n&&e<n,a=t.filter(e=>e.at1500===`watch`),o=t.filter(e=>e.at1500!==`watch`&&e.flow===`pass`),s=t.filter(e=>e.at1500!==`watch`&&e.flow!==`pass`),c=[];for(let e of a)c.push({...e,displayName:`${f(e.code)} ${e.code}`,flowLabel:y(e.flow),flowTone:e.flow,atLabel:`관찰`,atTone:`pass`,outcomeLabel:i?e.outcomeLabel||y(e.outcome):`대기`,outcomeTone:i?e.outcome:`hold`});for(let e of o)c.push({...e,displayName:`${f(e.code)} ${e.code}`,flowLabel:y(e.flow),flowTone:e.flow,atLabel:`—`,atTone:`hold`,outcomeLabel:e.outcomeLabel||`재료 탈락`,outcomeTone:`fail`});if(s.length){let e=s[0],t=s.length-1;c.push({date:e.date,displayName:t>0?`${f(e.code)} 외 ${t}`:f(e.code),flowLabel:`탈락/보류`,flowTone:`hold`,atLabel:`—`,atTone:`hold`,outcomeLabel:`미포함`,outcomeTone:`hold`})}return c}function D(){let{equity:e,oneR:t,org:n,disclaimer:i}=r.config,a=r.day?.scout?.length??0;return r.route===`review`?{title:`깔때기 · 발굴 ${a}`,sub:`AND: 발굴 통과 · 수급 통과 · 차트 자리있음 · 재료 비탈락 · 리스크 PASS. 보류는 검토를 안 막음. 15:00에는 통과만.`,meta:``}:r.route===`ledger`?{title:`원장 · 누적`,sub:`ledger.jsonl · 하루 × 종목 1행 · 봉인 후 라벨 수정 없음`,meta:`outcomes는 다음날 08:40`}:r.route===`account`?{title:`내 계좌`,sub:`여기는 네가 실제로 넣은 것만. 오늘 관찰은 오늘 탭.`,meta:`원금 ${o(e)} · 1R ${o(t)}`}:{title:n,sub:i,meta:`원금 ${s(e)} · 하루 리스크 한도 ${s(h())}`}}function O(){return`<nav class="tabs" aria-label="주요 화면">
    ${t.map(e=>`<a class="tab${r.route===e.id?` active`:``}" href="${e.hash}">${e.label}</a>`).join(``)}
  </nav>`}function k(){let e=D();return`<header>
    <div class="top">
      <div class="brand">
        <h1>${i(e.title)}</h1>
        <p class="sub">${i(e.sub)}</p>
      </div>
      ${e.meta?`<div class="meta">${i(e.meta)}</div>`:``}
    </div>
    ${O()}
  </header>`}function A(){let e=r.day;if(!e)return`<section class="empty-page">오늘 원장이 없다. data/days/ 아래 JSON을 올린다.</section>`;let t=x(),n=S(r.slot),a=e.scout.filter(e=>e.flow===`pass`).length,o=_().length,{rejects:c,holds:l}=T(e),u=Number(r.config.cardSlots||3);return`
    <section class="kpis">
      <div class="kpi"><div class="k">오늘 남은 리스크</div><div class="v">${s(g())}</div></div>
      <div class="kpi"><div class="k">보유</div><div class="v">${o} / ${r.config.maxNames}</div></div>
      <div class="kpi"><div class="k">오늘 관찰</div><div class="v">${t.length}</div></div>
      <div class="kpi"><div class="k">오늘 후보</div><div class="v">${e.scout.length}</div></div>
      <div class="kpi"><div class="k">수급 통과</div><div class="v">${a}</div></div>
    </section>
    <div class="today-grid">
      <div>
        <div class="controls">
          <span class="date-chip">${i(e.date)}</span>
          ${Array.from({length:u},(e,t)=>t+1).map(e=>`<button class="slot${r.slot===e?` active`:``}" type="button" data-slot="${e}">${e}</button>`).join(``)}
          <span class="hint">숫자 누르면 관찰 카드가 바뀐다. 오늘은 ${t.length}만 있다.</span>
        </div>
        ${n?M(n,t.length):j()}
      </div>
      <aside class="rail">
        <h2>오늘 탈락</h2>
        ${c.map(e=>`<div class="drop"><span>${i(f(e.code))}</span><span class="why">${i(e.drop||`탈락`)}</span></div>`).join(``)}
        ${l.length?`<div class="drop-hold"><span>${l.length===1?i(f(l[0].code)):`${i(f(l[0].code))} 외 ${l.length-1}`}</span><span>수급 보류</span></div>`:``}
      </aside>
    </div>
    <p class="page-note">${i(e.sourceNote)}</p>
  `}function j(){return`<article class="card empty-card">
    <h2>오늘 관찰 없음</h2>
    <p>이 번호에는 배정된 관찰 카드가 없다.</p>
    <p>관찰 목록이지 매수 지시가 아니다.</p>
  </article>`}function M(e,t){let n=p(e.code),a=C(e),c=w(e),f=e.instDayEok==null?`없음`:u(e.instDayEok);return`<article class="card">
    <div class="card-top">
      <div>
        <div class="eyebrow">
          <span>오늘 관찰 ${e.slot||1}/${t}</span>
          <span class="tag-mute">매수 지시 아님</span>
        </div>
        <h2 class="name">${i(n.name)}</h2>
        <div class="meta-line">${i(e.code)} · ${i(n.market)} · ${i(n.sector)} · ${i(e.shares)}주 · ${i(r.day.asOfLabel)}</div>
      </div>
      <div class="risk-box">
        <strong>최대 손실 ${s(a.maxLoss)}</strong>
        <span>손절가 ${o(e.stop)}에 닿으면</span>
      </div>
    </div>
    <div class="range">
      <div class="range-labels">
        <span>손절 ${o(e.stop)}</span>
        <span>볼 가격대 ${o(e.rangeLow)} - ${o(e.rangeHigh)}</span>
        <span>잠정가 ${o(e.provisional)}</span>
      </div>
      <div class="range-track">
        <div class="range-fill" style="left:${c.left}%;width:${c.width}%"></div>
        <div class="range-dot" style="left:${c.dot}%"></div>
      </div>
    </div>
    <div class="stats">
      <div class="stat"><div class="k">당일 위치 (저→고)</div><div class="v">위 ${Math.round(a.loc)}%</div></div>
      <div class="stat"><div class="k">윗꼬리</div><div class="v">${a.wick.toFixed(2)}%</div></div>
      <div class="stat"><div class="k">5일선 이격</div><div class="v">${l(a.sma5,1)}</div></div>
      <div class="stat"><div class="k">20일선 이격</div><div class="v">${l(a.sma20,1)}</div></div>
      <div class="stat"><div class="k">대금 / 20일</div><div class="v">${a.valueMult.toFixed(2)}배</div></div>
      <div class="stat"><div class="k">외인 당일</div><div class="v">${u(e.foreignDayEok)}</div></div>
      <div class="stat"><div class="k">기관 당일</div><div class="v">${i(f)}</div></div>
      <div class="stat"><div class="k">당일 진폭</div><div class="v">${a.amp.toFixed(1)}%</div></div>
      <div class="stat"><div class="k">시가총액</div><div class="v">${d(e.marketCapEok)}</div></div>
      <div class="stat"><div class="k">외인 보유율</div><div class="v">${Number(e.foreignHoldPct).toFixed(2)}%</div></div>
      <div class="stat"><div class="k">PER / PBR</div><div class="v">${e.per} / ${e.pbr}</div></div>
      <div class="stat"><div class="k">연중 고저</div><div class="v">${o(e.yearHigh)} / ${o(e.yearLow)}</div></div>
      <div class="stat"><div class="k">상장주식</div><div class="v">${Number(e.listedSharesEok).toFixed(2)}억주</div></div>
      <div class="stat"><div class="k">EPS / BPS</div><div class="v">${o(e.eps)} / ${o(e.bps)}</div></div>
      <div class="stat"><div class="k">${i(e.brokerQuoteLabel||`현재가`)}</div><div class="v">${o(e.brokerLast)}</div></div>
      <div class="stat"><div class="k">공시</div><div class="v warn">${i(e.disclosure||`당일 없음`)}</div></div>
    </div>
    <div class="foot-line">시 ${o(e.open)} · 고 ${o(e.high)} · 저 ${o(e.low)} · 최대 투입 ${s(a.notional)} · ${i(e.exitNote)}</div>
  </article>`}function N(){let e=r.day;return e?`
    <div class="panel table-wrap funnel">
      <table>
        <thead>
          <tr>
            <th>종목</th>
            <th>발굴</th>
            <th>수급</th>
            <th>차트</th>
            <th>재료</th>
            <th>리스크</th>
            <th>15:00</th>
          </tr>
        </thead>
        <tbody>
          ${e.scout.map(e=>{let t=p(e.code),n=e.at1500===`watch`,r=e.chart===`fail`?`fail`:e.chart;return`<tr class="${n?`row-watch`:``}">
                <td class="stock-cell">${i(t.name)} <span class="code">${i(e.code)}</span></td>
                <td>${b(e.discovery)}</td>
                <td>${b(e.flow)}</td>
                <td>${b(r,e.chartLabel)}</td>
                <td>${b(e.theme,e.themeLabel)}</td>
                <td>${b(e.risk,e.riskLabel)}</td>
                <td>${n?`<span class="badge-watch">관찰</span>`:``}</td>
              </tr>`}).join(``)}
        </tbody>
      </table>
    </div>
  `:`<section class="empty-page">심사할 날이 없다.</section>`}function P(){let e=r.index.calendar??[],t=r.ledgerDate||r.index.asOf,n=e.find(e=>e.date===t)??e[0],a=n&&!n.empty?E(n.date):[];return`
    <div class="day-chips">
      ${e.map(e=>{let n=e.date===r.day?.date?x():[],a=e.empty?`비어 있음`:`관찰 ${n.length||E(e.date).filter(e=>e.at1500===`watch`).length}`,o=e.empty?`백필 금지`:n[0]?f(n[0].code):`—`;return`<button type="button" class="day-chip${e.date===t?` active`:``}" data-day="${e.date}">
            <span class="d">${i(e.date)}</span>
            <span class="t">${i(a)}</span>
            <span class="n">${i(o)}</span>
          </button>`}).join(``)}
    </div>
    <div class="panel table-wrap">
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>종목</th>
            <th>수급</th>
            <th>15:00</th>
            <th>결과</th>
          </tr>
        </thead>
        <tbody>
          ${a.length?a.map(e=>`<tr>
                      <td>${i(String(e.date).slice(5))}</td>
                      <td class="stock-cell">${i(e.displayName)}</td>
                      <td class="${v(e.flowTone)}">${i(e.flowLabel)}</td>
                      <td class="${e.atLabel===`관찰`?`tone-pass`:`tone-hold`}">${i(e.atLabel)}</td>
                      <td class="${v(e.outcomeTone===`pending`?`hold`:e.outcomeTone)}">${i(e.outcomeLabel)}</td>
                    </tr>`).join(``):`<tr><td class="table-empty" colspan="5">${n?.noBackfill?`비어 있음 · 백필 금지`:`원장 없음`}</td></tr>`}
        </tbody>
      </table>
    </div>
    <p class="page-note">클라우드(GitHub Pages)에 days/와 ledger를 그대로 올린다. 매수 지시 화면 아님.</p>
  `}function F(){let{equity:e}=r.config,t=r.fills.reduce((e,t)=>e+(Number(t.pnl)||0),0),n=e?t/e*100:0,a=_().length,s=x()[0],c=s?p(s.code):null,u=s?C(s):null,d=new Set(r.fills.map(e=>e.code));return`
    <section class="kpis">
      <div class="kpi"><div class="k">원금</div><div class="v">${o(e)}</div></div>
      <div class="kpi"><div class="k">실현 손익</div><div class="v">${o(t)}</div></div>
      <div class="kpi"><div class="k">수익률</div><div class="v">${n.toFixed(2)}%</div></div>
      <div class="kpi"><div class="k">아직 안 판 것</div><div class="v">${a}</div></div>
      <div class="kpi"><div class="k">지금까지 거래</div><div class="v">${r.fills.length}</div></div>
    </section>
    <div class="account-grid">
      <section class="panel">
        <h2>넣은 종목</h2>
        <p class="help">${r.fills.length?`fills.jsonl에 적힌 실제 체결만 보여 준다.`:s?`아직 넣은 종목 없음. 내일 시초에 ${i(c.name)}을 샀으면 수량과 산 가격을 적는다.`:`아직 넣은 종목 없음. 산 뒤에 fills.jsonl에 수량과 가격을 적는다.`}</p>
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>종목</th>
              <th>수량</th>
              <th>진입가</th>
              <th>청산가</th>
              <th>손익</th>
              <th>수익률</th>
            </tr>
          </thead>
          <tbody>
            ${r.fills.length?r.fills.map(e=>{let t=e.entryPrice&&e.exitPrice?((e.exitPrice-e.entryPrice)/e.entryPrice*100).toFixed(2)+`%`:`—`;return`<tr>
                        <td>${i(e.date)}</td>
                        <td>${i(f(e.code))}</td>
                        <td>${i(e.qty)}</td>
                        <td>${e.entryPrice?o(e.entryPrice):`—`}</td>
                        <td>${e.exitPrice?o(e.exitPrice):`—`}</td>
                        <td>${e.pnl==null?`—`:o(e.pnl)}</td>
                        <td>${t}</td>
                      </tr>`}).join(``):`<tr><td class="table-empty" colspan="7">fills.jsonl 비어 있음</td></tr>`}
          </tbody>
        </table>
      </section>
      ${s&&!d.has(s.code)?`<aside class="panel watch-side">
              <div class="badge">오늘 관찰 · 아직 안 넣음</div>
              <h2>${i(c.name)}</h2>
              <p class="sub">${i(s.code)} · ${i(c.market)} · ${i(c.sector)}</p>
              <div class="mini">
                <div><div class="k">최근가 (${i(r.day.asOfLabel)})</div><div class="v">${o(s.provisional)}</div></div>
                <div><div class="k">등락</div><div class="v">${l(u.chg,2)}</div></div>
                <div><div class="k">당일 대금</div><div class="v">${o(s.valueEok)}억</div></div>
                <div><div class="k">20일 대금</div><div class="v">${o(s.value20dEok)}억</div></div>
              </div>
              <div class="wide-box"><div class="k">볼 가격대</div><div class="v">${o(s.rangeLow)} ~ ${o(s.rangeHigh)}</div></div>
              <div class="wide-box"><div class="k">손절가</div><div class="v">${o(s.stop)}</div></div>
              <p class="page-note">시총·PER은 아직 없음. 코드·시장·업종만 names.json에 쌓는다.</p>
            </aside>`:`<aside class="panel"><p class="help">오늘 관찰을 넣었거나 관찰이 없다.</p></aside>`}
    </div>
    <p class="page-note">원본 archive/ledger.jsonl + book/fills.jsonl · 학습용 export/learning.csv 는 원본에서만 뽑음 · GitHub에 같이 올린다</p>
  `}function I(){return r.route===`review`?N():r.route===`ledger`?P():r.route===`account`?F():A()}function L(){e.querySelectorAll(`[data-slot]`).forEach(e=>{e.addEventListener(`click`,()=>{r.slot=Number(e.dataset.slot),R()})}),e.querySelectorAll(`[data-day]`).forEach(e=>{e.addEventListener(`click`,()=>{r.ledgerDate=e.dataset.day,R()})})}function R(){if(r.loading){e.innerHTML=`<div class="status">원장 읽는 중…</div>`;return}if(r.error){e.innerHTML=`<div class="error">${i(r.error)}</div>`;return}document.title=r.route===`today`?r.config.org:`${t.find(e=>e.id===r.route)?.label??``} · ${r.config.org}`,e.innerHTML=`${k()}<main>${I()}</main>`,L()}async function z(e){let t=await fetch(e,{cache:`no-store`});if(!t.ok)throw Error(`${e} (${t.status})`);return t.json()}async function B(e){let t=await fetch(e,{cache:`no-store`});if(!t.ok)throw Error(`${e} (${t.status})`);return t.text()}async function V(){r.route=m(),R();try{let[e,t,n,i,o]=await Promise.all([z(`./data/config.json`),z(`./data/index.json`),z(`./data/names.json`),B(`./data/ledger.jsonl`),B(`./data/fills.jsonl`)]);r.config=e,r.index=t,r.names=n,r.ledger=a(i),r.fills=a(o),r.ledgerDate=t.asOf;let s=t.asOf||t.days?.[0];s&&(r.day=await z(`./data/days/${s}.json`)),r.loading=!1}catch(e){r.loading=!1,r.error=`원장을 읽지 못했다. data/*.json을 확인한다. ${e.message??e}`}R()}window.addEventListener(`hashchange`,()=>{r.route=m(),R()}),V();