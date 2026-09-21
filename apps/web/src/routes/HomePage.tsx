export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
          Apprendre ensemble
        </h1>
        <p className="text-xl text-muted">
          Communauté pédagogique virtuelle intelligente de la Formation Professionnelle et Technique.
        </p>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="p-6 bg-surface border border-border rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-secondary mb-3">Partage de pratiques</h2>
          <p className="text-foreground">
            Capitalisez vos expériences professionnelles et publiez vos récits pédagogiques structurés selon l'Approche Par Compétences (APC).
          </p>
        </div>
        <div className="p-6 bg-surface border border-border rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-secondary mb-3">Ressources & Collaboration</h2>
          <p className="text-foreground">
            Recherchez des fiches techniques, bénéficiez de retours pédagogiques de vos pairs, et collaborez entre formateurs.
          </p>
        </div>
      </section>
    </div>
  );
}
