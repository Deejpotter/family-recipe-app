/**
 * whoami/page.tsx
 * Updated: 09/06/2025
 * Author: Deej Potter
 * Description: Page to display the authenticated user's ID by calling the backend /api/whoami endpoint.
 * Uses Clerk JWT for authentication. Used to verify frontend-backend connectivity and auth in dev.
 */

"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

const WhoAmIPage = () => {
  const { getToken, isSignedIn } = useAuth();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWhoAmI = async () => {
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        if (!isSignedIn) {
          setError("Not signed in.");
          setLoading(false);
          return;
        }
        const jwt = await getToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/whoami`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setResult(`User ID: ${data.userId}`);
        } else {
          setError(data.error || "Unknown error");
        }
      } catch (err: any) {
        setError(err.message || "Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchWhoAmI();
    // Only run on mount or when sign-in state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-2">Who Am I?</h1>
      <p className="mb-4">This page calls <code>/api/whoami</code> on the backend to verify authentication and connectivity.</p>
      {loading && <div>Loading...</div>}
      {result && <div className="bg-green-100 text-green-800 p-2 rounded mb-2">{result}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-2">Error: {error}</div>}
    </div>
  );
};

export default WhoAmIPage;
