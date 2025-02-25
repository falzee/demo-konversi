
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
export const dataWsatu: Section[]= [
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
  ]
export const dataWdua: Section[]= [
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
  ]
export const dataWtiga: Section[]= [
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
  ]
export const dataWempat: Section[]= [
    
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
  ]
