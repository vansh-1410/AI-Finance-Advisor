const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {children}
    </div>
  );
};

export default AuthLayout;
