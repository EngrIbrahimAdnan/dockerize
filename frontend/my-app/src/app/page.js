import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./components/Home/HomePage";
import FeaturePageComponents from "./feature/page";
export default function Home() {
  return (
    <div>
      <NavBar />
      <HomePage /> {/* Use the renamed component */}
    </div>
  );
}
