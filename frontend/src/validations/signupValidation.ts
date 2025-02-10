import { UseFormWatch } from 'react-hook-form'

type SignupFormValues = {
  email: string
  password: string
  confirmPassword: string
}

export const signupValidation = (watch: UseFormWatch<SignupFormValues>) => ({
  email: {
    required: 'メールアドレスは必須です',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/,
      message: '無効なメールアドレスです',
    },
  },
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
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/,
      message:
        'パスワードは半角英字と数字をそれぞれ1文字以上含む必要があります',
    },
  },
  confirmPassword: {
    required: 'パスワード確認は必須です',
    validate: (value: string) => {
      if (value !== watch('password')) {
        return 'パスワードが一致しません'
      }
      return true
    },
  },
})
