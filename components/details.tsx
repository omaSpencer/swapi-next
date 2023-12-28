'use client'

import { useMemo } from 'react'

import type { People, Planets, Films } from '~/types/collections'

import { capitalize } from '~/lib/utils'

type Props = {
  item: People | Planets | Films
}

const Details = ({ item }: Props) => {
  const entries = useMemo(
    () =>
      Object.entries(item)
        .map(([key, value]) => {
          const dateTypes = ['created', 'edited']
          const formattedKey = capitalize(key.replace('_', ' '))

          const getFormattedValue = () => {
            switch (true) {
              case Array.isArray(value):
                return value.length
              case typeof value === 'boolean':
                return value ? 'Yes' : 'No'
              case dateTypes.includes(key):
                return new Date(value).toLocaleDateString()
              case key === 'homeworld':
                return {
                  name: value.name,
                  terrain: value.terrain,
                  climate: value.climate,
                }

              default:
                return value
            }
          }

          return {
            key,
            label: formattedKey,
            value: getFormattedValue(),
          }
        })
        .filter(({ key }) => key !== 'url'),
    [item]
  )

  return (
    <>
      {entries.map(({ key, label, value }) => (
        <div key={key} className='mb-4 flex flex-col'>
          <span className='font-bold'>{label}</span>
          {key !== 'homeworld' ? (
            <span>{Array.isArray(value) ? value.length : value}</span>
          ) : (
            <div className='ml-3 flex flex-col'>
              {Object.entries(value).map(([key, val]) => (
                <span key={key} className='flex gap-2'>
                  <span className='min-w-[60px] font-bold'>
                    {capitalize(key)}:
                  </span>
                  <span>{val as string}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default Details
