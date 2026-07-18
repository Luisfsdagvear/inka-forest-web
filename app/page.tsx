'use client';

import { FormEvent, useState } from 'react';

const benefits = [
  ['01', 'Alimentos milenarios', 'Utilizados durante miles de años por los pueblos indígenas para cuidar la mente y el cuerpo.'],
  ['02', 'Ricos en antioxidantes', 'Refuerzan el sistema inmune y ayudan a proteger el organismo cada día.'],
  ['03', 'Fitonutrientes esenciales', 'Contribuyen a la eliminación natural de toxinas y desechos del organismo.'],
  ['04', 'Base de una vida sana', 'Una fuente natural de vitaminas, minerales y nutrientes esenciales.'],
];

const products = [
  { name: 'Barra Camu Camu', type: 'Antioxidante natural', color: '#8f2134' },
  { name: 'Barra Cacao Nativo', type: 'Energía ancestral', color: '#6e3f26' },
  { name: 'Barra Aguaymanto', type: 'Vitalidad andina', color: '#c77b14' },
];

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="Inka Forest, inicio">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
      <span>INKA<br /><b>FOREST</b></span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [registered, setRegistered] = useState(false);

  function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegistered(true);
  }

  return (
    <main>
      <header className="site-header">
        <Brand />
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú" aria-expanded={menuOpen}><span /><span /><span /></button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Navegación principal">
          <a className="active" href="#home" onClick={() => setMenuOpen(false)}>HOME</a>
          <a href="#productos" onClick={() => setMenuOpen(false)}>PRODUCTOS</a>
          <a href="#recetas" onClick={() => setMenuOpen(false)}>RECETAS</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>CONTACTO</a>
        </nav>
        <div className="header-actions">
          <label className="search"><input aria-label="Buscar" placeholder="Buscar" /><span className="search-icon" aria-hidden="true" /></label>
          <button className="icon-button cart" aria-label={`${cartCount} productos en el carrito`}><span className="cart-icon" aria-hidden="true"><i /><b /></span><small>{cartCount}</small></button>
          <button className="account" onClick={() => setAccountOpen(true)} aria-label="Abrir mi cuenta"><span /><i /></button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="kicker">ALIMENTOS QUE INSPIRAN</p>
            <h1>Biodiversidad<br />y sabiduría de<br /><span>nuestros ancestros</span></h1>
            <p>La riqueza de nuestra tierra y las técnicas ancestrales se encuentran para crear alimentos sagrados que impulsan tu vida.</p>
            <div className="hero-cta"><a className="gold-button" href="#productos">DESCUBRE EL ORIGEN <i>↗</i></a><span>Hecho en Perú<br />con propósito</span></div>
            <div className="hero-proof"><span><b>100%</b> ingredientes naturales</span><span><b>4</b> certificaciones</span><span><b>+12</b> superalimentos</span></div>
          </div>
          <div className="hero-image">
            <div className="image-frame"><img src="/hero-camu.png" alt="Barra de cereales de camu camu sostenida por una mano" /></div>
            <div className="pack-label"><Brand /><small>CAMU · CAMU</small><em>Alimenta tu impulso</em></div>
            <div className="origin-stamp"><b>ORIGEN</b><span>AMAZONÍA<br />PERUANA</span></div>
          </div>
        </div>
      </section>

      <section className="certifications">
        <div className="section-container">
          <div className="section-heading"><p className="kicker dark">CALIDAD QUE SE DEMUESTRA</p><h2>CERTIFICACIONES</h2></div>
          <p><b>Nos comprometemos contigo porque tu bienestar es nuestra prioridad.</b><br />Contamos con certificaciones de buenas prácticas de manufactura y seguridad alimentaria.</p>
          <div className="cert-grid">
            <div><span className="jas">JAS</span><small>Certificación Orgánica<br />para Japón</small></div>
            <div><span>NSF</span><small>Certificación Orgánica<br />para EE.UU.</small></div>
            <div><span className="usda">USDA<em>ORGANIC</em></span><small>Análisis y puntos<br />críticos de control</small></div>
            <div><span className="eu"><i />EU</span><small>Certificación Orgánica<br />para Europa</small></div>
          </div>
        </div>
      </section>

      <section className="ancestral" id="recetas">
        <div className="section-container ancestral-grid">
          <div className="athlete"><img src="/athlete-ancestral.png" alt="Atleta bebiendo una bebida ancestral" /><div className="athlete-caption"><b>ENERGÍA LIMPIA</b><span>de origen peruano</span></div></div>
          <div className="ancestral-copy">
            <p className="kicker">SABIDURÍA QUE NUTRE</p>
            <h2>ALIMENTACIÓN<br />ANCESTRAL</h2>
            <div className="benefit-grid">{benefits.map(([number,title,copy]) => <article key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
          </div>
        </div>
      </section>

      <section className="community">
        <div className="section-container">
          <div className="community-heading"><div><p className="kicker dark">NUESTRA COMUNIDAD</p><h2>PERSONAS REALES.<br />IMPULSOS REALES.</h2></div><p>Una comunidad que elige sentirse bien sin desconectarse de sus raíces.</p></div>
          <div className="community-stage">
            <img src="/community-editorial.png" alt="Amigos compartiendo barras de superalimentos después de entrenar" />
            <div className="photo-tag"><span>INKA PEOPLE</span><b>Lima, Perú</b></div>
            <blockquote><span>“</span>Ingredientes honestos, sabor increíble y una historia que sí quiero compartir.<footer>Andrea V. · Comunidad Inka</footer></blockquote>
          </div>
          <div className="community-notes"><p><b>01</b> Energía para moverte</p><p><b>02</b> Ingredientes que reconoces</p><p><b>03</b> Un origen que importa</p></div>
        </div>
      </section>

      <section className="products" id="productos">
        <div className="section-container">
          <div className="products-heading"><div><p className="kicker">NUESTROS FAVORITOS</p><h2>ELIGE TU IMPULSO</h2></div><p>Superalimentos peruanos en una barra práctica, deliciosa y naturalmente poderosa.</p></div>
          <div className="product-grid">{products.map((product, index) => <article key={product.name}><div className="product-index">0{index + 1}</div><div className="product-pack" style={{background: product.color}}><div className="pack-shine" /><Brand /><span>SUPERFOOD BAR</span><div className="grain"><i /><i /><i /></div></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.type}</p></div><button onClick={() => setCartCount(cartCount + 1)} aria-label={`Agregar ${product.name}`}>+</button></div></article>)}</div>
        </div>
      </section>

      <footer id="contacto"><div className="section-container footer-grid"><Brand /><p>Alimentos milenarios que impulsan<br />una nueva forma de vivir.</p><div><b>ESCRÍBENOS</b><a href="mailto:hola@inkaforest.pe">hola@inkaforest.pe</a><span>Lima, Perú</span></div><div><b>SÍGUENOS</b><a href="#home">Instagram</a><a href="#home">Facebook</a></div></div><div className="footer-bottom">© 2026 INKA FOREST <span>HECHO CON RAÍCES PERUANAS</span></div></footer>

      {accountOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setAccountOpen(false)}><div className="account-modal" role="dialog" aria-modal="true" aria-label="Cuenta" onMouseDown={(e) => e.stopPropagation()}><button className="close" onClick={() => setAccountOpen(false)} aria-label="Cerrar">×</button><Brand />{registered ? <div className="registered"><span>✓</span><h2>¡BIENVENIDO!</h2><p>Tu cuenta ha sido registrada correctamente.</p></div> : <><p className="kicker">ÚNETE A LA COMUNIDAD</p><h2>REGÍSTRATE</h2><form onSubmit={register}><label>NOMBRE<input required /></label><label>APELLIDO<input required /></label><label>CORREO ELECTRÓNICO<input type="email" required /></label><div className="form-row"><label>TIPO<select><option>DNI</option><option>CE</option></select></label><label>DOCUMENTO DE IDENTIDAD<input required /></label></div><label>CONTRASEÑA<input type="password" required /></label><button className="gold-button" type="submit">CREAR CUENTA <i>↗</i></button></form></>}</div></div>}
    </main>
  );
}
