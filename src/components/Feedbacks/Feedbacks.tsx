import { useEffect, useState } from "react";
import { IFeedback } from "types/venueType";
import FeedbackPaging from "./FeedbackPaging";
import { formatDate } from "utils/date";
import FeedbackStars from "./FeedbackStars";

interface IFeedbacksProps {
  feedbacks: IFeedback[];
}

interface IFeedbackPage {
  [key: number]: IFeedback[];
}

const Feedbacks = ({ feedbacks }: IFeedbacksProps) => {
  const [pages, setPages] = useState<IFeedbackPage>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFeedbacks, setCurrentFeedbacks] = useState<IFeedback[]>([]);

  useEffect(() => {
    const pages: IFeedbackPage = {};
    for (let i = 0; i < feedbacks.length; i++) {
      const page = Math.floor(i / 3);
      if (!pages[page]) {
        pages[page] = [];
      }
      pages[page].push(feedbacks[i]);
    }

    setPages(pages);

    if (pages[currentPage]) {
      setCurrentFeedbacks(pages[currentPage]);
    }
  }, [feedbacks]);

  useEffect(() => {
    if (pages[currentPage]) {
      setCurrentFeedbacks(pages[currentPage]);
    }
  }, [currentPage]);

  const getJustification = (feedbacksNum: number) => {
    if (feedbacksNum === 1) {
      return "justify-around";
    }
    if (feedbacksNum === 2) {
      return "justify-center space-x-5";
    }

    return "justify-between";
  };

  return (
    <>
      <div className={`block xl:flex flex-wrap ${getJustification(currentFeedbacks.length)} mt-5 md:w-4/5`}>
        {currentFeedbacks &&
          currentFeedbacks.map((feedback, index) => (
            <div key={index} className="border border-typography rounded-3xl p-3 xl:w-30 mb-4 h-56 xs:h-44 sm:p-5 md:p-3 lg:p-5 xl:h-60 2xl:h-56">
              <p>{feedback.feedback}</p>
              <p className="flex justify-center mt-1">{formatDate(feedback.createdAt)}</p>
              <FeedbackStars rating={feedback.rating} />
            </div>
          ))}
      </div>
      <FeedbackPaging currentPage={currentPage} lastPage={Object.keys(pages).length - 1} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default Feedbacks;
