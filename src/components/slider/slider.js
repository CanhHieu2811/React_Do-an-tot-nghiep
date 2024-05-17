// import {useState, useEffect} from 'react';

// import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
// import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

// import "./slider.scss";
// import { sliderData } from './slider-data';
// import { set } from 'lodash';

// const Slider = () => {
//     const [currentSlide, setCurrentSlide] = useState(0)
//     const slideLength = sliderData.length;
//     // slideLength = 1 2 3
//     // currentSlide = 0 1 2

//     const autoScroll = true;
//     let slideInterval;
//     let intervalTime = 5000;

//     const nextSlide = () => {
//         setCurrentSlide(currentSlide === slideLength -1 ? 0 : currentSlide + 1);
//     };

//     const prevSlide = () => {
//         setCurrentSlide(currentSlide === 0 ? slideLength -1 : currentSlide - 1);
//     };

//     function auto() {
//         slideInterval = setInterval(nextSlide, intervalTime)
//     }

//     useEffect(() => {
//         setCurrentSlide(0)
//     }, []);

//     useEffect(() => {
//         if (autoScroll) {
//             auto();
//         }
//         return () => clearInterval(slideInterval);
//     }, [currentSlide]);

// return (
//     <div className="slider">
//         <ArrowForwardIosOutlinedIcon className="arrow prev"onClick={prevSlide}/>
//         <ArrowBackIosOutlinedIcon className="arrow next"onClick={nextSlide}/>
      
//         {/* {sliderData.map((slider, index) => { */}
//             return (
//                 <div>
//                     <p>Hihi</p>
//                 </div>
//                 // <div className={index === currentSlide ? "slide current" : "slide"} key={index}>
                    
//                 //     {index === currentSlide && (
//                 //         <div>
//                 //         <img src={slide.image} alt="slide" />
//                 //     <div>
//                 //         </div>
//                 //     )}
//                 // </div>
//             );
//         })}
//     </div>
//   );
// };

// export default Slider;

