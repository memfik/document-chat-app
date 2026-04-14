import { ReactNode } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface SidebarTooltipProps {
  label: string;
  show: boolean;
  children: ReactNode;
}

export function SidebarTooltip({ label, show, children }: SidebarTooltipProps) {
  if (!show) return <>{children}</>;

  return (
    <Tooltip>
      <TooltipTrigger render={<div className="w-full" />}>
        {children}
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
