import { suggestions } from "@/app/_components/hero";

function EmptyBoxState({ onSelectOption }: any) {
  return (
    <div className='mt-7'>
      <h2 className='font-bold text-3xl text-center'>
        Start Planning new <strong className='text-primary'>Trip</strong> using AI
      </h2>

      <p className='text-center text-gray-400 mt-2'>
        Discover personalized travel itineraries, find the best destination and plan your dream vacation effortlessly with the power of AI. Let our smart assistant do the hard work while you enjoy the journey.
      </p>

      <div className='flex flex-col gap-5 mt-7'>
        {suggestions.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelectOption(item.title)}
            className='flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:border-primary hover:text-primary'
          >
            {item.icon}
            <h2 className='text-lg'>{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmptyBoxState;
