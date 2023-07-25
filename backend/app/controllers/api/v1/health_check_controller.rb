class Api::V1::HealthCheckController < ApplicationController
  def index
    head :ok
  end
end
