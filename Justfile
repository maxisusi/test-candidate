# Available commands: just start | just stop | just restart

# Start both frontend and backend
start:
    @echo "Starting Symfony backend on :8000 and React frontend on :3000..."
    php -S 0.0.0.0:8000 -t {{justfile_directory()}}/backend/public > /tmp/symfony.log 2>&1 &
    npm start --prefix {{justfile_directory()}}

# Stop both frontend and backend
stop:
    @echo "Stopping all services..."
    -fuser -k 8000/tcp
    -fuser -k 3000/tcp

# Restart both frontend and backend
restart: stop start

