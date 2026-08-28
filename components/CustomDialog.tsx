import { Cross2Icon } from "@radix-ui/react-icons";
import { Dialog, IconButton } from "@radix-ui/themes";
import { ComponentProps } from "react";

type CustomDialogRootProps = ComponentProps<typeof Dialog.Root> & {
  children: React.ReactNode;
  onClose?: () => void;
};

function Root({ children, onClose, ...props }: CustomDialogRootProps) {
  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
      }}
      {...props}
    >
      {children}
    </Dialog.Root>
  );
}

function Trigger({ children }: { children: React.ReactNode }) {
  return <Dialog.Trigger className="cursor-pointer">{children}</Dialog.Trigger>;
}

function Content({
  children,
  maxWidth = "450px",
  minHeight = "500px",
}: {
  children: React.ReactNode;
  maxWidth?: string;
  minHeight?: string;
}) {
  return (
    <Dialog.Content
      style={{
        maxWidth,
        minHeight,
      }}
    >
      <Dialog.Title>
        <Dialog.Close>
          <div className="w-full flex justify-end">
            <IconButton variant="ghost" radius="full" highContrast>
              <Cross2Icon />
            </IconButton>
          </div>
        </Dialog.Close>
      </Dialog.Title>

      {children}
    </Dialog.Content>
  );
}

export const CustomDialog = {
  Root,
  Trigger,
  Content,
};
