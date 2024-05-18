'use client'
import { useMotionValue, animate, useTransform, motion, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import Background from '../../public/images/background.jpg';

export default function Home() {
  const progress1 = useMotionValue(0);
  const progress2 = useMotionValue(0);

  useEffect( () => {
    animate(progress1, 1, {duration: 1.25, ease: [0.76, 0, 0.24, 1]})
    animate(progress2, 1, {duration: 1.4, ease: [0.76, 0, 0.34, 1]})
  }, [])

  return (
    <main className="flex h-screen items-center justify-center">
      <Text progress={progress1}/>
      <MaskedImage progress1={progress1} progress2={progress2}/>
    </main>
  );
}

const MaskedImage = ({progress1, progress2}) => {
  const points = [
    {
      x: useTransform(progress1, [0, 1], ["50%", "0%"]),
      y: useTransform(progress1, [0, 1], ["25%", "0%"])
    },
    {
      x: useTransform(progress2, [0, 1], ["50%", "100%"]),
      y: useTransform(progress2, [0, 1], ["35%", "0%"])
    },
    {
      x: useTransform(progress1, [0, 1], ["50%", "100%"]),
      y: useTransform(progress1, [0, 1], ["75%", "100%"])
    },
    {
      x: useTransform(progress2, [0, 1], ["50%", "0%"]),
      y: useTransform(progress2, [0, 1], ["65%", "100%"])
    }
  ]

  const clipPath = useMotionTemplate`polygon(
    ${points[0].x}
    ${points[0].y},
    ${points[1].x}
    ${points[1].y},
    ${points[2].x}
    ${points[2].y},
    ${points[3].x}
    ${points[3].y}
  )`

  return (
    <motion.div style={{clipPath}} className="relative w-full h-full">
      <Image 
        src={Background} 
        fill
        alt="image"
        style={{objectFit: "cover"}}
      />
    </motion.div>
  )
}

const Text = ({progress}) => {
  const x1 = useTransform(progress, [0, 1], ["0", "-80%"])
  const x2 = useTransform(progress, [0, 1], ["0", "80%"])
  return (
    <h1 className="flex gap-[3vw] text-white text-[12vw] absolute z-10">
      <motion.span style={{x: x1}} className="block">Mask</motion.span>
      <motion.span style={{x: x2}} className="block"> Entry</motion.span>
    </h1>
  )
}