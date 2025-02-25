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

export const dataKodeEtik: Section[]= [
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
]

export const dataProfesionalisme: Section[]= [
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
]