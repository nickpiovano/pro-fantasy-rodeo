import React from 'react';
import PageContainer from "@/components/PageContainer";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-new";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { styleGuide } from "@/styles/style-guide";
import WesternCard from "@/components/ui/western-card";
import WesternHeading from "@/components/ui/western-heading";
import { StyleProvider } from "@/components/StyleProvider";
import { Trophy, Calendar, Info, ArrowRight, ChevronRight, ChevronLeft, Search, Plus, Check } from "lucide-react";

const StyleGuide = () => {
  const { colors, typography, spacing, borderRadius, accessibility, westernTheme } = styleGuide;
  
  // Helper to display a color swatch
  const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
    <div className="flex flex-col items-center">
      <div 
        className="h-12 w-12 rounded-md mb-1 shadow-md" 
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-gray-300">{name}</span>
    </div>
  );
  
  return (
    <StyleProvider theme="western">
      <PageContainer title="Style Guide">
        <div className="p-4 max-w-5xl mx-auto">
          <WesternHeading 
            as="h1" 
            variant="fancy" 
            size="2xl" 
            gradient 
            uppercase 
            textShadow 
            centered 
            className="mb-6"
          >
            Pro Fantasy Rodeo Style Guide
          </WesternHeading>
          
          <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
            This style guide provides a reference for colors, typography, and components used throughout the application.
            Following these guidelines ensures consistency and accessibility.
          </p>
          
          {/* Color Palette */}
          <section className="mb-12">
            <WesternHeading 
              as="h2" 
              variant="primary" 
              decorated 
              className="mb-6"
            >
              Color Palette
            </WesternHeading>
            
            <div className="space-y-8">
              {/* Primary Colors */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Primary (Red)</h3>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-4">
                  <ColorSwatch color={colors.primary[50]} name="50" />
                  <ColorSwatch color={colors.primary[100]} name="100" />
                  <ColorSwatch color={colors.primary[200]} name="200" />
                  <ColorSwatch color={colors.primary[300]} name="300" />
                  <ColorSwatch color={colors.primary[400]} name="400" />
                  <ColorSwatch color={colors.primary[500]} name="500" />
                  <ColorSwatch color={colors.primary[600]} name="600" />
                  <ColorSwatch color={colors.primary[700]} name="700" />
                  <ColorSwatch color={colors.primary[800]} name="800" />
                  <ColorSwatch color={colors.primary[900]} name="900" />
                </div>
              </div>
              
              {/* Secondary Colors */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Secondary (Earth Tones)</h3>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-4">
                  <ColorSwatch color={colors.secondary[50]} name="50" />
                  <ColorSwatch color={colors.secondary[100]} name="100" />
                  <ColorSwatch color={colors.secondary[200]} name="200" />
                  <ColorSwatch color={colors.secondary[300]} name="300" />
                  <ColorSwatch color={colors.secondary[400]} name="400" />
                  <ColorSwatch color={colors.secondary[500]} name="500" />
                  <ColorSwatch color={colors.secondary[600]} name="600" />
                  <ColorSwatch color={colors.secondary[700]} name="700" />
                  <ColorSwatch color={colors.secondary[800]} name="800" />
                  <ColorSwatch color={colors.secondary[900]} name="900" />
                </div>
              </div>
              
              {/* Accent Colors */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Accent (Gold/Amber)</h3>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-4">
                  <ColorSwatch color={colors.accent[50]} name="50" />
                  <ColorSwatch color={colors.accent[100]} name="100" />
                  <ColorSwatch color={colors.accent[200]} name="200" />
                  <ColorSwatch color={colors.accent[300]} name="300" />
                  <ColorSwatch color={colors.accent[400]} name="400" />
                  <ColorSwatch color={colors.accent[500]} name="500" />
                  <ColorSwatch color={colors.accent[600]} name="600" />
                  <ColorSwatch color={colors.accent[700]} name="700" />
                  <ColorSwatch color={colors.accent[800]} name="800" />
                  <ColorSwatch color={colors.accent[900]} name="900" />
                </div>
              </div>
              
              {/* Status Colors */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Status Colors</h3>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-md font-medium text-white mb-2">Success</h4>
                    <div className="grid grid-cols-5 gap-2">
                      <ColorSwatch color={colors.success[300]} name="300" />
                      <ColorSwatch color={colors.success[400]} name="400" />
                      <ColorSwatch color={colors.success[500]} name="500" />
                      <ColorSwatch color={colors.success[600]} name="600" />
                      <ColorSwatch color={colors.success[700]} name="700" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-white mb-2">Warning</h4>
                    <div className="grid grid-cols-5 gap-2">
                      <ColorSwatch color={colors.warning[300]} name="300" />
                      <ColorSwatch color={colors.warning[400]} name="400" />
                      <ColorSwatch color={colors.warning[500]} name="500" />
                      <ColorSwatch color={colors.warning[600]} name="600" />
                      <ColorSwatch color={colors.warning[700]} name="700" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-white mb-2">Error</h4>
                    <div className="grid grid-cols-5 gap-2">
                      <ColorSwatch color={colors.error[300]} name="300" />
                      <ColorSwatch color={colors.error[400]} name="400" />
                      <ColorSwatch color={colors.error[500]} name="500" />
                      <ColorSwatch color={colors.error[600]} name="600" />
                      <ColorSwatch color={colors.error[700]} name="700" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background Colors */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Background Colors</h3>
                <div className="grid grid-cols-4 gap-4">
                  <ColorSwatch color={colors.background.default} name="Default" />
                  <ColorSwatch color={colors.background.paper} name="Paper" />
                  <ColorSwatch color={colors.background.elevated} name="Elevated" />
                  <ColorSwatch color={colors.background.dark} name="Dark" />
                </div>
              </div>
            </div>
          </section>
          
          {/* Typography */}
          <section className="mb-12">
            <WesternHeading 
              as="h2" 
              variant="primary" 
              decorated 
              className="mb-6"
            >
              Typography
            </WesternHeading>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Font Families</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">Primary Font</p>
                    <p className="text-lg" style={{ fontFamily: typography.fontFamily.primary }}>
                      The quick brown fox jumps over the lazy dog.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">Display Font</p>
                    <p className="text-lg" style={{ fontFamily: typography.fontFamily.display }}>
                      The quick brown fox jumps over the lazy dog.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">Western Font</p>
                    <p className="text-lg" style={{ fontFamily: typography.fontFamily.western }}>
                      The quick brown fox jumps over the lazy dog.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">Mono Font</p>
                    <p className="text-lg" style={{ fontFamily: typography.fontFamily.mono }}>
                      The quick brown fox jumps over the lazy dog.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Font Sizes</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-16 text-gray-400 text-sm">xs</span>
                    <span style={{ fontSize: typography.fontSize.xs }}>Extra Small Text (0.75rem)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-400 text-sm">sm</span>
                    <span style={{ fontSize: typography.fontSize.sm }}>Small Text (0.875rem)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-400 text-sm">base</span>
                    <span style={{ fontSize: typography.fontSize.base }}>Base Text (1rem)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-400 text-sm">lg</span>
                    <span style={{ fontSize: typography.fontSize.lg }}>Large Text (1.125rem)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-400 text-sm">xl</span>
                    <span style={{ fontSize: typography.fontSize.xl }}>Extra Large Text (1.25rem)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-400 text-sm">2xl</span>
                    <span style={{ fontSize: typography.fontSize['2xl'] }}>2XL Text (1.5rem)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-400 text-sm">3xl</span>
                    <span style={{ fontSize: typography.fontSize['3xl'] }}>3XL Text (1.875rem)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-400 text-sm">4xl</span>
                    <span style={{ fontSize: typography.fontSize['4xl'] }}>4XL Text (2.25rem)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-400 text-sm">5xl</span>
                    <span style={{ fontSize: typography.fontSize['5xl'] }}>5XL Text (3rem)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Western Headings */}
          <section className="mb-12">
            <WesternHeading 
              as="h2" 
              variant="primary" 
              decorated 
              className="mb-6"
            >
              Western Headings
            </WesternHeading>
            
            <div className="space-y-8">
              <WesternHeading as="h1" variant="default">Default Heading (h1)</WesternHeading>
              <WesternHeading as="h2" variant="primary">Primary Heading (h2)</WesternHeading>
              <WesternHeading as="h3" variant="accent">Accent Heading (h3)</WesternHeading>
              <WesternHeading as="h4" variant="fancy">Fancy Heading (h4)</WesternHeading>
              <WesternHeading as="h5" variant="display">Display Heading (h5)</WesternHeading>
              
              <div className="pt-4">
                <WesternHeading as="h3" variant="primary" decorated>Decorated Heading</WesternHeading>
              </div>
              
              <div className="pt-4">
                <WesternHeading as="h3" variant="fancy" gradient uppercase>Gradient & Uppercase</WesternHeading>
              </div>
              
              <div className="pt-4">
                <WesternHeading as="h3" variant="accent" textShadow centered>Centered with Text Shadow</WesternHeading>
              </div>
            </div>
          </section>
          
          {/* Western Cards */}
          <section className="mb-12">
            <WesternHeading 
              as="h2" 
              variant="primary" 
              decorated 
              className="mb-6"
            >
              Western Cards
            </WesternHeading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WesternCard 
                variant="primary" 
                title="Primary Card" 
                subtitle="With gradient header"
                icon={<Trophy className="h-5 w-5" />}
                badgeText="Featured"
                ariaLabel="Example of a primary western card"
              >
                <p className="text-gray-300 mb-4">This is a primary western card with a gradient header, icon, and badge.</p>
                <Button variant="western">View Details</Button>
              </WesternCard>
              
              <WesternCard 
                variant="accent" 
                title="Accent Card" 
                subtitle="With amber accent colors"
                icon={<Calendar className="h-5 w-5" />}
                ariaLabel="Example of an accent western card"
              >
                <p className="text-gray-300 mb-4">This is an accent western card with amber styling.</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-950">Cancel</Button>
                  <Button variant="western" className="bg-amber-600 border-amber-500">Confirm</Button>
                </div>
              </WesternCard>
              
              <WesternCard 
                variant="glass" 
                title="Glass Card" 
                subtitle="With backdrop blur effect"
                gradientHeader={false}
                ariaLabel="Example of a glass effect western card"
              >
                <p className="text-gray-300 mb-4">This card uses a glass effect with backdrop blur.</p>
                <Button variant="ghost" className="text-white hover:bg-white/10">Learn More</Button>
              </WesternCard>
              
              <WesternCard 
                variant="dark" 
                title="Animated Card" 
                subtitle="With hover animation"
                animated={true}
                ariaLabel="Example of an animated western card"
              >
                <p className="text-gray-300 mb-4">This card animates on hover. Try hovering over it!</p>
                <Button 
                  variant="western" 
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Explore
                </Button>
              </WesternCard>
            </div>
          </section>
          
          {/* Accessibility */}
          <section className="mb-12">
            <WesternHeading 
              as="h2" 
              variant="primary" 
              decorated 
              className="mb-6"
            >
              Accessibility Features
            </WesternHeading>
            
            <WesternCard variant="default" title="Accessibility Guidelines" ariaLabel="Accessibility guidelines card">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Focus States</h3>
                  <p className="text-gray-300 mb-3">All interactive elements have visible focus states for keyboard navigation:</p>
                  <div className="flex gap-4 flex-wrap">
                    <Button variant="western" className="focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Focus Me (Tab)
                    </Button>
                    <Button variant="outline" className="border-red-500 text-red-400 focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Then Me
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Color Contrast</h3>
                  <p className="text-gray-300 mb-3">All text meets WCAG AA contrast requirements:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-900 rounded-md">
                      <p className="text-white">White text on dark background</p>
                      <p className="text-xs text-gray-400 mt-1">Contrast ratio: 16:1</p>
                    </div>
                    <div className="p-3 bg-red-600 rounded-md">
                      <p className="text-white">White text on primary</p>
                      <p className="text-xs text-gray-100 mt-1">Contrast ratio: 4.5:1+</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Screen Reader Support</h3>
                  <p className="text-gray-300 mb-3">Elements include proper ARIA attributes:</p>
                  <div className="p-3 bg-gray-800 rounded-md">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      {`<Button aria-label="Add to favorites" aria-pressed="false">\n  <HeartIcon aria-hidden="true" />\n  <span className="sr-only">Add to favorites</span>\n</Button>`}
                    </pre>
                  </div>
                </div>
              </div>
            </WesternCard>
          </section>
          
          {/* Components */}
          <section className="mb-12">
            <WesternHeading 
              as="h2" 
              variant="primary" 
              decorated 
              className="mb-6"
            >
              Standard Components
            </WesternHeading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="primary" className="w-full">Primary Button</Button>
                    <Button variant="western" className="w-full">Western Button</Button>
                    <Button variant="outline" className="w-full">Outline Button</Button>
                    <Button variant="ghost" className="w-full">Ghost Button</Button>
                    <Button variant="secondary" className="w-full">Secondary Button</Button>
                    <Button variant="danger" className="w-full">Danger Button</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Buttons with Icons */}
              <Card>
                <CardHeader>
                  <CardTitle>Buttons with Icons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button 
                      variant="primary" 
                      leftIcon={<ChevronLeft className="h-4 w-4" />} 
                      className="w-full"
                    >
                      Back
                    </Button>
                    <Button 
                      variant="western" 
                      rightIcon={<ChevronRight className="h-4 w-4" />} 
                      className="w-full"
                    >
                      Next
                    </Button>
                    <Button 
                      variant="secondary" 
                      leftIcon={<Search className="h-4 w-4" />} 
                      className="w-full"
                    >
                      Search
                    </Button>
                    <Button 
                      variant="outline" 
                      rightIcon={<Plus className="h-4 w-4" />} 
                      className="w-full"
                    >
                      Add New
                    </Button>
                    <Button 
                      variant="success" 
                      rightIcon={<Check className="h-4 w-4" />} 
                      className="w-full"
                    >
                      Complete
                    </Button>
                    <Button 
                      variant="primary" 
                      isLoading 
                      className="w-full"
                    >
                      Loading
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Form Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>Form Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">Enable notifications</Label>
                  </div>
                </CardContent>
              </Card>
              
              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </PageContainer>
    </StyleProvider>
  );
};

export default StyleGuide; 