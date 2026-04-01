# Configuration Google OAuth

## Etapes

### 1. Créer un projet Google Cloud

1. Aller sur https://console.cloud.google.com/
2. Cliquer sur "Nouveau projet" et le nommer "LearnJap"
3. Sélectionner le projet créé

### 2. Configurer l'écran de consentement OAuth

1. Menu > "APIs & Services" > "OAuth consent screen"
2. Choisir "External"
3. Remplir : nom de l'app ("LearnJap"), email de support
4. Ajouter le scope `email` et `profile`
5. Ajouter ton adresse email en "Test users"

### 3. Créer les identifiants OAuth

1. Menu > "APIs & Services" > "Credentials"
2. Cliquer "Create Credentials" > "OAuth client ID"
3. Type : "Web application"
4. Nom : "LearnJap Web"
5. **Authorized redirect URIs** : ajouter `http://localhost:3000/api/auth/callback/google`
6. Copier le **Client ID** et le **Client Secret**

### 4. Configurer le projet

1. Copier `.env.example` vers `.env` (si pas déjà fait)
2. Remplir les valeurs dans `.env` :

```env
AUTH_GOOGLE_ID="ton-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="ton-client-secret"
```

3. Générer le secret Auth.js :

```bash
npx auth secret
```

### 5. Tester

```bash
npm run dev
```

Aller sur http://localhost:3000/login et cliquer "Se connecter avec Google".
