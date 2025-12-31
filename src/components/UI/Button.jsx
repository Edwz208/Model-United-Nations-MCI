export default function Button({ variant = "primary", children, className= "", ...props }) {
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    secondary: "border border-secondary text-secondary hover:bg-secondary/10",
    accent: "bg-accent text-primary hover:bg-accent/90",
  }

  return ( // children is whatever is in between opening and closing of Button component
    // props to pass on onclick and stuff to button html element
    
    <button
      {...props}
      className={`px-4 py-2 rounded-md font-medium shadow-sm transition-all duration-200 transform hover:scale-105 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
