'use client'

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { MessagesSquare, Plus, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export function Navigation() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setIsAuthenticated(!!session)
      } catch (error) {
        console.error('Auth check failed:', error)
        toast({
          title: 'Error',
          description: 'Failed to check authentication status',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [toast])

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signOut()
      router.push('/auth')
    } catch (error) {
      console.error('Sign out failed:', error)
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <MessagesSquare className="h-6 w-6" />
            <span className="text-xl font-bold">Q&A ボックス</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button asChild variant="ghost">
                  <Link href="/questions/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Question
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSignOut}
                  disabled={isLoading}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button asChild variant="ghost">
                <Link href="/auth">Sign In</Link>
              </Button>
            )}
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
