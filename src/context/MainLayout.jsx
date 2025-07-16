import React from 'react';
import { Outlet } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

function MainLayout() {
  return (
    <>
      <LanguageSwitcher />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;