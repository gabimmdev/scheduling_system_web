"use client";
import Home from "./pages/home/Home";
import NavBar from "./components/navbar/NavBar";

export default function HomePage() {
  return (
    <>
  <NavBar active={"Home"}/>
  <Home/>
  </>
  );
}
