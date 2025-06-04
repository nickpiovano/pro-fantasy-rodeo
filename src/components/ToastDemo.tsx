import React from 'react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button-new';

export const ToastDemo = () => {
  const showDefaultToast = () => {
    toast({
      title: "Default Toast",
      description: "This is a default toast notification",
    });
  };

  const showSuccessToast = () => {
    toast.success({
      title: "Success!",
      description: "Your entry has been submitted successfully",
      duration: 4000,
    });
  };

  const showErrorToast = () => {
    toast.error({
      title: "Error!",
      description: "There was a problem processing your request",
      duration: 6000,
    });
  };

  const showWarningToast = () => {
    toast.warning({
      title: "Warning!",
      description: "Contest entry closes in 15 minutes",
      duration: 7000,
    });
  };

  const showInfoToast = () => {
    toast.info({
      title: "Information",
      description: "New contestants have been added to the roster",
      duration: 5000,
    });
  };

  const showWesternToast = () => {
    toast.western({
      title: "Yee-haw! 🤠",
      description: "You're riding high on the leaderboard!",
      duration: 5000,
    });
  };

  const showPersistentToast = () => {
    toast({
      title: "Important Notice",
      description: "This toast will not disappear until you dismiss it",
      variant: "glass",
      duration: 0, // Set to 0 to make it persistent
    });
  };

  const showToastWithAction = () => {
    toast({
      title: "Confirmation Needed",
      description: "Do you want to enter this contest?",
      variant: "western",
      action: (
        <Button
          variant="western"
          size="sm"
          onClick={() => {
            toast.success({
              title: "Confirmed!",
              description: "You've entered the contest",
            });
          }}
        >
          Confirm
        </Button>
      ),
    });
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Toast Notifications</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <Button variant="primary" onClick={showDefaultToast}>Default</Button>
        <Button variant="success" onClick={showSuccessToast}>Success</Button>
        <Button variant="danger" onClick={showErrorToast}>Error</Button>
        <Button variant="secondary" onClick={showWarningToast}>Warning</Button>
        <Button variant="tertiary" onClick={showInfoToast}>Info</Button>
        <Button variant="western" useGradient onClick={showWesternToast}>Western</Button>
        <Button variant="ghost" onClick={showPersistentToast}>Persistent</Button>
        <Button variant="outline" onClick={showToastWithAction}>With Action</Button>
      </div>
    </div>
  );
}; 