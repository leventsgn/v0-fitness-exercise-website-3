#!/bin/bash
# Vercel CLI ile deploy script'i

echo "🚀 Vercel'e deploy başlıyor..."

# Vercel CLI kurulu değilse kur
if ! command -v vercel &> /dev/null
then
    echo "📦 Vercel CLI kuruluyor..."
    npm i -g vercel
fi

# Deploy
echo "🌐 Deploy ediliyor..."
vercel --prod

echo "✅ Deploy tamamlandı!"
echo "📝 Environment variables'ları Vercel dashboard'dan eklemeyi unutmayın:"
echo "   - DATABASE_URL"
echo "   - NEXTAUTH_URL"
echo "   - NEXTAUTH_SECRET"
