#!/bin/bash

# Exit on error
set -e

echo "Starting custom deployment script..."

# Navigate to the project directory
cd /home/site/wwwroot

# Install dependencies if node_modules is missing or package.json changed
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
    echo "Running npm install..."
    npm install --production
else
    echo "node_modules is up to date."
fi

echo "Deployment script completed. The App Service will start the application via 'npm start'."