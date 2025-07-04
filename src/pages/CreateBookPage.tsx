import AddBookForm from "@/components/AddBookForm";
import SplitText from "@/ui/SplitText";

const CreateBookPage = () => {

      const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

    return (
        <>
        <div className="flex justify-center items-center my-10">
            <SplitText
            text="Create Book"
            className="text-3xl font-bold"
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
        <AddBookForm/>
        </>
    );
};

export default CreateBookPage;