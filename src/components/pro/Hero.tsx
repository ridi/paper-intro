import React from 'react';

import { Links } from './Providers';

import paper_off from '../../assets/images/pro/header/paper_off.jpg';
import paper_on from '../../assets/images/pro/header/paper_on.jpg';

export default () => (
  <section className="js_trigger intro_section" id="intro_header">
    <div className="contents_wrapper">
      <p className="sub_title">존재감의 차이</p>
      
      <h1 className="main_title">PAPER PRO</h1>
      
      <div className="logo_wrapper">
        <svg className="svg_logo_paper" viewBox="0.5 220.5 300 80" xmlns="http://www.w3.org/2000/svg">
          <path d="M277.976 266.674c11.679-.501 21.523-8.343 21.523-22.358 0-14.183-10.179-22.691-23.694-22.691h-29.032v77.752h6.676V227.63h21.856c10.345 0 17.187 6.841 17.187 16.686 0 9.844-6.842 16.853-17.187 16.853H258.62l.166 6.007h11.847l21.858 32.201h8.009l-22.524-32.703zm-91.436 32.702h49.221v-6.007h-42.714v-30.868h41.881v-6.006h-41.881V227.63h42.714v-6.006H186.54v77.752zm-32.202-77.752h-29.032v77.752h6.674V227.63h21.858c10.344 0 17.185 6.841 17.185 16.686 0 9.677-6.673 16.685-17.185 16.685h-15.351v6.006h16.018c14.85 0 23.359-10.511 23.359-22.69s-8.51-22.693-23.526-22.693m-75.251 0l-31.868 77.752h7.675l7.675-19.021h35.206l-2.336-6.173H64.738l18.354-45.385 28.198 70.578h7.675l-31.702-77.752h-8.176zm-49.555 0H.5v77.752h6.674V227.63h21.857c10.345 0 17.186 6.841 17.186 16.686 0 9.677-6.674 16.685-17.186 16.685H13.515l.167 6.006h15.851c14.85 0 23.359-10.511 23.359-22.69.167-12.181-8.343-22.693-23.36-22.693"/>
        </svg>
        <svg className="svg_logo_pro" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M95.805 49.188c-1.623 1.625-4.871 2.437-13.396 2.437H55.21V35.387h27.198c8.525 0 11.773.812 13.396 2.437 1.624 1.624 2.03 3.247 2.03 5.684.001 2.431-.812 4.463-2.029 5.68M82.003 30.107H48.715v41.002h6.495V56.902h26.793c11.772 0 15.832-1.625 18.674-4.467 2.436-2.437 3.247-5.277 3.247-8.932s-.812-6.495-3.247-8.931c-2.436-2.84-6.495-4.465-18.674-4.465m46.685 21.516V35.386h27.604c8.524 0 11.366.812 12.99 2.437 1.218 1.218 2.028 3.246 2.028 5.277 0 2.437-.404 4.06-2.028 5.277-1.624 1.623-5.277 2.842-13.396 2.842h-27.199v.404h.001zm45.873.406c2.436-2.437 3.246-5.277 3.246-8.932s-.812-6.494-3.246-8.931c-2.842-2.842-6.496-4.466-18.269-4.466h-33.694v41.002h6.495V56.088h20.298l23.951 14.615h9.743l-23.951-14.209c9.337.001 12.99-2.029 15.427-4.465m75.1 9.742c-3.248 3.248-9.743 5.685-21.921 5.685-12.18 0-18.674-2.437-21.924-5.685-2.435-2.436-4.058-5.684-4.058-10.961 0-5.275 1.216-8.523 4.058-10.959 3.25-3.248 9.744-5.685 21.924-5.685 12.178 0 18.673 2.437 21.921 5.685 2.437 2.436 4.06 5.684 4.06 10.959 0 5.279-1.623 8.527-4.06 10.961m5.277-25.574c-4.06-4.059-11.771-7.307-26.793-7.307-15.426 0-22.731 3.248-26.793 7.307-3.652 3.654-5.275 8.119-5.275 14.209 0 6.089 1.623 10.961 5.275 14.208 4.062 4.06 11.772 7.308 26.793 7.308 15.426 0 23.141-3.248 26.793-7.308 3.653-3.654 5.277-8.119 5.277-14.208.001-5.683-1.623-10.554-5.277-14.209m30.853 44.657c-6.495 6.494-99.459 13.396-135.994 13.396-35.724 0-129.905-6.901-136.4-13.396C7.713 74.764 4.06 62.99 4.06 50s3.653-24.764 9.337-30.854c6.901-6.494 103.924-12.989 136.807-12.989 32.476 0 129.093 6.495 135.994 13.396 5.684 5.684 9.337 17.456 9.337 30.854-.001 12.583-4.06 24.357-9.744 30.447m3.248-64.547C280.107 7.375 174.966 1.691 149.797 1.691c-24.763 0-130.312 5.685-139.648 14.615C3.653 22.801 0 35.386 0 50c0 14.209 4.06 27.199 10.961 33.693 8.931 8.932 115.29 14.615 139.242 14.615 24.763 0 129.904-5.685 138.836-14.615C295.534 77.199 300 64.209 300 50c-.406-14.614-4.061-27.199-10.961-33.693"/>
        </svg>
      </div>
      <Links />
      <div className="js_trigger device">
        <div className="device_wrapper">
          <img className="paper_off" src={paper_off} alt="PAPER OFF" />
          <img className="paper_on" src={paper_on} alt="PAPER ON" />
        </div>
      </div>
    </div>
  </section>
);