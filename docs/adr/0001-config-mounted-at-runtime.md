# Config mounted as volume, fetched at runtime

The Config JSON is not bundled into the Docker image. Instead it is bind-mounted into the nginx container and fetched by the SPA at runtime via `fetch('/config.json')`. This means the Config can be updated without rebuilding or redeploying the image — only a browser refresh is needed.

We chose this over build-time bundling because the whole point of a self-hosted startpage is that the link list changes frequently, and a rebuild cycle for every bookmark edit is unacceptable.
