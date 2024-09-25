import React, { useState } from 'react';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        inquiryType: 'general',
        message: '',
    
        privacyPolicyChecked: false,
        formErrors: {
            name: '',
            email: '',
            phone: '',
                     message: '',
            privacyPolicyChecked: ''
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form before submission
        if (validateForm()) {
            // Proceed with form submission logic here
            // Reset form after submission
            resetForm();
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Name validation
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }

        // Email validation
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
            isValid = false;
        }

        // Privacy Policy validation
        if (!formData.privacyPolicyChecked) {
            errors.privacyPolicyChecked = 'You must agree to the Privacy Policy';
            isValid = false;
        }

        // Update form errors
        setFormData(prevData => ({
            ...prevData,
            formErrors: errors
        }));

        return isValid;
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
       
            inquiryType: 'general',
            message: '',
         
            privacyPolicyChecked: false,
            formErrors: {
                name: '',
                email: '',
              
                message: '',
                privacyPolicyChecked: ''
            }
        });
    };

    return (
        <div className="contact">
          
        <div className="contact-info">
        <h2>Contact Us</h2>
            <p>If you have any questions, concerns, or feedback, feel free to reach out to us. We're here to help!</p>
            <p>You can contact us through the following methods:</p>
            <ul>
                <li>Email: <a href="mailto:info@unifiedcart.com">info@unifiedcart.com</a></li>
                <li>Phone: +1 (123) 456-7890</li>
                <li>Address: 123 Main Street, City, Country</li>
            </ul>
            <p>Alternatively, you can fill out the form below, and we'll get back to you as soon as possible:</p>
        </div>
            <div className="contact-form">
                <h3>Get in Touch</h3>
                <form onSubmit={handleSubmit}>
                    {/* Form fields */}
                    <div className="form-group">
                        {/* Name field with error message */}
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        {formData.formErrors.name && <span className="error">{formData.formErrors.name}</span>}
                    </div>
                    <div className="form-group">
                        {/* Email field with error message */}
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        {formData.formErrors.email && <span className="error">{formData.formErrors.email}</span>}
                    </div>
                    <div className="form-group">
                        {/* Phone field */}
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    
                    <div className="form-group">
                        {/* Inquiry Type dropdown */}
                        <label htmlFor="inquiry-type">Inquiry Type:</label>
                        <select id="inquiry-type" name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="inquiry-type">
                            <option value="general">General Inquiry</option>
                            <option value="support">Product Support</option>
                            <option value="feedback">Feedback</option>
                            <option value="partnership">Partnership Opportunity</option>
                        </select>
                    </div>
                    <div className="form-group">
                        {/* Message textarea with error message */}
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
                        {formData.formErrors.message && <span className="error">{formData.formErrors.message}</span>}
                    </div>
                   
                    <div className="form-group checkbox">
                        <input type="checkbox" id="privacy-policy" name="privacyPolicyChecked" checked={formData.privacyPolicyChecked} onChange={handleChange} required />
                        <label htmlFor="privacy-policy">I have read and agree to the Privacy Policy.</label>
                        {formData.formErrors.privacyPolicyChecked && <span className="error">{formData.formErrors.privacyPolicyChecked}</span>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
