import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResultCard from "@/components/ResultCard";
import ErrorAlert from "@/components/ErrorAlert";
import Loader from "@/components/Loader";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

interface VideoResult {
  play: string;
  hdplay?: string;
  cover: string;
  title: string;
  music_info?: { title: string };
  author?: { nickname: string; avatar: string };
}

const Index = () => {
  const [result, setResult] = useState<VideoResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (result) {
      setTimeout(() => {
        document.getElementById("result")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [result]);

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <Hero
        onResult={(r) => { setResult(r); setError(""); }}
        onError={setError}
        onLoading={setLoading}
      />
      {loading && <Loader />}
      <ErrorAlert message={error} />
      {result && !loading && <ResultCard result={result} />}
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
