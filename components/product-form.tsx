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
import { useAddProduct } from "@/app/hooks/products";
import { LoaderPinwheelIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Please add more description of your product",
  }),
});

export const ProductForm = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const product = useAddProduct();
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gives us details about your product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              product.mutate(data, {
                onSuccess: () => {
                  toast({
                    description: "Product has been added",
                  });
                },
                onError: (error) => {
                  console.log("error", error);
                  toast({
                    description: (error.cause as any).reason,
                  });
                },
              }),
            )}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a name for the product"
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
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Tiptap onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {product.isPending ? (
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
