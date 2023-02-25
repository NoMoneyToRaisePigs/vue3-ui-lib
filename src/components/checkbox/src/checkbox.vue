<template>
  <label
    class="e-checkbox"
    :class="classList"
  >
    <span class="e-checkbox__check">
      <input
        v-model="innerValue"
        type="checkbox"
        :value="value"
        :name="name"
        :disabled="disabled"
        @change="toggle"
      >
      <span class="e-checkbox__tick" />
    </span>
    <span class="e-checkbox__text"><slot>{{ text }}</slot></span>
  </label>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

//  import { UPDATE_MODEL_VALUE, UPDATE_MODEL_VALUE_TYPE } from '@/constants/events'

//  import type { CheckboxProps, CheckBoxModelValue } from '@/types/Checkbox'

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

export type UPDATE_MODEL_VALUE_TYPE = 'update:modelValue' | 'update:model-value'

const UPDATE_MODEL_VALUE = 'update:modelValue'

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  validateEvent: true,
  size: 'medium',
})

const innerValue = ref(false)

const emit = defineEmits<{
  (event:UPDATE_MODEL_VALUE_TYPE, value: CheckBoxModelValue): void
}>()

const classList = computed(() => {
  return [
    `e-checkbox--${props.size}`,
    {
      'e-checkbox--reverse': props.reverse,
      'e-checkbox--disabled': props.disabled,
      'e-checkbox--top': props.top,
    },
  ]
})


function toggle () {
  emit(UPDATE_MODEL_VALUE, props.modelValue)
}
</script>
<script lang="ts">
export default {
  name: 'ECheckbox',
}
</script>

 <style lang="scss">
.e-checkbox {
  --checkbox-size: 16px;

  @apply text-subhead3;

  position: relative;
  display: inline-flex;
  align-items: center;
  color: var(--content-primary);
  cursor: pointer;
  user-select: none;

  input {
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    border: 1px solid var(--border-button-secondary);
    border-radius: var(--border-radius-xs);
    box-shadow: none;
    appearance: none;

    &:checked {
      background-color: var(--background-status-active-bold);
      border: none;

      & + .e-checkbox__tick {
        transform: scale(0.85) rotateZ(37deg);
      }
    }
  }

  &__check {
    @apply mr-8;

    position: relative;
    display: flex;
    flex-shrink: 0;
  }

  &__tick {
    position: absolute;
    top: 2px;
    left: 0;
    width: 7px;
    height: 12px;
    border: 2px solid var(--border-surface-forced-white);
    border-top: none;
    border-left: none;
    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale(0) rotateZ(37deg);
    transform-origin: 135% 90%;
  }

  &--reverse {
    flex-direction: row-reverse;

    .e-checkbox__check {
      @apply mr-0 ml-8;
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    input[type="checkbox"] {
      cursor: not-allowed;
    }
  }

  &--top {
    align-items: flex-start;

    .e-checkbox__check {
      @apply top-2;
    }
  }

  &--large {
    --checkbox-size: 24px;

    .e-checkbox__tick {
      top: 5px;
      left: 2px;
      width: 9px;
      height: 16px;
    }

    input:checked {
      & + .e-checkbox__tick {
        transform: scale(1) rotateZ(37deg);
      }
    }
  }
}
 </style>
