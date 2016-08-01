#
This is a web frontend/UI for the Monoprice 6 Zone Home Audio Controller and Amplifier, product # 10761

It relies on having something (in my case, a RaspberryPi) connected to the controller via serial and running this JSON API: https://github.com/jnewland/mpr-6zhmaut-api

Based on react-redux-material_ui-boilerplate / https://github.com/takanabe/react-redux-material_ui-boilerplate.git

_warning_ this project is a bit rough, made in one evening, but it seems to work well.

# Usage
Modify the `HOST` const in actions/app to the URL of the mpr-6zhmaut-api JSON API

## Package installation
```bash
$ npm install
```

## Use development server
```bash
$ npm start
```

## Building
The easiest way to get this running is to compile files into `static` directory with the following command.

```bash
$ npm run build
```

And then use that within `express.static`. You might get a CORS violation if you don't run it on the same port # as the JSON API which you can resolve by adding CORS to the JSON API or proxying the API calls. I ended up just forking the JSON API and adding `express.static` with the build folder here.

