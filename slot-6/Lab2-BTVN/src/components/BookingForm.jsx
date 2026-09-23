import { useState } from 'react'
import { serviceOptions } from '../data/menuData'

function BookingForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="booking-section section-space" id="booking">
      <div className="container">
        <div className="booking-panel row g-0 align-items-stretch">
          <div className="col-lg-5 booking-copy">
            <p className="eyebrow">A seat at our table</p>
            <h2>Book your<br /><em>table</em></h2>
            <p>Come hungry, leave happy. Tell us a little about your visit and we will take care of the rest.</p>
            <div className="contact-detail"><span>Open daily</span><strong>11:00 AM - 11:00 PM</strong></div>
            <div className="contact-detail"><span>Call us</span><strong>+39 081 555 0198</strong></div>
          </div>
          <div className="col-lg-7 booking-form-wrap">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="name">Your name</label>
                  <input className="form-control" id="name" type="text" placeholder="John Doe" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="email">Your email</label>
                  <input className="form-control" id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="date">Date & time</label>
                  <input className="form-control" id="date" type="datetime-local" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="service">Service</label>
                  <select className="form-select" id="service" defaultValue="" required>
                    <option value="" disabled>Select a service</option>
                    {serviceOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="message">Special requests</label>
                  <textarea className="form-control" id="message" rows="3" placeholder="Tell us anything we should know..." />
                </div>
                <div className="col-12 d-flex align-items-center gap-3 flex-wrap">
                  <button className="btn btn-order rounded-pill px-4" type="submit">Send request <span aria-hidden="true">&#8594;</span></button>
                  {submitted && <span className="success-message" role="status">Thanks! We will be in touch soon.</span>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingForm
