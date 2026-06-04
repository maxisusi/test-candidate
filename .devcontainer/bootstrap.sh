#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

npm install

if [[ ! -f backend/.env ]]; then
  cp backend/.env.dev backend/.env
fi

if ! grep -q '^APP_ENV=' backend/.env; then
  echo 'APP_ENV=dev' >> backend/.env
fi

if ! grep -q '^DATABASE_URL=' backend/.env; then
  echo 'DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"' >> backend/.env
fi

if ! grep -q '^DEFAULT_URI=' backend/.env; then
  echo 'DEFAULT_URI=http://localhost:8000' >> backend/.env
fi

if ! grep -q '^CORS_ALLOW_ORIGIN=' backend/.env; then
  echo 'CORS_ALLOW_ORIGIN=^https?://(localhost|127\\.0\\.0\\.1)(:[0-9]+)?$' >> backend/.env
fi

cd backend
composer install --no-interaction --no-progress
php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration
php bin/console doctrine:fixtures:load --no-interaction
