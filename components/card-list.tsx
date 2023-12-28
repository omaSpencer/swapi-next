'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import type { Films, People, Planets } from '~/types/collections'

import { getRandomPic } from '~/lib/utils'
import { fetchItem } from '~/lib/data-access'

import { Card, CardContent, CardHeader } from '~/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import Details from './details'
import Pagination from './pagination'

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

  const currentPage = searchParams.get('page')

  const allPages = Math.ceil(count / 10)

  const [isLoading, setIsLoading] = useState(false)
  const [itemDetails, setItemDetails] = useState<
    People | Films | Planets | null
  >(null)

  const handleOpenDialog = async (open: boolean, url: string) => {
    if (!open) {
      document.body.style.overflow = 'auto'
      setItemDetails(null)
      return
    }

    document.body.style.overflow = 'hidden'
    setIsLoading(true)

    const { data, error } = await fetchItem(url)

    if (error) {
      console.error(error)
      setItemDetails(null)
    } else if ('homeworld' in data) {
      const { data: homeworldData, error: homeworldError } = await fetchItem(
        data.homeworld
      )

      if (homeworldError) {
        console.error(homeworldError)
      } else {
        setItemDetails({ ...data, homeworld: homeworldData })
      }
    } else {
      setItemDetails(data)
    }

    setIsLoading(false)
  }

  return (
    <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {count === 0 ? (
        <h3>Not found any results.</h3>
      ) : (
        results.map(({ url, ...rest }, idx) => {
          const _name = (rest as People | Planets).name ?? (rest as Films).title

          return (
            <Dialog
              key={url}
              onOpenChange={(open) => handleOpenDialog(open, url)}
            >
              <DialogTrigger>
                <Card className='cursor-pointer'>
                  <CardHeader>
                    <Image
                      src={getRandomPic({
                        width: 400,
                        height: 300,
                        idx,
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
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className='mb-2 flex items-center gap-2'>
                    {_name} {isLoading && <Loader2 className='animate-spin' />}
                  </DialogTitle>
                  {!!itemDetails && (
                    <DialogDescription className='max-h-[60vh] overflow-y-auto'>
                      <Details item={itemDetails} />
                    </DialogDescription>
                  )}
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )
        })
      )}

      {count > 0 && (
        <Pagination
          next={next}
          previous={previous}
          currentPage={Number(currentPage)}
          allPages={allPages}
        />
      )}
    </section>
  )
}

export default CardList
