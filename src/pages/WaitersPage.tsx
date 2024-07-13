import { useContext, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { StorageContext } from "data/StorageContext";
import { IWaiter } from "types/venueType";
import expandItem from "../assets/images/expand-item.png";
import deleteItem from "../assets/images/delete-item.png";
import AddItem from "components/AddItem";
import star from "../assets/images/star.png";
import { useNavigate } from "react-router-dom";
import Modal from "components/Modal";
import LoadSpinner from "components/LoadSpinner";
import EditWaiter from "components/EditWaiter";

export const goldWaiter = 3.9;
export const minimumFeedbacks = 5;

const WaitersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedVenue, deleteWaiter, isLoading } = useContext(StorageContext);
  const [waiterIdToDelete, setWaiterIdToDelete] = useState<string>("");
  const [expandedWaiter, setExpandedWaiter] = useState<string>("");
  const editRef = useRef();

  const waiters = useMemo<IWaiter[]>(() => (selectedVenue ? selectedVenue.users : []), [selectedVenue]);
  const navigate = useNavigate();

  const calculateFeedbacks = (waiter: IWaiter) => {
    const feedbacks = waiter.feedbacks;
    let total = 0;
    feedbacks.forEach((feedback) => {
      total += feedback.rating;
    });
    return Number((total / feedbacks.length).toFixed(1));
  };

  const calculateIsGoldWaiter = (waiter: IWaiter) => {
    return waiter.feedbacks.length > minimumFeedbacks && calculateFeedbacks(waiter) > goldWaiter;
  };

  const addWaiterHandler = () => {
    navigate("/add-waiter", { replace: true });
  };

  const deleteWaiterHandler = async () => {
    try {
      setIsModalOpen(false);
      await deleteWaiter(waiterIdToDelete);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const expandWaiter = (id: string) => {
    setExpandedWaiter((prev) => (prev === id ? "" : id));
  };

  const checkIsExpanded = (id: string) => {
    return expandedWaiter === id;
  };

  const changeWaiterHandler = async () => {
    await (editRef.current as any)!.saveWaiter();
    setExpandedWaiter("");
  };

  return (
    <>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <>
            <p>Are you sure you want to remove the waiter?</p>
            <button
              className="bg-primary hover:bg-primaryHover mt-5 pt-2 pb-2 pl-6 pr-6 rounded-lg hover:outline-none transition ease-in-out delay-100 w-full bg-opacity-60 hover:bg-opacity-100 font-global font-regular text-typography cursor-pointer"
              type="button"
              onClick={() => deleteWaiterHandler()}
            >
              Yes
            </button>
            <button
              className="bg-supporting hover:bg-supportingHover pt-2 pb-2 pl-6 pr-6 rounded-lg hover:outline-none transition ease-in-out delay-100 w-full bg-opacity-60 hover:bg-opacity-100 font-global font-regular text-typography cursor-pointer mt-3"
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setWaiterIdToDelete("");
              }}
            >
              No
            </button>
          </>
        </Modal>
      )}

      <motion.div className="container overflow-auto no-scrollbar elements" variants={containerVariants} initial="hidden" animate="visible">
        {waiters.map((waiter, index) => (
          <motion.div key={index} variants={itemVariants} className={`tableRowWrapper relative `}>
            <motion.div
              className={`tableRow ${checkIsExpanded(waiter.id) ? "" : " hover:bg-opacity-100"} ${
                calculateIsGoldWaiter(waiter) ? "border border-gold" : ""
              }`}
              variants={tableRow}
              animate={checkIsExpanded(waiter.id) ? "expanded" : "collapsed"}
            >
              <div className="flex items-center cursor-pointer mb-3" onClick={() => expandWaiter(waiter.id)}>
                <img
                  src={expandItem}
                  alt="expand item"
                  className={`w-12 h-12 -mt-2 transform transition-transform duration-300 ${checkIsExpanded(waiter.id) ? "rotate-180" : ""}`}
                />
                <div className="flex ml-2 sm:ml-10 items-center waiter-name-and-rating">
                  <p className="">
                    {waiter.firstName} {waiter.lastName}
                  </p>
                  {!!waiter.feedbacks.length && (
                    <div className={`items-center ml-1 sm:ml-5 ${calculateIsGoldWaiter(waiter) ? "text-gold" : ""} hidden sm:flex`}>
                      <p className="sm:ml-5">{`(${calculateFeedbacks(waiter)}/5)`}</p>
                      <img src={star} alt="star" className="w-5 mt-0.5 ml-1" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="absolute top-0 right-5 flex space-x-2">
                  {checkIsExpanded(waiter.id) && (
                    <button className="button-save-waiter mt-4" type="button" onClick={changeWaiterHandler}>
                      {isLoading ? <LoadSpinner /> : "Save"}
                    </button>
                  )}
                  <img
                    src={deleteItem}
                    alt="delete item"
                    className={`w-14 mt-2 cursor-pointer ${checkIsExpanded(waiter.id) ? "hidden sm:block" : ""}`}
                    onClick={() => {
                      setIsModalOpen(true);
                      setWaiterIdToDelete(waiter.id);
                    }}
                  />
                </div>
              </div>
              {checkIsExpanded(waiter.id) && (
                <div className="w-full h-5/6 pl-10 pr-10 pt-5 overflow-auto no-scrollbar border-t-2">
                  <EditWaiter waiter={waiter} ref={editRef} />
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
        <AddItem text="Add waiter" click={addWaiterHandler} />
      </motion.div>
    </>
  );
};

export default WaitersPage;

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const tableRow = {
  collapsed: {
    height: "4.4rem",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  expanded: {
    height: "45rem",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
