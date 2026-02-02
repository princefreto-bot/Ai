# Architecture Technique - TradeScalpSnip

Ce document décrit l'architecture technique de la plateforme SaaS TradeScalpSnip (v2026).

## 🌍 Vue d'ensemble

TradeScalpSnip est une application **Monorepo** hébergée sur Render, combinant un frontend React (Vite) et un backend Node.js (Express).

### Stack Technique

- **Frontend :** React 18, TypeScript, Vite, TailwindCSS v4, Anime.js (Animations), Lucide React (Icônes).
- **Backend :** Node.js, Express, JSON Web Token (JWT).
- **Base de données (Actuelle) :** In-Memory (Simulée pour la démo/MVP). Prête pour MongoDB/PostgreSQL.
- **Paiement :** NowPayments (Crypto uniquement) - API & IPN Webhooks.
- **Hébergement :** Render (Service Web unifié).

---

## 📂 Structure du Projet

```
/
├── dist/                   # Build de production (Frontend + Backend)
├── server/                 # Code source du Backend
│   ├── src/
│   │   ├── config.ts       # Configuration env
│   │   ├── server.ts       # Point d'entrée Express
│   │   ├── routes/         # Routes API (Auth, Payment, Analysis)
│   │   ├── services/       # Logique métier (NowPayments, AI Mock)
│   │   └── types/          # Définitions TypeScript Backend
│   └── package.json        # Dépendances Backend
├── src/                    # Code source du Frontend
│   ├── components/         # Composants React
│   │   ├── landing/        # Sections de la page d'accueil (Hero, Features...)
│   │   ├── dashboard/      # Composants du tableau de bord
│   │   └── ui/             # Composants réutilisables (Button, Card...)
│   ├── hooks/              # Custom Hooks (useAnime, etc.)
│   ├── pages/              # Pages (Home, Login, Dashboard...)
│   ├── services/           # Services Frontend (API calls)
│   └── store/              # Gestion d'état (Zustand)
├── render.yaml             # Configuration de déploiement Render
└── package.json            # Dépendances Frontend + Scripts de build globaux
```

---

## 🔄 Flux de Données

### 1. Authentification
- **Flux :** Login/Register -> API `/api/auth` -> JWT Token.
- **Sécurité :** Le token est stocké côté client et envoyé dans le header `Authorization: Bearer <token>`.

### 2. Paiement (Crypto)
1. Utilisateur sélectionne un plan.
2. Frontend appelle l'API NowPayments (via Backend ou Widget).
3. Utilisateur paie en crypto.
4. NowPayments envoie une notification (IPN) au Webhook Backend `/api/payment/webhook`.
5. Backend valide la signature IPN et active le statut `isSubscribed` de l'utilisateur.

### 3. Analyse IA (Simulée)
- L'utilisateur upload une image.
- Le frontend simule un temps de traitement (pour l'effet UX).
- Le service retourne une analyse structurée (BUY/SELL, TP, SL, Score).

---

## 🚀 Déploiement (Render)

L'application est déployée comme un **Web Service** unique.
- **Build :** `npm install && npm run build && cd server && npm run build:server`
- **Start :** `npm start` (Lance le serveur Express qui sert l'API ET les fichiers statiques du frontend).

## 🎨 Design System & UX

- **Thème :** Dark/Light mode hybride avec dominance blanc/rose/violet.
- **Animations :** Anime.js utilisé pour les transitions, le staggering et les effets "Tech".
- **Responsive :** Mobile-first via Tailwind CSS.
