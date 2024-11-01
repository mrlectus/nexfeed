import { ABIF, deployedAddressFeedback } from "../contracts/deployed-contract";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import config from "../wagmi";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";

export const useGetFeedBackByProduct = ({
  id,
  tags,
}: {
  id: bigint;
  tags?: Array<string> | null;
}) => {
  const getFeedBackByProduct = async ({ id }: { id: bigint }) => {
    const feedbacks = await readContract(config, {
      abi: ABIF,
      address: deployedAddressFeedback,
      functionName: "getFeedbackByProduct",
      args: [id],
    });
    return feedbacks;
  };
  return useQuery({
    queryKey: ["feedbacks", Number(id)],
    queryFn: () => getFeedBackByProduct({ id }),
    select: (tag) => (!tags ? tag : tag?.filter((t) => tags?.includes(t.tag))),
    enabled: !!id,
  });
};

export const useAddFeedback = () => {
  const queryClient = useQueryClient();
  const addFeedback = async ({
    id,
    title,
    description,
    tag,
  }: {
    id: any;
    title: string;
    description: string;
    tag: string;
  }) => {
    const feedback = await writeContract(config, {
      abi: ABIF,
      address: deployedAddressFeedback,
      functionName: "postFeedback",
      args: [id, title, description, tag],
      value: BigInt(0.00003937 * 1e18),
    });
    return feedback;
  };
  const transaction = async ({ hash }: { hash: any }) => {
    await waitForTransactionReceipt(config, {
      hash,
    });
  };
  return useMutation({
    mutationKey: ["add_feedback"],
    mutationFn: async ({
      id,
      title,
      description,
      tag,
    }: {
      id: any;
      tag: string;
      title: string;
      description: string;
    }) => {
      const hash = await addFeedback({ id, tag, title, description });
      return await transaction({ hash });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedbacks"],
      });
    },
  });
};

export const useVote = () => {
  const queryClient = useQueryClient();
  const vote = async ({
    feedbackId,
    upvote,
  }: {
    feedbackId: any;
    upvote: boolean;
  }) => {
    const feedback = await writeContract(config, {
      abi: ABIF,
      address: deployedAddressFeedback,
      functionName: "voteFeedback",
      args: [feedbackId, upvote],
      value: BigInt(0.00007874 * 1e18),
    });
    return feedback;
  };
  const transaction = async ({ hash }: { hash: any }) => {
    await waitForTransactionReceipt(config, {
      hash,
    });
  };
  return useMutation({
    mutationKey: ["vote"],
    mutationFn: async ({
      feedbackId,
      upvote,
    }: {
      feedbackId: any;
      upvote: boolean;
    }) => {
      const hash = await vote({ feedbackId, upvote });
      return await transaction({ hash });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedbacks"],
      });
    },
  });
};

export const useGetFeedbackById = ({ id }: { id: bigint }) => {
  const getFeedbackById = async ({ id }: { id: bigint }) => {
    const feedback = await readContract(config, {
      abi: ABIF,
      address: deployedAddressFeedback,
      functionName: "feedbacks",
      args: [id],
    });
    const data = feedback;
    return {
      id: Number(data[0]),
      productId: Number(data[1]),
      author: data[2],
      title: data[3],
      description: data[4],
      tag: data[5],
      upvotes: Number(data[6]),
      downvotes: Number(data[7]),
    };
  };
  return useQuery({
    queryKey: ["feedback", Number(id)],
    queryFn: () => getFeedbackById({ id }),
    enabled: !!id,
  });
};

export const useCommentOnFeedBack = () => {
  const queryClient = useQueryClient();
  const commentOnFeedback = async ({
    feedbackId,
    text,
  }: {
    feedbackId: any;
    text: string;
  }) => {
    const comment = await writeContract(config, {
      abi: ABIF,
      address: deployedAddressFeedback,
      functionName: "commentOnFeedback",
      args: [feedbackId, text],
      value: BigInt(0.00003937 * 1e18),
    });
    return comment;
  };
  const transaction = async ({ hash }: { hash: any }) => {
    await waitForTransactionReceipt(config, {
      hash,
    });
  };
  return useMutation({
    mutationKey: ["add_feedback"],
    mutationFn: async ({
      feedbackId,
      text,
    }: {
      feedbackId: any;
      text: string;
    }) => {
      const hash = await commentOnFeedback({ feedbackId, text });
      return await transaction({ hash });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedbacks"],
      });
    },
  });
};
