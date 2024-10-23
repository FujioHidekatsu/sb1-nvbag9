import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessagesSquare, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Manage Your Q&A Content
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Create, organize, and manage your Q&A content efficiently. Perfect for documentation, FAQs, and knowledge bases.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/questions">
              Browse Questions
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/questions/new">
              Add Question
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <MessagesSquare className="h-8 w-8 mb-4 text-primary" />
            <CardTitle>Q&A Management</CardTitle>
            <CardDescription>
              Create and organize your Q&A content with ease
            </CardDescription>
          </CardHeader>
          <CardContent>
            Efficiently manage your questions and answers with our intuitive interface. Add, edit, and organize content seamlessly.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 mb-4 text-primary" />
            <CardTitle>Team Collaboration</CardTitle>
            <CardDescription>
              Work together with your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            Collaborate with team members to create and maintain your Q&A database. Share knowledge effectively.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 mb-4 text-primary" />
            <CardTitle>Instant Updates</CardTitle>
            <CardDescription>
              Real-time content management
            </CardDescription>
          </CardHeader>
          <CardContent>
            See changes instantly as you update your Q&A content. Keep your knowledge base always up to date.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}