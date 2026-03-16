import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Mail, Instagram, Facebook, ChevronLeft, ChevronRight, Star, MessageCircle, Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// --- Data ---
const menuData = {
  entrantes: [
    { name: "Croquetas Caseras", description: "De jamón ibérico o compango asturiano.", price: "10,50€" },
    { name: "Tabla de Quesos Asturianos", description: "Selección de Cabrales, Afuega'l Pitu, Vidiago y Gamoneu.", price: "16,00€" },
    { name: "Pastel de Cabracho", description: "Receta tradicional con mayonesa casera y tostas.", price: "12,00€" },
  ],
  ensaladas: [
    { name: "Ensalada de León", description: "Lechuga, tomate, cebolla, bonito, espárragos y huevo.", price: "11,00€" },
    { name: "Ensalada Templada de Gulas", description: "Con gambas al ajillo y vinagreta de módena.", price: "14,50€" },
  ],
  mar: [
    { name: "Merluza a la Sidra", description: "Con almejas y langostinos en salsa de sidra natural.", price: "20,00€" },
    { name: "Pixín (Rape) Frito", description: "Tacos de rape rebozados con guarnición.", price: "22,00€" },
  ],
  carnes: [
    { name: "Entrecot de Ternera Asturiana", description: "Con patatas fritas y pimientos de Padrón.", price: "24,00€" },
    { name: "Escalopines al Cabrales", description: "Tiernos filetes de ternera con salsa de queso Cabrales.", price: "18,50€" },
  ],
  especialidad: [
    { name: "Cachopo Tradicional", description: "Ternera asturiana, jamón serrano y queso fundido.", price: "22,00€" },
    { name: "Cachopo de León", description: "Relleno de cecina y queso de cabra.", price: "24,00€" },
    { name: "Fabada Asturiana", description: "Nuestra receta de 1972 con su compango.", price: "18,00€" },
  ],
  bebidas: [
    { name: "Sidra Natural", description: "Botella de sidra asturiana.", price: "3,50€" },
    { name: "Vino Rioja Crianza", description: "Consultar bodega.", price: "18,00€" },
  ],
  menus: [
    { name: "Menú Cachopo", description: "Croquetas, Ensalada de León, Cachopo de León o tradicional. Incluye pan, bebida y postre.", price: "22,00€" },
    { name: "Desayunos", description: "Pincho, café y Zumo de Naranja Natural.", price: "3,80€" },
  ]
};

const reviewsData = [
  { name: "María González", stars: 5, comment: "El mejor cachopo que he probado en Siero. Atención de 10 y ambiente muy acogedor." },
  { name: "Javier Fernández", stars: 5, comment: "Llevamos yendo años y nunca defrauda. La fabada es espectacular." },
  { name: "Laura Martínez", stars: 4, comment: "Comida casera de verdad. Las raciones son enormes, ideal para ir con hambre." },
  { name: "Carlos Ruiz", stars: 5, comment: "El menú del día tiene una relación calidad-precio inmejorable. Muy recomendable." },
  { name: "Ana López", stars: 5, comment: "Trato exquisito y postres caseros deliciosos. Volveremos sin duda." },
  { name: "David Sánchez", stars: 4, comment: "Muy buen sitio para comer comida típica asturiana. El pastel de cabracho está riquísimo." },
  { name: "Elena Gómez", stars: 5, comment: "Celebramos un cumpleaños en uno de sus comedores privados y todo fue perfecto." },
  { name: "Pedro Álvarez", stars: 5, comment: "La merluza a la sidra es una maravilla. Producto fresco y bien cocinado." },
  { name: "Carmen Díaz", stars: 4, comment: "Buen ambiente, servicio rápido y comida muy sabrosa. El aparcamiento es un plus." },
  { name: "Raúl Blanco", stars: 5, comment: "Un clásico que nunca falla. Los escalopines al cabrales son mi plato favorito." },
  { name: "Isabel Suárez", stars: 5, comment: "Desayunos muy completos y a buen precio. El pincho de tortilla está de muerte." },
  { name: "Pablo Castro", stars: 4, comment: "Comida abundante y de calidad. El personal es muy amable y atento." },
  { name: "Marta Alonso", stars: 5, comment: "Nos encantó la tabla de quesos y la sidra bien escanciada. Repetiremos." },
  { name: "Luis Vega", stars: 5, comment: "De los mejores restaurantes de la zona. Tradición y sabor en cada plato." },
  { name: "Sofía Iglesias", stars: 5, comment: "Todo excelente, desde la atención hasta la comida. Un 10 en todos los sentidos." },
];

const galleryImages = [
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700773/481655901_1740107886547308_4583920512997529555_n_gg96hn.jpg",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700774/cachopo-el-panduku_grjfg8.jpg",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700775/fabada-asturiana_oo4uhv.webp",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700774/Captura-desde-2025-11-17-11-49-05_tr2mwi.png",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700774/Captura-desde-2025-11-17-11-48-54_pp3cxh.png",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700774/Captura-desde-2025-11-17-11-47-56_zedgqm.png",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700774/Captura-desde-2025-11-17-11-47-11_dzchjj.png",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700774/Captura-desde-2025-11-17-11-48-31_gtdchd.png",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700774/Captura-desde-2025-11-17-11-47-41_tsalke.png"
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre Nosotros', href: '#about' },
    { name: 'Carta', href: '#menu' },
    { name: 'Reseñas', href: '#reviews' },
    { name: 'Ubicación', href: '#location' },
    { name: 'Reservas', href: '#reservations' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-cream/95 backdrop-blur-sm border-b border-burgundy/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <a href="#hero" className="flex items-center gap-3">
              <img src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700369/301779419_391964586434711_3100280883263449627_n_lu1abq.png" alt="El Panduku Logo" className="h-12 w-auto rounded-full" referrerPolicy="no-referrer" />
              <span className="font-sans font-bold text-2xl text-burgundy tracking-tight">EL PANDUKU</span>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-800 hover:text-burgundy font-medium transition-colors">
                {link.name}
              </a>
            ))}
            <a 
              href="tel:985353645" 
              className="bg-burgundy text-cream px-5 py-2 rounded-full font-sans font-semibold hover:bg-burgundy-hover transition-colors shadow-sm"
            >
              Reservar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-burgundy focus:outline-none">
              {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream border-b border-burgundy/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-lg text-gray-800 hover:text-burgundy font-medium border-b border-burgundy/5"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="tel:985353645" 
                onClick={() => setIsOpen(false)}
                className="mt-4 inline-block text-center bg-burgundy text-cream px-5 py-3 rounded-full font-sans font-semibold hover:bg-burgundy-hover transition-colors"
              >
                Llamar para Reservar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax feel */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700720/482239271_1744430892781674_751125021467174630_n_adxqbf.jpg")',
          y,
          scale: 1.1 // to prevent edges from showing during parallax
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-cream mb-6 tracking-tight"
        >
          El Panduku
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-cream/90 font-serif italic mb-10"
        >
          Desde 1972 sirviendo los mejores platos asturianos
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="tel:985353645" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-burgundy text-cream px-8 py-4 rounded-full font-sans font-bold text-lg hover:bg-burgundy-hover transition-all transform hover:scale-105 shadow-lg"
          >
            <Phone size={24} />
            Llamar para Reservar
          </a>
          <a 
            href="#menu" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cream text-burgundy px-8 py-4 rounded-full font-sans font-bold text-lg hover:bg-cream/90 transition-all transform hover:scale-105 shadow-lg"
          >
            Ver Carta
          </a>
        </motion.div>
      </div>

      {/* Social Links at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6 z-10">
        <a href="https://www.facebook.com/RestauranteElPanduku/" target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-white transition-colors">
          <Facebook size={28} />
        </a>
        <a href="https://www.instagram.com/restaurantepanduku/" target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-white transition-colors">
          <Instagram size={28} />
        </a>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <img 
              src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700369/475038081_923471933283971_6376165971255839079_n_wzwqu1.jpg" 
              alt="Interior del Restaurante El Panduku" 
              className="rounded-2xl shadow-xl object-cover w-full h-[400px] lg:h-[500px]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-burgundy">Sobre Nosotros</h2>
            <div className="w-20 h-1 bg-burgundy rounded-full"></div>
            <p className="text-lg leading-relaxed text-gray-800">
              El Restaurante Panduku, situado en pleno corazón comercial de Asturias, lleva prestando sus servicios desde 1972. Disponemos de elegantes salones para hasta 45 comensales y discretos comedores privados.
            </p>
            <p className="text-lg leading-relaxed text-gray-800">
              Nuestra cocina, de profundas raíces asturianas, elabora platos con productos locales, tradicionales y naturales, prestando especial atención a las verduras. En nuestra bodega tenemos más de 40 referencias nacionales e internacionales.
            </p>
            <div className="pt-4">
              <a href="#menu" className="inline-block border-2 border-burgundy text-burgundy px-8 py-3 rounded-full font-sans font-bold hover:bg-burgundy hover:text-cream transition-colors">
                Ver la Carta
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = ({ title, items, index }: { title: string, items: any[], index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="mb-12"
  >
    <h3 className="text-2xl font-sans font-bold text-burgundy mb-6 border-b border-burgundy/20 pb-2">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col">
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="font-sans font-bold text-lg text-gray-900">{item.name}</h4>
            <span className="font-sans font-bold text-burgundy ml-4">{item.price}</span>
          </div>
          <p className="text-gray-600 text-sm italic">{item.description}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const Menu = () => {
  return (
    <section id="menu" className="py-20 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-burgundy mb-4">Nuestra Carta</h2>
          <div className="w-24 h-1 bg-burgundy rounded-full mx-auto"></div>
        </motion.div>

        <MenuSection title="Menús Especiales" items={menuData.menus} index={0} />
        <MenuSection title="Entrantes" items={menuData.entrantes} index={1} />
        <MenuSection title="Ensaladas" items={menuData.ensaladas} index={2} />
        <MenuSection title="De la Mar" items={menuData.mar} index={3} />
        <MenuSection title="Carnes" items={menuData.carnes} index={4} />
        <MenuSection title="Especialidad Panduku" items={menuData.especialidad} index={5} />
        <MenuSection title="Bebidas, Vinos y Cavas" items={menuData.bebidas} index={6} />

        {/* Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-sans font-bold text-center text-burgundy mb-10">Nuestros Platos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="aspect-square overflow-hidden rounded-xl shadow-sm"
              >
                <img 
                  src={src} 
                  alt={`Plato ${idx + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerSlide = 3;
  const totalSlides = Math.ceil(reviewsData.length / reviewsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentReviews = reviewsData.slice(
    currentIndex * reviewsPerSlide, 
    (currentIndex + 1) * reviewsPerSlide
  );

  return (
    <section id="reviews" className="py-20 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-burgundy mb-4">Opiniones</h2>
          <div className="w-24 h-1 bg-burgundy rounded-full mx-auto mb-6"></div>
          <p className="text-gray-700">Lo que dicen nuestros clientes</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative px-4 md:px-12"
        >
          {/* Carousel Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-burgundy p-2 rounded-full shadow-md hover:bg-burgundy hover:text-white transition-colors z-10"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-burgundy p-2 rounded-full shadow-md hover:bg-burgundy hover:text-white transition-colors z-10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Reviews Grid */}
          <div className="overflow-hidden">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {currentReviews.map((review, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-burgundy/5 flex flex-col h-full">
                  <div className="flex text-yellow-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < review.stars ? "currentColor" : "none"} className={i >= review.stars ? "text-gray-300" : ""} />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 flex-grow">"{review.comment}"</p>
                  <p className="font-sans font-bold text-burgundy">{review.name}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-colors ${i === currentIndex ? 'bg-burgundy' : 'bg-burgundy/20'}`}
              />
            ))}
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <a 
            href="https://www.google.es/maps/place/Restaurante+Panduku/@43.3830736,-5.7794292,17z/data=!4m8!3m7!1s0xd368b00514597e5:0x35fced80f49f4450!8m2!3d43.3830697!4d-5.7768543!9m1!1b1!16s%2Fg%2F11ymngsyz4?hl=es&entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border-2 border-burgundy text-burgundy px-8 py-3 rounded-full font-sans font-bold hover:bg-burgundy hover:text-cream transition-colors shadow-sm"
          >
            <Star size={20} />
            Dejar reseña en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

const Location = () => {
  return (
    <section id="location" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-burgundy mb-4">Visítanos</h2>
          <div className="w-24 h-1 bg-burgundy rounded-full mx-auto"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3 space-y-8"
          >
            <div className="bg-cream p-8 rounded-2xl shadow-sm border border-burgundy/10">
              <h3 className="text-2xl font-sans font-bold text-burgundy mb-4">Ubicación</h3>
              <p className="text-gray-800 mb-4 leading-relaxed">
                Estamos en Colloto (Siero, Asturias) en el kilómetro 399,5 de la Carretera Nacional N-634, ruta histórica Irún-Santiago de Compostela.
              </p>
              <ul className="space-y-3 text-gray-800">
                <li className="flex items-start gap-3">
                  <MapPin className="text-burgundy shrink-0 mt-1" size={20} />
                  <span>A 15 minutos de Oviedo y 20 de Gijón.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-burgundy shrink-0 mt-1" size={20} />
                  <span>Dispone de amplio aparcamiento privado.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-cream p-8 rounded-2xl shadow-sm border border-burgundy/10">
              <h3 className="text-2xl font-sans font-bold text-burgundy mb-4">Contacto Rápido</h3>
              <p className="text-gray-800 mb-6">Para reservar, llámanos por teléfono. Para cualquier otra consulta, también atendemos por WhatsApp. No se realizan reservas por correo.</p>
              <div className="space-y-4">
                <a href="tel:985353645" className="flex items-center justify-center gap-2 w-full bg-burgundy text-cream py-3 rounded-xl font-sans font-bold hover:bg-burgundy-hover transition-colors">
                  <Phone size={20} />
                  985 353 645
                </a>
                <a href="https://wa.me/622208928" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full border-2 border-burgundy text-burgundy py-3 rounded-xl font-sans font-bold hover:bg-burgundy hover:text-cream transition-colors">
                  <MessageCircle size={20} />
                  622 208 928
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/3 h-[400px] lg:h-auto min-h-[500px] rounded-2xl overflow-hidden shadow-md border border-gray-200"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.645706917637!2d-5.77942922340263!3d43.38307357111663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd368b00514597e5%3A0x35fced80f49f4450!2sRestaurante%20Panduku!5e0!3m2!1ses!2ses!4v1710600000000!5m2!1ses!2ses" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación Restaurante El Panduku"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Reservations = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="reservations" className="relative py-20 bg-cream overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ 
          backgroundImage: 'url("https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700369/475038081_923471933283971_6376165971255839079_n_wzwqu1.jpg")',
          y,
          scale: 1.1
        }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-burgundy mb-4">Reservas</h2>
          <div className="w-24 h-1 bg-burgundy rounded-full mx-auto mb-10"></div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-burgundy/10"
        >
          <p className="text-xl text-gray-800 mb-10 leading-relaxed">
            Estaremos encantados de recibirte. Puedes realizar tu reserva de dos formas muy sencillas:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phone Reservation */}
            <div className="flex flex-col items-center p-8 bg-cream/30 rounded-2xl border border-burgundy/5 hover:border-burgundy/20 transition-colors">
              <div className="bg-burgundy text-cream p-4 rounded-full mb-6 shadow-md">
                <Phone size={32} />
              </div>
              <h3 className="text-2xl font-sans font-bold text-burgundy mb-3">Por Teléfono</h3>
              <p className="text-gray-700 mb-6 text-center">Llámanos directamente para confirmar tu mesa al instante con nuestro equipo.</p>
              <a href="tel:985353645" className="text-2xl font-sans font-bold text-burgundy hover:text-burgundy-hover transition-colors">
                985 353 645
              </a>
            </div>

            {/* WhatsApp Reservation */}
            <div className="flex flex-col items-center p-8 bg-cream/30 rounded-2xl border border-burgundy/5 hover:border-[#25D366]/20 transition-colors">
              <div className="bg-[#25D366] text-white p-4 rounded-full mb-6 shadow-md">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-sans font-bold text-[#25D366] mb-3">Por WhatsApp</h3>
              <p className="text-gray-700 mb-4 text-center">
                Haz clic en el <strong>botón flotante verde</strong> de la esquina inferior derecha para escribirnos.
              </p>
              <span className="text-sm text-gray-500 italic mt-auto">Te responderemos lo antes posible.</span>
            </div>
          </div>
          
          <p className="mt-10 text-gray-600 italic text-sm">
            * No se aceptan reservas por correo electrónico.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-burgundy text-cream pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <img src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773700369/301779419_391964586434711_3100280883263449627_n_lu1abq.png" alt="El Panduku Logo" className="h-16 w-auto rounded-full bg-cream p-1" referrerPolicy="no-referrer" />
              <h3 className="text-3xl font-sans font-bold tracking-tight">EL PANDUKU</h3>
            </div>
            <p className="text-cream/80 mb-6">
              Desde 1972 sirviendo los mejores platos asturianos con productos locales, tradicionales y naturales.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/RestauranteElPanduku/" target="_blank" rel="noopener noreferrer" className="bg-cream/10 p-2 rounded-full hover:bg-cream hover:text-burgundy transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://www.instagram.com/restaurantepanduku/" target="_blank" rel="noopener noreferrer" className="bg-cream/10 p-2 rounded-full hover:bg-cream hover:text-burgundy transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-sans font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-cream/80">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 mt-1" size={20} />
                <span>Crta. N-634 Oviedo-Santander, 70,<br/>Granda (Siero) Asturias</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0" size={20} />
                <a href="tel:985353645" className="hover:text-white transition-colors">985 353 645</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0" size={20} />
                <a href="mailto:pandukurestaurante2025@gmail.com" className="hover:text-white transition-colors break-all">pandukurestaurante2025@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xl font-sans font-bold mb-6">Horario</h4>
            <ul className="space-y-4 text-cream/80">
              <li className="flex items-start gap-3">
                <Clock className="shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-white">Lunes a Viernes</p>
                  <p>7:00 – 19:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-white">Sábado y Domingo</p>
                  <p>10:30 – 19:00</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="border-t border-cream/20 pt-8 text-center text-cream/60 text-sm font-sans">
          <p>&copy; {new Date().getFullYear()} Restaurante El Panduku. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/622208928"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-sans font-bold px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        ¡Consúltanos por WhatsApp!
      </span>
    </a>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-gray-900 font-serif scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Reviews />
      <Location />
      <Reservations />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
