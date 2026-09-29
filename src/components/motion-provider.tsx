"use client";

import React from "react";
import { MotionConfig } from "framer-motion";

export const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
