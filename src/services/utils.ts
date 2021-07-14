export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

interface IProps {
  path?: string | null;
  expires?: string | number | Date;
  accessToken?: string | null;
}

export function setCookie(name: string, value: string | null, props: IProps = {}) {
  props = {
    path: '/',
    ...props,
  };
  
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp instanceof Date && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  value = value && encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName as keyof IProps];
    updatedCookie += '=' + propValue;
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

export const formatDate = (date: string): string => {
  const ago: Date = new Date(date);
  const today: Date = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  const daysAgo: number = Math.ceil(
    (Number(today) - Number(ago)) / (60 * 60 * 24 * 1000)
  );
  const days = daysAgo.toString();
  const hours = ago.getHours().toString();
  const minutes = ago.getMinutes().toString().padStart(2, '0');
  const timeShift = `i-GMT+${String(ago.getTimezoneOffset() / 60).substr(1)}`;

  const daysString: Record<string, string> = {
    0: 'Сегодня',
    1: 'Вчера',
  };

  return `${
    daysString[days] || `${days} дня назад`
  }, ${hours}:${minutes} ${timeShift}`;
};
