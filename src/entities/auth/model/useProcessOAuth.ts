import { useEffect, useState } from 'react'
import {
  TODOIST_CLIENT_ID,
  TODOIST_CLIENT_SECRET,
  TODOIST_REDIRECT_URI,
} from '@shared/config/todoist'
import { useNavigate } from 'react-router'

export const useProcessOAuth = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const urlError = urlParams.get('error')

        if (urlError) {
          setStatus('error')
          setError(`Ошибка авторизации: ${urlError}`)
          return
        }

        if (!code) {
          setStatus('error')
          setError('Не получен код авторизации')
          return
        }

        const response = await fetch('https://todoist.com/oauth/access_token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: TODOIST_CLIENT_ID,
            client_secret: TODOIST_CLIENT_SECRET,
            code,
            redirect_uri: TODOIST_REDIRECT_URI,
          }),
        })
        const data = await response.json()
        localStorage.setItem('accessToken', data?.access_token || '')

        setStatus('success')
        setTimeout(() => {
          navigate('/calendar')
        }, 500)
      } catch (err) {
        setStatus('error')
        setError('Произошла ошибка при обработке авторизации')
        console.error(err)
      }
    }

    processOAuthCallback()
  }, [navigate])

  return { status, error }
}
