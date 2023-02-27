import { computed, Ref } from 'vue'

export function useSourceCode(source: Ref<string> ) {

  const markup = computed(() => {
    return window.Prism.highlight(source.value.replace(/import source from '\.\/.*\.vue\?raw'\r?\n/, ''), window.Prism.languages.html)
  })

  return {
    markup,
  }
}