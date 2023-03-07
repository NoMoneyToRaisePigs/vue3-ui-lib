<template>
  <label
    class="fun-checkbox"
    :class="classList"
  >
    <span class="fun-checkbox__check">
      <input
        v-model="innerValue"
        type="checkbox"
        :value="value"
        :name="name"
        :disabled="disabled"
        @change="toggle"
      >
      <span class="fun-checkbox__tick" />
    </span>
    <span class="fun-checkbox__text"><slot>{{ text }}</slot></span>
  </label>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import type { CheckBoxModelValue, CheckboxProps } from './type'
import { UPDATE_MODEL_VALUE } from 'constants/events'
import type { UPDATE_MODEL_VALUE_TYPE } from 'constants/events'


//TODO-GF: WTF, empty interface reuslt in a compiling issue, and vite-plugin-vue-type-imports cause the source map issue !!!
interface Prop extends CheckboxProps {
  ignore?: string
}

const props = withDefaults(defineProps<Prop>(), {
  size: 'medium',
})

const emit = defineEmits<{
  (event:UPDATE_MODEL_VALUE_TYPE, value: CheckBoxModelValue): void
}>()

// const { modelValue } = toRefs(props)

const innerValue = ref(props.modelValue ?? false)
watch(() => props.modelValue, (val) => {
  innerValue.value = val ?? false
})


const classList = computed(() => {
  return [
    `fun-checkbox--${props.size}`,
    {
      'fun-checkbox--reverse': props.reverse,
      'fun-checkbox--disabled': props.disabled,
      'fun-checkbox--top': props.top,
    },
  ]
})


function toggle() {
  emit(UPDATE_MODEL_VALUE, innerValue.value)
}
</script>

<script lang="ts">
export default {
  name: 'ECheckbox',
}
</script>

 <style lang="scss">
.fun-checkbox {
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

      & + .fun-checkbox__tick {
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

    .fun-checkbox__check {
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

    .fun-checkbox__check {
      @apply top-2;
    }
  }

  &--large {
    --checkbox-size: 24px;

    .fun-checkbox__tick {
      top: 5px;
      left: 2px;
      width: 9px;
      height: 16px;
    }

    input:checked {
      & + .fun-checkbox__tick {
        transform: scale(1) rotateZ(37deg);
      }
    }
  }
}
 </style>
