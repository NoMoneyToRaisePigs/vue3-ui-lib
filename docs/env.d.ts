export {}

declare global {
  interface Window {
    Prism: {
      highlight: (e, n) => string
      languages: {
        html: Record<string, undefined>
      }
    }
  }
}
