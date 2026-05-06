import { useEffect, useState } from "react"

const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
    <rect x="1" y="1" width="5.5" height="5.5" rx="1" />
    <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" />
    <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" />
    <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" />
  </svg>
)

const STEPS = [
  'Visibility of system status',
  'Match between system and the real world',
  'User control and freedom',
  'Consistency and standards',
  'Error prevention',
  'Recognition rather than recall',
  'Flexibility and efficiency of use',
  'Aesthetic and minimalist design',
  'Help users recognize and recover from errors',
  'Help and documentation',
]

export default function Loading() {
  const [activeStep, setActiveStep] = useState(0)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveStep(s => (s + 1) % STEPS.length)
    }, 1200)
    const spinTimer = setInterval(() => {
      setTick(t => t + 1)
    }, 16)
    return () => { clearInterval(stepTimer); clearInterval(spinTimer) }
  }, [])

  const angle = (tick * 4) % 360

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ede8df', color: '#1a1108' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #d4c4b0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7a4f2e' }}>
          <GridIcon />
          <span style={{ fontWeight: 700, fontSize: '15px', color: '#1a1108' }}>Design Audit</span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', gap: '28px' }}>

        {/* Spinner */}
        <div style={{ position: 'relative', width: '72px', height: '72px' }}>
          <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: `rotate(${angle}deg)` }}>
            <circle cx="36" cy="36" r="30" fill="none" stroke="#d4c4b0" strokeWidth="4" />
            <circle
              cx="36" cy="36" r="30"
              fill="none" stroke="#6b3f1f" strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="188"
              strokeDashoffset="141"
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5e3c' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>

        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1a1108', letterSpacing: '-0.2px', margin: 0 }}>
            Analyzing your design
          </h2>
          <p style={{ fontSize: '12px', color: '#a09585', margin: 0 }}>
            Evaluating against Nielsen's 10 principles
          </p>
        </div>

        {/* Step list */}
        <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {STEPS.map((step, i) => {
            const done = i < activeStep
            const active = i === activeStep
            return (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: active ? '#e0d5c8' : 'transparent',
                  transition: 'background 0.3s',
                }}
              >
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: done ? '#2d7d6f' : active ? '#6b3f1f' : 'transparent',
                  border: done || active ? 'none' : '1.5px solid #c4b4a4',
                  transition: 'all 0.3s',
                }}>
                  {done && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {active && (
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                  )}
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: active ? 700 : done ? 500 : 400,
                  color: active ? '#1a1108' : done ? '#4a7a72' : '#b0a090',
                  transition: 'color 0.3s',
                }}>
                  {step}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #d4c4b0', padding: '11px 16px', textAlign: 'center', fontSize: '11px', color: '#a09585', letterSpacing: '0.02em' }}>
        v1.2.0 · design-audit-plugin
      </div>
    </div>
  )
}
