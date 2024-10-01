// src/app/page.tsx

import SignUpForm from "@/components/auth/Signup";

const HomePage: React.FC = () => {
  return (
    <div className=" bg-[#0a0a0a] mt-20 flex justify-center items-center">
      <div>
      <SignUpForm/>
      </div>
      
    </div>
  );
};

export default HomePage;
