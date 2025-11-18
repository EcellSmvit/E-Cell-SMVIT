import React from 'react'

function Eventdetails() {
  return (
    <div
      id="event"
      className="relative z-10 pointer-events-none w-full min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6"
    >
      <h1 className="font-black text-4xl md:text-5xl p-4 text-white text-center">Event Details</h1>
      <div className="text-white flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-10 lg:gap-16 w-full max-w-5xl px-0 sm:px-4 md:px-8 py-6 md:py-14 pointer-events-auto">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Round - 1 Date</h2>
          <p className="text-base md:text-xl text-justify">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa hic aliquid quidem tempora repudiandae dolores atque corrupti aut ea similique, ratione asperiores esse inventore nulla labore. Facilis doloribus a, nihil, quos suscipit laudantium eveniet quidem, autem harum molestiae amet dignissimos iusto optio voluptate sequi. Nulla eos adipisci fugiat quaerat a sit ipsam doloribus molestiae minus dicta soluta quod veritatis, veniam autem alias nesciunt. Laborum laudantium, vero neque dolore esse accusamus alias aliquam incidunt illo optio delectus et ducimus iure sint beatae rem necessitatibus labore itaque eveniet tenetur eum, provident repellendus nulla? Corporis doloremque accusantium animi pariatur harum repellat natus dolorum.
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Round - 2 Date</h2>
          <p className="text-base md:text-xl text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias error consequuntur animi quaerat earum deserunt, voluptatum facilis, quam quia incidunt maiores, laborum minima quae sunt itaque quod esse sequi consectetur nemo obcaecati hic libero laboriosam corrupti natus? Ex soluta sapiente quis repellat facilis deleniti nulla, odit nostrum consequuntur recusandae, laborum, perferendis eveniet veniam? Dolorem ex cum fuga libero hic quaerat, quam id nemo, sunt quae et rem provident quisquam neque dolores sit obcaecati, harum quasi unde autem fugiat corrupti laborum! Dicta consectetur atque mollitia in! Veniam dolores, animi, fugiat minima voluptates, tempora assumenda nam rem et aliquid voluptas possimus at.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Eventdetails