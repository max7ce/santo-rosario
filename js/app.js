/* =========================================================
   Santo Rosario · UCB — Lógica de la aplicación
   ========================================================= */
(() => {
  'use strict';

  const VERSION = '1.0.0';
  const CLAVE_AJUSTES = 'ucb-rosario-ajustes';
  const CLAVE_PROGRESO = 'ucb-rosario-progreso';

  const AJUSTES_BASE = {
    modo: 'grupal', tema: 'auto', escala: 1,
    lecturas: true, jaculatorias: true, ofrecimiento: true, letanias: true,
    advocacion: 'chaguaya', liturgico: true, pantalla: true, vibrar: false
  };

  const POR_DIA = ['gloriosos', 'gozosos', 'dolorosos', 'gloriosos', 'luminosos', 'dolorosos', 'gozosos'];
  const ORDINALES = ['Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto'];
  const SINGULAR = { gozosos: 'Gozoso', luminosos: 'Luminoso', dolorosos: 'Doloroso', gloriosos: 'Glorioso' };

  /* ---------- Almacenamiento seguro ---------- */
  const leer = (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } };
  const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const borrar = (k) => { try { localStorage.removeItem(k); } catch (e) {} };

  const ajustes = Object.assign({}, AJUSTES_BASE, leer(CLAVE_AJUSTES, {}));
  const estado = { set: null, pasos: [], idx: 0, enRezo: false, wakeLock: null };

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  /* ---------- Iconos ---------- */
  const ICO = {
    guia: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 19.5c.7-3.6 3.4-5.6 6.5-5.6s5.8 2 6.5 5.6"/></svg>',
    todos: '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M2.5 19c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5M13.5 14.6c.9-.6 1.9-.9 3-.9 2.3 0 4.2 1.6 4.8 4.3"/></svg>',
    libro: '<svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>',
    fruto: '<svg viewBox="0 0 24 24"><path d="M12 21c-4.4 0-7-3.4-7-7.2C5 9.5 8 7 12 7s7 2.5 7 6.8c0 3.8-2.6 7.2-7 7.2zM12 7c0-2 1-3.6 3-4.5"/></svg>',
    luz: '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></svg>',
    cruz: '<svg viewBox="0 0 16 20" class="cuenta-cruz"><path d="M6 0h4v5h5v4h-5v11H6V9H1V5h5z" fill="currentColor" stroke="none"/></svg>'
  };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* =========================================================
     Calendario litúrgico (simplificado)
     ========================================================= */
  const soloFecha = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const sumarDias = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

  function pascua(y) { // Algoritmo de Meeus/Jones/Butcher
    const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
    const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(y, mes - 1, dia);
  }
  function primerDomingoAdviento(y) {
    const navidad = new Date(y, 11, 25);
    const cuarto = sumarDias(navidad, -(navidad.getDay() || 7));
    return sumarDias(cuarto, -21);
  }
  function bautismoDelSenor(y) { // domingo después del 6 de enero
    const epif = new Date(y, 0, 6);
    return sumarDias(epif, 7 - epif.getDay());
  }

  function tiempoLiturgico(fecha) {
    const d = soloFecha(fecha), y = d.getFullYear();
    const p = pascua(y);
    const ceniza = sumarDias(p, -46), ramos = sumarDias(p, -7), pentecostes = sumarDias(p, 49);
    if (d >= primerDomingoAdviento(y) && d < new Date(y, 11, 25)) return { clave: 'adviento', nombre: 'Tiempo de Adviento', color: 'morado' };
    if (d >= new Date(y, 11, 25) || d <= bautismoDelSenor(y)) return { clave: 'navidad', nombre: 'Tiempo de Navidad', color: 'blanco' };
    if (d >= ceniza && d < ramos) return { clave: 'cuaresma', nombre: 'Tiempo de Cuaresma', color: 'morado' };
    if (d >= ramos && d < p) return { clave: 'santa', nombre: 'Semana Santa', color: 'rojo' };
    if (d >= p && d <= pentecostes) return { clave: 'pascua', nombre: 'Tiempo de Pascua', color: 'blanco' };
    return { clave: 'ordinario', nombre: 'Tiempo Ordinario', color: 'verde' };
  }

  function misteriosDelDia(fecha) {
    const dow = fecha.getDay();
    const tl = tiempoLiturgico(fecha);
    let set = POR_DIA[dow], nota = '';
    if (ajustes.liturgico && dow === 0) {
      if (tl.clave === 'adviento' || tl.clave === 'navidad') { set = 'gozosos'; nota = 'En los domingos de Adviento y Navidad se sugieren los Misterios Gozosos.'; }
      else if (tl.clave === 'cuaresma' || tl.clave === 'santa') { set = 'dolorosos'; nota = 'En los domingos de Cuaresma se sugieren los Misterios Dolorosos.'; }
    }
    return { set, nota, tl };
  }

  /* =========================================================
     Construcción de la secuencia de pasos
     ========================================================= */
  function construirPasos(set) {
    const P = [];
    const M = MISTERIOS[set];
    const add = (o) => P.push(o);

    // --- Inicio ---
    const ini = (activo) => ({ tipo: 'inicio', activo });
    add({ id: 'i-senal', sec: 'Inicio del Rosario', oras: ['senal'], cuentas: ini(0) });
    if (ajustes.ofrecimiento) {
      add({ id: 'i-contricion', sec: 'Inicio del Rosario', oras: ['contricion'], cuentas: ini(0) });
      add({ id: 'i-ofrecimiento', sec: 'Inicio del Rosario', oras: ['ofrecimiento'], cuentas: ini(0) });
    }
    add({ id: 'i-credo', sec: 'Inicio del Rosario', oras: ['credo'], cuentas: ini(0) });
    add({ id: 'i-pn', sec: 'Inicio del Rosario', oras: ['padreNuestro'], cuentas: ini(1) });
    INTENCIONES_INICIALES.forEach((intencion, i) => {
      add({ id: 'i-ave' + i, sec: 'Inicio del Rosario', kicker: intencion, oras: ['aveMaria'], contador: [i + 1, 3], cuentas: ini(2 + i) });
    });
    add({ id: 'i-gloria', sec: 'Inicio del Rosario', oras: ['gloria'], cuentas: ini(5), siguiente: 'Primer misterio' });

    // --- Misterios ---
    M.lista.forEach((mis, n) => {
      const sec = `${ORDINALES[n]} misterio ${SINGULAR[set].toLowerCase()}`;
      const dec = (activo) => ({ tipo: 'decena', activo, n });
      add({ id: `m${n}-anuncio`, sec, tipo: 'anuncio', n, mis, cuentas: dec(-1), inicioMisterio: n });
      add({ id: `m${n}-pn`, sec, oras: ['padreNuestro'], cuentas: dec(0) });
      for (let a = 0; a < 10; a++) {
        add({ id: `m${n}-ave${a}`, sec, oras: ['aveMaria'], contador: [a + 1, 10], cuentas: dec(1 + a) });
      }
      const ult = n === 4;
      const sigTxt = ult ? 'Oraciones finales' : `${ORDINALES[n + 1]} misterio`;
      add({ id: `m${n}-gloria`, sec, oras: ['gloria'], cuentas: dec(11), finMisterio: true, siguiente: ajustes.jaculatorias ? 'Siguiente' : sigTxt });
      if (ajustes.jaculatorias) {
        add({ id: `m${n}-jac`, sec, titulo: 'Jaculatorias', oras: ['jaculatoriaMaria', 'jaculatoriaFatima'], cuentas: dec(11), siguiente: sigTxt });
      }
    });

    // --- Final ---
    const fin = { tipo: 'final' };
    const papa = 'Por las intenciones del Santo Padre';
    add({ id: 'f-papa-pn', sec: 'Oraciones finales', kicker: papa, oras: ['padreNuestro'], cuentas: fin });
    add({ id: 'f-papa-ave', sec: 'Oraciones finales', kicker: papa, oras: ['aveMaria'], cuentas: fin });
    add({ id: 'f-papa-gloria', sec: 'Oraciones finales', kicker: papa, oras: ['gloria'], cuentas: fin });
    add({ id: 'f-salve', sec: 'Oraciones finales', oras: ajustes.letanias ? ['salve'] : ['salve', 'ruega'], cuentas: fin });
    if (ajustes.letanias) {
      LETANIAS.forEach((parte, i) => add({ id: 'f-let' + i, sec: 'Letanías Lauretanas', tipo: 'letania', parte, i, cuentas: fin }));
      add({ id: 'f-oremos-let', sec: 'Letanías Lauretanas', titulo: 'Oremos', oras: ['ruega', 'oremosLetanias'], cuentas: fin });
    }
    add({ id: 'f-conclusiva', sec: 'Oraciones finales', oras: ['oracionFinal'], cuentas: fin });
    add({ id: 'f-amparo', sec: 'Oraciones finales', oras: ['bajoTuAmparo'], cuentas: fin });
    const adv = ajustes.advocacion === 'ambas' ? ['chaguaya', 'copacabana'] : (ADVOCACIONES[ajustes.advocacion] ? [ajustes.advocacion] : []);
    adv.forEach((k) => add({ id: 'f-adv-' + k, sec: 'Oraciones finales', tipo: 'advocacion', adv: ADVOCACIONES[k], cuentas: fin }));
    add({ id: 'f-senal', sec: 'Oraciones finales', oras: ['senalFinal'], cuentas: fin, siguiente: 'Terminar' });
    add({ id: 'fin', sec: 'Santo Rosario', tipo: 'fin', cuentas: { tipo: 'final', completo: true } });
    return P;
  }

  /* =========================================================
     Renderizado de un paso
     ========================================================= */
  function bloques(clave) {
    const o = ORACIONES[clave];
    const grupal = ajustes.modo === 'grupal';
    let h = '';
    if (!grupal) {
      const txt = [o.guia, o.todos].filter(Boolean).join(' ');
      h += `<div class="bloque bloque-solo">${esc(txt)}</div>`;
    } else {
      if (o.guia) h += `<div class="bloque bloque-guia"><div class="bloque-etiqueta">${ICO.guia}Guía</div>${esc(o.guia)}</div>`;
      if (o.todos) h += `<div class="bloque bloque-todos"><div class="bloque-etiqueta">${ICO.todos}Todos</div>${esc(o.todos)}</div>`;
    }
    if (o.nota) h += `<p class="nota">${esc(o.nota)}</p>`;
    return h;
  }

  function htmlPaso(p) {
    const tipo = p.tipo || 'oracion';
    if (tipo === 'anuncio') {
      const m = p.mis;
      let h = `<div class="anuncio">
        <p class="paso-kicker">${esc(p.sec)}</p>
        <div class="anuncio-numero" style="margin-top:12px">${p.n + 1}</div>
        <h2 class="paso-titulo">${esc(m.titulo)}</h2>`;
      if (ajustes.modo === 'grupal') h += `<p class="paso-contador">El guía anuncia el misterio</p>`;
      if (ajustes.lecturas) {
        h += `<section class="lectura" aria-label="Lectura bíblica">
            <p class="lectura-cita">${ICO.libro}${esc(m.cita)}</p>
            <p class="lectura-texto">${esc(m.lectura)}</p>
          </section>
          <div class="fruto">
            <div class="fruto-item">${ICO.fruto}<div><small>Fruto del misterio</small><p>${esc(m.fruto)}</p></div></div>
            <div class="fruto-item">${ICO.luz}<div><small>Para meditar</small><p>${esc(m.meditacion)}</p></div></div>
          </div>`;
      }
      return h + '</div>';
    }
    if (tipo === 'letania') {
      const L = p.parte;
      let h = `<p class="paso-kicker">Oraciones finales · ${L.parte} de V</p><h2 class="paso-titulo">${esc(L.titulo)}</h2>`;
      h += '<div class="letanias">';
      if (L.respuesta) {
        h += `<div class="letanias-resp"><small>${ajustes.modo === 'grupal' ? 'Todos responden' : 'Respuesta'}</small>${esc(L.respuesta)}</div>`;
        h += `<ul class="${L.items.length > 14 ? 'dos' : ''}">` + L.items.map((t) => `<li>${esc(t)}${(L.nuevas || []).includes(t) ? '<span class="nueva">2020</span>' : ''}</li>`).join('') + '</ul>';
      } else {
        h += '<ul>' + L.items.map(([v, r]) => `<li>${esc(v)}<span class="r">${esc(r)}</span></li>`).join('') + '</ul>';
      }
      return h + '</div>';
    }
    if (tipo === 'advocacion') {
      return `<p class="paso-kicker">${esc(p.adv.subtitulo)}</p><h2 class="paso-titulo">${esc(p.adv.titulo)}</h2>
        <div class="bloque ${ajustes.modo === 'grupal' ? 'bloque-todos' : 'bloque-solo'}">${ajustes.modo === 'grupal' ? `<div class="bloque-etiqueta">${ICO.todos}Todos</div>` : ''}${esc(p.adv.todos)}</div>`;
    }
    if (tipo === 'fin') {
      return `<div class="final">
        <img src="img/escudo.png" alt="" width="110" height="148">
        <p class="paso-kicker">Misterios ${esc(MISTERIOS[estado.set].nombre)}</p>
        <h2 class="paso-titulo">Has rezado el Santo Rosario</h2>
        <p>Que la Virgen María te acompañe y te lleve siempre a su Hijo Jesús.</p>
        <p class="cita">«Hagan todo lo que él les diga» (Jn 2, 5)</p>
      </div>`;
    }
    // oración
    const titulo = p.titulo || ORACIONES[p.oras[0]].titulo;
    let h = `<p class="paso-kicker">${esc(p.kicker || p.sec)}</p><h2 class="paso-titulo">${esc(titulo)}</h2>`;
    if (p.contador) h += `<p class="paso-contador"><b>${p.contador[0]}</b> de ${p.contador[1]}</p>`;
    p.oras.forEach((k, i) => {
      if (i > 0 && ORACIONES[k].titulo && ORACIONES[k].titulo !== titulo) h += `<h3 class="paso-titulo" style="font-size:1.25em;margin-top:22px">${esc(ORACIONES[k].titulo)}</h3>`;
      h += bloques(k);
    });
    return h;
  }

  function htmlCuentas(c) {
    if (!c) return '';
    const cls = (i, act) => (i < act ? ' hecha' : i === act ? ' actual' : '');
    if (c.tipo === 'inicio') {
      let h = `<span class="${'cuenta-cruz' + cls(0, c.activo)}" style="display:inline-flex">${ICO.cruz}</span><span class="sep"></span>`;
      h += `<span class="cuenta grande${cls(1, c.activo)}"></span><span class="sep"></span>`;
      for (let i = 0; i < 3; i++) h += `<span class="cuenta${cls(2 + i, c.activo)}"></span>`;
      return h;
    }
    if (c.tipo === 'decena') {
      let h = `<span class="cuenta grande${cls(0, c.activo)}"></span><span class="sep"></span>`;
      for (let i = 1; i <= 10; i++) h += `<span class="cuenta${cls(i, c.activo)}"></span>`;
      return h;
    }
    let h = '';
    for (let i = 0; i < 5; i++) h += '<span class="cuenta grande hecha"></span>';
    return h;
  }

  function mostrarPaso(foco) {
    const p = estado.pasos[estado.idx];
    const total = estado.pasos.length - 1;
    $('#paso').innerHTML = htmlPaso(p);
    $('#cuentas').innerHTML = htmlCuentas(p.cuentas);
    $('#barra-seccion').textContent = p.sec;
    $('#barra-sub').textContent = `Misterios ${MISTERIOS[estado.set].nombre}` + (ajustes.modo === 'grupal' ? ' · En grupo' : ' · Personal');
    const pct = Math.round((estado.idx / total) * 100);
    $('#progreso-barra').style.width = pct + '%';
    $('#progreso').setAttribute('aria-valuenow', pct);
    $('#btn-atras').disabled = estado.idx === 0;
    $('#txt-siguiente').textContent = p.tipo === 'fin' ? 'Volver al inicio' : (p.siguiente || 'Siguiente');
    if (foco !== false) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    guardarProgreso();
  }

  function marcasProgreso() {
    const total = estado.pasos.length - 1;
    $('#progreso-marcas').innerHTML = estado.pasos
      .map((p, i) => (p.inicioMisterio !== undefined || p.id === 'f-papa-pn') ? `<i style="left:${(i / total) * 100}%"></i>` : '')
      .join('');
  }

  /* =========================================================
     Navegación
     ========================================================= */
  function siguiente() {
    const p = estado.pasos[estado.idx];
    if (p.tipo === 'fin') { borrar(CLAVE_PROGRESO); irInicio(); return; }
    if (p.finMisterio && ajustes.vibrar && navigator.vibrate) navigator.vibrate(60);
    if (estado.idx < estado.pasos.length - 1) { estado.idx++; mostrarPaso(); }
  }
  function anterior() {
    if (estado.idx > 0) { estado.idx--; mostrarPaso(); }
  }

  function comenzar(set, idx = 0) {
    estado.set = set;
    estado.pasos = construirPasos(set);
    estado.idx = Math.min(idx, estado.pasos.length - 1);
    estado.enRezo = true;
    $('#vista-inicio').hidden = true;
    $('#vista-rezo').hidden = false;
    marcasProgreso();
    mostrarPaso();
    if (history.state?.vista !== 'rezo') history.pushState({ vista: 'rezo' }, '');
    activarPantalla();
    $('#rezo-cuerpo').focus({ preventScroll: true });
  }

  function irInicio(desdeHistorial) {
    estado.enRezo = false;
    $('#vista-rezo').hidden = true;
    $('#vista-inicio').hidden = false;
    document.body.classList.remove('proyeccion');
    $('#btn-proyeccion').setAttribute('aria-pressed', 'false');
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    liberarPantalla();
    pintarInicio();
    if (!desdeHistorial && history.state?.vista === 'rezo') history.back();
    window.scrollTo(0, 0);
  }

  function reconstruir() { // tras cambiar ajustes durante el rezo
    if (!estado.enRezo) return;
    const idActual = estado.pasos[estado.idx].id;
    estado.pasos = construirPasos(estado.set);
    let i = estado.pasos.findIndex((p) => p.id === idActual);
    if (i < 0) i = Math.min(estado.idx, estado.pasos.length - 1);
    estado.idx = i;
    marcasProgreso();
    mostrarPaso(false);
  }

  /* ---------- Progreso guardado ---------- */
  function guardarProgreso() {
    const p = estado.pasos[estado.idx];
    if (p.tipo === 'fin') { borrar(CLAVE_PROGRESO); return; }
    guardar(CLAVE_PROGRESO, { set: estado.set, id: p.id, idx: estado.idx, ts: Date.now() });
  }
  function progresoGuardado() {
    const g = leer(CLAVE_PROGRESO, null);
    if (!g || !MISTERIOS[g.set]) return null;
    if (Date.now() - g.ts > 12 * 3600 * 1000) { borrar(CLAVE_PROGRESO); return null; }
    if (g.idx === 0) return null;
    return g;
  }

  /* =========================================================
     Pantalla de inicio
     ========================================================= */
  function pintarInicio() {
    const hoy = new Date();
    const { set, nota, tl } = misteriosDelDia(hoy);
    if (!estado.setElegido) estado.set = set;
    const elegido = estado.setElegido || set;
    const M = MISTERIOS[elegido];

    const fecha = new Intl.DateTimeFormat('es-BO', { weekday: 'long', day: 'numeric', month: 'long' }).format(hoy);
    $('#hoy-fecha').textContent = fecha.charAt(0).toUpperCase() + fecha.slice(1);
    const t = $('#hoy-tiempo'); t.textContent = tl.nombre; t.dataset.color = tl.color;
    $('#hoy-nombre').textContent = M.nombre;
    const n = $('#hoy-nota');
    if (estado.setElegido && estado.setElegido !== set) { n.textContent = `Hoy corresponden los Misterios ${MISTERIOS[set].nombre}; elegiste otros.`; n.hidden = false; }
    else if (nota) { n.textContent = nota; n.hidden = false; }
    else n.hidden = true;
    $('#hoy-lista').innerHTML = M.lista.map((m) => `<li>${esc(m.titulo)}</li>`).join('');

    $('#chips-misterios').innerHTML = Object.keys(MISTERIOS).map((k) =>
      `<button type="button" class="chip" role="radio" aria-checked="${k === elegido}" data-set="${k}"><strong>${MISTERIOS[k].nombre}</strong><small>${MISTERIOS[k].dias}${k === set ? ' · hoy' : ''}</small></button>`
    ).join('');

    $$('[data-modo]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.modo === ajustes.modo)));
    $('#ayuda-modo').textContent = ajustes.modo === 'grupal'
      ? 'El guía lee la primera parte y todos responden la segunda.'
      : 'Verás cada oración completa, para rezar a tu ritmo.';

    const g = progresoGuardado();
    const bc = $('#btn-continuar');
    if (g) {
      const pasos = construirPasos(g.set);
      const p = pasos.find((x) => x.id === g.id) || pasos[Math.min(g.idx, pasos.length - 1)];
      $('#continuar-detalle').textContent = `Misterios ${MISTERIOS[g.set].nombre} · ${p.sec}`;
      bc.hidden = false;
    } else bc.hidden = true;
  }

  /* =========================================================
     Ajustes
     ========================================================= */
  function aplicarTema() {
    if (ajustes.tema === 'auto') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = ajustes.tema;
    const oscuro = ajustes.tema === 'dark' || (ajustes.tema === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
    $('meta[name="theme-color"]').setAttribute('content', oscuro ? '#071B30' : '#0D4275');
  }
  function aplicarEscala() {
    document.documentElement.style.setProperty('--escala', ajustes.escala);
    $('#letra-valor').textContent = Math.round(ajustes.escala * 100) + '%';
  }
  function guardarAjustes() { guardar(CLAVE_AJUSTES, ajustes); }

  function pintarAjustes() {
    $$('[data-ajuste]').forEach((el) => {
      const k = el.dataset.ajuste;
      if (el.type === 'checkbox') el.checked = !!ajustes[k];
      else el.value = ajustes[k];
    });
    $$('[data-tema]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.tema === ajustes.tema)));
    aplicarEscala();
  }

  /* ---------- Pantalla encendida ---------- */
  async function activarPantalla() {
    if (!ajustes.pantalla || !('wakeLock' in navigator) || estado.wakeLock) return;
    try {
      estado.wakeLock = await navigator.wakeLock.request('screen');
      estado.wakeLock.addEventListener('release', () => { estado.wakeLock = null; });
    } catch (e) { /* no disponible */ }
  }
  function liberarPantalla() {
    if (estado.wakeLock) { estado.wakeLock.release().catch(() => {}); estado.wakeLock = null; }
  }

  /* ---------- Avisos ---------- */
  let tAviso;
  function aviso(txt) {
    const a = $('#aviso'); a.textContent = txt; a.hidden = false;
    clearTimeout(tAviso); tAviso = setTimeout(() => { a.hidden = true; }, 3200);
  }

  /* =========================================================
     Eventos
     ========================================================= */
  function eventos() {
    $('#btn-comenzar').addEventListener('click', () => { borrar(CLAVE_PROGRESO); comenzar(estado.setElegido || estado.set); });
    $('#btn-continuar').addEventListener('click', () => {
      const g = progresoGuardado(); if (!g) return;
      const pasos = construirPasos(g.set);
      let i = pasos.findIndex((p) => p.id === g.id); if (i < 0) i = g.idx;
      comenzar(g.set, i);
    });
    $('#btn-siguiente').addEventListener('click', siguiente);
    $('#btn-atras').addEventListener('click', anterior);
    $('#btn-salir').addEventListener('click', () => irInicio());

    $$('[data-modo]').forEach((b) => b.addEventListener('click', () => {
      ajustes.modo = b.dataset.modo; guardarAjustes(); pintarInicio();
    }));
    $('#chips-misterios').addEventListener('click', (e) => {
      const b = e.target.closest('[data-set]'); if (!b) return;
      estado.setElegido = b.dataset.set; pintarInicio();
    });

    // Diálogos
    $$('[data-abrir]').forEach((b) => b.addEventListener('click', () => {
      const d = $('#dlg-' + b.dataset.abrir);
      if (b.dataset.abrir === 'ajustes') pintarAjustes();
      d.showModal();
    }));
    $$('dialog').forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));
    $('#dlg-ajustes').addEventListener('close', () => { pintarInicio(); reconstruir(); });

    $$('[data-ajuste]').forEach((el) => el.addEventListener('change', () => {
      const k = el.dataset.ajuste;
      ajustes[k] = el.type === 'checkbox' ? el.checked : el.value;
      guardarAjustes();
      if (k === 'pantalla') { ajustes.pantalla && estado.enRezo ? activarPantalla() : liberarPantalla(); }
      if (k === 'liturgico') estado.setElegido = null;
    }));
    $$('[data-tema]').forEach((b) => b.addEventListener('click', () => {
      ajustes.tema = b.dataset.tema; guardarAjustes(); aplicarTema(); pintarAjustes();
    }));
    $('#letra-menos').addEventListener('click', () => { ajustes.escala = Math.max(0.85, +(ajustes.escala - 0.1).toFixed(2)); aplicarEscala(); guardarAjustes(); });
    $('#letra-mas').addEventListener('click', () => { ajustes.escala = Math.min(1.75, +(ajustes.escala + 0.1).toFixed(2)); aplicarEscala(); guardarAjustes(); });
    matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', aplicarTema);

    // Proyección
    $('#btn-proyeccion').addEventListener('click', () => {
      const on = !document.body.classList.contains('proyeccion');
      document.body.classList.toggle('proyeccion', on);
      $('#btn-proyeccion').setAttribute('aria-pressed', String(on));
      if (on) document.documentElement.requestFullscreen?.().catch(() => {});
      else if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    });

    // Teclado (incluye presentadores inalámbricos: PageDown/PageUp)
    document.addEventListener('keydown', (e) => {
      if (!estado.enRezo || $('dialog[open]')) return;
      if (e.target.closest('input, select, textarea')) return;
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        if (e.key === 'Enter' && e.target.closest('button')) return;
        e.preventDefault(); siguiente();
      } else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) {
        e.preventDefault(); anterior();
      } else if (e.key === 'Escape') { irInicio(); }
    });

    // Deslizar
    let x0 = null, y0 = null;
    const cuerpo = $('#rezo-cuerpo');
    cuerpo.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    cuerpo.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? siguiente : anterior)();
      x0 = null;
    }, { passive: true });

    // Botón «atrás» del sistema
    window.addEventListener('popstate', () => { if (estado.enRezo) irInicio(true); });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && estado.enRezo) activarPantalla();
    });

    // Compartir
    $('#btn-compartir').addEventListener('click', async () => {
      const datos = { title: 'Santo Rosario · UCB', text: 'Reza el Santo Rosario con la comunidad de la Universidad Católica Boliviana.', url: location.href.split('#')[0] };
      if (navigator.share) { try { await navigator.share(datos); } catch (e) {} return; }
      try { await navigator.clipboard.writeText(datos.url); aviso('Enlace copiado'); } catch (e) { aviso(datos.url); }
    });

    // Instalación
    let promptInstalar = null;
    const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    const esIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); promptInstalar = e; $('#btn-instalar').hidden = false; });
    if (esIOS && !standalone) $('#btn-instalar').hidden = false;
    $('#btn-instalar').addEventListener('click', async () => {
      if (promptInstalar) {
        promptInstalar.prompt();
        const r = await promptInstalar.userChoice;
        if (r.outcome === 'accepted') $('#btn-instalar').hidden = true;
        promptInstalar = null;
      } else {
        aviso('En Safari: toca Compartir y luego «Agregar a pantalla de inicio»');
      }
    });
    window.addEventListener('appinstalled', () => { $('#btn-instalar').hidden = true; aviso('¡Aplicación instalada!'); });
  }

  /* ---------- Service worker ---------- */
  function registrarSW() {
    if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then((reg) => {
        reg.addEventListener('updatefound', () => {
          const nuevo = reg.installing;
          nuevo?.addEventListener('statechange', () => {
            if (nuevo.state === 'activated' && !navigator.serviceWorker.controller) aviso('Lista para usar sin conexión');
          });
        });
      }).catch(() => {});
    });
  }

  /* ---------- Inicio ---------- */
  $('#version').textContent = VERSION;
  aplicarTema();
  aplicarEscala();
  eventos();
  pintarInicio();
  registrarSW();
  history.replaceState({ vista: 'inicio' }, '');

  // Exponer para pruebas
  window.__rosario = { construirPasos, tiempoLiturgico, misteriosDelDia, estado };
})();
