const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-xl mx-auto p-8 flex  flex-col  justify-center min-h-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
