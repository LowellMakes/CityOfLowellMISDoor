# City of Lowell MIS Door

Install:

    cd server
    npm build
    npm install

Build views:

    cd server && npm build

Run server

    cd server && npm start

With server running navigate to http://127.0.0.1:8000

UI folder contains the code for the view that is seen in the browser


Public folder contains static files that are served up by the express web server, you should not need to edit anything in this folder.  main.js in this folder is a bundle build when you run 'npm build' and should not be editted.