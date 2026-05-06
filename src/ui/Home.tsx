interface HomeProps {
  onAudit: () => void
  onCancel: () => void
}

const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
    <rect x="1" y="1" width="5.5" height="5.5" rx="1" />
    <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" />
    <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" />
    <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" />
  </svg>
)

const GearIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const FlagIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
)

const ClipboardCheckIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

const LayersIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

export default function Home({ onAudit, onCancel }: HomeProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ede8df', color: '#1a1108' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #d4c4b0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7a4f2e' }}>
          <GridIcon />
          <span style={{ fontWeight: 700, fontSize: '15px', color: '#1a1108' }}>Design Audit</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#7a4f2e' }}>
          <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}>
            <GearIcon />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}>
            <FlagIcon />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 40px 32px', gap: '16px', textAlign: 'center' }}>

        {/* Circle icon */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #8b5e3c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5e3c', marginBottom: '8px' }}>
          <ClipboardCheckIcon />
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1108', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
          Rate Your Components
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: '13px', color: '#7a7065', lineHeight: 1.6, maxWidth: '260px' }}>
          Evaluate whole design or selected layers against Nielsen Design Principles.
        </p>

        {/* Layers selected pill */}
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 20px', marginTop: '8px', background: '#ffffff', border: '1px solid #ddd5c8', borderRadius: '8px', color: '#2d7d6f', fontSize: '13px', fontWeight: 600, cursor: 'pointer', width: '100%', maxWidth: '300px', letterSpacing: '0.01em' }}>
          <LayersIcon />
          layers selected
        </button>

        {/* Continue button */}
        <button
          onClick={onAudit}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 20px', background: '#6b3f1f', border: 'none', borderRadius: '10px', color: '#ffffff', fontSize: '15px', fontWeight: 600, cursor: 'pointer', width: '100%', maxWidth: '300px', letterSpacing: '0.01em' }}
        >
          Continue &nbsp;→
        </button>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #d4c4b0', padding: '11px 16px', textAlign: 'center', fontSize: '11px', color: '#a09585', letterSpacing: '0.02em' }}>
        v1.2.0 · design-audit-plugin
      </div>
    </div>
  )
}
