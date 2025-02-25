import React from 'react';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import FaipMhs from './pages/FaipMhs';
import { start } from 'repl';
import { css } from '@emotion/react'
import Layouting from './pages/Layouting';
import { ConfigProvider, App } from 'antd';
import { Route, RouterProvider, createBrowserRouter,createRoutesFromElements,Navigate, BrowserRouter, Routes } from 'react-router-dom';
import FormOne from './components/FormOne';
import User from './pages/User';
import TabPage from './pages/TabPage';
import { useAppSelector } from './hooks/reduxHooks';
import ProtectedRoute from './pages/PRoute';
import ErrorPage from './pages/ErrorPage';
import NilaiMhs from './pages/NilaiMhs';
import Unauth from './pages/Unauth';
import UnderConstruct from './pages/underConstruct';
import FormMhs from './pages/FormMhs';
import FaipDosen from './pages/FaipDosen';
import FormDosen from './pages/FormDosen';
import FaipDosenNilai from './pages/FaipDosenNilai';
import FormAdmin from './pages/FormAdmin';
import FaipAdminAddAssesor from './pages/FaipAdminAddAssesor';
import FaipAdminAddFilter from './pages/FaipAdminAddFilter';
import FaipAdminVerif from './pages/FaipAdminVerif';
import FaipAdminVerifNilai from './pages/FaipAdminVerifNilai';
import VerifSubmitted from './components/Admin/VerifSubmitted';

function mainApp() {

  const router = createBrowserRouter(
      createRoutesFromElements(
        <>
        <Route element={<Login/>} path="/login"/>
        <Route element={<ProtectedRoute allowedRoles={['dosen','mahasiswa','admin']}><Layouting /></ProtectedRoute>} >
          <Route element={<Home/> } path="/" />
          <Route element={<Home/> } path="home"/>
          <Route element={<User/> } path="user"/>
          <Route element={<Unauth/> } path="unauthorized"/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']}><Layouting /></ProtectedRoute>} >
            <Route element={<FormAdmin /> } path="form/a/"/>
              <Route element={<FaipAdminVerif/>} path="form/a/verif-nilai" />
              <Route element={<FaipAdminVerifNilai/>} path="form/a/verif-nilai/edit/:formIdA" />
              <Route element={<VerifSubmitted/>} path="form/a/verif-nilai/:formIdA" />
              <Route element={<FaipAdminAddAssesor/>} path="form/a/faip/add-assesor" />
              <Route element={<FaipAdminAddFilter/>} path="form/a/faip/add-filter" />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['mahasiswa']}><Layouting /></ProtectedRoute>} >
            <Route element={<FormMhs/> } path="form/m/"/>
              {/* <Route element={<NilaiMhs/>} path="form/mahasiswa/nilai" /> */}
              <Route element={<FaipMhs/>} path="form/m/faip" />
              <Route element={<TabPage/>} path="form/m/faip/edit/:formId" />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['dosen']}><Layouting /></ProtectedRoute>} >
          <Route element={<FormDosen /> } path="form/d/"/>
          <Route element={<FaipDosen /> } path="form/d/faip"/>
          <Route element={<FaipDosenNilai /> } path="form/d/faip/edit/:formIdD"/>
        </Route>
        <Route element={<ErrorPage/>} path="*"/> 
        </>
      )
  );
  

  
  return (
      <App>
        <div className="App">
          <RouterProvider router={router} />
        </div>
        <div className="demo-badge">
        Demo version, not representative of the actual product.
      </div>
      </App>
  );
}

export default mainApp;
