class Api::V1::HealthCheckController < ApplicationController
  def index
    render plain: 'OK', status: :ok
  end
end
