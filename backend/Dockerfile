FROM ruby:3.1.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs curl

# RAILS_ENVの設定
# ENV RAILS_ENV=production

WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
# RUN bundle install --without development test
COPY . /myapp

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]