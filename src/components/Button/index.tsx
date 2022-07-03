import { useMemo } from "react";

type Props = {
  label: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const defaultStyles =
  "border rounded-md px-4 py-2 hover:bg-gray-200 disabled:hover:bg-transparent disabled:text-gray-200";

const getClassNames = (additionalClassNames?: string) => {
  if (!additionalClassNames) {
    return defaultStyles;
  }

  return `${defaultStyles} ${additionalClassNames}`;
};

const Button = ({ label, className, ...buttonProps }: Props) => {
  const classNames = useMemo(() => getClassNames(className), [className]);

  return (
    <button className={classNames} {...buttonProps}>
      {label}
    </button>
  );
};

export default Button;
