import { Button } from "../components/Button";
const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="text-2xl">The page you are looking for does not exist.</p>
      <Button
        text="View Products"
        size="md"
        variant="outlined-dark"
        href="/products"
      />
    </div>
  );
};

export default PageNotFound;
