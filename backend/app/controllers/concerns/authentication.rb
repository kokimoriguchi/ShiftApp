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

  # cookieに保存されているtokenを取得し、employeeに保存されているか確認する。
  def authenticate_manager
    authenticate_employee
      # current_manager_idからis_managerがtrueか確認する
      @current_manager = Employee.find_by(id: @current_employee_id, is_manager: true)
      unless @current_manager
        render json: { message: 'unauthorized' }, status: :unauthorized
      end
  end
end