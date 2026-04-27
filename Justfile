# Available commands: just frontend | just backend | just dev | just stop-frontend | just stop-backend | just stop

# Start the React frontend (port 3000)
frontend:
    npm start --prefix {{justfile_directory()}}

# Start the Symfony backend (port 8000)
backend:
    php -S 0.0.0.0:8000 -t {{justfile_directory()}}/backend/public

# Start both frontend and backend concurrently
dev:
    @echo "Starting Symfony backend on :8000 and React frontend on :3000..."
    php -S 0.0.0.0:8000 -t {{justfile_directory()}}/backend/public > /tmp/symfony.log 2>&1 & \
    npm start --prefix {{justfile_directory()}}

# Stop the React frontend (kills process on port 3000)
stop-frontend:
    @echo "Stopping frontend..."
    -fuser -k 3000/tcp

# Stop the Symfony backend (kills process on port 8000)
stop-backend:
    @echo "Stopping backend..."
    -fuser -k 8000/tcp

# Stop both frontend and backend
stop: stop-backend stop-frontend
    @echo "All services stopped."
