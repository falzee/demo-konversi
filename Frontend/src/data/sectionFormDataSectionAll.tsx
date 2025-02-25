
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
export const allSectionData: Section[]= [
    {
        label: 'W.1. ',
        value: 'W.1.',
        children: [
            {
                label: 'W.1.1. - Mengembangkan dan mewujudkan tanggungjawab kecendekiaan dan kepedulian profesi keinsinyuran kepada bangsa, negara dan komunitas internasional',
                value: 'W.1.1.',
            },           
            {
                label:'W.1.2. - Menghayati serta mematuhi Kode Etik Insinyur Indonesia dan tatalaku profesi yang berlaku',
                value: 'W.1.2.',
            },
            {
                label:'W.1.3. - Memahami, menerapkan, serta mengembangkan wawasan dan kaidah-kaidah kelestarian lingkungan',
                value: 'W.1.3.',
            },
            {
                label:'W.1.4. - Mengemban tanggungjawab profesional atas tindakan dan karyanya.',
                value: 'W.1.4.',
            },
        ],
    },
    {
        label: 'W.2. ',
        value: 'W.2.',
        children: [
            {
                label:'W.2.1. - Melaksanakan pekerjaan yang bersifat kecendekiaan dan beragam',
                value: 'W.2.1.',
                },
                {
                label:'W.2.2. - Menguasai, memelihara, mengembangkan dan memutakhir-kan keahlian dalam bidang pekerjaan dan kejuruannya',
                value: 'W.2.2.',
                },
                {
                label:'W.2.3. - Memahami dan menerapkan metoda-metoda perekayasaan',
                value: 'W.2.3.',
                },
                {
                label:'W.2.4. - Memahami dan menerapkan kaidah-kaidah penjaminan mutu',
                value: 'W.2.4.',
                },
                {
                label:'W.2.5. - Memilih dan menerapkan penggunaan perangkat perekayasaan dan teknologi yang tepat-guna',
                value: 'W.2.5.',
                },
                {
                label:'W.2.6. - Melaksanakan uji-coba, pengukuran dan kaji-nilai (evaluasi)',
                value: 'W.2.6.',
                },
        ],
    },
    {
        label: 'W.3. ',
        value: 'W.3.',
        children: [
            {
                label:'W.3.1. - Menjelaskan dan merumuskan kebutuhan perencanaan dan/atau perancangan',
                value: 'W.3.1.',
            },
            {
                label:'W.3.2. - Membuat usulan  untuk memenuhi kebutuhan perencanaan dan /atau perancangan',
                value: 'W.3.2.',
            },
            {
                label:'W.3.3. - Melaksanakan pekerjaan perencanaan dan/atau perancangan sesuai usulan yang telah dipilih',
                value: 'W.3.3.',
            },
            {
                label:'W.3.4. - Melaksanakan kaji-nilai atas hasil rancangan',
                value: 'W.3.4.',
            },
            {
                label:'W.3.5. - Menyiapkan dokumen penunjang',
                value: 'W.3.5.',
            },
            {
                label:'W.3.6. - Menjaga keutuhan tata identifikasi rancangan sepanjang proses pekerjaan',
                value: 'W.3.6.',
            },
        ],
    },
    {
        label: 'W.4. ',
        value: 'W.4.',
        children: [
            {
                label:'W.4.1. - Menerapkan kaidah-kaidah manajemen atas diri sendiri',
                value: 'W.4.1.',
                },
                {
                label:'W.4.2. - Memahami dan menerapkan kaidah-kaidah pengelolaan pekerjaan keinsinyuran',
                value: 'W.4.2.',
                },
                {
                label:'W.4.3. - Memahami dan menerapkan kaidah-kaidah kepemimpinan dalam pekerjaan keinsinyuran',
                value: 'W.4.3.',
                },
                {
                label:'W.4.4. - Berkomunikasi dengan efektif',
                value: 'W.4.4.',
                },
                {
                label:'W.4.5. -  Mengelola informasi keinsinyuran',
                value: 'W.4.5.',
                },
        ],
    },
    {
        label: 'P.5. ',
        value: 'P.5.',
        children: [
            {
                label:'P.5.1. -  Mengembangkan program pendidikan dan/atau pelatihan keinsinyuran',
                value: 'P.5.1.',
            },
            {
                label:'P.5.2. -  Melaksanakan program pendidikan dan/atau pelatihan keinsinyuran.',
                value: 'P.5.2.',
            },
        ],
    },
    {
        label: 'P.6. ',
        value: 'P.6.',
        children: [
            {
                label:'P.6.1. - Melakukan penelitian',
                value: 'P.6.1.',
            },
            {
                label:'P.6.2. -  Merumuskan konsep pengembangan hasil penelitian',
                value: 'P.6.2.',
            },
            {
                label:'P.6.3. - Menemu-kenali dan mengusahakan sumber daya untuk pengembangan hasil penelitian',
                value: 'P.6.3.',
            },
            {
                label:'P.6.4. - Melakukan kaji pasar  untuk produk  hasil penelitian dan pengembangan',
                value: 'P.6.4.',
            },
            {
                label:'P.6.5. - Mengkomersialkan hasil penelitian dan pengembangan',
                value: 'P.6.5.',
            },
        ],
    },
    {
        label: 'P.7. ',
        value: 'P.7.',
        children: [
            {
                label:'P.7.1. - Melaksanakan tugas konsultansi  perekayasaan keinsinyuran',
                value: 'P.7.1.',
            },
            {
                label:'P.7.2. - Menyiapkan, melaksanakan dan memantau pelelangan dan kontrak untuk pekerjaan konstruksi/instalasi',
                value: 'P.7.2.',
            },
            {
                label:'P.7.3. - Melaksanakan pekerjaan konstruksi/instalasi',
                value: 'P.7.3.',
            },
            {
                label:'P.7.4. - Melaksanakan tugas dan kegiatan pengelolaan kerja lapangan',
                value: 'P.7.4.',
            },
            {
                label:'P.7.5. - Melaksanakan uji kinerja (commissioning)',
                value: 'P.7.5.',
            },
        ],
    },
    {
        label: 'P.8. ',
        value: 'P.8.',
        children: [
            {
                label:'P.8.1. - ',
                value: 'P.8.1.',
            },
            {
                label:'P.8.2. -  Menjaga dan mengawasi program penjaminan mutu',
                value: 'P.8.2.',
            },
            {
                label:'P.8.3. - Melaksanakan tugas pengoperasian, pengendalian dan optimasi proses',
                value: 'P.8.3.',
            },
            {
                label:'P.8.4. -  Melaksanakan tugas pengelolaan persediaan',
                value: 'P.8.4.',
            },
            {
                label:'P.8.5. - Mengukur kinerja produksi',
                value: 'P.8.5.',
            },
        ],
    },
    {
        label: 'P.9. ',
        value: 'P.9.',
        children: [
            {
                label:'P.9.1. - Merumuskan kebutuhan dan penggunaan  bahan material atau komponen khusus',
                value: 'P.9.1.',
            },
            {
                label:'P.9.2. - Menetapkan sumber bahan baku pengadaan bahan material atau komponen',
                value: 'P.9.2.',
            },
            {
                label:'P.9.3. - Mengawasi penyiapan atau pengadaan bahan material atau komponen',
                value: 'P.9.3.',
            },
            {
                label:'P.9.4. - Menilai sifat bahan material atau komponen',
                value: 'P.9.4.',
            },
            {
                label:'P.9.5. - Memilih cara pemeliharaan mutu bahan material atau komponen',
                value: 'P.9.5.',
            },
        ],
    },
    {
        label: 'P.10. ',
        value: 'P.10.',
        children: [
            {
                label:'P.10.1. - Mengelola sumber-daya keinsinyuran',
                value: 'P.10.1.',
            },
            {
                label:'P.10.2. - Mengelola sumber-daya manusia',
                value: 'P.10.2.',
            },
            {
                label:'P.10.3. - Melaksanakan pengelolaan kewira-usahaan, keuangan, dan hukum/kontraktual',
                value: 'P.10.3.',
            },
            {
                label:'P.10.4. - Mengelola keterangan produk (product knowledge) untuk barang/jasa keinsinyuran',
                value: 'P.10.4.',
            },
            {
                label:'P.10.5. - Memahami dan menerapkan kaidah-kaidah pemasaran barang/jasa keinsinyuran',
                value: 'P.10.5.',
            },
            {
                label:'P.10.6. - Memahami dan menerapkan kaidah-kaidah pelayanan purna-jual',
                value: 'P.10.6.',
            },
        ],
    },
    {
        label: 'P.11. ',
        value: 'P.11.',
        children: [
            {
                label:'P.11.1. - Menyiapkan dan mengembangkan kebijakan umum keinsinyuran untuk mendorong sektor pembangunan',
                value: 'P.11.1.',
            },
            {
                label:'P.11.2. - Menyiapkan dan mengembangkan kebijakan investasi teknis',
                value: 'P.11.2.',
            },
            {
                label:'P.11.3. - Merumuskan kebijaksanaan dan melaksanakan tugas pengaturan teknis untuk keselamatan dan kesejahteraan masyarakat',
                value: 'P.11.3.',
            },
            {
                label:'P.11.4. - Melaksanakan tugas pengadaan asset',
                value: 'P.11.4.',
            },
            {
                label:'P.11.5. - Melaksanakan tugas pengendalian dan optimasi asset',
                value: 'P.11.5.',
            },
            {
                label:'P.11.6. - Melaksanakan atau mengawasi tugas pemeliharaan asset',
                value: 'P.11.6.',
            },
            {
                label:'P.11.7. - Merencanakan dan melaksanakan penghapusan asset',
                value: 'P.11.7.',
            },
        
        ],
    },

]    
