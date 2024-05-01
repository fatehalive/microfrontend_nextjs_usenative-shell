// import { Button } from "@/components/Button";
import { lazy } from "react";
let Button: any = () => null;

if (process.browser) {
  Button = lazy(() => {
    return import('remote/Button')
  })
}

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>TES</div>
    </main>
  );
}
