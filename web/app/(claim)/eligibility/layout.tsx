export default function EligibilityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hero bg-base-200 rounded-lg">
      <div className="hero-content text-center">
        <div className="max-w-sm">{children}</div>
      </div>
    </div>
  )
}
