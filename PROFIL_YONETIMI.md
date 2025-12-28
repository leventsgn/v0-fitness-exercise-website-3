# FizyoRehber - Profil Yönetim Sistemi

Bu proje, fizyoterapist ve hasta kullanıcıları için kapsamlı bir profil yönetim sistemi içermektedir.

## Özellikler

### Authentication (Kimlik Doğrulama)
- ✅ E-posta ve şifre ile kayıt
- ✅ E-posta ve şifre ile giriş
- ✅ Google OAuth ile otomatik kayıt ve giriş
- ✅ Güvenli oturum yönetimi (NextAuth.js v5)
- ✅ Şifre şifreleme (bcrypt)

### Kullanıcı Rolleri
- **Hasta**: Kişisel sağlık bilgileri ve egzersiz takibi
- **Fizyoterapist**: Profesyonel bilgiler ve hasta yönetimi

### Profil Özellikleri

#### Ortak Özellikler
- Profil fotoğrafı
- Biyografi
- İletişim bilgileri (telefon, adres)
- Tema değiştirme (açık/koyu mod)

#### Fizyoterapist Profili
- Uzmanlık alanı
- Lisans numarası
- Deneyim yılı
- İstatistikler (toplam hasta, aktif tedavi, tamamlanan)

#### Hasta Profili
- Tıbbi geçmiş
- Egzersiz takibi
- Tedavi süreci

## Kurulum

### 1. Gerekli Paketleri Yükleyin

```bash
pnpm install
```

### 2. Veritabanını Ayarlayın

```bash
# Prisma migration'ları çalıştırın
pnpm prisma migrate dev

# Prisma Client'ı oluşturun
pnpm prisma generate
```

### 3. Environment Variables Ayarlayın

`.env` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (Opsiyonel - Google ile giriş için)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Google OAuth Ayarları (Opsiyonel)

Google ile giriş özelliğini kullanmak için:

1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Yeni bir proje oluşturun
3. "APIs & Services" > "Credentials" bölümüne gidin
4. "Create Credentials" > "OAuth 2.0 Client ID" seçin
5. Authorized redirect URIs kısmına ekleyin:
   - `http://localhost:3000/api/auth/callback/google`
   - Production için: `https://yourdomain.com/api/auth/callback/google`
6. Client ID ve Client Secret'ı `.env` dosyasına ekleyin

### 5. Uygulamayı Çalıştırın

```bash
pnpm dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Kullanım

### Yeni Kullanıcı Kaydı

1. Ana sayfada "Giriş Yap" butonuna tıklayın
2. "Kayıt Ol" sekmesine geçin
3. Formu doldurun:
   - Ad Soyad
   - E-posta
   - Şifre
   - Hesap türü (Hasta veya Fizyoterapist)
4. "Kayıt Ol" butonuna tıklayın

### Google ile Kayıt/Giriş

1. Giriş sayfasında "Google ile Giriş Yap" butonuna tıklayın
2. Google hesabınızı seçin
3. İzinleri onaylayın
4. Otomatik olarak profil sayfasına yönlendirileceksiniz

### Profil Düzenleme

1. Profil sayfasında "Düzenle" butonuna tıklayın
2. İlgili alanları güncelleyin
3. "Kaydet" butonuna tıklayın

## Teknolojiler

- **Framework**: Next.js 16 (App Router)
- **Authentication**: NextAuth.js v5
- **Database**: SQLite (Prisma ORM)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Notifications**: Sonner

## Veritabanı Şeması

```prisma
enum UserRole {
  HASTA
  FIZYOTERAPIST
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          UserRole  @default(HASTA)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  sessions      Session[]
  profile       Profile?
}

model Profile {
  id              String   @id @default(cuid())
  userId          String   @unique
  bio             String?
  phone           String?
  address         String?
  specialization  String?  // Fizyoterapist için
  licenseNumber   String?  // Fizyoterapist için
  experience      Int?     // Fizyoterapist için
  medicalHistory  String?  // Hasta için
  
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## Güvenlik

- Şifreler bcrypt ile hash'lenir (10 salt rounds)
- Session'lar JWT ile yönetilir
- CSRF koruması aktif
- Güvenli cookie ayarları
- SQL injection koruması (Prisma ORM)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints

### Profile
- `GET /api/profile` - Kullanıcı profilini getir
- `POST /api/profile` - Kullanıcı profilini güncelle

## Geliştirme

### Prisma Commands

```bash
# Yeni migration oluştur
pnpm prisma migrate dev --name migration_name

# Prisma Studio'yu aç (veritabanı GUI)
pnpm prisma studio

# Schema'yı sıfırla
pnpm prisma migrate reset
```

## Lisans

MIT

## Katkıda Bulunma

Pull request'ler kabul edilir. Büyük değişiklikler için lütfen önce bir issue açın.
