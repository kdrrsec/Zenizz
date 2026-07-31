import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
  as?: "div" | "section" | "header" | "footer";
  id?: string;
};

export function Container({
  children,
  className,
  wide = false,
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag id={id} className={cn(wide ? "container-wide" : "container-page", className)}>
      {children}
    </Tag>
  );
}
