// SiteError.tsx
type SiteErrorProps = {
  errorMessage: string;
}

const SiteError = ({ errorMessage }: SiteErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Site Error</h1>
      <p className="text-2xl">{errorMessage}</p>
    </div>
  );
};

export default SiteError;