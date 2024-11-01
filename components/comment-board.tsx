"use client";
import { match } from "ts-pattern";
import {
  ArrowLeft,
  ChevronDownSquare,
  ChevronUpSquare,
  LoaderPinwheelIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  useCommentOnFeedBack,
  useGetFeedbackById,
  useGetFeedBackByProduct,
  useVote,
} from "@/app/hooks/feedback";
import { useToast } from "./ui/use-toast";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  text: z.string().min(10, {
    message: "Comment must be at least 10 characters.",
  }),
});
export function CommentBoard({
  id,
  productId,
}: {
  id: bigint;
  productId: bigint;
}) {
  console.log("slug", id);
  console.log("id", productId);
  const feed = useGetFeedbackById({ id });
  const feedback = useGetFeedBackByProduct({ id: productId });
  const feedMemo = React.useMemo(
    () => feedback?.data?.filter((feed) => Number(feed.id) === Number(id)),
    [feedback.data, id],
  );

  const router = useRouter();
  const { toast } = useToast();
  const vote = useVote();
  const comment = useCommentOnFeedBack();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 bg-gray-900 text-white">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
        <Button
          disabled
          title="coming soon"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Edit Feedback
        </Button>
      </div>
      {match(feed.isLoading)
        .with(true, () => (
          <Skeleton className="p-6 bg-black/40 border-slate-800 w-[630px] h-[140px]" />
        ))
        .with(false, () => (
          <Card
            className="p-6 bg-slate-900 border-slate-800"
            key={feed.data?.id}
          >
            <div className="flex gap-10 relative">
              <div className="h-auto z-10 rounded-xl drop-shadow-xl items-center flex-col flex justify-between py-2 px-3 space-y-1 bg-slate-800 hover:bg-slate-700 text-slate-200">
                <ChevronUpSquare
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => {
                    toast({
                      description: "Please wait for transaction to start",
                    });
                    vote.mutate(
                      {
                        feedbackId: feed.data?.id,
                        upvote: true,
                      },
                      {
                        onSuccess: () => {
                          toast({
                            description: "a vote on feedback has been made",
                          });
                        },
                        onError: (error) => {
                          console.log("error", error);
                          toast({
                            description: (error.cause as any).reason,
                          });
                        },
                      },
                    );
                  }}
                />
                <span className="font-bold">{Number(feed.data?.upvotes)}</span>
                <ChevronDownSquare
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => {
                    toast({
                      description: "Please wait for transaction to start",
                    });
                    vote.mutate(
                      {
                        feedbackId: feed.data?.id,
                        upvote: false,
                      },
                      {
                        onSuccess: () => {
                          toast({
                            description: "a vote on feedback has been made",
                          });
                        },
                        onError: (error) => {
                          console.log("error", error);
                          toast({
                            description: (error.cause as any).reason,
                          });
                        },
                      },
                    );
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 text-slate-200">
                  {feed.data?.title}
                </h3>
                <p
                  className="text-slate-400 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: feed.data?.description ? feed.data.description : "",
                  }}
                ></p>
                <Badge
                  variant="secondary"
                  className="bg-slate-800 hover:bg-slate-800 text-slate-200"
                >
                  {feed.data?.tag}
                </Badge>
              </div>
            </div>
          </Card>
        ))
        .exhaustive()}
      <div className="space-y-6">
        <h3 className="font-bold text-lg text-white">
          {feedMemo?.[0]?.comments.length ?? 0} Comments
        </h3>
        <div className="space-y-6">
          {feedMemo?.[0].comments?.map((comment) => (
            <div key={crypto.randomUUID()} className="flex gap-4">
              <Avatar className="w-10 h-10"></Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white">Annoymous</h4>
                    <p className="text-gray-300">
                      @{comment.commenter.slice(0, 7)}
                    </p>
                  </div>
                  {/* <Button variant="link" className="text-blue-400"> */}
                  {/*   Reply */}
                  {/* </Button> */}
                </div>
                <p className="mt-2 text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 w-full">
        <h3 className="font-bold text-lg text-white">Add Comment</h3>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((data) =>
              comment.mutate(
                { ...data, feedbackId: id },
                {
                  onSuccess: () => {
                    toast({
                      description: "Comment added",
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
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      maxLength={250}
                      placeholder="Type your comment here"
                      className="min-h-[100px] bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                {250 - (form?.watch("text") ? form.watch("text").length : 0)}{" "}
                Characters left
              </span>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                {comment.isPending ? (
                  <LoaderPinwheelIcon className="animate-spin" />
                ) : (
                  "Post Comment"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
