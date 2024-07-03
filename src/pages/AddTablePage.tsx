import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "components/Input";
import { StorageContext } from "data/StorageContext";
import backIcon from "../assets/images/back-icon.png";
import { ICategory } from "types/venueType";
import CategorySection from "components/CategorySection";

const AddTablePage = () => {
  // TODO on reload redirect to tables page
  const { isLoading, selectedVenue } = useContext(StorageContext);
  const [tableName, setTableName] = useState("");
  const [allFoodChecked, setAllFoodChecked] = useState(true);
  const [allDrinkChecked, setAllDrinkChecked] = useState(true);
  const [allOtherChecked, setAllOtherChecked] = useState(true);
  const [foodIds, setFoodIds] = useState<string[]>([]);
  const [drinkIds, setDrinkIds] = useState<string[]>([]);
  const [otherIds, setOtherIds] = useState<string[]>([]);
  const [foods, setFoods] = useState<ICategory[]>([]);
  const [drinks, setDrinks] = useState<ICategory[]>([]);
  const [others, setOthers] = useState<ICategory[]>([]);
  const [isTableNameValid, setIsTableNameValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedVenue) return;

    const categories = selectedVenue.categories;
    setFoods(categories.filter((category) => category.type.name === "FOOD"));
    setDrinks(categories.filter((category) => category.type.name === "DRINK"));
    setOthers(categories.filter((category) => category.type.name === "OTHER"));
  }, []);

  useEffect(() => {
    setFoodIds(foods.map((food) => food.id));
  }, [foods]);

  useEffect(() => {
    setDrinkIds(drinks.map((drink) => drink.id));
  }, [drinks]);

  useEffect(() => {
    setOtherIds(others.map((other) => other.id));
  }, [others]);

  const backHandler = () => {
    navigate("/tables", { replace: true });
  };

  const tableNameInputConfig = {
    label: "Enter table name",
    placeholder: "exp. Table No. 1",
    type: "text",
    onChangeInput: setTableName,
    required: true,
    isDisabled: isLoading,
    checkValidity: (value: string) => value.length > 0,
    onChangeValidity: setIsTableNameValid,
    value: tableName,
  };

  return (
    <>
      <div className="flex items-center mb-5">
        <img src={backIcon} alt="back icon" className="hover:scale-125 cursor-pointer" onClick={backHandler} />
        <h1 className="text-3xl ml-10">Add table</h1>
      </div>
      <div className="h-96 add-table-form-wrapper">
        <div className="mt-5 md:mt-10 md:w-3/4 xl:w-2/4">
          <Input {...tableNameInputConfig}></Input>
        </div>
        <h1 className="text-3xl mt-16">Menu categories</h1>
        <div className="flex flex-wrap justify-between mt-5 md:mt-10 md:w-3/4 xl:w-2/4">
          <CategorySection
            title="Food"
            items={foods}
            selectedIds={foodIds}
            setSelectedIds={setFoodIds}
            isAllSelected={allFoodChecked}
            setIsAllSelected={setAllFoodChecked}
          />
          <CategorySection
            title="Drink"
            items={drinks}
            selectedIds={drinkIds}
            setSelectedIds={setDrinkIds}
            isAllSelected={allDrinkChecked}
            setIsAllSelected={setAllDrinkChecked}
          />
          <CategorySection
            title="Other"
            items={others}
            selectedIds={otherIds}
            setSelectedIds={setOtherIds}
            isAllSelected={allOtherChecked}
            setIsAllSelected={setAllOtherChecked}
          />
        </div>
      </div>
    </>
  );
};

export default AddTablePage;
