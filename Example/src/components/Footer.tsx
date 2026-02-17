const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Viktor Yevtushenko
        </p>
        <p className="text-xs text-muted-foreground">
          Engineered with precision.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
