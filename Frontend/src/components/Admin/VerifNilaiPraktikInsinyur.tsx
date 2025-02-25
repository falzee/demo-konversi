import React, { useContext, useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal, InputNumber, InputNumberProps } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { MhsInfoContext } from '../../pages/FaipAdminVerifNilai'; // Import the context
import { CopyOutlined, DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';

interface SubObject {
  cpmk_1?: number;
  cpmk_2?: number;
  cpmk_3?: number;
  cpmk_4?: number;
  cpmk_5?: number;
  // cpmk_6?: number;
  // cpmk_7?: number;
  // cpmk_8?: number;
  // cpmk_9?: number;
} 

interface SomeObject {
  nilai_akhir_angka?: number; // Optional field
  nilai_akhir_huruf?: string; // Optional field
  nilai_cpmk: SubObject;
  nilai_rek_cpmk?: SubObject;

}

interface ListItem {
  id_dosen: string;
  dosen_name: string;
  mk_praktik_keinsinyuran: SomeObject; // Nested object
}


type ListSome = ListItem[]; // Array of items

interface AverageResults {
  [key: string]: number; // each filter key will map to its average score
}

const VerifNilaiPraktikInsinyur: React.FC = () => {
//kumpulan state
  const { formIdA } = useParams<{ formIdA: string | undefined }>();
  const nimMhs = useContext<string | undefined>(MhsInfoContext);

    const [finalValue, setFinalValue] = useState<number | null>(0);//nilai_akhir_angka
    const [finalLetterValue, setFinalLetterValue] = useState("E");//nilai_akhir_huruf
    const [values, setValues] = useState<{ [key: string]: number }>({
      cpmk_1: 0,
      cpmk_2: 0,
      cpmk_3: 0,
      cpmk_4: 0,
      cpmk_5: 0,
      // cpmk_6: 0,
      // cpmk_7: 0,
      // cpmk_8: 0,
      // cpmk_9: 0,
      });
    const [averageResults, setAverageResults] = useState<AverageResults>({});
    const [dsnData, setdsnData] = useState<ListSome>([]);
    
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

          const responseGrading = await axios.get(`/form-tools/verif-grade/grading-info?uid=${userId}&pid=${formIdA}&sid=${nimMhs}&ft=praktik-keinsinyuran`,config);
          const adminGrading = responseGrading.data.data.existingVerifGrading;
          const dsnGrading = responseGrading.data.data.existingLectureGrading;

          if (adminGrading && adminGrading.nilai_Verif_praktik_keinsinyuran.nilai_cpmk){
            setValues(adminGrading.nilai_Verif_praktik_keinsinyuran.nilai_cpmk);
          }

          const validGrading = dsnGrading.filter(
            (item: any) => Object.keys(item.mk_praktik_keinsinyuran).length > 0
          );
      
          if (validGrading.length > 0) {
            setdsnData(validGrading);
          }
      } else {
          console.error('User not found');
      }
      } catch (error) {
        console.error('Error fetching data'); 
      }
    };

    console.log("[VALUES] = "+values)

    const onFinish = async () => { //fungsi submit form //NEED API POST
      try{
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;

          const formData = {
          // nilaiRataCpmk:averageResults,
          nilaiCpmk:values,
          nilaiAngka:finalValue,
          nilaiHuruf:finalLetterValue
        }
          // Now you can send formData to your backend for processing
          console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

          await axios.patch(`/form-tools/verif-grade/grading-info?uid=${userId}&pid=${formIdA}&ft=praktik-keinsinyuran`,formData,config);

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

    useEffect(() => {
        // Calculate average and grade whenever values change
        const valuesArray = Object.values(values);
        const avg = valuesArray.reduce((sum, val) => sum + val, 0) / valuesArray.length;
        setFinalValue(avg);
        setFinalLetterValue(avg > 80 ? 'A' : avg > 70 ? 'B'  : avg > 60 ? 'C' : avg > 50 ? 'D' : 'E');
      }, [values]);

    const handleInputChange = (key: string, value: number | null) => {
        setValues((prevValues) => ({
          ...prevValues,
          [key]: value || 0,
        }));
      };
    
      const calculateAverage = (key: keyof SubObject) => {
        const total = dsnData.reduce(
          (sum, item) => sum + (item.mk_praktik_keinsinyuran.nilai_cpmk[key] || 0),
          0
        );
        return dsnData.length > 0 ? total / dsnData.length : 0;
      };
  
    const handleCopyAverage = (key: keyof SubObject) => {
      const average = Math.round(calculateAverage(key));
      setValues((prev) => ({ ...prev, [key]: average }));
    };

// console.log("nilai akhir ANGKA = " + finalValue)
// console.log("nilai akhir HHURUF = " + finalLetterValue)

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
    <div style={{marginBottom:'2rem'}}>
        <h3 className='headerform' style={{marginBottom:'10px'}}>
        MK - Praktik Keinsinyuran     
        {/* <span style={{color:'#6b7aa1'}}>(W.1.2.1-8)</span> */}
        </h3>

        <div style={{display:'flex',flexDirection:'row'}}>
        {/* <p style={{margin:'5px 0'}}>Rekomendasi Nilai : <span style={{color:'blue'}}>{averageGrade}</span></p> */}
        </div>

        {/* CPMK 1 */}
        <h4>CPMK 1. Mahasiswa mampu memahami tentang filosofi keinsinyuran dan arah perkembangan keinsinyuran.</h4>
        {dsnData.map((item) => (
            <div key={item.id_dosen}>
              <p> - Nilai dari {item.dosen_name} : {item.mk_praktik_keinsinyuran.nilai_cpmk.cpmk_1 ?? 0} </p>
            </div>
        ))}
        <p>Rata-rata nilai CPMK 1 : <span style={{color:'blue'}}>{Math.round(calculateAverage("cpmk_1"))}</span></p>
        <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Verifikasi nilai CPMK 1 :</p>
                <InputNumber style={{width:'75px',margin:'0 5px'}} 
                min={0} 
                max={100}  
                value={values["cpmk_1"]}
                onChange={(value) => handleInputChange("cpmk_1", value)}/>
            <p style={{margin:'5px 0',fontStyle:'italic',color:'gray'}}>* Masukkan nilai dari 1-100</p>
        </div>
        <Button type="primary" onClick={() => handleCopyAverage("cpmk_1")}><CopyOutlined /> Kopi nilai CPMK 1</Button>

        <Divider style={{margin:'10px 0'}} />

        {/* CPMK 2 */}
        <h4>CPMK 2. Mahasiswa mampu memahami tentang sistem industri atau sistem keteknikan (“engineering”). </h4>
        {dsnData.map((item) => (
            <div key={item.id_dosen}>
              <p> - Nilai dari {item.dosen_name} : {item.mk_praktik_keinsinyuran.nilai_cpmk.cpmk_2 ?? 0} </p>
            </div>
        ))}
        <p>Rata-rata nilai CPMK 2 : <span style={{color:'blue'}}>{Math.round(calculateAverage("cpmk_2"))}</span></p>
        <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Verifikasi nilai CPMK 2 :</p>
                <InputNumber style={{width:'75px',margin:'0 5px'}} 
                min={0} 
                max={100}  
                value={values["cpmk_2"]}
                onChange={(value) => handleInputChange("cpmk_2", value)}/>
            <p style={{margin:'5px 0',fontStyle:'italic',color:'gray'}}>* Masukkan nilai dari 1-100</p>
        </div>
        <Button type="primary" onClick={() => handleCopyAverage("cpmk_2")}><CopyOutlined /> Kopi nilai CPMK 2</Button>
        <Divider style={{margin:'10px 0'}} />

        {/* CPMK 3 */}
        <h4>CPMK 3. Mahasiswa mampu melakukan praktik keinsinyuran dan mampu memecahkan permasalahan di tempat kerja praktik.</h4>
        {dsnData.map((item) => (
            <div key={item.id_dosen}>
              <p> - Nilai dari {item.dosen_name} : {item.mk_praktik_keinsinyuran.nilai_cpmk.cpmk_3 ?? 0} </p>
            </div>
        ))}
        <p>Rata-rata nilai CPMK 3 : <span style={{color:'blue'}}>{Math.round(calculateAverage("cpmk_3"))}</span></p>
        <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Verifikasi nilai CPMK 3 :</p>
                <InputNumber style={{width:'75px',margin:'0 5px'}} 
                min={0} 
                max={100}  
                value={values["cpmk_3"]}
                onChange={(value) => handleInputChange("cpmk_3", value)}/>
            <p style={{margin:'5px 0',fontStyle:'italic',color:'gray'}}>* Masukkan nilai dari 1-100</p>
        </div>
        <Button type="primary" onClick={() => handleCopyAverage("cpmk_3")}><CopyOutlined /> Kopi nilai CPMK 3</Button>
        <Divider style={{margin:'10px 0'}} />

        {/* CPMK 4 */}
        <h4>CPMK 4. Mahasiswa mampu membuat laporan keinsinyuran secara lengkap.</h4>
        {dsnData.map((item) => (
            <div key={item.id_dosen}>
              <p> - Nilai dari {item.dosen_name} : {item.mk_praktik_keinsinyuran.nilai_cpmk.cpmk_4 ?? 0} </p>
            </div>
        ))}
        <p>Rata-rata nilai CPMK 4 : <span style={{color:'blue'}}>{Math.round(calculateAverage("cpmk_4"))}</span></p>
        <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Verifikasi nilai CPMK 4 :</p>
                <InputNumber style={{width:'75px',margin:'0 5px'}} 
                min={0} 
                max={100}  
                value={values["cpmk_4"]}
                onChange={(value) => handleInputChange("cpmk_4", value)}/>
            <p style={{margin:'5px 0',fontStyle:'italic',color:'gray'}}>* Masukkan nilai dari 1-100</p>
        </div>
        <Button type="primary" onClick={() => handleCopyAverage("cpmk_4")}><CopyOutlined /> Kopi nilai CPMK 4</Button>
        <Divider style={{margin:'10px 0'}} />

        {/* CPMK 5 */}
        <h4>CPMK 5. Mahasiswa mampu mempresentasikan dan mengkomunikasikan hasil kerja keinsinyurannya.</h4>
        {dsnData.map((item) => (
            <div key={item.id_dosen}>
              <p> - Nilai dari {item.dosen_name} : {item.mk_praktik_keinsinyuran.nilai_cpmk.cpmk_5 ?? 0} </p>
            </div>
        ))}
        <p>Rata-rata nilai CPMK 5 : <span style={{color:'blue'}}>{Math.round(calculateAverage("cpmk_5"))}</span></p>
        <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Verifikasi nilai CPMK 5 :</p>
                <InputNumber style={{width:'75px',margin:'0 5px'}} 
                min={0} 
                max={100}  
                value={values["cpmk_5"]}
                onChange={(value) => handleInputChange("cpmk_5", value)}/>
            <p style={{margin:'5px 0',fontStyle:'italic',color:'gray'}}>* Masukkan nilai dari 1-100</p>
        </div>
        <Button type="primary" onClick={() => handleCopyAverage("cpmk_5")}><CopyOutlined /> Kopi nilai CPMK 5</Button>
        <Divider style={{margin:'10px 0'}} />

        <p style={{margin:'5px 0'}}>Nilai Akhir dalam Angka : <span style={{color:'blue'}}>{finalValue?.toFixed(0)}</span></p>
        <p style={{margin:'5px 0'}}>Nilai Akhir dalam Huruf : <span style={{color:'blue'}}>{finalLetterValue}</span></p>
        {/* <Button style={{margin:'20px auto',display: "flex", justifyContent: "center"}} type='primary'>Save and Continue</Button> */}
        <Button style={{margin:'20px auto',display: "flex", justifyContent: "center"}} onClick={onFinish} type='primary'>Save and Continue</Button>

    </div>
    </ConfigProvider>
);
};

export default VerifNilaiPraktikInsinyur;
