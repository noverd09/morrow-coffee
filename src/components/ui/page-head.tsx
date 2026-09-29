import React from "react";

interface PageHeadProps {
  label: string;
  title: React.ReactNode;
  intro?: string;
}

export const PageHead = ({ label, title, intro }: PageHeadProps) => (
  <div className="wrap pt-12 md:pt-20 pb-10 md:pb-14">
    <p className="label mb-6">{label}</p>
    <h1 className="t-display text-[clamp(3rem,9vw,8rem)] max-w-5xl">{title}</h1>
    {intro && <p className="mt-6 max-w-xl text-lg text-mute">{intro}</p>}
  </div>
);
