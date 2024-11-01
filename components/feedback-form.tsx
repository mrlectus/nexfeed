"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "./ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Tiptap from "./tiptap";
import { LoaderPinwheelIcon } from "lucide-react";
import { useAddFeedback } from "@/app/hooks/feedback";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Please add more description of your product",
  }),
  tag: z.string().min(1, {
    message: "Please tag the feedback",
  }),
});

export const FeedBackForm = ({
  children,
  id,
}: Readonly<{
  children: React.ReactNode;
  id: any;
}>) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tag: "",
      description: "",
    },
  });
  const feedback = useAddFeedback();
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-y-scroll h-[500px]">
        <DialogHeader>
          <DialogTitle>Gives us details about your product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              feedback.mutate(
                { ...data, id },
                {
                  onSuccess: () => {
                    toast({
                      description: "Your feedback has been added",
                    });
                  },
                  onError: (error) => {
                    console.log("error", error);
                    toast({
                      description: (error.cause as any).reason,
                    });
                  },
                },
              ),
            )}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter what the feedback is about"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback details</FormLabel>
                  <FormControl>
                    <Tiptap onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. Features, Enhancement, UI..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {feedback.isPending ? (
                <LoaderPinwheelIcon className="animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
