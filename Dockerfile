FROM node:12-alpine

# Install git which is required for installing packages
RUN apk add --no-cache git

# Setting working directory. All the paths will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
RUN npm install pm2 -g
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Set build args
ARG MAPBOX_TOKEN
ENV MAPBOX_TOKEN=$MAPBOX_TOKEN
ARG GMAPS_API_KEY
ENV GMAPS_API_KEY=$GMAPS_API_KEY
ARG RECAPTCHA_SITE_KEY
ENV RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY
ARG ROOTURL
ENV ROOTURL=$ROOTURL
ARG GRAPHQL_URL
ENV GRAPHQL_URL=$GRAPHQL_URL
ARG WEB_PUSH_PUB
ENV WEB_PUSH_PUB=$WEB_PUSH_PUB
ARG STEEM_API
ENV STEEM_API=$STEEM_API

# Building the app
RUN npm run build

# Exposing default port
EXPOSE 3000

# Running the app
CMD [ "pm2-runtime", "ecosystem.config.js" ]
