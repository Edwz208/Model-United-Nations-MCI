export default function Card({ header, children, actions, className = "", ...props }) {
  return (
    <div
      className={`bg-card-surface border border-border rounded-lg shadow-sm overflow-hidden ${className} relative`}
      {...props}
    >
    <div className="px-4 py-2 bg-primary-dark text-white font-semibold text-lg flex items-center justify-between">
      <span className="truncate">{header}</span>
      {actions && <div className="flex ml-2 hover">{actions}</div>} {/*flex for more than one action */}
    </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
