import { ReactNode } from "react";
import { useTranslations } from "next-intl";

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
  loadingComponent,
  emptyMessage,
  errorMessage,
  children,
  className = "bg-white",
  title,
}: QueryWrapperProps) {
  const t = useTranslations();
  const containerClasses = `${className} p-6`;

  const defaultEmptyMessage = emptyMessage || t("common.noDataAvailable");
  const defaultErrorMessage = errorMessage || t("common.somethingWentWrong");

  if (isLoading) {
    return (
      <div className={containerClasses}>
        {title && (
          <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
        )}
        {loadingComponent || (
          <div className="animate-pulse">{t("common.loading")}</div>
        )}
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
          {defaultErrorMessage}
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
          {defaultEmptyMessage}
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
