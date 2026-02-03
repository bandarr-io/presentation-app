import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faLock, 
  faLockOpen,
  faRocket,
  faInfinity,
  faCubes,
  faMagnifyingGlass,
  faShieldHalved,
  faChartLine,
  faGears,
  faBrain,
  faRobot,
  faPlug,
  faUsers,
  faMapLocationDot,
  faEye,
  faKey,
  faFingerprint,
  faFileShield,
  faServer,
  faCloud,
  faHeadset,
  faDatabase,
  faNetworkWired,
  faBolt,
  faWandMagicSparkles,
  faLayerGroup,
  faSatelliteDish,
  faDiagramProject
} from '@fortawesome/free-solid-svg-icons'

const freeOpenFeatures = [
  { name: 'Elasticsearch', icon: faDatabase, desc: 'Distributed search & analytics' },
  { name: 'Kibana', icon: faChartLine, desc: 'Visualize & explore data' },
  { name: 'Logstash', icon: faGears, desc: 'Ingest & transform data' },
  { name: 'Elastic Agent', icon: faSatelliteDish, desc: 'Unified data collection' },
  { name: 'Security', icon: faShieldHalved, desc: 'Protect your data' },
  { name: 'Observability', icon: faEye, desc: 'Monitor everything' },
  { name: 'Full-text & Vector Search', icon: faMagnifyingGlass, desc: 'Find anything, fast' },
  { name: 'Community Support', icon: faUsers, desc: 'Global community' },
]

const enterpriseFeatures = [
  { name: 'Enterprise Support', icon: faHeadset, desc: '24/7 expert help' },
  { name: 'Cross Cluster Search', icon: faNetworkWired, desc: 'Global data access' },
  { name: 'Searchable Snapshots', icon: faDatabase, desc: 'Cost-effective searchable storage' },
  { name: 'Agent Builder', icon: faWandMagicSparkles, desc: 'Create custom agents' },
  { name: 'AutoOps', icon: faGears, desc: 'Supercharged Elasticstack Monitoring' },
  { name: 'Workflows', icon: faDiagramProject, desc: 'Orchestrate processes' },
  { name: 'Maps & Geospatial', icon: faMapLocationDot, desc: 'Location intelligence' },
  { name: 'Single Sign-On', icon: faFingerprint, desc: 'Seamless authentication' },
  { name: 'LDAP/AD/SAML', icon: faKey, desc: 'Identity provider integration' },
  { name: 'Field Level Security', icon: faFileShield, desc: 'Granular access control' },
  { name: 'Encryption at Rest', icon: faLock, desc: 'Data protection' },
  { name: 'Auditing', icon: faEye, desc: 'Complete audit trails' },
  { name: 'Machine Learning', icon: faBrain, desc: 'Anomaly detection & more' },
  { name: 'Orchestration (ECE/ECK)', icon: faServer, desc: 'Self-managed deployments' },
  { name: 'Cloud Security Posture', icon: faCloud, desc: 'K8s & cloud monitoring' },
  { name: 'Threat Intelligence', icon: faShieldHalved, desc: 'Proactive defense' },
  { name: 'AI Assistant', icon: faRobot, desc: 'Intelligent assistance' },
  { name: 'AIOps', icon: faBolt, desc: 'Automated operations' },
  { name: 'Reciprocal Rank Fusion', icon: faLayerGroup, desc: 'Hybrid search ranking' },
  { name: 'Semantic Search', icon: faBrain, desc: 'Understand meaning' },
  { name: 'GenAI Integrations', icon: faRobot, desc: 'AI-powered experiences' },
  { name: 'ELSER', icon: faWandMagicSparkles, desc: 'Semantic understanding' },
  { name: 'Integrations', icon: faPlug, desc: '400+ data sources' },
  { name: 'And More...', icon: faShieldHalved, desc: 'Additional features' },
]

function LicensingScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isEnterprise, setIsEnterprise] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState(null)

  const totalFeatures = freeOpenFeatures.length + enterpriseFeatures.length
  const unlockedFeatures = isEnterprise ? totalFeatures : freeOpenFeatures.length
  const percentage = Math.round((unlockedFeatures / totalFeatures) * 100)

  return (
    <div className="scene !py-4">
      <div className="max-w-[98%] mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm block mb-2 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Licensing
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            One License. <span className="gradient-text">Full Power.</span>
          </h2>
          <p className={`text-lg mt-2 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
            One software SKU. No add-ons. No data caps.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Left Panel - License Toggle */}
          <motion.div 
            className="w-72 flex flex-col gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Power Gauge */}
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
              <div className="text-center mb-4">
                <motion.div 
                  className="text-5xl font-bold gradient-text"
                  key={percentage}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  {percentage}%
                </motion.div>
                <div className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                  Platform Unlocked
                </div>
              </div>
              
              {/* Progress Ring */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16,28,63,0.1)'}
                    strokeWidth="12"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - percentage / 100) }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#48EFCF" />
                      <stop offset="100%" stopColor="#F04E98" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: isEnterprise ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FontAwesomeIcon 
                      icon={isEnterprise ? faLockOpen : faLock} 
                      className={`text-2xl ${isEnterprise ? 'text-elastic-teal' : isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}
                    />
                  </motion.div>
                </div>
              </div>

              {/* No Hidden Costs */}
              <div className="space-y-2">
                <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                  <FontAwesomeIcon icon={faInfinity} className="text-elastic-teal" />
                  <span>No ingestion charges</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                  <FontAwesomeIcon icon={faInfinity} className="text-elastic-teal" />
                  <span>No per-user fees</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                  <FontAwesomeIcon icon={faInfinity} className="text-elastic-teal" />
                  <span>No data caps</span>
                </div>
              </div>
            </div>

            {/* License Toggle */}
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
              <div className={`text-xs uppercase tracking-wider mb-3 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                Select License
              </div>
              
              <button
                onClick={() => setIsEnterprise(false)}
                className={`w-full p-3 rounded-xl mb-2 border-2 transition-all text-left ${
                  !isEnterprise 
                    ? 'border-elastic-teal bg-elastic-teal/10' 
                    : isDark ? 'border-white/10 hover:border-white/20' : 'border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${!isEnterprise ? 'bg-elastic-teal' : isDark ? 'bg-white/10' : 'bg-elastic-dev-blue/10'}`}>
                    <FontAwesomeIcon icon={faCubes} className={!isEnterprise ? 'text-elastic-dev-blue' : isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'} />
                  </div>
                  <div className={`font-bold ${!isEnterprise ? 'text-elastic-teal' : isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    Free & Open
                  </div>
                </div>
              </button>

              <button
                onClick={() => setIsEnterprise(true)}
                className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                  isEnterprise 
                    ? 'border-elastic-pink bg-elastic-pink/10' 
                    : isDark ? 'border-white/10 hover:border-white/20' : 'border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isEnterprise ? 'bg-elastic-pink' : isDark ? 'bg-white/10' : 'bg-elastic-dev-blue/10'}`}>
                    <FontAwesomeIcon icon={faRocket} className={isEnterprise ? 'text-white' : isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'} />
                  </div>
                  <div className={`font-bold ${isEnterprise ? 'text-elastic-pink' : isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    Enterprise
                  </div>
                </div>
              </button>
            </div>

            {/* Footnote */}
            <div className={`p-3 rounded-xl text-xs ${isDark ? 'bg-white/[0.02] text-white/40' : 'bg-elastic-dev-blue/5 text-elastic-dev-blue/50'}`}>
              <p>Full feature comparison at</p>
              <p className="text-elastic-blue font-medium">elastic.co/subscriptions</p>
            </div>
          </motion.div>

          {/* Right Panel - Feature Grid */}
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            {/* Free & Open Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-elastic-teal" />
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  Free & Open
                </span>
                <span className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                  — Always included
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {freeOpenFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      hoveredFeature === feature.name
                        ? 'border-elastic-teal bg-elastic-teal/10 scale-105'
                        : isDark ? 'border-white/10 bg-white/[0.02] hover:border-white/20' : 'border-elastic-dev-blue/10 bg-white hover:border-elastic-dev-blue/20'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.03 }}
                    onMouseEnter={() => setHoveredFeature(feature.name)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        hoveredFeature === feature.name ? 'bg-elastic-teal' : 'bg-elastic-teal/20'
                      }`}>
                        <FontAwesomeIcon 
                          icon={feature.icon} 
                          className={`text-sm ${hoveredFeature === feature.name ? 'text-elastic-dev-blue' : 'text-elastic-teal'}`}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                          {feature.name}
                        </div>
                        <div className={`text-[10px] truncate ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                          {feature.desc}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enterprise Section */}
            <div className="flex-1 min-h-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-elastic-pink" />
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  Enterprise
                </span>
                <span className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                  — Unlock full potential
                </span>
                {!isEnterprise && (
                  <motion.span 
                    className="ml-auto text-xs text-elastic-pink flex items-center gap-1"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FontAwesomeIcon icon={faLock} className="text-[10px]" />
                    Click to unlock
                  </motion.span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <AnimatePresence>
                  {enterpriseFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.name}
                      className={`p-3 rounded-xl border cursor-pointer transition-all relative overflow-hidden ${
                        isEnterprise
                          ? hoveredFeature === feature.name
                            ? 'border-elastic-pink bg-elastic-pink/10 scale-105'
                            : isDark ? 'border-white/10 bg-white/[0.02] hover:border-white/20' : 'border-elastic-dev-blue/10 bg-white hover:border-elastic-dev-blue/20'
                          : isDark ? 'border-white/5 bg-white/[0.01]' : 'border-elastic-dev-blue/5 bg-elastic-dev-blue/[0.02]'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: isEnterprise ? 1 : 0.4, 
                        scale: 1,
                        filter: isEnterprise ? 'blur(0px)' : 'blur(1px)'
                      }}
                      transition={{ delay: isEnterprise ? 0.1 + index * 0.03 : 0 }}
                      onMouseEnter={() => isEnterprise && setHoveredFeature(feature.name)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      onClick={() => !isEnterprise && setIsEnterprise(true)}
                    >
                      {/* Lock overlay for non-enterprise */}
                      {!isEnterprise && (
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <FontAwesomeIcon icon={faLock} className="text-white/30 text-lg" />
                        </motion.div>
                      )}
                      
                      <div className="flex items-start gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isEnterprise && hoveredFeature === feature.name ? 'bg-elastic-pink' : 'bg-elastic-pink/20'
                        }`}>
                          <FontAwesomeIcon 
                            icon={feature.icon} 
                            className={`text-sm ${isEnterprise && hoveredFeature === feature.name ? 'text-white' : 'text-elastic-pink'}`}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                            {feature.name}
                          </div>
                          <div className={`text-[10px] truncate ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                            {feature.desc}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LicensingScene
