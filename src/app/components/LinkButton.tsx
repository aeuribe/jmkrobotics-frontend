// components/LinkButton.tsx
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

interface LinkButtonProps {
  label: string;
  href?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, href = "#" }) => {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-md text-white border-b border-white/80 hover:border-white transition-all pb-[2px]"
    >
      <span className="flex items-center gap-2">
        {label}
        <FiArrowUpRight className="w-4 h-4" />
      </span>
    </a>
  );
};

export default LinkButton;