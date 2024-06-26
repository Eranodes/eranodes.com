import { component$, useSignal, $ } from '@builder.io/qwik';
import { BsHouse,BsArrowDown } from '@qwikest/icons/bootstrap';
import navStyles from './nav.module.css';

const Navigation = component$(() => {
  const hoverIndex = useSignal(-1);

  const handleMouseEnter = $((index: number) => {
    hoverIndex.value = index;
  });

  const handleMouseLeave = $(() => {
    hoverIndex.value = -1;
  });

  const menuItems = [
    {
      name: 'Server Hosting',
      subOptions: [
        { name: 'Site Hosting', route: '/server-site-hosting' },
        { name: 'AI Hosting', route: '/server-ai-hosting' },
        { name: 'Game Hosting', route: '/server-game-hosting' },
        { name: 'VPS', route: '/server-vps' },
        { name: 'VDS', route: '/server-vds' },
        { name: 'Bare Metal', route: '/server-bare-metal' },
      ],
    },
    {
      name: 'Development Services',
      subOptions: [
        { name: 'Rent a web dev', route: '/rent-web-dev' },
        { name: 'Rent a pterodactyl dev', route: '/rent-pterodactyl-dev' },
        { name: 'Rent something else', route: '/rent-something-else' },
      ],
    },
    {
      name: 'Build a PC',
      subOptions: [
        { name: 'Buy a Premade', route: '/buy-premade-pc' },
        { name: 'Configure your own', route: '/configure-own-pc' },
        { name: 'Browse Parts', route: '/browse-pc-parts' },
        { name: 'Request a custom build', route: '/request-custom-build' },
      ],
    },
  ];

  return (
    <nav class={navStyles.navMenu}>
      <ul class={navStyles.mainMenu}>
        <li><a href="/" class={navStyles.link}><BsHouse/>  Home</a></li>
        {menuItems.map((item, index) => (
          <li
            key={index}
            class={navStyles.menuItem}
            onMouseEnter$={() => handleMouseEnter(index)}
            onMouseLeave$={handleMouseLeave}
          >
            {item.name} <BsArrowDown/>
            {hoverIndex.value === index && (
              <ul class={navStyles.subMenu}>
                {item.subOptions.map((subOption, subIndex) => (
                  <li key={subIndex} class={navStyles.subMenuItem}>
                    <a href={subOption.route} class={navStyles.link}>
                      {subOption.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Navigation;
