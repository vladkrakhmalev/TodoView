import { useMutation, UseMutationOptions, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export const useAuthQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = []
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> => {
  const navigate = useNavigate()
  const query = useQuery(options)

  // TODO Настроить редирект только в случае 401 ошибки

  useEffect(() => {
    if (query.error) {
      console.error(query.error)
      // localStorage.removeItem('accessToken')
      // navigate('/login')
    }
  }, [query.error, navigate])
  
  return query
}

export const useAuthMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  const navigate = useNavigate()
  const mutation = useMutation(options)

  // TODO Настроить редирект только в случае 401 ошибки

  useEffect(() => {
    if (mutation.error) {
      // localStorage.removeItem('accessToken')
      // navigate('/login')
    }
  }, [mutation.error, navigate])

  return mutation
}
