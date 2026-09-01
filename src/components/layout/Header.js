import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand">
          oo<span>shirts</span>
        </Link>
        <nav className="nav">
          <Link href="/">Products</Link>
          <Link href="/products/new">New product</Link>
        </nav>
      </div>
    </header>
  );
}
