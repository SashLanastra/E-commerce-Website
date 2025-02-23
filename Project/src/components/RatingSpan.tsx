import { AiFillStar } from 'react-icons/ai'

type Rating = {
  rate: number;
  count: number;
}

const RatingSpan = ({rating}: {rating: Rating}) => {
  return (
    <span className="w-full flex items-center gap-1 justify-items-start">
          <AiFillStar className="text-yellow-500" />
          {`${rating.rate} (${rating.count})`}
        </span>
  )
}

export default RatingSpan