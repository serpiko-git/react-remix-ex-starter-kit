#!/bin/bash
set -e
set -o pipefail

if [[ "$CI_SERVER_HOST" != '' ]]; then
    cat << EOF >> ~/.gitconfig
[url "https://$GITLAB_USER:$CI_BUILD_TOKEN@$CI_SERVER_HOST/"]
    insteadOf = "git@git.corp.probitglobal.com:"
    insteadOf = "https://git.corp.probitglobal.com/"
EOF
fi

# git submodule update --init --recursive

if [ $CI_COMMIT_BRANCH = 'develop' ]; then
  cp .env.develop .env
elif [ $CI_COMMIT_BRANCH = 'master' ]; then
  cp .env.staging .env
elif [ $CI_COMMIT_BRANCH = 'prod' ]; then
  cp .env.prod .env
else
  echo BUILD_TARGET not set
fi

rm .env.develop .env.staging .env.prod

npm install -g pnpm --force
npm i -g gitmoji-cli ts-node
pnpm install
pnpm run build

# npm install
# npm run build
