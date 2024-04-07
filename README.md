# blockchain-explorer

This app was tested on node version 18.20.1 (latest)
Package manager: pnpm 8.15.6 (to install the package manager make sure you're unsing the correct node version and then run `npm i -g pnpm`)

You can use npm as well.

## To Run

Dev enviroment (open on localhost:3000)

```
pnpm dev
```

to build and run in production mode:

```
pnpm build
pnpm start
```

## App Structure

- /app: Contains all the routes, initial app layout.
- /utils: Contains functions used in your application, such as reusable utility functions.
- /components: Contains all the UI components, that can be reusable on all features or application.
- /features: Containes code or components used for specific feature in the app, they are not reusable on other features
- /public: Contains all the static assets of the application, such as images