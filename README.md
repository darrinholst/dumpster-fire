# heroku-nodejs-build-demo

A demo project to show how [heroku-nodejs-build](https://github.com/darrinholst/heroku-nodejs-build.git) works.

## Initial Setup
1. Install [docker](https://www.docker.com/products/docker).
1. Install [node](https://nodejs.org/en/).
1. Install [yarn](https://yarnpkg.com).
1. `git clone https://github.com/darrinholst/heroku-nodejs-build-demo.git`
1. `cd heroku-nodejs-build-demo`
1. `yarn install`

#### Verify

    yarn run verify

#### Run the web server locally

    yarn run dev

#### Build a new release

    GITHUB_REPO=darrinholst/heroku-nodejs-build-demo \
    GITHUB_TOKEN=[https://github.com/settings/tokens] \
    yarn run package && yarn run release

#### Deploy a release

    RELEASE_TAG=[https://github.com/darrinholst/heroku-nodejs-build-demo/releases] \
    GITHUB_REPO=darrinholst/heroku-nodejs-build-demo \
    GITHUB_TOKEN=[https://github.com/settings/tokens] \
    HEROKU_APP=your-heroku-app \
    HEROKU_TOKEN=[heroku auth:token] \
    yarn run deploy
