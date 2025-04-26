import { TODOIST_CLIENT_ID, TODOIST_SCOPES, TODOIST_STATE_STRING } from "./config";

export const getAuthorizationUrl = () => {
  const params = new URLSearchParams({
    client_id: TODOIST_CLIENT_ID,
    scope: TODOIST_SCOPES,
    state: TODOIST_STATE_STRING,
  })

  return `https://todoist.com/oauth/authorize?${params.toString()}`
}