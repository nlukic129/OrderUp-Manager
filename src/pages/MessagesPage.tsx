import { useContext, useState } from "react";

import Input from "components/Input";
import { StorageContext } from "data/StorageContext";
import Button from "components/Button";
import MessageBox from "components/MessageBox";
import { motion } from "framer-motion";

const MessagesPage = () => {
  const { isLoading, selectedVenue, addMessage, deleteMessage } = useContext(StorageContext);
  const [messageText, setMessageText] = useState("");
  const [isMessageValid, setIsMessageValid] = useState(false);

  const addMessageHandler = async () => {
    try {
      await addMessage(messageText);
      setMessageText("");
      setIsMessageValid(false);
    } catch (e: any) {
      console.log(e);
      // TODO: Handle error
    }
  };

  const deleteMessageHandler = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
    } catch (e: any) {
      console.log(e);
      // TODO: Handle error
    }
  };

  const messageInputConfig = {
    label: "Enter your message",
    placeholder: "exp. Clean the table",
    type: "text",
    onChangeInput: setMessageText,
    required: true,
    isDisabled: isLoading,
    checkValidity: (value: string) => value.length > 0,
    onChangeValidity: setIsMessageValid,
    value: messageText,
  };

  return (
    <>
      <h1 className="text-3xl">Add a message</h1>
      <div className="mt-10 md:w-3/4 xl:w-2/4">
        <Input {...messageInputConfig}></Input>
        <Button click={addMessageHandler} isLoading={isLoading} disabled={!isMessageValid}>
          Add message
        </Button>
      </div>
      <h1 className="text-3xl mt-16 mb-10">Messages</h1>
      <motion.div className="flex flex-wrap max-h-72 overflow-auto" variants={containerVariants} initial="hidden" animate="visible">
        {selectedVenue &&
          selectedVenue.messages.map((message, index) => (
            <motion.div key={index} className="item" variants={itemVariants}>
              <MessageBox key={index} click={() => deleteMessageHandler(message.id)}>
                {message.message}
              </MessageBox>
            </motion.div>
          ))}
      </motion.div>
    </>
  );
};

export default MessagesPage;

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
