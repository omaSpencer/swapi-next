'use client'

const HomeError = (props: any) => {
  return (
    <div>
      <p>error: {JSON.stringify(props.error, null, 2)}</p>
    </div>
  )
}

export default HomeError
