Here's a complete guide to deploy your React app to Firebase Hosting:

## **1. Prerequisites**

### **Install Required Tools**
```bash
# Install Node.js (if not already)
node --version

# Install Firebase CLI globally
npm install -g firebase-tools

# Check installation
firebase --version
```

## **2. Prepare Your React App**

### **Build for Production**
```bash
# For Create React App (CRA)
npm run build

# For Vite
npm run build

# For Next.js (static export)
npm run build  # then next export (if static)
```

This creates a `build/` (CRA) or `dist/` (Vite) folder.

## **3. Firebase Setup - Step by Step**

### **Step 1: Login to Firebase**
```bash
firebase login
```
- Opens browser for authentication
- Select your Google account

### **Step 2: Initialize Firebase in Your Project**
```bash
cd your-react-project
firebase init
```

**Select these options:**
```
? Which Firebase features do you want to set up?
◉ Hosting: Configure files for Firebase Hosting

? Select a default Firebase project
❯ [Create a new project]  # or select existing

? What do you want to use as your public directory? (public)
build  # For CRA, type "build"
       # For Vite, type "dist"
       # For Next.js static, type "out"

? Configure as a single-page app (rewrite all urls to /index.html)? 
Yes  # Important for React Router

? Set up automatic builds and deploys with GitHub? 
No  # Can set up later

? File build/index.html already exists. Overwrite? 
No  # Keep your React build files
```

### **Step 3: Configure firebase.json**
Check your `firebase.json`:
```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## **4. Deploy to Firebase**

### **Basic Deployment**
```bash
# Build your React app first
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

### **Deploy with Specific Project**
```bash
# List your projects
firebase projects:list

# Deploy to specific project
firebase deploy --only hosting --project your-project-id
```

## **5. Advanced Configuration**

### **Custom Domain Setup**
After initial deploy:
```bash
# Add custom domain
firebase hosting:sites:create your-custom-domain

# Or in Firebase Console:
1. Go to Hosting → Add custom domain
2. Verify domain ownership
3. Update DNS records
```

### **Multiple Environments**
```json
// firebase.json with multiple targets
{
  "hosting": [
    {
      "target": "production",
      "public": "build",
      "rewrites": [...]
    },
    {
      "target": "staging",
      "public": "build-staging",
      "rewrites": [...]
    }
  ]
}
```

Setup targets:
```bash
# Add targets
firebase target:apply hosting production your-project-id
firebase target:apply hosting staging your-staging-project-id

# Deploy specific target
firebase deploy --only hosting:production
```

## **6. Environment Variables Setup**

### **Create .env.production**
```env
REACT_APP_API_URL=https://your-api.com
REACT_APP_FIREBASE_API_KEY=your-key
```

### **Build with Production Variables**
```bash
# For CRA (automatically uses .env.production)
npm run build

# For custom build
REACT_APP_API_URL=https://api.com npm run build
```

### **Firebase Functions for API Proxy (Optional)**
If you need backend API:
```javascript
// functions/index.js
const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  res.json({ message: 'From Firebase Function' });
});

exports.api = functions.https.onRequest(app);
```

Deploy functions:
```bash
firebase deploy --only functions
```

## **7. CI/CD Pipeline Setup**

### **GitHub Actions (.github/workflows/firebase.yml)**
```yaml
name: Deploy to Firebase
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          REACT_APP_API_KEY: ${{ secrets.REACT_APP_API_KEY }}
          
      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

## **8. Firebase Hosting Features**

### **Redirects & Rewrites**
```json
{
  "hosting": {
    "public": "build",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "redirects": [
      {
        "source": "/old-page",
        "destination": "/new-page",
        "type": 301
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### **Custom 404 Page**
```json
{
  "hosting": {
    "public": "build",
    "cleanUrls": true,
    "trailingSlash": false,
    "appAssociation": "AUTO",
    "i18n": {
      "root": "/"
    }
  }
}
```

Then create `public/404.html` (for CRA, copy from `build/index.html`).

## **9. Troubleshooting**

### **Common Errors & Solutions**

**Error: "Build folder not found"**
```bash
# Make sure you built the app
npm run build

# Check firebase.json "public" directory
# CRA: "build", Vite: "dist", Next.js: "out"
```

**Error: "Page reload shows 404" (React Router)**
```json
// Ensure this rewrite rule exists
"rewrites": [
  {
    "source": "**",
    "destination": "/index.html"
  }
]
```

**Error: "Firebase login expired"**
```bash
firebase logout
firebase login
```

**Error: "CORS issues with API"**
```javascript
// In firebase.json headers
"headers": [
  {
    "source": "**",
    "headers": [
      {
        "key": "Access-Control-Allow-Origin",
        "value": "*"
      }
    ]
  }
]
```

### **Check Deployment Status**
```bash
# View deployment history
firebase hosting:channel:list

# View specific deployment
firebase hosting:channel:open --channel live

# Rollback to previous version
firebase hosting:rollback VERSION_ID
```

## **10. Complete Deployment Script**

Create `deploy.sh`:
```bash
#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Firebase deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build with production env
echo "🏗️  Building React app..."
npm run build

# Run tests (optional)
echo "🧪 Running tests..."
npm test -- --watchAll=false

# Deploy to Firebase
echo "🚀 Deploying to Firebase..."
firebase deploy --only hosting

echo "✅ Deployment complete!"
echo "🌐 Your app is live at: https://your-project-id.web.app"
```

Make executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

## **11. Post-Deployment Checklist**

### **Verify Deployment:**
1. Visit `https://your-project-id.web.app`
2. Check console for errors
3. Test all routes (React Router)
4. Verify API calls work
5. Check mobile responsiveness

### **Performance Optimization:**
```bash
# Analyze bundle size
npm run build -- --stats

# Or use webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer
```

### **Enable Analytics:**
```javascript
// In src/index.js or App.js
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // ... other config
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

## **12. Quick Reference Commands**

```bash
# Complete workflow
npm run build
firebase deploy

# Partial deployments
firebase deploy --only hosting      # Only hosting
firebase deploy --only functions    # Only functions
firebase deploy --only firestore    # Only Firestore rules

# Manage deployments
firebase deploy --project project-id  # Specific project
firebase hosting:disable              # Take site offline
firebase hosting:channel:create dev   # Create preview channel

# Monitoring
firebase hosting:channel:list         # List all deployments
firebase open hosting:site            # Open in browser
```

## **13. Free Tier Limits**

Firebase Hosting free tier includes:
- **10GB** storage
- **360MB/day** bandwidth
- **Custom domains** (free)
- **SSL certificates** (auto-renewed)
- **Global CDN**

## **14. Example Project Structure**
```
my-react-app/
├── public/
│   └── index.html
├── src/
│   └── App.js
├── build/                    # Production build
├── firebase.json            # Firebase config
├── .firebaserc              # Project aliases
├── .env.production          # Production env vars
└── package.json
```

## **15. Quick Start Template**

```bash
# One-liner deployment
npx create-react-app my-app && cd my-app && npm run build && firebase init && firebase deploy

# Or step by step
npx create-react-app my-app
cd my-app
npm run build
firebase login
firebase init
  # Select: Hosting
  # Public directory: build
  # Single-page app: Yes
firebase deploy
```

Your app will be live at: `https://your-project-id.web.app`

**Pro Tip:** Use `firebase hosting:channel:create preview` for staging/preview deployments before going to production!