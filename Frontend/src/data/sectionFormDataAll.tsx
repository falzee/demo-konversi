
//punya multiple choice
interface SubSection {
    label: string;
    value: string;
}
    
//punya multiple choice
interface Section {
    label: string;
    value: string;
    children: SubSection[];
    }
export const allData: Section[]= [
    {
    label: 'W.1.1. - Mengembangkan dan mewujudkan tanggungjawab kecendekiaan dan kepedulian profesi keinsinyuran kepada bangsa, negara dan komunitas internasional',
    value: 'W.1.1.',
    children: [
        { label: 'W.1.1.1. - Menyadari tanggungjawab kecendekiaan Insinyur Profesional bagi memahami dan menjunjung falsafah dan nilai Pancasila sebagai  falsafah dasar masyarakat bangsa Indonesia', value: 'W.1.1.1' },
        { label: 'W.1.1.2. - Menghayati dan senantiasa  berusaha mengamalkan nilai dan jiwa Pancasila dalam menjalankan profesi.', value: 'W.1.1.2' },
        { label: 'W.1.1.3. - Berpedoman kepada konstitusi dan perundang-undangan yang berlaku di Negara Kesatuan Republik Indonesia dalam menjalankan profesi.', value: 'W.1.1.3' },
        { label: 'W.1.1.4. - Menjunjung rasa kesetiakawanan nasional dan rasa kepedulian sosial dan berusaha mendorong kewirausahaan dan kesejahteraan masyarakat menuju cita-cita Bangsa dan Negara', value: 'W.1.1.4' },
        { label: 'W.1.1.5. - Mengembangkan wawasan kebangsaan yang kuat dan dengan sadar menumbuhkan  kepercayaan  diri  membangun  kemandirian  nasional dalam profesinya dan dalam mengembangkan kerjasama di komunitas internasional.', value: 'W.1.1.5' },
        // ... other sub-sections ...
    ],
    },
    {
    label:'W.1.2. - Menghayati serta mematuhi Kode Etik Insinyur Indonesia dan tatalaku profesi yang berlaku',
    value: 'W.1.2.',
    children: [
        { label: 'W.1.2.1. - Menempatkan tanggungjawab pada  kesejahteraan, kesehatan dan keselamatan masyarakat di atas tanggungjawabnya kepada profesi, kepada kepentingan golongan, atau kepada rekan sesama insinyur', value: 'W.1.2.1' },
        { label: 'W.1.2.2. - Bertindak dengan menjunjung tinggi kehormatan, martabat dan nilai luhur profesi.', value: 'W.1.2.2' },
        { label: 'W.1.2.3. - Melakukan pekerjaan, hanya dalam batasan kompetensinya.', value: 'W.1.2.3' },
        { label: 'W.1.2.4. - Mengembangkan nama baik berdasarkan prestasi dan tidak bersaing secara curang.', value: 'W.1.2.4' },
        { label: 'W.1.2.5. - Menerapkan kemampuan profesionalnya untuk kepentingan pemberi kerja keinsinyuran secara penuh amanah.', value: 'W.1.2.5' },
        { label: 'W.1.2.6. - Memberikan keterangan, pendapat atau pernyataan secara obyektif berdasarkan  kebenaran dan dalam cakupan pengetahuannya.', value: 'W.1.2.6' },
        { label: 'W.1.2.7. - Melakukan pengembangan kemampuan profesional secara berkelanjutan.', value: 'W.1.2.7' },
        { label: 'W.1.2.8. - Secara aktif membantu dan mendorong rekan kerjanya untuk memajukan pengetahuan dan pengalaman mereka.', value: 'W.1.2.8' },
        // ... other sub-sections ...
        ],
    },
    {
        label:'W.1.3. - Memahami, menerapkan, serta mengembangkan wawasan dan kaidah-kaidah kelestarian lingkungan',
        value: 'W.1.3.',
        children: [
        { label: 'W.1.3.1. - Menyadari  bahwa saling ketergantungan dan keaneka-ragaman ekosistem adalah dasar bagi  kelangsungan hidup manusia.', value: 'W.1.3.1' },
        { label: 'W.1.3.2. - Menyadari keterbatasan daya dukung lingkungan hidup untuk menyerap perubahan yang dibuat manusia.', value: 'W.1.3.2' },
        { label: 'W.1.3.3. - Menggalakkan tindakan  keinsinyuran yang diperlukan untuk memperbaiki, mempertahankan dan memulihkan  lingkungan hidup.', value: 'W.1.3.3' },
        { label: 'W.1.3.4. - Menggalakkan  penggunaan  yang  bijaksana  atas  sumber-daya  tak  terbarukan  dengan  memperkecil  atau  mendaur-ulang  limbah  dan mengembangkan sumber-daya alternatif lain sejauh mungkin', value: 'W.1.3.4' },
        { label: 'W.1.3.5. - Berusaha  mencapai  tujuan pekerjaan keinsinyurannya dengan penggunaan bahan baku dan enerji secara hemat dan dengan menerapkan kaidah pengelolaan lingkungan berkelanjutan', value: 'W.1.3.5' },
        { label: 'W.1.3.6. - Memperhatikan keseluruhan dampak dari  siklus hidup produk dan proyek terhadap lingkungan hidup.', value: 'W.1.3.6' },
        { label: 'W.1.3.7. - Memperhitungkan pengaruh yang mungkin muncul dari tindakan keinsinyuran terhadap faktor budaya atau warisan sejarah.', value: 'W.1.3.7' },
        // ... other sub-sections ...
        ],
    },
    {
    label:'W.1.4. - Mengemban tanggungjawab profesional atas tindakan dan karyanya.',
    value: 'W.1.4.',
    children: [
        { label: 'W.1.4.1. - Memperhitungkan risiko dan tanggung-gugat (liabilities) profesional, dan sanggup bertanggungjawab untuk itu', value: 'W.1.4.1' },
        { label: 'W.1.4.2. - Menerapkan dengan tepat persyaratan kesehatan dan keselamatan kerja (K-3).', value: 'W.1.4.2' },
        { label: 'W.1.4.3. - Menyelidiki kebutuhan keselamatan masyarakat dan bertindak untuk memecahkan masalah keselamatan yang mungkin timbul.', value: 'W.1.4.3' },
        { label: 'W.1.4.4. - Mengambil tindakan pencegahan yang tepat dalam menangani pekerjaan  yang berbahaya.', value: 'W.1.4.4' },
        { label: 'W.1.4.5. - Memperhatikan kaidah-kaidah pencegahan dan penanganan  bencana alam serta pemulihan akibatnya.', value: 'W.1.4.5' },
        // ... other sub-sections ...
        ],
    },
    //DONE CROSS CHECK
    {
    label:'W.2.1. - Melaksanakan pekerjaan yang bersifat kecendekiaan dan beragam',
    value: 'W.2.1.',
    children: [
        { label: 'W.2.1.1. - Menggunakan gagasannya sendiri dalam mensintesakan pemecahan yang memuaskan atas masalah keinsinyuran.', value: 'W.2.1.1' },
        { label: 'W.2.1.2. - Menggunakan kearifan yang profesional dalam membuat keputusan keinsinyuran.', value: 'W.2.1.2' },
        { label: 'W.2.1.3. - Melakukan pekerjaan keinsinyuran secara kreatif dan inovatif.', value: 'W.2.1.3' },
        { label: 'W.2.1.4. - Mengenali dan menanggulangi masalah keinsinyuran.', value: 'W.2.1.4' },
        { label: 'W.2.1.5. - Memperluas pengetahuan dalam kejuruan  atau bidang keahlian yang terkait dan memupuk kerjasama antar kejuruan  pada  waktu  bekerja dalam lingkungan aneka-kejuruan', value: 'W.2.1.5' },
        { label: 'W.2.1.6. - Menyelidiki kebutuhan dan memanfaatkan peluang yang khas terdapat dalam sesuatu bidang pekerjaan atau bidang kejuruan.', value: 'W.2.1.6' },
        // ... other sub-sections ...
    ],
    },
    {
    label:'W.2.2. - Menguasai, memelihara, mengembangkan dan memutakhir-kan keahlian dalam bidang pekerjaan dan kejuruannya',
    value: 'W.2.2.',
    children: [
        { label: 'W.2.2.1. - Menyadari keterbatasan kepakaran dan pengetahuan dirinya dan menggunakan seluruh kemampuan untuk mengenali kekurangan diri, menambah pengetahuan dan mengupayakan bantuan dari pakar yang tepat.', value: 'W.2.2.1' },
        { label: 'W.2.2.2. - Menggunakan kemampuan untuk mencari informasi sehingga dapat mengikuti perkembangan teknologi atau kemajuan lainnya.', value: 'W.2.2.2' },
        { label: 'W.2.2.3. - Memperluas dasar pengetahuan dengan membaca majalah profesional, mengikuti seminar profesional dan menjalin kerjasama antar profesional.', value: 'W.2.2.3' },
        { label: 'W.2.2.4. - Memperdalam dasar pengetahuan secara sistematik dengan melakukan penelitian dan percobaan untuk menyelesaikan masalah keinsinyuran yang khas.', value: 'W.2.2.4' },
        { label: 'W.2.2.5. - Memanfaatkan setiap pengalaman pekerjaan untuk mengembangkan keprofesionalannya.', value: 'W.2.2.5' },
        { label: 'W.2.2.6. - Melakukan pencatatan mengenai kegiatan pengembangan keprofesionalannya.', value: 'W.2.2.6' },
        // ... other sub-sections ...
    ],
    },
    {
    label:'W.2.3. - Memahami dan menerapkan metoda-metoda perekayasaan',
    value: 'W.2.3.',
    children: [
        { label: 'W.2.3.1. - Menemu-kenali (mengidentifikasi) berbagai penerapan kerekayasaan tepat-guna.', value: 'W.2.3.1' },
        { label: 'W.2.3.2. - Mengajukan konsep untuk melaksanakan penerapan kerekayasaan tepat-guna yang telah terpilih.', value: 'W.2.3.2' },
        { label: 'W.2.3.3. - Merinci penerapan kerekayasaan tepat-guna yang dipilih.', value: 'W.2.3.3' },
        { label: 'W.2.3.4. - Mengendalikan kemutakhiran dokumentasi hasil-hasil penerapannya.', value: 'W.2.3.4' },
        { label: 'W.2.3.5. - Mengkaji persyaratan bagi diperolehnya persetujuan pemberi tugas dan bagi pemenuhan kebutuhan di masa depan.', value: 'W.2.3.5' },
        // ... other sub-sections ...
    ],
    },
    {
    label:'W.2.4. - Memahami dan menerapkan kaidah-kaidah penjaminan mutu',
    value: 'W.2.4.',
    children: [
        { label: 'W.2.4.1. - Menerapkan sistem mutu.', value: 'W.2.4.1' },
        { label: 'W.2.4.2. - Mendorong diterimanya kaidah-kaidah penjaminan mutu oleh rekan sekerja dan anak-buah.', value: 'W.2.4.2' },
        { label: 'W.2.4.3. - Melaksanakan setiap pekerjaan sesuai dengan bakuan mutu yang tepat.', value: 'W.2.4.3' },
        { label: 'W.2.4.4. - Menerapkan tatacara kendali mutu dan penjaminan mutu.', value: 'W.2.4.4' },
        // ... other sub-sections ...
    ],
    },
    {
    label:'W.2.5. - Memilih dan menerapkan penggunaan perangkat perekayasaan dan teknologi yang tepat-guna',
    value: 'W.2.5.',
    children: [
        { label: 'W.2.5.1. - Memilih dan menggunakan analisis matematik, ilmu keinsinyuran, simulasi komputer atau teknik pemodelan lainnya.', value: 'W.2.5.1' },
        { label: 'W.2.5.2. - Memilih dan memanfaatkan penerapan sistem komputer.', value: 'W.2.5.2' },
        { label: 'W.2.5.3. - Mengarahkan dan melaksanakan tugas-tugas pemrograman dan penggunaan perangkat lunak.', value: 'W.2.5.3' },
        { label: 'W.2.5.4. - Memilih dan menggunakan alat bantu teknologi dan memantau kinerjanya.', value: 'W.2.5.4' },
        // ... other sub-sections ...
    ],
    },
    {
    label:'W.2.6. - Melaksanakan uji-coba, pengukuran dan kaji-nilai (evaluasi)',
    value: 'W.2.6.',
    children: [
        { label: 'W.2.6.1. - Merumuskan tujuan uji-coba.', value: 'W.2.6.1' },
        { label: 'W.2.6.2. - Menyusun tatacara dan jadwal uji-coba.', value: 'W.2.6.2' },
        { label: 'W.2.6.3. - Mengembangkan tatacara dan alat-alat pengukuran.', value: 'W.2.6.3' },
        { label: 'W.2.6.4. - Melaksanakan uji-coba dan pengukuran untuk kerja keinsinyuran yang kritis.', value: 'W.2.6.4' },
        { label: 'W.2.6.5. - Mengawasi uji-coba dan pengukuran untuk kerja yang tidak kritis.', value: 'W.2.6.5' },
        { label: 'W.2.6.6. - Mengkaji-nilai hasil uji-coba dan pengukuran.', value: 'W.2.6.6' },
        // ... other sub-sections ...
    ],
    },
    //DONE CROSS CHECK
    {
    label:'W.3.1. - Menjelaskan dan merumuskan kebutuhan perencanaan dan/atau perancangan',
    value: 'W.3.1.',
    children: [
        { label: 'W.3.1.1. - Merundingkan spesifikasi awal atau pedoman rancangan (design brief) ditinjau dari keinginan pemberi tugas maupun keterbatasan kerekayasaan.', value: 'W.3.1.1' },
        { label: 'W.3.1.2. - Melakukan analisis atas kebutuhan rancangan fungsional.', value: 'W.3.1.2' },
        { label: 'W.3.1.3. - Memenuhi parameter perancangan seperti kinerja, keandalan, kemudahan pemeliharaan dan ergonomik.', value: 'W.3.1.3' },
        { label: 'W.3.1.4. - Menentukan dampak atas rancangan yang di akibatkan oleh faktor-faktor produksi, konstruksi, pemasangan, uji-pakai, implikasi siklus hidup, dukungan logistik dan ketrampilan pemakai.', value: 'W.3.1.4' },
        { label: 'W.3.1.5. - Menentukan kendala yang mungkin ada, seperti tanggungjawab perdata atas produk, pengaruh lingkup fisik atas bagian yang dirancang, atau pengaruh bagian tersebut terhadap lingkungan, dan kemudian mengambil langkah tindak-lanjut yang tepat.', value: 'W.3.1.5' },
        { label: 'W.3.1.6. - Menggunakan bakuan dan spesifikasi perancangan keinsinyuran dan menyusun spesifikasi ke-fungsi-an untuk rancangannya.', value: 'W.3.1.6' },
        // ... other sub-sections ...
    ],
    },
    {
    label:'W.3.2. - Membuat usulan  untuk memenuhi kebutuhan perencanaan dan /atau perancangan',
    value: 'W.3.2.',
    children: [
        { label: 'W.3.2.1. - Menggunakan kreatifitas dan inisiatifnya dalam menyelidiki, menganalisis dan menyusun konsep-konsep bagi memenuhi tujuan rancangan.', value: 'W.3.2.1' },
        { label: 'W.3.2.2. - Menganalisis konsep-konsep yang berkemungkinan menjadi rancangan akhir untuk mengkaji dampak faktor-faktor seperti kinerja, keandalan dan kemudahan pemeliharaan.', value: 'W.3.2.2' },
        { label: 'W.3.2.3. - Menemu-kenali  masalah yang mungkin timbul dan merundingkan kemungkinan  perubahan atau penyesuaian atas pedoman rancangan.', value: 'W.3.2.3' },
        { label: 'W.3.2.4. - Melakukan analisis biaya-manfaat dan risiko, studi kelayakan dan pembiayaan siklus hidup untuk menghasilkan suatu rancangan yang layak dilaksanakan.', value: 'W.3.2.4' },
        { label: 'W.3.2.5. - Menyiapkan dan merekomendasikan pelaksanaan suatu usulan yang memenuhi persyaratan pemberi tugas atau pelaksana manufaktur.', value: 'W.3.2.5' },
        // ... other sub-sections ...
    ],
    },
    {
    label:'W.3.3. - Melaksanakan pekerjaan perencanaan dan/atau perancangan sesuai usulan yang telah dipilih',
    value: 'W.3.3.',
    children: [
        { label: 'W.3.3.1. - Melaksanakan atau mengatur pelaksanaan pekerjaan perancangan yang cukup berbobot.', value: 'W.3.3.1' },
        { label: 'W.3.3.2. - Melaksanakan atau mengatur pelaksanaan analisis  untuk memilih komponen dan bahan material sesuai rancangan.', value: 'W.3.3.2' },
        { label: 'W.3.3.3. - Menyiapkan dan memeriksa spesifikasi teknis sesuai rancangan.', value: 'W.3.3.3' },
        // ... other sub-sections ...
    ],
    },
    {
    label:'W.3.4. - Melaksanakan kaji-nilai atas hasil rancangan',
    value: 'W.3.4.',
    children: [
        { label: 'W.3.4.1. -  Memaparkan rancangan secara langsung atau dengan model komputer.', value: 'W.3.4.1' },
        { label: 'W.3.4.2. -  Menyiapkan jadwal pengujian rancangan untuk uji kinerja dan lingkup fisik.', value: 'W.3.4.2' },
        { label: 'W.3.4.3. - Mengawasi pengujian rancangan, analisis hasil pengujian dan mengajukan saran perbaikan.', value: 'W.3.4.3' },
        { label: 'W.3.4.4. - Mengkaji dampak rancangan pada kondisi sekeliling.', value: 'W.3.4.4' },
        { label: 'W.3.4.5. -  Memaparkan hasil pengkajian dampak rancangan pada pihak-pihak terkait.', value: 'W.3.4.5' },
        // ... other sub-sections ...
    ],
    },
    {
    label:'W.3.5. - Menyiapkan dokumen penunjang',
    value: 'W.3.5.',
    children: [
        { label: 'W.3.5.1. - Menyiapkan dokumen penunjang rancangan untuk produksi atau konstruksi, pemasangan, operasi, pemeliharaan dan pelatihan.', value: 'W.3.5.1' },
        { label: 'W.3.5.2. - Menyunting dan memeriksa dokumen pendukung.', value: 'W.3.5.2' },
        // ... other sub-sections ...
    ],
    },
    {
    label:'W.3.6. - Menjaga keutuhan tata identifikasi rancangan sepanjang proses pekerjaan',
    value: 'W.3.6.',
    children: [
        { label: 'W.3.6.1. - Menerapkan tata identifikasi rancangan dengan cara-cara dokumentasi dan pencatatan yang tepat.', value: 'W.3.6.1' },
        { label: 'W.3.6.2. - Menetapkan tatacara pengendalian dokumentasi dan catatan dalam melakukan perubahan rancangan.', value: 'W.3.6.2' },
        { label: 'W.3.6.3. - Memastikan bahwa seluruh tata identifikasi rancangan tetap terjaga sebagai uraian yang benar sepanjang proses perancangan dan konstruksi atau manufaktur.', value: 'W.3.6.3' },
        { label: 'W.3.6.4. - Mengawasi pelaksanaan penggambaran-ulang rancangan, sesuai dengan kenyataan dalam pelaksanaan konstruksi (as-built) atau pelaksanaan produksi (as-manufactured).', value: 'W.3.6.4' },
        // ... other sub-sections ...
    ],
    },
    {
    label:'W.4.1. - Menerapkan kaidah-kaidah manajemen atas diri sendiri',
    value: 'W.4.1.',
    children: [
        { label: 'W.4.1.1. - Melakukan pengembangan diri dalam kemampuan di bidang manajemen, termasuk hukum, ekonomi dan sosial.', value: 'W.4.1.1' },
        { label: 'W.4.1.2. - Menentukan sasaran bagi diri sendiri dalam  mencapai tujuan kerja.', value: 'W.4.1.2' },
        { label: 'W.4.1.3. - Menerapkan pengelolaan waktu dan tatakerja yang efektif.', value: 'W.4.1.3' },
        { label: 'W.4.1.4. - Melakukan pengembangan diri dalam kepemimpinan dan kerjasama kelompok', value: 'W.4.1.4' },
        { label: 'W.4.1.5. - Melakukan pengembangan diri dalam cara berpikir yang berwawasan luas, analitis dan kreatif', value: 'W.4.1.5' },

        // ... other sub-sections ...
    ],
    },

    {
    label:'W.4.2. - Memahami dan menerapkan kaidah-kaidah pengelolaan pekerjaan keinsinyuran',
    value: 'W.4.2.',
    children: [
        { label: 'W.4.2.1. - Melakukan tugas perencanaan dan pemantauan proyek.', value: 'W.4.2.1' },
        { label: 'W.4.2.2. - Mengembangkan uraian  rincian pekerjaan yang terstruktur.', value: 'W.4.2.2' },
        { label: 'W.4.2.3. - Menyiapkan jadwal pekerjaan dan jalur kritisnya.', value: 'W.4.2.3' },
        { label: 'W.4.2.4. - Memantau kemajuan, menyelidiki penyimpangan dari jadwal dan memulai tindakan perbaikan.', value: 'W.4.2.4' },

        // ... other sub-sections ...
    ],
    },

    {
    label:'W.4.3. - Memahami dan menerapkan kaidah-kaidah kepemimpinan dalam pekerjaan keinsinyuran',
    value: 'W.4.3.',
    children: [
        { label: 'W.4.3.1. - Melakukan penilaian kinerja bawahan.', value: 'W.4.3.1' },
        { label: 'W.4.3.2. - Mematuhi prinsip keadilan dan kebersamaan.', value: 'W.4.3.2' },
        { label: 'W.4.3.3. - Menggalang lingkungan hubungan kerja yang efektif.', value: 'W.4.3.3' },
        { label: 'W.4.3.4. - Mengorganisasikan kelompok-kelompok kerja.', value: 'W.4.3.4' },
        { label: 'W.4.3.5. - Memimpin insinyur muda, teknisi atau tenaga bawahan lainnya.', value: 'W.4.3.5' },
        { label: 'W.4.3.6. - Menghargai ataupun menghukum sesuai dengan kinerja.', value: 'W.4.3.6' },
        { label: 'W.4.3.7. - Memantau tugas-tugas untuk menjamin bahwa kegiatan dilaksanakan sesuai rencana dan mengambil tindakan perbaikan yang perlu.', value: 'W.4.3.7' },

        // ... other sub-sections ...
    ],
    },

    {
    label:'W.4.4. - Berkomunikasi dengan efektif',
    value: 'W.4.4.',
    children: [
        { label: 'W.4.4.1. - Berkomunikasi dengan baik, benar dan lancar untuk menyampaikan pendapat secara  lisan  maupun tertulis dalam bahasa Indonesia.', value: 'W.4.4.1' },
        { label: 'W.4.4.2. - Menyiapkan, menafsirkan dan memaparkan informasi.', value: 'W.4.4.2' },
        { label: 'W.4.4.3. - Berhubungan dengan rekan dan pakar di dalam dan di luar kalangannya.', value: 'W.4.4.3' },
        { label: 'W.4.4.4. - Mengartikan dengan benar instruksi keinsinyuran yang diterima.', value: 'W.4.4.4' },
        { label: 'W.4.4.5. - Memberikan instruksi yang jelas, cermat dan tepat  kepada bawahan dalam suatu bahasa asing yang lazim dipergunakan di bidang keinsinyuran.', value: 'W.4.4.5' },
        { label: 'W.4.4.6. - Memilih media  dan cara  komunikasi yang tepat guna.', value: 'W.4.4.6' },

        // ... other sub-sections ...
    ],
    },
    {
    label:'W.4.5. -  Mengelola informasi keinsinyuran',
    value: 'W.4.5.',
    children: [
        { label: 'W.4.5.1. - Menyiapkan dan menyajikan ceramah (lectures) pada suatu tingkat profesional.', value: 'W.4.5.1' },
        { label: 'W.4.5.2. - Menyiapkan tulisan untuk diterbitkan dalam berkala  keinsinyuran.', value: 'W.4.5.2' },
        { label: 'W.4.5.3. - Menyampaikan informasi keinsinyuran secara efektif kepada kalangan keinsinyuran dan kalangan lainnya.', value: 'W.4.5.3' },
        { label: 'W.4.5.4. - Meneruskan informasi keinsinyuran secara efektif kepada atasan (insinyur maupun bukan).', value: 'W.4.5.4' },
        { label: 'W.4.5.5. - Melakukan perundingan, penyelesaian sengketa, pembinaan, pertukar-pikiran serta menyatakan pendapat dan sikap.', value: 'W.4.5.5' },
        { label: 'W.4.5.6. - Menyiapkan laporan keinsinyuran professional, seperti laporan kemajuan pekerjaan, secara baik dan benar.', value: 'W.4.5.6' },
        { label: 'W.4.5.7. - Menyiapkan dokumen seperti spesifikasi, bakuan dan paparan  grafis.', value: 'W.4.5.7' },
        { label: 'W.4.5.8. - Menyiapkan dokumen yang lebih kompleks seperti analisis dampak lingkungan atau kontrak kerja.', value: 'W.4.5.8' },
        { label: 'W.4.5.9. - Menafsirkan dengan benar gambar teknik serta grafik, spesifikasi, bakuan, peraturan, pedoman praktek dan analisis dampak lingkungan.', value: 'W.4.5.9' },

        // ... other sub-sections ...
    ],
    },

    {
        label:'P.5.1. -  Mengembangkan program pendidikan dan/atau pelatihan keinsinyuran',
        value: 'P.5.1.',
        children: [
            { label: 'P.5.1.1. - Menemu-kenali kebutuhan pengajaran dan atau pelatihan.', value: 'P.5.1.1' },
            { label: 'P.5.1.2. - Merencanakan pengajaran untuk pendidikan tingkat lanjutan atau rencana pelatihan keinsinyuran  untuk suatu lembaga  pelatihan.', value: 'P.5.1.2' },
            { label: 'P.5.1.3. - Mengembangkan program pelatihan kerja praktek.', value: 'P.5.1.3' },
            { label: 'P.5.1.4. - Mengembangkan kurikulum, silabus atau latihan keinsinyuran.', value: 'P.5.1.4' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.5.2. -  Melaksanakan program pendidikan dan/atau pelatihan keinsinyuran.',
        value: 'P.5.2.',
        children: [
            { label: 'P.5.2.1. - Mengembangkan proses belajar-mengajar  untuk pendidikan dan pelatihan keinsinyuran.', value: 'P.5.2.1' },
            { label: 'P.5.2.2. - Mengembangkan rencana pengembangan pengalaman kerja.', value: 'P.5.2.2' },
            { label: 'P.5.2.3. - Mengelola program dalam mana siswa atau peserta latihan memperoleh teori keinsinyuran dan pengalaman praktis.', value: 'P.5.2.3' },
            { label: 'P.5.2.4. - Melaksanakan secara efektif kegiatan pengajaran, pengembangan, dan belajar dalam bentuk yang paling tepat untuk sesuatu keadaan.', value: 'P.5.2.4' },
            { label: 'P.5.2.5. - Menggunakan secara efektif teknologi pendidikan dan pelatihan untuk mendukung pengajaran, pengembangan dan proses belajar dalam program pendidikan atau pelatihan keinsinyuran.', value: 'P.5.2.5' },
            { label: 'P.5.2.6. - Mengembangkan kandungan khas suatu program pelatihan keinsinyuran melalui penelitian, pengkajian, percobaan dan sebagainya.', value: 'P.5.2.6' },
            { label: 'P.5.2.7. - Menguji peserta pendidikan dan latihan keinsinyuran secara formatif dan sumatif.', value: 'P.5.2.7' },
            { label: 'P.5.2.8. - Menilai kedaya-gunaan program pendidikan dan atau pelatihan keinsinyuran.', value: 'P.5.2.8' },
            { label: 'P.5.2.9. - Mengkaji-ulang program pendidikan dan atau pelatihan keinsinyuran.', value: 'P.5.2.9' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.6.1. - Melakukan penelitian',
        value: 'P.6.1.',
        children: [
            { label: 'P.6.1.1. - Mengidentifikasi kebutuhan penelitian.', value: 'P.6.1.1' },
            { label: 'P.6.1.2. - Melakukan kajian pustaka.', value: 'P.6.1.2' },
            { label: 'P.6.1.3. - Melakukan penelitian dasar dan atau terapan.', value: 'P.6.1.3' },
            { label: 'P.6.1.4. - Mencari pengetahuan baru.', value: 'P.6.1.4' },
            { label: 'P.6.1.5. - Menemu-kenali dan menyampaikan hasil penelitian.', value: 'P.6.1.5' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.6.2. -  Merumuskan konsep pengembangan hasil penelitian',
        value: 'P.6.2.',
        children: [
            { label: 'P.6.2.1. - Menemu-kenali kebutuhan pengembangan.', value: 'P.6.2.1' },
            { label: 'P.6.2.2. - Memeriksa konsep-konsep yang mempunyai kemungkinan untuk dilaksanakan.', value: 'P.6.2.2' },
            { label: 'P.6.2.3. - Memilih konsep yang akan dikembangkan lebih lanjut.', value: 'P.6.2.3' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.6.3. - Menemu-kenali dan mengusahakan sumber daya untuk pengembangan hasil penelitian',
        value: 'P.6.3.',
        children: [
            { label: 'P.6.3.1. - Merumuskan kebutuhan akhir pemakai.', value: 'P.6.3.1' },
            { label: 'P.6.3.2. - Menyiapkan usulan untuk mencari sumber daya bagi pengembangan.', value: 'P.6.3.2' },
            { label: 'P.6.3.3. - Menyiapkan perkiraan biaya untuk pengembangan, perancangan, produksi atau konstruksi, dan operasi.', value: 'P.6.3.3' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.6.4. - Melakukan kaji pasar  untuk produk  hasil penelitian dan pengembangan',
        value: 'P.6.4.',
        children: [
            { label: 'P.6.4.1. - Merumuskan ciri-ciri  produk yang diinginkan pasar.', value: 'P.6.4.1' },
            { label: 'P.6.4.2. - Mengumpulkan informasi dan membuat rekomendasi untuk menentukan harga produk.', value: 'P.6.4.2' },
            { label: 'P.6.4.3. - Membuat rekomendasi mengenai distribusi produk.', value: 'P.6.4.3' },
            { label: 'P.6.4.4. - Membuat rekomendasi untuk mempromosikan produk.', value: 'P.6.4.4' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.6.5. - Mengkomersialkan hasil penelitian dan pengembangan',
        value: 'P.6.5.',
        children: [
            { label: 'P.6.5.1. - Melakukan kaji-nilai  ekonomis atas produk hasil penelitian dan pengembangan.', value: 'P.6.5.1' },
            { label: 'P.6.5.2. - Memilih mekanisme yang cocok untuk memasarkan produk hasil penelitian dan pengembangan.', value: 'P.6.5.2' },
            { label: 'P.6.5.3. - Menyiapkan model peragaan untuk membuktikan kelayakan teknis dan komersial.', value: 'P.6.5.3' },
            { label: 'P.6.5.4. - Mengembangkan rencana proyek percontohan untuk membuktikan kelayakan teknis dan komersial.', value: 'P.6.5.4' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.7.1. - Melaksanakan tugas konsultansi  perekayasaan keinsinyuran',
        value: 'P.7.1.',
        children: [
            { label: 'P.7.1.1. - Memberikan nasihat/konsultansi kepada pemimpin proyek.', value: 'P.7.1.1' },
            { label: 'P.7.1.2. - Menyusun studi kelayakan dan rencana dasar (master plan).', value: 'P.7.1.2' },
            { label: 'P.7.1.3. - Menyiapkan pedoman perancangan (design guidelines) perekayasaan  berdasarkan uraian kebutuhan pemberi tugas.', value: 'P.7.1.3' },
            { label: 'P.7.1.4. - Menyiapkan rancangan pendahuluan, pengembangannya dan rancangan terinci (detailed design) perekayasaan, agar pemilik proyek dapat melakukan pelelangan.', value: 'P.7.1.4' },
            { label: 'P.7.1.5. - Melakukan tugas pemantauan kemajuan proyek, menyelidiki penyimpangan dari jadwal dan memulai tindakan perbaikan  yang perlu.', value: 'P.7.1.5' },
            { label: 'P.7.1.6. - Mengembangkan uraian  rincian pekerjaan yang terstruktur serta menyiapkan jalur kritis (critical path) pada jadwal pelaksanaan proyek.', value: 'P.7.1.6' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.7.2. - Menyiapkan, melaksanakan dan memantau pelelangan dan kontrak untuk pekerjaan konstruksi/instalasi',
        value: 'P.7.2.',
        children: [
            { label: 'P.7.2.1. - Menyiapkan jadwal pelelangan.', value: 'P.7.2.1' },
            { label: 'P.7.2.2. - Mengkaji-nilai jadwal pelelangan.', value: 'P.7.2.2' },
            { label: 'P.7.2.3. - Menyiapkan pelelangan.', value: 'P.7.2.3' },
            { label: 'P.7.2.4. - Mengkaji-nilai penawaran.', value: 'P.7.2.4' },
            { label: 'P.7.2.5. - Menyiapkan kontrak.', value: 'P.7.2.5' },
            { label: 'P.7.2.6. - Mengusahakan pemenuhan terhadap persyaratan kontrak.', value: 'P.7.2.6' },
            { label: 'P.7.2.7. - Memantau kemajuan pekerjaan dan menyelidiki penyimpangan terhadap persyaratan kontrak.', value: 'P.7.2.7' },
            { label: 'P.7.2.8. - Memantau kinerja kontraktor dan menyelidiki penyimpangan terhadap persyaratan kontrak.', value: 'P.7.2.8' },
            { label: 'P.7.2.9. - Menyelidiki kinerja kontraktor untuk merekomendasi berita-acara pembayaran untuk disetujui.', value: 'P.7.2.9' },
            { label: 'P.7.2.10. - Menyiapkan laporan kemajuan pekerjaan untuk pemberi tugas.', value: 'P.7.2.10' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.7.3. - Melaksanakan pekerjaan konstruksi/instalasi',
        value: 'P.7.3.',
        children: [
            { label: 'P.7.3.1. - Menyiapkan spesifikasi dan jadwal pekerjaan  konstruksi/instalasi.', value: 'P.7.3.1' },
            { label: 'P.7.3.2. - Menyusun pentahapan pekerjaan konstruksi/instalasi.', value: 'P.7.3.2' },
            { label: 'P.7.3.3. - Menyusun spesifikasi sarana dan jasa-jasa  yang dibutuhkan untuk pekerjaan konstruksi/instalasi.', value: 'P.7.3.3' },
            { label: 'P.7.3.4. - Mengawasi pekerjaan konstruksi/instalasi.', value: 'P.7.3.4' },
            { label: 'P.7.3.5. - Memastikan bahwa pekerjaan konstruksi/instalasi telah selesai dengan memuaskan untuk di-berita-acara-kan.', value: 'P.7.3.5' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.7.4. - Melaksanakan tugas dan kegiatan pengelolaan kerja lapangan',
        value: 'P.7.4.',
        children: [
            { label: 'P.7.4.1. - Melaksanakan tugas pengelolaan kerja lapangan untuk pekerjaan konstruksi/instalasi.', value: 'P.7.4.1' },
            { label: 'P.7.4.2. - Melakukan tugas pemesanan bahan material, peralatan dan jasa pendukungnya.', value: 'P.7.4.2' },
            { label: 'P.7.4.3. - Mengembangkan tatalaksana kerja.', value: 'P.7.4.3' },
            { label: 'P.7.4.4. - Mengawasi penanganan bahan material di lapangan.', value: 'P.7.4.4' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.7.5. - Melaksanakan uji kinerja (commissioning)',
        value: 'P.7.5.',
        children: [
            { label: 'P.7.5.1. - Melaksanakan tugas pengembangan program penerimaan hasil pekerjaan.', value: 'P.7.5.1' },
            { label: 'P.7.5.2. - Melaksanakan program commissioning dan tugas pengawasannya.', value: 'P.7.5.2' },
            { label: 'P.7.5.3. - Memastikan bahwa pekerjaan commissioning telah selesai dengan memuaskan untuk di-berita-acara-kan.', value: 'P.7.5.3' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.8.1. - ',
        value: 'P.8.1.',
        children: [
            { label: 'P.8.1.1. - Menganalisis tata-letak pabrik atau sistem dan aliran kerja dan mengambil langkah-langkah untuk mengoptimasikan fleksibilitas dan efisiensi.', value: 'P.8.1.1' },
            { label: 'P.8.1.2. - Menerapkan kaidah-kaidah  perencanaan manajemen.', value: 'P.8.1.2' },
            { label: 'P.8.1.3. - Memantau operasi proses dan mengubahnya di mana perlu  untuk memperbaiki keluaran (output).', value: 'P.8.1.3' },
            { label: 'P.8.1.4. - Menggunakan berbagai cara analisis seperti analisis lintasan kritis, garis keseimbangan dan programa  linier.', value: 'P.8.1.4' },
            { label: 'P.8.1.5. - Mengatur hubungan kerja antara  bagian perencanaan produksi dengan tim perancang produk.', value: 'P.8.1.5' },
            { label: 'P.8.1.6. - Membangun barisan kerja untuk pekerjaan manufaktur.', value: 'P.8.1.6' },
            { label: 'P.8.1.7. - Melakukan tugas analisis biaya terhadap proses manufaktur.', value: 'P.8.1.7' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.8.2. -  Menjaga dan mengawasi program penjaminan mutu',
        value: 'P.8.2.',
        children: [
            { label: 'P.8.2.1. - Memantau dan mengatur  kinerja proses produksi/manufaktur.', value: 'P.8.2.1' },
            { label: 'P.8.2.2. - Mencari dan melaksanakan cara-cara baru  untuk perbaikan terus-menerus atas proses manufaktur.', value: 'P.8.2.2' },
            { label: 'P.8.2.3. - Menerapkan kaidah  pengendalian mutu.', value: 'P.8.2.3' },
            { label: 'P.8.2.4. - Memulai langkah perbaikan  untuk menurunkan tingkat kegagalan produk atau kemacetan sistem produksi.', value: 'P.8.2.4' },
            { label: 'P.8.2.5. - Mengembangkan tatalaksana kerja yang khas.', value: 'P.8.2.5' },
            { label: 'P.8.2.6. - Menilai kinerja dan kehandalan pemasok.', value: 'P.8.2.6' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.8.3. - Melaksanakan tugas pengoperasian, pengendalian dan optimasi proses',
        value: 'P.8.3.',
        children: [
            { label: 'P.8.3.1. - Memperhalus dan mengoptimasikan pengendalian operasi dan proses.', value: 'P.8.3.1' },
            { label: 'P.8.3.2. - Melaksanakan tugas operasi dan pengendalian proses.', value: 'P.8.3.2' },
            { label: 'P.8.3.3. - Melaksanakan tugas  analisis nilai kerja.', value: 'P.8.3.3' },
            { label: 'P.8.3.4. - Melaksanakan tugas pemeriksaan dan penyelesaian masalah-masalah  manufaktur atau proses.', value: 'P.8.3.4' },
            { label: 'P.8.3.5. - Mengembangkan dan melaksanakan proses produksi manufaktur yang fleksibel.', value: 'P.8.3.5' },
            { label: 'P.8.3.6. - Mengembangkan dan melaksanakan tatalaksana ergonomi  dan keselamatan pabrik.', value: 'P.8.3.6' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.8.4. -  Melaksanakan tugas pengelolaan persediaan',
        value: 'P.8.4.',
        children: [
            { label: 'P.8.4.1. - Mengembangkan tatacara penyediaan dan penanganan  bahan baku.', value: 'P.8.4.1' },
            { label: 'P.8.4.2. - Menyusun spesifikasi, mengadakan/membeli dan mengalokasikan bahan baku.', value: 'P.8.4.2' },
            { label: 'P.8.4.3. - Melakukan program optimasi pemakaian bahan baku.', value: 'P.8.4.3' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.8.5. - Mengukur kinerja produksi',
        value: 'P.8.5.',
        children: [
            { label: 'P.8.5.1. - Mengukur keluaran proses manufaktur dari segi jumlah, mutu dan harga untuk menilai apakah sasaran produksi telah tercapai.', value: 'P.8.5.1' },
            { label: 'P.8.5.2. - Menganalisis produktifitas untuk menentukan di bagian mana dapat dilakukan perbaikan.', value: 'P.8.5.2' },
            { label: 'P.8.5.3. - Menganalisis pemakaian bahan baku dan bahan pakai-habis (consumables) untuk meningkatkan  efisiensi dan memperbaiki pelayanan sarana pendukung.', value: 'P.8.5.3' },
            { label: 'P.8.5.4. - Menganalisis tatacara produksi secara umum untuk meningkatkan  efisiensi.', value: 'P.8.5.4' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.9.1. - Merumuskan kebutuhan dan penggunaan  bahan material atau komponen khusus',
        value: 'P.9.1.',
        children: [
            { label: 'P.9.1.1. - Menemu-kenali ciri-ciri utama suatu kelompok bahan material atau komponen untuk penggunaan tertentu,  dan kemungkinan bahan penggantinya.', value: 'P.9.1.1' },
            { label: 'P.9.1.2. - Mengkaji penggunaan yang tepat bagi  bahan material atau komponen untuk penggunaan tertentu.', value: 'P.9.1.2' },
            { label: 'P.9.1.3. - Membentuk hubungan dengan kejuruan  lain untuk dapat memperoleh bantuan kepakaran.', value: 'P.9.1.3' },
            { label: 'P.9.1.4. - Mempelajari peluang untuk daur ulang.', value: 'P.9.1.4' },
            { label: 'P.9.1.5. - Mempelajari bahaya terhadap lingkungan atau bahaya lainnya dalam penggunaan atau pembuangan bahan material atau komponen sisa/berlebih.', value: 'P.9.1.5' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.9.2. - Menetapkan sumber bahan baku pengadaan bahan material atau komponen',
        value: 'P.9.2.',
        children: [
            { label: 'P.9.2.1. - Mencari lokasi sumber bahan baku yang sesuai.', value: 'P.9.2.1' },
            { label: 'P.9.2.2. - Memilih bahan atau komponen yang biaya pengadaannya terjangkau.', value: 'P.9.2.2' },
            // ... other sub-sections ...
        ],
    },
    {
        label:'P.9.3. - Mengawasi penyiapan atau pengadaan bahan material atau komponen',
        value: 'P.9.3.',
        children: [
            { label: 'P.9.3.1. - Menetapkan tatacara penyiapan bahan material.', value: 'P.9.3.1' },
            { label: 'P.9.3.2. - Menentukan interaksi antara berbagai bahan material atau komponen.', value: 'P.9.3.2' },
            { label: 'P.9.3.3. - Melakukan kegiatan pengendalian proses.', value: 'P.9.3.3' },
        ],
    },
    {
        label:'P.9.4. - Menilai sifat bahan material atau komponen',
        value: 'P.9.4.',
        children: [
            { label: 'P.9.4.1. - Menemu-kenali rona lingkungan operasi.', value: 'P.9.4.1' },
            { label: 'P.9.4.2. - Menemu-kenali persyaratan  pengujian bahan material atau komponen.', value: 'P.9.4.2' },
            { label: 'P.9.4.3. - Melakukan atau mengawasi, dan mengkaji-nilai hasil pengujian di lapangan dan di laboratorium.', value: 'P.9.4.3' },
            { label: 'P.9.4.4. - Memberikan pengarahan dalam pemeliharaan dan kalibrasi sarana pengujian.', value: 'P.9.4.4' },
            { label: 'P.9.4.5. - Menyiapkan, menyetujui dan mensahkan laporan pengujian.', value: 'P.9.4.5' },
            { label: 'P.9.4.6. - Merekomendasikan bahan material atau komponen untuk pemakaian-pemakaian yang khas.', value: 'P.9.4.6' },
        ],
    },
    {
        label:'P.9.5. - Memilih cara pemeliharaan mutu bahan material atau komponen',
        value: 'P.9.5.',
        children: [
            { label: 'P.9.5.1. - Menemu-kenali penyebab penurunan mutu seperti aus, korosi, kelelahan dan radiasi ultraviolet.', value: 'P.9.5.1' },
            { label: 'P.9.5.2. - Menggunakan teknik-teknik untuk mengurangi penurunan mutu dan mencegah kegagalan dini.', value: 'P.9.5.2' },
            { label: 'P.9.5.3. - Menggunakan teknik-teknik untuk melihat  gejala adanya kemungkinan  kegagalan.', value: 'P.9.5.3' },
            { label: 'P.9.5.4. - Memilih cara perlakuan (treatment) bahan material yang tepat, seperti perlakuan panas, perlakuan permukaan, dsb.', value: 'P.9.5.4' },
        ],
    },
    {
        label:'P.10.1. - Mengelola sumber-daya keinsinyuran',
        value: 'P.10.1.',
        children: [
            { label: 'P.10.1.1. - Menetapkan dan melaksanakan tujuan dan prioritas kerja.', value: 'P.10.1.1' },
            { label: 'P.10.1.2. - Merumuskan metoda pendekatan untuk pengelolaan sumber-daya.', value: 'P.10.1.2' },
            { label: 'P.10.1.3. - Melakukan analisis rincian tugas (work breakdown analysis) sehingga tersedia dasar bagi perhitungan kebutuhan  sumber-daya.', value: 'P.10.1.3' },
            { label: 'P.10.1.4. - Membuat perkiraan kebutuhan waktu, biaya, bahan dan sumber-daya lainnya untuk suatu pekerjaan.', value: 'P.10.1.4' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.10.2. - Mengelola sumber-daya manusia',
        value: 'P.10.2.',
        children: [
            { label: 'P.10.2.1. - Mematuhi ketentuan kesehatan dan keselamatan kerja.', value: 'P.10.2.1' },
            { label: 'P.10.2.2. - Menemu-kenali dan menentukan kebutuhan pelatihan bagi tenaga kerja teknis di tempat pekerjaan.', value: 'P.10.2.2' },
            { label: 'P.10.2.3. - Melaksanakan program pengembangan pengalaman kerja untuk bawahan, termasuk pelatihan-ulang, penyesuaian pada teknologi baru dan pengembangan ketrampilan.', value: 'P.10.2.3' },
            { label: 'P.10.2.4. - Mengkaji efektifitas program pelatihan di tempat kerja.', value: 'P.10.2.4' },
            { label: 'P.10.2.5. - Merumuskan kebutuhan pelatihan tenaga kerja non-teknis.', value: 'P.10.2.5' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.10.3. - Melaksanakan pengelolaan kewira-usahaan, keuangan, dan hukum/kontraktual',
        value: 'P.10.3.',
        children: [
            { label: 'P.10.3.1. - Melakukan tugas  kaji-nilai ekonomis atas pekerjaan yang dilaksanakan.', value: 'P.10.3.1' },
            { label: 'P.10.3.2. - Memahami dampak hukum dari tiap pekerjaan yang dilaksanakan.', value: 'P.10.3.2' },
            { label: 'P.10.3.3. - Memahami, menafsirkan dan menerapkan peraturan yang tepat.', value: 'P.10.3.3' },
            { label: 'P.10.3.4. - Menilai kebutuhan pemasaran dan memberikan saran untuk strategi pemasaran.', value: 'P.10.3.4' },
            { label: 'P.10.3.5. - Mengerjakan tugas pengelolaan  risiko.', value: 'P.10.3.5' },
            { label: 'P.10.3.6. - Memahami kebutuhan kewira-usahaan suatu perusahaan dan bertindak sesuai kebutuhan tersebut dalam hal biaya, waktu dan faktor-faktor lainnya.', value: 'P.10.3.6' },
            { label: 'P.10.3.7. - Mengkaji dan menyiapkan rencana usaha.', value: 'P.10.3.7' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.10.4. - Mengelola keterangan produk (product knowledge) untuk barang/jasa keinsinyuran',
        value: 'P.10.4.',
        children: [
            { label: 'P.10.4.1. - Menyiapkan dokumen, brosur, uraian teknis dan  spesifikasi mengenai produk barang/jasa keinsinyuran  untuk keperluan pemasaran.', value: 'P.10.4.1' },
            { label: 'P.10.4.2. - Menyiapkan dokumen, pedoman, buku panduan untuk pemakaian operasi, pemeliharaan,  penyetelan dan perbaikan atas produk barang/jasa oleh konsumen.', value: 'P.10.4.2' },
            { label: 'P.10.4.3. - Melakukan pengamatan atas kebutuhan pasar/pelanggan masa-depan terhadap  penyempurnaan dan menemu-kenali perubahan/pembaharuan yang perlu atas produk barang/jasa.', value: 'P.10.4.3' },
            { label: 'P.10.4.4. - Memantau dan mengikuti kinerja dan keandalan produk barang/peralatan dan jasa yang dipakai pelanggan dan melakukan perbaikan dan penyempurnaan untuk kepuasan pelanggan.', value: 'P.10.4.4' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.10.5. - Memahami dan menerapkan kaidah-kaidah pemasaran barang/jasa keinsinyuran',
        value: 'P.10.5.',
        children: [
            { label: 'P.10.5.1. - Menyiapkan dan melakukan kajian kebutuhan pasar akan barang/jasa keinsinyuran yang hendak dipasarkan.', value: 'P.10.5.1' },
            { label: 'P.10.5.2. - Menyiapkan strategi dan program pentahapan pemasaran untuk menarik minat pasar/pelanggan.', value: 'P.10.5.2' },
            { label: 'P.10.5.3. - Melakukan promosi dan paparan pengenalan produk barang/jasa keinsinyuran untuk meyakinkan pelanggan dan pasar.', value: 'P.10.5.3' },
            { label: 'P.10.5.4. - Menyiapkan usulan penawaran produk barang/jasa keinsinyuran secara mandiri atau bersama tim proposal, meliputi proposal teknis, komersial dan kontraktual.', value: 'P.10.5.4' },
            { label: 'P.10.5.5. - Melaksanakan klasifikasi, negosiasi dan memberikan saran solusi/aplikasi teknis, penjelasan batasan tanggungjawab masing-masing untuk meyakinkan pelanggan sampai terlaksananya transaksi/kontrak penjualan produk barang/jasa.', value: 'P.10.5.5' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.10.6. - Memahami dan menerapkan kaidah-kaidah pelayanan purna-jual',
        value: 'P.10.6.',
        children: [
            { label: 'P.10.6.1. - Merumuskan dan menjelaskan batas syarat tanggungjawab jaminan kinerja dan perbaikan kerusakan purna-jual (warranty dan guarantee fee).', value: 'P.10.6.1' },
            { label: 'P.10.6.2. - Melaksanakan pelayanan teknis purna-jual dan mengatasi masalah  teknis, sesuai tanggungjawab kontraktual.', value: 'P.10.6.2' },
            { label: 'P.10.6.3. - Melaksanakan pelatihan pengembangan keahlian tenaga pemakai (operator) dan pemeliharaan produk.', value: 'P.10.6.3' },
            { label: 'P.10.6.4. - Memelihara persediaan suku-cadang dan mengelola sumber daya untuk pelaksanaan pelayanan purna jual.', value: 'P.10.6.4' },
            { label: 'P.10.6.5. - Melakukan pemantauan ke pelanggan untuk meningkatkan kehandalan pemakaian produk dan kepuasan pelanggan.', value: 'P.10.6.5' },
            // ... other sub-sections ...
        ],
    },
    {
        label:'P.11.1. - Menyiapkan dan mengembangkan kebijakan umum keinsinyuran untuk mendorong sektor pembangunan',
        value: 'P.11.1.',
        children: [
            { label: 'P.11.1.1. - Menyiapkan dan mengembangkan kebijakan umum melalui pendekatan pengembangan wilayah.', value: 'P.11.1.1' },
            { label: 'P.11.1.2. - Menyiapkan dan mengembangkan kebijakan umum dengan mengacu pada kelestarian lingkungan.', value: 'P.11.1.2' },
            { label: 'P.11.1.3. - Menyiapkan dan mengembangkan kebijakan umum peningkatan kemampuan rancang-bangun dan perekayasaan produk-produk berbasiskan sumber-daya untuk memacu ekspor.', value: 'P.11.1.3' },
            { label: 'P.11.1.4. - Menyusun suatu rancangan teknis yang mendorong peningkatan keterpaduan antar sektor pembangunan.', value: 'P.11.1.4' },
            { label: 'P.11.1.5. - Menyusun perencanaan dan atau program (master plan, perencanaan jangka panjang/pendek, dsb.) untuk mendukung pengembangan daerah, termasuk perkotaan.', value: 'P.11.1.5' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.11.2. - Menyiapkan dan mengembangkan kebijakan investasi teknis',
        value: 'P.11.2.',
        children: [
            { label: 'P.11.2.1. - Menyiapkan kebijakan teknis yang mendorong peran serta swasta dan masyarakat dalam pembangunan sektor-sektor publik.', value: 'P.11.2.1' },
            { label: 'P.11.2.2. - Mengembangkan sistem manajemen teknis yang efektif dan efisien sehingga diperoleh produk perencanaan yang matang, pelaksanaan yang tepat dan pengawasan yang ketat.', value: 'P.11.2.2' },
            { label: 'P.11.2.3. - Menyiapkan upaya-upaya penajaman prioritas pelaksanaan pembangunan guna memanfaatkan sumber-daya yang terbatas secara optimal.', value: 'P.11.2.3' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.11.3. - Merumuskan kebijaksanaan dan melaksanakan tugas pengaturan teknis untuk keselamatan dan kesejahteraan masyarakat',
        value: 'P.11.3.',
        children: [
            { label: 'P.11.3.1. - Membuat peraturan/pedoman pembangunan dan penggunaan prasarana dan sarana umum bagi peningkatan jaminan keselamatan dan kesejahteraan masyarakat.', value: 'P.11.3.1' },
            { label: 'P.11.3.2. - Mengembangkan rancangan teknologi tepat-guna, yang mempertimbangkan kemudahan dan kesinambungan operasi dan pemeliharaan.', value: 'P.11.3.2' },
            { label: 'P.11.3.3. - Mengembangkan rancangan  teknologi sederhana yang sesuai untuk daerah pedesaan dan mendukung upaya pengentasan kemiskinan serta menciptakan lapangan kerja ketrampilan rendah.', value: 'P.11.3.3' },
            { label: 'P.11.3.4. - Mengembangkan rancangan teknis untuk membuka dan meningkatkan pertumbuhan daerah terpencil, terkucil  dan perbatasan.', value: 'P.11.3.4' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.11.4. - Melaksanakan tugas pengadaan asset',
        value: 'P.11.4.',
        children: [
            { label: 'P.11.4.1. - Menemu-kenali kebutuhan akan aset baru.', value: 'P.11.4.1' },
            { label: 'P.11.4.2. - Menyiapkan spesifikasi atau uraian untuk usulan pengadaan aset baru.', value: 'P.11.4.2' },
            { label: 'P.11.4.3. - Melaksanakan kegiatan pengadaan aset.', value: 'P.11.4.3' },
            { label: 'P.11.4.4. - Melaksanakan pengujian untuk penerimaan pada saat penyerahan.', value: 'P.11.4.4' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.11.5. - Melaksanakan tugas pengendalian dan optimasi asset',
        value: 'P.11.5.',
        children: [
            { label: 'P.11.5.1. - Merumuskan parameter kinerja aset.', value: 'P.11.5.1' },
            { label: 'P.11.5.2. - Menyiapkan petunjuk operasi dan melatih operator.', value: 'P.11.5.2' },
            { label: 'P.11.5.3. - Merencanakan dan melakukan tugas pemantauan kondisi aset.', value: 'P.11.5.3' },
            { label: 'P.11.5.4. - Mengawasi pengoperasian sistem-sistem aset.', value: 'P.11.5.4' },
            { label: 'P.11.5.5. - Mengatur pengoperasian aset untuk menjamin pelayanan.', value: 'P.11.5.5' },
            { label: 'P.11.5.6. - Mempelajari kemungkinan memperpanjang umur aset.', value: 'P.11.5.6' },
          // ... other sub-sections ...
        ],
    },
    {
        label:'P.11.6. - Melaksanakan atau mengawasi tugas pemeliharaan asset',
        value: 'P.11.6.',
        children: [
            { label: 'P.11.6.1. - Mengembangkan kaidah pemeliharaan dan parameter kinerja aset.', value: 'P.11.6.1' },
            { label: 'P.11.6.2. - Menyiapkan jadwal pemeliharaan pencegahan.', value: 'P.11.6.2' },
            { label: 'P.11.6.3. - Menyiapkan petunjuk/panduan  untuk pemeliharaan perbaikan.', value: 'P.11.6.3' },
            { label: 'P.11.6.4. - Menetapkan, dan atau merancangkan, alat bantu uji pemeliharaan.', value: 'P.11.6.4' },
            { label: 'P.11.6.5. - Mengawasi tugas pemeliharaan.', value: 'P.11.6.5' },
            { label: 'P.11.6.6. - Menentukan kebutuhan persediaan suku-cadang.', value: 'P.11.6.6' },
            { label: 'P.11.6.7. - Melaksanakan pemeriksaan dan atau analisis atas kegagalan serta dampak akibatnya.', value: 'P.11.6.7' },
            { label: 'P.11.6.8. - Melaksanakan analisis terhadap  modus kegagalan dan akibatnya.', value: 'P.11.6.8' },
            // ... other sub-sections ...
        ],
    },
    {
        label:'P.11.7. - Merencanakan dan melaksanakan penghapusan asset',
        value: 'P.11.7.',
        children: [
            { label: 'P.11.7.1. - Mempelajari penentuan umur ekonomis aset.', value: 'P.11.7.1' },
            { label: 'P.11.7.2. - Menyelidiki penghapusan aset secara ekonomis dan layak lingkungan.', value: 'P.11.7.2' },
            { label: 'P.11.7.3. - Merekomendasikan langkah penghapusan aset.', value: 'P.11.7.3' },
            { label: 'P.11.7.4. - Melakukan pemulihan lahan bekas lokasi aset.', value: 'P.11.7.4' },
          // ... other sub-sections ...
        ],
    },

]    
