# Portafolio Cybersecurity - Alejandro Daniel Villarreal Soto

## 📋 Descripción

Portafolio profesional de cybersecurity y network defense, diseñado como una página única con navegación fija. Incluye proyectos de seguridad perimetral, SIEM/SOAR, compliance PCI DSS, y Zero Trust Network Access.

## 🚀 Características

- **Single Page Application**: Navegación fluida con anclas y componentes modulares
- **Responsive Design**: Optimizado para desktop, tablet y móvil
- **Navegación Fija**: 7 secciones principales con estado activo
- **Diagramas Técnicos**: Arquitecturas SVG escalables para cada proyecto
- **Compliance Focus**: Mapeo detallado con ISO 27001, PCI DSS, DORA, NIS2
- **Performance Optimizado**: CSS modular, JavaScript organizado, lazy loading
- **Buenas Prácticas**: Separación de responsabilidades, código mantenible

## 📁 Estructura del Proyecto (Modular)

```
Portafolio/
├── index.html                      # Página principal (estructura)
├── assets/
│   ├── css/                        # Estilos organizados
│   │   ├── variables.css           # Sistema de diseño y variables
│   │   ├── base.css               # Reset y estilos base
│   │   ├── components.css         # Componentes reutilizables
│   │   ├── layout.css             # Layout y secciones
│   │   └── responsive.css         # Media queries
│   ├── js/                        # JavaScript modular
│   │   ├── config.js              # Configuración y datos
│   │   ├── utils.js               # Funciones helper
│   │   ├── components.js          # Generación de componentes
│   │   ├── navigation.js          # Navegación y scroll
│   │   ├── sections.js            # Gestión de secciones
│   │   └── main.js                # Punto de entrada
│   └── images/                    # Recursos gráficos
│       ├── favicon.svg
│       ├── perimeter-sdwan-diagram.svg
│       ├── siem-soar-diagram.svg
│       ├── pci-hardening-diagram.svg
│       └── ztna-sase-diagram.svg
├── README.md                       # Documentación
└── pdf-summary-template.txt        # Plantilla para PDF
```

## � Arquitectura del Código

### CSS Modular

- **variables.css**: Sistema de diseño centralizado (colores, tipografía, espaciado)
- **base.css**: Reset moderno y estilos fundamentales
- **components.css**: Botones, cards, badges y componentes reutilizables
- **layout.css**: Header, secciones, footer y estructura principal
- **responsive.css**: Breakpoints y adaptaciones mobile-first

### JavaScript Organizado

- **config.js**: Configuración, datos de proyectos y constantes
- **utils.js**: Funciones helper y utilidades
- **components.js**: Generación dinámica de HTML
- **navigation.js**: Manejo de navegación y scroll
- **sections.js**: Carga de contenido y animaciones
- **main.js**: Inicialización y coordinación general

### Beneficios de esta Arquitectura

✅ **Mantenibilidad**: Cada archivo tiene una responsabilidad clara  
✅ **Escalabilidad**: Fácil agregar nuevos componentes o secciones  
✅ **Performance**: Carga optimizada y código organizado  
✅ **Debugging**: Errores fáciles de localizar por módulo  
✅ **Colaboración**: Múltiples desarrolladores pueden trabajar sin conflictos

## 🛠️ Instalación y Configuración

### Opción 1: GitHub Pages (Recomendada)

```bash
# Crear repo: alejandro-cyber-portfolio
git init
git add .
git commit -m "Initial portfolio setup"
git branch -M main
git remote add origin https://github.com/tu-usuario/alejandro-cyber-portfolio.git
git push -u origin main
```

2. **Configurar GitHub Pages:**

   - Ve a Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: main / root
   - Guarda los cambios

3. **Dominio personalizado (opcional):**
   - Compra dominio: `alejandro-villarreal.dev`
   - En Settings → Pages → Custom domain
   - Agrega tu dominio y habilita "Enforce HTTPS"

### Opción 2: Netlify/Vercel

1. **Netlify:**

   ```bash
   # Instalar Netlify CLI
   npm install -g netlify-cli

   # Desplegar
   netlify deploy --prod --dir .
   ```

2. **Vercel:**

   ```bash
   # Instalar Vercel CLI
   npm install -g vercel

   # Desplegar
   vercel --prod
   ```

## � Desarrollo y Personalización

### Agregar Nuevo Proyecto

1. **Edita `assets/js/config.js`** - Agrega el objeto del proyecto a `PROJECTS_DATA`
2. **Crea el diagrama SVG** - Guárdalo en `assets/images/`
3. **El resto es automático** - Los componentes se generan dinámicamente

### Modificar Estilos

- **Colores**: Edita variables en `assets/css/variables.css`
- **Componentes**: Modifica clases en `assets/css/components.css`
- **Layout**: Ajusta estructura en `assets/css/layout.css`

### Personalizar Datos

- **Información personal**: `CONFIG.site` en `config.js`
- **Navegación**: `CONFIG.navigation` en `config.js`
- **Proyectos**: Array `PROJECTS_DATA` en `config.js`
- **Skills**: Array `SKILLS_DATA` en `config.js`

## 📧 Personalización Rápida

### Información de Contacto

Actualiza la configuración en `assets/js/config.js`:

```javascript
// Línea ~7-12
site: {
  name: 'Tu Nombre Completo',
  title: 'Tu Título Profesional',
  email: 'tu-email@dominio.com',
  linkedin: 'https://linkedin.com/in/tu-linkedin',
  github: 'https://github.com/tu-usuario'
}
```

### PDF Resume

1. Crea un PDF de 1 página con resumen de proyectos y KPIs
2. Guárdalo como `assets/alejandro-portfolio-summary.pdf`
3. El enlace ya está configurado en el HTML

## 🎨 Personalización Visual

### Colores

Los colores principales están definidos en `assets/style.css`:

```css
:root {
  --primary-blue: #1e40af;
  --secondary-cyan: #06b6d4;
  --success-green: #10b981;
  --warning-orange: #f59e0b;
  --danger-red: #ef4444;
}
```

### Tipografía

Actualmente usa Inter de Google Fonts. Para cambiar:

```html
<!-- En <head> -->
<link
  href="https://fonts.googleapis.com/css2?family=TU-FUENTE:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

```css
/* En style.css */
body {
  font-family: "TU-FUENTE", sans-serif;
}
```

## 📊 Contenido Recomendado

### Sección Projects

**Cantidad ideal:** 4-5 proyectos máximo

**Estructura por proyecto:**

- Título (qué + para qué)
- Problem statement (1 línea)
- Diagrama de arquitectura (16:9)
- Steps (5-8 bullets)
- KPIs (3 métricas con números)
- Compliance mapping (5-8 controles)
- Mejoras futuras (2 bullets)

### Sección Runbooks

**Cantidad:** 2-3 procedimientos operativos

**Formato:**

- Título con tiempo estimado
- Pasos numerados (8-10 máximo)
- Responsables y tiempos por paso
- Orientado a SOC/NOC

### Sección Skills

**Top 10 skills ordenados por relevancia:**

1. Firewall Administration
2. SD-WAN
3. SSL/TLS Inspection
4. IPS/IDS
5. Incident Response
6. Troubleshooting
7. SIEM/SOAR
8. BGP/OSPF
9. Zero Trust
10. Compliance frameworks

## 🔒 Seguridad y Buenas Prácticas

### Información Sensible

❌ **NUNCA incluyas:**

- Credenciales reales
- IPs públicas reales
- Nombres de clientes
- Configuraciones específicas

✅ **Usa siempre:**

- Rangos de ejemplo (192.168.x.x, 10.x.x.x)
- Nombres genéricos ("Company ABC")
- Datos anonimizados

### Performance

- Imágenes < 200KB cuando sea posible
- SVG para diagramas (escalable y ligero)
- Lazy loading implementado
- CSS optimizado para Core Web Vitals

## 📱 Responsive Breakpoints

```css
/* Mobile: hasta 480px */
@media (max-width: 480px) /* Tablet: 481px - 768px */ @media (max-width: 768px); /* Desktop: 769px+ */
/* Estilos base */
```

## 🚀 Features Avanzadas

### Analytics (opcional)

Agregar Google Analytics 4:

```html
<!-- En <head> -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### Contact Form con Backend

Para formulario funcional, usar:

- **Netlify Forms** (si usas Netlify)
- **Formspree** (service gratuito)
- **EmailJS** (JavaScript client-side)

## 📄 Contenido para LinkedIn Featured

1. **Link al sitio web**
2. **PDF resume 1-página**
3. **1 runbook como PDF** (el mejor)

## 🔧 Troubleshooting

### Problemas Comunes

**Imágenes no cargan:**

- Verifica rutas en `assets/`
- Comprueba nombres de archivos
- Revisa permisos del servidor

**Navegación no funciona:**

- Verifica IDs de secciones
- Comprueba JavaScript errors en console
- Confirma que `script.js` se carga

**Estilos rotos:**

- Verifica ruta de `style.css`
- Comprueba sintaxis CSS
- Revisa imports de Google Fonts

## 📞 Soporte

Para issues o mejoras, crear issue en el repositorio o contactar directamente.

---

**Alejandro Daniel Villarreal Soto**  
Computer Systems Engineering Student  
Cybersecurity & Network Defense Specialist
