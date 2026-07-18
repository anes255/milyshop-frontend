import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-mily py-32 text-center">
      <h1 className="serif text-7xl text-gold mb-4">404</h1>
      <p className="text-gray-500 mb-8">Page introuvable</p>
      <Link href="/" className="btn-gold">Accueil</Link>
    </div>
  );
}
