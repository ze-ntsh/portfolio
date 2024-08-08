import ParallaxText from "../parallax-text";

const Contact = () => {
  return (
    <section className="h-screen relative text-[--text-primary] overflow-x-hidden"
      style={{
        backgroundSize: '100px 100px',
        backgroundPosition: 'center',
        backgroundImage: 'linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)'
      }}
    >
      <ParallaxText baseVelocity={4} className='text-[5em] absolute top-[15%]'>CONTACT.CONNECT.COLLAB.</ParallaxText>
    </section>
  )
}

export default Contact;