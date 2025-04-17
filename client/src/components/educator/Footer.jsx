const Footer = () => {
  return (
    <footer className="md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t">
      <div>
        <img className="hidden md:block w-20" alt="logo" />
      </div>
      <div className="h-7 w-px bg-gray-50/60 hidden md:block" />
      <p className="py-4 text-center text-xs md:text-sm text-gray-500">
        Copyright 2025 @ Arun kumae. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;

