# Local Server Setup

## Quick Start

The site is now running on **port 4000**.

### Access the site:
- **Main page**: http://localhost:4000/index.html
- **QR page**: http://localhost:4000/qr.html

## Starting the Server

### Option 1: Use the startup script
```bash
./start-server.sh [port]
```

Example:
```bash
./start-server.sh 4000
```

### Option 2: Manual Python server
```bash
cd /Users/prattmajmudar/Desktop/surfacetension.co
python3 -m http.server 4000 --bind 127.0.0.1
```

### Option 3: Use a different port
If port 4000 is busy, use any available port:
```bash
python3 -m http.server 8080 --bind 127.0.0.1
# Then visit: http://localhost:8080/index.html
```

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running, or:
```bash
# Find and kill the process
lsof -i :4000 | grep LISTEN | awk '{print $2}' | xargs kill
```

## Current Status

✅ Server is running on port 4000
✅ Site is accessible at http://localhost:4000/index.html

