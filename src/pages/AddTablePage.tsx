import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "components/Input";
import { StorageContext } from "data/StorageContext";
import backIcon from "../assets/images/back-icon.png";
import { ICategory, IMessage, IUser } from "types/venueType";
import CategorySection from "components/CategorySection";
import MessageSelection from "components/MessageSelection";
import WaitersSelection from "components/WaitersSelection";

const AddTablePage = () => {
  // TODO on reload redirect to tables page
  const { isLoading, selectedVenue, addTable } = useContext(StorageContext);
  const [tableName, setTableName] = useState("");
  const [allFoodChecked, setAllFoodChecked] = useState(true);
  const [allDrinkChecked, setAllDrinkChecked] = useState(true);
  const [allOtherChecked, setAllOtherChecked] = useState(true);
  const [waitersIds, setWaitersIds] = useState<string[]>([]);
  const [foodIds, setFoodIds] = useState<string[]>([]);
  const [drinkIds, setDrinkIds] = useState<string[]>([]);
  const [otherIds, setOtherIds] = useState<string[]>([]);
  const [messageIds, setMessageIds] = useState<string[]>([]);
  const [waiters, setWaiters] = useState<IUser[]>([]);
  const [foods, setFoods] = useState<ICategory[]>([]);
  const [drinks, setDrinks] = useState<ICategory[]>([]);
  const [others, setOthers] = useState<ICategory[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTableNameValid, setIsTableNameValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedVenue) return;

    const waiters = selectedVenue.users;
    const messages = selectedVenue.messages;
    const categories = selectedVenue.categories;
    const foods = categories.filter((category) => category.type.name === "FOOD");
    const drinks = categories.filter((category) => category.type.name === "DRINK");
    const others = categories.filter((category) => category.type.name === "OTHER");

    setWaiters(waiters);
    setMessages(messages);
    setFoods(foods);
    setDrinks(drinks);
    setOthers(others);

    setMessageIds(messages.map((message) => message.id));
    setFoodIds(foods.map((food) => food.id));
    setDrinkIds(drinks.map((drink) => drink.id));
    setOtherIds(others.map((other) => other.id));
  }, []);

  const backHandler = () => {
    navigate("/tables", { replace: true });
  };

  const addTableHandler = async () => {
    // TODO Popup za uspesno dodat sto, i popup za error gde ce se ispisati error
    try {
      const name = tableName;
      const hospitalityVenueId = selectedVenue!.id;
      const users = waitersIds;
      const messages = messageIds;
      const disabledCategories = selectedVenue!.categories
        .filter((category) => {
          const categoryIds = [...foodIds, ...drinkIds, ...otherIds];
          return !categoryIds.includes(category.id);
        })
        .map((category) => category.id);

      await addTable({ name, hospitalityVenueId, users, messages, disabledCategories });
      navigate("/tables", { replace: true });
    } catch (error) {
      console.error("Add Table Handler Error", error);
    }
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

  // TODO Add loader
  return (
    <>
      <div className="flex items-center justify-between mb-5 flex-wrap">
        <div className="flex items-center">
          <img src={backIcon} alt="back icon" className="hover:scale-125 cursor-pointer" onClick={backHandler} />
          <h1 className="text-3xl ml-10">Add table</h1>
        </div>
        <div className="flex items-center w-full mt-10 justify-end sm:w-1/4 sm:mt-0">
          <button
            className={isTableNameValid ? "button-add-table" : "button-add-table-disabled"}
            type="button"
            onClick={addTableHandler}
            disabled={!isTableNameValid}
          >
            Add table
          </button>
        </div>
      </div>
      <div className="h-96 add-table-form-wrapper no-scrollbar">
        <div className="mt-0 md:w-3/4 xl:w-2/4">
          <Input {...tableNameInputConfig}></Input>
        </div>
        <h1 className="text-3xl mt-16 mb-10">Waiter/es</h1>
        <WaitersSelection waiters={waiters} waitersIds={waitersIds} setWaitersIds={setWaitersIds} />
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
        <h1 className="text-3xl mt-10 mb-16">Messages</h1>
        <MessageSelection messages={messages} messageIds={messageIds} setMessageIds={setMessageIds} />
      </div>
    </>
  );
};

export default AddTablePage;
