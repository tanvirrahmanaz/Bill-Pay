// Enhanced Home.jsx with animations and black text color
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { bills } from "../data/bills";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";

const Home = () => {
  const [uniqueOrganizations, setUniqueOrganizations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const orgMap = new Map();
    bills.forEach(bill => {
      if (!orgMap.has(bill.organization)) {
        orgMap.set(bill.organization, {
          name: bill.organization,
          icon: bill.icon,
          type: bill.bill_type
        });
      }
    });
    setUniqueOrganizations(Array.from(orgMap.values()));
  }, []);

  return (
    <div className="bg-base-100 text-black">
      {/* Hero Section */}
      <section>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <motion.div className="relative h-[500px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <img
                src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&w=1200&q=80"
                alt="Banking"
                className="w-full h-full object-cover brightness-50"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                <motion.h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4" whileHover={{ scale: 1.05 }}>Pay Your Bills with Ease</motion.h1>
                <motion.p className="text-lg md:text-2xl max-w-2xl mb-6" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>One platform for all your utility bills. Simple, secure, and convenient.</motion.p>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/bills" className="btn btn-primary px-6 py-3 text-lg">Get Started</Link>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>

          {!user && (
            <SwiperSlide>
              <motion.div className="relative h-[500px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                <img
                  src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1200&q=80"
                  alt="Mobile Banking"
                  className="w-full h-full object-cover brightness-50"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                  <motion.h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4" whileHover={{ scale: 1.05 }}>Manage Your Finances</motion.h1>
                  <motion.p className="text-lg md:text-2xl max-w-2xl mb-6" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>Keep track of all your bills and payments in one place.</motion.p>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link to="/register" className="btn btn-primary px-6 py-3 text-lg">Sign Up Now</Link>
                  </motion.div>
                </div>
              </motion.div>
            </SwiperSlide>
          )}
        </Swiper>
      </section>

      {/* Organizations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Supported Organizations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {uniqueOrganizations.map((org, index) => (
              <motion.div key={index} className="bg-white rounded-xl p-4 shadow hover:shadow-lg text-center transition" whileHover={{ scale: 1.05 }}>
                <img src={org.icon} alt={org.name} className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-sm font-semibold truncate">{org.name}</h3>
                <p className="text-xs text-gray-600 capitalize">{org.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BillPay?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Convenient", "Secure", "Time-Saving"].map((title, index) => (
              <motion.div key={index} className="text-center bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg" whileHover={{ y: -5 }}>
                <div className="text-3xl font-bold w-16 h-16 mx-auto mb-4 bg-primary-focus  rounded-full flex items-center justify-center">{index + 1}.</div>
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-gray-700">
                  {title === "Convenient" && "Pay all your bills from one platform without the need to visit multiple websites."}
                  {title === "Secure" && "All transactions are encrypted and protected with the latest security measures."}
                  {title === "Time-Saving" && "No more waiting in lines or navigating multiple apps to pay your bills."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Create Account", desc: "Sign up for a BillPay account in just a few steps." },
              { step: 2, title: "Add Bills", desc: "View your bills from various service providers." },
              { step: 3, title: "Pay Bills", desc: "Pay your bills securely using your account balance." },
              { step: 4, title: "Track Payments", desc: "Keep a record of all your payments in one place." },
            ].map(({ step, title, desc }) => (
              <motion.div key={step} className="text-center" whileHover={{ scale: 1.05 }}>
                <div className="w-14 h-14 mb-4 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto">{step}</div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-700 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rahim Ahmed", location: "Dhaka", img: "https://randomuser.me/api/portraits/men/32.jpg", quote: "BillPay has made my life so much easier. No more remembering multiple due dates or visiting different websites!" },
              { name: "Nusrat Jahan", location: "Chittagong", img: "https://randomuser.me/api/portraits/women/44.jpg", quote: "The interface is so simple and user-friendly. I recommend BillPay to all my friends and family." },
              { name: "Kamal Hossain", location: "Sylhet", img: "https://randomuser.me/api/portraits/men/67.jpg", quote: "I never miss a bill payment now thanks to BillPay. The reminder feature is particularly helpful!" }
            ].map(({ name, location, img, quote }, index) => (
              <motion.div key={index} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg" whileHover={{ scale: 1.02 }}>
                <div className="flex items-center mb-4">
                  <img src={img} alt={name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">{name}</h4>
                    <p className="text-sm text-gray-500">{location}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">“{quote}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
