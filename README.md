# expressjs-template

Small starter template to begin applications with a frontend and a backend.

I use express.js with winston and winston-express as a logger.
Express is configured to parse the body, both url encoded or in json format.

The backend has two example routes configured (in src/MainRouter.js), `/api/hello` and `/page/hello`.
The first is a route returning JSON, the second a templated html (I use mustache.js).
Additionally, there is a `/public` route which is served for static assets.
The files in this folder show the usage of the two backend routes to execute an API and to show a server-generated page.

## Usage

Just checkout, run `npm install`, then `npm start`. You can test the app by visiting http://localhost:8000
