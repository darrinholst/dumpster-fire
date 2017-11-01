#!/bin/bash

PARENT_DIR="$(cd .. && pwd)"
CURRENT_DIR="$(pwd)"
TEMP_DIR="/tmp/dumpster-fire-build-$(date +%Y%m%d_%H%M%S)"
GIT_SHA="$(git rev-parse HEAD)"

rm -rf ${TEMP_DIR} && mkdir -p ${TEMP_DIR}

# -----------------------------------------------------------------------------
# This copies everything needed to do a build to a temporary directory
# in the container as to not disturb the source (node_modules in particular)
# on the host
# -----------------------------------------------------------------------------
rsync -a \
  --exclude=".DS_Store" \
  --exclude="phantomjs" \
  --exclude=".gnupg" \
  --exclude=".jdk" \
  --exclude=".m2" \
  --exclude=".maven" \
  --exclude=".npm" \
  --exclude="${CURRENT_DIR}/.git/" \
  --exclude="${CURRENT_DIR}/.gtm/" \
  --exclude="${CURRENT_DIR}/build/" \
  --exclude="${CURRENT_DIR}/node_modules/" \
  --exclude="${CURRENT_DIR}/server/public/" \
  --exclude="${CURRENT_DIR}/server/dist/" \
  ${PARENT_DIR} ${TEMP_DIR}

cd ${TEMP_DIR}${CURRENT_DIR}
sed -i -e "s/\[GIT_SHA\]/${GIT_SHA}/g" server/config/version.js

function fingerprint {
  mkdir -p ${TEMP_DIR}/fingerprint && \
  tar xzf build/slug.tgz -C ${TEMP_DIR}/fingerprint && \
  cd ${TEMP_DIR}/fingerprint${CURRENT_DIR} && \
  find . -type f ! -path "*node_modules*package.json" ! -path "*node_modules*Makefile" ! -path "*server/config/version.js" -exec md5sum {} \; \
    | sort -k 2 \
    | tee ${TEMP_DIR}${CURRENT_DIR}/build/slug.txt \
    | md5sum \
    | cut -d ' ' -f 1 > ${TEMP_DIR}${CURRENT_DIR}/build/slug.md5
}

function package {
  echo "removing dev dependencies..." && \
  yarn install --production && \
  rm -f server/public/*Styles.js* && \

  tar cfz build/slug.tgz -C ${TEMP_DIR} \
    --exclude=".buildpack" \
    --exclude=".cache" \
    --exclude="*.db" \
    --exclude="*.log" \
    --exclude="*.js.map" \
    --exclude="*.css.map" \
    --exclude=".eslint*" \
    --exclude="tslint*" \
    --exclude="tsconfig*" \
    --exclude=".${CURRENT_DIR}/README.md" \
    --exclude=".${CURRENT_DIR}/.*" \
    --exclude=".${CURRENT_DIR}/build" \
    --exclude=".${CURRENT_DIR}/client" \
    --exclude=".${CURRENT_DIR}/container" \
    --exclude=".${CURRENT_DIR}/extras" \
    --exclude=".${CURRENT_DIR}/features" \
    --exclude=".${CURRENT_DIR}/scripts" \
    --exclude=".${CURRENT_DIR}/server/.*" \
    --exclude=".${CURRENT_DIR}/server/index.js" \
    --exclude=".${CURRENT_DIR}/server/dist/*e2e*.js" \
    --exclude=".${CURRENT_DIR}/server/dist/*test*.js" \
    --exclude=".${CURRENT_DIR}/server/test" \
    --exclude=".${CURRENT_DIR}/server/webpack.config.js" \
    --exclude=".${CURRENT_DIR}/universal/src" \
    --exclude=".${CURRENT_DIR}/universal/test" \
    --exclude=".${CURRENT_DIR}/universal/types" \
    --exclude=".${CURRENT_DIR}/universal/webpack.config.js" \
    . && \

  fingerprint
}


# -----------------------------------------------------------------------------
# This does the build in that temp directory and builds a heroku slug
# ignoring stuff that's not needed for production to keep the artifact
# size down
# -----------------------------------------------------------------------------
yarn global add scripty && \
yarn run --silent verify:local && \
package

# -----------------------------------------------------------------------------
# Store the return code of the build and move build artifacts from the temp
# directory back to the host so we can do something with them after this
# container goes away
# -----------------------------------------------------------------------------
BUILD_RESULT=$?
rm -rf ${CURRENT_DIR}/build && \
mv ${TEMP_DIR}${CURRENT_DIR}/build ${CURRENT_DIR} && \
mkdir -p ${CURRENT_DIR}/build/maps && \
cp ${TEMP_DIR}${CURRENT_DIR}/server/public/*.map ${CURRENT_DIR}/build/maps
exit $BUILD_RESULT
