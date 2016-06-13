# City of Lowell MIS Door

Install

    cd server
    npm install //this will take a while and will install the dependencies

Setup for Dev

    cd server
    npm install-dev

Build views - packages ui into public/main.js

    npm build

Run server

    cd server && npm start

With server running navigate to http://127.0.0.1:8000


<h2>Server</h2>
    server.js - backend web server and io monitor
<h2>UI</h2>
        - main.js - mounts the App react component
        - components
            - App.js - the main UI
            - Config.js - config for the UI

public folder contains static files that are served up by the express web server. You should not need to edit anything in this folder.  main.js in this folder is a bundle built when you run 'npm build' and should not be editted.