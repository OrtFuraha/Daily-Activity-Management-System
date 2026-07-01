#!/bin/bash
echo "🚀 Deploying Kicukiro District Activity Management System..."
echo "📋 Make sure all files are up to date"

# Copy all files to the deployment location
# Update this path to your deployment location
DEPLOY_PATH="/var/www/kicukiro-system"

if [ -d "$DEPLOY_PATH" ]; then
    echo "📁 Copying files to $DEPLOY_PATH"
    cp -r * "$DEPLOY_PATH/"
    cd "$DEPLOY_PATH"
    npm install
    echo "✅ Deployment complete!"
    echo "🔄 Restart the server with: pm2 restart kicukiro-system"
else
    echo "⚠️ Deployment path not found. Please set DEPLOY_PATH in deploy.sh"
fi
