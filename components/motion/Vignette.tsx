export default function Vignette({ color = "#0b0a08" }: { color?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55]"
      style={{
        background: `radial-gradient(ellipse at center, transparent 55%, ${color} 100%)`,
        opacity: 0.55,
      }}
    />
  );
}
