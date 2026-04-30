# Pathfinder

Self-hosted startpage. Apps organized into Groups, configured via a single JSON file.

## Quick start

```bash
# Docker (recommended)
docker run -p 3000:80 -v ./config.json:/usr/share/nginx/html/config.json:ro thitiph0n/pathfinder:latest

# or docker compose
docker compose up -d
```

```bash
# Dev
bun install
bun run dev
```

## Config

Mount `config.json` into the container. Never bundled into the image.

```json
{
  "title": "Pathfinder",
  "logo": "/logo.png",
  "defaultTheme": "light",
  "groups": [
    {
      "name": "DevOps",
      "icon": "server",
      "apps": [
        {
          "name": "Grafana",
          "url": "https://grafana.local",
          "icon": "grafana",
          "description": "Metrics dashboard"
        }
      ]
    }
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `title` | string | Page title shown in header |
| `logo` | string | URL or path to logo image (optional) |
| `defaultTheme` | `"light"` \| `"dark"` | Initial theme; overridden by localStorage |
| `groups[].icon` | string | Lucide icon name |
| `apps[].icon` | string | URL/path → `<img>`, emoji → text, otherwise Simple Icons name |

## Icons

Both App and Group icons resolve in order:

| Value | Renders as |
|---|---|
| Starts with `http` or `/` | `<img>` tag |
| Single character | Emoji |
| Otherwise | Icon name lookup |

- **App** → tries [Simple Icons](https://simpleicons.org) first, then [Lucide](https://lucide.dev/icons) as fallback
- **Group** → tries [Lucide](https://lucide.dev/icons) first, then [Simple Icons](https://simpleicons.org) as fallback

Simple Icons: lowercase slug (e.g. `grafana`, `github`, `docker`) — Lucide: kebab-case (e.g. `server`, `tv-2`, `database`)

## Deployment

**Docker Compose**

```bash
docker compose up -d
```

**Docker run**

```bash
docker run -p 3000:80 -v ./config.json:/usr/share/nginx/html/config.json:ro thitiph0n/pathfinder:latest
```

**Build from source**

```bash
bun install && bun run build
# serve dist/ with any static host
```

**Build image locally**

```bash
docker build -t pathfinder .
docker run -p 3000:80 -v ./config.json:/usr/share/nginx/html/config.json:ro pathfinder
```

## Features

- Search across app names and descriptions
- Light/dark theme toggle, persisted in localStorage
- App clicks open in new tab
- Responsive card grid per group
