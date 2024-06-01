'use client'

import React from 'react'

import { cn } from '@/lib/utils'

import { people } from './people'

export default function FacesPage() {
  const [activeItem, setActiveItem] = React.useState(3)
  const wrapperRef = React.useRef<HTMLUListElement | null>(null)
  const timeoutRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (!wrapperRef.current) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    wrapperRef.current.style.setProperty(
        '--transition',
        '600ms cubic-bezier(0.22, 0.61, 0.36, 1)',
    )

    // @ts-ignore
    timeoutRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty('--transition')
    }, 900)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [activeItem])

  return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="w-full max-w-full sm:w-[1200px]">
          <ul
              className={cn(
                  'group flex gap-[1.5%]',
                  'h-screen flex-col py-10',
                  'sm:h-[640px] sm:w-[1200px] sm:flex-row',
              )}
              ref={wrapperRef}
          >
            {people.map((person, index) => (
                <li
                    onClick={() => setActiveItem(index)}
                    aria-current={activeItem === index}
                    key={person.name}
                    className={cn(
                        'relative cursor-pointer rounded-2xl',
                        "max-sm:h-[15%] max-sm:first:h-[6%] max-sm:last:h-[6%] max-sm:[&[aria-current='true']]:h-[48%]",
                        "sm:h- sm:h-full sm:w-[8%] sm:first:w-[3%] sm:last:w-[3%] sm:[&[aria-current='true']]:w-[48%]",
                        'max-sm:[transition:height_var(--transition,200ms_ease-in)]',
                        'sm:[transition:width_var(--transition,200ms_ease-in)]',
                        'before:absolute before:bottom-0 before:left-[-10px] before:right-[-10px] before:top-0',
                        'max-sm:[&:not(:hover),&:not(:first),&:not(:last)]:group-hover:h-[7%] max-sm:hover:h-[12%] ',
                        'sm:[&:not(:hover),&:not(:first),&:not(:last)]:group-hover:w-[15%] sm:hover:w-[20%]',
                    )}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#c9c6c7]">
                    <img
                        className="absolute left-1/2 top-1/2 h-[640px] w-[620px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-2xl object-cover grayscale-[50%]"
                        src={person.img}
                        alt={person.name}
                        width="620px"
                        height="640px"
                    />
                  </div>
                </li>
            ))}
          </ul>
        </div>
      </div>
  )
}
