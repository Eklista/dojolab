#!/bin/bash

set -e  # Detiene el script si ocurre un error

echo "🚀 Iniciando despliegue de TheDojoLab..."

# Ruta del proyecto
PROJECT_DIR="/opt/dojolab"
FRONTEND_DIR="$PROJECT_DIR/frontend-dojolab"
DEPLOY_DIR="/var/www/thedojolab.com"

# Ir al proyecto raíz donde está el git
cd "$PROJECT_DIR"

echo "📥 Haciendo git pull..."
git pull

echo "📦 Instalando dependencias..."
cd "$FRONTEND_DIR"
npm install

echo "🏗️ Generando build con Vite..."
npm run build

echo "📁 Copiando build al directorio de producción..."
mkdir -p "$DEPLOY_DIR"
rm -rf "$DEPLOY_DIR"/*
cp -r dist/* "$DEPLOY_DIR"

echo "🔐 Ajustando permisos..."
chown -R www-data:www-data "$DEPLOY_DIR"
chmod -R 755 "$DEPLOY_DIR"

echo "🔁 Recargando Nginx..."
nginx -t && systemctl reload nginx

echo "✅ ¡Despliegue exitoso! Visita https://thedojolab.com"
