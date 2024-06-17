import { ReactComponent as LogoIcon } from '../assets/svg/rs_school_js.svg';
// import ivan from '../assets/team/ivan.jpg';
function About() {
  return (
    <main>
      <h1 className="text-7xl text-sky-600 font-black mx-0">About us</h1>
      <div className="text-4xl font-extralight text-sky-700">Welcome to our bookshop!</div>
      <div className="text-sky-800 py-8 font-light">
        <p>
          <span>
            Our e-commerce platform created by a dedicated team of two passionate developers. We
            believe that&nbsp;
          </span>
          <span className="text-sky-600">
            every online shopping experience should be seamless, enjoyable, and secure
          </span>
          .
        </p>
        <p className="pt-4">
          As a small team, we understand the value of time and effective collaboration. We take
          attention to detail and make sure that everything goes smoothly. From the sleek design of
          our website to the authentification processing system, every aspect of our e-commerce
          platform has been carefully designed and tested to ensure a flawless experience for our
          users.
        </p>
      </div>
      <div className="flex gap-4 justify-center flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-48">
          <img
            className="w-44 h-44 py-4 object-cover"
            alt="Ivan"
            src={require('../assets/team/ivan.jpg')}
          />
          <div className="h-full">
            <div className="text-sky-800 font-bold text-lg">
              <a href="https://github.com/Ivan-rom" target="_blank" rel="noreferrer">
                <img
                  src="https://github.com/tandpfun/skill-icons/raw/main/icons/Github-Dark.svg"
                  alt="Ivan's Github"
                  className="w-4 inline object-cover -mt-1"
                />
              </a>
              &nbsp;Ivan
            </div>
            <div className="italic font-light text-sky-600"> Team Lead & Frontent Developer</div>
          </div>
          <div className="border-t border-gray-200 mt-4">
            <ul className="list-disc pl-8 font-light text-gray-500 text-sm mt-4">
              <li> Team building </li>
              <li> Basket management </li>
              <li> Product </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-48">
          <img
            className="w-44 h-44 py-4 object-cover"
            alt="Ekaterina"
            src={require('../assets/team/ekaterina.jpg')}
          />
          <div className="h-full">
            <div className="text-sky-800 font-bold text-lg">
              <a href="https://github.com/cryingsealpup" target="_blank" rel="noreferrer">
                <img
                  src="https://github.com/tandpfun/skill-icons/raw/main/icons/Github-Dark.svg"
                  alt="Ekaterina's Github"
                  className="w-4 inline object-cover -mt-1"
                />
              </a>
              &nbsp;Ekaterina
            </div>
            <div className="italic font-light text-sky-600">Frontent Developer</div>
          </div>
          <div className="border-t border-gray-200 mt-4">
            <ul className="list-disc pl-8 font-light text-gray-500 text-sm mt-4">
              <li> Architecture </li>
              <li> Profile management </li>
              <li> Authentification </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-sm border-t border-gray-200 text-gray-500 mt-4">
        <p className="flex items-center my-4 italic">
          Done with ❤️ for &nbsp;
          <a href="https://rs.school/courses/javascript-ru">
            <LogoIcon className="w-16" />
          </a>
        </p>
      </div>
    </main>
  );
}

export default About;
