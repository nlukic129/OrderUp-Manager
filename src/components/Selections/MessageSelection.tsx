import { motion } from "framer-motion";
import { IMessage } from "types/venueType";

interface IMessageSelectionProps {
  messages: IMessage[];
  messageIds: string[];
  setMessageIds: (ids: string[]) => void;
}

const MessageSelection = ({ messages, messageIds, setMessageIds }: IMessageSelectionProps) => {
  const checkMessageSelected = (id: string) => {
    return messageIds.includes(id);
  };

  const toggleMessageHandler = (id: string) => {
    if (messageIds.includes(id)) {
      setMessageIds(messageIds.filter((messageId) => messageId !== id));
    } else {
      setMessageIds([...messageIds, id]);
    }
  };
  return (
    <motion.div className="flex flex-wrap" variants={containerVariants} initial="hidden" animate="visible">
      {messages &&
        messages.map((message, index) => (
          <motion.div key={index} className="item" variants={itemVariants}>
            <div className={checkMessageSelected(message.id) ? "messageBox" : "messageBoxUnselect"} onClick={() => toggleMessageHandler(message.id)}>
              {message.message}
            </div>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default MessageSelection;

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
