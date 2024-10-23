import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuestionsList } from "@/components/questions/questions-list";

export default function QuestionsPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Questions</h1>
          <p className="text-muted-foreground mt-2">
            Browse questions from the community or ask your own
          </p>
        </div>
        <Button asChild>
          <Link href="/questions/new">Ask a Question</Link>
        </Button>
      </div>
      <QuestionsList />
    </div>
  );
}