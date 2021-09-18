#!/bin/bash

# get the container id of apacher/superset, and store it in 'result' variable
result=$(docker container ls | grep "soufianeodf/apache-superset" | awk '{print $1;}')

docker exec -it $result superset fab create-admin \
               --username admin \
               --firstname Superset \
               --lastname Admin \
               --email admin@superset.com \
               --password admin

docker exec -it $result superset db upgrade

docker exec -it $result superset load_examples

docker exec -it $result superset init
