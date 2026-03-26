"use client";

import Lottie from "lottie-react";

export default function LottieUser({
  animationData,
  loop = true,
  autoplay = true,
}) {
  return (
    <Lottie animationData={animationData} loop={loop} autoplay={autoplay} />
  );
}
