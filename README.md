# couvreur-demo — démo de base couvreur / zingueur / charpentier

Démo Studio FTT à réutiliser pour les prospects couvreurs (avatar 02). À copier dans un nouveau dossier au nom du prospect, puis remplacer :

- `[NOM]`, `[Ville]`, `[Département]`, `[Ville 1…8]`, `[X] km` (dans les 3 pages, chercher `class="ph"`)
- Téléphone (`06 — à renseigner` + liens `tel:`), email, adresse, horaires, SIRET
- Certifications (RGE / Qualibat / décennale) : ne garder que celles que l'entreprise a vraiment
- Photos `img/` : ce sont des photos Pexels d'illustration, à remplacer par les vrais chantiers du client
- Formulaire contact : pas branché (à relier à une Cloudflare Function + Resend si le client signe)

Pages : `index.html` (accueil), `services.html`, `contact.html` · `style.css` · `script.js`
Références design : Menuiserie Ferrand, Quoti, SWEB (cf. `references-design.md`)
Preview local : config `couvreur-demo` dans `.claude/launch.json` (port 5213)
Hébergement prévu : Cloudflare Pages

Studio FTT — contactstudioftt@gmail.com
