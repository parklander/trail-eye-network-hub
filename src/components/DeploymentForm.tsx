
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type DeploymentFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // future: onSubmit, initialValues etc.
};

export const DeploymentForm: React.FC<DeploymentFormProps> = ({ open, onOpenChange }) => {
  // Form state, validation, etc., can be added later
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Camera Deployment</DialogTitle>
          <DialogDescription>
            Enter details for the new camera deployment. (This is a demo form.)
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="deployment-name">
              Deployment Name
            </label>
            <Input id="deployment-name" placeholder="Ex: North Forest" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="location">
              Location Description
            </label>
            <Textarea id="location" placeholder="Describe location or coordinates" />
          </div>
          {/* Future: Camera select, date pickers, metadata */}
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled>
            Save (Demo Only)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
