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
  showModalControls?: boolean;
};

//Context Type
type ModalContextProps = {
  showModal: (content: ModalContent) => Promise<boolean>;
};

//Context
export const ModalContext = React.createContext<ModalContextProps>({
  showModal: (content: ModalContent) => new Promise(() => false),
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
    <ModalContext.Provider value={{ showModal }}>
      {children}

      {/* // Your headless ui component for Modal goes here... */}
      {content && (
        <Transition show={open} appear as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={onCancel}>
            <div className="fixed inset-0 bg-black bg-opacity-50" />

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle ">
                    <div className="relative flex flex-col w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                      {content?.title ? (
                        // Show title
                        <div className="mb-4 w-full">
                          <div className="space-x-2 flex items-center justify-between ">
                            <h4 className="font-semibold text-2xl">
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
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
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

const useModalContext = (): ModalContextProps => useContext(ModalContext);
export { useModalContext, useModal };

export default ModalProvider;
