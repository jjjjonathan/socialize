import NextImage from 'next/image';
import Link from 'next/link';
import { Cloudinary } from 'cloudinary-core';

const Image = ({
  publicId,
  variant,
  size,
  alt,
  profilePicName,
  className,
  href,
  blurPlaceholder,
  ...props
}) => {
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

  const definedClassName = className || '';

  const image = () => {
    const imageClassName = () => {
      if (variant === 'circle') {
        if (href) {
          return 'circle';
        }
        return `circle ${definedClassName}`;
      }
      if (href) {
        return '';
      }
      return definedClassName;
    };

    const blurProps = blurPlaceholder
      ? {
          placeholder: 'blur',
          blurDataURL,
        }
      : {};

    return (
      <NextImage
        className={imageClassName()}
        src={src}
        alt={profilePicName ? `Profile picture of ${profilePicName}` : alt}
        width={size}
        height={size}
        {...blurProps}
        {...props}
      />
    );
  };

  if (href)
    return (
      <Link href={href} passHref>
        <a className={definedClassName}>{image()}</a>
      </Link>
    );

  return image();
};

export default Image;
