"use client";

// Error components must be Client Components
import { useEffect } from "react";

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Hatalı şifre sıfırlama bağlantısı
        </h1>
      </div>
    </main>
  );
}
