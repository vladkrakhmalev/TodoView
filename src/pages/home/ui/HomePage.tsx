import { routerConfig } from '@shared/config/router'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

const HomePage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')

    if (code) {
      navigate(`${routerConfig.redirectLogin}?code=${code}`)
    } else {
      navigate(routerConfig.login)
    }
  }, [navigate, searchParams])

  return null
}

export default HomePage
