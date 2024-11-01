import type { Address } from "viem";
import { productContractAbi, feedbackContractAbi } from "./generated";

const deployedAddressProduct = process.env
  .NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS_PRODUCT as Address;

const deployedAddressFeedback = process.env
  .NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS_FEEDBACK as Address;

// Type inference correctly
const ABIP = productContractAbi;
const ABIF = feedbackContractAbi;
export { ABIP, ABIF, deployedAddressProduct, deployedAddressFeedback };
