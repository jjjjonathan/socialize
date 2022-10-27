export const defaultProfilePicture = (username: string, name: string) => {
  let tag = '';

  if (name) {
    const initials = name
      .split(' ')
      .map((n) => n[0].toUpperCase())
      .join('');
    tag = `&text=${initials}`;
  }

  return `https://avatar.tobi.sh/${username}.svg?size=512${tag}`;
};
