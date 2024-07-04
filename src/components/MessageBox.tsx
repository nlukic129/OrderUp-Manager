import xIcon from "../assets/images/x-icon.png";

interface IMessageBoxProps {
  children: React.ReactNode;
  click: () => void;
}

const MessageBox = ({ children, click }: IMessageBoxProps) => {
  return (
    <div className="bg-primary mr-5 mb-5 rounded-lg pl-4 pr-3 pt-1 pb-1 flex justify-between hover:bg-primaryHover cursor-default  border border-typography">
      {children}
      <img src={xIcon} alt="x-icon" className="ml-3 cursor-pointer " onClick={click} />
    </div>
  );
};

export default MessageBox;
