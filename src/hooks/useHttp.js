import { useCallback, useEffect, useState } from "react"

async function sendHttpsRequest(url, config) {

  const response = await fetch(url, config)

  const resData = await response.json()


  if (!response.ok) {
    throw new Error(resData.message || 'Somthing went wrong, failed to send request')

  }

  return resData

}


export default function useHttp(url, config, initialValue) {

  const [data, setData] = useState(initialValue)
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState()

  const sendRequest = useCallback(async function sendRequest() {
    setIsloading(true)
    try {
      const resData = await sendHttpsRequest(url, config)
      setData(resData)
    } catch (error) {
      setError(error.message || 'Something went wrong')
    }
    setIsloading(false)
  }, [url, config])

  useEffect(() => {

    if (config && (config.method === 'GET' || !config.method) || !config) {
      sendRequest()
    }


  }, [sendRequest, config])

  return {
    data,
    isLoading,
    error,
    sendRequest

  }

}