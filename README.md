# advent-racers

La base du site (créée avec SvelteKit)

↓ ci-dessous la doc pour run le site

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

to configure syncthing we need to start the service from ssh, 

```bash
sudo systemctl start syncthing@[username}].service
```

then tunnel into it

```bash
ssh -L 9898:localhost:8384 user@server-ip
```
