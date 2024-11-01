import { ProductBoard } from "@/components/product-board";
import { Suspense } from "react";

const ProductPage = () => {
  return (
    <Suspense>
      <main className="flex max-h-screen grow flex-col overflow-hidden">
        <ProductBoard />
      </main>
    </Suspense>
  );
};

export default ProductPage;
