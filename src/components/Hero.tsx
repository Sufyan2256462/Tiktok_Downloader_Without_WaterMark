import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Link, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TIKTOK_URL_REGEX = /^https?:\/\/(www\.|vm\.|vt\.)?tiktok\.com\/.+/i;

interface VideoResult {
  play: string;
  hdplay?: string;
  cover: string;
  title: string;
  music_info?: { title: string };
  author?: { nickname: string; avatar: string };
}

interface HeroProps {
  onResult: (result: VideoResult) => void;
  onError: (error: string) => void;
  onLoading: (loading: boolean) => void;
}

const Hero = ({ onResult, onError, onLoading }: HeroProps) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url.trim()) {
      toast({ title: "Please paste a TikTok URL", variant: "destructive" });
      return;
    }

    if (!TIKTOK_URL_REGEX.test(url.trim())) {
      toast({ title: "Invalid TikTok URL", description: "Please enter a valid TikTok video link.", variant: "destructive" });
      return;
    }

    setLoading(true);
    onLoading(true);
    onError("");

    try {
      const { data, error } = await supabase.functions.invoke("download", {
        body: { url: url.trim() },
      });

      if (error) throw new Error(error.message);
      if (!data?.success) throw new Error(data?.error || "Failed to process video");

      const videoData = data.data?.data;
      if (!videoData) throw new Error("No video data returned");

      onResult({
        play: videoData.play || videoData.wmplay,
        hdplay: videoData.hdplay,
        cover: videoData.cover || videoData.origin_cover,
        title: videoData.title || "TikTok Video",
        music_info: videoData.music_info,
        author: videoData.author,
      });

      toast({ title: "Video ready!", description: "Your video is ready to download." });
    } catch (err: any) {
      const msg = err?.message || "Something went wrong.";
      onError(msg);
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Download TikTok Videos{" "}
            <span className="neon-text">Without Watermark</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl mb-10 max-w-xl mx-auto">
            Paste a TikTok link and get the HD video instantly — free, fast, no watermark.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto"
        >
          <div className="relative flex-1">
            <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste TikTok video URL here..."
              className="pl-10 h-12 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              onKeyDown={(e) => e.key === "Enter" && handleDownload()}
              disabled={loading}
            />
          </div>
          <Button
            onClick={handleDownload}
            disabled={loading}
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all hover:shadow-[0_0_25px_-5px_hsl(var(--neon-glow)/0.4)]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
