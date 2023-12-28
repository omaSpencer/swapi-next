'use server'

import { COLLECTION_IDS } from './constants'

export const fetchCollection = async (
  key: COLLECTION_IDS,
  searchQuery?: string,
  page?: number
) => {
  const rootUrl = `${process.env.NEXT_PUBLIC_SWAPI_URL}/${
    key ?? COLLECTION_IDS.PEOPLE
  }?page=${page ?? 1}`
  const fetchUrl = searchQuery ? `${rootUrl}&search=${searchQuery}` : rootUrl

  try {
    const res = await fetch(fetchUrl)

    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.')
    }

    const data = await res.json()

    return {
      data,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
