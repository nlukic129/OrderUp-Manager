import { motion } from "framer-motion";
import { useRef, useState, useEffect, useContext } from "react";

import { ICategory } from "types/venueType";
import { StorageContext } from "data/StorageContext";
import expandItem from "../../assets/images/expand-item.png";
import deleteItem from "../../assets/images/delete-item.png";
import penIcon from "../../assets/images/pen.png";
import saveIcon from "../../assets/images/save-icon.png";
import xIcon from "../../assets/images/x-icon.png";
import LoadSpinner from "components/LoadSpinner";
import Modal from "components/Modal";
import Article from "./Article";

interface ICategoryProps {
  category: ICategory;
}

const Category: React.FC<ICategoryProps> = ({ category }) => {
  const [editNameMode, setEditNameMode] = useState(false);
  const [newName, setNewName] = useState(category.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editNameRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { editCategoryName, isLoading, deleteArticleCategory } = useContext(StorageContext);

  useEffect(() => {
    if (editNameMode && editNameRef.current) {
      editNameRef.current.focus();
      adjustInputWidth();
    }
  }, [editNameMode, newName]);

  const adjustInputWidth = () => {
    if (spanRef.current && editNameRef.current) {
      editNameRef.current.style.width = `${newName.length}ch`;
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
    adjustInputWidth();
  };

  const closeEditNameHandler = () => {
    setNewName(category.name);
    setEditNameMode(false);
  };

  const saveNewNameHandler = async () => {
    if (newName.trim().length === 0 || newName === category.name) {
      setNewName(category.name);
      setEditNameMode(false);
      return;
    }

    await editCategoryName({ id: category.id, name: newName });
    setEditNameMode(false);
  };

  const deleteCategoryHandler = async () => {
    await deleteArticleCategory(category.id);
  };

  return (
    <>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <>
            <p>Are you sure you want to remove category?</p>
            <button
              className="bg-primary hover:bg-primaryHover mt-5 pt-2 pb-2 pl-6 pr-6 rounded-lg hover:outline-none transition ease-in-out delay-100 w-full bg-opacity-60 hover:bg-opacity-100 font-global font-regular text-typography cursor-pointer"
              type="button"
              onClick={() => deleteCategoryHandler()}
            >
              Yes
            </button>
            <button
              className="bg-supporting hover:bg-supportingHover pt-2 pb-2 pl-6 pr-6 rounded-lg hover:outline-none transition ease-in-out delay-100 w-full bg-opacity-60 hover:bg-opacity-100 font-global font-regular text-typography cursor-pointer mt-3"
              type="button"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              No
            </button>
          </>
        </Modal>
      )}
      <motion.div className="tableRowWrapper" variants={itemVariants}>
        <motion.div
          className={`tableRow ${isExpanded ? "" : " hover:bg-opacity-100"}`}
          variants={tableRow}
          animate={isExpanded ? "expanded" : "collapsed"}
        >
          <div className="tableRowInside">
            <div className="flex">
              <img
                src={expandItem}
                alt="expand item"
                className="w-12 h-12 -mt-2 transform transition-transform duration-300 cursor-pointer"
                onClick={() => setIsExpanded((prev) => !prev)}
              />
              {!editNameMode ? (
                <>
                  <p className="ml-5 mt-1 sm:ml-10 text-xl">{category.name}</p>
                  <img
                    src={penIcon}
                    className="w-5 h-5 mt-[6px] ml-2 cursor-pointer hidden md:block"
                    alt="pen"
                    onClick={() => setEditNameMode(true)}
                  />
                </>
              ) : (
                <>
                  <input
                    ref={editNameRef}
                    type="text"
                    value={newName}
                    onChange={inputChangeHandler}
                    className="bg-transparent mb-4 ml-9 text-xl focus:outline-none focus:border-transparent"
                  />
                  {isLoading ? (
                    <div className="ml-2">
                      <LoadSpinner />
                    </div>
                  ) : (
                    <>
                      <img src={saveIcon} className="w-5 h-5 mt-[6px] ml-1 cursor-pointer" alt="pen" onClick={saveNewNameHandler} />
                      <img src={xIcon} className="w-5 h-5 mt-[6px] ml-2 cursor-pointer" alt="pen" onClick={closeEditNameHandler} />
                    </>
                  )}
                </>
              )}
            </div>
            <img src={deleteItem} alt="delete item" className="w-14 -mt-3 cursor-pointer" onClick={() => setIsModalOpen(true)} />
          </div>
          {isExpanded && (
            <div>
              <div className="w-full h-5/6 pl-10 pr-10 pt-5 overflow-auto no-scrollbar border-t-2">
                {category.articles.map((article, index) => (
                  <Article articleData={article} categoryType={category.type.name} key={index} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
        <span ref={spanRef} className="absolute top-0 left-0 invisible ">
          {newName}
        </span>
      </motion.div>
    </>
  );
};

export default Category;

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
