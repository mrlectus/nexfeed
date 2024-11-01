import React from "react";
import { useAccountEffect } from "wagmi";

export const useGetUserAddress = () => {
  const [address, setAccount] = React.useState<`0x${string}` | undefined>(
    undefined,
  );
  useAccountEffect({
    onConnect(data) {
      setAccount(data?.address);
    },
    onDisconnect() {
      setAccount(undefined);
    },
  });
  return { address };
};
