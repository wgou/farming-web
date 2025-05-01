"use client"

export default function BoldTypographyExample() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white py-20 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-5xl font-black leading-none mb-4">
            MAKE A<br />
            STATEMENT
          </h1>
          <p className="text-gray-400 text-lg">Bold typography creates visual hierarchy and impact</p>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-md mx-auto">
          <div className="my-12">
            <h2 className="text-8xl font-bold text-gray-200 mb-4 leading-none">01</h2>
            <h3 className="text-2xl font-bold -mt-8 mb-3">Large Headlines</h3>
            <p className="text-gray-600">
              Oversized text creates visual impact and draws attention to important content.
            </p>
          </div>

          <div className="my-12">
            <h2 className="text-3xl font-bold mb-6 uppercase tracking-widest">CONTRAST</h2>
            <div className="bg-black text-white p-6 rounded-lg">
              <p className="text-xl font-light">
                Using <span className="font-bold">contrast</span> in weight and color to create{" "}
                <span className="text-yellow-400">visual interest</span> and guide the user's eye.
              </p>
            </div>
          </div>

          <div className="my-12">
            <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Creative Type
            </h2>
            <p className="text-gray-600">
              Experimental typography and creative text treatments can make your mobile design stand out.
            </p>
          </div>

          <div className="my-12 border-l-4 border-black pl-4">
            <p className="text-2xl font-serif italic">"Typography is what language looks like."</p>
            <p className="text-gray-500 mt-2">— Ellen Lupton</p>
          </div>

          <button className="w-full py-4 bg-black text-white text-xl font-bold uppercase tracking-wider">
            Explore More
          </button>
        </div>
      </main>
    </div>
  )
}
