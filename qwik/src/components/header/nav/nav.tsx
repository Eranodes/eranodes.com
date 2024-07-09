import { component$, useSignal, $ } from '@builder.io/qwik';
import { BsHouse, BsArrowDown } from '@qwikest/icons/bootstrap';
import navStyles from './nav.module.css';
import menuData from '../../../data/nav.json';

const Navigation = component$(() => {
  const hoverIndex = useSignal(-1);

  const handleMouseEnter = $((index: number) => {
    hoverIndex.value = index;
  });

  const handleMouseLeave = $(() => {
    hoverIndex.value = -1;
  });

  const { menuItems } = menuData;

  return (
    <nav class={navStyles.navMenu}>
      <ul class={navStyles.mainMenu}>
        <li><a href="/" class={navStyles.link}><BsHouse /> Home</a></li>
        {menuItems.map((item, index) => (
          <li
            key={index}
            class={navStyles.menuItem}
            onMouseEnter$={() => handleMouseEnter(index)}
            onMouseLeave$={handleMouseLeave}
          >
            {item.name} <BsArrowDown />
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
