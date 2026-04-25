import React, { useState } from "react";
import Headers from "./Headers";
import Footer from "./Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    console.log(formData);
    alert("Message sent successfully!");

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Headers />

      <section className="contact-page py-5">
        <div className="container">
          <div className="contact-card">
            <div className="row g-0">
              <div className="col-lg-5">
                <div className="contact-info">
                  <p className="section-kicker mb-1">Need help?</p>
                  <h3 className="mb-3">Contact Us</h3>
                  <p className="mb-4">
                    Have questions about products, carts, or orders? We are here
                    to help.
                  </p>

                  <div className="contact-lines">
                    <p>Ahmedabad, Gujarat</p>
                    <p>support@shopkart.com</p>
                    <p>+91 9876543210</p>
                  </div>

                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80"
                    alt="Customer support desk"
                  />
                </div>
              </div>

              <div className="col-lg-7">
                <div className="contact-form">
                  <h4 className="mb-4 fw-semibold">Send Message</h4>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                      />
                    </div>

                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows="4"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                      ></textarea>
                    </div>

                    <button className="btn btn-primary w-100">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
