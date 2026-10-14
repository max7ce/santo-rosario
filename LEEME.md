# Santo Rosario · UCB (PWA)

Aplicación web instalable para rezar el Santo Rosario en grupo o personalmente.
Funciona sin conexión una vez abierta, y en celulares, tabletas, computadoras y proyectores.

## Estructura

```
index.html              Página principal
manifest.webmanifest    Datos de instalación (nombre, íconos, colores)
sw.js                   Service worker (modo sin conexión)
css/app.css             Estilos y colores institucionales
js/contenido.js         TEXTOS: oraciones, lecturas, frutos, letanías, advocaciones
js/app.js               Lógica de la aplicación
img/                    Escudo y logotipo de la U.C.B.
icons/                  Íconos de la app
fonts/                  Tipografías libres (Source Serif 4 y Fira Sans, licencia OFL)
```

Para corregir o cambiar cualquier texto, edita solo `js/contenido.js`.

## Publicar en GitHub Pages (gratis)

1. Crea una cuenta en https://github.com (o usa la institucional).
2. Pulsa **New repository** y ponle un nombre, por ejemplo `santo-rosario`. Marca **Public** y crea el repositorio.
3. Pulsa **uploading an existing file** y arrastra **todo el contenido** de esta carpeta, sin la carpeta contenedora. `index.html` debe quedar en la raíz.
4. Pulsa **Commit changes**.
5. Ve a **Settings → Pages**. En *Source* elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
6. En uno o dos minutos la app estará en:
   `https://TU-USUARIO.github.io/santo-rosario/`

## Publicar en Netlify (gratis, más rápido)

1. Entra a https://app.netlify.com/drop.
2. Arrastra **esta carpeta completa** a la página.
3. Netlify te da una dirección (`https://nombre-al-azar.netlify.app`). Puedes cambiar el nombre en *Site configuration → Change site name*, por ejemplo `rosario-ucb-tarija`.

## Publicar actualizaciones

Cada vez que cambies algo:

1. Sube el número en `sw.js` → `const VERSION = 'rosario-ucb-v1.0.1';`.
2. Vuelve a subir los archivos.

Así, todos los celulares que ya tienen la app instalada descargan la nueva versión la siguiente vez que la abran con internet.

## Dominio propio (opcional)

Si el área de sistemas de la UCB puede crear un subdominio (por ejemplo `rosario.tja.ucb.edu.bo`), puede apuntarlo a GitHub Pages o a Netlify. Ambos servicios incluyen HTTPS gratuito, que es obligatorio para que la PWA se pueda instalar.

## Antes del lanzamiento oficial

- [ ] Revisión de textos por la Pastoral Universitaria o el capellán, sobre todo las lecturas, las meditaciones, el ofrecimiento y las oraciones a Chaguaya y Copacabana, que son redacciones propuestas.
- [ ] Confirmar la traducción bíblica de referencia y ajustar las citas si hace falta.
- [ ] Autorización de la Unidad de Comunicación para el uso del isologotipo, según el Manual de Identidad.
- [ ] Generar un código QR con la dirección final para afiches y pantallas.
