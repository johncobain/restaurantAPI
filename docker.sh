#!/bin/bash

# Script para gerenciar a aplicação Docker

# Detecta se deve usar docker-compose ou docker compose
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    echo "❌ Docker Compose não encontrado!"
    echo "Instale o Docker e Docker Compose primeiro."
    exit 1
fi

case "$1" in
  "up")
    echo "🚀 Iniciando a aplicação..."
    $DOCKER_COMPOSE up --build
    ;;
  "up-d")
    echo "🚀 Iniciando a aplicação em background..."
    $DOCKER_COMPOSE up --build -d
    ;;
  "down")
    echo "🛑 Parando a aplicação..."
    $DOCKER_COMPOSE down
    ;;
  "restart")
    echo "🔄 Reiniciando a aplicação..."
    $DOCKER_COMPOSE down
    $DOCKER_COMPOSE up --build -d
    ;;
  "logs")
    echo "📋 Mostrando logs..."
    $DOCKER_COMPOSE logs -f restaurant-api
    ;;
  "db-logs")
    echo "📋 Mostrando logs do banco..."
    $DOCKER_COMPOSE logs -f postgres
    ;;
  "clean")
    echo "🧹 Limpando containers e volumes..."
    $DOCKER_COMPOSE down -v
    docker system prune -f
    ;;
  "shell")
    echo "🐚 Abrindo shell no container da API..."
    $DOCKER_COMPOSE exec restaurant-api /bin/sh
    ;;
  "db-shell")
    echo "🐚 Abrindo shell no PostgreSQL..."
    $DOCKER_COMPOSE exec postgres psql -U postgres -d restaurant_api
    ;;
  "status")
    echo "📊 Status dos containers..."
    $DOCKER_COMPOSE ps
    ;;
  "health")
    echo "🏥 Verificando saúde da aplicação..."
    curl -f http://localhost:3000/health || echo "❌ API não está respondendo"
    ;;
  "build")
    echo "🔨 Construindo imagens..."
    $DOCKER_COMPOSE build --no-cache
    ;;
  *)
    echo "Uso: $0 {up|up-d|down|restart|logs|db-logs|clean|shell|db-shell|status|health|build}"
    echo ""
    echo "Comandos disponíveis:"
    echo "  up       - Inicia a aplicação (foreground)"
    echo "  up-d     - Inicia a aplicação (background)"
    echo "  down     - Para a aplicação"
    echo "  restart  - Reinicia a aplicação"
    echo "  logs     - Mostra logs da API"
    echo "  db-logs  - Mostra logs do banco"
    echo "  clean    - Remove containers e volumes"
    echo "  shell    - Acessa shell do container da API"
    echo "  db-shell - Acessa shell do PostgreSQL"
    echo "  status   - Mostra status dos containers"
    echo "  health   - Verifica saúde da aplicação"
    echo "  build    - Reconstrói as imagens"
    exit 1
    ;;
esac
