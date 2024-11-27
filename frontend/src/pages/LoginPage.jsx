import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Por favor, introduce un correo válido.");
    } else {
      setEmailError("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 px-4">
      {/* Encabezado responsive */}
      <header className="absolute top-4 left-4">
        <Link
          to="/"
          className="flex items-center bg-YankeesBlue text-white font-bold py-2 px-4 rounded hover:bg-YankeesBlueDark transition duration-300"
        >
          <img
            src={logo}
            alt="Logo del Proyecto"
            className="h-8 w-auto mr-2"
          />
          <ArrowBackIcon className="h-6 w-6" />
        </Link>
      </header>

      {/* Título responsive */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-YankeesBlue mb-4 sm:mb-6 md:mb-8 text-center">
        Bienvenido
      </h1>

      {/* Formulario responsive */}
      <form className="bg-white shadow-md rounded px-6 sm:px-8 md:px-12 pt-6 pb-8 w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Campo de correo */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm md:text-base font-bold mb-2"
            htmlFor="email"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className={`shadow appearance-none border ${
              emailError ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Ingresa tu correo"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && (
            <p className="text-red-500 text-xs sm:text-sm mt-2">
              {emailError}
            </p>
          )}
        </div>

        {/* Campo de contraseña */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm md:text-base font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <div className="flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="shadow appearance-none border rounded-l w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-r focus:outline-none focus:ring focus:ring-gray-300"
            >
              {showPassword ? (
                <VisibilityOffIcon className="h-5 w-5" />
              ) : (
                <VisibilityIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Botón de inicio de sesión */}
        <div className="flex justify-center">
          <Link
            to="/ilustrador"
            className="w-full text-center bg-YankeesBlue text-white font-bold py-2 sm:py-3 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-YankeesBlueDark transition duration-300"
          >
            Iniciar Sesión
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
