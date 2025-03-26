### securing-software-24-project

### Setting Up the Backend

Navigate to the backend directory, install the required dependencies and run build+start:
```
npm install
npm run build
npm run start
```

Default port for BE is 3000, but can be changed in [app.ts](https://github.com/banansku/securing-software-24-project/blob/4b7a5d7872440924374ca9fd4b7520e0309ea518/backend/src/app.ts#L7).

### Setting Up the Frontend
Navigate to the backend directory, install the required dependencies and run build+preview:
```
npm install
npm run build
npm run preview
```

Default port for FE is 5173 and can be changed by adding for example 
```javascript
  server: {
    port: 3006,
  },
```
 to the [vite.config.ts](https://github.com/banansku/securing-software-24-project/blob/main/frontend/vite.config.ts) file.

You can also run in corresponding directories

```
npm run dev
```

to start the application in development mode. Do mind that due to how ``dockerman`` is set up, it wipes the ``database.sqlite`` on every refresh.

Service running at: https://securing-software-24-project.onrender.com/
