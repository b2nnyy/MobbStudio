export function jsonp<T>(
  url: string,
  {
    timeoutMs = 12000,
    callbackParam = 'callback',
  }: { timeoutMs?: number; callbackParam?: string } = {},
): Promise<T> {
  return new Promise((resolve, reject) => {
    const cbName = `__jsonp_${Math.random().toString(36).slice(2)}`
    const sep = url.includes('?') ? '&' : '?'
    const fullUrl = `${url}${sep}${callbackParam}=${encodeURIComponent(cbName)}`

    let done = false
    const cleanup = (script?: HTMLScriptElement) => {
      if (done) return
      done = true
      // @ts-expect-error - dynamic callback cleanup
      delete window[cbName]
      if (script?.parentNode) script.parentNode.removeChild(script)
    }

    const t = window.setTimeout(() => {
      cleanup(s)
      reject(new Error('JSONP timeout'))
    }, timeoutMs)

    // @ts-expect-error - dynamic callback assignment
    window[cbName] = (data: T) => {
      window.clearTimeout(t)
      cleanup(s)
      resolve(data)
    }

    const s = document.createElement('script')
    s.src = fullUrl
    s.async = true
    s.onerror = () => {
      window.clearTimeout(t)
      cleanup(s)
      reject(new Error('JSONP load error'))
    }
    document.head.appendChild(s)
  })
}

