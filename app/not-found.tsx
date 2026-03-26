import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <AlertCircle size={16} className="text-accent mb-6" />
      <h1 className="">404</h1>
      <h2></h2>
    </div>
  );
}
