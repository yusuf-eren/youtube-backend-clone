# Youtube Backend Clone with AWS-NodeJS

## This Repository Includes;
### ```NodeJS, ExpressJS, Testing, TypeScript, AWS S3 Video Streaming, Mongoose, Docker, Kubernetes, Skaffold```
## How to install?

### First of all you should configure your .env file with the example file
### Then run commands below
```
npm install
```

## How to run?
```
npm run start:dev
```

## How to run tests?
```
npm run test
```

# Docker
## How to build docker image?
```
docker build -t <your-docker-name>/youtube-backend
```
## Run on localhost:3010
```
docker run -p 3010:3010 -it <your-docker-name>/youtube-backend
```

## Next Steps: Continious Development with Skaffold-Kubernetes
```
skaffold dev
```
## Now try to send a request to ```http://localhost/``` without port and develop without thinking about "Oh, that was working on my laptop!!!!"