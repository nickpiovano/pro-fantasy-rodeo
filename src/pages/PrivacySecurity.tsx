import React from 'react';
import PageContainer from "@/components/PageContainer";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-new";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Shield, Lock, Bell, Eye, Mail, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const PrivacySecurity = () => {
  return (
    <PageContainer title="Privacy & Security">
      <div className="p-4 max-w-3xl mx-auto">
        <PageHeader title="Privacy & Security" />
        
        {/* Security Settings */}
        <Card className="border border-gray-700 mb-6 bg-gray-900">
          <CardHeader className="border-b border-gray-700 bg-gray-800/70">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-red-500 mr-2" />
              <CardTitle className="text-white">Security Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Password Change */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="current-password" className="text-gray-300">Current Password</Label>
                  <Input id="current-password" type="password" className="mt-1 bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="new-password" className="text-gray-300">New Password</Label>
                  <Input id="new-password" type="password" className="mt-1 bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-gray-300">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" className="mt-1 bg-gray-800 border-gray-700 text-white" />
                </div>
                <Button 
                  variant="primary"
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                  leftIcon={<Lock className="h-4 w-4" />}
                >
                  Update Password
                </Button>
              </div>
            </div>
            
            {/* Two-Factor Authentication */}
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-300 mt-1">Add an extra layer of security to your account</p>
                </div>
                <Switch id="two-factor" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Privacy Settings */}
        <Card className="border border-gray-700 mb-6 bg-gray-900">
          <CardHeader className="border-b border-gray-700 bg-gray-800/70">
            <div className="flex items-center">
              <Eye className="h-5 w-5 text-red-500 mr-2" />
              <CardTitle className="text-white">Privacy Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="public-profile" className="text-white">Public Profile</Label>
                <p className="text-sm text-gray-300">Allow others to see your profile and teams</p>
              </div>
              <Switch id="public-profile" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <div>
                <Label htmlFor="leaderboard" className="text-white">Show on Leaderboards</Label>
                <p className="text-sm text-gray-300">Display your name on public leaderboards</p>
              </div>
              <Switch id="leaderboard" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <div>
                <Label htmlFor="data-collection" className="text-white">Data Collection</Label>
                <p className="text-sm text-gray-300">Allow us to collect usage data to improve your experience</p>
              </div>
              <Switch id="data-collection" />
            </div>
          </CardContent>
        </Card>
        
        {/* Notification Preferences */}
        <Card className="border border-gray-700 mb-6 bg-gray-900">
          <CardHeader className="border-b border-gray-700 bg-gray-800/70">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-red-500 mr-2" />
              <CardTitle className="text-white">Notification Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="text-white">Email Notifications</Label>
                <p className="text-sm text-gray-300">Receive updates and promotions via email</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <div>
                <Label htmlFor="contest-reminders" className="text-white">Contest Reminders</Label>
                <p className="text-sm text-gray-300">Get notified about upcoming contests</p>
              </div>
              <Switch id="contest-reminders" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <div>
                <Label htmlFor="marketing" className="text-white">Marketing Communications</Label>
                <p className="text-sm text-gray-300">Receive offers and promotions from our partners</p>
              </div>
              <Switch id="marketing" />
            </div>
          </CardContent>
        </Card>
        
        {/* Delete Account */}
        <div className="mt-8 p-4 border border-red-700 rounded-lg bg-red-900/30">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-red-300">Delete Account</h3>
              <p className="text-sm text-gray-200 mt-1 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button 
                variant="primary" 
                className="bg-red-700 hover:bg-red-800 text-white"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default PrivacySecurity; 