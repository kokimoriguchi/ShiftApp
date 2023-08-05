FROM ruby:3.1.0
RUN apt-get update -qq && \
    apt-get install -y build-essential \
                       libpq-dev \
                       nodejs

RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
COPY auth/service.key /app/auth/service.key
RUN gem install bundler
RUN bundle install --without test development
ADD . /app
EXPOSE 3000
ENV RAILS_ENV production

CMD ["/bin/sh", "-c", "bundle exec unicorn -p 3000 -c /app/config/unicorn.rb"]