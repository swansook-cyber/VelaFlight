'use client'
import dynamic from 'next/dynamic'

const FlightMap = dynamic(() => import('@/components/flight-map'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-[#07090d]">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-slate-400">
          <span className="size-2 rounded-full bg-emerald-400 live-dot" />
          กำลังโหลดข้อมูลเที่ยวบิน
        </div>
      </div>
    </div>
  ),
})

const AIRPORT_SHORTCUTS = [
  { code: 'KBV', name: 'Krabi', lat: 8.096, lng: 98.989, zoom: 9 },
  { code: 'HKT', name: 'Phuket', lat: 8.113, lng: 98.317, zoom: 9 },
  { code: 'USM', name: 'Samui', lat: 9.548, lng: 100.062, zoom: 9 },
  { code: 'HDY', name: 'Hat Yai', lat: 6.933, lng: 100.393, zoom: 9 },
  { code: 'BKK', name: 'Suvarnabhumi', lat: 13.681, lng: 100.747, zoom: 9 },
  { code: 'DMK', name: 'Don Mueang', lat: 13.913, lng: 100.607, zoom: 9 },
] as const

function goToAirport(lat: number, lng: number, zoom: number) {
  const nextHash = `lat=${lat}&lng=${lng}&z=${zoom}`
  if (window.location.hash.replace(/^#/, '') === nextHash) {
    window.location.reload()
    return
  }
  window.location.hash = nextHash
  window.location.reload()
}

export default function Page() {
  return (
    <>
      <FlightMap />
      <nav
        aria-label="สนามบินด่วน"
        className="fixed z-[70] left-1/2 -translate-x-1/2 bottom-[max(1rem,env(safe-area-inset-bottom))] max-w-[calc(100vw-1rem)] overflow-x-auto rounded-2xl border border-slate-700/80 bg-slate-950/85 p-1.5 shadow-2xl backdrop-blur"
      >
        <div className="flex items-center gap-1 whitespace-nowrap">
          {AIRPORT_SHORTCUTS.map((airport) => (
            <button
              key={airport.code}
              type="button"
              onClick={() => goToAirport(airport.lat, airport.lng, airport.zoom)}
              title={airport.name}
              className="rounded-xl px-3 py-2 text-xs font-semibold tracking-wide text-slate-200 transition hover:bg-slate-800 active:scale-95"
            >
              {airport.code}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
