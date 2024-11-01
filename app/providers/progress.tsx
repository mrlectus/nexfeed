"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React from "react";

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#fff"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};

export default ProgressProvider;
