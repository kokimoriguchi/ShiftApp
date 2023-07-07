class JwtService
  class << self
    #新規ユーザー作成時にJWTを発行するもの
    def encode(employee_id)
      payload = {
        iss: "example_app", # JWTの発行者
        sub: employee_id, # JWTの主体
        exp: (DateTime.current + 14.days).to_i # JWTの有効期限
      }

      # 秘密鍵の取得
      rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))

      # JWTの作成
      JWT.encode(payload, rsa_private, "RS256")
    end

    # JWTの検証ログイン時に実行するもの
    def decode(token)
      # 秘密鍵の取得
      rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))

      # JWTのデコード。JWTからペイロードが取得できない場合は認証エラーにする
      begin
        decoded_token = JWT.decode(token, rsa_private, true, { algorithm: 'RS256' })
      rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError
        return render json: { message: 'unauthorized' }, status: :unauthorized
      end

      # subクレームからユーザーIDを取得
      decoded_token.first["sub"]
    end
  end
end