import React from 'react'
import { Highlighter } from "@/components/magicui/highlighter";

function Aboutsectiontesting() {
  return (
    <p className="text-2xl leading-relaxed text-white">
    The{" "}
    <Highlighter action="underline" color="#FF9800">
      SMVIT Entrepreneurship Cell (E-Cell)
    </Highlighter>{" "}
    is a{" "}
    <Highlighter action="highlight" color="#87CEFA">
      dynamic platform
    </Highlighter>{" "}
    for aspiring entrepreneurs.{" "}
    <Highlighter action="circle" color="#4CAF50">
      Re-established in 2021
    </Highlighter>
    , it has represented SMVIT at top events like{" "}
    <Highlighter action="box" color="#E91E63">
      NEC by IIT Madras & Bombay
    </Highlighter>
    , securing{" "}
    <Highlighter action="bracket" color="#9C27B0">
      16th place at IIT Bombay
    </Highlighter>
    , and gaining exposure through{" "}
    <Highlighter action="crossed-off" color="#F44336">
      startup expos
    </Highlighter>
    . On campus, E-Cell organizes{" "}
    <Highlighter action="strike-through" color="#00BCD4">
      competitions
    </Highlighter>{" "}
    and{" "}
    <Highlighter action="highlight" color="#FFC107">
      networking events
    </Highlighter>{" "}
    to help students turn ideas into impactful ventures. More than just a club,{" "}
    <Highlighter action="underline" color="#FF9800">
      E-Cell is a launchpad
    </Highlighter>{" "}
    for students building innovative and meaningful startups.
  </p>
  
  )
}

export default Aboutsectiontesting