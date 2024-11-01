"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoaderPinwheelIcon, MessageSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllProducts, useGetProductsCount } from "@/app/hooks/products";
import { match } from "ts-pattern";
import { ProductForm } from "./product-form";
import Link from "next/link";
import { useQueryState } from "nuqs";
import React from "react";

export function ProductBoard() {
  const products = useGetAllProducts();
  const count = useGetProductsCount();
  const [sort, setSort] = useQueryState("sort", {
    defaultValue: "acc",
  });
  const sortedProduct = React.useMemo(() => {
    const newData =
      sort === "acc"
        ? products.data?.toSorted(
            (a, b) => Number(b.feedbackCount) - Number(a.feedbackCount),
          )
        : products.data?.toSorted(
            (a, b) => Number(a.feedbackCount) - Number(b.feedbackCount),
          );
    return newData;
  }, [sort, products?.data]);
  return (
    <div className="dark min-h-screen bg-slate-950 p-4 lg:p-8">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 flex-col">
          <div className="bg-slate-900 rounded-lg p-4 flex items-center justify-between border border-slate-800">
            <div className="flex items-center gap-4 text-slate-200">
              <span>{count?.data ? Number(count.data) : 0} Products</span>
              <Select
                defaultValue="acc"
                onValueChange={(event) => {
                  setSort(event);
                }}
              >
                <SelectTrigger className="w-[180px] border-0 bg-transparent text-slate-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800">
                  <SelectItem value="acc">Most Comments</SelectItem>
                  <SelectItem value="desc">Least Comments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ProductForm>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                + Add Product
              </Button>
            </ProductForm>
          </div>
          {match(products.isLoading)
            .with(true, () => <LoaderPinwheelIcon className="animate-spin" />)
            .with(false, () =>
              sortedProduct?.map((product) => (
                <Link
                  key={Number(product.id)}
                  href={`products/${Number(product.id).toString()}`}
                >
                  <Card className="p-6 bg-slate-900 border-slate-800">
                    <div className="flex gap-10">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 text-slate-200 capitalize">
                          {product.name}
                        </h3>
                        <p
                          className="text-slate-400 mb-4"
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        ></p>
                        {/* <Badge */}
                        {/*   variant="secondary" */}
                        {/*   className="bg-slate-800 hover:bg-slate-800 text-slate-200" */}
                        {/* > */}
                        {/*   {product.category} */}
                        {/* </Badge> */}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-bold text-slate-200">
                          {Number(product.feedbackCount)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              )),
            )
            .exhaustive()}
        </div>
      </div>
    </div>
  );
}
