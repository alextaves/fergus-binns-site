interface TurnstileRenderOptions {
  sitekey: string
  callback?: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
  'timeout-callback'?: () => void
  theme?: 'light' | 'dark' | 'auto'
  appearance?: 'always' | 'execute' | 'interaction-only'
}

interface Window {
  turnstile?: {
    render: (container: HTMLElement | string, options: TurnstileRenderOptions) => string | undefined
    reset: (widgetIdOrContainer?: string | HTMLElement) => void
    remove: (widgetId: string) => void
    getResponse: (widgetId?: string) => string | undefined
  }
  __turnstileReady?: Promise<void>
}
