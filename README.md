# NodeJS Web API eaxmple 2024
This is an example project created to compliment this artice:

## Configuration
To run locally create a `.env` file with the next variables:
- `PORT` (optional) - the port to host application on. Default is `8080`.
- `HOST` (optional) - the URL on which the application is hosted. Default is `http://localhost`;
- `DEFAULT_USERNAME` (optional) - the default username for greetings; Default is `USERNAME`.

## install dependencies
```
npm install
```

## Start for development
```
npm run start:dev
```

## Start for production
```
npm run build
npm run start:production
```

## Try it out
After starting an application go to [localhost](http://localhost:{port})