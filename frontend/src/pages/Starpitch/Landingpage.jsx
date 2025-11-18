import Spline from '@splinetool/react-spline';

export default function Landingpage() {
  return (
    <div className="w-full h-screen bg-gray-900 relative">
      <div className="absolute inset-0 w-full h-full flex justify-center items-center z-10">
        <h1
          className="font-[Modak] text-white text-5xl md:text-[12rem] drop-shadow-lg select-none"
          style={{ fontFamily: "'Modak', cursive" }}
        >
          StarPitch 3.0
        </h1>
      </div>
      <div className="w-full h-full">
        <Spline scene="https://prod.spline.design/91NvPoTGv5JkxAgS/scene.splinecode" />
      </div>
      <div className="w-full h-full"></div>
    </div>
  );
}