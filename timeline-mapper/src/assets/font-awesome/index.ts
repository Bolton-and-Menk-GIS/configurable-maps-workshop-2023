import { library } from '@fortawesome/fontawesome-svg-core';

import { 
  faBars, 
  faCircleHalfStroke, 
  faList,
} from '@fortawesome/free-solid-svg-icons'

const faIcons = [
  faBars,
  faList,
  faCircleHalfStroke,
]

for (const icon of faIcons){
  library.add(icon)
}