const express = require('express');
const next = require('next');
const { join } = require('path');
const LRUCache = require('lru-cache');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handleNextRequests = app.getRequestHandler();

// https://gist.github.com/henrik/1688572
const euCountries = [
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'GB',
  'GF',
  'GP',
  'MQ',
  'ME',
  'YT',
  'RE',
  'MF',
  'GI',
  'AX',
  'PM',
  'GL',
  'BL',
  'SX',
  'AW',
  'CW',
  'WF',
  'PF',
  'NC',
  'TF',
  'AI',
  'BM',
  'IO',
  'VG',
  'KY',
  'FK',
  'MS',
  'PN',
  'SH',
  'GS',
  'TC',
  'AD',
  'LI',
  'MC',
  'SM',
  'VA',
  'JE',
  'GG',
  'GI',
  'IM',
];

const handle = (req, res) => {
  // Check country code of user IP as supplied by Cloudflare
  const country_code = req.header('CF-IPCountry');
  // Set session cookie for cookie consent for non-EU users to not annoy
  // them with a cookie consent popup that is nor legally required for
  // their country
  if (!euCountries.includes(country_code)) res.cookie('cookie_consent', true);
  handleNextRequests(req, res);
};

const port = process.env.PORT || 3000;

// https://medium.com/@az/i18n-next-js-app-with-server-side-rendering-and-user-language-aware-caching-part-1-ae1fce25a693
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1hour
});

function getCacheKey(req) {
  // TODO clean-up, standardize an url to maximize cache hits
  return req.url;
}

async function renderAndCache(req, res, pagePath, queryParams) {
  const country_code = req.header('CF-IPCountry');
  if (!euCountries.includes(country_code)) res.cookie('cookie_consent', true);
  // TODO add a way to purge cache for a specific url
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.send(ssrCache.get(key));
    return;
  }

  // No cache present for specific key? let's try to render and cache
  try {
    const html = await app.renderToHTML(req, res, pagePath, queryParams);
    // If something is wrong with the request, let's not cache
    // Send the generated content as is for further inspection

    if (dev || res.statusCode !== 200) {
      res.setHeader('x-cache', 'SKIP');
      res.send(html);
      return;
    }

    // Everything seems OK... let's cache
    ssrCache.set(key, html);
    res.setHeader('x-cache', 'MISS');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}

app
  .prepare()
  .then(() => {
    const server = express();
    // https://github.com/zeit/next.js/wiki/Getting-ready-for-production

    server.use(express.static('public'));

    server.get('/service-worker.js', (req, res) => {
      const filePath = join(__dirname, '.next', '/service-worker.js');
      app.serveStatic(req, res, filePath);
    });

    server.get('/@:author/:permlink', (req, res) => {
      const actualPage = '/post';
      const queryParams = {
        author: req.params.author,
        permlink: req.params.permlink,
        amp: req.query.amp,
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/:tag/@:author/:permlink', (req, res) => {
      const { author } = req.params;
      const { permlink } = req.params;
      res.redirect(`/@${author}/${permlink}`);
    });

    server.get('/featured', (req, res) => {
      res.redirect(`/`);
    });

    server.get('/', (req, res) => {
      const actualPage = '/';
      const queryParams = {};
      renderAndCache(req, res, actualPage, queryParams);
    });

    server.get('/tag', (req, res) => {
      res.redirect(`/topics`);
    });

    server.get('/steemfest', (req, res) => {
      res.redirect(`/destinations/thailand/Bangkok`);
    });

    server.get('/created/:tag', (req, res) => {
      const { tag } = req.params;
      res.redirect(`/topics/${tag}`);
    });

    server.get('/trending/:tag', (req, res) => {
      const { tag } = req.params;
      res.redirect(`/topics/${tag}`);
    });

    server.get('/hot/:tag', (req, res) => {
      const { tag } = req.params;
      res.redirect(`/topics/${tag}`);
    });

    server.get('/favorites/:tag', (req, res) => {
      const { tag } = req.params;
      res.redirect(`/topics/${tag}`);
    });

    server.get('/featured/:tag', (req, res) => {
      const { tag } = req.params;
      res.redirect(`/topics/${tag}`);
    });

    server.get('/topics/:tag', (req, res) => {
      const actualPage = '/tag';
      const queryParams = {
        tags: req.params.tag,
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/destinations/:country', (req, res) => {
      const actualPage = '/destinations';
      const queryParams = {
        country: req.params.country,
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/destinations/:country/:subdivision', (req, res) => {
      const actualPage = '/destinations';
      const queryParams = {
        country: req.params.country,
        subdivision: req.params.subdivision,
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/destinations/:country/:subdivision/:city', (req, res) => {
      const actualPage = '/destinations';
      const queryParams = {
        country: req.params.country,
        subdivision: req.params.subdivision,
        city: req.params.city,
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get(
      '/destinations/:country/:subdivision/:city/:suburb',
      (req, res) => {
        const actualPage = '/destinations';
        const queryParams = {
          country: req.params.country,
          subdivision: req.params.subdivision,
          city: req.params.city,
          suburb: req.params.suburb,
        };
        app.render(req, res, actualPage, queryParams);
      },
    );

    server.get('/blog', (req, res) => {
      const actualPage = '/blog';
      const queryParams = {
        author: 'travelfeed',
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/@:author', (req, res) => {
      const actualPage = '/blog';
      const queryParams = {
        author: req.params.author,
      };
      // No cache since users are confused if their new posts/
      // profile updates don't show up instantly
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`Listening on Port ${port}`);
    });
  })
  .catch(ex => {
    // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });
