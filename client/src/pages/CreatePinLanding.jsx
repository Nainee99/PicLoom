"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CreatePinLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="max-w-lg w-full text-center">
        {/* Image collage */}
        <div className="relative w-full h-64 mb-8">
          {/* Pink sunglasses image */}
          <div className="absolute left-[10%] top-[20%] w-32 h-32 rounded-2xl overflow-hidden transform -rotate-6 shadow-lg">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPWNfBUvBR04tO9dK_3I2zG-uA98JAEen2Ohe4Zh6N2NvjXlxWKyY_BNoyPk4Lv2CGg-Y&usqp=CAU"
              alt="Sunglasses"
              className="w-full h-full object-cover bg-pink-200"
            />
          </div>

          {/* Blue sky image */}
          <div className="absolute left-[30%] top-[5%] w-36 h-36 rounded-2xl overflow-hidden transform rotate-3 shadow-lg">
            <img
              src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg"
              alt="Sky"
              className="w-full h-full object-cover bg-blue-200"
            />
          </div>

          {/* White building image */}
          <div className="absolute left-[45%] top-[15%] w-40 h-40 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6NqmjbHMP_zwaPQRRPnoMIWoTcAwVBsSxsg&s"
              alt="Building"
              className="w-full h-full object-cover bg-gray-100"
            />
          </div>

          {/* Yellow fashion image */}
          <div className="absolute left-[65%] top-[10%] w-32 h-32 rounded-2xl overflow-hidden transform rotate-6 shadow-lg">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-s7Svop4IjmwA0bdMzhdXHTq6ZJqGgHncbg&s"
              alt="Fashion"
              className="w-full h-full object-cover bg-yellow-200"
            />
          </div>

          {/* Food image */}
          <div className="absolute left-[20%] top-[10%] w-28 h-28 rounded-2xl overflow-hidden transform -rotate-3 shadow-lg">
            <img
              src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-craig-122861-376464.jpg&fm=jpg"
              alt="Food"
              className="w-full h-full object-cover bg-orange-100"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">Start creating Pins</h1>
        <p className="text-gray-600 mb-8">
          Drafts expire 30 days after you've first saved them. After that,
          they're deleted.
        </p>

        <Button
          onClick={() => navigate("/create-pin/form")}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
        >
          Create new
        </Button>
      </div>
    </div>
  );
};

export default CreatePinLanding;
