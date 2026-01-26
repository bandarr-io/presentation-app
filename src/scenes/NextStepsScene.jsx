import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faWrench, faCircleCheck, faUsers, faGraduationCap, faGlobe, faMedal, faCalendarDays, faDesktop, faPlug, faFlask, faBook } from '@fortawesome/free-solid-svg-icons'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons/faPlaneDeparture'

const journeySteps = [
  { id: 'alignment', phase: '01', title: 'Executive Alignment', description: 'Business Priorities & Challenges', color: '#48EFCF' },
  { id: 'discovery', phase: '02', title: 'Use Case Discovery', description: 'Technical Requirements & Scope', color: '#0B64DD' },
  { id: 'validation', phase: '03', title: 'Technical Validation', description: 'Architecture Review & Pilot ', color: '#F04E98' },
  { id: 'value', phase: '04', title: 'Business Value Review', description: 'Quantifying Impact & ROI', color: '#FEC514' },
]

const deRiskingOptions = [
  { title: 'Free Trial', desc: '14-day full access', icon: faBullseye },
  { title: 'Workshop', desc: 'Hands-on with SAs', icon: faWrench },
  { title: 'Pilot', desc: 'Validate with your data', icon: faPlaneDeparture },
  { title: 'Review Customer Success Stories', desc: 'elastic.co/customers', icon: faUsers },
  { title: 'Get Hands-on with Demos', desc: 'elastic.co/demo-gallery', icon: faDesktop },
  { title: 'Explore Integrations', desc: 'elastic.co/integrations', icon: faPlug },
  { title: 'Explore Our Labs', desc: 'Search, Security & Observability', icon: faFlask },
  { title: 'Read Our Docs', desc: 'elastic.co/docs', icon: faBook },
  { title: 'Get Trained Up', desc: 'elastic.co/training', icon: faGraduationCap },
  { title: 'Access Our Veterans Resources', desc: 'elastic.co/veterans', icon: faMedal },
  { title: 'Register for Events', desc: 'elastic.co/events', icon: faCalendarDays },
  { title: 'Learn More', desc: 'elastic.co', icon: faGlobe },
]

function NextStepsScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="scene !py-4">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-elastic-teal text-sm font-mono uppercase tracking-widest">
            Your Journey
          </span>
          <h2 className={`text-5xl md:text-6xl font-bold mt-2 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            Let's Get <span className="gradient-text">Started</span>
          </h2>
        </motion.div>

        {/* Journey timeline */}
        <div className="relative mb-8">
          {/* Connection line */}
          <motion.div
            className={`absolute top-7 left-0 right-0 h-0.5 hidden md:block ${isDark ? 'bg-white/10' : 'bg-elastic-dev-blue/10'}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          
          {/* Progress line */}
          <motion.div
            className="absolute top-7 left-0 h-0.5 bg-gradient-to-r from-elastic-teal via-elastic-blue to-elastic-pink hidden md:block"
            initial={{ width: 0 }}
            animate={{ width: `${((activeStep + 1) / journeySteps.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />

          <div className="grid md:grid-cols-4 gap-4">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {/* Step indicator */}
                <motion.button
                  className={`relative z-10 w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center border-2 transition-all ${
                    index <= activeStep
                      ? 'border-transparent'
                      : isDark ? 'border-white/20 bg-elastic-dev-blue' : 'border-elastic-dev-blue/20 bg-white'
                  }`}
                  style={{ backgroundColor: index <= activeStep ? step.color : undefined }}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`text-base font-mono font-bold ${index <= activeStep ? 'text-white' : isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                    {step.phase}
                  </span>
                  {index === activeStep && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: step.color }}
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.button>

                {/* Step content */}
                <motion.div
                  className={`text-center px-3 py-2 rounded-xl transition-all ${
                    index === activeStep ? isDark ? 'bg-white/5' : 'bg-elastic-blue/5' : ''
                  }`}
                  animate={{ scale: index === activeStep ? 1.02 : 1 }}
                >
                  <h3 className={`text-lg font-semibold mb-1 transition-colors ${
                    index === activeStep 
                      ? isDark ? 'text-white' : 'text-elastic-dev-blue' 
                      : isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* De-risking section */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className={`text-xl font-semibold text-center mb-3 ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>
            Low-risk ways to explore
          </h3>
          <div className={`grid grid-cols-4 gap-2 p-4 rounded-2xl border ${
            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/60 border-elastic-dev-blue/10'
          }`}>
            {deRiskingOptions.map((option, index) => (
              <motion.div
                key={option.title}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${
                  isDark ? 'bg-white/5' : 'bg-white'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.03 }}
                whileHover={{ scale: 1.03 }}
              >
                <span className="text-base flex-shrink-0"><FontAwesomeIcon icon={option.icon} /></span>
                <div className="flex flex-col min-w-0">
                  <span className={`font-medium leading-tight ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>{option.title}</span>
                  <span className={`text-xs truncate ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>{option.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Thank you message */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <img 
            src={isDark 
              ? "/Elastic Logo+tagline_secondary white.svg" 
              : "/Elastic Logo+tagline _ secondary black.png"
            }
            alt="Elastic - The Search AI Company" 
            className="h-12 w-auto mx-auto"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default NextStepsScene
