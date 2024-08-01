import { motion } from "framer-motion";
import { useContext } from "react";

import { ICategory } from "types/venueType";
import expandItem from "../../assets/images/expand-item.png";
import AddItem from "components/AddItem";
import { StorageContext } from "data/StorageContext";
import infoIcon from "../../assets/images/info-icon.png";

interface ICategoriesProps {
  categories: ICategory[];
}

const Categories = ({ categories }: ICategoriesProps) => {
  const { isScreenLoading } = useContext(StorageContext);

  return (
    <motion.div className="container overflow-auto no-scrollbar elements" variants={containerVariants} initial="hidden" animate="visible">
      {!!categories.length &&
        categories.map((category, index) => (
          <motion.div key={index} className="tableRowWrapper" variants={itemVariants}>
            <div className={`tableRow hover:bg-opacity-100`}>
              <div className="tableRowInside">
                <div className="flex cursor-pointer">
                  <img src={expandItem} alt="expand item" className={`w-12 h-12 -mt-2 transform transition-transform duration-300`} />
                  <p className="ml-5 mt-1 sm:ml-10">{category.name}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      {!categories.length && !isScreenLoading && (
        <div className="text-center text-xl mb-5 flex flex-wrap justify-center items-end space-x-3">
          <img src={infoIcon} alt="info icon" className="w-7" />
          <p>There are currently no categories added</p>
        </div>
      )}
      <div className={!categories.length ? "flex justify-center" : ""}>
        <AddItem text="Add category" click={() => console.log("add category")} />
      </div>
    </motion.div>
  );
};

export default Categories;

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
