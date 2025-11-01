import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10 py-6 text-sm text-gray-600">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <p>© {new Date().getFullYear()} Portal de Receitas. Todos os direitos reservados.</p>
        <nav className="flex gap-4">
          <Link href="/sobre" className="hover:text-pink-600">Sobre</Link>
          <Link href="/contato" className="hover:text-pink-600">Contato</Link>
          <Link href="/politica-de-privacidade" className="hover:text-pink-600">Privacidade</Link>
        </nav>
      </div>
    </footer>
  );
}