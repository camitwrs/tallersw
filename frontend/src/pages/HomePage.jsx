import React from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import nutria_nobg from "../assets/nutria_nobg.png";

import { Link } from "react-router-dom"; 

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-white flex justify-center items-center">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between lg:px-12">
          
          <div className="lg:pl-12">
            <h1 className="text-5xl font-bold text-black mb-4">
              Los Educadores de Emprendimiento <br />
              son Mamíferos Marinos.
           </h1>
            <p className="text-3xl text-p-Gray mb-6">
              Descubre con nosotros tu perfil educativo.
            </p>
            <Link to="/cuestionario" className="bg-p-Blue text-white px-6 py-5 rounded-full text-lg inline-block hover:bg-blue-800 transition-colors">
            &gt;&gt; Haz el cuestionario aquí
            </Link>
          </div>

          <div>
            <img src={nutria_nobg} alt="Mamífero Marino" className="w-auto h-full" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;