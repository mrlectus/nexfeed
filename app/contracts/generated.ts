import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FeedbackContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const feedbackContractAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_productContractAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'commentFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_feedbackId', internalType: 'uint256', type: 'uint256' },
      { name: '_text', internalType: 'string', type: 'string' },
    ],
    name: 'commentOnFeedback',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feedbackCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feedbackFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'feedbacks',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'productId', internalType: 'uint256', type: 'uint256' },
      { name: 'author', internalType: 'address', type: 'address' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'tag', internalType: 'string', type: 'string' },
      { name: 'upvotes', internalType: 'uint256', type: 'uint256' },
      { name: 'downvotes', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_productId', internalType: 'uint256', type: 'uint256' }],
    name: 'getFeedbackByProduct',
    outputs: [
      {
        name: '',
        internalType: 'struct FeedbackContract.FeedbackView[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'productId', internalType: 'uint256', type: 'uint256' },
          { name: 'author', internalType: 'address', type: 'address' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'tag', internalType: 'string', type: 'string' },
          { name: 'upvotes', internalType: 'uint256', type: 'uint256' },
          { name: 'downvotes', internalType: 'uint256', type: 'uint256' },
          {
            name: 'comments',
            internalType: 'struct FeedbackContract.Comment[]',
            type: 'tuple[]',
            components: [
              { name: 'commenter', internalType: 'address', type: 'address' },
              { name: 'text', internalType: 'string', type: 'string' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_productId', internalType: 'uint256', type: 'uint256' },
      { name: '_title', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
      { name: '_tag', internalType: 'string', type: 'string' },
    ],
    name: 'postFeedback',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'productContract',
    outputs: [
      { name: '', internalType: 'contract ProductContract', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'productFeedbacks',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'upvoteFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_feedbackId', internalType: 'uint256', type: 'uint256' },
      { name: '_upvote', internalType: 'bool', type: 'bool' },
    ],
    name: 'voteFeedback',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feedbackId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'commenter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'text', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'CommentAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feedbackId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'productId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'author',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'title', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'description',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      { name: 'tag', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'FeedbackPosted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feedbackId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'upvote', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'voter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'FeedbackVoted',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ProductContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const productContractAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
    ],
    name: 'addProduct',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'addProductFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllProducts',
    outputs: [
      {
        name: '',
        internalType: 'struct ProductContract.Product[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'creator', internalType: 'address', type: 'address' },
          { name: 'feedbackCount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_productId', internalType: 'uint256', type: 'uint256' }],
    name: 'getProduct',
    outputs: [
      {
        name: '',
        internalType: 'struct ProductContract.Product',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'creator', internalType: 'address', type: 'address' },
          { name: 'feedbackCount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_productId', internalType: 'uint256', type: 'uint256' }],
    name: 'incrementFeedbackCount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'productCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'products',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'feedbackCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'productId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FeedbackAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'productId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'description',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'ProductAdded',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link feedbackContractAbi}__
 */
export const useReadFeedbackContractundefined =
  /*#__PURE__*/ createUseReadContract({ abi: feedbackContractAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"commentFee"`
 */
export const useReadFeedbackContractCommentFee =
  /*#__PURE__*/ createUseReadContract({
    abi: feedbackContractAbi,
    functionName: 'commentFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"feedbackCount"`
 */
export const useReadFeedbackContractFeedbackCount =
  /*#__PURE__*/ createUseReadContract({
    abi: feedbackContractAbi,
    functionName: 'feedbackCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"feedbackFee"`
 */
export const useReadFeedbackContractFeedbackFee =
  /*#__PURE__*/ createUseReadContract({
    abi: feedbackContractAbi,
    functionName: 'feedbackFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"feedbacks"`
 */
export const useReadFeedbackContractFeedbacks =
  /*#__PURE__*/ createUseReadContract({
    abi: feedbackContractAbi,
    functionName: 'feedbacks',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"getFeedbackByProduct"`
 */
export const useReadFeedbackContractGetFeedbackByProduct =
  /*#__PURE__*/ createUseReadContract({
    abi: feedbackContractAbi,
    functionName: 'getFeedbackByProduct',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"owner"`
 */
export const useReadFeedbackContractOwner = /*#__PURE__*/ createUseReadContract(
  { abi: feedbackContractAbi, functionName: 'owner' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"productContract"`
 */
export const useReadFeedbackContractProductContract =
  /*#__PURE__*/ createUseReadContract({
    abi: feedbackContractAbi,
    functionName: 'productContract',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"productFeedbacks"`
 */
export const useReadFeedbackContractProductFeedbacks =
  /*#__PURE__*/ createUseReadContract({
    abi: feedbackContractAbi,
    functionName: 'productFeedbacks',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"upvoteFee"`
 */
export const useReadFeedbackContractUpvoteFee =
  /*#__PURE__*/ createUseReadContract({
    abi: feedbackContractAbi,
    functionName: 'upvoteFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link feedbackContractAbi}__
 */
export const useWriteFeedbackContractundefined =
  /*#__PURE__*/ createUseWriteContract({ abi: feedbackContractAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"commentOnFeedback"`
 */
export const useWriteFeedbackContractCommentOnFeedback =
  /*#__PURE__*/ createUseWriteContract({
    abi: feedbackContractAbi,
    functionName: 'commentOnFeedback',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"postFeedback"`
 */
export const useWriteFeedbackContractPostFeedback =
  /*#__PURE__*/ createUseWriteContract({
    abi: feedbackContractAbi,
    functionName: 'postFeedback',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"voteFeedback"`
 */
export const useWriteFeedbackContractVoteFeedback =
  /*#__PURE__*/ createUseWriteContract({
    abi: feedbackContractAbi,
    functionName: 'voteFeedback',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"withdrawFees"`
 */
export const useWriteFeedbackContractWithdrawFees =
  /*#__PURE__*/ createUseWriteContract({
    abi: feedbackContractAbi,
    functionName: 'withdrawFees',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link feedbackContractAbi}__
 */
export const useSimulateFeedbackContractundefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: feedbackContractAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"commentOnFeedback"`
 */
export const useSimulateFeedbackContractCommentOnFeedback =
  /*#__PURE__*/ createUseSimulateContract({
    abi: feedbackContractAbi,
    functionName: 'commentOnFeedback',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"postFeedback"`
 */
export const useSimulateFeedbackContractPostFeedback =
  /*#__PURE__*/ createUseSimulateContract({
    abi: feedbackContractAbi,
    functionName: 'postFeedback',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"voteFeedback"`
 */
export const useSimulateFeedbackContractVoteFeedback =
  /*#__PURE__*/ createUseSimulateContract({
    abi: feedbackContractAbi,
    functionName: 'voteFeedback',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link feedbackContractAbi}__ and `functionName` set to `"withdrawFees"`
 */
export const useSimulateFeedbackContractWithdrawFees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: feedbackContractAbi,
    functionName: 'withdrawFees',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link feedbackContractAbi}__
 */
export const useWatchFeedbackContractundefined =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: feedbackContractAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link feedbackContractAbi}__ and `eventName` set to `"CommentAdded"`
 */
export const useWatchFeedbackContractCommentAdded =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: feedbackContractAbi,
    eventName: 'CommentAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link feedbackContractAbi}__ and `eventName` set to `"FeedbackPosted"`
 */
export const useWatchFeedbackContractFeedbackPosted =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: feedbackContractAbi,
    eventName: 'FeedbackPosted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link feedbackContractAbi}__ and `eventName` set to `"FeedbackVoted"`
 */
export const useWatchFeedbackContractFeedbackVoted =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: feedbackContractAbi,
    eventName: 'FeedbackVoted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useReadIMulticall3undefined = /*#__PURE__*/ createUseReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getBasefee' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getChainId' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useWriteIMulticall3undefined =
  /*#__PURE__*/ createUseWriteContract({ abi: iMulticall3Abi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useSimulateIMulticall3undefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: iMulticall3Abi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link productContractAbi}__
 */
export const useReadProductContractundefined =
  /*#__PURE__*/ createUseReadContract({ abi: productContractAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link productContractAbi}__ and `functionName` set to `"addProductFee"`
 */
export const useReadProductContractAddProductFee =
  /*#__PURE__*/ createUseReadContract({
    abi: productContractAbi,
    functionName: 'addProductFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link productContractAbi}__ and `functionName` set to `"getAllProducts"`
 */
export const useReadProductContractGetAllProducts =
  /*#__PURE__*/ createUseReadContract({
    abi: productContractAbi,
    functionName: 'getAllProducts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link productContractAbi}__ and `functionName` set to `"getProduct"`
 */
export const useReadProductContractGetProduct =
  /*#__PURE__*/ createUseReadContract({
    abi: productContractAbi,
    functionName: 'getProduct',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link productContractAbi}__ and `functionName` set to `"owner"`
 */
export const useReadProductContractOwner = /*#__PURE__*/ createUseReadContract({
  abi: productContractAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link productContractAbi}__ and `functionName` set to `"productCount"`
 */
export const useReadProductContractProductCount =
  /*#__PURE__*/ createUseReadContract({
    abi: productContractAbi,
    functionName: 'productCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link productContractAbi}__ and `functionName` set to `"products"`
 */
export const useReadProductContractProducts =
  /*#__PURE__*/ createUseReadContract({
    abi: productContractAbi,
    functionName: 'products',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link productContractAbi}__
 */
export const useWriteProductContractundefined =
  /*#__PURE__*/ createUseWriteContract({ abi: productContractAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link productContractAbi}__ and `functionName` set to `"addProduct"`
 */
export const useWriteProductContractAddProduct =
  /*#__PURE__*/ createUseWriteContract({
    abi: productContractAbi,
    functionName: 'addProduct',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link productContractAbi}__ and `functionName` set to `"incrementFeedbackCount"`
 */
export const useWriteProductContractIncrementFeedbackCount =
  /*#__PURE__*/ createUseWriteContract({
    abi: productContractAbi,
    functionName: 'incrementFeedbackCount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link productContractAbi}__ and `functionName` set to `"withdrawFees"`
 */
export const useWriteProductContractWithdrawFees =
  /*#__PURE__*/ createUseWriteContract({
    abi: productContractAbi,
    functionName: 'withdrawFees',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link productContractAbi}__
 */
export const useSimulateProductContractundefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: productContractAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link productContractAbi}__ and `functionName` set to `"addProduct"`
 */
export const useSimulateProductContractAddProduct =
  /*#__PURE__*/ createUseSimulateContract({
    abi: productContractAbi,
    functionName: 'addProduct',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link productContractAbi}__ and `functionName` set to `"incrementFeedbackCount"`
 */
export const useSimulateProductContractIncrementFeedbackCount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: productContractAbi,
    functionName: 'incrementFeedbackCount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link productContractAbi}__ and `functionName` set to `"withdrawFees"`
 */
export const useSimulateProductContractWithdrawFees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: productContractAbi,
    functionName: 'withdrawFees',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link productContractAbi}__
 */
export const useWatchProductContractundefined =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: productContractAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link productContractAbi}__ and `eventName` set to `"FeedbackAdded"`
 */
export const useWatchProductContractFeedbackAdded =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: productContractAbi,
    eventName: 'FeedbackAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link productContractAbi}__ and `eventName` set to `"ProductAdded"`
 */
export const useWatchProductContractProductAdded =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: productContractAbi,
    eventName: 'ProductAdded',
  })
