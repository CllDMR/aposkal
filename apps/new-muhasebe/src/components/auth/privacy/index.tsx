import type { Dispatch, FC, SetStateAction } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { AcıkRızaBeyanı } from "./AcıkRızaBeyanı";
import { AydınlatmaMetni } from "./AydınlatmaMetni";
import { PrivacyPolicy } from "./PrivacyPolicy";

interface PrivacyProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
}

export const Privacy: FC<PrivacyProps> = ({ open, setOpen, name }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 md:w-5/6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <div className="container mx-auto my-2 rounded-md px-4 text-left ">
                      <div className="mt-10 flex justify-end">
                        {/* <Logo className="w-48 " /> */}
                      </div>
                      <div className="">
                        <PrivacyPolicy />
                      </div>
                      <div className="mt-10">
                        <AydınlatmaMetni />
                        <AcıkRızaBeyanı displayName={name} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    Okudum ve Kabul Ediyorum
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
