"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/providers/store";
import { setUser } from "@/providers/auth/reducer/authSlice";
import { setStorageData } from "@/shared/store";

function LoginWithGoogleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userInfoStr = searchParams.get("userInfo");

    if (accessToken && refreshToken && userInfoStr) {
      try {
        const userInfo = JSON.parse(decodeURIComponent(userInfoStr));

        // Lưu vào localStorage
        setStorageData("accessToken", accessToken);
        setStorageData("refreshToken", refreshToken);
        setStorageData("user", userInfo);

        // Cập nhật Redux
        dispatch(setUser(userInfo));

        // Điều hướng tới home
        router.replace("/");
      } catch (error) {
        console.error("Failed to parse userInfo:", error);
        router.replace("/login");
      }
    } else {
      router.replace("/login");
    }
  }, [searchParams]);

  return <p className="text-center mt-20">Signing in with Google...</p>;
}

export default function LoginWithGooglePage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Preparing login...</p>}>
      <LoginWithGoogleContent />
    </Suspense>
  );
}
