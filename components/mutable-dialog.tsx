'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useForm, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'sonner';
import { ZodType } from 'zod';

export interface ActionState <T>{
    success: boolean;
    message: string | null;
    data?: T;
  }
interface GenericDialogProps<T extends FieldValues> {
  formSchema: ZodType<T>;
  FormComponent: React.ComponentType<{ form: UseFormReturn<T> }>;
  action?: (data: T) => Promise<ActionState<T>>;
  triggerButtonLabel?: string;
  addDialogTitle?: string;
  editDialogTitle?: string;
  dialogDescription?: string;
  submitButtonLabel?: string;
  defaultValues?: DefaultValues<T>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function MutableDialog<T extends FieldValues>({
  formSchema,
  FormComponent,
  action, 
  defaultValues,
  triggerButtonLabel = defaultValues ? 'Edit' : 'Add',
  addDialogTitle = 'Add',
  editDialogTitle = 'Edit',
  dialogDescription = defaultValues ? 'Make changes to your item here. Click save when you\'re done.' : 'Fill out the form below to add a new item.',
  submitButtonLabel = defaultValues ? 'Save' : 'Add',
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: GenericDialogProps<T>) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const onOpenChange = controlledOnOpenChange || setInternalOpen;

  const form = useForm<T>({
    resolver: async (values) => {
      try {
        const result = formSchema.parse(values);
        return { values: result, errors: {} };
      } catch (err: any) {
        return { values: {}, errors: err.formErrors?.fieldErrors };
      }
    },
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  async function handleSubmit(data: T) {
    if (!action) {
      throw new Error("No action function provided");
    }

    const actions = await action(data);

    if (actions.success) {
      toast.success(actions.message);
    } else {
      toast.error(actions.message);
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>{triggerButtonLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{defaultValues ? editDialogTitle : addDialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormComponent form={form} />
          <div className="mt-4">
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
              <Button type="submit">{submitButtonLabel}</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

