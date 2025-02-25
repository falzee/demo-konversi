import React, { useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal, Descriptions } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';

  

  interface Table1Row {
    key: any;
    tipe: string;
    alamat: string;
    kota: string;
    kodePos: string;
}

interface Table2Row {
    key: any;
    nama: string;
    jabatan: string;
    kota: string;
    kodePos: string;
}

interface Table3Row {
    key: any;
    tipe: string;
    nomor: string;
}


// punya deskripsi
  interface Item {
    key: string;
    label: string;
    children: any;
  }
  // nilaiAkademikRata
const FormulirSatu: React.FC = () => {
//kumpulan state
    const { formId } = useParams<{ formId: string | undefined }>();
    const [dataSourceOne, setDataSourceOne] = useState<Table1Row[]>([]);
    const [dataSourceTwo, setDataSourceTwo] = useState<Table2Row[]>([]);
    const [dataSourceThree, setDataSourceThree] = useState<Table3Row[]>([]);
    // const [form] = Form.useForm<FormValues>();
    const formRef = React.createRef<FormInstance>();//

    //kumpulan fungsi
  const [userData, setUserData] = useState();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData();
    fetchFaipData();
  }, []);

  const fetchUserData = async () => {
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
        const response = await axios.get(`/user/profile/${userId}`,config);
        // console.log("response:"+response)

        const userData = response.data;
        // console.log("userdata:"+ userData.nama)
        setUserData(userData);
        // Update the items with fetched data
        setItems([
          {
            key: '1',
            label: 'Nama',
            children: userData.data.nama,
          },
          {
            key: '2',
            label: 'Gelar',
            children: userData.data.gelar,
          },
          {
            key: '3',
            label: 'Jenis Kelamin',
            children: userData.data.jenis_kelamin,
          },
          {
            key: '4',
            label: 'Tempat & Tanggal Lahir',
            children: userData.data.tempat_lahir + ", " + userData.data.tanggal_lahir,
          },
          {
            key: '5',
            label: 'KTP atau Passport',
            children: userData.data.nomor_identifikasi,
          },
          {
            key: '7',
            label: 'Email',
            children: userData.data.email,
          },
          // Add more items as needed
        ]);
      } else {
        console.error('user not found');
      }
    } catch (error) {
      console.error('Error fetching user data');
    }
  };
    //API = const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=i3`,config);
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
          const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=i1`,config)
          const userData = response.data;
          setDataSourceOne(userData.data.form_i_satu.alamat)
          setDataSourceTwo(userData.data.form_i_satu.lembaga)
          setDataSourceThree(userData.data.form_i_satu.komunikasi)
          // console.log("FETCH SUCCESS?")
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching data'); 
      }
    };

    const handleAddRowOne = () => { //fungsi nambah baris 
      const newRowOne: Table1Row = {
        key: nanoid(),//gk perlu //gk jadi deng ternyata perlu
        tipe: '',
        alamat: '',
        kota: '',
        kodePos: '',
      };
      setDataSourceOne([...dataSourceOne, newRowOne]);
      // setRowNumbers(rowNumbers + 1); 
    };

    const handleAddRowTwo = () => { //fungsi nambah baris 
      const newRowTwo: Table2Row = {
        key: nanoid(),//gk perlu //gk jadi deng ternyata perlu
        nama: '',
        jabatan: '',
        kota: '',
        kodePos: '',
      };
      setDataSourceTwo([...dataSourceTwo, newRowTwo]);
      // setRowNumbers(rowNumbers + 1); 
    };

    const handleAddRowThree = () => { //fungsi nambah baris 
      const newRowThree: Table3Row = {
        key: nanoid(),//gk perlu //gk jadi deng ternyata perlu
        tipe: '',
        nomor: '',
      };
      setDataSourceThree([...dataSourceThree, newRowThree]);
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

          const formDataOne = dataSourceOne.map(row => ({
            ...row,
            tipe : values[`tipe${row.key}`],
            alamat: values[`alamat${row.key}`],
            kota: values[`kota${row.key}`],
            kodePos: values[`kodePos${row.key}`],
          }));
          const formDataTwo = dataSourceTwo.map(row => ({
            ...row,
            nama : values[`nama${row.key}`],
            jabatan : values[`jabatan${row.key}`],
            kota: values[`kota${row.key}`],
            kodePos: values[`kodePos${row.key}`],
          }));
          const formDataThree = dataSourceThree.map(row => ({
            ...row,
            tipe : values[`tipe${row.key}`],
            nomor: values[`nomor${row.key}`],
          }));
          const formDataIone = {alamat:formDataOne,lembaga:formDataTwo,komunikasi:formDataThree}
          // Now you can send formData to your backend for processing
          // console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

          await axios.patch(`/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=i1`,formDataIone,config);
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
    const columnsTable1: ColumnsType<Table1Row> = [
        {
          title: 'No.', // Visual numbering
          dataIndex: 'visualNumber', // This doesn't have to correspond to any data field
          key: 'visualNumber',
          render: (text: string, record: Table1Row, index: number) => (<span style={{fontWeight:'bold'}}>{`${index + 1}`}</span>), // Render the row index + 1,
          width: 50,
          align: 'center' as const,
          fixed: 'left',
        },
        {
          title: 'Tipe',
          dataIndex: 'tipe',
          key:'tipe',
          render: (text: string, record: Table1Row) => (
              <div>
                <Form.Item name={`tipe${record.key}`} initialValue={record.tipe || undefined} >
                  <Select placeholder="--Choose--" style={{ width: 100 }}>
                    <Select.Option value="Home">Home</Select.Option>
                    <Select.Option value="Work">Work</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </div>
          ),
        },
        {
            title: 'Alamat',
            dataIndex: 'alamat',
            key:'alamat',
            render: (text: string, record: Table1Row) => (
                <Form.Item name={`alamat${record.key}`} initialValue={text} style={{width:'200px'}}>
                  <Input />
                </Form.Item>
            ),
          },
        {
          title: 'Kota',
          dataIndex: 'kota',
          key:'kota',
          render: (text: string, record: Table1Row) => (
              <Form.Item name={`kota${record.key}`} initialValue={text} style={{width:'200px'}}>
                <Input />
              </Form.Item>
          ),
        },
        {
          title: 'Kode Pos',
          dataIndex: 'kodePos',
          key:'kodePos',
          render: (text: string, record: Table1Row) => (
            <Form.Item name={`kodePos${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
          {
            title: 'Hapus',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: string, record: Table1Row) => (
            // <>
            <Button onClick={() => openModalDelete(record,'tableOne')} type='primary' danger>
              <DeleteOutlined />
            </Button>         
          ),
        },
      ];
    const columnsTable2: ColumnsType<Table2Row> = [
        {
          title: 'No.', // Visual numbering
          dataIndex: 'visualNumber', // This doesn't have to correspond to any data field
          key: 'visualNumber',
          render: (text: string, record: Table2Row, index: number) => (<span style={{fontWeight:'bold'}}>{`${index + 1}`}</span>), // Render the row index + 1,
          width: 50,
          align: 'center' as const,
          fixed: 'left',
        },
        {
          title: 'Nama',
          dataIndex: 'nama',
          key:'nama',
          render: (text: string, record: Table2Row) => (
            <Form.Item name={`nama${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'Jabatan',
          dataIndex: 'jabatan',
          key:'jabatan',
          render: (text: string, record: Table2Row) => (
            <Form.Item name={`jabatan${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'Kota',
          dataIndex: 'kota',
          key:'kota',
          render: (text: string, record: Table2Row) => (
            <Form.Item name={`kota${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'Kode Pos',
          dataIndex: 'kodePos',
          key:'kodePos',
          render: (text: string, record: Table2Row) => (
            <Form.Item name={`kodePos${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
          {
            title: 'Hapus',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: string, record: Table2Row) => (
            // <>
            <Button onClick={() => openModalDelete(record,'tableTwo')} type='primary' danger>
              <DeleteOutlined />
            </Button>         
          ),
        },
      ];
    const columnsTable3: ColumnsType<Table3Row> = [
        {
          title: 'No.', // Visual numbering
          dataIndex: 'visualNumber', // This doesn't have to correspond to any data field
          key: 'visualNumber',
          render: (text: string, record: Table3Row, index: number) => (<span style={{fontWeight:'bold'}}>{`${index + 1}`}</span>), // Render the row index + 1,
          width: 50,
          align: 'center' as const,
          fixed: 'left',
        },
        {
            title: 'Tipe',
            dataIndex: 'tipe',
            key:'tipe',
            render: (text: string, record: Table3Row) => (
              <div>
                  <Form.Item name={`tipe${record.key}`} initialValue={record.tipe || undefined} >
                    <Select placeholder="--Choose--" style={{ width: 150 }}>
                      <Select.Option value="Mobile">Mobile</Select.Option>
                      <Select.Option value="Home">Home</Select.Option>
                      <Select.Option value="Work">Work</Select.Option>
                      <Select.Option value="Main">Main</Select.Option>
                      <Select.Option value="Work Fax">Work Fax</Select.Option>
                      <Select.Option value="Home Fax">Home Fax</Select.Option>
                      <Select.Option value="Other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
            ),
          },
        {
          title: 'Nomor',
          dataIndex: 'nomor',
          key:'nomor',
          render: (text: string, record: Table3Row) => (
            <Form.Item name={`nomor${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
          {
            title: 'Hapus',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: string, record: Table3Row) => (
            // <>
            <Button onClick={() => openModalDelete(record,'tableThree')} type='primary' danger>
              <DeleteOutlined />
            </Button>         
          ),
        },
      ];
      //modal logic

      // open={isModalOpen} onOk={handleDeleteRow} onCancel={handleCancel} onClick={() => openModalDelete(record)}
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [modalData, setModalData] = useState<any>(null);
      const [currentTable, setCurrentTable] = useState('');
    
      const openModalDelete = (record: any, table: string) => {
        setModalData(record);
        setCurrentTable(table);
        setIsModalOpen(true);
      };
    
      const handleDeleteRow = () => {
        if (modalData) {
          const key = modalData.key;
          if (currentTable === 'tableOne') {
            setDataSourceOne(prev => prev.filter(item => item.key !== key));
          } else if (currentTable === 'tableTwo') {
            setDataSourceTwo(prev => prev.filter(item => item.key !== key));
          } else if (currentTable === 'tableThree') {
            setDataSourceThree(prev => prev.filter(item => item.key !== key));
          }
        }
        setIsModalOpen(false);
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
        <h2 className='headerform' style={{marginBottom:'10px',textAlign:'center'}}>I. Data Pribadi</h2>
        <div className='home-page' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{ width: '100%',maxWidth:'800px' }}>
            {userData ? (
              <Descriptions bordered items={items} column={1} labelStyle={{width:'140px'}} size='middle' />
              ) : (
              <p>Loading...</p>
            )}
            </div>
        </div>
            <Form ref={formRef}  onFinish={onFinish}>
              <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
                <h3 className='form-i-satu' style={{margin:'10px 0'}}>A. Alamat </h3>
                <Button className="addFormButton" type="primary" onClick={handleAddRowOne} style={{marginBottom:'10px'}}>
                  + Add Row
                </Button>
                <Table
                  dataSource={dataSourceOne}
                  columns={columnsTable1}
                  pagination={false}
                  rowKey={(record) => record.key}
                  size="small"
                  scroll={{ y: 400, x: 'max-content' }} // Adjust x as needed
                  bordered
                />
                <h3 className='form-i-satu' style={{margin:'10px 0'}}>B. Lembaga (Instansi/Perusahaan) </h3>
                <Button cy-test="btn-i1-2" className="addFormButton" type="primary" onClick={handleAddRowTwo} style={{marginBottom:'10px'}}>
                  + Add Row
                </Button>
                <Table
                  dataSource={dataSourceTwo}
                  columns={columnsTable2}
                  pagination={false}
                  rowKey={(record) => record.key}
                  size="small"
                  scroll={{ y: 400, x: 'max-content' }} // Adjust x as needed
                  bordered
                />
                <h3 className='form-i-satu' style={{margin:'10px 0'}}>C. Komunikasi </h3>
                <Button cy-test="btn-i1-3" className="addFormButton" type="primary" onClick={handleAddRowThree} style={{marginBottom:'10px'}}>
                  + Add Row
                </Button>
                <Table
                  dataSource={dataSourceThree}
                  columns={columnsTable3}
                  pagination={false}
                  rowKey={(record) => record.key}
                  size="small"
                  scroll={{ y: 400, x: 'max-content' }} // Adjust x as needed
                  bordered
                />
              </div>
                <Button className="saveFormButton" type="primary" htmlType="submit" style={{margin:'20px auto',display: "flex", justifyContent: "center" }}>
                    {/* <Button type="primary" htmlType="submit" disabled={totalSelected !== 3}> */}
                    Save & Continue
                </Button>
            </Form>
            <Modal
                title="Hapus data?"
                open={isModalOpen}
                onOk={handleDeleteRow}
                onCancel={handleCancel}
                okText={'Hapus'} 
                okType='danger' 
                centered
            >
              <p style={{color:'#faad14'}}>Data baru benar-benar terhapus dengan menekan tombol "save and continue" di bagian bawah</p>
            </Modal>
        </div>
    </div>
    </ConfigProvider>

    );
  };

  export default FormulirSatu;
