// src/app/page.tsx

import RequestForm from "../components/RequestForm";

const HomePage: React.FC = () => {
  return (
    <div className=" bg-[#0a0a0a] flex items-center justify-center ">
      <RequestForm />
    </div>
  );
};

export default HomePage;
