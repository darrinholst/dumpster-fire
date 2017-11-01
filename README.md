# Dumpster Fire

A starter project to build and deploy Angular apps with a Node.js backend to Heroku.

## Initial Setup
1. Install [docker](https://www.docker.com/products/docker).
1. Install [node](https://nodejs.org/en/).
1. Install [yarn](https://yarnpkg.com). `npm install -g yarn`
1. `git clone git@github.com:darrinholst/dumpster-fire.git`
1. `cd dumpster-fire`
1. `yarn`

## Development

#### Verify
* `yarn run verify`

#### Running locally
* `yarn run dev`

## Releasing

[GitHub Releases](https://github.com/darrinholst/excellent/releases) are used for release management. To release set the following environment variables and `yarn run release`

    GITHUB_TOKEN=[https://github.com/settings/tokens]

## Deploying

Deploying is performed by [deploy.sh](container/ci/deploy.sh). It is passed `ENVIRONMENT` and `RELEASE_TAG` environment variables to determine where and what to deploy.

To deploy the latest release set the following environment variables and `yarn run deploy:(staging|prod)`. To deploy a specific release set `RELEASE_TAG=[https://github.com/darrinholst/excellent/releases]`. Try [autoenv](https://github.com/kennethreitz/autoenv) to declare these in an `.env` file.

    GITHUB_TOKEN=[https://github.com/settings/tokens]
    HEROKU_TOKEN=[heroku auth:token]
