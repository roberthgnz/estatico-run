# estatico.run
estatico.run is a hosting platform service for static applications. It is built on top of [Vercel](https://vercel.com) and [Nuxt.js](https://nuxtjs.org).


## Features
- **Static**: Deploy static applications with ease.
- **HTTPS**: All deployments are served over HTTPS.
- **Vercel**: All deployments are served through Vercel's CDN.
- **Cloudflare Storage**: All static files are stored on Cloudflare's R2 Storage.

## Prerequisites
A [Cloudflare](https://cloudflare.com) account is required to use estatico.run. You can sign up for a free account [here](https://dash.cloudflare.com/sign-up).

## Getting Started
Setup the environment variables:

```bash
cp .env.example .env
```

## Development Server
Start the development server on http://localhost:3000

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.