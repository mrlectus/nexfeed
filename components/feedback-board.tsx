"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDownSquare,
  ChevronUpSquare,
  LoaderPinwheelIcon,
  MessageSquare,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProduct } from "@/app/hooks/products";
import { useGetFeedBackByProduct, useVote } from "@/app/hooks/feedback";
import { FeedBackForm } from "./feedback-form";
import { useToast } from "./ui/use-toast";
import { match } from "ts-pattern";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
export default function FeedBackBoard({ id }: { id: bigint }) {
  const product = useGetProduct({ id });
  const feedback = useGetFeedBackByProduct({ id });
  const vote = useVote();
  const { toast } = useToast();
  return (
    <div className="dark min-h-screen bg-slate-950 p-4 lg:p-8 w-screen">
      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[270px,1fr]">
        <div className="space-y-6">
          {match(product.isLoading)
            .with(true, () => (
              <Skeleton className="w-[250px] h-[100px] rounded-2xl bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90" />
            ))
            .with(false, () => (
              <Card className="p-6 bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 border-0">
                <h1 className="text-2xl font-bold text-white">
                  {product.data?.name}
                </h1>
                <p
                  className="text-white/80"
                  dangerouslySetInnerHTML={{
                    __html: product.data?.description
                      ? product.data.description
                      : "",
                  }}
                ></p>
              </Card>
            ))
            .exhaustive()}

          {/* Filters */}
          <Card className="p-6 bg-slate-900 border-slate-800">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-slate-800 hover:bg-slate-700"
              >
                All
              </Badge>
              <Badge
                variant="secondary"
                className="bg-slate-800 hover:bg-slate-700"
              >
                UI
              </Badge>
              <Badge
                variant="secondary"
                className="bg-slate-800 hover:bg-slate-700"
              >
                UX
              </Badge>
              <Badge
                variant="secondary"
                className="bg-slate-800 hover:bg-slate-700"
              >
                Enhancement
              </Badge>
              <Badge
                variant="secondary"
                className="bg-slate-800 hover:bg-slate-700"
              >
                Bug
              </Badge>
              <Badge
                variant="secondary"
                className="bg-slate-800 hover:bg-slate-700"
              >
                Feature
              </Badge>
            </div>
          </Card>
        </div>

        <div className="space-y-4 w-full">
          <div className="bg-slate-900 rounded-lg p-4 flex items-center justify-between border border-slate-800">
            <div className="flex items-center gap-4 text-slate-200">
              <span>{feedback.data?.length} Suggestions</span>
              <Select defaultValue="most">
                <SelectTrigger className="w-[180px] border-0 bg-transparent text-slate-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800">
                  <SelectItem value="most">Most Upvotes</SelectItem>
                  <SelectItem value="least">Least Upvotes</SelectItem>
                  <SelectItem value="comments">Most Comments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <FeedBackForm id={id}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                + Add Feedback
              </Button>
            </FeedBackForm>
          </div>

          {match(feedback.isLoading)
            .with(true, () => <LoaderPinwheelIcon className="animate-spin" />)
            .with(false, () => {
              return feedback.data?.map((feed) => (
                <Card
                  className="p-6 bg-slate-900 border-slate-800"
                  key={feed.id}
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
                              feedbackId: feed.id,
                              upvote: true,
                            },
                            {
                              onSuccess: () => {
                                toast({
                                  description:
                                    "a vote on feedback has been made",
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
                      <span className="font-bold">{Number(feed.upvotes)}</span>
                      <ChevronDownSquare
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                          toast({
                            description: "Please wait for transaction to start",
                          });
                          vote.mutate(
                            {
                              feedbackId: feed.id,
                              upvote: false,
                            },
                            {
                              onSuccess: () => {
                                toast({
                                  description:
                                    "a vote on feedback has been made",
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
                    <Link
                      href={`${Number(id)}/comments/${Number(feed.id)}`}
                      className="flex flex-1"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 text-slate-200">
                          {feed.title}
                        </h3>
                        <p
                          className="text-slate-400 mb-4"
                          dangerouslySetInnerHTML={{ __html: feed.description }}
                        ></p>
                        <Badge
                          variant="secondary"
                          className="bg-slate-800 hover:bg-slate-800 text-slate-200"
                        >
                          {feed.tag}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-bold text-slate-200">
                          {feed.comments.length}
                        </span>
                      </div>
                    </Link>
                  </div>
                </Card>
              ));
            })
            .exhaustive()}
        </div>
      </div>
    </div>
  );
}
