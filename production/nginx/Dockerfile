FROM nginx:1.18
RUN apt-get update && \
    apt-get install -y apt-utils \
    locales && \
    sed -i -e 's/# ja_JP.UTF-8/ja_JP.UTF-8/g' /etc/locale.gen && \
    locale-gen ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LC_TIME C
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf