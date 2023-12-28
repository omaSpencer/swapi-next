import { notFound } from 'next/navigation'

import { COLLECTION_IDS } from '~/lib/constants'
import { capitalize } from '~/lib/utils'
import { fetchCollection } from '~/lib/data-access'

import CardList from '~/components/card-list'

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const { collection, search, page } = searchParams

  const { data, error } = await fetchCollection(
    collection as COLLECTION_IDS,
    search,
    Number(page ?? 1)
  )

  if (error) {
    console.error(error)
    notFound()
  }

  return (
    <main className='min-h-screen px-4 py-24'>
      <h1 className='mb-8 text-center text-6xl font-semibold'>
        {capitalize(collection ?? COLLECTION_IDS.PEOPLE)}
      </h1>

      <CardList {...data} />
    </main>
  )
}

export default Home
