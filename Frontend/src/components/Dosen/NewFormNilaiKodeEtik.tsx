import React, { useContext, useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal, InputNumber, InputNumberProps } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { MhsInfoContext } from '../../pages/FaipDosenNilai'; // Import the context
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';

type AllMhsClaim = string[];

interface AllFilter {
  [key: string]: string[]; // each filter has an array of prefixes
}

interface AverageResults {
  [key: string]: number; // each filter key will map to its average score
}

const FormulirDua: React.FC = () => {
//kumpulan state
    const { formIdD } = useParams<{ formIdD: string | undefined }>();
    const nimMhs = useContext<string | undefined>(MhsInfoContext);

    const [finalValue, setFinalValue] = useState<number | null>(0);//nilai_akhir_angka
    const [finalLetterValue, setFinalLetterValue] = useState("E");//nilai_akhir_huruf
    const [values, setValues] = useState<{ [key: string]: number }>({
        cpmk_1: 0,
        cpmk_2: 0,
        cpmk_3: 0,
      });
    const [allMhsClaim, setAllMhsClaim] = useState<AllMhsClaim>([]);
    const [allFilter, setAllFilter] = useState<AllFilter>({});
    const [averageResults, setAverageResults] = useState<AverageResults>({});
    
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

            const responseMhsClaim = await axios.get(`/form-penilaian/dsn/claim-mhs?sid=${nimMhs}&uid=${userId}`,config);
            // /form-penilaian/dsn/update-nilai?uid=1998200345678&pid=123456789&ft=kode-etik
            const mhsClaim = responseMhsClaim.data.data;
            setAllMhsClaim(mhsClaim);
            
            const responseFormFilter = await axios.get(`/form-penilaian/dsn/form-filter?uid=${userId}&ft=kode-etik`,config);
            
            const formFilter = responseFormFilter.data.data.mk_kode_etik;
            setAllFilter(formFilter);
            
            const responseMhsGrading = await axios.get(`/form-penilaian/dsn/update-nilai?uid=${userId}&pid=${formIdD}&ft=kode-etik`,config);
            const mhsGrading = responseMhsGrading.data.data

            if (mhsGrading && mhsGrading.mk_kode_etik.nilai_cpmk){
              setValues(mhsGrading.mk_kode_etik.nilai_cpmk);
            }
        } else {
            console.error('User not found');
        }
        } catch (error) {
          console.error('Error fetching data'); 
        }
      };
      // console.log("[VALUES] = " + values)
      
    useEffect(() => {
        if (allMhsClaim.length && Object.keys(allFilter).length) {
          const calculateAveragePerFilter = () => {
            const results: AverageResults = {};
    
            Object.keys(allFilter).forEach(filterKey => {
              const prefixes = allFilter[filterKey];
    
              // Evaluate each prefix, 100 if matched, 0 otherwise
              const scores = prefixes.map(prefix =>
                allMhsClaim.some(item => item.startsWith(prefix)) ? 100 : 0
              );
    
              // Calculate average by summing scores and dividing by the number of prefixes
              const average = Math.round(scores.reduce((sum: number, value: number) => sum + value, 0) / scores.length);
              results[filterKey] = average;
            });
    
            setAverageResults(results);
          };
    
          calculateAveragePerFilter();
        }
      }, [allMhsClaim, allFilter]);

    const onFinish = async () => { //fungsi submit form //NEED API POST
      try{
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;

          const formData = {
          nilaiRekomendasiCpmk:averageResults,
          nilaiCpmk:values,
          nilaiAngka:finalValue,
          nilaiHuruf:finalLetterValue
        }
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

          await axios.patch(`/form-penilaian/dsn/update-nilai?uid=${userId}&pid=${formIdD}&ft=kode-etik`,formData,config);
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
        MK - Kode Etik 
        {/* <span style={{color:'#6b7aa1'}}>(W.1.2.1-8)</span> */}
        </h3>

        <div style={{display:'flex',flexDirection:'row'}}>
        {/* <p style={{margin:'5px 0'}}>Rekomendasi Nilai : <span style={{color:'blue'}}>{averageGrade}</span></p> */}
        </div>

        {/* CPMK 1 */}
        <h4>CPMK 1. Mahasiswa mampu menjelaskan etika dan kode etik, profesionalisme, tata laku dan ciri khas dalam bidang profesi keinsinyuran sesuai kaidah etika profesi </h4>
        <p style={{margin:'5px 0'}}>Rekomendasi Nilai : <span style={{color:'blue'}}>{averageResults['cpmk_1'] || 0}</span></p>
        <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Nilai CPMK 1 :</p>
                <InputNumber style={{width:'75px',margin:'0 5px'}} 
                min={0} 
                max={100}  
                value={values["cpmk_1"]}
                onChange={(value) => handleInputChange("cpmk_1", value)}/>
            <p style={{margin:'5px 0',fontStyle:'italic',color:'gray'}}>* Masukkan nilai dari 1-100</p>
        </div>
        <Divider style={{margin:'10px 0'}} />

        {/* CPMK 2 */}
        <h4>CPMK 2. Mahasiswa mampu menerapkan etika dan kode etik, profesionalisme, tata laku dan ciri khas dalam bidang profesi keinsinyuran sesuai kaidah etika profesi </h4>
        <p style={{margin:'5px 0'}}>Rekomendasi Nilai : <span style={{color:'blue'}}>{averageResults['cpmk_2'] || 0}</span></p>
        <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Nilai CPMK 2 :</p>
            <InputNumber style={{width:'75px',margin:'0 5px'}} 
                min={0} 
                max={100}  
                value={values["cpmk_2"]}
                onChange={(value) => handleInputChange("cpmk_2", value)}/>
            <p style={{margin:'5px 0',fontStyle:'italic',color:'gray'}}>* Masukkan nilai dari 1-100</p>
        </div>
        <Divider style={{margin:'10px 0'}} />

        {/* CPMK 3 */}
        <h4>CPMK 3. Mahasiswa mampu menyelesaiakan masalah berperilaku sesuai dengan etika profesi keinsinyuran dengan mengemukakan pendapat baik lisan maupun tulisan</h4>
        <p style={{margin:'5px 0'}}>Rekomendasi Nilai : <span style={{color:'blue'}}>{averageResults['cpmk_3'] || 0}</span></p>
        <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Nilai CPMK 3 :</p>
            <InputNumber style={{width:'75px',margin:'0 5px'}} 
                min={0} 
                max={100}  
                value={values["cpmk_3"]}
                onChange={(value) => handleInputChange("cpmk_3", value)}/>            
            <p style={{margin:'5px 0',fontStyle:'italic',color:'gray'}}>* Masukkan nilai dari 1-100</p>
        </div>
        <Divider style={{margin:'10px 0'}} />

        <p style={{margin:'5px 0'}}>Nilai Akhir dalam Angka : <span style={{color:'blue'}}>{finalValue?.toFixed(0)}</span></p>
        <p style={{margin:'5px 0'}}>Nilai Akhir dalam Huruf : <span style={{color:'blue'}}>{finalLetterValue}</span></p>
        {/* <Button style={{margin:'20px auto',display: "flex", justifyContent: "center"}} type='primary'>Save and Continue</Button> */}
        <Button style={{margin:'20px auto',display: "flex", justifyContent: "center"}} onClick={onFinish} type='primary'>Save and Continue</Button>

    </div>
    </ConfigProvider>
);
};

export default FormulirDua;
