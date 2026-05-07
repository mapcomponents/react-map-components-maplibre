import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import GridViewIcon from "@mui/icons-material/GridView";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import MapIcon from "@mui/icons-material/Map";
import QuizIcon from "@mui/icons-material/Quiz";
import GitHubIcon from "@mui/icons-material/GitHub";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PeopleIcon from "@mui/icons-material/People";
// import PendingIcon from "@mui/icons-material/Pending";

const BulletList = [
  {
    title: "Getting Started",
    icon: <LocalLibraryIcon />,

    links: [
      {
        href: "./docs/Getting_Started/Introduction",
        text: "Introduction",
      },
      {
        href: "./docs/Getting_Started/Installation_&_Setup",
        text: "Installation & Setup",
      },
      {
        href: "./docs/Getting_Started/Quick_Start_Guide",
        text: "Quick Start Guide",
      },
    ],
  },
  {
    title: "Components",
    icon: <GridViewIcon />,
    links: [
      { href: "./docs/Components/Basic_Components", text: "Basic Components" },
      { href: "./docs/Components/Layer_Components", text: "Layer Components" },
      { href: "./docs/Components/UI-Components", text: "UI-Components" },
      { href: "./docs/Components/Hooks", text: "Hooks" },
      { href: "./docs/Components/Contexts", text: "Contexts" },
    ],
  },
  {
    title: "Advanced Topics",
    icon: <SettingsApplicationsIcon />,
    links: [
      { href: "./docs/Advanced_Topics/Configuration", text: "Configuration" },
      { href: "./docs/Advanced_Topics/Architecture", text: "Architecture" },
      {
        href: "./docs/Advanced_Topics/Data_Integration",
        text: "Data Integration",
      },
    ],
  },
  {
    title: "Examples",
    icon: <MapIcon />,
    links: [
      {
        href: "./docs/Examples/Progressive_Web_App",
        text: "Progressive Web App",
      },
    ],
  },
  {
    title: "FAQ",
    icon: <QuizIcon />,
    links: [{ href: "./docs/FAQ/Common_questions", text: "Common questions" }],
  },
  {
    title: "Contributing",
    icon: <GitHubIcon />,
    links: [{ href: "./docs/Contributing/", text: "Contributing" }],
  },
  {
    title: "Changelog & Updates",
    icon: <LibraryBooksIcon />,
    links: [
      { href: "./docs/Changelog_&_Updates/", text: "Changelog & Updates" },
    ],
  },
  {
    title: "Support & Community",
    icon: <PeopleIcon />,
    links: [
      { href: "./docs/Support_&_Community/", text: "Support & Community" },
    ],
  },
  // {
  //   title: "In Progress",
  //   icon: <PendingIcon />,
  //   links: [{ href: "https://reactjs.org", text: "LayerStore" }],
  // },
];

function Feature({ icon, title, links }) {
  return (
    <div className={clsx("col col--3", styles.leftAlign)}>
      <div>{icon}</div>
      <div>
        <h3>{title}</h3>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.text}
              </a>
              <Link to={link.href}></Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {BulletList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
