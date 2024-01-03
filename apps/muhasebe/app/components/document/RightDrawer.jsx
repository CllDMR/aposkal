"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

const RightDrawer = (props) => {
  const { drawerObj, setDrawerObj, title, children } = props;

  const onClose = () => setDrawerObj(null);

  const product = null;
  return (
    <Transition.Root show={drawerObj !== null} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden "
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 px-6 shadow-xl">
                  <div className=" ">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-base font-medium text-gray-900">
                        {null || "Ürün Detayı"}
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative  flex-1 ">
                    {/* Replace with your content */}

                    <div className="flex space-x-2 py-3">
                      <Button
                        // onClick close popover
                        // onClick={handleRemoveDetail}
                        size="sm"
                        color="danger"
                        className=""
                      >
                        Satırı Sil
                      </Button>

                      <Button
                        // onClick close popover
                        // onClick={handleCopyDetail}
                        size="sm"
                        color="primary"
                        className=""
                      >
                        Satırı Kopyala
                      </Button>
                    </div>

                    <div className="h-36  py-1 -mx-6 bg-gray-500">
                      {/* <Image
                          className="h-full w-full object-contain"
                          src={null}
                          alt={product?.name}
                        /> */}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-end">
                        <span className="text-sm  text-gray-500">
                          stokta 34 adet var
                        </span>
                      </div>
                      <Input label="Açıklama" name="description" />
                      <Input
                        label="Gtip No"
                        name="gtipNo"
                        onChange={(e) => {
                          // allow only numbers max 18 digits
                          const regex = /^[0-9\b]{0,18}$/;
                          if (!regex.test(e.target.value)) return;
                        }}
                      />
                      <Input label="indirim" />
                      <div className="mt-2">
                        <span className="py-2 text-sm text-gray-700">
                          Diğer Vergiler
                        </span>
                      </div>
                      <Input label="KDV Tevkifatı" />
                      <Input label="Gelir/Kurum Stopajı" />
                      <Input label="Özel İletişim Vergisi" />
                      <Input label="Özel Tüketim Vergisi" />
                      <Input label="Konaklama Vergisi" />
                    </div>

                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RightDrawer;
