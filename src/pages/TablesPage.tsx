import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { StorageContext } from "data/StorageContext";
import AddItem from "../components/AddItem";
import { ITable } from "types/venueType";
import { motion } from "framer-motion";
import expandItem from "../assets/images/expand-item.png";
import deleteItem from "../assets/images/delete-item.png";
import infoIcon from "../assets/images/info-icon.png";

const TablesPage = () => {
  const { selectedVenue, deleteTable } = useContext(StorageContext);
  const tables = useMemo<ITable[]>(() => {
    if (!selectedVenue) return [];
    return selectedVenue.tables;
  }, [selectedVenue]);
  const navigate = useNavigate();

  const addTableHandler = () => {
    navigate("/add-table", { replace: true });
  };

  const deleteTableHandler = async (tableId: string) => {
    try {
      await deleteTable(tableId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <motion.div className="container overflow-auto no-scrollbar elements" variants={containerVariants} initial="hidden" animate="visible">
        {tables.map((table, index) => (
          <motion.div key={index} className="item" variants={itemVariants}>
            <div className="bg-supporting bg-opacity-30 hover:bg-opacity-100 trans mb-4 transition ease-in-out delay-40 w-full h-16 flex items-center p-5 justify-between rounded-2xl">
              <div className="flex items-center cursor-pointer">
                <img src={expandItem} alt="expand item" className="w-14 mt-2" />
                <p className="ml-5 sm:ml-10">{table.name}</p>
              </div>
              <div>
                <img src={deleteItem} alt="delete item" className="w-14 mt-2 cursor-pointer" onClick={() => deleteTableHandler(table.id)} />
              </div>
            </div>
          </motion.div>
        ))}
        {!tables.length && (
          <div className="text-center text-xl mb-5 flex justify-center items-end space-x-3">
            <img src={infoIcon} alt="info icon" className="w-7" />
            <p>There are currently no tables added</p>
          </div>
        )}
        <div className={!tables.length ? "flex justify-center" : ""}>
          <AddItem text="Add a table" click={addTableHandler} />
        </div>
      </motion.div>
    </>
  );
};

export default TablesPage;

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
