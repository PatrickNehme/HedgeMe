import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faUser, faPen, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const teamMembers = [
  {
    name: 'Team Member 1',
    image: 'https://via.placeholder.com/300x300?text=Team+Member+1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    twitter: 'https://twitter.com/username1',
    telegram: 'https://t.me/username1',
  },
  {
    name: 'Team Member 2',
    image: 'https://via.placeholder.com/300x300?text=Team+Member+2',
    description: 'Integer commodo porttitor justo, vitae tempor lectus.',
    twitter: 'https://twitter.com/username2',
    telegram: 'https://t.me/username2',
  },
  {
    name: 'Team Member 3',
    image: 'https://via.placeholder.com/300x300?text=Team+Member+3',
    description: 'Vivamus pellentesque tincidunt purus, sit amet.',
    twitter: 'https://twitter.com/username3',
    telegram: 'https://t.me/username3',
  },
  {
    name: 'Team Member 4',
    image: 'https://via.placeholder.com/300x300?text=Team+Member+4',
    description: 'Pellentesque habitant morbi tristique.',
    twitter: 'https://twitter.com/username4',
    telegram: 'https://t.me/username4',
  },
];




export default function Home() {
return (
<div className="bg-gray-100 min-h-screen">

<Head>
  <title>HedgeMe</title>
  <meta name="description" content="HedgeMe - Cryptocurrency Hedge Fund" />
  <link rel="icon" href="/favicon.ico" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet"/>
</Head>



{/* Header Menu */}

<div className="flex flex-col min-h-screen">
<header className="bg-white shadow-md w-full z-10">
  <nav className="container mx-auto py-0 md:py-0.5 flex justify-between items-center flex-wrap text-center">
    <div className="flex items-center">
      <img src="logo.PNG" alt="HedgeMe" className="w-80 h-70" />
    </div>
    <ul className="flex items-center space-x-2 md:space-x-10 text-gray-700 font-poppins items-center ml-0 md:ml-auto justify-end">
      <li className="nav-item">
        <a href="#about" className="nav-link hover:text-blue-600">About Us </a>
        <div className="separator"></div>
      </li>
      <li className="nav-item">
        <a href="#news" className="nav-link hover:text-blue-600">News</a>
        <div className="separator"></div>
      </li>
      <li className="nav-item">
        <a href="#team" className="nav-link hover:text-blue-600">Team</a>
        <div className="separator"></div>
      </li>
      <li className="nav-item">
        <a href="#contact" className="nav-link hover:text-blue-600">Contact Us</a>
      </li>
      <li className="flex items-center space-x-1">
        <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded bg-blue-500"><FontAwesomeIcon icon={faSignInAlt} className="mr-1"  style={{ backgroundColor: '#6878f2' }}/>Client Dashboard</a>
      </li>
    </ul>
  </nav>
</header>


<main className="py-12 flex-grow">

  {/* About Us */}

  <section id="about" className="container mx-auto px-4">
    <h2 className="text-2xl mb-4 header-gray">About Us</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p className="text-gray-700 mb-4">HedgeMe is a leading cryptocurrency hedge fund company dedicated to providing...</p>
        <p className="text-gray-700">We specialize in managing high-performing cryptocurrency portfolios for a diverse...</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/600x350" alt="About us" className="rounded-md shadow-md about-img "/>
      </div>
    </div>
  </section>

  {/* News */}

<section id="news" className="bg-gray-200 py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-2xl mb-4 header-gray">News</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    </div>
  </div>
</section>




  {/* Team */}

  <section id="team" className="container mx-auto px-4 py-12">
    <h2 className="text-2xl mb-4 header-gray">Our Team</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {teamMembers.map((member, index) => (
      <div key={index} className="flex flex-col items-center">
        <img src={member.image} alt={member.name} className="rounded-md shadow-md mb-4 w-72 h-72 object-cover"/>
        <p className="text-gray-700 mb-4 text-justify px-2">{member.description}</p>
        <div className="flex space-x-2">
          <a href={member.twitter} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} size="2x"/></a>
          <a href={member.telegram} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTelegram} size="2x"/></a>
        </div>
      </div>
      ))}
    </div>
  </section>

  {/* Contact Us */}

  <section id="contact" className="bg-gray-200 py-12">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl mb-4 header-gray">Contact Us</h2>
      <form className="bg-white rounded-lg shadow-md p-8">

      <div className="mb-4">
        <label htmlFor="fullname" className="block text-gray-700 font-semibold mb-2"><FontAwesomeIcon icon={faUser} className="mr-1" />Full Name</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          className="border border-gray-300 rounded-md w-full p-2 focus:border-blue-600 focus:outline-none input-white-text"
          placeholder="Your Full Name"
          required
          style={{ backgroundColor: '#f8f8f8' }}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2"><FontAwesomeIcon icon={faEnvelope} className="mr-1" />Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border border-gray-300 rounded-md w-full p-2 focus:border-blue-600 focus:outline-none input-white-text"
          placeholder="Your Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required
          style={{ backgroundColor: '#f8f8f8' }}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2"><FontAwesomeIcon icon={faPen} className="mr-1" />Subject</label>
        <input
          type="text"
          name="subject"
          id="subject"
          className="border border-gray-300 rounded-md w-full p-2 focus:border-blue-600 focus:outline-none input-white-text"
          placeholder="Subject"
          required
          style={{ backgroundColor: '#f8f8f8' }}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2"><FontAwesomeIcon icon={faPaperPlane} className="mr-1" />Message</label>
        <textarea
          name="message"
          id="message"
          rows="4"
          className="border border-gray-300 rounded-md w-full p-2 focus:border-blue-600 focus:outline-none input-white-text"
          placeholder="Your Message"
          required
          style={{ backgroundColor: '#f8f8f8' }}
        ></textarea>
      </div>

      <button type="submit" className="text-white font-semibold py-2 px-4 rounded-md focus:outline-none" style={{ backgroundColor: '#6878f2' }}>Submit</button>

      </form>
    </div>
  </section>

</main>
</div>

{/* Footer element */}

<footer className="py-4 shadow-md">
  <div className="container mx-auto px-4">
    <div className="flex justify-center space-x-4">
      <a href="https://twitter.com" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
      <a href="https://telegram.org" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTelegram} size="2x" /></a>
    </div>
  </div>
</footer>
</div>
);
}