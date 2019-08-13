# eksiCode Telegram Botu

## Nedir

Bu script, http://eksicode.org telegram grupları üzerindeki kayıtlı üye sayılarını ölçmek
ve chat geliştirmeleri için yazılmaktadır.

### Nasıl Çalıştırılır

-   Mysql veritabanını kurun, tabloları oluşturun (bilgi için bizimle iletişime geçebilirsiniz)

-   Paketleri yükleyin: `npm i`

-   .env file oluşturun ve `BOT_TOKEN = TOKEN_KODU`, `API_USER = API_KULLANICI_ADI`, `API_PASS = API_PAROLA`, `ADMIN_CH_ID = TG_ADMINGRUBU_ID` ve mysql db bağlantı bilgilerini ekleyin.

-   Scripti çalıştırın: `npm run start`

## Bot Komutları

### Genel

-   `/kaynak <url>`: Verilen URL kaynak veritabanına sayfa başlığı ile birlikte eklenir.

-   `/kanal <sorgu>`: EksiCode kanalları arasında arama yapar.

### Yönetim Komutları

-   `/pin <mesaj>`: Mesajı tüm EksiCode kanallarında gönderir ve sabitler.

-   `/ban`: Forward edilmiş mesajı alıntılayarak kullanılır. Forward edilen kişiyi tüm EksiCode kanallarından atar.

## Kanal Bulunamadı hatası

Siz de bu repoyu forklayıp `kanalBulunamadi.txt` dosyası içerisine hata mesajı için ünlem ekleyebilirsiniz.
