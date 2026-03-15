import { motion } from "framer-motion";
import { Download, Copy, User, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface VideoResult {
  play: string;
  hdplay?: string;
  cover: string;
  title: string;
  music_info?: { title: string };
  author?: { nickname: string; avatar: string };
}

const ResultCard = ({ result }: { result: VideoResult }) => {
  const downloadUrl = result.hdplay || result.play;

  const copyLink = () => {
    navigator.clipboard.writeText(downloadUrl);
    toast({ title: "Copied!", description: "Download link copied to clipboard." });
  };

  return (
    <motion.section
      id="result"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pb-16 px-4"
    >
      <div className="container mx-auto max-w-3xl">
        <div className="glass p-6 neon-border">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnail */}
            <div className="w-full md:w-48 h-64 md:h-auto rounded-xl overflow-hidden bg-secondary flex-shrink-0">
              <img
                src={result.cover}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2 line-clamp-3">
                  {result.title}
                </h3>
                {result.author && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{result.author.nickname}</span>
                  </div>
                )}
                {result.music_info?.title && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Music className="w-3.5 h-3.5" />
                    <span className="truncate">{result.music_info.title}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold hover:shadow-[0_0_25px_-5px_hsl(var(--neon-glow)/0.4)] transition-all"
                >
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Download HD
                  </a>
                </Button>
                <Button
                  variant="outline"
                  onClick={copyLink}
                  className="h-11 border-border/50 text-foreground hover:bg-secondary"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="mt-6 rounded-xl overflow-hidden bg-secondary">
            <video
              src={downloadUrl}
              controls
              poster={result.cover}
              className="w-full max-h-[500px]"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ResultCard;
