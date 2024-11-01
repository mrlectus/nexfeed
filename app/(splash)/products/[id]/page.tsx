import { FeedBackBoard } from "@/components/feedback-board";

const SingleProdectPage = async ({ params }: { params: { id: bigint } }) => {
  return (
    <main>
      <FeedBackBoard id={params.id} />
    </main>
  );
};

export default SingleProdectPage;
