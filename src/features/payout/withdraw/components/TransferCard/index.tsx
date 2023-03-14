import { Card, IconButton } from "components";
import { XMarkIconMini } from "lib/@heroicons";
import { Children } from "types";

export function TransferCard({
  className,
  centerTitle = true,
  title,
  children,
  closeModal,
}: {
  className?: string;
  centerTitle?: boolean;
  title?: string;
  children: Children;
  closeModal?: any;
}) {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2
          className={`font-semibold text-xl text-${
            centerTitle ? "center" : "left"
          }`}
        >
          {title}
        </h2>
        {/* x icon */}
        <IconButton className="" buttonSize="large" onClick={closeModal}>
          <XMarkIconMini />
        </IconButton>
      </div>

      {children}
    </div>
  );
}

export default TransferCard;
