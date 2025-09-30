'use client';
import RotatingText from '../components/RotatingText'
import CircularGallery from '../components/CircularGallery'

export default function Home() {
  return (
    <>
      <div className="w-full h-screen bg-[url('/img/hero1.png')] bg-cover bg-center rounded-br-4xl rounded-bl-4xl border border-white/20  ">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-6xl font-bold text-center">
            We Influence &copy;
          </h1>
        </div>
      </div>
      
      <section className="w-full min-h-screen bg-black p-8">
        <div className="text-center w-full">
        <h2 className="text-4xl md:text-6xl font-semibolds text-white">We Influence</h2>
          <div className="flex items-center justify-center gap-4 text-4xl md:text-6xl font-semibold text-white">
            <h2>Your</h2>
            <div className="relative">
              <RotatingText
                texts={['Storytelling', 'Music', 'Art', 'Technology', 'Strategy', 'Design', 'Development', 'Marketing']}
                mainClassName="!px-4 !py-2 bg-blue-500 text-white overflow-hidden rounded-lg font-bold text-5xl"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            </div>
          </div>
        </div>
        <div style={{ height: '600px', position: 'relative' }}>
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
        </div>
      </section>
    </>
  );
}
