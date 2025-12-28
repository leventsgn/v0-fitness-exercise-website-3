# 🚀 Vercel'e Deploy Rehberi (Önerilen)

## Neden Vercel?
✅ Ücretsiz
✅ NextAuth ve API route'ları çalışır
✅ Otomatik SSL
✅ GitHub entegrasyonu
✅ 2 dakikada hazır

---

## 🌐 Web Üzerinden Deploy (En Kolay)

### 1. Vercel'e Giriş
- https://vercel.com adresine gidin
- "Sign up" butonuna tıklayın
- **"Continue with GitHub"** seçeneğini seçin
- GitHub hesabınızla giriş yapın

### 2. Projeyi Import Edin
- Dashboard'da **"Add New... → Project"** butonuna tıklayın
- **"Import Git Repository"** bölümünden `leventsgn/v0-fitness-exercise-website-3` repository'sini bulun
- **"Import"** butonuna tıklayın

### 3. Proje Ayarları
- **Framework Preset**: Next.js (otomatik seçilir)
- **Root Directory**: `./` (default)
- **Build Command**: Otomatik
- **Output Directory**: Otomatik

### 4. Environment Variables Ekleyin
**"Environment Variables"** bölümüne şunları ekleyin:

```
Name: DATABASE_URL
Value: file:./prisma/dev.db
```

```
Name: NEXTAUTH_URL
Value: https://your-project-name.vercel.app
```
(Deploy olduktan sonra gerçek URL ile güncelleyin)

```
Name: NEXTAUTH_SECRET  
Value: supersecretkey123456789changeThisInProduction
```
(Güvenli bir random string kullanın)

### 5. Deploy!
- **"Deploy"** butonuna tıklayın
- ☕ 2-3 dakika bekleyin
- ✅ Siteniz hazır: `https://your-project-name.vercel.app`

---

## 💻 CLI ile Deploy (Alternatif)

```bash
# 1. Vercel CLI kur
npm i -g vercel

# 2. Giriş yap
vercel login

# 3. Deploy et
vercel

# Production deploy için
vercel --prod
```

Ya da hazır script'i kullanın:
```bash
./deploy-vercel.sh
```

---

## ⚙️ Deploy Sonrası Ayarlar

### 1. NEXTAUTH_URL'i Güncelle
- Vercel dashboard → Settings → Environment Variables
- `NEXTAUTH_URL` değerini gerçek URL ile değiştir:
  ```
  https://v0-fitness-exercise-website-3.vercel.app
  ```
- **"Redeploy"** butonuna tıklayın

### 2. Prisma Migrate (İlk Defa)
Vercel'de database yoksa, local'de oluşturun ve push edin:
```bash
# Local'de migration çalıştır
npx prisma migrate deploy

# Database dosyasını commit et (ilk kez için)
git add prisma/dev.db
git commit -m "Add initial database"
git push
```

**Not**: Production'da SQLite yerine PostgreSQL kullanmanız önerilir (Vercel Postgres ücretsiz plan var).

### 3. Google OAuth (Opsiyonel)
Eğer Google ile giriş eklemek isterseniz:

1. Google Cloud Console → OAuth Credentials
2. **Authorized redirect URIs** ekle:
   ```
   https://your-project-name.vercel.app/api/auth/callback/google
   ```
3. Vercel Environment Variables'a ekle:
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```
4. `auth.ts` dosyasında Google provider comment'lerini kaldır
5. Redeploy

---

## 🔄 Otomatik Deploy

Her `git push` yaptığınızda Vercel otomatik deploy eder:

```bash
git add .
git commit -m "Yeni özellik"
git push
```

Vercel otomatik olarak:
- ✅ Kodu çeker
- ✅ Build yapar  
- ✅ Deploy eder
- ✅ Preview URL verir

---

## 🐛 Sorun Giderme

### "Prisma Client not found" hatası
```bash
# vercel.json'da buildCommand doğru mu kontrol et
{
  "buildCommand": "prisma generate && next build"
}
```

### Database bağlantı hatası
- Environment variables doğru mu kontrol et
- `DATABASE_URL` doğru formatta mı kontrol et

### NextAuth hatası
- `NEXTAUTH_URL` production URL'i ile eşleşiyor mu?
- `NEXTAUTH_SECRET` ayarlı mı?

---

## 📊 Production Database (Önerilen)

SQLite development için iyidir ama production'da PostgreSQL kullanın:

### Vercel Postgres (Ücretsiz)
1. Vercel Dashboard → Storage → Create Database
2. PostgreSQL seçin
3. Environment variables otomatik eklenir
4. `prisma/schema.prisma` güncelle:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("POSTGRES_PRISMA_URL")
   }
   ```
5. Migration çalıştır:
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

---

## ✅ Kontrol Listesi

- [ ] Kod GitHub'a push edildi
- [ ] Vercel'de proje oluşturuldu
- [ ] Environment variables eklendi
- [ ] İlk deploy tamamlandı
- [ ] NEXTAUTH_URL güncellendi
- [ ] Site çalışıyor: `https://your-project.vercel.app`
- [ ] Kayıt/Giriş test edildi
- [ ] Profil sayfası çalışıyor

---

## 🎉 Tamamdır!

Siteniz şu adreste: `https://your-project-name.vercel.app`

Vercel dashboard: https://vercel.com/dashboard

