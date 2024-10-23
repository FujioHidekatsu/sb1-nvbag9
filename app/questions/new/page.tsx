"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const questionSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must not exceed 200 characters"),
  content: z
    .string()
    .min(20, "Question must be at least 20 characters")
    .max(5000, "Question must not exceed 5000 characters"),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

export default function NewQuestion() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: QuestionFormValues) => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be signed in to post a question",
          variant: "destructive",
        });
        router.push("/auth");
        return;
      }

      const { error } = await supabase
        .from("questions")
        .insert([
          {
            title: values.title,
            content: values.content,
            user_id: user.id,
          },
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Your question has been posted successfully",
      });
      
      router.push("/questions");
      router.refresh();
    } catch (error) {
      console.error("Error posting question:", error);
      toast({
        title: "Error",
        description: "Failed to post your question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Ask a Question</h1>
        <p className="text-muted-foreground mt-2">
          Get help from the community by asking a clear, detailed question
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What's your question? Be specific."
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide all the details needed to help others understand your question..."
                    className="min-h-[200px]"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post Question"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}