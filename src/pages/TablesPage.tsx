import { useContext, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { StorageContext } from "data/StorageContext";
import AddItem from "../components/AddItem";
import { motion } from "framer-motion";
import expandItem from "../assets/images/expand-item.png";
import deleteItem from "../assets/images/delete-item.png";
import infoIcon from "../assets/images/info-icon.png";

import EditTable from "components/EditTable";
import { ITable } from "types/venueType";
import LoadSpinner from "components/LoadSpinner";

const TablesPage = () => {
  const { selectedVenue, deleteTable, isScreenLoading, isLoading } = useContext(StorageContext);
  const [expandedTable, setExpandedTable] = useState<string>("");

  const tables = useMemo<ITable[]>(() => {
    if (!selectedVenue) return [];
    return selectedVenue.tables;
  }, [selectedVenue]);
  const navigate = useNavigate();

  const editRef = useRef();

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

  const expandTable = (id: string) => {
    setExpandedTable((prev) => (prev === id ? "" : id));
  };

  const checkIsExpanded = (id: string) => {
    return expandedTable === id;
  };

  const changeTableHandler = async () => {
    await (editRef.current as any)!.saveTable();
    setExpandedTable("");
  };

  return (
    <>
      <motion.div className="container overflow-auto no-scrollbar elements" variants={containerVariants} initial="hidden" animate="visible">
        {tables.map((table, index) => (
          <motion.div key={index} variants={itemVariants} className="tableRowWrapper">
            <motion.div
              className={`tableRow ${checkIsExpanded(table.id) ? "" : " hover:bg-opacity-100"}`}
              variants={tableRow}
              animate={checkIsExpanded(table.id) ? "expanded" : "collapsed"}
            >
              <div className="tableRowInside">
                <div className="flex cursor-pointer" onClick={() => expandTable(table.id)}>
                  <img
                    src={expandItem}
                    alt="expand item"
                    className={`w-12 h-12 -mt-2 transform transition-transform duration-300 ${checkIsExpanded(table.id) ? "rotate-180" : ""}`}
                  />
                  <p className="ml-5 mt-1 sm:ml-10">{table.name}</p>
                </div>

                <div className="flex flex-wrap space-x-5">
                  {checkIsExpanded(table.id) && (
                    <button className="button-save" type="button" onClick={changeTableHandler}>
                      {isLoading ? <LoadSpinner /> : "Save"}
                    </button>
                  )}
                  <img
                    src={deleteItem}
                    alt="delete item"
                    className={`w-14 -mt-3 cursor-pointer ${checkIsExpanded(table.id) ? "hidden sm:block" : ""}`}
                    onClick={() => deleteTableHandler(table.id)}
                  />
                </div>
              </div>
              {checkIsExpanded(table.id) && (
                <div className="w-full h-5/6 pl-10 pr-10 pt-5 overflow-auto no-scrollbar border-t-2">
                  <EditTable table={table} ref={editRef} />
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
        {isScreenLoading}
        {!tables.length && !isScreenLoading && (
          <div className="text-center text-xl mb-5 flex flex-wrap justify-center items-end space-x-3">
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
