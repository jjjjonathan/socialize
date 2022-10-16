export const defaultProfilePicture = (username, name) => {
  let tag = '';

  if (name) {
    const nameArray = name.split(' ');
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue[0];
    const initials = nameArray.reduce(reducer, '').toUpperCase();
    tag = `&text=${initials}`;
  }

  return `https://avatar.tobi.sh/${username}.svg?size=512${tag}`;
};
