import { useContext, useEffect, useState } from "react";

import { StorageContext } from "data/StorageContext";
import Categories from "components/Menu/Categories";
import { ICategory } from "types/venueType";
import expandItem from "../assets/images/expand-item.png";

const MenuPage = () => {
  const [foodCategories, setFoodCategories] = useState<ICategory[]>([]);
  const [drinksCategories, setDrinkCategories] = useState<ICategory[]>([]);
  const [categories, setOtherCategories] = useState<ICategory[]>([]);
  const [isFoodOpen, setIsFoodOpen] = useState<boolean>(true);
  const [isDrinkOpen, setIsDrinkOpen] = useState<boolean>(false);
  const [isOtherOpen, setIsOtherOpen] = useState<boolean>(false);

  const { selectedVenue } = useContext(StorageContext);

  useEffect(() => {
    if (!selectedVenue) return;

    const foods = selectedVenue.categories.filter((category) => category.type.name === "FOOD");
    const drinks = selectedVenue.categories.filter((category) => category.type.name === "DRINK");
    const others = selectedVenue.categories.filter((category) => category.type.name === "OTHER");

    setFoodCategories(foods);
    setDrinkCategories(drinks);
    setOtherCategories(others);
  }, [selectedVenue]);

  const toggleFoodCategories = () => {
    setIsFoodOpen((prev) => !prev);
    setIsDrinkOpen(false);
    setIsOtherOpen(false);
  };

  const toggleDrinkCategories = () => {
    setIsDrinkOpen((prev) => !prev);
    setIsFoodOpen(false);
    setIsOtherOpen(false);
  };

  const toggleOtherCategories = () => {
    setIsOtherOpen((prev) => !prev);
    setIsFoodOpen(false);
    setIsDrinkOpen(false);
  };

  return (
    <div className="overflow-y-scroll no-scrollbar h-4/5">
      <div className="mb-5">
        <div className="flex items-center space-x-3 cursor-pointer mb-3" onClick={toggleFoodCategories}>
          <img src={expandItem} alt="expandItem" className={`w-14 transform transition-transform duration-300 ${isFoodOpen ? "rotate-180" : ""}`} />
          <p className={`${isFoodOpen ? "text-primary" : "text-typography"} text-3xl`}>Food</p>
        </div>
        {isFoodOpen && <Categories categories={foodCategories} />}
      </div>

      <div className="mb-5">
        <div className="flex items-center space-x-3 cursor-pointer mb-3" onClick={toggleDrinkCategories}>
          <img src={expandItem} alt="expandItem" className={`w-14 transform transition-transform duration-300 ${isDrinkOpen ? "rotate-180" : ""}`} />
          <p className={`${isDrinkOpen ? "text-primary" : "text-typography"} text-3xl`}>Drink</p>
        </div>
        {isDrinkOpen && <Categories categories={drinksCategories} />}
      </div>

      <div className="mb-5">
        <div className="flex items-center space-x-3 cursor-pointer mb-3" onClick={toggleOtherCategories}>
          <img src={expandItem} alt="expandItem" className={`w-14 transform transition-transform duration-300 ${isOtherOpen ? "rotate-180" : ""}`} />
          <p className={`${isOtherOpen ? "text-primary" : "text-typography"} text-3xl`}>Other</p>
        </div>
        {isOtherOpen && <Categories categories={categories} />}
      </div>
    </div>
  );
};

export default MenuPage;
