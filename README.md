# Image Processing API

## Scripts

use `npm run command` to run scripts above:

- dev: start the server directly from ts files.
- start: build the project and start the server
- lint: scan ts files for any errors,
- ts-build : Transplie ts files to js,
- build: lint and build the project.
- test : run test suites.

## Endpoints

the server will start at PORT 5000.

### http://localhost:5000/home:

Visit this route to check all available images on the server.

- Fill the form
- Hit Get img button
- You will get the requested img in new tab

### http://localhost:5000/api/images:

you need to provide as query:

- filename
- width number > 0
- height number > 0
  in casy of any missing query param a 400 response with message "not all required fields where provided" will be returned

### Example

visitting: [http://localhost:5000/api/images?filename=santamonica&width=500&height=300](http://localhost:5000/api/images?filename=santamonica&width=500&height=300)
will return the request image resized to 500x300.
