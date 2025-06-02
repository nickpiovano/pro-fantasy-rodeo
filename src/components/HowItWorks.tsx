import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HowItWorksProps {
  className?: string;
}

const HowItWorks = ({ className }: HowItWorksProps) => {
  const steps = [
    { 
      step: 1, 
      title: "Pick Your Team", 
      description: "Select one contestant from each PRCA event" 
    },
    { 
      step: 2, 
      title: "Submit Entry", 
      description: "Pay $19.95 and lock in your picks" 
    },
    { 
      step: 3, 
      title: "Win Big", 
      description: "Top teams split $60K + Ram 1500 truck" 
    }
  ];

  return (
    <Card className={`card-western ${className || ''}`}>
      <CardHeader>
        <CardTitle className="text-center text-2xl text-white">
          How It Works
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map(({ step, title, description }) => (
          <div key={step} className="flex items-start space-x-4 p-3 bg-white/50 rounded-lg">
            <div className="bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              {step}
            </div>
            <div>
              <h3 className="font-bold text-stone-800">{title}</h3>
              <p className="text-stone-600 text-sm">{description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default HowItWorks; 