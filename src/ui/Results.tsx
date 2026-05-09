const PRINCIPLE_NAMES = [
  'Visibility of system status',
  'Match between system and the real world',
  'User control and freedom',
  'Consistency and standards',
  'Error prevention',
  'Recognition rather than recall',
  'Flexibility and efficiency of use',
  'Aesthetic and minimalist design',
  'Help users recognize, diagnose, and recover from errors',
  'Help and documentation',
  'OVERALL'
]

export interface AuditResult {
  firstR: number; firstD: string
  secondR: number; secondD: string
  thirdR: number; thirdD: string
  fourthR: number; fourthD: string
  fifthR: number; fifthD: string
  sixthR: number; sixthD: string
  seventR: number; seventhD: string
  eigthR: number; eightD: string
  ninthR: number; ninthD: string
  tenthR: number; tenthD: string
  overallR: number; overall: string
}

interface ResultsProps {
  result: AuditResult
  nodeCount: number
  onBack: () => void
}

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
)

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)

const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
    <rect x="1" y="1" width="5.5" height="5.5" rx="1" />
    <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" />
    <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" />
    <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" />
  </svg>
)

function ratingColor(r: number): string {
  return r >= 7 ? '#2d7d6f' : '#7a4a2a'
}

export default function Results({ result, nodeCount, onBack }: ResultsProps) {
  const rows = [
    { rating: result.firstR,  desc: result.firstD },
    { rating: result.secondR, desc: result.secondD },
    { rating: result.thirdR,  desc: result.thirdD },
    { rating: result.fourthR, desc: result.fourthD },
    { rating: result.fifthR,  desc: result.fifthD },
    { rating: result.sixthR,  desc: result.sixthD },
    { rating: result.seventR, desc: result.seventhD },
    { rating: result.eigthR,  desc: result.eightD },
    { rating: result.ninthR,  desc: result.ninthD },
    { rating: result.tenthR,  desc: result.tenthD },
    { rating: result.overallR, desc: result.overall}
  ]

  const handleCopyCSV = () => {
    const lines = rows.map((r, i) => `"${PRINCIPLE_NAMES[i]}",${r.rating},"${r.desc}"`)
    const csv = ['Name,Rating,Explanation', ...lines].join('\n')
    navigator.clipboard.writeText(csv)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ede8df', color: '#1a1108' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #d4c4b0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7a4f2e' }}>
          <GridIcon />
          <span style={{ fontWeight: 700, fontSize: '15px', color: '#1a1108' }}>Design Audit</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#7a4f2e' }}>
          {[<RefreshIcon />, <DownloadIcon />, <ShareIcon />].map((icon, i) => (
            <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}>
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #d4c4b0', fontSize: '12px', color: '#4a7a72' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
          </svg>
          <span style={{ fontWeight: 600, color: '#1a1108' }}>Audit complete</span>
          <span style={{ color: '#a09585' }}>· {nodeCount} components evaluated</span>
        </div>
        <div style={{ background: '#e8e0d4', border: '1px solid #d4c4b0', borderRadius: '6px', padding: '3px 10px', fontWeight: 700, fontSize: '13px', color: '#1a1108' }}>
          Avg: {result.overallR / 10}
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 80px 3fr', padding: '8px 16px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#7a6a5a', borderBottom: '1px solid #d4c4b0' }}>
          <span>NAME</span>
          <span>RATING</span>
          <span>EXPLANATION</span>
        </div>

        {rows.map((row, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 80px 3fr', padding: '14px 16px', borderBottom: '1px solid #e8e0d4', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', border: '1.5px solid #a09585', borderRadius: '2px', flexShrink: 0 }} />
              <span style={{ fontWeight: 700, fontSize: '13px' }}>{PRINCIPLE_NAMES[i]}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ background: ratingColor(row.rating), color: '#fff', borderRadius: '6px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '15px' }}>
                {row.rating}
              </div>
            </div>
            <span style={{ fontSize: '12px', color: '#4a3f35', lineHeight: 1.5 }}>{row.desc}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderTop: '1px solid #d4c4b0' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#4a3f35', padding: 0 }}>
          ← Back
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleCopyCSV} style={{ padding: '8px 16px', background: 'none', border: '1.5px solid #4a3f35', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#4a3f35', cursor: 'pointer' }}>
            Copy CSV
          </button>
          <button style={{ padding: '8px 16px', background: '#6b3f1f', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
            Export Report
          </button>
        </div>
      </div>

    </div>
  )
}

//copy csv not implemented yet