import type { ComponentProps, MouseEventHandler, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { EllipsisIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const iconGroupVariants = cva("inline-flex items-center gap-0.5", {
  variants: {
    style: {
      Default: "",
      Border:
        "rounded border border-solid border-oc-dark-blue-border bg-oc-background p-0.5",
    },
  },
  defaultVariants: {
    style: "Default",
  },
});

const iconGroupItemVariants = cva(
  "inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded p-1 text-oc-foreground outline-none hover:bg-oc-dark-blue-soft disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
);

type IconGroupMenuItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  variant?: "default" | "destructive";
  disabled?: boolean;
  separator?: boolean;
};

type IconGroupButtonItem = {
  type?: "button";
  key: string;
  icon: ReactNode;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
};

type IconGroupLinkItem = {
  type: "link";
  key: string;
  icon: ReactNode;
  label: string;
  href: string;
  target?: ComponentProps<"a">["target"];
  rel?: string;
  disabled?: boolean;
  className?: string;
};

type IconGroupMenuAction = {
  type: "menu";
  key: string;
  icon?: ReactNode;
  label?: string;
  items: IconGroupMenuItem[];
  onAction: (item: IconGroupMenuItem, key: string) => void;
  disabled?: boolean;
  className?: string;
};

type IconGroupItem =
  IconGroupButtonItem | IconGroupLinkItem | IconGroupMenuAction;

type IconGroupProps = {
  items: IconGroupItem[];
  style?: "Default" | "Border";
  className?: string;
} & Omit<ComponentProps<"div">, "children" | "style">;

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function IconGroupAction({ item }: { item: IconGroupItem }) {
  if (item.type === "link") {
    const target =
      item.target ?? (isExternalHref(item.href) ? "_blank" : undefined);
    const rel = item.rel ?? (target === "_blank" ? "noreferrer" : undefined);

    return (
      <a
        data-slot="icon-group-link"
        href={item.disabled ? undefined : item.href}
        target={target}
        rel={rel}
        aria-label={item.label}
        title={item.label}
        aria-disabled={item.disabled || undefined}
        tabIndex={item.disabled ? -1 : undefined}
        className={cn(iconGroupItemVariants(), item.className)}
      >
        {item.icon}
      </a>
    );
  }

  if (item.type === "menu") {
    const label = item.label ?? "More";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton
          disabled={item.disabled}
          className={cn(iconGroupItemVariants(), item.className)}
          render={
            <button type="button" aria-label={label} title={label}>
              {item.icon ?? <EllipsisIcon />}
            </button>
          }
        />
        <DropdownMenuContent align="end">
          {item.items.map((menuItem) => (
            <span key={menuItem.key} className="contents">
              {menuItem.separator ? <DropdownMenuSeparator /> : null}
              <DropdownMenuItem
                disabled={menuItem.disabled}
                variant={menuItem.variant}
                onClick={() => {
                  if (!menuItem.disabled) item.onAction(menuItem, menuItem.key);
                }}
              >
                {menuItem.icon}
                {menuItem.label}
              </DropdownMenuItem>
            </span>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <button
      type="button"
      data-slot="icon-group-button"
      aria-label={item.label}
      title={item.label}
      disabled={item.disabled}
      onClick={item.onClick}
      className={cn(iconGroupItemVariants(), item.className)}
    >
      {item.icon}
    </button>
  );
}

function IconGroup({
  items,
  className,
  style = "Default",
  ...props
}: IconGroupProps) {
  return (
    <div
      data-slot="icon-group"
      data-style={style}
      className={cn(iconGroupVariants({ style }), className)}
      {...props}
    >
      {items.map((item, index) => (
        <div key={item.key} className="contents">
          {style === "Border" && index > 0 ? (
            <span
              aria-hidden="true"
              data-slot="icon-group-divider"
              className="h-4 w-px shrink-0 bg-oc-dark-blue-border"
            />
          ) : null}
          <IconGroupAction item={item} />
        </div>
      ))}
    </div>
  );
}

export { IconGroup };
export type {
  IconGroupButtonItem,
  IconGroupItem,
  IconGroupLinkItem,
  IconGroupMenuAction,
  IconGroupMenuItem,
  IconGroupProps,
};
