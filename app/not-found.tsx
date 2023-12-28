import Link from 'next/link'

import { cn } from '~/lib/utils'
import { buttonVariants } from '~/components/ui/button'

const NotfoundPage = () => {
  return (
    <section className='mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 py-24 text-foreground'>
      <h1 className='flex items-center gap-3 text-8xl text-muted-foreground'>
        404
      </h1>

      <p className='mx-auto w-full max-w-prose px-6 text-center'>
        The page you are looking for does not exist or has been moved.
      </p>

      <div>
        <Link href='/' className={cn(buttonVariants({ variant: 'default' }))}>
          Go back home
        </Link>
      </div>
    </section>
  )
}

export default NotfoundPage
