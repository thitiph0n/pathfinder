# GitHub Actions publishes to Docker Hub on tag and main push

The CI/CD pipeline uses GitHub Actions to build and push the Docker image to Docker Hub. A push to `main` publishes the `latest` tag. A semver git tag (e.g. `v1.2.3`) publishes versioned tags (`1.2.3`, `1.2`, `1`, `latest`).

We chose Docker Hub over a private registry because this is a self-hosted open project intended for public distribution, and Docker Hub is the standard discovery channel for self-hosted images. Semver tagging lets users pin to a specific version or float on a major/minor, which is the expected contract for a self-hosted image.
