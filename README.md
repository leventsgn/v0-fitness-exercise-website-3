# FizyoRehber - Fizyoterapi Egzersiz Rehberi

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fleventsgn%2Fv0-fitness-exercise-website-3&env=DATABASE_URL,NEXTAUTH_URL,NEXTAUTH_SECRET&envDescription=Required%20environment%20variables&envLink=https%3A%2F%2Fgithub.com%2Fleventsgn%2Fv0-fitness-exercise-website-3%2Fblob%2Fmain%2F.env.example)

Profesyonel fizyoterapi egzersizleri ve profil yönetim sistemi.

## ✨ Özellikler

### 🏋️ Egzersiz Rehberi
- Boyun ve Sırt Egzersizleri
- Diz Rehabilitasyonu
- Omuz Egzersizleri
- Bel Ağrısı Tedavisi
- El ve Bilek Egzersizleri
- Ayak ve Ayak Bileği Rehabilitasyonu

### 👥 Profil Yönetimi
- **İki Kullanıcı Rolü**: Hasta ve Fizyoterapist
- E-posta/şifre ile kayıt ve giriş
- Google OAuth desteği (opsiyonel)
- Kişiselleştirilmiş profil sayfaları
- Güvenli oturum yönetimi (NextAuth.js)

### 🔐 Güvenlik
- Şifre şifreleme (bcrypt)
- JWT tabanlı authentication
- CSRF koruması
- Secure cookie ayarları

## 🚀 Hızlı Deploy

### Vercel'e Deploy (2 Dakika - Önerilen)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fleventsgn%2Fv0-fitness-exercise-website-3)

**Adımlar:**
1. Yukarıdaki butona tıklayın
2. GitHub ile giriş yapın
3. Repository adı verin
4. Environment variables ekleyin:
   - `DATABASE_URL`: `file:./prisma/dev.db`
   - `NEXTAUTH_URL`: `https://your-project.vercel.app` (deploy sonrası güncelleyin)
   - `NEXTAUTH_SECRET`: Random güvenli bir string
5. "Deploy" butonuna tıklayın

Detaylı rehber: **[VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)**

## 💻 Yerel Geliştirme

```bash
# Repository'yi klonlayın
git clone https://github.com/leventsgn/v0-fitness-exercise-website-3.git
cd v0-fitness-exercise-website-3

# Bağımlılıkları yükleyin
pnpm install

# Environment variables dosyasını oluşturun
cp .env.example .env
# .env dosyasını düzenleyin

# Veritabanını hazırlayın
npx prisma migrate dev

# Development server'ı başlatın
pnpm dev
```

http://localhost:3000 adresini açın.

## 📖 Dokümantasyon

- **[Profil Yönetimi](PROFIL_YONETIMI.md)** - Kullanıcı sistemi detayları
- **[Vercel Deploy](VERCEL_DEPLOY.md)** - Production deployment

## 🛠 Teknolojiler

- Next.js 16 | NextAuth.js v5 | Prisma | Tailwind CSS | Radix UI

## 📝 Environment Variables

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

[.env.example](.env.example) dosyasına bakın.

## 🎯 Kullanım

1. `/giris` - Kayıt ol / Giriş yap
2. Hesap türü seç: **Hasta** veya **Fizyoterapist**
3. `/profil` - Profilini düzenle

## 📄 Lisans

MIT

---

**Geliştirici:** [@leventsgn](https://github.com/leventsgn)
