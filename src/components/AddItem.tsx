import addItem from "../assets/images/add-item.png";

const AddItem = ({ text }: { text: string }) => {
  return (
    <div className="trans mb-4  transition ease-in-out delay-40 w-full h-10 flex items-center p-5 justify-between rounded-2xl">
      <div className="flex items-center cursor-pointer hover:text-primary transition ease-in-out delay-40">
        <img src={addItem} alt="add item" className="add-item" />
        <p className="ml-10">{text}</p>
      </div>
    </div>
  );
};

export default AddItem;
