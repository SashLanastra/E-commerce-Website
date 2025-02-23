import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const LikesIcon = ({inLikes}: {inLikes: boolean}) => {
  return (
    <>
      {inLikes ? <AiFillHeart color="red" size={25} /> : <AiOutlineHeart color="red" size={25} />}
    </>
  );
};

export default LikesIcon;
