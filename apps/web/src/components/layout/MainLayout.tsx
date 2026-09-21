import { Outlet, Link } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight">
            JANGANDOO FPT
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">Accueil</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-background">
        <Outlet />
      </main>

      <footer className="bg-surface border-t border-border py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted text-sm">
          &copy; {new Date().getFullYear()} Ministère de la Formation Professionnelle, de l'Apprentissage et de l'Artisanat - Sénégal.
        </div>
      </footer>
    </div>
  );
}
