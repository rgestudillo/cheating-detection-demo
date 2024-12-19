import { Features } from '../../models/Features'
import { Monitor, Clock, Keyboard, MousePointer, Users, Coffee, Minimize2 } from 'lucide-react'

interface FeatureDisplayProps {
  features: Features
}

export default function FeatureDisplay({ features }: FeatureDisplayProps) {
  const featureItems = [
    { icon: <Monitor className="w-5 h-5" />, label: 'Browser Tabs', value: features.browserTabsOpen },
    { icon: <Clock className="w-5 h-5" />, label: 'Time/Question', value: `${features.timePerQuestion.toFixed(2)} min` },
    { icon: <Keyboard className="w-5 h-5" />, label: 'Keyboard Activity', value: `${features.keyboardActivity.toFixed(2)} kpm` },
    { icon: <MousePointer className="w-5 h-5" />, label: 'Mouse Movements', value: `${features.mouseMovements.toFixed(2)} cpm` },
    { icon: <Users className="w-5 h-5" />, label: 'Proximity Alerts', value: features.proximityAlerts },
    { icon: <Coffee className="w-5 h-5" />, label: 'Inactivity Periods', value: features.inactivityPeriods },
    { icon: <Minimize2 className="w-5 h-5" />, label: 'Window Switches', value: features.windowSwitches },
  ]

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Real-time Monitoring</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {featureItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
            <div className="text-blue-500">{item.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="text-lg font-semibold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

