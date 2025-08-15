import { ReactNode } from "react";

interface QueryWrapperProps {
  isLoading: boolean;
  hasError: boolean;
  isEmpty: boolean;
  error?: Error;
  loadingComponent?: ReactNode;
  emptyMessage?: string;
  errorMessage?: string;
  children: ReactNode;
  className?: string;
  title?: ReactNode;
}

export default function QueryWrapper({
  isLoading,
  hasError,
  isEmpty,
  error,
  loadingComponent,
  emptyMessage = "No data available",
  errorMessage = "Something went wrong",
  children,
  className = "bg-white",
  title,
}: QueryWrapperProps) {
  const containerClasses = `${className} p-6`;

  if (isLoading) {
    return (
      <div className={containerClasses}>
        {title && (
          <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
        )}
        {loadingComponent || <div className="animate-pulse">Loading...</div>}
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={containerClasses}>
        {title && (
          <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
        )}
        <div className="text-gray-500 text-sm text-center py-8">
          {errorMessage}
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={containerClasses}>
        {title && (
          <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
        )}
        <div className="text-gray-500 text-sm text-center py-8">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {title && (
        <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      {children}
    </div>
  );
}
