export type CheckBoxSize = 'medium' | 'large'
export type CheckBoxModelValue = boolean
export interface CheckboxProps {
  modelValue?: CheckBoxModelValue
  value?: number | string
  text?: string
  name?: string
  disabled?: boolean
  reverse?: boolean
  top?: boolean
  size?: CheckBoxSize
  validateEvent?: boolean
}

export interface CheckboxItem extends CheckboxProps {
  checked: boolean
}
