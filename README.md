This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### Project setup 
`npm install`
`npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Bounding box
Features:

- [x] Loading images from API(using a proxy middleware due to CORS issues)
- [x] Submit last work in the selected images
- [x] App state-preservation/restoration(using redux for undo/redo).
- [x] Disabled buttons undo and redo when it's possible
- [x] Possible to select a rectangle over the image selected
- [x] Log implemented to see what are we sending to the API


### Decision

- Use react +  redux + material-ui as a system design
- Use Redux to save the state of the application
- Mock data for rapid prototyping
- Responsive Design comes with material-ui (it provides a decent responsive design)

### Architecture

- Containers has interaction with Redux and any services (api services)
- services contain all interaction with any rest API here it's possible to have more like auth, etc.
- Components interact with Container. Communication is just with props and events. They don't have any knowledge of any route or state. They just provide specific functionality.
- The model represents the entities in our application.
- State using a simple Redux model
