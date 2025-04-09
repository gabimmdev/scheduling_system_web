"use client";
import Home from "./pages/home/Home";
import NavBar from "./components/NavBar/NavBar";

export default function HomePage() {
  return (
    <>
      <NavBar active={"home"}/>
      <Home/>
    </>
  );
}
