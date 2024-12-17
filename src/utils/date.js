export const getMonthIndex = (month) => {
  let nMonth = 0;

  switch (month) {
    case 'january':
    case 'ja':
    case 'jan':
      nMonth = 0;
      break;

    case 'february':
    case 'fe':
    case 'feb':
      nMonth = 1;
      break;
    case 'march':
    case 'ma':
    case 'mar':
      nMonth = 2;
      break;
    case 'april':
    case 'ap':
    case 'apr':
      nMonth = 3;
      break;
    case 'may':
      nMonth = 4;
      break;
    case 'june':
    case 'jun':
      nMonth = 5;
      break;
    case 'july':
    case 'jul':
      nMonth = 6;
      break;
    case 'august':
    case 'au':
    case 'aug':
      nMonth = 7;
      break;
    case 'september':
    case 'sept':
    case 'sep':
      nMonth = 8;
      break;
    case 'october':
    case 'oc':
    case 'oct':
      nMonth = 9;
      break;
    case 'november':
    case 'no':
    case 'nov':
      nMonth = 10;
      break;
    case 'december':
    case 'de':
    case 'dec':
      nMonth = 11;
      break;

    default:
      nMonth = 0;
      break;
  }
  return nMonth;
};

export const getMonthName = (month) => {
  let nMonth = '';

  switch (month) {
    case 0:
      nMonth = 'january';
      break;

    case 1:
      nMonth = 'february';
      break;
    case 2:
      nMonth = 'march';
      break;
    case 3:
      nMonth = 'april';
      break;
    case 4:
      nMonth = 'may';
      break;
    case 5:
      nMonth = 'june';
      break;
    case 6:
      nMonth = 'july';
      break;
    case 7:
      nMonth = 'august';
      break;
    case 8:
      nMonth = 'september';
      break;
    case 9:
      nMonth = 'october';
      break;
    case 10:
      nMonth = 'november';
      break;
    case 11:
      nMonth = 'december';
      break;

    default:
      nMonth = '';
      break;
  }
  return nMonth;
};
