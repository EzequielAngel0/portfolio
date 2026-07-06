# Verificacion aislada del sitio con Podman (Node 24 LTS, igual que CI y deploy).
# Construye, type-checkea y sirve el sitio sin usar el Node del equipo local.
# Debian slim (no Alpine) por compatibilidad con sharp (astro:assets, fases futuras).
FROM docker.io/library/node:24-slim

WORKDIR /app

# Dependencias con la lockfile: instalacion reproducible, identica al CI.
COPY package.json package-lock.json ./
RUN npm ci

# Resto del proyecto (respeta .containerignore).
COPY . .

# Gate de verificacion: si el type-check o el build fallan, la imagen no se construye.
RUN npm run check && npm run build

EXPOSE 4321
# Sirve el build final; --host lo expone fuera del contenedor.
CMD ["npx", "astro", "preview", "--host", "--port", "4321"]
