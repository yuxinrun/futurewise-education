import { useCallback, useEffect, useState } from 'react'
import { readStore, writeStore } from './storage'

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => readStore(key, initial))

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
        writeStore(key, resolved)
        return resolved
      })
    },
    [key],
  )

  return [value, update] as const
}

export interface FavoriteItem {
  id: string
  title: string
  route: string
  type: string
  savedAt: string
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>('favorites', [])

  const isFavorite = useCallback((id: string) => favorites.some((f) => f.id === id), [favorites])

  const toggle = useCallback(
    (item: Omit<FavoriteItem, 'savedAt'>) => {
      setFavorites((prev) => {
        if (prev.some((f) => f.id === item.id)) return prev.filter((f) => f.id !== item.id)
        return [{ ...item, savedAt: new Date().toISOString() }, ...prev]
      })
    },
    [setFavorites],
  )

  return { favorites, isFavorite, toggle, setFavorites }
}

export interface RecentItem {
  id: string
  title: string
  route: string
  type: string
  visitedAt: string
}

export function useRecent() {
  const [recent, setRecent] = useLocalStorage<RecentItem[]>('recent', [])

  const push = useCallback(
    (item: Omit<RecentItem, 'visitedAt'>) => {
      setRecent((prev) => {
        const filtered = prev.filter((r) => r.id !== item.id)
        return [{ ...item, visitedAt: new Date().toISOString() }, ...filtered].slice(0, 12)
      })
    },
    [setRecent],
  )

  return { recent, push }
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      setProgress(total > 0 ? Math.min(1, doc.scrollTop / total) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return progress
}

export function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    if (!ids.length) return
    const onScroll = () => {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids.join('|')])
  return active
}
