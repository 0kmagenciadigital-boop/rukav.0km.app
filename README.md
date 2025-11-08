# Ruka Vegana Angol 🌱

Sitio web de comida rápida 100% vegana en Angol, Chile.

## Descripción

Aplicación web desarrollada con React + Vite que muestra el menú completo de Ruka Vegana, permitiendo a los clientes ver productos, agregar al carrito y realizar pedidos vía email.

## Características

- ✅ Menú interactivo con categorías (Hamburguesas, Wraps, Bowls, Bebidas, Postres)
- ✅ Carrito de compras funcional
- ✅ Sistema de pedidos por email
- ✅ Formulario de contacto
- ✅ Diseño responsive y moderno
- ✅ 100% vegano

## Tecnologías

- React 19
- Vite 7
- CSS inline (componentes estilizados)
- EmailJS para envío de pedidos

## Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (puerto 3000)
npm run dev

# Compilar para producción
npm run build

# Vista previa del build
npm run preview
```

## Deployment en Hostinger

### Opción 1: Subir archivos manualmente via FTP/SFTP

1. **Compilar el proyecto:**
   ```bash
   npm run build
   ```

2. **Conectar via FTP/SFTP a Hostinger:**
   - Host: Tu dominio o IP del servidor
   - Usuario: Tu usuario de Hostinger
   - Puerto: 21 (FTP) o 22 (SFTP)

3. **Subir archivos:**
   - Ir a la carpeta `public_html` (o la carpeta raíz de tu dominio)
   - Subir TODO el contenido de la carpeta `dist/` (no la carpeta dist en sí, sino su contenido)
   - Asegurarte de que `index.html` y la carpeta `assets/` estén en la raíz

4. **Verificar permisos:**
   - Todos los archivos deben tener permisos 644
   - Las carpetas deben tener permisos 755

### Opción 2: Usar Git en Hostinger

1. **Conectar por SSH a Hostinger**

2. **Clonar el repositorio:**
   ```bash
   cd public_html
   git clone https://github.com/0kmagenciadigital-boop/rukav.0km.app.git .
   ```

3. **Instalar dependencias y compilar:**
   ```bash
   npm install
   npm run build
   ```

4. **Mover archivos de dist a la raíz:**
   ```bash
   cp -r dist/* .
   ```

5. **Para actualizar el sitio:**
   ```bash
   git pull
   npm install
   npm run build
   cp -r dist/* .
   ```

### Opción 3: GitHub Actions (Automatizado)

Si quieres automatizar el deployment, configura GitHub Actions para que compile y despliegue automáticamente cuando hagas push.

## Estructura del Proyecto

```
rukav.0km.app/
├── public/
│   └── .htaccess          # Configuración Apache para SPA
├── src/
│   ├── assets/
│   │   └── logo.png       # Logo de Ruka Vegana
│   ├── App.jsx            # Componente principal
│   ├── App.css            # Estilos
│   ├── main.jsx           # Entry point
│   └── index.css          # Estilos globales
├── dist/                  # Build de producción (generado)
├── index.html             # HTML principal
├── vite.config.js         # Configuración Vite
├── vercel.json            # Config para Vercel
├── netlify.toml           # Config para Netlify
└── package.json
```

## Notas Importantes

- ⚠️ El archivo `.htaccess` en la carpeta `public/` es esencial para que funcionen las rutas en Apache/Hostinger
- ⚠️ Asegúrate de que el archivo `.htaccess` se copie correctamente al servidor
- ⚠️ Si no ves el sitio, verifica que todos los archivos de `dist/` estén en `public_html/`

## Soporte

Para consultas sobre el menú o pedidos:
- 📧 Email: contacto@rukav0km.app
- 📍 Ubicación: Angol, Chile

## Licencia

© 2025 Ruka Vegana Angol - Todos los derechos reservados
