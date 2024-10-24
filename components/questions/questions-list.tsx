'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

interface Question {
  id: string
  title: string
  content: string
  created_at: string
  user_id: string
  profiles: {
    username: string
  } | null
}

export function QuestionsList() {
  console.log('QuestionsList')
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        // 現在のユーザーのセッションを取得
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()
        if (sessionError) throw sessionError

        if (!session) {
          setError('ログインしていません。')
          setIsLoading(false)
          return
        }
        const userId = session.user.id
        // ユーザーIDに基づいて質問をフィルタリング
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) throw error
        console.log('Fetched questions:', data)
        setQuestions(data || [])
      } catch (error) {
        console.error('Error fetching questions:', error)
        setError('質問の取得中にエラーが発生しました。')
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  if (isLoading) {
    return <div>Loading questions...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }
  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No questions have been asked yet.
        </p>
        <Button asChild className="mt-4">
          <Link href="/questions/new">Ask the First Question</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card key={question.id}>
          <CardHeader>
            <Link href={`/questions/${question.id}`}>
              <CardTitle className="hover:text-primary cursor-pointer">
                {question.title}
              </CardTitle>
            </Link>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(question.created_at), {
                addSuffix: true,
              })}
              に投稿
            </div>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3">{question.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
