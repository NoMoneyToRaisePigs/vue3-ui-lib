export enum BaseSizeEnum {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export type BaseSize = `${BaseSizeEnum}`

export type InputModelValue = string | number

export interface InputProps {
  modelValue: InputModelValue
  disabled?: boolean
  placeholder?: string
  size?: BaseSize
  loading?: boolean
  isError?: boolean
}
