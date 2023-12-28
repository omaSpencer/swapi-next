import React from 'react'

import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'

const HomeLoading = () => {
  return (
    <main className='min-h-screen px-4 py-24'>
      <Skeleton className='mx-auto mb-8 h-[64px] w-[300px]' />

      <section className='grid grid-cols-4 gap-4'>
        {Array.from({ length: 8 }).map((_, id) => (
          <Card key={id} className='cursor-pointer'>
            <CardHeader>
              <Skeleton className='h-[300px] w-full rounded-lg' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-[32px] w-full rounded-sm' />
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}

export default HomeLoading
