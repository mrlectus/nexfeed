import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import config from "../wagmi";
import { ABIP, deployedAddressProduct } from "../contracts/deployed-contract";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllProducts = () => {
  const getAllProduct = async () => {
    const product = await readContract(config, {
      abi: ABIP,
      address: deployedAddressProduct,
      functionName: "getAllProducts",
      args: [],
    });
    return product;
  };
  return useQuery({
    queryKey: ["all_product"],
    queryFn: getAllProduct,
  });
};

export const useGetProduct = ({ id }: { id: bigint }) => {
  const getProduct = async ({ id }: { id: bigint }) => {
    const product = await readContract(config, {
      abi: ABIP,
      address: deployedAddressProduct,
      functionName: "getProduct",
      args: [id],
    });
    return product;
  };
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct({ id }),
    enabled: !!id,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const addProduct = async ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    const product = await writeContract(config, {
      abi: ABIP,
      address: deployedAddressProduct,
      functionName: "addProduct",
      args: [name, description],
      value: BigInt(0.0003816999 * 1e18),
    });
    return product;
  };
  const transaction = async ({ hash }: { hash: any }) => {
    await waitForTransactionReceipt(config, {
      hash,
    });
  };
  return useMutation({
    mutationKey: ["add_product"],
    mutationFn: async ({
      name,
      description,
    }: {
      name: string;
      description: string;
    }) => {
      const hash = await addProduct({ name, description });
      return await transaction({ hash });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["all_product"],
      });
    },
  });
};

export const useGetProductsCount = () => {
  const getProductCount = async () => {
    const product = await readContract(config, {
      abi: ABIP,
      address: deployedAddressProduct,
      functionName: "productCount",
      args: [],
    });
    return product;
  };
  return useQuery({
    queryKey: ["product_count"],
    queryFn: getProductCount,
  });
};
