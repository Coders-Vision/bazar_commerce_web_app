"use client"; // Making sure, this is a Client Component
import React, { useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment } from "react";
import IconButton from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";

//Hook Type
type useModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  close: () => void;
};

// Hook
const useModal = (): useModalType => {
  const [open, setOpen] = useState(false);
  const handleOnHide = () => {
    setOpen(false);
  };
  return {
    open,
    setOpen,
    close: handleOnHide,
  };
};

// Content For Modal
type ModalContent = {
  title?: string;
  content: string | JSX.Element;
  showModalControls?: boolean; // If showModalControls is set to false then use hideCustomModal func. from Context Props to manaully close the modal.
};

//Context Type
type ModalContextProps = {
  showModal: (content: ModalContent) => Promise<boolean>;
  hideCustomModal: () => void;
};

//Context
export const ModalContext = React.createContext<ModalContextProps>({
  showModal: (content: ModalContent) => new Promise(() => false),
  hideCustomModal: () => {},
});

// React Chiildren
type Props = {
  children: React.ReactNode;
};

function ModalProvider({ children }: Props) {
  const resolver = useRef<Function>();

  const { setOpen, open, close } = useModal();
  const [content, setContent] = useState<ModalContent | null>();

  const showModal = ({
    title,
    content,
    showModalControls,
  }: ModalContent): Promise<boolean> => {
    setContent({
      title,
      content,
      showModalControls,
    });
    setOpen(true);
    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const onContinue = () => {
    resolver.current && resolver.current(true);
    close();
  };

  const onCancel = () => {
    resolver.current && resolver.current(false);
    close();
  };

  return (
    <ModalContext.Provider value={{ showModal, hideCustomModal: close }}>
      {children}

      {/* // Your headless ui component for Modal goes here... */}
      {content && (
        <Transition show={open} appear as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={onCancel}>
            <div className="fixed inset-0 bg-black bg-opacity-50" />

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-3xl overflow-hidden text-left align-middle rounded-lg ">
                    <div className="relative flex flex-col items-center w-full px-4 pb-8 overflow-hidden bg-white shadow-2xl pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                      {content?.title ? (
                        // Show title
                        <div className="w-full mb-4">
                          <div className="flex items-center justify-between space-x-2 ">
                            <h4 className="text-2xl font-semibold">
                              {content?.title}
                            </h4>
                            <IconButton
                              onClick={onCancel}
                              icon={<X size={15} />}
                            />
                          </div>
                          <hr className="my-4" />
                        </div>
                      ) : (
                        <div className="w-full my-2">
                          <div className="flex items-center justify-end ">
                            <IconButton
                              onClick={onCancel}
                              icon={<X size={15} />}
                            />
                          </div>
                        </div>
                      )}
                      {content?.content}
                      {content?.showModalControls && (
                        <div className="flex items-center justify-end w-full pt-6 space-x-2">
                          <Button onClick={onCancel}>Cancel</Button>
                          <Button onClick={onContinue}>Contnue</Button>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </ModalContext.Provider>
  );
}

export const useModalContext = (): ModalContextProps =>
  useContext(ModalContext);

export default ModalProvider;
