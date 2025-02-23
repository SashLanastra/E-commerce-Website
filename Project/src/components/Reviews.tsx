import { useOutletContext } from "react-router-dom";
import { ReactElement } from "react";

const Reviews = () => {
  const {showReviews} = useOutletContext<{ showReviews: boolean }>();
  const content: ReactElement | null = showReviews ? (
    <div className="reviews">
      <h2>No Reviews Here</h2>
    </div>
  ) : (
    null
  );
  return content;
}

export default Reviews