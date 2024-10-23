// hooks/useDarkMode.ts
import { useEffect, useState } from 'react'

export function useDarkMode() {
  // Initialize with system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    // Create media query for dark mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // Handler for system theme changes
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
      if (e.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    // Add listener for system theme changes
    mediaQuery.addEventListener('change', handleChange)

    // Initial setup
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [isDarkMode])

  return isDarkMode
}
