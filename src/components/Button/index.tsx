type Props = {
  label: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const defaultStyles =
  "border rounded-md px-4 py-2 hover:bg-gray-200 disabled:hover:bg-transparent disabled:text-gray-200";

const Button = ({ label, className, ...buttonProps }: Props) => {
  return (
    <button className={`${defaultStyles} ${className || ""}`} {...buttonProps}>
      {label}
    </button>
  );
};

export default Button;
