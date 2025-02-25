import React, { useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';

  //punya column
  interface TableRow {
    key: any;
    namaPerguruan: string;
    tingkatPendidikan: string;
    fakultas: string;
    jurusan: string;
    kotaPerguruan: string;
    provinsi: string;
    negara: string;
    tahunLulus: string;
    gelar: string;
    judulTa: string;
    uraianSingkat: string;
    nilaiAkademikRata: string;
    
  }

  // nilaiAkademikRata
const FormulirDua: React.FC = () => {
//kumpulan state
    const { formId } = useParams<{ formId: string | undefined }>();
    const [dataSource, setDataSource] = useState<TableRow[]>([  ]);//data tabel
    // const [form] = Form.useForm();
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
          const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=i2`,config)
          const userData = response.data;
          setDataSource(userData.data.form_i_dua)
    
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
          namaPerguruan: '',
          tingkatPendidikan: '',
          fakultas: '',
          jurusan: '',
          kotaPerguruan: '',
          provinsi: '',
          negara: '',
          tahunLulus: '',
          gelar: '',
          judulTa: '',
          uraianSingkat: '',
          nilaiAkademikRata: '',
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
            namaPerguruan : values[`namaPerguruan${row.key}`],
            tingkatPendidikan: values[`tingkatPendidikan${row.key}`],
            fakultas: values[`fakultas${row.key}`],
            jurusan: values[`jurusan${row.key}`],
            kotaPerguruan: values[`kotaPerguruan${row.key}`],
            provinsi: values[`provinsi${row.key}`],
            negara: values[`negara${row.key}`],
            tahunLulus: values[`tahunLulus${row.key}`],
            gelar: values[`gelar${row.key}`],
            judulTa: values[`judulTa${row.key}`],
            uraianSingkat: values[`uraianSingkat${row.key}`],
            nilaiAkademikRata: values[`nilaiAkademikRata${row.key}`],
          }));
          
          // Now you can send formData to your backend for processing
          // console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const response = await axios.patch(`/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=i2`,formData,config);
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
          title: 'Nama',
          dataIndex: 'namaPerguruan',
          key: 'namaPerguruan',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaPerguruan${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
            title: 'Tingkkat Pendidikan',
            dataIndex: 'tingkatPendidikan',
            key: 'tingkatPendidikan',
            render: (text: string, record: TableRow) => (
                <div>
                  <Form.Item name={`tingkatPendidikan${record.key}`} initialValue={record.tingkatPendidikan || undefined}>
                    <Select placeholder="--Choose--" style={{ width: 100 }}>
                      <Select.Option value="D3">D3</Select.Option>
                      <Select.Option value="D4">D4</Select.Option>
                      <Select.Option value="S1">S1</Select.Option>
                      <Select.Option value="S2">S2</Select.Option>
                      <Select.Option value="S3">S3</Select.Option>
                      <Select.Option value="Ir.">Ir.</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
            ),
          },
        {
          title: 'Fakultas',
          dataIndex: 'fakultas',
          key: 'fakultas',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`fakultas${record.key}`} initialValue={text} style={{width:'250px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
            title: 'Jurusan',
            dataIndex: 'jurusan',
            key: 'jurusan',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`jurusan${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
        {
            title: 'Kota /Kabupaten',
            dataIndex: 'kotaPerguruan',
            key: 'kotaPerguruan',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`kotaPerguruan${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Provinsi',
            dataIndex: 'provinsi',
            key: 'provinsi',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`provinsi${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Negara',
            dataIndex: 'negara',
            key: 'negara',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`negara${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Tahun Lulus',
            dataIndex: 'tahunLulus',
            key: 'tahunLulus',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`tahunLulus${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Gelar',
            dataIndex: 'gelar',
            key: 'gelar',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`gelar${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Judul Tugas Akhir/Skripsi/Tesis/Disertasi',
            dataIndex: 'judulTa',
            key: 'judulTa',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`judulTa${record.key}`} initialValue={text} style={{width:'250px'}}>
                <TextArea rows={4} />
              </Form.Item>
            ),
          },
          {
            title: 'Uraian Singkat Tentang Materi Tugas Akhir/ Skripsi/Tesis/ Disertasi',
            dataIndex: 'uraianSingkat',
            key: 'uraianSingkat',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`uraianSingkat${record.key}`} initialValue={text} style={{width:'250px'}}>
                <TextArea rows={4} />
              </Form.Item>
            ),
          },
          {
            title: 'Nilai Akademik Rata-rata',
            dataIndex: 'nilaiAkademikRata',
            key: 'nilaiAkademikRata',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`nilaiAkademikRata${record.key}`} initialValue={text} style={{width:'100px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Hapus',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: string, record: TableRow) => (
            // <>
            <Button onClick={() => openModalDelete(record)} type='primary' danger>
              <DeleteOutlined />
            </Button>         
          ),
        },
      ];
      // open={isModalOpen} onOk={handleDeleteRow} onCancel={handleCancel} 
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
            <h3 className='headerform' style={{marginBottom:'10px'}}>I.2 Pendidikan Formal <span style={{color:'#6b7aa1'}}>(W2)</span></h3>
            <Button className="addFormButton" type="primary" onClick={handleAddRow} style={{marginBottom:'10px'}}>
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
                />
              </div>
                <p style={{margin:'10px 0'}}>*&#41; KOMPETENSI: Isi dengan nomor Uraian Kegiatan Kompetensi yang Anda anggap persyaratannya telah terpenuhi dengan aktifitas Anda di sini</p>
                <Button className="saveFormButton" type="primary" htmlType="submit" style={{margin:'20px auto',display: "flex", justifyContent: "center" }}>
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

  export default FormulirDua;
