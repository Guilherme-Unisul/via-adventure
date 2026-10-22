# Via Adventure no Railway: servidor + site em um só arquivo, sem instalar nada.
FROM node:22-alpine
WORKDIR /srv
COPY server.mjs ./server.mjs
COPY index.html ./public/index.html
# DATA_DIR = onde ficam mapa, mesas, playlists etc. (monte um volume do Railway em /data)
ENV NODE_ENV=production STATIC_DIR=/srv/public DATA_DIR=/data
CMD ["node", "server.mjs"]
