import { ICategory } from "types/venueType";
import CheckBox from "./CheckBox";

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
    <div className="mb-7">
      <div className="flex mb-7">
        <p className="bg-primary font-semibold pl-2 pr-2 pt-1 pb-1 text-xl rounded-md mr-7">{title}</p>
        <CheckBox label="" id="" isChecked={isAllSelected} check={checkAllHandler} />
      </div>
      {items.map((item, index) => (
        <div key={index} className="mb-7">
          <CheckBox key={`checkbox-${item.id}`} label={item.name} id={item.id} isChecked={selectedIds.includes(item.id)} check={checkItemHandler} />
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
