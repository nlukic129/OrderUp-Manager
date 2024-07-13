import { useEffect, useState } from "react";
import { IFeedback } from "types/venueType";
import FeedbackPaging from "./FeedbackPaging";

interface IFeedbacksProps {
  feedbacks: IFeedback[];
}

interface IFeedbackPage {
  [key: number]: IFeedback[];
}

const Feedbacks = ({ feedbacks }: IFeedbacksProps) => {
  const [pages, setPages] = useState<IFeedbackPage>({});
  const [currentPage, setCurrentPage] = useState(3);

  useEffect(() => {
    const pages: IFeedbackPage = {};
    for (let i = 0; i < feedbacks.length; i++) {
      const page = Math.floor(i / 3);
      if (!pages[page]) {
        pages[page] = [];
      }
      pages[page].push(feedbacks[page]);
    }

    setPages(pages);
  }, [feedbacks]);

  return (
    <div>
      {/* <div>
        {pages[currentPage].map((feedback) => (
          <div key={feedback.id}>
            <p>{feedback.feedback}</p>
            <p>{feedback.rating}</p>
          </div>
        ))}
      </div> */}
      {<FeedbackPaging currentPage={currentPage} lastPage={Object.keys(pages).length} setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default Feedbacks;
