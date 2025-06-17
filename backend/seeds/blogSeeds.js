const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const blogData = [
    {
        title: "Kaliteli Ürünler Var Bizde",
        content: `
            <h2>Kaliteli Ürünler ile Tanışın</h2>
            <p>Standart Kalıp olarak, kalıp sektöründe yılların verdiği deneyimle ürettiğimiz ürünler, en yüksek kalite standartlarında sizlere sunulmaktadır.</p>

            <h3>Neden Kalitemizi Tercih Etmelisiniz?</h3>
            <ul>
                <li>ISO 9001 kalite standartlarına uygun üretim</li>
                <li>Hassas ölçüm cihazları ile kalite kontrol</li>
                <li>Uzman mühendis kadromuz ile sürekli geliştirme</li>
                <li>Uluslararası standartlarda hammadde kullanımı</li>
            </ul>

            <p>Ürünlerimiz otomotiv, beyaz eşya ve makine imalat sanayilerinde güvenle kullanılmaktadır. Her aşamada kalite kontrol süreçlerimizden geçen ürünlerimiz, müşteri memnuniyetini en üst seviyede tutmayı hedeflemektedir.</p>

            <blockquote>
                "Kalite bir tesadüf değil, her zaman üstün çabanın sonucudur." - John Ruskin
            </blockquote>
        `,
        excerpt: "Standart Kalıp'ın kaliteli ürünleri ile tanışın. ISO standartlarında üretim ve sürekli kalite kontrol süreçlerimiz hakkında detaylı bilgiler.",
        featuredImage: "/img/blogs/blog1.jpg",
        author: "Mühendislik Ekibi",
        tags: ["kalite", "ISO", "üretim", "standart"],
        category: "Kalite",
        isPublished: true,
        readTime: 8
    },
    {
        title: "Otomotiv Sektöründe İnovasyon",
        content: `
            <h2>Otomotiv Sektöründeki Yeniliklerimiz</h2>
            <p>Otomotiv sektörü sürekli gelişen ve yenilenen bir sektördür. Standart Kalıp olarak bu gelişmeleri yakından takip ediyor ve müşterilerimize en son teknoloji ile üretilmiş ürünler sunuyoruz.</p>

            <h3>Otomotiv Sektöründeki Ürünlerimiz</h3>
            <ul>
                <li>Ejektör Pimler - Hassas toleranslarda üretim</li>
                <li>Sıkıştırma Yayları - Dayanıklı ve uzun ömürlü</li>
                <li>Gaz Yayları - Yüksek performans</li>
                <li>Kovan ve Burçlar - Özel alaşım malzemeler</li>
            </ul>

            <p>Ar-Ge departmanımız sürekli olarak yeni çözümler geliştirmekte ve otomotiv sektörünün ihtiyaçlarına uygun ürünler tasarlamaktadır.</p>

            <h3>Teknolojik Altyapımız</h3>
            <p>Son teknoloji CNC tezgahlarımız ve 3D ölçüm cihazlarımız ile mikron hassasiyetinde üretim gerçekleştiriyoruz.</p>
        `,
        excerpt: "Otomotiv sektöründeki innovasyonlarımız ve teknolojik altyapımız hakkında detaylı bilgiler. Ar-Ge çalışmalarımız ve yenilikçi çözümlerimiz.",
        featuredImage: "/img/blogs/blog2.jpg",
        author: "Ar-Ge Departmanı",
        tags: ["otomotiv", "inovasyon", "teknoloji", "ar-ge"],
        category: "Teknoloji",
        isPublished: true,
        readTime: 6
    },
    {
        title: "Sürdürülebilir Üretim Anlayışımız",
        content: `
            <h2>Çevre Dostu Üretim Süreçlerimiz</h2>
            <p>Standart Kalıp olarak çevreye saygılı üretim anlayışımızla geleceğe değer katıyoruz. Sürdürülebilir üretim modelleri ile hem çevreyi koruyup hem de kaliteli ürünler sunuyoruz.</p>

            <h3>Çevre Dostu Uygulamalarımız</h3>
            <ul>
                <li>Geri dönüştürülebilir malzeme kullanımı</li>
                <li>Enerji verimli üretim süreçleri</li>
                <li>Atık minimizasyonu programları</li>
                <li>Su tasarrufu sistemleri</li>
                <li>Karbon ayak izi azaltma projeleri</li>
            </ul>

            <p>ISO 14001 Çevre Yönetim Sistemi sertifikamız ile çevresel performansımızı sürekli iyileştiriyoruz.</p>

            <h3>Gelecek Nesillere Yaşanabilir Bir Dünya</h3>
            <p>Sadece bugünü değil, geleceği de düşünerek üretim yapıyoruz. Her projemizde sürdürülebilirlik kriterlerini göz önünde bulunduruyoruz.</p>
        `,
        excerpt: "Sürdürülebilir üretim anlayışımız ve çevre dostu uygulamalarımız. ISO 14001 sertifikamız ile çevresel sorumluluklarımız.",
        featuredImage: "/img/blogs/blog3.jpg",
        author: "Kalite Direktörü",
        tags: ["sürdürülebilirlik", "çevre", "ISO14001", "yeşil-üretim"],
        category: "Çevre",
        isPublished: true,
        readTime: 7
    },
    {
        title: "Dijital Dönüşüm Yolculuğumuz",
        content: `
            <h2>Endüstri 4.0 ile Geleceğe Hazırlık</h2>
            <p>Dijital çağda rekabet gücümüzü artırmak için Endüstri 4.0 teknolojilerini üretim süreçlerimize entegre ediyoruz.</p>

            <h3>Dijital Teknolojilerimiz</h3>
            <ul>
                <li>IoT sensörleri ile makine takibi</li>
                <li>Veri analizi ile üretim optimizasyonu</li>
                <li>Robotik otomasyon sistemleri</li>
                <li>Dijital ikiz teknolojisi</li>
                <li>Yapay zeka destekli kalite kontrol</li>
            </ul>

            <p>Bu teknolojiler sayesinde üretim verimliliğimizi %30 artırdık ve hata oranımızı minimize ettik.</p>

            <h3>Dijital Dönüşümün Faydaları</h3>
            <p>Müşterilerimize daha hızlı teslimat, daha yüksek kalite ve rekabetçi fiyatlar sunabiliyoruz.</p>
        `,
        excerpt: "Endüstri 4.0 teknolojileri ile dijital dönüşüm yolculuğumuz. IoT, robotik otomasyon ve yapay zeka uygulamalarımız.",
        featuredImage: "/img/blogs/blog4.jpg",
        author: "Teknoloji Direktörü",
        tags: ["dijital-dönüşüm", "endüstri-4.0", "IoT", "otomasyon"],
        category: "Teknoloji",
        isPublished: true,
        readTime: 9
    },
    {
        title: "Global Pazarlarda Standart Kalıp",
        content: `
            <h2>Uluslararası Başarımız</h2>
            <p>Standart Kalıp olarak sadece yerel değil, global pazarlarda da güçlü bir konuma sahip olmak için çalışıyoruz.</p>

            <h3>İhracat Başarılarımız</h3>
            <ul>
                <li>50'den fazla ülkeye ihracat</li>
                <li>Avrupa pazarında %15 büyüme</li>
                <li>Uluslararası kalite sertifikaları</li>
                <li>Global OEM ortaklıkları</li>
            </ul>

            <p>Kaliteli üretim ve güvenilir iş ortaklığımız sayesinde dünya çapında tanınan bir marka haline geldik.</p>

            <h3>Hedeflerimiz</h3>
            <p>2025 yılına kadar ihracat hacmimizi ikiye katlamayı ve yeni pazarlara açılmayı hedefliyoruz.</p>
        `,
        excerpt: "Global pazarlardaki konumumuz ve uluslararası başarılarımız. İhracat hedeflerimiz ve dünya çapındaki iş ortaklıklarımız.",
        featuredImage: "/img/blogs/blog5.jpg",
        author: "İhracat Müdürü",
        tags: ["ihracat", "global", "uluslararası", "başarı"],
        category: "İş Geliştirme",
        isPublished: true,
        readTime: 5
    },
    {
        title: "Müşteri Memnuniyeti Odaklı Hizmet",
        content: `
            <h2>Müşterilerimiz Bizim Önceliğimiz</h2>
            <p>Standart Kalıp olarak müşteri memnuniyetini her şeyin üstünde tutuyoruz. Müşterilerimizin ihtiyaçlarını anlamak ve beklentilerini karşılamak için sürekli çalışıyoruz.</p>

            <h3>Müşteri Hizmetleri Yaklaşımımız</h3>
            <ul>
                <li>7/24 teknik destek hizmeti</li>
                <li>Hızlı cevap garantisi - 24 saat içinde</li>
                <li>Özel çözüm geliştirme hizmeti</li>
                <li>Düzenli müşteri ziyaretleri</li>
                <li>Sürekli geri bildirim toplama</li>
            </ul>

            <p>Müşteri memnuniyet anketlerimizde %95 üzerinde memnuniyet oranına sahip olmaktan gurur duyuyoruz.</p>

            <h3>Sürekli İyileştirme</h3>
            <p>Müşteri geri bildirimlerini değerlendirip sürekli olarak hizmet kalitemizi artırıyoruz.</p>
        `,
        excerpt: "Müşteri memnuniyeti odaklı hizmet anlayışımız. 7/24 teknik destek ve %95 üzerinde memnuniyet oranımız.",
        featuredImage: "/img/blogs/blog6.jpg",
        author: "Müşteri Hizmetleri",
        tags: ["müşteri-memnuniyeti", "hizmet", "destek", "kalite"],
        category: "Hizmet",
        isPublished: true,
        readTime: 4
    }
];

const seedBlogs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // Mevcut blog verilerini sil
        await Blog.deleteMany({});
        // Yeni blog verilerini tek tek kaydet (middleware çalışması için)
        for (const blogItem of blogData) {
            const blog = new Blog(blogItem);
            await blog.save();
            }

        mongoose.connection.close();
        } catch (error) {
        process.exit(1);
    }
};

if (require.main === module) {
    seedBlogs();
}

module.exports = { seedBlogs, blogData };
