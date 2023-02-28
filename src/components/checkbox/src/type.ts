export type CheckBoxSize = 'medium' | 'large'

export type CheckBoxModelValue = boolean | (string | number)[]

export interface CheckboxProps {
  modelValue?: CheckBoxModelValue
  value?: number | string
  text?: string
  name?: string
  disabled?: boolean
  reverse?: boolean
  top?: boolean
  size?: CheckBoxSize
}

export interface CheckboxItem extends CheckboxProps {
  checked: boolean
}