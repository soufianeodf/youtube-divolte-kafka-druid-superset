FROM openjdk:8

RUN apt-get update && \
    apt-get install -y curl;\
    mkdir -p /opt/druid && \
    cd /tmp/ && \
    curl -O https://downloads.apache.org/druid/0.21.1/apache-druid-0.21.1-bin.tar.gz && \
    tar zxpf apache-druid-0.21.1-bin.tar.gz -C /opt/druid && \
    mv /opt/druid/apache-druid-0.21.1/ /opt/druid/apache-druid && \
    apt-get remove -y curl && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -fr /var/tmp/* /tmp/*

COPY common.runtime.properties /opt/druid/apache-druid/conf/druid/single-server/micro-quickstart/_common/

EXPOSE 8888
EXPOSE 8081
EXPOSE 8082
EXPOSE 8083
EXPOSE 8090
EXPOSE 9092
EXPOSE 2181 2888 3888

ENTRYPOINT /opt/druid/apache-druid/bin/start-micro-quickstart
