import React from 'react';
import PageContainer from "@/components/PageContainer";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-new";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, CreditCard, Settings, ChevronRight, Plus, Edit, Save } from "lucide-react";

const AccountSettings = () => {
  return (
    <PageContainer title="Account Settings">
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Account Settings</h1>
        
        {/* Profile Information */}
        <Card className="border border-gray-700 mb-6">
          <CardHeader className="border-b border-gray-800 bg-gray-900">
            <div className="flex items-center">
              <User className="h-5 w-5 text-red-500 mr-2" aria-hidden="true" />
              <CardTitle className="text-white">Profile Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">JP</span>
              </div>
              <div>
                <Button 
                  variant="outline" 
                  className="text-sm border-gray-600 text-gray-300 hover:bg-gray-800"
                  leftIcon={<Edit className="h-4 w-4" />}
                >
                  Change Photo
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name" className="text-gray-300">First Name</Label>
                <Input id="first-name" defaultValue="John" className="mt-1 bg-gray-800 border-gray-700 text-white" />
              </div>
              
              <div>
                <Label htmlFor="last-name" className="text-gray-300">Last Name</Label>
                <Input id="last-name" defaultValue="Piper" className="mt-1 bg-gray-800 border-gray-700 text-white" />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.piper@example.com" className="mt-1 bg-gray-800 border-gray-700 text-white" />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="(555) 123-4567" className="mt-1 bg-gray-800 border-gray-700 text-white" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="bio" className="text-gray-300">Bio</Label>
              <Textarea 
                id="bio" 
                defaultValue="Rodeo enthusiast from Texas. Been watching PRCA events for over 10 years."
                className="mt-1 bg-gray-800 border-gray-700 text-white h-24"
              />
            </div>
            
            <div className="flex justify-center sm:justify-start">
              <Button 
                variant="primary"
                className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                leftIcon={<Save className="h-4 w-4" />}
              >
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Payment Methods */}
        <Card className="border border-gray-700 mb-6">
          <CardHeader className="border-b border-gray-800 bg-gray-900">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-red-500 mr-2" aria-hidden="true" />
              <CardTitle className="text-white">Payment Methods</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Saved Payment Methods */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-900 rounded-md flex items-center justify-center mr-3">
                    <span className="text-xs font-bold text-white">VISA</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">•••• •••• •••• 4242</p>
                    <p className="text-xs text-gray-400">Expires 05/2026</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400 hover:text-white"
                  leftIcon={<Edit className="h-4 w-4" />}
                  ariaLabel="Edit payment method"
                >
                  Edit
                </Button>
              </div>
            </div>
            
            {/* Add New Payment Method */}
            <div className="flex justify-center sm:justify-start">
              <Button 
                variant="outline" 
                className="w-full border-dashed border-gray-600 text-gray-300 hover:bg-gray-800"
                leftIcon={<Plus className="h-4 w-4" />}
              >
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Account Preferences */}
        <Card className="border border-gray-700">
          <CardHeader className="border-b border-gray-800 bg-gray-900">
            <div className="flex items-center">
              <Settings className="h-5 w-5 text-red-500 mr-2" aria-hidden="true" />
              <CardTitle className="text-white">Account Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="language" className="text-gray-300">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="mt-1 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="timezone" className="text-gray-300">Timezone</Label>
              <Select defaultValue="america_new_york">
                <SelectTrigger className="mt-1 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="america_new_york">America/New York</SelectItem>
                  <SelectItem value="america_chicago">America/Chicago</SelectItem>
                  <SelectItem value="america_denver">America/Denver</SelectItem>
                  <SelectItem value="america_los_angeles">America/Los Angeles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="currency" className="text-gray-300">Currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger className="mt-1 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="cad">CAD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-center sm:justify-start">
              <Button 
                variant="primary"
                className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                leftIcon={<Save className="h-4 w-4" />}
              >
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AccountSettings; 