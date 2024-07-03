import { useState } from "react";

import addItem from "../assets/images/add-item.png";
import addItemHover from "../assets/images/add-item-hover.png";

const AddItem = ({ text, click }: { text: string; click: () => void }) => {
  const [itemImage, setItemImage] = useState(addItem);

  return (
    <div className="trans mb-4  transition ease-in-out delay-40 w-full h-10 flex items-center p-5 justify-between rounded-2xl">
      <div
        className="flex items-center cursor-pointer hover:text-primary transition ease-in-out delay-40"
        onMouseEnter={() => setItemImage(addItemHover)}
        onMouseLeave={() => setItemImage(addItem)}
        onClick={click}
      >
        <img src={itemImage} alt="add item" className="add-item" />
        <p className="ml-10">{text}</p>
      </div>
    </div>
  );
};

export default AddItem;
