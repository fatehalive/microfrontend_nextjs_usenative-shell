"use client";
import { Suspense, lazy } from "react";

const RemoteButton = lazy(() => import("remote/Button"));

export const Button = () => {
    return <Suspense fallback={'loading...'}>
        <RemoteButton/>
    </Suspense>
}