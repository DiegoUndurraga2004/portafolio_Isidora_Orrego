'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Grid2X2, ListFilter, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';

type StyleCard = {
  id: string; index: string; name: string; family: string; mood: string; description: string;
  fonts: [string, string]; colors: string[]; colorNames: string[]; grid: string; imagery: string;
  rhythm: string; motion: string; ideal: string; tags: string[]; image: string; visual: string; typeStyle: string;
};

const styles: StyleCard[] = [
  { id:'atelier-monocromo', index:'01', name:'Atelier Monocromo', family:'Editorial', mood:'Lujo silencioso', description:'Fotografía a gran escala, márgenes generosos y una voz tipográfica contenida.', fonts:['Cormorant Garamond','DM Sans'], colors:['#11110f','#f2eee5','#a9a59c','#d9472f'], colorNames:['Tinta','Marfil','Humo','Bermellón'], grid:'12 columnas · márgenes amplios · quiebres puntuales', imagery:'Retrato editorial, luz lateral dura y fondos sin ruido.', rhythm:'Pausado, vertical y contemplativo.', motion:'Fundidos largos y escala sutil.', ideal:'Alta costura, sastrería y colecciones de autor.', tags:['Sobrio','Imagen final','Mínimo'], image:'/editorial/cobalt-atelier.png', visual:'visual-atelier', typeStyle:'type-serif' },
  { id:'revista-90', index:'02', name:'Revista 90', family:'Editorial', mood:'Gráfica & directa', description:'Titulares compactos, recortes radicales y una retícula que recuerda una revista independiente.', fonts:['Arial Black','IBM Plex Mono'], colors:['#f5f1e8','#111111','#ef3b2d','#2456e8'], colorNames:['Papel','Negro','Rojo','Azul tinta'], grid:'6 columnas · módulos asimétricos · captions laterales', imagery:'Flash frontal, recortes cercanos y grano de imprenta.', rhythm:'Denso, sincopado y enérgico.', motion:'Entradas rápidas, marquesina y cortes secos.', ideal:'Dirección creativa, campañas y editoriales.', tags:['Crudo','Narrativa','Maximalista'], image:'/editorial/crimson-process.png', visual:'visual-magazine', typeStyle:'type-grotesk' },
  { id:'nouvelle-vague', index:'03', name:'Nouvelle Vague', family:'Editorial', mood:'Cine íntimo', description:'Una narración por capítulos donde la imagen respira y cada crédito importa.', fonts:['Bodoni Moda','Work Sans'], colors:['#e8dfcf','#601b28','#131b31','#8e795f'], colorNames:['Crema','Borgoña','Noche','Sepia'], grid:'8 columnas · panorámicas · texto fuera de eje', imagery:'Fotogramas, grano analógico y encuadres ambientales.', rhythm:'Lento, secuencial y cinematográfico.', motion:'Scroll por capítulos y fundidos a negro.', ideal:'Fashion films y storytelling de colección.', tags:['Romántico','Narrativa','Medio'], image:'/editorial/cobalt-atelier.png', visual:'visual-cinema', typeStyle:'type-bodoni' },
  { id:'studio-grid', index:'04', name:'Studio Grid', family:'Sistema', mood:'Precisa & neutral', description:'Una grilla clara y profesional para ordenar una obra diversa sin restarle carácter.', fonts:['Helvetica Neue','Source Serif 4'], colors:['#ffffff','#161616','#d9d9d4','#1647ff'], colorNames:['Óptico','Grafito','Niebla','Cobalto'], grid:'12 columnas suizas · baseline visible · índice fijo', imagery:'Color preciso, fondos neutros y encuadre documental.', rhythm:'Regular, modular y eficiente.', motion:'Transiciones lineales de 180 ms.', ideal:'Portafolios multidisciplinares y postulaciones.', tags:['Sobrio','Proceso','Medio'], image:'/editorial/crimson-process.png', visual:'visual-grid', typeStyle:'type-sans' },
  { id:'lookbook-lumiere', index:'05', name:'Lookbook Lumière', family:'Sistema', mood:'Ligera & luminosa', description:'Un catálogo visual de lectura inmediata, pensado para series consistentes y detalles de prenda.', fonts:['Playfair Display','DM Sans'], colors:['#fffdf7','#d7c9b6','#c6a15b','#24211e'], colorNames:['Leche','Arena','Champagne','Carbón'], grid:'4 columnas · mosaico variable · ficha desplegable', imagery:'Luz difusa, cuerpo completo y detalles limpios.', rhythm:'Aireado, uniforme y suave.', motion:'Zoom delicado y cambio de vista.', ideal:'Lookbooks, styling y colecciones comerciales.', tags:['Clásico','Producto','Mínimo'], image:'/editorial/cobalt-atelier.png', visual:'visual-lumiere', typeStyle:'type-bodoni' },
  { id:'runway-pulse', index:'06', name:'Runway Pulse', family:'Sistema', mood:'Nocturna & cinética', description:'Un recorrido horizontal con pulso de pasarela, contraste de flash y tipografía en movimiento.', fonts:['Space Grotesk','Instrument Serif'], colors:['#080808','#dedede','#ff2e93','#f5f5f2'], colorNames:['Backstage','Plata','Flash','Blanco'], grid:'Carril horizontal · hero 16:9 · timeline inferior', imagery:'Movimiento, contraluz y reflejos de pasarela.', rhythm:'Rápido, inmersivo y continuo.', motion:'Carrusel libre y numeración progresiva.', ideal:'Desfiles, performance y producción de moda.', tags:['Dramático','Imagen final','Medio'], image:'/editorial/chrome-motion.png', visual:'visual-runway', typeStyle:'type-space' },
  { id:'neo-chrome', index:'07', name:'Neo—Chrome', family:'Experimental', mood:'Digital & reflectante', description:'Capas translúcidas y superficies metálicas para proyectos que miran hacia adelante.', fonts:['Syne','Space Mono'], colors:['#0a0a0c','#c8ccd0','#7736ff','#40e7ff'], colorNames:['Vacío','Cromo','UV','Cian'], grid:'Capas flotantes · paneles superpuestos · eje libre', imagery:'CGI, macrotexturas y luz especular.', rhythm:'Fragmentado, profundo y reactivo.', motion:'Parallax corto y refracción al cursor.', ideal:'Moda digital, wearables y diseño especulativo.', tags:['Futurista','Investigación','Maximalista'], image:'/editorial/chrome-motion.png', visual:'visual-chrome', typeStyle:'type-space' },
  { id:'anti-fashion-xerox', index:'08', name:'Anti-Fashion Xerox', family:'Experimental', mood:'DIY & punk', description:'Una composición deliberadamente imperfecta: fotocopia, cinta, anotaciones y contraste áspero.', fonts:['Arial Narrow','Courier Prime'], colors:['#e9e4d8','#0d0d0d','#b9ff00','#e23b2d'], colorNames:['Papel viejo','Tóner','Ácido','Señal'], grid:'Collage libre · rotación leve · bloques fuera de margen', imagery:'Alto contraste, trama xerox y crops abruptos.', rhythm:'Irregular, urgente y táctil.', motion:'Saltos mínimos y hover tipo pegatina.', ideal:'Upcycling, streetwear y proyectos contraculturales.', tags:['Crudo','Narrativa','Maximalista'], image:'/editorial/crimson-process.png', visual:'visual-xerox', typeStyle:'type-mono' },
  { id:'color-block-lab', index:'09', name:'Color Block Lab', family:'Experimental', mood:'Lúdica & conceptual', description:'El color organiza la información y convierte cada proyecto en una escena gráfica distinta.', fonts:['Unbounded','Manrope'], colors:['#ff5538','#ffd20a','#3557ff','#f5a8d8'], colorNames:['Naranja','Solar','Ultramar','Rosa'], grid:'Paneles variables · 5 columnas · encastre geométrico', imagery:'Fondos saturados, sombra corta y pose gráfica.', rhythm:'Enérgico, modular y juguetón.', motion:'Bloques que encajan y wipes de color.', ideal:'Vestuario escénico y proyectos conceptuales.', tags:['Lúdico','Imagen final','Maximalista'], image:'/editorial/cobalt-atelier.png', visual:'visual-color', typeStyle:'type-grotesk' },
  { id:'archivo-glitch', index:'10', name:'Archivo Glitch', family:'Experimental', mood:'Tecno—nostalgia', description:'Una interfaz de archivo recuperado donde el proceso, los metadatos y las versiones son protagonistas.', fonts:['IBM Plex Mono','Inter Tight'], colors:['#b8beb5','#151716','#adff2f','#3155ff'], colorNames:['CRT','Terminal','Fósforo','Sistema'], grid:'Ventanas · tabla de archivos · panel inspector', imagery:'Compresión visible, scanner y capturas de proceso.', rhythm:'Denso, navegable y técnico.', motion:'Ventanas apilables y cursores de sistema.', ideal:'Investigación digital e identidad virtual.', tags:['Futurista','Proceso','Maximalista'], image:'/editorial/chrome-motion.png', visual:'visual-glitch', typeStyle:'type-mono' },
  { id:'tierra-fibra', index:'11', name:'Tierra & Fibra', family:'Material', mood:'Táctil & serena', description:'Un recorrido cercano a las manos, las fibras y las pequeñas decisiones del proceso.', fonts:['Fraunces','Nunito Sans'], colors:['#a44f32','#e4dccb','#596348','#382d26'], colorNames:['Arcilla','Lino','Musgo','Cacao'], grid:'8 columnas · macros a sangre · diario de proceso', imagery:'Luz natural, manos, fibra y materia sin retoque excesivo.', rhythm:'Pausado, cálido y envolvente.', motion:'Revelados orgánicos y scroll suave.', ideal:'Textil artesanal, tintes naturales y sostenibilidad.', tags:['Orgánico','Proceso','Medio'], image:'/editorial/crimson-process.png', visual:'visual-earth', typeStyle:'type-serif' },
  { id:'herbario-textil', index:'12', name:'Herbario Textil', family:'Material', mood:'Poética & botánica', description:'Cada muestra se presenta como un espécimen: observada, catalogada y puesta en contexto.', fonts:['EB Garamond','Karla'], colors:['#ede8d8','#78856b','#a98ead','#513d32'], colorNames:['Papel','Salvia','Lavanda','Tinta'], grid:'Fichas de espécimen · índice alfabético · notas al margen', imagery:'Planta, bordado y muestras vistas desde arriba.', rhythm:'Metódico, delicado y episódico.', motion:'Capas de anotación y ampliación óptica.', ideal:'Biomateriales, estampados e investigación de fibras.', tags:['Romántico','Investigación','Medio'], image:'/editorial/crimson-process.png', visual:'visual-herbarium', typeStyle:'type-serif' },
  { id:'patron-abierto', index:'13', name:'Patrón Abierto', family:'Material', mood:'Técnica & humana', description:'Moldes, pruebas y correcciones conviven para revelar cómo evoluciona una prenda.', fonts:['IBM Plex Sans Condensed','Spectral'], colors:['#184fa1','#eee8db','#e04435','#777b7d'], colorNames:['Azul patrón','Crudo','Lápiz','Mesa'], grid:'Capas técnicas · comparador antes/después · notas laterales', imagery:'Mesa de trabajo, toile, costuras y marcas de prueba.', rhythm:'Analítico, progresivo y claro.', motion:'Superposición de capas y slider comparativo.', ideal:'Patronaje, moulage y desarrollo de producto.', tags:['Técnico','Proceso','Medio'], image:'/editorial/crimson-process.png', visual:'visual-pattern', typeStyle:'type-sans' },
  { id:'archivo-patrimonial', index:'14', name:'Archivo Patrimonial', family:'Narrativa', mood:'Museográfica & rigurosa', description:'Una arquitectura contemplativa para vincular objeto, procedencia, tiempo y memoria.', fonts:['Libre Baskerville','Public Sans'], colors:['#e7dec9','#174d54','#9f854c','#292725'], colorNames:['Pergamino','Petróleo','Oro','Carbón'], grid:'Cronología · ficha catalográfica · imagen ampliable', imagery:'Registro frontal, archivo y detalles con escala.', rhythm:'Solemne, longitudinal y preciso.', motion:'Zoom de inspección y navegación temporal.', ideal:'Historia del vestir, conservación y memoria textil.', tags:['Clásico','Investigación','Mínimo'], image:'/editorial/cobalt-atelier.png', visual:'visual-archive', typeStyle:'type-serif' },
  { id:'diario-vestuario', index:'15', name:'Diario de Vestuario', family:'Narrativa', mood:'Íntima & espontánea', description:'Instantáneas, notas y bocetos construyen una voz personal sin perder dirección visual.', fonts:['Caveat','Sora'], colors:['#d8a7b1','#f1dc8d','#4c6d8f','#253146'], colorNames:['Rosa polvo','Mantequilla','Denim','Tinta'], grid:'Timeline irregular · entradas fechadas · imágenes mixtas', imagery:'Instantánea, escáner de cuaderno y autorretrato casual.', rhythm:'Cercano, acumulativo y libre.', motion:'Páginas que se apilan y notas emergentes.', ideal:'Marca personal y evolución creativa.', tags:['Romántico','Narrativa','Maximalista'], image:'/editorial/cobalt-atelier.png', visual:'visual-diary', typeStyle:'type-hand' },
];

const filters = ['Todos','Editorial','Sistema','Experimental','Material','Narrativa'];

function PortfolioPreview({ item, detail = false }: { item: StyleCard; detail?: boolean }) {
  return <div className={`portfolio-preview ${item.visual} ${detail ? 'is-detail' : ''}`}>
    <img src={item.image} alt="" /><div className="preview-no">{item.index}</div>
    <div className={`preview-title ${item.typeStyle}`}>{item.name}</div><div className="preview-meta">PORTFOLIO / 2026</div>
    <div className="preview-rule" /><div className="preview-caption">Forma · Materia · Movimiento</div>
  </div>;
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<StyleCard | null>(null);
  const detailScrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (selected && detailScrollRef.current) {
      detailScrollRef.current.scrollTop = 0;
    }
  }, [selected?.id]);
  const visibleStyles = useMemo(() => styles.filter((item) => {
    const needle = query.trim().toLowerCase();
    return (activeFilter === 'Todos' || item.family === activeFilter) && (!needle || [item.name,item.family,item.mood,...item.tags].join(' ').toLowerCase().includes(needle));
  }), [activeFilter, query]);
  const moveSelection = (direction: number) => {
    if (!selected) return;
    const current = styles.findIndex((item) => item.id === selected.id);
    setSelected(styles[(current + direction + styles.length) % styles.length]);
  };

  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Ir al inicio"><span>AD</span><span>Archivo de estilo</span></a>
      <div className="header-note">Direcciones visuales<br/>para un portafolio de moda</div>
      <a className="index-link" href="#mis-portafolios">Mis portafolios <span>01</span></a>
    </header>
    <section className="intro" id="top">
      <p className="eyebrow">Colección de referencias / Vol. 01</p>
      <h1>Una estructura<br/>para cada <em>mirada.</em></h1>
      <div className="intro-aside"><p>Cada propuesta explora un sistema completo: tipografía, color, composición, imagen y ritmo.</p><a href="#archivo">Explorar las direcciones <ArrowRight size={16}/></a></div>
      <div className="intro-stamp" aria-hidden="true"><span>15</span> rutas visuales</div>
    </section>
    <section className="archive" id="archivo">
      <div className="filter-bar">
        <div className="filter-title"><ListFilter size={17}/> Filtrar por familia</div>
        <div className="filter-list" role="group" aria-label="Filtrar estilos por familia">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
        <label className="search-box"><Search size={16}/><span className="sr-only">Buscar estilos</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar estilo"/></label>
      </div>
      <div className="result-line"><span><Grid2X2 size={15}/> {visibleStyles.length.toString().padStart(2,'0')} direcciones</span><span>Selecciona una tarjeta para abrir su sistema</span></div>
      {visibleStyles.length ? <div className="style-grid">{visibleStyles.map((item) => <article className="style-card" key={item.id}><button onClick={() => setSelected(item)} aria-label={`Explorar ${item.name}`}><PortfolioPreview item={item}/><div className="card-copy"><div className="card-topline"><span>{item.index} / {item.family}</span><ArrowUpRight size={18}/></div><h2>{item.name}</h2><p>{item.mood}</p><div className="card-tags">{item.tags.slice(0,2).map((tag) => <span key={tag}>{tag}</span>)}</div></div></button></article>)}</div> : <div className="empty-state"><p>No encontramos esa combinación.</p><button onClick={() => { setQuery(''); setActiveFilter('Todos'); }}>Ver todas las direcciones</button></div>}
    </section>
    <section className="my-portfolios" id="mis-portafolios">
      <div className="my-portfolios-heading"><span>02 / Portafolios construidos</span><h2>Mis <em>portafolios</em></h2><p>Identidades aplicadas a un portafolio real, con proyectos y recorrido completo.</p></div>
      <a className="built-portfolio-card" href="/portafolios/mirar-distinto">
        <div className="built-card-art"><span>ISIDORA ORREGO</span><strong>MIRAR<br/>DISTINTO,</strong><i>diseñar con intención</i><b>IO</b></div>
        <div className="built-card-copy"><span>01 / Portafolio integral</span><h3>Mirar distinto</h3><p>Dirección de arte · Styling · Fotografía · Moda · Identidad visual · Experiencias</p><div>Entrar al portafolio <ArrowUpRight size={18}/></div></div>
      </a>
    </section>
    <footer><span>Archivo de estilo</span><p>Una herramienta para elegir la futura identidad del portafolio.</p><span>Edición 2026</span></footer>
    <Sheet open={Boolean(selected)} onOpenChange={(open) => { if (!open) setSelected(null); }}>
      {selected && <SheetContent className="detail-sheet" showCloseButton><div className="detail-scroll" ref={detailScrollRef}>
        <div className="detail-hero"><PortfolioPreview item={selected} detail/></div>
        <div className="detail-content">
          <div className="detail-kicker"><span>{selected.index}</span><span>{selected.family}</span><span>{selected.mood}</span></div>
          <SheetTitle className="detail-title">{selected.name}</SheetTitle><SheetDescription className="detail-description">{selected.description}</SheetDescription>
          <section className="detail-section"><p className="section-label">01 / Tipografía</p><div className={`type-specimen ${selected.typeStyle}`}><span>Aa</span><p>{selected.fonts[0]}</p></div><div className="font-pair"><span>Secundaria</span><strong>{selected.fonts[1]}</strong><p>La forma sigue a la materia. El detalle revela la intención.</p></div></section>
          <section className="detail-section"><p className="section-label">02 / Paleta</p><div className="palette">{selected.colors.map((color,i) => <div className="swatch" key={color}><span style={{backgroundColor:color}}/><small>{selected.colorNames[i]}<br/>{color}</small></div>)}</div></section>
          <section className="detail-section"><p className="section-label">03 / Composición</p><div className="layout-diagram" aria-hidden="true">{Array.from({length:12}).map((_,i) => <i key={i}/>)}<b/><b/><b/></div><div className="spec-row"><span>Grilla</span><p>{selected.grid}</p></div><div className="spec-row"><span>Ritmo</span><p>{selected.rhythm}</p></div></section>
          <section className="detail-section art-section"><p className="section-label">04 / Dirección de imagen</p><p>{selected.imagery}</p><div className="image-strip"><img src={selected.image} alt="Muestra de dirección fotográfica"/><img src={selected.image.includes('chrome') ? '/editorial/cobalt-atelier.png' : '/editorial/chrome-motion.png'} alt="Segunda muestra de dirección fotográfica"/></div></section>
          <section className="detail-section"><p className="section-label">05 / En contexto</p><div className="spec-row"><span>Movimiento</span><p>{selected.motion}</p></div><div className="spec-row"><span>Ideal para</span><p>{selected.ideal}</p></div><div className="why-box"><span>Por qué funciona</span><p>La dirección mantiene una regla visual reconocible y deja flexibilidad para que cada proyecto conserve su identidad.</p></div></section>
          <div className="detail-nav"><button onClick={() => moveSelection(-1)}><ArrowLeft size={18}/> Anterior</button><span>{selected.index} / 15</span><button onClick={() => moveSelection(1)}>Siguiente <ArrowRight size={18}/></button></div>
        </div></div></SheetContent>}
    </Sheet>
  </main>;
}
