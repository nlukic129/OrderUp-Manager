import { useEffect, useState } from "react";
import expandItem from "../assets/images/expand-item.png";

interface IFeedbackPagingProps {
  currentPage: number;
  lastPage: number;
  setCurrentPage: (page: number) => void;
}

interface IGeneratePagingConfig {
  showFirstPage: boolean;
  showSecondPage: boolean;
  showLeftDots: boolean;
  showCurrentPage: boolean;
  showRightDots: boolean;
  showLastButOnePage: boolean;
  showLastPage: boolean;
}

const FeedbackPaging = ({ currentPage, lastPage, setCurrentPage }: IFeedbackPagingProps) => {
  const firstPage = 1;
  const secondPage = 2;
  const lastButOnePage = lastPage - 1;

  const [printPaging, setPrintPaging] = useState<any>(null);

  useEffect(() => {
    let generatePageConfiguration = {
      showFirstPage: true,
      showSecondPage: true,
      showLeftDots: true,
      showCurrentPage: true,
      showRightDots: true,
      showLastButOnePage: true,
      showLastPage: true,
    };

    switch (true) {
      case lastPage === 1:
        generatePageConfiguration = {
          ...generatePageConfiguration,
          showFirstPage: false,
          showSecondPage: false,
          showRightDots: false,
          showLeftDots: false,
          showLastButOnePage: false,
          showLastPage: false,
        };
        break;
      case lastPage === 2:
        generatePageConfiguration = {
          ...generatePageConfiguration,
          showRightDots: false,
          showLeftDots: false,
          showLastButOnePage: false,
          showLastPage: false,
          showCurrentPage: false,
        };
        break;
      case lastPage === 3:
        generatePageConfiguration = {
          ...generatePageConfiguration,
          showRightDots: false,
          showLeftDots: false,
          showLastButOnePage: false,
          showCurrentPage: false,
        };
        break;
      case currentPage === firstPage:
        generatePageConfiguration = {
          ...generatePageConfiguration,
          showFirstPage: true,
          showLeftDots: false,
          showLastButOnePage: false,
          showCurrentPage: false,
        };
        break;
      case currentPage - firstPage === 1 && lastPage > 3:
        generatePageConfiguration = { ...generatePageConfiguration, showLeftDots: false, showLastButOnePage: false, showCurrentPage: false };
        break;
      case currentPage - firstPage === 1 && lastPage === 3:
        generatePageConfiguration = {
          ...generatePageConfiguration,
          showLeftDots: false,
          showLastButOnePage: false,
          showCurrentPage: false,
          showRightDots: false,
        };
        break;
      case lastPage - currentPage === 1:
        generatePageConfiguration = { ...generatePageConfiguration, showRightDots: false, showCurrentPage: false, showSecondPage: false };
        break;
      case lastPage === currentPage:
        generatePageConfiguration = {
          ...generatePageConfiguration,
          showRightDots: false,
          showCurrentPage: false,
          showSecondPage: false,
        };
        break;
      default:
        generatePageConfiguration = { ...generatePageConfiguration, showSecondPage: false, showLastButOnePage: false };
        break;
    }

    setPrintPaging(generatePaging(generatePageConfiguration));
  }, [currentPage, lastPage]);

  const checkIsPageActivate = (page: number) => {
    return page === currentPage;
  };

  const isCurrentPageActive = () => {
    return currentPage !== firstPage && currentPage !== lastPage && currentPage !== secondPage && currentPage !== lastButOnePage;
  };

  const increasePageHandler = () => {
    if (currentPage === lastPage) return;
    setCurrentPage(currentPage + 1);
  };

  const reducePageHandler = () => {
    if (currentPage === firstPage) return;
    setCurrentPage(currentPage - 1);
  };

  const generatePaging = ({
    showFirstPage,
    showSecondPage,
    showLeftDots,
    showRightDots,
    showLastButOnePage,
    showLastPage,
    showCurrentPage,
  }: IGeneratePagingConfig) => {
    const dotsPrint = <div className={`pagination-container bg-primaryInactive`}>...</div>;
    const firstPagePrint = (
      <div
        onClick={() => setCurrentPage(firstPage)}
        className={`pagination-container ${currentPage !== firstPage ? "hidden sm:flex" : ""} ${
          checkIsPageActivate(firstPage) ? "bg-primary" : "bg-primaryInactive"
        }`}
      >
        <p>{firstPage}</p>
      </div>
    );
    const secondPagePrint = (
      <div
        onClick={() => setCurrentPage(secondPage)}
        className={`pagination-container ${currentPage !== secondPage ? "hidden sm:flex" : ""} ${
          checkIsPageActivate(secondPage) ? "bg-primary" : "bg-primaryInactive"
        }`}
      >
        {secondPage}
      </div>
    );
    const currentPagePrint = <div className={`pagination-container bg-primary ${!isCurrentPageActive() ? "hidden sm:flex" : ""}`}>{currentPage}</div>;
    const lastButOnePagePrint = (
      <div
        onClick={() => setCurrentPage(lastButOnePage)}
        className={`pagination-container ${currentPage !== lastButOnePage ? "hidden sm:flex" : ""} ${
          checkIsPageActivate(lastButOnePage) ? "bg-primary" : "bg-primaryInactive"
        }`}
      >
        {lastButOnePage}
      </div>
    );
    const lastPagePrint = (
      <div
        onClick={() => setCurrentPage(lastPage)}
        className={`pagination-container ${currentPage !== lastPage ? "hidden sm:flex" : ""} ${
          checkIsPageActivate(lastPage) ? "bg-primary" : "bg-primaryInactive"
        }`}
      >
        {lastPage}
      </div>
    );

    return (
      <>
        <div>
          <img className="w-14 cursor-pointer rotate-270" src={expandItem} alt="left arrow" onClick={reducePageHandler} />
        </div>
        {showFirstPage && firstPagePrint}
        {showSecondPage && secondPagePrint}
        {showLeftDots && dotsPrint}
        {showCurrentPage && currentPagePrint}
        {showRightDots && dotsPrint}
        {showLastButOnePage && lastButOnePagePrint}
        {showLastPage && lastPagePrint}
        <div>
          <img className="w-14 cursor-pointer rotate-90" src={expandItem} alt="left arrow" onClick={increasePageHandler} />
        </div>
      </>
    );
  };

  return <div className="flex space-x-5 items-center">{printPaging}</div>;
};

export default FeedbackPaging;
