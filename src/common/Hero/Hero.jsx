import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState, useEffect } from 'react';
import { heroVideo, smallHeroVideo } from '../../utils';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);

  /**
   * @description 根據使用者的視窗大小，決定影片來源
   */
  const handleVideoSrc = () => {
    if (window.innerWidth < 760) setVideoSrc(smallHeroVideo)
    else setVideoSrc(heroVideo)
  }

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 })
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 } )
  }, []);

  /** 
   * @description 加入 resize 的事件
   */
  useEffect(() => {
    window.addEventListener('resize', handleVideoSrc);
    return () => {
      window.removeEventListener('resize', handleVideoSrc);
    }
  }, [])

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">iPhone Pro</p>
        <div className="md:w-10/12 w-9/12">
          <video autoPlay muted playsInline key={videoSrc} className="pointer-events-none">
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero
