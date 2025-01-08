import Link from "next/link";

export function MainNav({ className, ...props }) {
  return (
    <nav className={className} {...props}>
      <Link href="/" className="text-xl font-bold">
        Logo
      </Link>
    </nav>
  );
}
