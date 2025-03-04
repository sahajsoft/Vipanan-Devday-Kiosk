"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Attendee } from "@/types/event";

interface AddAttendeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (attendee: Omit<Attendee, 'isPresent'>) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  orgName: string;
  linkedInProfile: string;
  agreeToEmails: boolean;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  orgName: "",
  linkedInProfile: "",
  agreeToEmails: false,
};

export function AddAttendeeModal({ isOpen, onClose, onSubmit }: AddAttendeeModalProps) {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Reset form when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSubmit = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        orgName: formData.orgName,
        linkedInProfile: formData.linkedInProfile || undefined,
        agreeToEmails: formData.agreeToEmails,
      };
      await onSubmit(formDataToSubmit);
      setFormData(initialFormData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Attendee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-sahaj-violet focus:outline-none focus:ring-1 focus:ring-sahaj-violet"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-sahaj-violet focus:outline-none focus:ring-1 focus:ring-sahaj-violet"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-sahaj-violet focus:outline-none focus:ring-1 focus:ring-sahaj-violet"
            />
          </div>

          <div>
            <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name *
            </label>
            <input
              id="orgName"
              name="orgName"
              type="text"
              required
              value={formData.orgName}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-sahaj-violet focus:outline-none focus:ring-1 focus:ring-sahaj-violet"
            />
          </div>

          <div>
            <label htmlFor="linkedInProfile" className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile URL (Optional)
            </label>
            <input
              id="linkedInProfile"
              name="linkedInProfile"
              type="url"
              value={formData.linkedInProfile}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-sahaj-violet focus:outline-none focus:ring-1 focus:ring-sahaj-violet"
            />
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="agreeToEmails"
              name="agreeToEmails"
              checked={formData.agreeToEmails}
              onChange={handleInputChange}
              className="h-5 w-5 rounded border-gray-300 text-sahaj-violet focus:ring-sahaj-violet"
            />
            <label htmlFor="agreeToEmails" className="text-sm text-gray-600">
              Agree to receive emails
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-sahaj-green px-4 py-2 text-gray-700 hover:bg-opacity-90 transition-colors"
            >
              Register
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 