import { ICategory } from "types/venueType";
import CheckBox from "./Checkboxes/CheckBox";
import { motion } from "framer-motion";

interface CategorySectionProps {
  title: string;
  items: ICategory[];
  selectedIds: string[];
  isAllSelected: boolean;
  setSelectedIds: (ids: string[]) => void;
  setIsAllSelected: (isAllSelected: boolean) => void;
}

const CategorySection = ({ title, items, selectedIds, isAllSelected, setSelectedIds, setIsAllSelected }: CategorySectionProps) => {
  const checkAllHandler = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const checkItemHandler = (id: string) => {
    const newSelectedIds = selectedIds.includes(id) ? selectedIds.filter((selectedId) => selectedId !== id) : [...selectedIds, id];
    setSelectedIds(newSelectedIds);
    setIsAllSelected(newSelectedIds.length === items.length);
  };

  return (
    <motion.div className="mb-5" variants={containerVariants} initial="hidden" animate="visible">
      <div className="flex mb-5">
        <p className="bg-primary font-semibold pl-2 pr-2 pt-1 pb-1 text-lg rounded-md mr-2 sm:5">{title}</p>
        <CheckBox label="" id="" isChecked={isAllSelected} check={checkAllHandler} />
      </div>
      {items.map((item, index) => (
        <motion.div key={index} className="mb-5" variants={itemVariants}>
          <CheckBox key={`checkbox-${item.id}`} label={item.name} id={item.id} isChecked={selectedIds.includes(item.id)} check={checkItemHandler} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategorySection;

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
