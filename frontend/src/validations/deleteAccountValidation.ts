export const deleteAccountValidation = {
  password: {
    required: 'パスワードは必須です',
    minLength: {
      value: 8,
      message: 'パスワードは8文字以上で入力してください',
    },
    maxLength: {
      value: 128,
      message: 'パスワードは128文字以下で入力してください',
    },
  },
}
