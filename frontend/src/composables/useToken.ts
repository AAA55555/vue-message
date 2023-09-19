const TOKEN = 'directus_refresh_token'

type PayloadType = {
  refresh_token: string
  expires: number
}

export default function () {
  const saveToken = (payload: PayloadType): void => {
    document.cookie = `${TOKEN}=${payload.refresh_token}; expires=${new Date(
      payload.expires
    ).toUTCString()};`
  }

  const getToken = (): string | null => {
    const cookieValue = document.cookie.match('(^|;) ?' + TOKEN + '=([^;]*)(;|$)')
    return cookieValue ? decodeURIComponent(cookieValue[2]) : null
  }

  const destroyToken = (): void => {
    document.cookie = `${TOKEN}=${getToken()}; max-age=-1;`
  }

  return {
    saveToken,
    getToken,
    destroyToken
  }
}
