import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from './context/ThemeContext'
import HeroScene from './scenes/HeroScene'
import AgendaScene from './scenes/AgendaScene'
import AboutElasticScene from './scenes/AboutElasticScene'
import DataExplosionScene from './scenes/DataExplosionScene'
import ChallengesScene from './scenes/ChallengesScene'
import PlatformScene from './scenes/PlatformScene'
import BusinessValueScene from './scenes/BusinessValueScene'
import UnifiedStrategyScene from './scenes/UnifiedStrategyScene'
import CrossClusterScene from './scenes/CrossClusterScene'
import LicensingScene from './scenes/LicensingScene'
import SchemaScene from './scenes/SchemaScene'
import AccessControlScene from './scenes/AccessControlScene'
import ESQLScene from './scenes/ESQLScene'
import ConsolidationScene from './scenes/ConsolidationScene'
import DataTieringScene from './scenes/DataTieringScene'
import ServicesScene from './scenes/ServicesScene'
import DataMeshScene from './scenes/DataMeshScene'
import TeamScene from './scenes/TeamScene'
import NextStepsScene from './scenes/NextStepsScene'
import Navigation from './components/Navigation'
import ProgressBar from './components/ProgressBar'
import SceneSettings, { useEnabledScenes } from './components/SceneSettings'

// Scene configuration - reorder these to change presentation flow
// The agenda will automatically reflect the order defined here
// Colors cycle through a palette based on position (Blue, Teal, Pink, Poppy, Yellow)
const scenes = [
  { id: 'hero', component: HeroScene, title: 'Introduction', hideFromAgenda: true },
  { id: 'agenda', component: AgendaScene, title: 'Agenda', hideFromAgenda: true },
  { id: 'team', component: TeamScene, title: 'Team Introductions', description: 'The people here to support you', duration: '2 min' },
  { id: 'about-elastic', component: AboutElasticScene, title: 'About Elastic', description: 'Who we are and what we do', duration: '5 min' },
  { id: 'business-value', component: BusinessValueScene, title: 'Desired Outcomes', description: 'What success looks like', duration: '10 min' },
  { id: 'challenges', component: ChallengesScene, title: 'Problem Patterns', description: 'Common challenges we solve', duration: '10 min' },
  { id: 'data-explosion', component: DataExplosionScene, title: 'The Data Challenge', description: 'Understanding the landscape', duration: '3 min' },
  { id: 'platform', component: PlatformScene, title: 'The Platform', description: 'Our solutions and capabilities', duration: '5 min' },
  { id: 'unified-strategy', component: UnifiedStrategyScene, title: 'Unified Strategy', description: 'Bringing it all together', duration: '5 min' },
  { id: 'cross-cluster', component: CrossClusterScene, title: 'Cross-Cluster Search', description: 'Distributed search at global scale', duration: '3 min', hideFromAgenda: true },
  { id: 'data-mesh', component: DataMeshScene, title: 'Data Mesh', description: 'Distributed data architecture', duration: '5 min', hideFromAgenda: true },
  { id: 'licensing', component: LicensingScene, title: 'Licensing', description: 'One license, full power', duration: '3 min', hideFromAgenda: true },
  { id: 'schema', component: SchemaScene, title: 'Elastic Common Schema', description: 'Schema on write advantage', duration: '5 min', hideFromAgenda: true },
  { id: 'access-control', component: AccessControlScene, title: 'Access Controls', description: 'RBAC & ABAC security', duration: '3 min', hideFromAgenda: true },
  { id: 'esql', component: ESQLScene, title: 'ES|QL', description: 'Piped query language', duration: '3 min', hideFromAgenda: true },
  { id: 'consolidation', component: ConsolidationScene, title: 'Consolidation', description: 'Reduce tool sprawl', duration: '3 min', hideFromAgenda: true },
  { id: 'data-tiering', component: DataTieringScene, title: 'Data Tiering', description: 'Optimize spend with ILM', duration: '3 min', hideFromAgenda: true },
  { id: 'services', component: ServicesScene, title: 'Services & Support', description: 'Expert guidance at every stage', duration: '5 min', hideFromAgenda: true },
  { id: 'next-steps', component: NextStepsScene, title: 'Next Steps', description: 'Your path forward'}, //, duration: '2 min' },
]

// All scenes for configuration
const allScenes = scenes

function App() {
  const { theme } = useTheme()
  const [currentScene, setCurrentScene] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isReady, setIsReady] = useState(false)
  
  // Scene filtering and ordering
  const { 
    enabledSceneIds, 
    enabledScenes, 
    orderedScenes,
    customDurations,
    toggleScene, 
    updateOrder,
    updateDuration,
    resetToDefault 
  } = useEnabledScenes(allScenes)
  const activeScenes = enabledScenes

  // Ensure component is mounted before rendering animations
  useEffect(() => {
    setIsReady(true)
  }, [])

  // Reset current scene if it's now out of bounds
  useEffect(() => {
    if (currentScene >= activeScenes.length) {
      setCurrentScene(Math.max(0, activeScenes.length - 1))
    }
  }, [activeScenes.length, currentScene])

  const navigateToScene = useCallback((index) => {
    if (index >= 0 && index < activeScenes.length) {
      setDirection(index > currentScene ? 1 : -1)
      setCurrentScene(index)
    }
  }, [currentScene, activeScenes.length])

  const nextScene = useCallback(() => {
    if (currentScene < activeScenes.length - 1) {
      setDirection(1)
      setCurrentScene(prev => prev + 1)
    }
  }, [currentScene, activeScenes.length])

  const prevScene = useCallback(() => {
    if (currentScene > 0) {
      setDirection(-1)
      setCurrentScene(prev => prev - 1)
    }
  }, [currentScene])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        nextScene()
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault()
        prevScene()
      } else if (e.key >= '1' && e.key <= '9') {
        navigateToScene(parseInt(e.key) - 1)
      } else if (e.key === '0') {
        navigateToScene(9) // Scene 10
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextScene, prevScene, navigateToScene])

  const CurrentSceneComponent = activeScenes[currentScene]?.component || activeScenes[0]?.component

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-elastic-dev-blue' : 'bg-elastic-light-grey'
    }`}>
      {/* Background gradient orbs - Bold Minimalism */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
          animate={{
            backgroundColor: theme === 'dark' ? 'rgba(72, 239, 207, 0.08)' : 'rgba(11, 100, 221, 0.12)'
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
          animate={{
            backgroundColor: theme === 'dark' ? 'rgba(240, 78, 152, 0.08)' : 'rgba(240, 78, 152, 0.1)'
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px]"
          animate={{
            backgroundColor: theme === 'dark' ? 'rgba(11, 100, 221, 0.05)' : 'rgba(72, 239, 207, 0.08)'
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className={`fixed inset-0 grid-bg pointer-events-none ${theme === 'dark' ? 'opacity-50' : 'opacity-30'}`} />

      {/* Progress bar */}
      <ProgressBar current={currentScene} total={activeScenes.length} />

      {/* Navigation */}
      <Navigation 
        scenes={activeScenes} 
        currentScene={currentScene} 
        onNavigate={navigateToScene}
        onNext={nextScene}
        onPrev={prevScene}
      />

      {/* Scene Settings */}
      <SceneSettings 
        scenes={allScenes}
        enabledSceneIds={enabledSceneIds}
        orderedScenes={orderedScenes}
        customDurations={customDurations}
        onToggle={toggleScene}
        onUpdateOrder={updateOrder}
        onUpdateDuration={updateDuration}
        onReset={resetToDefault}
      />

      {/* Scene content */}
      {isReady && (
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentScene}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0 overflow-y-auto"
          >
            <CurrentSceneComponent onNext={nextScene} scenes={activeScenes} />
          </motion.div>
        </AnimatePresence>
      )}

    </div>
  )
}

export default App

