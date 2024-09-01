import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cardview-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardview-component.component.html',
  styleUrl: './cardview-component.component.css'
})
export class CardviewComponentComponent {
  cards = [
    {
      image: '/assets/public/images/image1.jpg', // Add your image path here
      title: 'Web applications',
      description: 'Our Application  development services deliver scalable and robust web and desktop applications, tailored to meet your business needs. Leveraging the power of the .NET framework, we ensure high performance and reliability for all your software solutions.'
    },
    {
      image: '/assets/public/images/image2.jpg', // Add your image path here
      title: 'Android Development',
      description: 'We offer custom Android app development to enhance your mobile user experience. Our expert team creates high-quality, user-friendly apps that meet your specific business requirements and ensure a seamless user experience on all Android devices.'
    },
    // {
    //   image: '/assets/public/images/image3.jpg', // Add your image path here
    //   title: 'Database Administration',
    //   description: 'Our comprehensive database administration services ensure your data is secure, optimized, and accessible. We provide database management, monitoring, and maintenance to keep your systems running smoothly and efficiently.'
    // },
    {
      image: '/assets/public/images/image4.jpg', // Add your image path here
      title: 'Network Solutions',
      description: 'Our reliable network solutions offer seamless connectivity and optimized performance. From setup to maintenance, we ensure your network infrastructure is robust, secure, and efficient, meeting all your business needs.'
    },
    {
      image: '/assets/public/images/image5.jpg', // Add your image path here
      title: 'Payment Gateway Integration',
      description: 'We provide secure payment gateway integration for smooth, hassle-free transactions. Our solutions ensure that your online payment processes are fast, reliable, and secure, enhancing your customers\' experience.'
    },
    {
      image: '/assets/public/images/image6.jpg', // Add your image path here
      title: 'Bulk SMS Integration',
      description: 'Our efficient bulk SMS integration helps you reach your audience instantly and effectively. We provide reliable SMS solutions to boost your marketing efforts and improve customer engagement.'
    },
    {
      image: '/assets/public/images/image7.jpg', // Add your image path here
      title: 'Service and Support',
      description: 'Our dedicated service and support team ensures your IT infrastructure runs smoothly. We offer comprehensive support services to address any issues promptly, maintaining the efficiency and reliability of your systems.'
    }
  ];
}
