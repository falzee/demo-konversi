import React, { useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import { dataWsatu } from '../data/SectionFormDataW'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';


  //punya column
  interface TableRow {
    key: any;
    namaOrganisasi: string;
    jenisOrganisasi: string;
    kotaAsal: string;
    provinsiAsal: string;
    negaraAsal: string;
    bulan: string;
    tahun: string;
    bulanMulai: string;
    tahunMulai: string;
    masihAnggota : boolean;
    jabatanOrganisasi: string;
    tingkatanOrganisasi: string;
    kegiatanOrganisasi: string;
    uraianTugas: string;
    klaimKompetensi: string[];
    // jumlahKlaimWSatu: number;
    klaimKompetensiWsatu?: string[];
  }

const Formulir: React.FC = () => {
//kumpulan state
    const { formId } = useParams<{ formId: string | undefined }>();
    const [dataSource, setDataSource] = useState<TableRow[]>([  ]);//data tabel
    const [selectedChoices, setSelectedChoices] = useState<{ [key: string]: string[] }>({
      // "HGsQaJKrMKrMjLWQYDSFn": ["W.1.1.1", "W.1.1.2", "W.1.1.3", "W.1.1.4", "W.1.1.5", "W.1.2.3", "W.1.2.4", "W.1.2.7", "W.1.2.8", "W.1.2.5", "W.1.2.1", "W.1.3.6", "W.1.4.3"],
      // "s-OdRU7olVC70aqBwWvPo": ["W.1.1.3", "W.1.1.4"]
    });   
    // console.log("SELECTED CHOICE: "+ Object.entries(selectedChoices))
    // const [data, setdata] = useState();
    // const [rowNumbers, setRowNumbers] = useState<number>(1);//penomeran client side
    // const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);
    const [form] = Form.useForm();
//kumpulan fungsi
    const formRef = React.createRef<FormInstance>();//
    //API = const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=i3`,config);

    useEffect(() => {
      // Retrieve JWT token from localStorage
      fetchFaipData();
    }, []);
    
    const fetchFaipData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
    
        if (token) {
          // Decode the token to extract user ID
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          // Make API request with user ID
          const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=i3`,config)
          const userData = response.data;
          setDataSource(userData.data.form_i_tiga)
          const newSelectedChoices: { [key: string]: string[] } = {};
          userData.data.form_i_tiga.forEach((item: any) => {
            newSelectedChoices[item.key] = item.klaimKompetensiWsatu;
          });
          setSelectedChoices(newSelectedChoices);
    
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching data'); 
      }
    };
    const handleAddRow = () => { //fungsi nambah baris 
        const newRow: TableRow = {
          key: nanoid(),//gk perlu //gk jadi deng ternyata perlu
          namaOrganisasi: '',
          jenisOrganisasi: '',
          kotaAsal: '',
          provinsiAsal: '',
          negaraAsal: '',
          bulan: '',
          tahun: '',
          bulanMulai: '',
          tahunMulai: '',
          masihAnggota : false,
          jabatanOrganisasi: '',
          tingkatanOrganisasi: '',
          kegiatanOrganisasi: '',
          uraianTugas: '',
          klaimKompetensi: [],
          // jumlahKlaimWSatu: 0,
        };
        setDataSource([...dataSource, newRow]);
        // setRowNumbers(rowNumbers + 1); 
      };
      

    // const updatedRowNumbers = updatedDataSource.map(row => row.id).splice(-1,1,);
    // console.log(updatedRowNumbers)
    // const updatedNumbers = updatedRowNumbers.splice(-1, 1) ;
  
    // console.log(updatedRowNumbers)
    //buggg

    const onFinish = async (values: any) => { //fungsi submit form //NEED API POST

      try{
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;
          const formData = dataSource.map(row => ({
            ...row,
            namaOrganisasi : values[`namaOrganisasi${row.key}`],
            jenisOrganisasi: values[`jenisOrganisasi${row.key}`],
            kotaAsal: values[`kotaAsal${row.key}`],
            provinsiAsal: values[`provinsiAsal${row.key}`],
            negaraAsal: values[`negaraAsal${row.key}`],
            bulan: values[`bulan${row.key}`],
            tahun: values[`tahun${row.key}`],
            bulanMulai: values[`bulanMulai${row.key}`],
            tahunMulai: values[`tahunMulai${row.key}`],
            masihAnggota : values[`masihAnggota${row.key}`],
            jabatanOrganisasi: values[`jabatanOrganisasi${row.key}`],
            tingkatanOrganisasi: values[`tingkatanOrganisasi${row.key}`],
            kegiatanOrganisasi: values[`kegiatanOrganisasi${row.key}`],
            uraianTugas: values[`uraianTugas${row.key}`],
            klaimKompetensiWsatu: selectedChoices[row.key] || [],
          }));
          
          // Now you can send formData to your backend for processing
          // console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const response = await axios.patch(`/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=i3`,formData,config);
          // console.log("response add form:"+response)

          // const userData = response.data;
          // setStatus("new")
        } else {
          console.error('User not found');
        }
      }catch(error){
        console.error('Error sending form');
      }
      window.location.reload();
      
      // ... your form submission logic ...
    };
    // const handleCheckboxChange = (e:any) => {

    const handleChoiceChange = (recordKey: string, choiceValue: string, checked: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
      const currentRowChoices = selectedChoices[recordKey] || [];
      // console.log(currentRowChoices);
      if (checked && currentRowChoices.length < 3) {
        const updatedRowChoices = [...currentRowChoices, choiceValue];
          setSelectedChoices({
            ...selectedChoices,
            [recordKey]: updatedRowChoices,
          });
      } else if (!checked) {
        const updatedRowChoices = currentRowChoices.filter(choice => choice !== choiceValue);
          setSelectedChoices({
            ...selectedChoices,
            [recordKey]: updatedRowChoices,
          });
      }else {
          // Show alert if more than 3 choices selected
          alert('Harap Memilih Tidak Lebih Dari 3 Klaim Kompetensi W1');
      }
    };
    //   setShowAdditionalFields(e.target.checked);
    // };
    const handleCheckboxChange = (key: any, checked: boolean) => {
      setDataSource((prevData) =>
        prevData.map((record) =>
          record.key === key ? { ...record, masihAnggota: checked } : record
        )
      );
    };

    // const openModalDelete = (key: any) => { //fungsi hapus baris  //NEED API DELETE
    //   // const updatedDataSource = dataSource.filter(row => row.key !== key);
    //   // setDataSource(updatedDataSource);
    //   setIsModalOpen(false);
    // };
    // const showModal = (record:any) => {
    //   console.log(record);
    //   setmodaldata(record);
    //   setIsModalVisible(true);
    //   };
    // const deleteRowForm = async (record: TableRow) => {
    //   try{
    //     const token = localStorage.getItem('jwtToken');
    //     if (token) {
    //       const decodedToken: any = jwtDecode(token);
    //       const userId = decodedToken.nomerInduk;
    //       const config = {
    //         headers: {
    //           Authorization: `Bearer ${token}`
    //         }
    //       };
    //       const response = await axios.patch(`/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=i3`,config);
    //       console.log("response add form:"+response)
    //       handleDeleteRow(record.key)

    //       // const userData = response.data;
    //       // setStatus("new")
    //     } else {
    //       console.error('JWT token not found');
    //     }
    //   }catch(error){
    //     console.log('Error deleting row data form:', error);
    //   }
    //   setIsModalOpen(false);
    //   // window.location.reload(); 
    // };
    
//kolom tabel
    const columns: ColumnsType<TableRow>= [
        {
            title: 'No.', // Visual numbering
            dataIndex: 'visualNumber', // This doesn't have to correspond to any data field
            key: 'visualNumber',
            render: (text: string, record: TableRow, index: number) => (<span style={{fontWeight:'bold'}}>{`${index + 1}`}</span>), // Render the row index + 1,
            width: 50,
            align: 'center' as const,
            fixed: 'left',
        },
        {
          title: 'Nama Organisasi',
          dataIndex: 'namaOrganisasi',
          key: 'namaOrganisasi',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaOrganisasi${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input data-test="input"  />
            </Form.Item>
          ),
        },
        {
          title: 'Jenis',
          dataIndex: 'jenisOrganisasi',
          key: 'jenisOrganisasi',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`jenisOrganisasi${record.key}`} initialValue={record.jenisOrganisasi || undefined} >
              <Select placeholder="--Choose--" style={{ width: 280 }} data-test="select"  >
                <Select.Option value="Organisasi PII">Organisasi PII</Select.Option>
                <Select.Option value="Organisasi Keinsinyuran Non PII">Organisasi Keinsinyuran Non PII</Select.Option>
                <Select.Option value="Organisasi Non Keinsinyuran">Organisasi Non Keinsinyuran</Select.Option>
              </Select>
            </Form.Item>
          ),
        },
        {
          title: 'Kota/Kabupaten',
          dataIndex: 'kotaAsal',
          key: 'kotaAsal',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`kotaAsal${record.key}`} initialValue={text} style={{width:'150px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
            title: 'Provinsi',
            dataIndex: 'provinsiAsal',
            key: 'provinsiAsal',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`provinsiAsal${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Negara',
            dataIndex: 'negaraAsal',
            key: 'negaraAsal',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`negaraAsal${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Perioda',
            dataIndex: 'perioda',
            key: 'perioda',
            width: 50,
            render: (text: string, record: TableRow, index: number) => (
                <div>
                    {record.masihAnggota  ? (
                    <>
                    <Form.Item className='form-item-row' name={`bulanMulai${record.key}`} initialValue={record.bulanMulai || undefined}>
                      <Select placeholder="--Bulan Mulai--" style={{ width: 150 }}>
                        <Select.Option value="Januari">Januari</Select.Option>
                        <Select.Option value="Pebruari">Februari</Select.Option>
                        <Select.Option value="Maret">Maret</Select.Option>
                        <Select.Option value="April">April</Select.Option>
                        <Select.Option value="Mei">Mei</Select.Option>
                        <Select.Option value="Juni">Juni</Select.Option>
                        <Select.Option value="Juli">Juli</Select.Option>
                        <Select.Option value="Agustus">Agustus</Select.Option>
                        <Select.Option value="September">September</Select.Option>
                        <Select.Option value="Oktober">Oktober</Select.Option>
                        <Select.Option value="Nopember">November</Select.Option>
                        <Select.Option value="Desember">Desember</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item className='form-item-row' name={`tahunMulai${record.key}`} initialValue={record.tahunMulai || undefined}>
                        <Input placeholder='--Tahun Mulai--' />
                    </Form.Item></>)
                    :(<>
                    <Form.Item className='form-item-row' name={`bulanMulai${record.key}`} initialValue={record.bulanMulai || undefined}>
                      <Select placeholder="--Bulan Mulai--" style={{ width: 150 }}>
                      <Select.Option value="Januari">Januari</Select.Option>
                        <Select.Option value="Pebruari">Februari</Select.Option>
                        <Select.Option value="Maret">Maret</Select.Option>
                        <Select.Option value="April">April</Select.Option>
                        <Select.Option value="Mei">Mei</Select.Option>
                        <Select.Option value="Juni">Juni</Select.Option>
                        <Select.Option value="Juli">Juli</Select.Option>
                        <Select.Option value="Agustus">Agustus</Select.Option>
                        <Select.Option value="September">September</Select.Option>
                        <Select.Option value="Oktober">Oktober</Select.Option>
                        <Select.Option value="Nopember">November</Select.Option>
                        <Select.Option value="Desember">Desember</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item className='form-item-row' name={`tahunMulai${record.key}`} initialValue={record.tahunMulai || undefined}>
                        <Input placeholder='--Tahun Mulai--' />
                    </Form.Item>
                    <Divider style={{ margin:'5px 0'}} plain>s/d</Divider>
                    <Form.Item className='form-item-row' name={`bulan${record.key}`} initialValue={record.bulan || undefined}>
                      <Select placeholder="--Bulan--" style={{ width: 150 }}>
                      <Select.Option value="Januari">Januari</Select.Option>
                        <Select.Option value="Pebruari">Februari</Select.Option>
                        <Select.Option value="Maret">Maret</Select.Option>
                        <Select.Option value="April">April</Select.Option>
                        <Select.Option value="Mei">Mei</Select.Option>
                        <Select.Option value="Juni">Juni</Select.Option>
                        <Select.Option value="Juli">Juli</Select.Option>
                        <Select.Option value="Agustus">Agustus</Select.Option>
                        <Select.Option value="September">September</Select.Option>
                        <Select.Option value="Oktober">Oktober</Select.Option>
                        <Select.Option value="Nopember">November</Select.Option>
                        <Select.Option value="Desember">Desember</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item className='form-item-row' name={`tahun${record.key}`} initialValue={record.tahun}>
                        <Input placeholder='--Tahun--' />
                    </Form.Item>
                    </>)}
                    
                    {/* <Checkbox onChange={handleCheckboxChange}>Masih Menjadi Anggota</Checkbox> */}
                    <Form.Item name={`masihAnggota${record.key}`} valuePropName="checked" initialValue={record.masihAnggota}>
                      <Checkbox checked={record.masihAnggota} onChange={(e: any) => handleCheckboxChange(record.key, e.target.checked)}>Masih Menjadi Anggota</Checkbox>
                    </Form.Item>
                </div>
                ),
          },
          {
            title: 'Jabatan Dalam Organisasi',
            dataIndex: 'jabatanOrganisasi',
            key: 'jabatanOrganisasi',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`jabatanOrganisasi${record.key}`} initialValue={record.jabatanOrganisasi || undefined} >
                <Select placeholder="--Choose--" style={{ width: 280 }}>
                  <Select.Option value="Anggota biasa">Anggota biasa</Select.Option>
                  <Select.Option value="Anggota pengurus">Anggota pengurus</Select.Option>
                  <Select.Option value="Pimpinan">Pimpinan</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Tingkatan Organisasi',
            dataIndex: 'tingkatanOrganisasi',
            key: 'tingkatanOrganisasi',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`tingkatanOrganisasi${record.key}`} initialValue={record.tingkatanOrganisasi  || undefined}>
                <Select placeholder="--Choose--" style={{ width: 280 }}>
                  <Select.Option value="Organisasi lokal (bukan Nasional)">Organisasi lokal (bukan Nasional)</Select.Option>
                  <Select.Option value="Organisasi Nasional">Organisasi Nasional</Select.Option>
                  <Select.Option value="Organisasi Regional">Organisasi Regional</Select.Option>
                  <Select.Option value="Organisasi Internasional">Organisasi Internasional</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Lingkup Kegiatan Organisasi',
            dataIndex: 'kegiatanOrganisasi',
            key: 'kegiatanOrganisasi',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`kegiatanOrganisasi${record.key}`} initialValue={record.kegiatanOrganisasi  || undefined}>
                <Select placeholder="--Choose--" style={{ width: 280 }}>
                  <Select.Option value="Asosiasi Profesi">Asosiasi Profesi</Select.Option>
                  <Select.Option value="Lembaga Pemerintah">Lembaga Pemerintah</Select.Option>
                  <Select.Option value="Lembaga Pendidikan">Lembaga Pendidikan</Select.Option>
                  <Select.Option value="Badan Usaha Milik Negara">Badan Usaha Milik Negara</Select.Option>
                  <Select.Option value="Badan Usaha Swasta">Badan Usaha Swasta</Select.Option>
                  <Select.Option value="Organisasi Kemasyarakatan">Organisasi Kemasyarakatan</Select.Option>
                  <Select.Option value="Lain-lain">Lain-lain</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Uraian Singkat Tugas dan Tanggung Jawab Profesional sesuai NSPK',
            dataIndex: 'uraianTugas',
            key: 'uraianTugas',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`uraianTugas${record.key}`} initialValue={text} style={{width:'250px'}}>
                <TextArea rows={4} />
              </Form.Item>
            ),
          },
        {
          title: 'Klaim Kompetensi',
          dataIndex: 'klaimKompetensi',
          key: 'klaimKompetensi',
          render: (text: string[], record: TableRow) => (
          <div className='form-klaim-list'>
            <Form.Item name={`klaimKompetensi${record.key}`} initialValue={text} style={{width:'1000px',fontSize:'14px'}} >
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                {dataWsatu.map(section => (
                <div key={section.value} >
                  <span style={{fontWeight:'bold'}}>{section.label}</span>
                  {section.children.map((subSection) => (
                  <div key={subSection.value} style={{borderBottom:'1px solid #dddddd',borderTop:'1px solid #dddddd'}}>
                    <Checkbox
                      value={subSection.value}
                      checked={(selectedChoices[record.key] || []).includes(subSection.value)}
                      onChange={(e : any) => handleChoiceChange(record.key, subSection.value, e.target.checked)}
                      data-test={`checkbox-${subSection.value}`}
                    >
                      {subSection.label}
                    </Checkbox>
                  </div>
                ))}
                </div>
              ))}
              </div>
            </Form.Item>
        </div>
          ),
        },
        {
          title: 'Hapus',
          dataIndex: 'actions',
          key: 'actions',
          render: (text: string, record: TableRow) => (
            // <>
            <Button data-test="delete-button" onClick={() => openModalDelete(record)} type='primary' danger>
              <DeleteOutlined />
            </Button>
            // <Button onClick={showModal} type='primary' danger><DeleteOutlined /> x</Button>
            // {/* <Modal title="Hapus Formulir?" open={isModalOpen} onOk={deleteRowForm} onCancel={handleCancel} okText={'Hapus'} okType='danger' centered> */}
            // <Modal title="Hapus data?" open={isModalOpen} onOk={() => handleDeleteRow(record.key)} onCancel={handleCancel} okText={'Hapus'} okType='danger' centered>
            //   <p>Apakah anda yakin untuk menghapus data baris ini?</p>
            //   <p style={{color:'red'}}>note. data yang dihapus tidak bisa dikembalikan</p>
            // </Modal>
            // </>
            
          ),
        },
      ];
      //modal logic
      const handleDelete = (key: any) => {
        const newData = dataSource.filter(item => item.key !== key);
        setDataSource(newData);
      };

      const [isModalOpen, setIsModalOpen] = useState(false);
      const [modaldata, setmodaldata] = useState<any>([]);
      const openModalDelete = (record: any) => { //fungsi hapus baris  //NEED API DELETE
        // const updatedDataSource = dataSource.filter(row => row.key !== key);
        setmodaldata(record);
        setIsModalOpen(true);
      };
      const handleDeleteRow = () => {
        handleDelete(modaldata.key);
        setIsModalOpen(false);
        };
      const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    //struktur komponen
    return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBorderRadius: 4,
          },
          Checkbox: {
            colorPrimary: '#6b7aa1',
            colorPrimaryHover: '#7e90be',
          },
          Input: {
            activeBorderColor:'#7e90be',
            hoverBorderColor:'#7e90be',
          },
        }
      }}
    >
    <div>
        <div className='container-form'>
            <h3 className='headerform' style={{marginBottom:'10px'}}>I.3 Organisasi Profesi & Organisasi Lainnya Yang Dimasuki <span style={{color:'#6b7aa1'}}>(W1)</span></h3>
            <Button data-cy="add-row-button"  className="addFormButton" type="primary" onClick={handleAddRow} style={{marginBottom:'10px'}}>
                + Add Row
            </Button>
            <Form ref={formRef} onFinish={onFinish} >
              <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                  rowKey={(record) => record.key}
                  size="small"
                  scroll={{ y: 400, x: 'max-content' }} // Adjust x as needed
                  bordered
                  data-test="my-table" // Add data-test attribute here
                />
              </div>
                <p style={{margin:'10px 0'}}>*&#41; KOMPETENSI: Isi dengan nomor Uraian Kegiatan Kompetensi yang Anda anggap persyaratannya telah terpenuhi dengan aktifitas Anda di sini</p>
                <Button data-cy="save-table" className="saveFormButton" type="primary" htmlType="submit" style={{margin:'20px auto',display: "flex", justifyContent: "center" }}>
                    {/* <Button type="primary" htmlType="submit" disabled={totalSelected !== 3}> */}
                    Save & Continue
                </Button>
            </Form>
            <Modal title="Hapus data?" open={isModalOpen} onOk={handleDeleteRow} onCancel={handleCancel} okText={'Hapus'} okType='danger' centered>
              {/* <p>Apakah anda yakin untuk menghapus data baris ini?</p> */}
              <p style={{color:'#faad14'}}>Data baru benar-benar terhapus dengan menekan tombol "save and continue" di bagian bawah</p>
            </Modal>
        </div>
    </div>
    </ConfigProvider>

    );
  };

  export default Formulir;
