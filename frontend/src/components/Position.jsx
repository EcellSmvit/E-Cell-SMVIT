import React from 'react'

function Position() {
  return (
    <div className="w-full h-auto text-black bg-[#F9FAFB] p-4">
      <div className="flex justify-center items-center p-4 text-4xl font-medium text-center sm:text-6xl ">
        <h1>
             Team Roles
        </h1>
      </div>
      <div className="flex flex-col gap-8 justify-center items-center px-2 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 gap-8 w-full max-w-6xl sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center p-6 mx-auto w-full max-w-xs bg-white rounded-xl border border-gray-200 shadow-lg sm:p-8">
            <div className="mb-6">
              <img
                src="https://ik.imagekit.io/es6xialea/undraw_logistics_8vri.svg?updatedAt=1759302779518"
                alt="Operational"
                className="object-contain w-32 h-24 sm:w-40 sm:h-32"
              />
            </div>
            <h2 className="mb-2 text-xl font-bold text-center sm:text-2xl">Operations</h2>
            <p className="text-base text-center text-gray-700">
              Arranging logistics and permissions, documenting operations and events.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 mx-auto w-full max-w-xs bg-white rounded-xl border border-gray-200 shadow-lg sm:p-8">
            <div className="mb-6">
              <img
                src="https://ik.imagekit.io/es6xialea/undraw_amusement-park_j8fe.svg?updatedAt=1759303653333"
                alt="Events and PR"
                className="object-contain w-32 h-24 sm:w-40 sm:h-32"
              />
            </div>
            <h2 className="mb-2 text-xl font-bold text-center sm:text-2xl">Events & Marketing</h2>
            <p className="text-base text-center text-gray-700">
              Conducting events, gathering and influencing people.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 mx-auto w-full max-w-xs bg-white rounded-xl border border-gray-200 shadow-lg sm:p-8">
            <div className="mb-6">
              <img
                src="https://ik.imagekit.io/es6xialea/undraw_business-call_w1gr.svg?updatedAt=1759303653440"
                alt="Corporate Relations"
                className="object-contain w-32 h-24 sm:w-40 sm:h-32"
              />
            </div>
            <h2 className="mb-2 text-xl font-bold text-center sm:text-2xl">Corporate Relations</h2>
            <p className="text-base text-center text-gray-700">
              Arranging sponsorships, making funding sources from companies.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 w-full max-w-4xl sm:grid-cols-2">
          <div className="flex flex-col items-center p-6 mx-auto w-full max-w-xs bg-white rounded-xl border border-gray-200 shadow-lg sm:p-8">
            <div className="mb-6">
              <img
                src="https://ik.imagekit.io/es6xialea/undraw_social-dashboard_81sv.svg?updatedAt=1759303653342"
                alt="Marketing Manager"
                className="object-contain w-32 h-24 sm:w-40 sm:h-32"
              />
            </div>
            <h2 className="mb-2 text-xl font-bold text-center sm:text-2xl">Tech</h2>
            <p className="text-base text-center text-gray-700">
              Developing and Maintaing Website
            </p>
          </div>
          <div className="flex flex-col items-center p-6 mx-auto w-full max-w-xs bg-white rounded-xl border border-gray-200 shadow-lg sm:p-8">
            <div className="mb-6">
              <img
                src="https://ik.imagekit.io/es6xialea/undraw_designer-avatar_n5q8.svg?updatedAt=1759303653254"
                alt="Design Media"
                className="object-contain w-32 h-24 sm:w-40 sm:h-32"
              />
            </div>
            <h2 className="mb-2 text-xl font-bold text-center sm:text-2xl">Design and Media</h2>
            <p className="text-base text-center text-gray-700">
              Creating posters, videos, and digital content for events and promotions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Position