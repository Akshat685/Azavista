"use client"

import React from "react"

type Props = {
  message: string
  linkLabel?: string
  linkUrl?: string
  dismissible?: boolean
  fixedTop?: boolean
}

export default function AnnouncementBar({
  message,
  linkLabel,
  linkUrl,
  dismissible = true,
  fixedTop = false,
}: Props) {
  const [visible, setVisible] = React.useState<boolean>(true)
  const [hiddenOnScroll, setHiddenOnScroll] = React.useState<boolean>(false)
  const lastScrollYRef = React.useRef<number>(0)
  const lastDirectionChangeYRef = React.useRef<number>(0)
  const barRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!fixedTop) return
    
    lastScrollYRef.current = window.scrollY || 0
    lastDirectionChangeYRef.current = window.scrollY || 0

    const updateOffset = () => {
      const height = barRef.current?.offsetHeight || 0
      const offset = hiddenOnScroll ? 0 : height
      document.documentElement.style.setProperty('--announcement-offset', `${offset}px`)
      document.body.classList.add('has-announcement')
    }
    updateOffset()

    const onResize = () => updateOffset()
    window.addEventListener('resize', onResize)

    let ticking = false
    const HIDE_DELTA = 50 // Increased threshold for more stable behavior
    const SHOW_DELTA = 10 // Smaller threshold to show quickly when scrolling up
    const MIN_SHOW_Y = 20 // Keep visible near top
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || 0
          const deltaFromLastChange = currentY - lastDirectionChangeYRef.current
          
          lastScrollYRef.current = currentY

          // Always show when near top
          if (currentY <= MIN_SHOW_Y) {
            if (hiddenOnScroll) {
              setHiddenOnScroll(false)
              lastDirectionChangeYRef.current = currentY
            }
          } 
          // Hide when scrolling down significantly
          else if (deltaFromLastChange > HIDE_DELTA && !hiddenOnScroll) {
            setHiddenOnScroll(true)
            lastDirectionChangeYRef.current = currentY
          } 
          // Show when scrolling up
          else if (deltaFromLastChange < -SHOW_DELTA && hiddenOnScroll) {
            setHiddenOnScroll(false)
            lastDirectionChangeYRef.current = currentY
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      document.documentElement.style.removeProperty('--announcement-offset')
      document.body.classList.remove('has-announcement')
    }
  }, [fixedTop, hiddenOnScroll])

  if (!visible) return null

  return (
    <div
      ref={barRef}
      className={
        fixedTop
          ? `w-full bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-[60] transform transition-transform duration-300 ease-in-out ${hiddenOnScroll ? '-translate-y-full' : 'translate-y-0'}`
          : "w-full bg-white border-b border-gray-200"
      }
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center relative px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-md text-gray-600 text-left">
          {message}
          {linkUrl && (
            <>
              {" "} -{"  "}{" "}
              <a
                href={linkUrl}
                className="text-blue-600 hover:underline"
              >
                {linkLabel || linkUrl}
              </a>
            </>
          )}
        </p>

        {dismissible && (
          <button
            aria-label="Dismiss announcement"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-4xl leading-none"
            onClick={() => {
              setVisible(false)
              if (fixedTop) {
                document.documentElement.style.removeProperty('--announcement-offset')
                document.body.classList.remove('has-announcement')
              }
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
