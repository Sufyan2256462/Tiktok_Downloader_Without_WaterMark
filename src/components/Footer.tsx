import { Download } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/30 py-8 px-4">
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Download className="w-4 h-4 text-primary" />
        <span className="font-display font-semibold text-foreground">TikSave</span>
      </div>
      <p>© {new Date().getFullYear()} TikSave. Not affiliated with TikTok.</p>
    </div>
  </footer>
);

export default Footer;
