import React from 'react'
import StylishDock from "@/components/ui/magicdock";
import { Settings as SettingsIcon } from "lucide-react";
import { Instagram,Linkedin,Youtube } from 'lucide-react'


const iconColor = "#6D4DFE";

const dockItems = [
    {
      id: 1,
      icon: <Instagram size={24} color={iconColor} />,
      label: "Instagram",
      description: "Explore our Instagram",
      onClick: () => window.open("https://www.instagram.com/ecell_smvit/", "_blank"),
    },
    {
      id: 2,
      icon: <Linkedin size={24} color={iconColor} />,
      label: "Linkedin",
      description: "Explore our Linkedin",
      onClick: () => window.open("https://www.linkedin.com/company/e-cell-sirmvit", "_blank"),
    },
    {
        id:3,
        icon: <Youtube size={24} color={iconColor} />, 
        label: "youtube",
        description: "Explore our youtube",
        onClick: () => window.open("https://www.youtube.com/@E-CellSMVIT", "_blank"),
      },
  ];

function SocialMedia() {
  return (
    <div className="relative text-white">
      <StylishDock
        items={dockItems}
        distance={150}
        panelHeight={64}
        baseItemSize={50}
        magnification={70}
        variant="default"
      />
    </div>
  )
}

export default SocialMedia