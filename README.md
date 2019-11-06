# eksiCode Telegram Botu

## Nedir

Bu script, http://eksicode.org telegram grupları üzerindeki kayıtlı üye sayılarını ölçmek
ve chat geliştirmeleri için yazılmaktadır.

### Nasıl Çalıştırılır

-   UYARI: Docker çalışırken git branch'ını değiştirmeyin. 

-   Mysql veritabanını kurun, tabloları oluşturun (bilgi için bizimle iletişime geçebilirsiniz)

-   Paketleri yükleyin: `npm i`

-   .env file oluşturun ve `BOT_TOKEN = TOKEN_KODU`, `API_USER = API_KULLANICI_ADI`, `API_PASS = API_PAROLA`, `ADMIN_CH_ID = TG_ADMINGRUBU_ID` ve mysql db bağlantı bilgilerini ekleyin.

-   Docker'ı çalıştırın: `docker-compose up --build`

## Bot Komutları

### Genel

- `/help` - Komutları listeler.

- `/yardim` - Komutları listeler.

-   `/kaynak <URL>`: Kaynak URL'sini Ekşicode veritabanına ekler.

- `/kanal <Sorgu | tümü>` - kanalları listeler.

-   `/discord` -  Discord sunucumuz.

### Yönetim Komutları

-   `/pin <mesaj>`: Mesajı tüm EksiCode kanallarında gönderir ve sabitler.

-   `/ban`: Forward edilmiş mesajı alıntılayarak kullanılır. Forward edilen kişiyi tüm EksiCode kanallarından atar.

## Hata Mesajları

Siz de bu repoyu forklayıp `hataMesaji.txt` dosyası içerisine hata mesajı için ünlem ekleyebilirsiniz.

## .pinignore dosyası

`/pin` komutunun çalışmamasını istediğiniz kanalın ID'lerini .pinignore dosyasına ekleyerek istisnalar oluşturabilirsiniz.
