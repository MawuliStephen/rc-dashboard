// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Menu = () => {
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     fetch('/api/menu')
//       .then(response => response.json())
//       .then(data => {
//         setMenuItems(data.menu);
//       })
//       .catch(error => console.error('Error fetching menu:', error));
//   }, []);

//   return (
//     <nav>
//       <ul>
//         {menuItems.map(item => (
//           <li key={item.id}>
//             <a href={item.link}>
//               {item.icon && <i className={item.icon}></i>} {item.title}
//             </a>
//             {item.subMenu && (
//               <ul>
//                 {item.subMenu.map(subItem => (
//                   <li key={subItem.id}>
//                     <a href={subItem.link}>{subItem.title}</a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;
