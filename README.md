# TravelFeed

Find inspiration for your travels on Travelfeed, the travel community on the Steem Blockchain. Our large community has created over 13,000 high-quality travel blogs so far that are all accessible easily through TravelFeed. Not only can you find the best insider tips for your destination, but also connect with over thousand like minded travelers.

For travel bloggers, we offer a free blog hosted forever on the uncensorable Steem Blockchain. Even better, authors get paid for their posts in the cryptocurrency STEEM and soon in TravelFeed MILES, an upcoming token that will provide travelers and the tourism industry alike with unique benefits on the platform.

## Technology Stack

TravelFeed is written in JavaScript using React and Next.js. The UI is made using the Material-UI React components and Bootstrap 4. All public information are written to the Steem blockchain client-side, our backend pulls data from our Hivemind database that is in sync with the Steem Blockchain.

## How to Run

### Environment variables

Environment variables need to be set at build time.

## Configuration

| Environment          | Description                                                                  | Recommended value          |
| -------------------- | ---------------------------------------------------------------------------- | -------------------------- |
| `GRAPHQL_URL`        | Travelfeed api                                                               | https://api.travelfeed.io/ |
| `STEEM_API`          | Steem api                                                                    | https://api.steemit.com    |
| `ROOTURL`            | URL of the server                                                            | http://localhost:3000      |
| `WEB_PUSH_PUB`       | [Generate a public web push key](https://web-push-codelab.glitch.me/)        |                            |
| `RECAPTCHA_SITE_KEY` | [Get an API key](http://www.google.com/recaptcha/admin)                      |                            |
| `GMAPS_API_KEY`      | [Get an API key](https://cloud.google.com/console/google/maps-apis/overview) |                            |
| `MAPBOX_TOKEN`       | [Get an API key](https://www.mapbox.com/)                                    |                            |

For the local development server, use an .env file.

For a production build, configure build environment variables on DockerHub, or set the variables from the .env file for a local build:

```
export $(cat .env | xargs)
```

### Development

This starts a local development server that updates upon code changes.

```
git clone https://github.com/travelfeed-io/travelfeed-io.git
cd travelfeed-io
npm install
npm run dev
```

### Production

#### Local production build:

```
npm run build
npm start
```

#### Docker

We use Docker to deploy TravelFeed behind an Nginx proxy. This is our setup, pulling all the latest images from DockerHub:

#### 1. Run Nginx Proxy

Folders mounted as volumes must be created before first run! (mkdir /etc/nginx ...)

```
docker run --detach \
    --name nginx-proxy \
    --publish 80:80 \
    --publish 443:443 \
    --volume /etc/nginx/certs \
    --volume /etc/nginx/vhost.d \
    --volume /usr/share/nginx/html \
    --volume /var/run/docker.sock:/tmp/docker.sock:ro \
    --restart unless-stopped \
    jwilder/nginx-proxy:alpine
```

#### 2. Run Let's Encrypt

Manages letsencrypt certificates for each domain. For obtaining the initial certificate, Cloudflare needs to be turned off!

```
docker run --detach \
    --name nginx-proxy-letsencrypt \
    --volumes-from nginx-proxy \
    --volume /var/run/docker.sock:/var/run/docker.sock:ro \
    --restart unless-stopped \
    jrcs/letsencrypt-nginx-proxy-companion
```

#### 3. Run TravelFeed

Replace travelfeed.io with your domain and enter your email (for letsencrypt)

```
docker run --detach \
--name tfio-beta \
    --env "VIRTUAL_HOST=travelfeed.io" \
    --env "VIRTUAL_PORT=3000" \
    --env "LETSENCRYPT_HOST=travelfeed.io" \
    --env "LETSENCRYPT_EMAIL=replace@e.mail" \
    --env TZ=UTC \
    --restart unless-stopped \
travelfeed/tfio:latest
```

## How to Commit

We are looking for contributors! We invite you to join our [Discord Server](https://discord.gg/jWWu73H) where most of our communication takes places.

If you discover an issue, you can create an issue or open a pull-request.
