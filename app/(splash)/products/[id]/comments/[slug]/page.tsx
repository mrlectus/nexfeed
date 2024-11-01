import { CommentBoard } from "@/components/comment-board";

const CommentPage = ({ params }: { params: { slug: bigint; id: bigint } }) => {
  return (
    <main className="w-screen min-h-screen">
      <CommentBoard id={params.slug} productId={params.id} />
    </main>
  );
};

export default CommentPage;
