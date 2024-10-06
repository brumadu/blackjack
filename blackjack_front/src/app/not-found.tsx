import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Resource not Found!</h2>
      <Link
        href="./"
        className="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
