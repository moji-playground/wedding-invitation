export function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2 opacity-60">
      <div className="flex items-center gap-3">
        <div className="w-12 h-px bg-border sm:w-24" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        <div className="w-12 h-px bg-border sm:w-24" />
      </div>
    </div>
  );
}
