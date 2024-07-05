import { IUser } from "types/venueType";
import CheckBoxSupport from "../Checkboxes/CheckBoxSupport";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IWaitersSelectionProps {
  waiters: IUser[];
  waitersIds: string[];
  setWaitersIds: (ids: string[]) => void;
}

const WaitersSelection = ({ waiters, waitersIds, setWaitersIds }: IWaitersSelectionProps) => {
  const [oddWaiters, setOddWaiters] = useState<IUser[]>([]);
  const [evenWaiters, setEvenWaiters] = useState<IUser[]>([]);
  useEffect(() => {
    const odd = waiters.filter((_, index) => index % 2 === 0);
    const even = waiters.filter((_, index) => index % 2 !== 0);

    setOddWaiters(odd);
    setEvenWaiters(even);
  }, [waiters]);

  const toggleHandler = (id: string) => {
    if (waitersIds.includes(id)) {
      setWaitersIds(waitersIds.filter((waiterId) => waiterId !== id));
    } else {
      setWaitersIds([...waitersIds, id]);
    }
  };

  const isChecked = (id: string) => waitersIds.includes(id);

  return (
    <div className="text-lg flex flex-wrap space-x-0 sm:space-x-16">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {oddWaiters.map((waiter, index) => (
          <motion.div className="mb-4" key={index} variants={itemVariants}>
            <CheckBoxSupport waiter={waiter} isChecked={isChecked(waiter.id)} toggle={toggleHandler} />
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {evenWaiters.map((waiter, index) => (
          <motion.div className="mb-4" key={index} variants={itemVariants}>
            <CheckBoxSupport waiter={waiter} isChecked={isChecked(waiter.id)} toggle={toggleHandler} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WaitersSelection;

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
