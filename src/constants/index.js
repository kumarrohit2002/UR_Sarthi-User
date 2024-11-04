import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  // figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

import proImage from "../assets/benefits/image-4.png";
import proImage2 from "../assets/benefits/image-5.png";
import proImage3 from "../assets/benefits/image-6.png";
import proImage4 from "../assets/benefits/image-7.png";
import proImage5 from "../assets/benefits/image-8.png";
import proImage6 from "../assets/benefits/image-9.png";
import icoI1 from "../assets/benefits/ico2.png";
import pr1 from "../assets/collaboration/react.png";
import pr2 from "../assets/collaboration/angular.png";
import pr3 from "../assets/collaboration/mongo.png";
import pr4 from "../assets/collaboration/git.png";
import pr5 from "../assets/collaboration/c++.png";
import pr6 from "../assets/collaboration/python.png";
import pr7 from "../assets/collaboration/kotlin.png";
import pr8 from "../assets/collaboration/tensorflow.png";


export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#abc",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "/login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "Personalized guidance through direct , 1-on-1 mentor calls.";

export const collabContent = [
  {
    id: "0",
    title: "1 - on - 1 calls",
    text: collabText,
  },
  {
    id: "1",
    title: "Personal chats",
  },
  {
    id: "2",
    title: "Flexible program structures",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: pr1,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: pr2,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: pr3,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: pr4,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: pr5,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: pr6,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: pr7,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: pr8,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Jony Baba",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: icoI1,
    profileImageUrl : proImage,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Lana Rose",
    text: "The app uses natural language processing to understand user queries and relevant responses.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    profileImageUrl : proImage2,
    light: true,
  },
  {
    id: "2",
    title: "Alexa Smith",
    text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
    profileImageUrl : proImage3,
  },
  {
    id: "3",
    title: "Tony Kakar",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
    profileImageUrl : proImage4,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
