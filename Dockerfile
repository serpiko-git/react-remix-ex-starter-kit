FROM node:22.5.1-bookworm AS builder

ENV GOSU_VERSION 1.10
ENV TINI_VERSION v0.18.0
RUN set -eux; \
    \
    keyservers=' \
    ha.pool.sks-keyservers.net \
    hkp://p80.pool.sks-keyservers.net:80 \
    keyserver.ubuntu.com \
    hkp://keyserver.ubuntu.com:80 \
    pgp.mit.edu \
    '; \
    export GNUPGHOME="$(mktemp -d)"; \
    \
    # Install dependencies
    tempDeps=' \
    gnupg \
    dirmngr \
    wget \
    '; \
    pkgs=' \
    ca-certificates \
    neovim \
    '; \
    apt-get update; \
    apt-get install -y --no-install-recommends $pkgs $tempDeps; \
    rm -rf /var/lib/apt/lists/*; \
    \
    # Install gosu
    dpkgArch="$(dpkg --print-architecture | awk -F- '{ print $NF }')"; \
    wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$dpkgArch"; \
    wget -O /usr/local/bin/gosu.asc "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$dpkgArch.asc"; \
    # Verify the signature
    for keyserver in $(shuf -e $keyservers) ; do \
    gpg --no-tty --keyserver "$keyserver" --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4 && break || : ; \
    done; \
    gpg --no-tty --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu; \
    chmod +x /usr/local/bin/gosu; \
    # Verify that the binary works
    gosu nobody true; \
    \
    # Install tini
    wget -O /usr/local/bin/tini "https://github.com/krallin/tini/releases/download/$TINI_VERSION/tini"; \
    wget -O /usr/local/bin/tini.asc "https://github.com/krallin/tini/releases/download/$TINI_VERSION/tini.asc"; \
    # Verify the signature
    for keyserver in $(shuf -e $keyservers) ; do \
    gpg --no-tty --keyserver "$keyserver" --recv-keys 595E85A6B1B4779EA4DAAEC70B588DFF0527A9B7 && break || : ; \
    done; \
    gpg --no-tty --batch --verify /usr/local/bin/tini.asc /usr/local/bin/tini; \
    chmod +x /usr/local/bin/tini; \
    \
    # Cleanup
    rm -rf "$GNUPGHOME" /usr/local/bin/gosu.asc; \
    apt-get purge -y --auto-remove $tempDeps;

RUN apt-get update; \
    apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++ -y; \
    rm -rf /var/lib/apt/lists/*;

# When building locally you will want to set GITLAB_USER and CI_JOB_TOKEN manually.
ARG GITLAB_USER=gitlab-ci-token
ARG CI_BUILD_TOKEN
ARG CI_COMMIT_BRANCH
ARG CI_SERVER_HOST
COPY . /opt/derivatives-admin-debug
WORKDIR /opt/derivatives-admin-debug/
RUN set -eux; \
    ./build-scripts/docker-build.sh
    # git clean -ffdx -e derivatives-admin-debug -e node_modules && \
    
FROM node:22.5.1-bookworm

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends ca-certificates; \
    npm install -g ts-node; \
    rm -rf /var/lib/apt/lists/*;

# add our user and group first to make sure their IDs get assigned consistently, regardless of whatever dependencies get added
RUN groupadd -r coin && useradd -r -d /tmp -m -g coin coin

COPY --from=builder \
     /usr/local/bin/gosu \
     /usr/local/bin/tini \
     /opt/derivatives-admin-debug/build-scripts/docker-entrypoint.sh \
     /usr/local/bin/

COPY --chown=coin:coin --from=builder /opt/derivatives-admin-debug /opt/derivatives-admin-debug

ENTRYPOINT ["/usr/local/bin/tini", "--", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["derivatives-admin-debug"]
