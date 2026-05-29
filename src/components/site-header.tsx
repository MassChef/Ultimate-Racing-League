import Image from "next/image";
import Link from "next/link";
import { AuthNav } from "@/components/auth-nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-lockup" aria-label="Ultimate Racing League home">
        <Image
          src="/url-logo-standard.png"
          alt="Ultimate Racing League logo"
          width={96}
          height={96}
          priority
        />
        <span>Ultimate Racing League</span>
      </Link>
      <AuthNav />
    </header>
  );
}
