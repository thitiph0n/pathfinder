# Pathfinder

A self-hosted startpage that collects bookmarks into a browsable grid. Replaces Flame as a personal link dashboard.

## Language

**App**:
A single bookmark — a named link with a URL, icon, and optional description. Opens in a new tab when clicked.
_Avoid_: link, bookmark, shortcut

**Group**:
A named, iconified container of Apps shown as a titled section on the page.
_Avoid_: category, section, folder

**Config**:
The JSON file that defines the page title, logo, default theme, and all Groups and Apps. Mounted into the container at runtime; never bundled into the image.
_Avoid_: data file, settings, database

**Icon**:
A string field on both App and Group. Resolved in order: HTTP/path prefix → rendered as `<img>`; single emoji character → rendered as text; otherwise → icon name looked up in Simple Icons (App) or Lucide (Group).
_Avoid_: logo, image, class

## Data shape

```json
{
  "title": "Pathfinder",
  "logo": "/logo.png",
  "defaultTheme": "light | dark",
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

## Relationships

- A **Group** contains one or more **Apps**
- The **Config** defines the header branding, default theme, and all **Groups** with their **Apps**

## UI behaviour

- Layout: single scrollable page, Groups stacked vertically, Apps in a responsive card grid per Group
- Search: client-side filter across App name and description, always visible in the header
- Theme: light/dark toggle; Config sets `defaultTheme`, localStorage persists the user's last choice
- App click: always opens in a new tab

## Example dialogue

> **Dev:** "I want to add a new App under the DevOps Group."
> **User:** "Edit the Config file — add an entry to that Group's apps array, save, and refresh the page."

## Flagged ambiguities

- "bookmark" and "link" were used informally — resolved: the canonical term is **App**.
- "category" was used in Flame — resolved: **Group** is the term used here.
