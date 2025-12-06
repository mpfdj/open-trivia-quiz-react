https://github.com/drumnation/open-trivia-api-react-quiz.git
https://github.com/drumnation/open-trivia-api-react-quiz
https://www.w3schools.com/react/react_lifecycle.asp

npm install

# How to set build-env variables
https://stackoverflow.com/questions/42458434/how-to-set-build-env-variables-when-running-create-react-app-build-script
npm start       # Will set REACT_APP_NODE_ENV to development, and so it will automatically use the .env.development file
npm run build   # Sets REACT_APP_NODE_ENV to production, and so it will automatically use .env.production


# Create a Firebase project (mdj-opentrivia-app)
https://console.firebase.google.com/
https://console.firebase.google.com/project/mpf-opentrivia-app/overview
firebase projects:list


# Set up CLI
npm install -g firebase-tools  
firebase --version  
npm run build  


# Create firebase.json
firebase init  


# Build and deploy
npm run build  
firebase login  
firebase deploy --only hosting --project mpf-opentrivia-app  


# URL's
https://console.firebase.google.com/project/mpf-opentrivia-app/overview
https://mpf-opentrivia-app.web.app  
