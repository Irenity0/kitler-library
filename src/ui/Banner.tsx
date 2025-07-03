import Orb from "@/ui/Orb";
import SplitText from "@/ui/SplitText";

const Banner = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="relative w-full h-[650px] overflow-hidden">
      {/* Orb background with z-0 */}
      <div className="absolute inset-0 z-0">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none" />

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start pt-[240px] text-center text-neutral-200 z-20">
        <div className="mb-4">
          <SplitText
            text="Kitler Library"
            className="text-5xl font-bold"
            duration={0.3}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>
        <div>
          <SplitText
            text="Where curiosity meets the digital shelves."
            className="text-xl font-medium"
            duration={0.5}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;