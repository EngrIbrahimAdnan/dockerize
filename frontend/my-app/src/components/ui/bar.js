export function Bar({ className }) {
  return (
    <div className={className}>
      <div className="flex items-end gap-2 h-full">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="bg-primary/10 hover:bg-primary/20 h-[30%] w-[15%] transition-all"
            style={{
              height: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
