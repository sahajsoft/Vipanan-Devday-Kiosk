"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Attendee } from "@/types/event";
import { z } from "zod";

interface AddAttendeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (attendee: Omit<Attendee, 'isPresent'>) => void;
}

// Form validation schema
const attendeeFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  orgName: z.string().min(1, "Organization name is required"),
  linkedInProfile: z.string().url().optional().or(z.literal("")),
  agreeToEmails: z.boolean(),
});

type AttendeeFormData = z.infer<typeof attendeeFormSchema>;

const initialFormData: AttendeeFormData = {
  firstName: "",
  lastName: "",
  email: "",
  orgName: "",
  linkedInProfile: "",
  agreeToEmails: false,
};

export function AddAttendeeModal({ isOpen, onClose, onSubmit }: AddAttendeeModalProps) {
  const [formData, setFormData] = useState<AttendeeFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof AttendeeFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof AttendeeFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    try {
      attendeeFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof AttendeeFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof AttendeeFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
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
            <FormField
              id="firstName"
              label="First Name *"
              value={formData.firstName}
              onChange={handleInputChange}
              error={errors.firstName}
              required
            />
            <FormField
              id="lastName"
              label="Last Name *"
              value={formData.lastName}
              onChange={handleInputChange}
              error={errors.lastName}
              required
            />
          </div>
          
          <FormField
            id="email"
            label="Email Address *"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />

          <FormField
            id="orgName"
            label="Organization Name *"
            value={formData.orgName}
            onChange={handleInputChange}
            error={errors.orgName}
            required
          />

          <FormField
            id="linkedInProfile"
            label="LinkedIn Profile URL (Optional)"
            type="url"
            value={formData.linkedInProfile || ""}
            onChange={handleInputChange}
            error={errors.linkedInProfile}
          />

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
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-sahaj-green px-4 py-2 text-gray-700 hover:bg-opacity-90 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  required?: boolean;
}

function FormField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300'
        } p-2 focus:border-sahaj-violet focus:outline-none focus:ring-1 focus:ring-sahaj-violet`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 