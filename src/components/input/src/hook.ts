import { INPUT_EVENT, CHANGE_EVENT, BLUR_EVENT, FOCUS_EVENT } from './constants'
import type { SetupContext } from 'vue'

interface Params {
  updateValue: (val: string) => string | number
  emit: SetupContext['emit']
}

export const useInputEvent = ({
  updateValue,
  emit,
}: Params) => {
  const handleInput = (evt: Event) => {
    const { value } = evt.target as HTMLInputElement

    const newValue = updateValue(value)

    emit(INPUT_EVENT, newValue, evt)
  }

  const handleBlur = (evt: FocusEvent) => {
    emit(BLUR_EVENT, evt)
  }

  const handleFocus = (evt: FocusEvent) => {
    emit(FOCUS_EVENT, evt)
  }

  return {
    handleBlur,
    handleFocus,
    handleInput,
  }
}
