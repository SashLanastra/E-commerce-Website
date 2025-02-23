import { useState, ReactElement } from "react";
import { ProductType } from "@/utils";
import { cn } from "@/utils/utilities";
type DetailsProps = {
  currentItem: ProductType;
};

const Details = ({ currentItem }: DetailsProps) => {
  const [fullDetails, setFullDetails] = useState<boolean>(false);

  const detailsTag: string = fullDetails ? "See Less" : "See More";

  const content: ReactElement | null = (
    <>
      <div className={cn("max-w-xl line-clamp-none",{
        "line-clamp-2": !fullDetails,
      })}>
        {currentItem?.description}
      </div>
      <button
        className="text-blue-400"
        onClick={() => setFullDetails(!fullDetails)}
      >
        {detailsTag}
      </button>
    </>
  );

  return content;
};

export default Details;
