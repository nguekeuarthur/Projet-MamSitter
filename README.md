# MamSitter 🍼

**MamSitter** est une plateforme complète de soutien post-partum personnalisé. Nous connectons les mamans avec des MamaSitters formées pour les accompagner durant les premières semaines avec bébé.

## 📋 Description

MamSitter offre un service de soutien post-partum à domicile, disponible en France et Suisse. Les parents trouvent des MamaSitters qualifiées qui leur apportent soutien, réconfort et conseils pratiques. Nos services incluent l'accompagnement personnalisé, les forfaits adaptés, et un support WhatsApp 24/7.

## 🚀 Stack Technologique

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et serveur de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **Supabase** - Authentification et base de données
- **PostCSS** - Traitement CSS

### Backend
- **Node.js/Express** - Serveur API
- **TypeScript** - Typage statique
- **Supabase** - Base de données et authentification
- **Nodemailer** - Service d'email

## 📦 Installation

### Prérequis
- Node.js 16+
- npm ou yarn

### Installation du Frontend

1. Clonez le repository :
```bash
git clone https://github.com/nguekeuarthur/Projet-MamSitter.git
cd Projet-MamSitter
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez votre navigateur à l'adresse : `http://localhost:5173`

### Installation du Backend

1. Accédez au dossier backend :
```bash
cd backend
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement (créez un fichier `.env`)

4. Lancez le serveur :
```bash
npm start
```

## 🛠️ Scripts disponibles

### Frontend
| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile le projet pour la production |
| `npm run preview` | Prévisualise la version de production |
| `npm run lint` | Vérifie le code avec ESLint |

### Backend
| Commande | Description |
|----------|-------------|
| `npm start` | Lance le serveur |
| `npm run dev` | Lance en mode développement avec rechargement automatique |

## 📁 Structure du projet

```
.
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   ├── BecomeSitter.tsx
│   │   ├── Footer.tsx
│   │   ├── AuthLogin.tsx
│   │   ├── AuthRegister.tsx
│   │   └── ...autres composants
│   ├── pages/
│   │   ├── MamaSitters.tsx
│   │   ├── MamaSitterSearch.tsx
│   │   ├── Profile.tsx
│   │   ├── Messages.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── ...autres pages
│   ├── services/
│   │   ├── authService.ts
│   │   ├── messageService.ts
│   │   └── userService.ts
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   └── supabase.ts
│   ├── App.tsx
│   └── main.tsx
├── backend/
│   └── src/
│       ├── models/
│       │   ├── User.ts
│       │   └── Message.ts
│       ├── routes/
│       │   ├── auth.ts
│       │   ├── messages.ts
│       │   └── users.ts
│       ├── middleware/
│       │   └── auth.ts
│       ├── services/
│       │   └── emailService.ts
│       └── index.ts
└── public/
    └── images/
```

## ✨ Fonctionnalités principales

- **🏠 Accueil** - Présentation attractive de MamSitter
- **👥 Annuaire MamaSitters** - Découvrez et recherchez des MamaSitters formées
- **🔐 Authentification** - Inscription et connexion sécurisées avec Supabase
- **👤 Profil utilisateur** - Gestion du profil et des préférences
- **💬 Messagerie** - Communication entre parents et MamaSitters
- **📦 Forfaits** - Services adaptés en EUR et CHF
- **📱 Design responsive** - Optimisé pour tous les appareils
- **🛡️ Admin Dashboard** - Gestion de la plateforme
- **📧 Support 24/7** - Disponibilité WhatsApp continue

## 🔐 Authentification

MamSitter utilise **Supabase** pour la gestion de l'authentification et de la base de données. Les utilisateurs peuvent se connecter via email avec vérification de compte.

## 👥 Auteur

- **Arthur Nguekeu** - [GitHub](https://github.com/nguekeuarthur)

## 📄 Licence

Ce projet est sous licence MIT.

---

© 2026 MamSitter - Tous droits réservés
