// components/Modal.tsx

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children: React.ReactNode;
};

export default function Modal({
  title,
  isOpen,
  onChange,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content
          className="
            fixed
            left-1/2
            top-1/2
            w-full
            max-w-md
            -translate-x-1/2
            -translate-y-1/2
            rounded-lg
            bg-white
            p-6
            shadow-xl
          "
        >
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">
              {title}
            </Dialog.Title>

            <Dialog.Close asChild>
              <button
                className="
                  rounded-md
                  p-1
                  hover:bg-black/10
                  cursor-pointer
                "
              >
                <X color="rgb(80, 82, 88)" />
              </button>
            </Dialog.Close>
          </div>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
