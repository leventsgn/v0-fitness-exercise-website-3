# Vercel'e Deploy Rehberi

## Adım 1: GitHub'a Push
```bash
git add .
git commit -m "Profil yönetim sistemi eklendi"
git push origin main
```

## Adım 2: Vercel'e Deploy
1. https://vercel.com adresine gidin
2. "Sign up" ile GitHub hesabınızla giriş yapın
3. "Add New Project" tıklayın
4. "leventsgn/v0-fitness-exercise-website-3" repository'sini seçin
5. "Import" butonuna tıklayın

## Adım 3: Environment Variables Ekleyin
Vercel dashboard'da "Environment Variables" sekmesinde:

```
DATABASE_URL = file:./prisma/dev.db
NEXTAUTH_URL = https://your-project-name.vercel.app
NEXTAUTH_SECRET = supersecretkey123456789changeThis
```

## Adım 4: Deploy
"Deploy" butonuna tıklayın. 2-3 dakikada hazır!

## ✅ Tüm özellikler çalışır:
- Authentication (e-posta/şifre)
- Profil yönetimi
- Database
- API route'ları

## Not:
Google OAuth için NEXTAUTH_URL'i güncelleyin ve Google Cloud Console'da redirect URI'yi ekleyin:
`https://your-project-name.vercel.app/api/auth/callback/google`
