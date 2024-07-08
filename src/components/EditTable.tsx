import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";

import { StorageContext } from "data/StorageContext";
import { ICategory, IMessage, ITable, IUser } from "types/venueType";
import CategorySelection from "components/Selections/CategorySelection";
import MessageSelection from "components/Selections/MessageSelection";
import WaitersSelection from "components/Selections/WaitersSelection";

interface EditTableProps {
  table: ITable;
}

const EditTable = forwardRef(({ table }: EditTableProps, ref) => {
  const { selectedVenue, changeTable } = useContext(StorageContext);
  const [allFoodChecked, setAllFoodChecked] = useState(false);
  const [allDrinkChecked, setAllDrinkChecked] = useState(false);
  const [allOtherChecked, setAllOtherChecked] = useState(false);
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

  useImperativeHandle(ref, () => ({
    async saveTable() {
      try {
        const updateData = {
          id: table.id,
          hospitalityVenueId: selectedVenue!.id,
          users: waitersIds,
          messages: messageIds,
          disabledCategories: selectedVenue!.categories
            .filter((category) => {
              const categoryIds = [...foodIds, ...drinkIds, ...otherIds];
              return !categoryIds.includes(category.id);
            })
            .map((category) => category.id),
        };
        await changeTable(updateData);
      } catch (err) {
        // TODO Error handling
        console.log(err);
      }
    },
  }));

  useEffect(() => {
    if (!selectedVenue) return;

    const allWaiters = selectedVenue.users;
    const allMessages = selectedVenue.messages;
    const allCategories = selectedVenue.categories;
    const allFoods = allCategories.filter((category) => category.type.name === "FOOD");
    const allDrinks = allCategories.filter((category) => category.type.name === "DRINK");
    const allOthers = allCategories.filter((category) => category.type.name === "OTHER");

    setWaiters(allWaiters);
    setMessages(allMessages);
    setFoods(allFoods);
    setDrinks(allDrinks);
    setOthers(allOthers);

    const tableWaitersIds = table.users.map((user) => user.id);
    const tableMessagesIds = table.messages.map((message) => message.id);
    const tableDisabledCategoriesIds = table.disabledCategories.map((category) => category.id);

    const tableFoods = allFoods.filter((food) => !tableDisabledCategoriesIds.includes(food.id));
    const tableDrinks = allDrinks.filter((drink) => !tableDisabledCategoriesIds.includes(drink.id));
    const tableOthers = allOthers.filter((other) => !tableDisabledCategoriesIds.includes(other.id));

    setAllFoodChecked(tableFoods.length === allFoods.length);
    setAllDrinkChecked(tableDrinks.length === allDrinks.length);
    setAllOtherChecked(tableOthers.length === allOthers.length);

    setWaitersIds(tableWaitersIds);
    setMessageIds(tableMessagesIds);
    setFoodIds(tableFoods.map((food) => food.id));
    setDrinkIds(tableDrinks.map((drink) => drink.id));
    setOtherIds(tableOthers.map((other) => other.id));
  }, [selectedVenue]);

  return (
    <>
      <div className="h-96 add-table-form-wrapper no-scrollbar">
        <h1 className="text-3xl  mb-10">Waiter/es</h1>
        <WaitersSelection waiters={waiters} waitersIds={waitersIds} setWaitersIds={setWaitersIds} />
        <h1 className="text-3xl mt-16">Menu categories</h1>
        <div className="flex flex-wrap justify-between mt-5 md:mt-10 md:w-3/4 xl:w-2/4">
          <CategorySelection
            title="Food"
            items={foods}
            selectedIds={foodIds}
            setSelectedIds={setFoodIds}
            isAllSelected={allFoodChecked}
            setIsAllSelected={setAllFoodChecked}
          />
          <CategorySelection
            title="Drink"
            items={drinks}
            selectedIds={drinkIds}
            setSelectedIds={setDrinkIds}
            isAllSelected={allDrinkChecked}
            setIsAllSelected={setAllDrinkChecked}
          />
          <CategorySelection
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
});

export default EditTable;
