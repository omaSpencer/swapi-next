'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react'

import type { Films, People, Planets } from '~/types/collections'

import { COLLECTIONS } from '~/lib/constants'
import { cn, getRandomPic } from '~/lib/utils'

import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Button } from './ui/button'

type Props = {
  results?: People[] | Films[] | Planets[]
  count?: number
  next: null | string
  previous: null | string
}

const CardList = ({
  results = [],
  count = 0,
  next,
  previous,
  ...rest
}: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentPage = searchParams.get('page')
  const collection = searchParams.get('collection')
  const searchQuery = searchParams.get('search')

  const allPages = Math.ceil(count / 10)

  const handlePageChange = (pageOffset: number) => {
    const params = new URLSearchParams()

    const newPage = Number(currentPage) + pageOffset
    params.set('collection', collection ?? COLLECTIONS[0].id)
    params.set('page', String(newPage < 1 ? 1 : newPage))
    params.set('search', searchQuery ?? '')

    router.push('/?' + params.toString())
  }

  return (
    <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {count === 0 ? (
        <h3>Not found any results.</h3>
      ) : (
        results.map(({ url, ...rest }) => {
          const _name = (rest as People | Planets).name ?? (rest as Films).title

          return (
            <Card key={url} className='cursor-pointer'>
              <CardHeader>
                <Image
                  src={getRandomPic({
                    width: 400,
                    height: 300,
                  })}
                  alt='random pic'
                  width={400}
                  height={300}
                  className='w-full rounded-lg object-cover object-cover opacity-90 transition-all duration-300 hover:scale-105 hover:opacity-100'
                />
              </CardHeader>
              <CardContent>
                <h2 className='text-2xl font-medium text-foreground transition-all duration-300 hover:text-yellow-500'>
                  {_name}
                </h2>
              </CardContent>
            </Card>
          )
        })
      )}

      {count > 0 && (
        <div className='col-span-full flex items-center justify-between gap-4 pt-8'>
          <Button
            variant='link'
            className={cn('px-0', {
              'opacity-50': !previous,
            })}
            onClick={() => handlePageChange(-1)}
          >
            <ArrowLeftCircleIcon />
          </Button>

          <span className='text-sm font-medium'>
            {currentPage} / {allPages}
          </span>

          <Button
            variant='link'
            className={cn('px-0', {
              'opacity-50': !next,
            })}
            onClick={() => handlePageChange(1)}
          >
            <ArrowRightCircleIcon />
          </Button>
        </div>
      )}
    </section>
  )
}

export default CardList
