import NextImage from 'next/image';
import { Cloudinary } from 'cloudinary-core';

const Image = ({ publicId, variant, size, alt, profilePicName }) => {
  const cl = new Cloudinary({
    cloud_name: 'freespirited-turtledove',
    secure: true,
  });

  const src = cl.url(publicId, {
    width: size * 2,
    height: size * 2,
    crop: 'scale',
  });
  const blurDataURL = cl.url(publicId, {
    width: 10,
    height: 10,
    crop: 'scale',
  });

  return (
    <NextImage
      className={variant === 'circle' ? 'circle' : ''}
      src={src}
      alt={profilePicName ? `Profile picture of ${profilePicName}` : alt}
      width={size}
      height={size}
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  );
};

export default Image;
