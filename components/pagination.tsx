'use client'

import React from 'react'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { cn } from '~/lib/utils'
import { COLLECTIONS } from '~/lib/constants'

import { Button } from './ui/button'

type Props = {
  next: null | string
  previous: null | string
  currentPage: number
  allPages: number
}

const Pagination = ({ next, previous, currentPage, allPages }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const collection = searchParams.get('collection')
  const searchQuery = searchParams.get('search')

  const handlePageChange = (pageOffset: number) => {
    const params = new URLSearchParams()

    const newPage = Number(currentPage) + pageOffset
    params.set('collection', collection ?? COLLECTIONS[0].id)
    params.set('page', String(newPage < 1 ? 1 : newPage))
    params.set('search', searchQuery ?? '')

    router.push('/?' + params.toString())
  }

  return (
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
  )
}

export default Pagination
