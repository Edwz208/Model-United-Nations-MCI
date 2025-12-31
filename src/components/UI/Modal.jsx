import { Fragment } from "react"
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}) {
  const sizeToMaxW = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-2 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-2 scale-95"
            >
              <DialogPanel
                className={[
                  "w-full",
                  sizeToMaxW[size],
                  "rounded-2xl border shadow-xl",
                  "bg-card-surface border-border",
                  "text-text-primary",
                ].join(" ")}
              >
                {(title || description) && (
                  <div className="flex items-start justify-between gap-4 border-b border-border p-5">
                    <div>
                      {title && (
                        <DialogTitle className="text-lg font-semibold">
                          {title}
                        </DialogTitle>
                      )}
                      {description && (
                        <p className="mt-1 text-sm opacity-70">
                          {description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onClose(false)}
                      className="rounded-xl p-2 hover:bg-background"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                )}

                <div className="p-5">
                  {children}
                </div>

                {footer && (
                  <div className="flex justify-end gap-2 border-t border-border bg-background/60 p-4">
                    {footer}
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
