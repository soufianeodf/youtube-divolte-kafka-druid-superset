#!/bin/bash

# if the env var APPLICATION_ID is not empty
if [ ! -z "${APPLICATION_ID}" ]; then
   echo "application.id=${APPLICATION_ID}" >> /config/application.properties
fi

# if the env var BOOTSTRAP_SERVERS is not empty
if [ ! -z "${BOOTSTRAP_SERVERS}" ]; then
   echo "bootstrap.servers=${BOOTSTRAP_SERVERS}" >> /config/application.properties
fi

# if the env var AUTO_OFFSET_RESET is not empty
if [ ! -z "${AUTO_OFFSET_RESET}" ]; then
   echo "auto.offset.reset=${AUTO_OFFSET_RESET}" >> /config/application.properties
fi

# if the env var INPUT_TOPIC is not empty
if [ ! -z "${INPUT_TOPIC}" ]; then
   echo "input.topic=${INPUT_TOPIC}" >> /config/application.properties
fi

# if the env var OUTPUT_TOPIC is not empty
if [ ! -z "${OUTPUT_TOPIC}" ]; then
   echo "output.topic=${OUTPUT_TOPIC}" >> /config/application.properties
fi

# shellcheck disable=SC2068
exec java -jar ./app.jar $@