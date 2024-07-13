import filledStar from "../../assets/images/filled-star.png";
import emptyStar from "../../assets/images/empty-star.png";

const FeedbackStars = ({ rating }: { rating: number }) => {
  const generateStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<img key={i} src={filledStar} alt="filled star" className="w-5 h-5 ml-1" />);
      } else {
        stars.push(<img key={i} src={emptyStar} alt="empty star" className="w-5 h-5 ml-1" />);
      }
    }
    return stars;
  };
  return <div className="flex justify-center mt-2">{generateStars()}</div>;
};

export default FeedbackStars;
