module Authentication

  private

  #tokenを受け取り有効な物であればemployee_idを返す。無効なtokenであればunauthorizedを返す
  #各コントローラーでbefore_actionとして使用する
  def authenticate_employee
    begin
      token = cookies[:token]
      @current_employee_id = JwtService.decode(token)
    rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError
      render json: { message: 'unauthorized' }, status: :unauthorized
    end
  end
end