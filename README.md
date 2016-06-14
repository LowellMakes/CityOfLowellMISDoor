# City of Lowell MIS Door

##Install

    cd server
    npm install //this will take a while and will install the dependencies

##Run server

    cd server/dist && node server.js
    
    With server running navigate to http://127.0.0.1:8000

##Setup for Development

    cd server
    npm install-dev
	
	npm run build //runs gulp and browserify to build the views and babel to transpile the server.js

	npm run serve //will run the server same as 'cd dist && node server.js'  

##File Structure
###Server
    server.js - backend web server and io monitor
###UI
        - main.js - mounts the App react component
        - components
            - App.js - the main UI
            - Config.js - config for the UI
###public
    index.html - main html
    main.js - bundled js file
###dist 
    Build folder.  This is where the app should be ran from.

####Notes
public folder contains static files that are served up by the express web server. You should not need to edit anything in this folder.  main.js in this folder is a bundle built when you run 'npm run build' and should not be editted.
