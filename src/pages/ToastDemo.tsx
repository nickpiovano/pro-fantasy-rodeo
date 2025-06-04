import React from 'react';
import { ToastDemo } from '@/components/ToastDemo';
import PageContainer from '@/components/PageContainer';

const ToastDemoPage = () => {
  return (
    <PageContainer 
      title="Toast Notifications" 
      contentClassName="max-w-4xl mx-auto p-4"
    >
      <div className="space-y-8">
        <section>
          <h1 className="text-3xl font-bold mb-6 text-center">Toast Notification System</h1>
          <p className="text-lg text-center mb-8">
            Click the buttons below to see different toast notification styles.
          </p>
          
          <ToastDemo />
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">About Toast Notifications</h2>
          <p className="mb-4">
            Toast notifications provide a non-intrusive way to communicate important information 
            to users. They appear temporarily and then disappear automatically.
          </p>
          <p>
            Our Western-themed toast system includes various styles suitable for different types 
            of messages and can be customized with actions for user interaction.
          </p>
        </section>
      </div>
    </PageContainer>
  );
};

export default ToastDemoPage; 