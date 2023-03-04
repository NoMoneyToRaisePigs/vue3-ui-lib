<template>
  <div
    class="e-input"
    :class="{
      'e-input--prepend': !!slots.prepend,
      'e-input--append': !!slots.append
    }"
  >
    <div v-if="slots.prepend" class="e-input__prepend">
      <slot name="prepend" />
    </div>

    <div
      class="e-input__wrapper"
      :class="{
        'e-input__wrapper--error': isErrorState,
        'e-input__wrapper--disabled': disabled
      }"
    >
      <div v-if="slots.prefix" class="e-input__prefix">
        <slot name="prefix" />
      </div>

      <input
        ref="inputRef"
        :value="innerValue"
        class="e-input__inner"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput($event)"
      >
      <slot />

      <Spinner v-if="loading" color="--content-primary" size="24" />

      <div v-if="slots.suffix" class="e-input__suffix">
        <slot name="suffix" />
      </div>

      <InputErrorIcon v-if="isErrorState" class="e-input__error-icon" />
    </div>

    <div v-if="slots.append" class="e-input__append">
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, nextTick, useSlots } from 'vue'


import { useInputEvent } from './hook'
import { INPUT_EVENT, CHANGE_EVENT, BLUR_EVENT, FOCUS_EVENT, UPDATE_MODEL_VALUE } from './constants'


import type { InputModelValue, BaseSize } from './type'
import { BaseSizeEnum } from './type'

interface InputProps {
  modelValue: InputModelValue
  disabled?: boolean
  placeholder?: string
  size?: BaseSize
  loading?: boolean
  isError?: boolean
}

const props = withDefaults(defineProps<InputProps>(), {
  size: BaseSizeEnum.Medium,
})

const emit = defineEmits([FOCUS_EVENT, BLUR_EVENT, UPDATE_MODEL_VALUE, INPUT_EVENT])

const inputHeight = computed(() => INPUT_HEIGHT[props.size])

const INPUT_HEIGHT = {
  [BaseSizeEnum.Large]: '52px',
  [BaseSizeEnum.Medium]: '44px',
  [BaseSizeEnum.Small]: '32px',
}


const slots = useSlots()
const isErrorState = computed(() => props.isError)

const innerValue = ref<InputModelValue>('')

watch(() => props.modelValue, (val) => {
  innerValue.value = val
})

const handleInput = (event: Event) => {
  emit(UPDATE_MODEL_VALUE, (event.target as HTMLInputElement).value)
}

// const inputRef = ref<HTMLInputElement>()
// const selfValue = ref<InputModelValue>('')
// const focus = ref(false)

// const computedValue = computed<InputModelValue>(() => props.modelValue ?? selfValue.value)
// const inputHeight = computed(() => INPUT_HEIGHT[props.size])
// const isErrorState = computed(() =>  props.isError)

// function updateValue (value: InputModelValue, inner = true) {
//   selfValue.value = value

//   if (inner) {
//     emit(UPDATE_MODEL_VALUE, value)
//   }

//   nextTick(() => {
//     if (inputRef.value && computedValue.value !== inputRef.value.value) {
//       inputRef.value.value = computedValue.value as string
//     }
//   })

//   return value
// }

// const {
//   handleInput,
//   handleBlur,
//   handleFocus,
// } = useInputEvent({
//   updateValue,
//   emit,
// })

// const listeners = computed(() => ({
//   input: handleInput,
//   focus: handleFocus,
//   blur: handleBlur,
// }))

// watch(() => props.modelValue, (val: InputModelValue) => {
//   if (val !== computedValue.value) {
//     updateValue(val ?? '', false)
//   }
// })

// defineExpose({
//   inputRef,
// })
</script>
<script lang="ts">
export default {
  name: 'EInput',
}
</script>

<style lang="scss">
.e-input {
  /* stylelint-disable-next-line value-keyword-case */
  --input-height: v-bind(inputHeight);
  --input-width: 100%;
  --input-border-radius: var(--border-radius-sm);
  --input-border-width: 1px;
  --input-border: var(--input-border-width) solid var(--border-surface-emphasis);

  display: inline-flex;
  align-items: center;
  width: var(--input-width);

  &--append {
    .e-input__wrapper {
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &--prepend {
    .e-input__wrapper {
      border-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  &__error-icon {
    @apply ml-8;
  }

  &__prefix, &__suffix {
    display: inline-flex;
    flex-shrink: 0;
    flex-wrap: nowrap;
    align-items: center;
    height: 100%;
    white-space: nowrap;
    pointer-events: none;
  }

  &__prefix {
    @apply mr-8;
  }

  &__suffix {
    @apply ml-8;
  }
}

.e-input__wrapper {
  @apply py-0 px-12;

  display: inline-flex;
  align-items: center;
  width: inherit;
  height: var(--input-height);
  border: var(--input-border);
  border-radius: var(--input-border-radius);

  &--error {
    border-color: var(--border-status-error);
  }

  &--disabled {
    opacity: 0.6;

    .e-input__inner {
      cursor: not-allowed;
    }
  }
}

// TODO:GF - border-color: var(--border-status-active);
.e-input__wrapper:focus-within {
  border-color: var(--border-status-active);
}

.e-input__inner {
  @apply text-body2;

  width: 100%;
  height: 100%;
  color: var(--content-primary);
  background-color: var(--background-2);
  outline: none;

  // fix: style issue in border cornors
  border-radius: calc(var(--input-border-radius) - var(--input-border-width));

  &::placeholder {
    color: var(--content-tertiary);
  }
}
</style>
