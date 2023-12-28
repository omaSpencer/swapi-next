'use client'

import { useCallback, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CogIcon, SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { SearchQuerySchema, type SearchQuerySchemaType } from '~/lib/scheme'
import { cn } from '~/lib/utils'
import { COLLECTIONS } from '~/lib/constants'

import { Input } from './ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from './ui/dropdown-menu'

type Props = {}

const SearchForm = (props: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('search')
  const collection = searchParams.get('collection')
  const currentPage = searchParams.get('page')

  const [selectedCollection, setSelectedCollection] = useState(
    collection ?? COLLECTIONS[0].id
  )

  const form = useForm<SearchQuerySchemaType>({
    resolver: zodResolver(SearchQuerySchema),
    defaultValues: {
      query: '',
    },
  })

  const onSubmit = useCallback(
    async ({ query }: SearchQuerySchemaType) => {
      console.log(query)
      console.log(collection)

      //* TODO: Implement search
    },
    [collection]
  )

  const addDefaultParams = useCallback(() => {
    const params = new URLSearchParams()

    params.set('collection', collection ?? COLLECTIONS[0].id)
    params.set('page', currentPage ?? '1')

    router.push('/?' + params.toString())
  }, [collection, currentPage, router])

  useEffect(() => {
    form.setValue('query', searchQuery ?? '')
  }, [searchQuery, form])

  useEffect(() => {
    addDefaultParams()
  }, [addDefaultParams])

  useEffect(() => {
    if (selectedCollection !== collection) {
      const params = new URLSearchParams()

      params.set('collection', selectedCollection)
      params.set('page', '1')

      router.push('/?' + params.toString())
    }
  }, [selectedCollection, collection, router])

  return (
    <div className='w-full max-w-sm'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='relative'>
          <FormField
            control={form.control}
            name='query'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Search' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type='button'
                className={cn(
                  'absolute right-8 top-0 opacity-60 transition-opacity duration-300 hover:opacity-100'
                )}
                variant='link'
                size='icon'
              >
                <CogIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>Collections</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedCollection}
                onValueChange={setSelectedCollection}
              >
                {COLLECTIONS.map(({ id, title }) => (
                  <DropdownMenuRadioItem key={id} value={id}>
                    {title}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            type='submit'
            className={cn(
              'absolute right-0 top-0 opacity-60 transition-opacity duration-300 hover:opacity-100'
            )}
            variant='link'
            size='icon'
          >
            <SearchIcon />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SearchForm
