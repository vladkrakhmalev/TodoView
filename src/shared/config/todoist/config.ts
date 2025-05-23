export const TODOIST_CLIENT_ID = import.meta.env.VITE_TODOIST_CLIENT_ID || ''
export const TODOIST_CLIENT_SECRET =
  import.meta.env.VITE_TODOIST_CLIENT_SECRET || ''
export const TODOIST_REDIRECT_URI =
  import.meta.env.VITE_TODOIST_REDIRECT_URI ||
  'http://localhost:5173/redirect-login'
export const TODOIST_SCOPES = 'data:read_write,data:delete'
export const TODOIST_STATE_STRING =
  import.meta.env.VITE_TODOIST_STATE_STRING || 'todoist-state-string'
