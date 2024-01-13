"use client";

import type { Dispatch, FC, SetStateAction } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface RightDrawerProps {
  drawerObj: { id: number }[] | null;
  setDrawerObj: Dispatch<SetStateAction<{ id: number }[] | null>>;
}

export const RightDrawer: FC<RightDrawerProps> = ({
  drawerObj,
  setDrawerObj,
}) => {
  const onClose = () => setDrawerObj(null);

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
                <div className="flex h-full flex-col overflow-y-scroll bg-white px-6 py-6 shadow-xl">
                  <div className="">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-base font-medium text-gray-900">
                        Ürün Detayı
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
                  <div className="relative flex-1 ">
                    {/* Replace with your content */}

                    <div className="flex space-x-2 py-3">
                      <Button
                        // onClick close popover
                        // onClick={handleRemoveDetail}
                        size={Button.size.SMALL}
                        variant={Button.variant.DANGER}
                        // color="danger"
                        className=""
                      >
                        Satırı Sil
                      </Button>

                      <Button
                        // onClick close popover
                        // onClick={handleCopyDetail}
                        size={Button.size.SMALL}
                        variant={Button.variant.PRIMARY}
                        // color="primary"
                        className=""
                      >
                        Satırı Kopyala
                      </Button>
                    </div>

                    <div className="-mx-6 h-36 bg-gray-500 py-1">
                      {/* <Image
                          className="object-contain w-full h-full"
                          src={null}
                          alt={product?.name}
                        /> */}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-end">
                        <span className="text-sm text-gray-500">
                          stokta 34 adet var
                        </span>
                      </div>
                      <Input
                        id="description"
                        label="Açıklama"
                        name="description"
                      />
                      <Input
                        id="gtipNo"
                        label="Gtip No"
                        name="gtipNo"
                        onChange={(e) => {
                          // allow only numbers max 18 digits
                          const regex = /^[0-9\b]{0,18}$/;
                          if (!regex.test(e.target.value)) return;
                        }}
                      />
                      <Input id="indirim" name="indirim" label="indirim" />
                      <div className="mt-2">
                        <span className="py-2 text-sm text-gray-700">
                          Diğer Vergiler
                        </span>
                      </div>
                      <Input id="KDV" name="KDV" label="KDV Tevkifatı" />
                      <Input
                        id="Stopajı"
                        name="Stopajı"
                        label="Gelir/Kurum Stopajı"
                      />
                      <Input
                        id="İletişim"
                        name="İletişim"
                        label="Özel İletişim Vergisi"
                      />
                      <Input
                        id="Tüketim"
                        name="Tüketim"
                        label="Özel Tüketim Vergisi"
                      />
                      <Input
                        id="Konaklama"
                        name="Konaklama"
                        label="Konaklama Vergisi"
                      />
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
