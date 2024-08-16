import './App.scss';
import React from 'react';
import DefaulLayout from './core';

import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from './route';
import NotFoundPage from '@pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            {AppRoutes.map((item, index) => {
                const Layout = item.defaultLayout ? DefaulLayout : Fragment;
                const Page = item.Component;

                return (
                    <Route 
                        key={index}
                        path={item.path}
                        element={
                            <Layout>
                                <Page />
                            </Layout>
                        }
                    />
                )
            })}
            <Route
                path='*'
                element={<NotFoundPage />}
            />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
