import { forwardRef, useContext, useImperativeHandle, useState } from "react";

import { goldWaiter, minimumFeedbacks } from "pages/WaitersPage";
import { IWaiter } from "types/venueType";
import star from "../assets/images/star.png";
import TableSelection from "./Selections/TableSelection";
import { StorageContext } from "data/StorageContext";
import Feedbacks from "./Feedbacks";

interface IEditWaiterProps {
  waiter: IWaiter;
}

const EditWaiter = forwardRef(({ waiter }: IEditWaiterProps, ref) => {
  const { selectedVenue, changeWaiterTables } = useContext(StorageContext);
  const [selectedTablesIds, setSelectedTablesIds] = useState(
    selectedVenue!.users.find((user) => user.id === waiter.id)!.tables.map((table) => table.id)
  );

  console.log(selectedVenue);

  useImperativeHandle(ref, () => ({
    async saveWaiter() {
      try {
        const updateData = {
          waiterId: waiter.id,
          tables: selectedTablesIds,
        };
        await changeWaiterTables(updateData);
      } catch (err) {
        // TODO Error handling
        console.log(err);
      }
    },
  }));

  const calculateFeedbacks = (waiter: IWaiter) => {
    const feedbacks = waiter.feedbacks;
    let total = 0;
    feedbacks.forEach((feedback) => {
      total += feedback.rating;
    });
    return Number((total / feedbacks.length).toFixed(1));
  };

  const calculateIsGoldWaiter = (waiter: IWaiter) => {
    return waiter.feedbacks.length > minimumFeedbacks && calculateFeedbacks(waiter) > goldWaiter;
  };
  return (
    <>
      <div className="flex flex-wrap">
        <p>E-mail: {waiter.email}</p>
        {!!waiter.feedbacks.length && (
          <div className={`items-center ml-1 sm:ml-5 ${calculateIsGoldWaiter(waiter) ? "text-gold" : ""} flex sm:hidden`}>
            <p className="sm:ml-5">{`(${calculateFeedbacks(waiter)}/5)`}</p>
            <img src={star} alt="star" className="w-5 mt-0.5 ml-1" />
          </div>
        )}
      </div>
      <p className="mt-8 text-2xl">Tables</p>
      <TableSelection tables={selectedVenue!.tables} selectedTablesIds={selectedTablesIds} setSelectedTablesIds={setSelectedTablesIds} />
      <p className="mt-8 text-2xl">Feedbacks</p>
      {!!waiter.feedbacks.length && <Feedbacks feedbacks={waiter.feedbacks} />}
    </>
  );
});

export default EditWaiter;
