# otel-record-store

Example Web Application Using OTel &amp; Synthetic Monitoring

# Local Setup

```
git clone https://github.com/carlyrichmond/otel-record-store.git

# UI setup
cd records-ui
npm install
```

# Run

** Note: requires installation of [Docker](https://docs.docker.com/desktop/). **

```zsh
docker-compose build
docker-compose up
```

To start the UI and generate sample telemetry data using the Playwright E2E tests, run the following command:

```zsh
cd records-ui
npm install
npm run generate
```

If you would like to generate your own events manually, simply run the `npm run dev` command to start the application locally on `http://localhost:4173`:

```zsh
cd records-ui
npm install
npm run generate
```

# Attributions

1. Vinyl icon created by [Freepik](https://www.flaticon.com/free-icons/vinyl) on Flaticon.
2. Available format SVG icons sourced from [Iconify](https://icon-sets.iconify.design/).
3. Record album covers sourced via [Rolling Stones: The 100 Best Album Covers of All Time](https://www.rollingstone.com/music/music-lists/best-album-covers-1235035232/)
