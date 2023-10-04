import { library } from '@fortawesome/fontawesome-svg-core';

import { 
  faBars, 
  faList,
  faFilter,
  faChevronLeft,
  faChevronRight,
  faCircleHalfStroke, 
  faFilterCircleXmark,
} from '@fortawesome/free-solid-svg-icons'

const faIcons = [
  faBars, 
  faList,
  faFilter,
  faChevronLeft,
  faChevronRight,
  faCircleHalfStroke, 
  faFilterCircleXmark,
]

for (const icon of faIcons){
  library.add(icon)
}