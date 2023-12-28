import { GithubIcon } from 'lucide-react'

import { cn } from '~/lib/utils'

import { buttonVariants } from './ui/button'

import SearchForm from './search-form'
import ThemeToggle from './theme-toggle'

const MasterHeader = () => {
  return (
    <div className='fixed left-0 top-0 z-[99999] flex flex w-full items-center justify-between gap-4 bg-background px-4 py-3'>
      <SearchForm />

      <nav className='flex gap-2'>
        <a
          className={cn(buttonVariants({ variant: 'outline' }))}
          href={process.env.NEXT_PUBLIC_REPOSITORY_URL}
          target='_blank'
          rel='nofollow noreferrer'
        >
          <GithubIcon className='mr-2 inline-block h-5 w-5' />
          GitHub
        </a>

        <ThemeToggle />
      </nav>
    </div>
  )
}

export default MasterHeader
