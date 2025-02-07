class ApplicationController < ActionController::API
  def encode_token(payload)
    secret_key = Rails.application.credentials.jwt[:secret_key]

    raise "Missing secret_key for JWT in credentials" if secret_key.blank?

    JWT.encode(
      payload.merge(
        exp: 24.hours.from_now.to_i,
        iat: Time.current.to_i,
        iss: "markdraft",
      ),
      secret_key,
      "HS256",
    )
  end
end
