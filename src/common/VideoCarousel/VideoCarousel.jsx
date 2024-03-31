import { hightlightsSlides } from "../../constants";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { pauseImg, playImg, replayImg } from "../../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  /** video 的事件資料 */
  const [loadedData, setLoadedData] = useState([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    })

    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none'
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true
        }))
      }
    })
  }, [isEnd, videoId])
  
  /** 
   * @description 載入資料，當資料筆數超過三筆時，則進入判斷式
   */
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        isPlaying && videoRef.current[videoId].play();
      }
    }
  }, [videoId, startPlay, isPlaying, loadedData])

  useEffect(() => {
    let span = videoSpanRef.current;
    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          gsap.to(span[videoId], {
            width: `${progress}%`,
            backgroundColor: "white",
          });
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px'
            })
            gsap.to(videoSpanRef.current[videoId], {
              backgroundColor: '#afafaf'
            })
          }
        }
      })
      gsap.to(videoDivRef.current[videoId], {
        width:
          window.innerWidth < 760
            ? "10vw" // mobile
            : window.innerWidth < 1200
            ? "10vw" // tablet
            : "4vw", // laptop
      });
      
      /**
       * @description 調整正確的 Progress 進度
       */
      const animUpdate = () => {
        anim.progress(videoRef.current[videoId].currentTime/hightlightsSlides[videoId].videoDuration);
      }

      if (isPlaying) gsap.ticker.add(animUpdate)
      else gsap.ticker.remove(animUpdate);
    }
  }, [videoId, startPlay, isPlaying]);

  const handleProcess = (type, i) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({
          ...prev,
          isEnd: true,
          videoId: i + 1,
        }))
        break;
      case 'video-last':
        setVideo((prev) => ({
          ...prev,
          isLastVideo: true,
        }))
        break;
      case 'video-reset':
        setVideo((prev) => ({
          ...prev,
          isLastVideo: false,
          videoId: 0,
        }))
        break;
      case 'play':
        setVideo((prev) => ({
          ...prev,
          isPlaying: !prev.isPlaying
        }))
        break;
        case 'pause':
        setVideo((prev) => ({
          ...prev,
          isPlaying: !prev.isPlaying
        }))
        break;
      default:
        return video;
    }
  }

  /**
   * @description 將事件存入狀態
   * @param {*} e 事件
   */
  const handleLoadedMetaData = (e) => {
    setLoadedData((prev) => [...prev, e])
  }

  return (
    <>
      <div className="flex items-center">
        {/** Videos 的區塊 */}
        {hightlightsSlides.map((list, index) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  muted
                  preload="auto"
                  ref={(el) => videoRef.current[index] = el}
                  onEnded={() => index !== 3 ? handleProcess('video-end', index) : handleProcess('video-last')}
                  onPlay={() => {
                    setVideo((prev) => ({
                      ...prev,
                      isPlaying: true
                    }))
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {
                  list.textLists.map((text) => (
                    <p key={text} className="md:text-2xl text-xl font-medium">{text}</p>
                  ))
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {
            videoRef.current.map((_, i) => (
              <div
                key={i}
                className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                ref={(el) => videoDivRef.current[i] = el}
              >
                <span
                  ref={(el) => videoSpanRef.current[i] = el}
                  className="absolute h-full w-full rounded-full"
                />
              </div>
            ))
          }
        </div>
        
        {/** 控制 Buttons 的區塊 */}
        <div className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={isLastVideo ? () => handleProcess('video-reset') : !isPlaying ? () => handleProcess('play') : () => handleProcess('pause')}
          />
        </div>
      </div>
    </>
  )
}

export default VideoCarousel
