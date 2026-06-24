# The Casting Room

A Cloudflare-ready web app that generates a fresh shortlist of 10 recognizable actors and actresses, including headshots and three notable movies per performer.

## Data source

The app uses TMDB's popular people and movie credits endpoints. It samples from the first 20 popularity pages (400+ people), then applies film-credit and audience-vote thresholds to keep the results in broadly recognizable A-list and B-list territory.

## Configure

The supplied TMDB v3 API key is bundled in the Worker, so the app works immediately after deployment. You can override it by adding an encrypted `TMDB_API_KEY` or `TMDB_ACCESS_TOKEN` under **Settings > Variables and Secrets**.

```sh
npx wrangler pages secret put TMDB_API_KEY
```

For quick local previews without a configured secret, the app will ask for either credential. The temporary value remains in memory only for the current browser tab.

## Run

```sh
npm run build:pages
npx wrangler pages dev pages-dist
```

## Deploy to Cloudflare Pages

The Cloudflare dashboard drag-and-drop uploader does not support Pages Functions such as this app's `_worker.js`.

On Windows, double-click `deploy-cloudflare.cmd`. It builds the app, opens Cloudflare authentication, and deploys it.

Or run these commands from the extracted `casting-room` folder:

```sh
npm run build:pages
npx wrangler login
npx wrangler pages deploy pages-dist --project-name casting-room
```

For Git integration, use `npm run build` as the build command and `pages-dist` as the output directory.

## Sites build and validation

The included default build also produces the ESM artifact expected by Sites:

```sh
npm run build:sites
node scripts/validate-artifact.mjs
```

TMDB attribution is included in the app footer.
