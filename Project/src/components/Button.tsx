import { cn } from "@/utils/utilities";
import { Link } from "react-router-dom";
import Spinner from "@/components/Spinner";


export interface ButtonProps {
  icon?: string;
  text: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  loading?: boolean;
  disabled?: boolean;
  onClick?: VoidFunction;
  type?: "submit" | "reset" | "button";
  size: "xs" | "sm" | "md" | "md-mobile" | "lg" | "xl" | "2xl";
  variant?:
    | "primary"
    | "secondary"
    | "primary-dark"
    | "outlined"
    | "outlined-dark"
    | "buy"
    | "outlined-cancel"
    | "outlined-cancel-mobile";
}
const Action: React.FC<ButtonProps> = ({
  icon,
  text,
  size,
  loading,
  onClick,
  disabled,
  type = "button",
  variant = "primary", // Default variant
}) => {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        "group mx-auto flex w-full justify-center items-center transition-all ease-in-out duration-500 rounded-md text-text cursor-pointer",
        {
          "border-2 border-white bg-white/[0.1] hover:ring-1 text-white hover:bg-white/[0.3]":
            variant === "outlined",
        },
        {
          "border-2 border-cyan-600 text-cyan-600 hover:border-cyan-700 hover:text-cyan-700":
            variant === "outlined-dark",
        },
        {
          "bg-cyan-600 hover:bg-cyan-700 hover:border-cyan-800 text-white":
            variant === "primary" || variant === "primary-dark",
        },
        {
          "bg-neutral-medium-grey hover:bg-neutral-dark-grey":
            variant === "primary-dark",
        },
        {
          "text-red-500 hover:text-red-900 border-2 border-red-500 hover:border-red-900":
            variant === "outlined-cancel",
        },
        {
          "text-red-500 hover:text-red-900 border-2 border-red-500 hover:border-red-900 rounded-none":
            variant === "outlined-cancel-mobile",
        },
        {
          "bg-neutral-light-grey-disabled hover:bg-neutral-light-grey-disabled hover:cursor-not-allowed":
            disabled,
        },
        {
          "drop-shadow-lg ": !disabled,
        },
        {
          "p-1 w-10 min-h-3 lg:w-14 lg:min-h-4 2xl:w-20 2xl:min-h-6":
            size === "xs",
          "p-1.5 w-14 min-h-4 lg:w-20 lg:min-h-6 2xl:w-28 2xl:min-h-8":
            size === "sm",
          "h-14 px-3": size === "md",
          "w-1/2 h-14 px-3": size === "md-mobile",
          "py-3 w-full md:min-w-64 min-h-8 lg:min-h-10 2xl:min-h-12":
            size === "lg",
          "py-3 px-8 w-64 min-h-10 lg:w-fit lg:min-h-10 2xl:min-h-12":
            size === "xl",
          "p-4 w-full h-14": size === "2xl",
        }
      )}
    >
      {loading && (
        <Spinner container="w-6 h-6" className="fill-white text-white/25" />
      )}
      {!loading && (
        <>
          {icon && (
            <img
              src={`/assets/icons/${icon}.svg`}
              alt={"icon"}
              width={24}
              height={2}
              className="mr-2"
            />
          )}
          <span
            className={cn(
              "text-center my-auto",
              {
                "text-button-fill-default": variant === "secondary",
                "text-neutral-white":
                  variant === "primary" || variant === "primary-dark",
                "text-neutral-almost-white": disabled,
              },
              {
                "text-xs font-light leading-none": size === "xs",
                "text-xs leading-none font-light 2xl:text-sm 2xl:font-normal 2xl:leading-tight":
                  size === "sm",
                "text-base leading-tight 2xl:text-md font-normal 2xl:leading-snug":
                  size === "md",
                "text-sm 2xl:text-lg font-semibold leading-snug":
                  size === "lg" || size === "xl" || size === "2xl",
              }
            )}
          >
            {text}
          </span>
        </>
      )}
    </button>
  );
};
export const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  target,
  ...props
}) => {
  if (href) {
    return (
      <div key={"link-" + target + "-" + href}>
        <Link target={target} to={href} className="w-full">
          <Action {...props} />
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full">
      <Action onClick={onClick} {...props} />
    </div>
  );
};
