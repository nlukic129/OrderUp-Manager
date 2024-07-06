import { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { StorageContext } from "data/StorageContext";
import { IUser } from "types/venueType";
import expandItem from "../assets/images/expand-item.png";
import deleteItem from "../assets/images/delete-item.png";
import AddItem from "components/AddItem";
import star from "../assets/images/star.png";
import { useNavigate } from "react-router-dom";
import Modal from "components/Modal";

const goldWaiter = 4;
const minimumFeedbacks = 5;

const WaitersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedVenue, deleteWaiter } = useContext(StorageContext);
  const [waiterIdToDelete, setWaiterIdToDelete] = useState<string>("");

  const waiters = useMemo<IUser[]>(() => (selectedVenue ? selectedVenue.users : []), [selectedVenue]);
  const navigate = useNavigate();

  const calculateFeedbacks = (waiter: IUser) => {
    const feedbacks = waiter.feedbacks;
    let total = 0;
    feedbacks.forEach((feedback) => {
      total += feedback.rating;
    });
    return total / feedbacks.length;
  };

  const calculateIsGoldWaiter = (waiter: IUser) => {
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
          <motion.div key={index} className="item" variants={itemVariants}>
            <div
              className={`bg-supporting bg-opacity-30 hover:bg-opacity-100 trans mb-4 transition ease-in-out delay-40 w-full h-16 flex items-center p-5 justify-between rounded-2xl ${
                calculateIsGoldWaiter(waiter) ? "border border-gold" : ""
              }`}
            >
              <div className="flex items-center cursor-pointer">
                <img src={expandItem} alt="expand item" className="w-14 mt-2" />
                <div className="flex ml-2 sm:ml-10 items-center">
                  <p className="">
                    {waiter.firstName} {waiter.lastName}
                  </p>
                  {!!waiter.feedbacks.length && (
                    <div className={`flex items-center ml-1 sm:ml-5 ${calculateIsGoldWaiter(waiter) ? "text-gold" : ""}`}>
                      <p className="sm:ml-5">{`(${calculateFeedbacks(waiter)}/5)`}</p>
                      <img src={star} alt="star" className="w-5 mt-0.5 ml-1" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <img
                  src={deleteItem}
                  alt="delete item"
                  className="w-14 mt-2 cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(true);
                    setWaiterIdToDelete(waiter.id);
                  }}
                />
              </div>
            </div>
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
      staggerChildren: 0.03,
      delayChildren: 0,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
