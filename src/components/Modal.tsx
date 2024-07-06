import { createPortal } from "react-dom";

const portalElement = document.getElementById("overlays");

interface IBackedProps {
  closeModal: () => void;
}

const Backdrop = ({ closeModal }: IBackedProps) => {
  return <div className="w-full h-screen backdrop-blur-sm z-10 absolute" onClick={closeModal} />;
};

interface IModalOverlay {
  children: React.ReactElement;
}

const ModalOverlay = ({ children }: IModalOverlay) => {
  return (
    <div className="p-7 w-3/4 md:w-2/4 xl:w-2/5 md:p-16 top-48 bg-background border border-typography rounded-xl absolute left-1/2 transform z-20 -translate-x-1/2 text-typography text-center">
      {children}
    </div>
  );
};

interface IModalProps {
  children: React.ReactElement;
  closeModal: () => void;
}

const Modal = ({ children, closeModal }: IModalProps) => {
  return (
    <>
      {createPortal(<Backdrop closeModal={closeModal} />, portalElement!)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement!)}
    </>
  );
};

export default Modal;
