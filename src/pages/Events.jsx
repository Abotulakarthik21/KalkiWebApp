import one from "../assets/1.jpg";
import two from "../assets/2.jpg";
import three from "../assets/3.jpg";
import four from "../assets/4.jpg";
import five from "../assets/5.jpg";

import ten from "../assets/10.jpg";
import six from "../assets/6.jpg";
import seven from "../assets/7.jpg";
import eight from "../assets/8.jpg";
import nine from "../assets/9.jpg";

import ev1 from '../assets/gantletOfGames/ev1.jpg'
import ev2 from '../assets/gantletOfGames/ev2.jpg'
import ev3 from '../assets/gantletOfGames/ev3.jpg'
import ev4 from '../assets/gantletOfGames/ev4.jpg'
import ev5 from '../assets/gantletOfGames/ev5.jpg'
import ev6 from '../assets/gantletOfGames/ev6.jpg'
import ev7 from '../assets/gantletOfGames/ev7.jpg'
import ev8 from '../assets/gantletOfGames/ev8.jpg'
import ev9 from '../assets/gantletOfGames/ev9.jpg'

const Events = () => {
  return (
    <div className="px-[30px] md:px-40">
      <div className="mt-[120px] sm:mt-[150px]">
        
        <h1 className="text-center text-3xl font-bold md:text-6xl mt-2 mb-6 md:mb-20">
          Our Event <span className="text-blue-800">Highlights </span>🌟
        </h1>

        <h1 className="text-center text-2xl font-bold md:text-5xl mt-14 mb-6 md:mb-20 md:mt-20">
          The <span className="text-blue-800">Gauntlet </span>of Games 🧩
        </h1>
        <div className="flex flex-wrap flex-row items-center justify-center gap-[30px] md:gap-[200px]">
          <div>
            <img
              src={ev7}
              className="rounded-3xl w-[680px] hover:scale-105 transition duration-300"
            />
          </div>
          <div>
            <p className="max-w-[600px] text-gray-800 text-[16px] sm:text-[22px]">
              {" "}
              <span className="text-blue-800">
                🎯 Where Strategy Meets Fun
              </span>{" "}
              <br />
              <b>Ganuntlet of Games</b> is our ultimate campus showdown of wit, strategy, and teamwork! 
              These images capture the electric atmosphere — from the packed auditorium buzzing with 
              excitement to the intense face-to-face challenges where participants strategize and compete. 
              With multiple fun and engaging games, the event brings students together for a day filled with laughter, 
              problem-solving, and friendly rivalry. <br />
              Whether you're here to participate or just cheer your friends on, Ganuntlet of Games is where 
              unforgettable memories are made! ✨
            </p>
          </div>
        </div>
        <div className="flex flex-wrap flex-row items-center justify-center gap-[30px] md:gap-[200px] mt-7 sm:mt-[100px]">
          <div>
            <p className="max-w-[600px] text-gray-800 text-[16px] sm:text-[22px]">
              {" "}
              <span className="text-blue-800">
                🎮 The Spirit of Play, The Thrill of Victory{" "} <br />
              </span>
              ✨ Step into the thrill of <b>Ganuntlet of Games</b> — an action-packed event that turns the campus into a 
              hub of competition and fun! The buzzing lecture hall, eager participants, and collaborative challenges
               create an atmosphere of excitement and teamwork. From quick-thinking puzzles to interactive tasks, 
               this event is all about testing skills, bonding with peers, and enjoying every moment. <br />
               Get ready to challenge your mind, cheer for your friends, and make memories that last long after the games end! 🌟
            </p>
          </div>
          <div>
            <img
              src={ev9}
              className="rounded-3xl w-[630px] h-[400px] hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        <div className="mt-16 mb-20">
          <h2 className="text-center text-3xl font-semibold mb-6 text-blue-700 items-center">
            📸 More Event Moments
          </h2>

          <div className="flex space-x-6 px-4 overflow-x-auto  scrollbar-hide scrollbar-default">
            <img
              src={ev1}
              className="w-[510px] h-[250px] sm:h-[300px] rounded-2xl hover:scale-105 transition duration-300"
            />
            <img
              src={ev4}
              className="h-[250px] sm:h-[300px] sm:w-[510px] rounded-2xl flex-shrink-0 hover:scale-105 transition duration-300"
            />
            <img
              src={ev3}
              className="w-[510px] h-[250px] sm:h-[300px] rounded-2xl flex-shrink-0 hover:scale-105 transition duration-300"
            />
            <img
              src={ev6}
              className="w-[510px] h-[250px] sm:h-[300px] rounded-2xl flex-shrink-0 hover:scale-105 transition duration-300"
            />
            <img
              src={ev5}
              className="w-[510px] h-[250px] sm:h-[300px] rounded-2xl flex-shrink-0 hover:scale-105 transition duration-300"
            />
            <img
              src={ev8}
              className="w-[510px] h-[250px] sm:h-[300px] rounded-2xl flex-shrink-0 hover:scale-105 transition duration-300"
            />
            <img
              src={ev2}
              className="w-[510px] h-[250px] sm:h-[300px] rounded-2xl flex-shrink-0 hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold md:text-5xl mt-14 mb-6 md:mb-20 md:mt-20">
          The <span className="text-blue-800">Aarohan </span> 🌱
        </h1>
        <div className="flex flex-wrap flex-row items-center justify-center gap-[30px] md:gap-[200px]">
          <div>
            <img
              src={one}
              className="rounded-3xl w-[680px] hover:scale-105 transition duration-300"
            />
          </div>
          <div>
            <p className="max-w-[600px] text-gray-800 text-[16px] sm:text-[22px]">
              🚀 <b>Aarohan</b>, one of the flagship events of the{" "}
              <span className="text-blue-600">
                Kalki Personality Development Club
              </span>
              , brought together a large gathering of students for an engaging
              session filled with learning, interaction, and inspiration. The
              event focused on building confidence, communication, and
              leadership skills while fostering collaboration among peers.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap flex-row items-center justify-center gap-[30px] md:gap-[200px] mt-7 sm:mt-[100px]">
          <div>
            <p className="max-w-[600px] text-gray-800 text-[16px] sm:text-[22px]">
              ✨ <span className="text-blue-800">Rakhi Mam’s</span> Inspiring
              Seminar <br />
              As part of <b>Aarohan</b>, Rakhi ma’am delivered an engaging
              seminar that motivated students to focus on self-confidence,
              communication, and leadership skills. Her interactive session
              inspired participants to embrace personal growth while learning
              the importance of teamwork and collaboration. The seminar left
              students with a renewed sense of direction and the drive to
              achieve their goals.
            </p>
          </div>
          <div>
            <img
              src={three}
              className="rounded-3xl w-[630px] h-[300px] sm:h-[400px] hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-center text-3xl font-semibold mb-10 text-blue-700 items-center">
            📸 More Event Moments
          </h2>

          <div className="flex space-x-6 px-4 overflow-x-auto  scrollbar-hide scrollbar-default">
            <img
              src={two}
              className="w-[510px] h-[250px] sm:h-[300px] rounded-2xl flex-shrink-0 hover:scale-105 transition duration-300"
            />
            <img
              src={four}
              className="w-[510px] h-[250px] sm:h-[300px] rounded-2xl flex-shrink-0 hover:scale-105 transition duration-300"
            />
            <img
              src={five}
              className="w-[510px] h-[250px] sm:h-[300px] rounded-2xl flex-shrink-0 hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        <h1 className="text-center text-3xl font-bold md:text-6xl mt-14 mb-6 md:mb-20 md:mt-20">
          United in <span className="text-blue-800">Collaboration </span>🤝
        </h1>
        <h1 className="text-center text-2xl font-bold md:text-5xl mt-14 mb-6 md:mb-20 md:mt-20">
          The <span className="text-blue-800">Visthara </span> 🎭
        </h1>
        <div className="flex flex-wrap flex-row items-center justify-center gap-[30px] md:gap-[200px]">
          <div>
            <img
              src={six}
              className="rounded-3xl w-[680px] hover:scale-105 transition duration-300"
            />
          </div>
          <div>
            <p className="max-w-[600px] text-gray-800 text-[16px] sm:text-[22px]">
              🌸{" "}
              <span className="text-blue-800">
                Cultural Harmony in Collaboration
              </span>{" "}
              🎶
              <br />
              As part of our collaboration event <b>Visthara</b>, students
              showcased their vibrant talents through soulful performances that
              celebrated tradition, unity, and creativity. Dressed in colorful
              ethnic attire, the performers brought the stage to life with music
              and rhythm, reflecting the spirit of togetherness and cultural
              pride. This moment beautifully highlighted how collaboration goes
              beyond activities—it creates lasting memories and shared
              experiences. ✨
            </p>
          </div>
        </div>
        <div className="flex flex-wrap flex-row items-center justify-center gap-[30px] md:gap-[200px] mt-7 sm:mt-[100px]">
          <div>
            <p className="max-w-[600px] text-gray-800 text-[16px] sm:text-[22px]">
              🎭{" "}
              <span className="text-blue-800">
                Theatrical Brilliance on Stage{" "}
              </span>
              ✨ As part of the collaboration event <b>Visthara</b>, students
              presented a powerful skit that blended tradition, storytelling,
              and creativity. With expressive performances and vibrant costumes,
              they brought mythological characters and cultural values to life,
              leaving the audience deeply engaged. This act beautifully captured
              the essence of art as a medium of expression and unity. 🌟
            </p>
          </div>
          <div>
            <img
              src={seven}
              className="rounded-3xl w-[630px] h-[400px] hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        <div className="mt-16 mb-20">
          <h2 className="text-center text-3xl font-semibold mb-6 text-blue-700 items-center">
            📸 More Event Moments
          </h2>

          <div className="flex space-x-6 px-4 overflow-x-auto  scrollbar-hide scrollbar-default">
            <img
              src={nine}
              className="w-[510px] h-[250px] sm:h-[300px] rounded-2xl flex-shrink-0 hover:scale-105 transition duration-300"
            />
            <img
              src={eight}
              className="w-[510px] h-[250px] sm:h-[300px] rounded-2xl flex-shrink-0 hover:scale-105 transition duration-300"
            />
            <img
              src={ten}
              className="w-[510px] h-[250px] sm:h-[300px] rounded-2xl flex-shrink-0 hover:scale-105 transition duration-300"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Events;
