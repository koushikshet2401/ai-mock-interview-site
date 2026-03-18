import Vapi from "@vapi-ai/web"

const vapiPublicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY

// Safe mock for when VAPI key is not yet configured
const createMockVapi = () => {
  const listeners = {}

  return {
    on: (event, cb) => {
      listeners[event] = cb
    },
    off: (event) => {
      delete listeners[event]
    },
    start: async () => {
      console.warn("VAPI not configured. Set VITE_VAPI_PUBLIC_KEY in your .env file.")
      // Simulate call start after short delay so UI responds
      setTimeout(() => listeners["call-start"]?.(), 500)
    },
    stop: () => {
      listeners["call-end"]?.()
    },
  }
}

export const vapi = vapiPublicKey
  ? new Vapi(vapiPublicKey)
  : createMockVapi()
  