---
sidebar_position: 0
---

# How to start a new MC project

<!--@abc: config({ "asciinema": { "speed": 1, "cols": 60, "rows": 10 } }) -->

### 1. Initialize a new react project via template

First bootstrap the react app using the MapComponent template. The template is based on vite which is (at the time of writing this document) considered a best practice to initialize a new react project.

```bash
npx degit mapcomponents/template my-mc-app
```

<img src={require('/img/start_new_project_1.gif').default} width="500" />

### 2. Install the dependencies via yarn

Change into the app directory and install the dependencies using yarn

```bash
cd my-mc-app
yarn
```

<img src={require('/img/start_new_project_2.gif').default} width="500" />

### 3. Start developing

Start the development server that will by default serve the app on localhost:5173 and watch the filesystem for changes to compile and hot-reload the browser tab that is running the app.

```bash
cd my-mc-app
yarn dev
```

<img src={require("/img/start_new_project_3.gif").default} width="500" />

Open http://localhost:5173 in your browser to run the current code state with hot-reloading.

<img src={require("/img/start_new_project_4.gif").default} width="500" />

<!--@abc: browse({"url":"http://localhost:5173", "service_command":"cd my-mc-app && yarn dev"}) -->
