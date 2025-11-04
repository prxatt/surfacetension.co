#!/bin/bash

# Simple HTTP server startup script for surfacetension.co
# Usage: ./start-server.sh [port]

PORT=${1:-4000}
DIR="$(cd "$(dirname "$0")" && pwd)"

# Check if port is in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "Port $PORT is already in use."
    echo "Killing existing process..."
    lsof -ti :$PORT | xargs kill -9 2>/dev/null
    sleep 1
    echo "Port $PORT freed."
fi

echo "Starting HTTP server on port $PORT..."
echo "Serving directory: $DIR"
echo ""
echo "Open in browser:"
echo "  http://localhost:$PORT/index.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd "$DIR"
python3 -m http.server "$PORT" --bind 127.0.0.1

