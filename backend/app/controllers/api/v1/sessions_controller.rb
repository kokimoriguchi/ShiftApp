class Api::V1::SessionsController < ApplicationController

  def create
    # ログイン処理でnumberとpasswordを受け取りデータベースと照合し、存在すればcookieにtokenを保存する
    employee = Employee.find_by(number: params[:number])
    if employee&.authenticate(params[:password])
      token = JwtService.encode(employee.id)
      cookies[:token] = { value: token, httponly: true }

      # Storeのnumberを取得する
      store_number = employee.store.number

      render json: {status: "create", data: employee, store_number: store_number}
    else
      render json: {status: "error", message: "ログインに失敗しました"}
    end
  end

  def destroy
    cookies.delete(:token)
    render json: { status: "logout" }
  end

end
