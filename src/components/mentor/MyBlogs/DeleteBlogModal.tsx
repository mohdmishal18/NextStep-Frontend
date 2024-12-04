import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "shadcn/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteBlogModal = ({ blogTitle, onDelete }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <h3 className="text-lg font-semibold">Delete Blog</h3>
        <p>Are you sure you want to delete the blog "{blogTitle}"? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button onClick={onDelete} variant="destructive">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBlogModal;
