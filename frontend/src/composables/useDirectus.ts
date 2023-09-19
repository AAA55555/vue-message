import { createDirectus, readItems, rest, withToken } from '@directus/sdk'
import { Directus } from '@/common/constants'
import { useAuthStore } from '@/stores/auth.store'

type CollectionType = {
  name: string
  query: object
}

export default function async() {
  const store = useAuthStore()

  return async ({ name, query }: CollectionType) => {
    const client = createDirectus(Directus.BASE_URL).with(rest())
    if (store.paramsAuth) {
      return await client.request(withToken(store.paramsAuth.access_token, readItems(name, query)))
    }
  }
}
