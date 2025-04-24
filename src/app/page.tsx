"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";

export default function Home() {
  const router = useRouter();

  React.useLayoutEffect(() => {
    router.replace(ROUTES.MY_FORMS);
  }, [router]);

  return <></>;
}
