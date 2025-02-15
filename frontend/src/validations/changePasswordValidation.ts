import { UseFormWatch } from 'react-hook-form'

type ChangePasswordFormData = {
  currentPassword: string
  password: string
  confirmPassword: string
}

export const ChangePasswordValidation = (
  watch: UseFormWatch<ChangePasswordFormData>,
) => ({
  currentPassword: {
    required: '現在のパスワードは必須です',
  },
  password: {
    required: '新しいパスワードは必須です',
    minLength: {
      value: 8,
      message: '新しいパスワードは8文字以上で入力してください',
    },
    maxLength: {
      value: 128,
      message: '新しいパスワードは128文字以下で入力してください',
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
        return '新しいパスワードが一致しません'
      }
      return true
    },
  },
})
