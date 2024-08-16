#/bin/bash

# add latest
docker build \
       --no-cache \
       -t admin-perp-front:latest \
       -f ./docker/Dockerfile \
       --progress=plain \
       .
       
