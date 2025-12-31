export default function Badge({type = "success", children}) {
  const typeClasses = {
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    error: "bg-red-200 text-red-900",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${typeClasses[type]}`}>
      {children}
    </span>
  );
}
