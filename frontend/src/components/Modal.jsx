import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";

export default function Modal({ triggerText = "Open Modal", title = "Modal Title", children, onSave }) {
  return (
    <Dialog>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white">
          {triggerText}
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="py-2">{children}</div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white"
              onClick={onSave}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
