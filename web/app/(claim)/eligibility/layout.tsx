export default function EligibilityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hero bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">{children}</div>
      </div>
    </div>
  )
}
