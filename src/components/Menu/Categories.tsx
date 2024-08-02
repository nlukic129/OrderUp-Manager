import { motion } from "framer-motion";
import { useContext } from "react";

import { ICategory } from "types/venueType";
import AddItem from "components/AddItem";
import { StorageContext } from "data/StorageContext";
import infoIcon from "../../assets/images/info-icon.png";
import Category from "./Category";

interface ICategoriesProps {
  categories: ICategory[];
}

const Categories = ({ categories }: ICategoriesProps) => {
  const { isScreenLoading } = useContext(StorageContext);

  return (
    <motion.div className="container overflow-auto no-scrollbar elements" variants={containerVariants} initial="hidden" animate="visible">
      {!!categories.length && categories.map((category, index) => <Category category={category} key={index} />)}
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
