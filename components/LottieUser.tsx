"use client";

import Lottie from "lottie-react";

export default function LottieUser({
  animationData,
  loop = true,
  autoplay = true,
}) {
  return (
    <div className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[300px] aspect-square">
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
